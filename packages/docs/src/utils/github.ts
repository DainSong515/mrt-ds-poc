const GITHUB_TOKEN_KEY = 'mrt-ds-github-token';

export function getStoredToken(): string | null {
  return localStorage.getItem(GITHUB_TOKEN_KEY);
}

export function storeToken(token: string) {
  localStorage.setItem(GITHUB_TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(GITHUB_TOKEN_KEY);
}

async function ghFetch(path: string, token: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status}: ${body}`);
  }
  return res.json();
}

interface FileChange {
  path: string;
  currentValue: string;
  newValue: string;
}

interface CreatePRParams {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  title: string;
  body: string;
  changes: FileChange[];
}

export async function createDesignSyncPR(params: CreatePRParams): Promise<string> {
  const { token, owner, repo, branch, title, body, changes } = params;
  const base = `/repos/${owner}/${repo}`;

  // 1. Get default branch SHA
  const repoInfo = await ghFetch(base, token);
  const defaultBranch = repoInfo.default_branch as string;
  const refData = await ghFetch(`${base}/git/ref/heads/${defaultBranch}`, token);
  const baseSha = refData.object.sha as string;

  // 2. Create new branch
  try {
    await ghFetch(`${base}/git/refs`, token, {
      method: 'POST',
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseSha }),
    });
  } catch (e: any) {
    if (e.message?.includes('422')) {
      // Branch already exists, get its SHA
      const existingRef = await ghFetch(`${base}/git/ref/heads/${branch}`, token);
      // Update it to latest default branch
      await ghFetch(`${base}/git/refs/heads/${branch}`, token, {
        method: 'PATCH',
        body: JSON.stringify({ sha: baseSha, force: true }),
      });
    } else {
      throw e;
    }
  }

  // 3. Apply file changes one by one
  for (const change of changes) {
    // Get current file to obtain SHA
    let fileSha: string | undefined;
    let currentContent: string;
    try {
      const fileData = await ghFetch(`${base}/contents/${change.path}?ref=${branch}`, token);
      fileSha = fileData.sha as string;
      currentContent = atob(fileData.content.replace(/\n/g, ''));
    } catch {
      continue; // Skip if file doesn't exist
    }

    // Apply all value replacements for this file
    let updatedContent = currentContent;
    // Case-insensitive replacement of hex colors
    const escaped = change.currentValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    updatedContent = updatedContent.replace(regex, change.newValue);

    if (updatedContent === currentContent) continue; // No changes

    // Commit the change
    await ghFetch(`${base}/contents/${change.path}`, token, {
      method: 'PUT',
      body: JSON.stringify({
        message: `fix(tokens): update ${change.path.split('/').pop()}`,
        content: btoa(unescape(encodeURIComponent(updatedContent))),
        sha: fileSha,
        branch,
      }),
    });
  }

  // 4. Create PR
  const pr = await ghFetch(`${base}/pulls`, token, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      head: branch,
      base: defaultBranch,
    }),
  });

  return pr.html_url as string;
}

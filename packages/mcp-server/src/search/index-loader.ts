/**
 * index-loader.ts
 * ai-index/dist/search-index.json 로더 (동적 로드)
 */
import fs from 'fs';
import path from 'path';

const AI_INDEX_DIST = path.resolve(__dirname, '../../../ai-index/dist');

interface SearchDocument {
  id: string;
  path: string;
  title: string;
  keywords: string[];
}

interface SearchIndex {
  version: string;
  generatedAt: string;
  documents: SearchDocument[];
  invertedIndex: Record<string, string[]>;
}

let cachedIndex: SearchIndex | null = null;

export function loadSearchIndex(): SearchIndex | null {
  if (cachedIndex) return cachedIndex;

  const indexPath = path.join(AI_INDEX_DIST, 'search-index.json');
  try {
    const content = fs.readFileSync(indexPath, 'utf-8');
    cachedIndex = JSON.parse(content) as SearchIndex;
    return cachedIndex;
  } catch {
    return null;
  }
}

export function loadDocFile(docPath: string): string | null {
  const fullPath = path.join(AI_INDEX_DIST, docPath);
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch {
    return null;
  }
}

export function loadComponentDoc(componentName: string): string | null {
  return loadDocFile(`docs/${componentName.toLowerCase()}.md`);
}

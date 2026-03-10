/**
 * bm25.ts
 * BM25 검색 알고리즘 구현
 */

interface SearchIndex {
  documents: Array<{ id: string; path: string; title: string; keywords: string[] }>;
  invertedIndex: Record<string, string[]>;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,，、.。!！?？:：;；\-_\/\\]+/)
    .filter((t) => t.length > 0);
}

export interface SearchResult {
  id: string;
  title: string;
  path: string;
  score: number;
  matchedTerms: string[];
}

export function bm25Search(
  query: string,
  index: SearchIndex,
  topK = 3
): SearchResult[] {
  const queryTerms = tokenize(query);
  const scores: Record<string, number> = {};
  const matchedTermsMap: Record<string, Set<string>> = {};
  const N = index.documents.length;

  for (const term of queryTerms) {
    // 완전 일치
    const exactMatches = index.invertedIndex[term] ?? [];
    // 부분 일치 (한글 등)
    const partialMatches = Object.entries(index.invertedIndex)
      .filter(([key]) => key.includes(term) && key !== term)
      .flatMap(([, docs]) => docs);

    const allMatches = [...new Set([...exactMatches, ...partialMatches])];
    const df = allMatches.length;
    if (df === 0) continue;

    // IDF 계산 (BM25 공식)
    const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
    // 완전 일치에 가중치 부여
    const weight = exactMatches.length > 0 ? 1.5 : 0.8;

    for (const docId of allMatches) {
      if (!scores[docId]) scores[docId] = 0;
      if (!matchedTermsMap[docId]) matchedTermsMap[docId] = new Set();
      scores[docId] += idf * weight;
      matchedTermsMap[docId].add(term);
    }
  }

  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topK)
    .map(([id, score]) => {
      const doc = index.documents.find((d) => d.id === id)!;
      return {
        id,
        title: doc.title,
        path: doc.path,
        score: Math.round(score * 100) / 100,
        matchedTerms: [...(matchedTermsMap[id] ?? [])],
      };
    });
}

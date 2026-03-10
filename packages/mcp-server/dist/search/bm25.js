"use strict";
/**
 * bm25.ts
 * BM25 검색 알고리즘 구현
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bm25Search = bm25Search;
function tokenize(text) {
    return text
        .toLowerCase()
        .split(/[\s,，、.。!！?？:：;；\-_\/\\]+/)
        .filter((t) => t.length > 0);
}
function bm25Search(query, index, topK = 3) {
    const queryTerms = tokenize(query);
    const scores = {};
    const matchedTermsMap = {};
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
        if (df === 0)
            continue;
        // IDF 계산 (BM25 공식)
        const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
        // 완전 일치에 가중치 부여
        const weight = exactMatches.length > 0 ? 1.5 : 0.8;
        for (const docId of allMatches) {
            if (!scores[docId])
                scores[docId] = 0;
            if (!matchedTermsMap[docId])
                matchedTermsMap[docId] = new Set();
            scores[docId] += idf * weight;
            matchedTermsMap[docId].add(term);
        }
    }
    return Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, topK)
        .map(([id, score]) => {
        const doc = index.documents.find((d) => d.id === id);
        return {
            id,
            title: doc.title,
            path: doc.path,
            score: Math.round(score * 100) / 100,
            matchedTerms: [...(matchedTermsMap[id] ?? [])],
        };
    });
}

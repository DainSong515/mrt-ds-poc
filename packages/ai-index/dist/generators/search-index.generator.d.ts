/**
 * search-index.generator.ts
 * BM25 inverted index 생성
 */
export interface SearchDocument {
    id: string;
    path: string;
    title: string;
    keywords: string[];
    content?: string;
}
export interface SearchIndex {
    version: string;
    generatedAt: string;
    documents: SearchDocument[];
    invertedIndex: Record<string, string[]>;
}
export declare function generateSearchIndex(docs: SearchDocument[]): SearchIndex;
export declare function buildDefaultSearchIndex(): SearchIndex;
/** BM25 검색 (단순 IDF 기반) */
export declare function bm25Search(query: string, index: SearchIndex, topK?: number): Array<{
    id: string;
    score: number;
    title: string;
    path: string;
}>;

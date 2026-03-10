"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDesignSystem = searchDesignSystem;
/**
 * search.ts
 * search_design_system tool - BM25 기반 디자인 시스템 검색
 */
const index_loader_js_1 = require("../search/index-loader.js");
const bm25_js_1 = require("../search/bm25.js");
function searchDesignSystem(query) {
    const index = (0, index_loader_js_1.loadSearchIndex)();
    if (!index) {
        return `검색 인덱스를 로드할 수 없습니다. ai-index 빌드를 먼저 실행하세요:\n\`cd packages/ai-index && npm run build\``;
    }
    const results = (0, bm25_js_1.bm25Search)(query, index, 3);
    if (results.length === 0) {
        return `"${query}"에 대한 검색 결과가 없습니다.\n\n사용 가능한 컴포넌트: Button, Text, Icon, Design Tokens`;
    }
    const lines = [
        `## 검색 결과: "${query}"`,
        `총 ${results.length}개 문서 매칭\n`,
    ];
    for (const result of results) {
        lines.push(`### ${result.title} (점수: ${result.score})`);
        lines.push(`매칭 키워드: ${result.matchedTerms.join(', ')}\n`);
        // 관련 문서 스니펫 (처음 30줄)
        const docContent = (0, index_loader_js_1.loadDocFile)(result.path);
        if (docContent) {
            const snippet = docContent.split('\n').slice(0, 30).join('\n');
            lines.push(snippet);
        }
        lines.push('');
        lines.push(`[전체 문서 조회: get_${result.id}_usage tool 호출]`);
        lines.push('');
    }
    return lines.join('\n');
}

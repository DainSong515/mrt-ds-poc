"use strict";
/**
 * search-index.generator.ts
 * BM25 inverted index 생성
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSearchIndex = generateSearchIndex;
exports.buildDefaultSearchIndex = buildDefaultSearchIndex;
exports.bm25Search = bm25Search;
const COMPONENT_KEYWORDS = {
    chip: [
        '칩', 'chip', '필터', 'filter', '카테고리', 'category', '태그', 'tag',
        '선택', 'selected', '필터바', 'filterbar', '가로스크롤', 'ChipGroup',
        'filled', 'outlined', '기획전', '분류', '탭', 'tab',
        // iOS
        'iOS칩', 'iOS태그', 'TagComponent', 'DynamicTagStyle', 'ios',
    ],
    button: [
        '버튼', 'button', 'CTA', 'primary', 'primaryOpt', 'secondary', 'secondaryOpt',
        'tertiary', 'tertiaryOpt', 'text', 'variant', 'size', 'large', 'medium', 'small',
        'xSmall', 'loading', '로딩', 'disabled', '비활성', '비활성화', 'icon', '아이콘',
        'leftIcon', 'rightIcon', 'iconOnly', 'fullWidth', '전체너비', 'pill', 'rectangle',
        '결제', '예약', '클릭', 'click', '메인', 'CTA버튼', '검정버튼', '파란버튼',
        'shape', 'isCompact',
        // iOS
        'iOS버튼', 'ButtonComponent', 'DynamicButtonStyle', 'Swift', 'UIKit', 'ios',
    ],
    text: [
        '텍스트', 'text', 'typography', '타이포그래피', 'display', 'headline', 'paragraph',
        'caption', 'bold', 'normal', '제목', '본문', '캡션', '설명', 'lineClamp',
        '말줄임', 'fontSize', '글씨', '글자', 'font', 'headlineBold', 'headlineNormal',
        'paragraphBold', 'paragraphNormal', 'captionBold', 'captionNormal', 'displayBold',
        // iOS
        'iOS텍스트', 'TextComponent', 'DynamicTextStyle', 'UDTypography', 'SwiftUI', 'ios',
    ],
    icon: [
        '아이콘', 'icon', 'Ico', 'IcoArrowLeft', 'IcoArrowRight', 'IcoSearch', 'IcoHeart',
        'IcoClose', 'IcoAdd', 'IcoDelete', 'IcoEdit', '화살표', '검색', '하트', '별',
        '즐겨찾기', 'IcoStar', 'IcoBookmark', 'IcoCalendar', '날짜', 'IcoFlight', '항공',
        'IcoHotel', '호텔', 'IcoLocationOn', '위치', 'PascalCase', 'IcoCheck',
        // iOS
        'iOS아이콘', 'IconComponent', 'DynamicIconStyle', 'ico_', 'snake_case', 'ios',
    ],
    tokens: [
        '토큰', 'token', '색상', 'color', '그림자', 'shadow', 'elevation', '타이포그래피',
        'typography', 'semantic', 'scale', 'component', '디자인변수', 'gray', 'blue', 'red',
        'green', 'yellow', 'purple', 'hex', '#141719', '#2b96ed', '#ec4937', '#27ab86',
        'surface', 'content', 'border', 'interactive', '의미', '참조', 'token참조',
    ],
};
function tokenize(text) {
    return text
        .toLowerCase()
        .split(/[\s,，、.。!！?？:：;；\-_\/\\]+/)
        .filter((t) => t.length > 0);
}
function generateSearchIndex(docs) {
    const invertedIndex = {};
    for (const doc of docs) {
        const allKeywords = [
            ...doc.keywords,
            ...(doc.content ? tokenize(doc.content) : []),
        ];
        for (const keyword of allKeywords) {
            const normalized = keyword.toLowerCase().trim();
            if (!normalized)
                continue;
            if (!invertedIndex[normalized]) {
                invertedIndex[normalized] = [];
            }
            if (!invertedIndex[normalized].includes(doc.id)) {
                invertedIndex[normalized].push(doc.id);
            }
        }
    }
    return {
        version: '1.0',
        generatedAt: new Date().toISOString(),
        documents: docs,
        invertedIndex,
    };
}
function buildDefaultSearchIndex() {
    const documents = [
        {
            id: 'chip',
            path: 'docs/chip.md',
            title: 'Chip',
            keywords: COMPONENT_KEYWORDS.chip,
        },
        {
            id: 'button',
            path: 'docs/button.md',
            title: 'Button',
            keywords: COMPONENT_KEYWORDS.button,
        },
        {
            id: 'text',
            path: 'docs/text.md',
            title: 'Text',
            keywords: COMPONENT_KEYWORDS.text,
        },
        {
            id: 'icon',
            path: 'docs/icon.md',
            title: 'Icon',
            keywords: COMPONENT_KEYWORDS.icon,
        },
        {
            id: 'tokens',
            path: 'docs/tokens.md',
            title: 'Design Tokens',
            keywords: COMPONENT_KEYWORDS.tokens,
        },
    ];
    return generateSearchIndex(documents);
}
/** BM25 검색 (단순 IDF 기반) */
function bm25Search(query, index, topK = 3) {
    const queryTerms = tokenize(query);
    const scores = {};
    const N = index.documents.length;
    for (const term of queryTerms) {
        const matchingDocs = index.invertedIndex[term] ?? [];
        const df = matchingDocs.length;
        if (df === 0)
            continue;
        // IDF 계산
        const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
        for (const docId of matchingDocs) {
            if (!scores[docId])
                scores[docId] = 0;
            scores[docId] += idf;
        }
    }
    return Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, topK)
        .map(([id, score]) => {
        const doc = index.documents.find((d) => d.id === id);
        return { id, score, title: doc.title, path: doc.path };
    });
}
//# sourceMappingURL=search-index.generator.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSemanticToken = getSemanticToken;
/**
 * semantic-token.ts
 * get_semantic_token tool - 의미 기반 토큰 조회
 */
const color_semantic_json_1 = __importDefault(require("../../../tokens/src/semantic/color.semantic.json"));
const shadow_semantic_json_1 = __importDefault(require("../../../tokens/src/semantic/shadow.semantic.json"));
const typography_semantic_json_1 = __importDefault(require("../../../tokens/src/semantic/typography.semantic.json"));
const button_component_json_1 = __importDefault(require("../../../tokens/src/component/button.component.json"));
function flattenSemantic(obj, prefix = '') {
    const result = [];
    for (const [key, val] of Object.entries(obj)) {
        if (key.startsWith('$'))
            continue;
        const currentPath = prefix ? `${prefix}.${key}` : key;
        const node = val;
        if (node && typeof node === 'object' && '$value' in node) {
            result.push({
                path: currentPath,
                reference: String(node.$value ?? ''),
                type: String(node.$type ?? 'unknown'),
                description: String(node.$description ?? ''),
            });
        }
        else if (node && typeof node === 'object') {
            result.push(...flattenSemantic(node, currentPath));
        }
    }
    return result;
}
const allSemanticTokens = [
    ...flattenSemantic(color_semantic_json_1.default),
    ...flattenSemantic(shadow_semantic_json_1.default),
    ...flattenSemantic(typography_semantic_json_1.default),
    ...flattenSemantic(button_component_json_1.default),
];
function getSemanticToken(intent) {
    const lower = intent.toLowerCase();
    const matches = allSemanticTokens.filter((t) => t.path.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower));
    if (matches.length === 0) {
        return [
            `"${intent}"에 해당하는 semantic 토큰을 찾을 수 없습니다.`,
            '',
            '사용 가능한 intent 카테고리:',
            '- **색상**: surface(배경), content(텍스트), border(테두리), interactive(인터랙션)',
            '- **그림자**: elevation.low, elevation.medium, elevation.high, elevation.overlay, elevation.top',
            '- **타이포그래피**: display, title, body, label, caption',
            '- **버튼 컴포넌트**: button.primary, button.secondary, button.tertiary, button.size',
            '',
            '예시: get_semantic_token({ intent: "surface" })',
            '예시: get_semantic_token({ intent: "CTA" })',
            '예시: get_semantic_token({ intent: "disabled" })',
        ].join('\n');
    }
    const lines = [
        `## Semantic 토큰: "${intent}"`,
        `${matches.length}개 토큰 매칭\n`,
        '| 토큰 경로 | 참조 | 설명 |',
        '|-----------|------|------|',
    ];
    for (const t of matches.slice(0, 20)) {
        lines.push(`| \`${t.path}\` | \`${t.reference}\` | ${t.description} |`);
    }
    if (matches.length > 20) {
        lines.push(`\n... 및 ${matches.length - 20}개 추가 토큰`);
    }
    return lines.join('\n');
}

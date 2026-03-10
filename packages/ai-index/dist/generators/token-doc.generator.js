"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenDoc = generateTokenDoc;
/**
 * token-doc.generator.ts
 * tokens JSON → tokens.md 생성
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TOKENS_BASE = path_1.default.resolve(__dirname, '../../../tokens/src');
function flattenTokens(obj, prefix = '') {
    const result = [];
    for (const [key, val] of Object.entries(obj)) {
        if (key.startsWith('$'))
            continue;
        const currentPath = prefix ? `${prefix}.${key}` : key;
        const node = val;
        if (node && typeof node === 'object' && '$value' in node) {
            result.push({
                path: currentPath,
                value: String(node.$value),
                type: String(node.$type ?? 'unknown'),
                description: node.$description,
            });
        }
        else if (node && typeof node === 'object') {
            result.push(...flattenTokens(node, currentPath));
        }
    }
    return result;
}
function loadTokenFile(filePath) {
    try {
        const content = fs_1.default.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    }
    catch {
        return {};
    }
}
function generateTokenDoc() {
    const lines = [
        '# Design Tokens',
        '',
        '마이리얼트립 디자인 시스템 토큰. 직접 hex/숫자 하드코딩 금지 — 반드시 토큰 참조.',
        '',
        '## 토큰 계층 구조',
        '',
        '```',
        'scale/     → 원시 값 (hex, px)',
        'semantic/  → 의도 기반 참조 ({color.gray.1000} 형태)',
        'component/ → 컴포넌트별 세부 토큰',
        '```',
        '',
    ];
    // Scale 토큰
    const colorScale = loadTokenFile(path_1.default.join(TOKENS_BASE, 'scale/color.scale.json'));
    const shadowScale = loadTokenFile(path_1.default.join(TOKENS_BASE, 'scale/shadow.scale.json'));
    lines.push('## Scale 토큰 (색상)');
    lines.push('');
    const colorTokens = flattenTokens(colorScale);
    const colorGroups = {};
    for (const token of colorTokens) {
        const group = token.path.split('.')[1] ?? 'other';
        if (!colorGroups[group])
            colorGroups[group] = [];
        colorGroups[group].push(token);
    }
    for (const [group, tokens] of Object.entries(colorGroups)) {
        lines.push(`### color.${group}`);
        lines.push('');
        lines.push('| 토큰 | 값 |');
        lines.push('|------|-----|');
        for (const t of tokens) {
            lines.push(`| \`${t.path}\` | \`${t.value}\` |`);
        }
        lines.push('');
    }
    // Shadow 토큰
    lines.push('## Scale 토큰 (그림자)');
    lines.push('');
    const shadowTokens = flattenTokens(shadowScale);
    lines.push('| 토큰 | 값 |');
    lines.push('|------|-----|');
    for (const t of shadowTokens) {
        lines.push(`| \`${t.path}\` | \`${t.value}\` |`);
    }
    lines.push('');
    // Semantic 색상 토큰
    const semanticColor = loadTokenFile(path_1.default.join(TOKENS_BASE, 'semantic/color.semantic.json'));
    lines.push('## Semantic 토큰 (색상 의도)');
    lines.push('');
    const semanticColorTokens = flattenTokens(semanticColor);
    lines.push('| 토큰 | 참조 | 설명 |');
    lines.push('|------|------|------|');
    for (const t of semanticColorTokens) {
        lines.push(`| \`${t.path}\` | \`${t.value}\` | ${t.description ?? ''} |`);
    }
    lines.push('');
    // Component 버튼 토큰
    const buttonComponent = loadTokenFile(path_1.default.join(TOKENS_BASE, 'component/button.component.json'));
    lines.push('## Component 토큰 (Button)');
    lines.push('');
    const buttonTokens = flattenTokens(buttonComponent);
    lines.push('| 토큰 | 참조/값 | 설명 |');
    lines.push('|------|---------|------|');
    for (const t of buttonTokens) {
        lines.push(`| \`${t.path}\` | \`${t.value}\` | ${t.description ?? ''} |`);
    }
    lines.push('');
    lines.push('## 주요 색상 빠른 참조');
    lines.push('');
    lines.push('| 토큰 | 값 | 주요 사용처 |');
    lines.push('|------|-----|-----------|');
    lines.push('| `color.gray.1000` | #141719 | primary 버튼 배경, 주요 텍스트 |');
    lines.push('| `color.gray.900` | #212529 | 진한 텍스트 |');
    lines.push('| `color.gray.700` | #495056 | 보조 텍스트 |');
    lines.push('| `color.gray.500` | #848c94 | 비활성 텍스트, 플레이스홀더 |');
    lines.push('| `color.gray.300` | #ced4da | disabled 텍스트 |');
    lines.push('| `color.gray.100` | #e9ecef | 테두리 |');
    lines.push('| `color.gray.80` | #f1f3f5 | secondary 버튼 배경 |');
    lines.push('| `color.blue.500` | #2b96ed | primaryOpt 버튼, 링크, 강조 |');
    lines.push('| `color.red.500` | #ec4937 | 에러, 위험 액션 |');
    lines.push('| `color.green.500` | #27ab86 | 성공, 확인 |');
    lines.push('');
    lines.push('## 키워드');
    lines.push('');
    lines.push('토큰, token, 색상, color, 그림자, shadow, 타이포그래피, typography, semantic, scale, component, 디자인 변수');
    lines.push('');
    return lines.join('\n');
}
//# sourceMappingURL=token-doc.generator.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = getToken;
const color_scale_json_1 = __importDefault(require("../../../tokens/src/scale/color.scale.json"));
const shadow_scale_json_1 = __importDefault(require("../../../tokens/src/scale/shadow.scale.json"));
const typography_scale_json_1 = __importDefault(require("../../../tokens/src/scale/typography.scale.json"));
const color_semantic_json_1 = __importDefault(require("../../../tokens/src/semantic/color.semantic.json"));
const shadow_semantic_json_1 = __importDefault(require("../../../tokens/src/semantic/shadow.semantic.json"));
const button_component_json_1 = __importDefault(require("../../../tokens/src/component/button.component.json"));
function flattenTokens(obj, prefix = '') {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
        if (key.startsWith('$'))
            continue;
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const node = val;
        if (node && typeof node === 'object' && '$value' in node) {
            result[fullKey] = {
                value: node.$value,
                type: node.$type || 'unknown',
            };
        }
        else if (node && typeof node === 'object') {
            Object.assign(result, flattenTokens(node, fullKey));
        }
    }
    return result;
}
const allTokens = {
    ...flattenTokens(color_scale_json_1.default),
    ...flattenTokens(shadow_scale_json_1.default),
    ...flattenTokens(typography_scale_json_1.default),
    ...flattenTokens(color_semantic_json_1.default),
    ...flattenTokens(shadow_semantic_json_1.default),
    ...flattenTokens(button_component_json_1.default),
};
function getToken(name) {
    const lower = name.toLowerCase();
    const matches = Object.entries(allTokens).filter(([key]) => key.toLowerCase().includes(lower));
    if (matches.length === 0) {
        return `"${name}" 토큰을 찾을 수 없습니다.\n\n사용 가능한 토큰 카테고리:\n- **Scale**: color.gray, color.blue, color.green, color.yellow, color.red, color.purple, shadow.E100~E500V\n- **Semantic**: color.surface, color.content, color.border, color.interactive, shadow.elevation, typography.display/title/body/label/caption\n- **Component**: button.primary, button.secondary, button.tertiary, button.size.large/medium/small/xSmall\n- **Typography**: typography.headline, typography.paragraph, typography.caption`;
    }
    const lines = matches.map(([key, { value, type }]) => {
        const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
        return `- **${key}** (${type}): \`${valueStr}\``;
    });
    return `### 토큰 검색 결과: "${name}"\n\n${lines.join('\n')}`;
}

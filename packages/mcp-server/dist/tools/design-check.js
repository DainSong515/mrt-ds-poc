"use strict";
/**
 * design-check.ts
 * get_design_check_status / get_design_check_mismatches — Design Check MCP 도구
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDesignCheckStatus = getDesignCheckStatus;
exports.getDesignCheckMismatches = getDesignCheckMismatches;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const SYNC_MAPPINGS = [
    { codeTokenPattern: 'color.gray.', filePath: 'packages/tokens/src/scale/color.scale.json', jsonPath: 'color.gray.{step}.$value', platform: 'web' },
    { codeTokenPattern: 'color.blue.', filePath: 'packages/tokens/src/scale/color.scale.json', jsonPath: 'color.blue.{step}.$value', platform: 'web' },
    { codeTokenPattern: 'color.yellow.', filePath: 'packages/tokens/src/scale/color.scale.json', jsonPath: 'color.yellow.{step}.$value', platform: 'web' },
    { codeTokenPattern: 'color.interactive', filePath: 'packages/tokens/src/semantic/color.semantic.json', jsonPath: 'color.interactive.{name}.$value', platform: 'web' },
    { codeTokenPattern: 'button.', filePath: 'packages/tokens/src/component/button.component.json', jsonPath: 'button.{path}.$value', platform: 'web' },
    { codeTokenPattern: 'DynamicColor.', filePath: 'ios/MRT/DesignSystem/DynamicColor.swift', jsonPath: 'DynamicColor.{name}', platform: 'ios' },
    { codeTokenPattern: 'UDTypography.', filePath: 'ios/MRT/DesignSystem/UDTypography+Attribute.swift', jsonPath: 'UDTypography.{name}', platform: 'ios' },
    { codeTokenPattern: 'lineHeightMultiple', filePath: 'ios/MRT/DesignSystem/UDTypography+Attribute.swift', jsonPath: 'lineHeightMultiple', platform: 'ios' },
];
function loadResults() {
    const candidates = [
        path.resolve(__dirname, '../../../docs/src/data/design-check-results.json'),
        path.resolve(__dirname, '../../packages/docs/src/data/design-check-results.json'),
    ];
    for (const p of candidates) {
        if (fs.existsSync(p)) {
            const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
            return data.results;
        }
    }
    return [];
}
function getDesignCheckStatus() {
    const results = loadResults();
    if (results.length === 0) {
        return 'Design check 결과가 없습니다. `/design-check <figma-url> <component>` 명령어로 실행하세요.';
    }
    const lines = [
        '# Design Check Status (Figma-Code Sync)',
        '',
        '## Summary',
        '',
        '| Component | Platform | Match Rate | Match | Total | Last Checked |',
        '|-----------|----------|------------|-------|-------|--------------|',
    ];
    for (const r of results) {
        const rateEmoji = r.summary.matchRate >= 90 ? '🟢' : r.summary.matchRate >= 70 ? '🟡' : '🔴';
        const date = new Date(r.timestamp).toISOString().split('T')[0];
        lines.push(`| ${r.component} | ${r.platform} | ${rateEmoji} ${r.summary.matchRate}% | ${r.summary.match} | ${r.summary.total} | ${date} |`);
    }
    // Overall stats
    const webResults = results.filter((r) => r.platform === 'web');
    const iosResults = results.filter((r) => r.platform === 'ios');
    const webTotal = webResults.reduce((s, r) => s + r.summary.total, 0);
    const webMatch = webResults.reduce((s, r) => s + r.summary.match, 0);
    const iosTotal = iosResults.reduce((s, r) => s + r.summary.total, 0);
    const iosMatch = iosResults.reduce((s, r) => s + r.summary.match, 0);
    lines.push('');
    lines.push('## Platform Summary');
    lines.push(`- **Web**: ${webMatch}/${webTotal} (${webTotal > 0 ? Math.round((webMatch / webTotal) * 1000) / 10 : 0}%)`);
    lines.push(`- **iOS**: ${iosMatch}/${iosTotal} (${iosTotal > 0 ? Math.round((iosMatch / iosTotal) * 1000) / 10 : 0}%)`);
    lines.push('');
    lines.push('> 불일치 상세는 `get_design_check_mismatches(component)` 로 조회하세요.');
    return lines.join('\n');
}
function getDesignCheckMismatches(component, platform) {
    const results = loadResults();
    let filtered = results.filter((r) => r.component.toLowerCase() === component.toLowerCase());
    if (platform) {
        filtered = filtered.filter((r) => r.platform === platform);
    }
    if (filtered.length === 0) {
        const available = [...new Set(results.map((r) => r.component))];
        return `"${component}" 에 대한 design check 결과가 없습니다.\n\n사용 가능: ${available.join(', ')}`;
    }
    const lines = [
        `# Design Check Mismatches: ${component}${platform ? ` (${platform})` : ''}`,
        '',
    ];
    for (const r of filtered) {
        const mismatches = r.items.filter((item) => item.status !== 'match');
        lines.push(`## ${r.platform.toUpperCase()} — ${r.summary.matchRate}% match (${r.summary.mismatch} mismatches)`);
        lines.push('');
        if (mismatches.length === 0) {
            lines.push('모든 항목이 일치합니다.');
            lines.push('');
            continue;
        }
        lines.push('| Category | Property | Figma | Code | Fix Info |');
        lines.push('|----------|----------|-------|------|----------|');
        for (const item of mismatches) {
            const mapping = findMapping(item.codeToken, r.platform);
            let fixInfo = '-';
            if (mapping) {
                const resolvedPath = resolveJsonPath(mapping, item);
                fixInfo = `File: \`${mapping.filePath}\` Path: \`${resolvedPath}\` "${item.codeValue}" → "${item.figmaValue}"`;
            }
            lines.push(`| ${item.category} | ${item.property} | ${item.figmaValue}${item.figmaToken ? ` (${item.figmaToken})` : ''} | ${item.codeValue}${item.codeToken ? ` (${item.codeToken})` : ''} | ${fixInfo} |`);
        }
        lines.push('');
    }
    lines.push('> Claude Code에서 수정: `/design-check sync ${component} ${property}`');
    return lines.join('\n');
}
function findMapping(codeToken, platform) {
    if (!codeToken)
        return undefined;
    return SYNC_MAPPINGS.find((m) => m.platform === platform && codeToken.startsWith(m.codeTokenPattern));
}
function resolveJsonPath(mapping, item) {
    return mapping.jsonPath
        .replace('{step}', item.property.split('.').pop() || '')
        .replace('{path}', item.property.replace('/', '.'))
        .replace('{name}', item.property.split('.').pop() || item.property.split('/').pop() || '');
}

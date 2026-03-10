"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDsCandidates = getDsCandidates;
exports.registerDsCandidate = registerDsCandidate;
/**
 * candidates.ts
 * get_ds_candidates / register_ds_candidate tool
 */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const REGISTRY_PATH = path_1.default.resolve(__dirname, '../../../../data/candidate-registry.json');
function loadRegistry() {
    try {
        return JSON.parse(fs_1.default.readFileSync(REGISTRY_PATH, 'utf-8'));
    }
    catch {
        return [];
    }
}
function saveRegistry(registry) {
    fs_1.default.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf-8');
}
function getDsCandidates(status) {
    const registry = loadRegistry();
    const filtered = status ? registry.filter((c) => c.status === status) : registry;
    if (filtered.length === 0) {
        return `status="${status}"에 해당하는 후보군이 없습니다.\n\n유효한 status: pending | in-progress | completed | rejected`;
    }
    const statusEmoji = {
        pending: '⏳',
        'in-progress': '🔨',
        completed: '✅',
        rejected: '❌',
    };
    const lines = [
        `## 디자인 시스템 후보군 목록`,
        status ? `필터: status="${status}"` : '전체 목록',
        `총 ${filtered.length}개\n`,
    ];
    for (const c of filtered) {
        lines.push(`### ${statusEmoji[c.status]} ${c.id} (유사도: ${Math.round(c.similarity * 100)}%)`);
        lines.push(`**상태**: ${c.status} | **감지일**: ${c.detectedAt}`);
        lines.push(`**소스 컴포넌트**: ${c.sources.join(', ')}`);
        lines.push(`**설명**: ${c.description}`);
        if (c.notes)
            lines.push(`**메모**: ${c.notes}`);
        lines.push('');
    }
    const summary = {
        pending: registry.filter((c) => c.status === 'pending').length,
        'in-progress': registry.filter((c) => c.status === 'in-progress').length,
        completed: registry.filter((c) => c.status === 'completed').length,
        rejected: registry.filter((c) => c.status === 'rejected').length,
    };
    lines.push('---');
    lines.push(`**요약**: 대기중 ${summary.pending} | 진행중 ${summary['in-progress']} | 완료 ${summary.completed} | 거부 ${summary.rejected}`);
    return lines.join('\n');
}
function registerDsCandidate(params) {
    const registry = loadRegistry();
    if (registry.find((c) => c.id === params.id)) {
        return `⚠️ 이미 등록된 후보군입니다: "${params.id}"\n\nget_ds_candidates로 현재 상태를 확인하세요.`;
    }
    const today = new Date().toISOString().split('T')[0];
    const newCandidate = {
        id: params.id,
        status: 'pending',
        sources: params.sources,
        similarity: params.similarity ?? 0.7,
        description: params.description,
        detectedAt: today,
        notes: params.notes,
    };
    registry.push(newCandidate);
    saveRegistry(registry);
    return [
        `✅ DS 후보군 등록 완료`,
        ``,
        `**id**: ${newCandidate.id}`,
        `**상태**: pending`,
        `**유사도**: ${Math.round(newCandidate.similarity * 100)}%`,
        `**소스**: ${newCandidate.sources.join(', ')}`,
        `**설명**: ${newCandidate.description}`,
        newCandidate.notes ? `**메모**: ${newCandidate.notes}` : '',
        `**등록일**: ${today}`,
        ``,
        `디자이너와 협의 후 Figma 플러그인에서 "승인 → DS 편입"으로 진행하세요.`,
    ].filter(Boolean).join('\n');
}

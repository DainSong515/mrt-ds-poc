/**
 * discovery.ts
 * discover_tools — 전체 도구 목록 + 카테고리별 필터링
 */

interface ToolInfo {
  name: string;
  category: string;
  description: string;
  quickStart?: boolean;
}

const TOOL_CATALOG: ToolInfo[] = [
  // Discovery
  { name: 'discover_tools', category: 'discovery', description: '전체 도구 목록 + 카테고리 반환. 처음 호출할 도구.', quickStart: true },

  // Components
  { name: 'list_components', category: 'components', description: '컴포넌트 목록 + 플랫폼별 구현 상태 반환.', quickStart: true },
  { name: 'get_component', category: 'components', description: '통합 컴포넌트 스펙 반환. Props, 예시 코드, 안티패턴 포함.', quickStart: true },

  // Tokens
  { name: 'get_token', category: 'tokens', description: '토큰 이름으로 값 조회. color, shadow, typography 지원.' },
  { name: 'get_semantic_token', category: 'tokens', description: '의도 기반 semantic/component 토큰 조회.' },

  // Search
  { name: 'search_design_system', category: 'search', description: 'BM25 자연어 검색. 컴포넌트/기능/맥락 쿼리.' },

  // Design Check
  { name: 'get_design_check_status', category: 'design-check', description: 'Figma-코드 동기화 현황 요약 (Progress Board 데이터).' },
  { name: 'get_design_check_mismatches', category: 'design-check', description: '불일치 항목 + 수정 정보 반환.' },

  // Icons
  { name: 'list_icons', category: 'icons', description: '카테고리별 아이콘 목록 반환.' },
  { name: 'search_icons', category: 'icons', description: '키워드로 아이콘 검색 (한글/영문).' },

  // Candidates
  { name: 'get_ds_candidates', category: 'candidates', description: 'DS 후보군 목록 반환.' },
  { name: 'register_ds_candidate', category: 'candidates', description: 'DS 후보군에 새 컴포넌트 등록.' },

  // Legacy (deprecated aliases)
  { name: 'get_button_usage', category: 'components', description: '[deprecated → get_component] Button 사용법.' },
  { name: 'get_text_usage', category: 'components', description: '[deprecated → get_component] Text 사용법.' },
  { name: 'get_icon_usage', category: 'icons', description: '[deprecated → search_icons] Icon 검색.' },
];

const CATEGORIES = [
  { id: 'discovery', label: 'Discovery', description: '도구 탐색 및 시작점' },
  { id: 'components', label: 'Components', description: '컴포넌트 목록, 스펙, 사용법' },
  { id: 'tokens', label: 'Tokens', description: '디자인 토큰 조회' },
  { id: 'search', label: 'Search', description: '자연어 검색' },
  { id: 'design-check', label: 'Design Check', description: 'Figma-코드 동기화 확인' },
  { id: 'icons', label: 'Icons', description: '아이콘 목록 및 검색' },
  { id: 'candidates', label: 'Candidates', description: 'DS 후보군 관리' },
];

export function discoverTools(query?: string, category?: string): string {
  let tools = TOOL_CATALOG;

  if (category) {
    tools = tools.filter((t) => t.category === category);
    if (tools.length === 0) {
      return `카테고리 "${category}"를 찾을 수 없습니다.\n\n사용 가능한 카테고리: ${CATEGORIES.map((c) => c.id).join(', ')}`;
    }
  }

  if (query) {
    const q = query.toLowerCase();
    tools = tools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q),
    );
  }

  const lines: string[] = [
    '# MRT Design System MCP Tools (v0.3.0)',
    '',
    '## Quick Start',
    '1. `discover_tools` → 전체 도구 확인',
    '2. `list_components` → 컴포넌트 목록 확인',
    '3. `get_component(name)` → 특정 컴포넌트 스펙 조회',
    '',
    '## Design Check Flow',
    '1. `get_design_check_status` → 전체 동기화 현황',
    '2. `get_design_check_mismatches(component)` → 불일치 상세 + 수정 정보',
    '',
  ];

  if (!category) {
    lines.push('## Categories');
    for (const cat of CATEGORIES) {
      const count = TOOL_CATALOG.filter((t) => t.category === cat.id && !t.name.startsWith('get_button') && !t.name.startsWith('get_text') && !t.name.startsWith('get_icon_usage')).length;
      lines.push(`- **${cat.label}** (${count}) — ${cat.description}`);
    }
    lines.push('');
  }

  lines.push(`## Tools${category ? ` (${category})` : ''}`);
  lines.push('');
  lines.push('| Tool | Category | Description |');
  lines.push('|------|----------|-------------|');
  for (const tool of tools) {
    const deprecated = tool.description.startsWith('[deprecated') ? ' (deprecated)' : '';
    lines.push(`| \`${tool.name}\`${deprecated} | ${tool.category} | ${tool.description} |`);
  }

  return lines.join('\n');
}

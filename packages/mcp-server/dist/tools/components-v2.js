"use strict";
/**
 * components-v2.ts
 * list_components / get_component — 통합 컴포넌트 도구
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listComponents = listComponents;
exports.getComponent = getComponent;
const components_js_1 = require("./components.js");
const COMPONENT_REGISTRY = [
    {
        name: 'Button',
        webComponent: 'Button',
        iosComponent: 'ButtonComponent + DynamicButtonStyle',
        iosFramework: 'UIKit',
        category: 'action',
        platforms: {
            web: { available: true },
            ios: { available: true, framework: 'UIKit' },
        },
    },
    {
        name: 'Text',
        webComponent: 'Text',
        iosComponent: 'TextComponent + DynamicTextStyle + UDTypography',
        iosFramework: 'Both',
        category: 'typography',
        platforms: {
            web: { available: true },
            ios: { available: true, framework: 'Both' },
        },
    },
    {
        name: 'Icon',
        webComponent: 'Icon',
        iosComponent: 'IconComponent + DynamicIconStyle',
        iosFramework: 'UIKit',
        category: 'media',
        platforms: {
            web: { available: true },
            ios: { available: true, framework: 'UIKit' },
        },
    },
    {
        name: 'Chip',
        webComponent: 'Chip',
        iosComponent: 'TagComponent + DynamicTagStyle',
        iosFramework: 'UIKit',
        category: 'selection',
        platforms: {
            web: { available: true },
            ios: { available: true, framework: 'UIKit' },
        },
    },
    {
        name: 'TabBar',
        webComponent: 'TabBar',
        iosComponent: 'CommonTabBarView + SwiftUITabBarView',
        iosFramework: 'Both',
        category: 'navigation',
        platforms: {
            web: { available: true },
            ios: { available: true, framework: 'Both' },
        },
    },
];
function loadMatchRates() {
    try {
        const path = require('path');
        const fs = require('fs');
        const resultsPath = path.resolve(__dirname, '../../packages/docs/src/data/design-check-results.json');
        // Try multiple possible locations
        const candidates = [
            resultsPath,
            path.resolve(__dirname, '../../../docs/src/data/design-check-results.json'),
        ];
        for (const p of candidates) {
            if (fs.existsSync(p)) {
                const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
                const rates = {};
                for (const r of data.results) {
                    if (!rates[r.component])
                        rates[r.component] = {};
                    rates[r.component][r.platform] = r.summary.matchRate;
                }
                return rates;
            }
        }
    }
    catch {
        // ignore
    }
    return {};
}
function listComponents(platform) {
    const matchRates = loadMatchRates();
    const lines = [
        '# MRT Design System Components',
        '',
        '| Component | Web | iOS | iOS Framework | Match Rate |',
        '|-----------|-----|-----|---------------|------------|',
    ];
    for (const comp of COMPONENT_REGISTRY) {
        if (platform && platform === 'ios' && !comp.platforms.ios.available)
            continue;
        const rates = matchRates[comp.name] || {};
        const webRate = rates['web'] !== undefined ? `${rates['web']}%` : '-';
        const iosRate = rates['ios'] !== undefined ? `${rates['ios']}%` : '-';
        const rateStr = platform === 'ios' ? iosRate : platform === 'web' ? webRate : `W:${webRate} / I:${iosRate}`;
        lines.push(`| ${comp.name} | ${comp.webComponent} | ${comp.iosComponent} | ${comp.iosFramework} | ${rateStr} |`);
    }
    lines.push('');
    lines.push(`총 ${COMPONENT_REGISTRY.length}개 컴포넌트`);
    lines.push('');
    lines.push('> 상세 스펙은 `get_component(name)` 으로 조회하세요.');
    return lines.join('\n');
}
function getComponent(name, platform) {
    const p = platform || 'web';
    const normalized = name.toLowerCase();
    // Delegate to existing implementations
    switch (normalized) {
        case 'button':
            return (0, components_js_1.getButtonUsage)(undefined, undefined, p);
        case 'text':
            return (0, components_js_1.getTextUsage)(undefined, p);
        case 'icon':
            return (0, components_js_1.getIconUsage)(undefined, p);
        case 'chip':
            return getChipSpec(p);
        case 'tabbar':
        case 'tab-bar':
        case 'tab':
            return getTabBarSpec(p);
        default:
            return `컴포넌트 "${name}"을(를) 찾을 수 없습니다.\n\n사용 가능한 컴포넌트: ${COMPONENT_REGISTRY.map((c) => c.name).join(', ')}\n\n> \`list_components()\` 로 전체 목록을 확인하세요.`;
    }
}
function getChipSpec(platform) {
    if (platform === 'ios') {
        return `# Chip (iOS) — TagComponent

## Import
\`\`\`swift
import BaseComponent
\`\`\`

## 컴포넌트
- **TagComponent** — UIKit 기반 칩/태그 컴포넌트
- **DynamicTagStyle** — 동적 스타일 적용

## 사용법
\`\`\`swift
let tag = TagComponent()
tag.configure(with: DynamicTagStyle(label: "필터", selected: true))
\`\`\`

## Props
| Prop | Type | Description |
|------|------|-------------|
| label | String | 칩 텍스트 |
| selected | Bool | 선택 상태 |
| disabled | Bool | 비활성 상태 |
`;
    }
    return `# Chip (Web)

## Import
\`\`\`tsx
import { Chip } from '@myrealtrip/web-ui';
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | (필수) | 칩 텍스트 |
| selected | boolean | false | 선택 상태 |
| disabled | boolean | false | 비활성 상태 |
| onClick | () => void | - | 클릭 핸들러 |

## 사용 예시
\`\`\`tsx
// 기본
<Chip label="국내 여행" onClick={() => setFilter('domestic')} />

// 선택 상태
<Chip label="인기순" selected={sortBy === 'popular'} onClick={toggleSort} />

// 비활성
<Chip label="마감" disabled />
\`\`\`

## 스타일 변형
| 상태 | 배경색 | 텍스트색 | 테두리 |
|------|--------|---------|--------|
| default | Gray/80 (#F1F3F5) | Gray/700 (#495056) | - |
| selected | Gray/1000 (#101418) | White (#FFFFFF) | - |
| outlined | White (#FFFFFF) | Gray/700 (#495056) | Gray/100 (#E9ECEF) |

## Anti-patterns
- \`<div className="chip">...</div>\` — 일반 div 사용 금지, \`<Chip>\` 사용
- \`variant="selected"\` — variant 없음, \`selected\` prop 사용
`;
}
function getTabBarSpec(platform) {
    if (platform === 'ios') {
        return `# TabBar (iOS) — CommonTabBarView

## Import
\`\`\`swift
import TabContainerManager
\`\`\`

## 컴포넌트
- **CommonTabBarView** — UIKit 기반 탭바
- **SwiftUITabBarView** — SwiftUI 기반 탭바

## 사용법 (UIKit)
\`\`\`swift
let tabBar = CommonTabBarView()
tabBar.configure(tabs: [
  TabItem(title: "홈", key: "home"),
  TabItem(title: "검색", key: "search"),
])
tabBar.onTabChange = { key in print(key) }
\`\`\`

## 사용법 (SwiftUI)
\`\`\`swift
SwiftUITabBarView(
  tabs: [.init(title: "홈", key: "home"), .init(title: "검색", key: "search")],
  activeKey: $selectedTab
)
\`\`\`
`;
    }
    return `# TabBar (Web)

## Import
\`\`\`tsx
import { TabBar } from '@myrealtrip/web-ui';
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tabs | TabItem[] | (필수) | 탭 목록 |
| activeKey | string | (필수) | 현재 활성 탭 key |
| onChange | (key: string) => void | (필수) | 탭 변경 핸들러 |
| size | 'medium' \\| 'small' | 'medium' | 탭 크기 |

## TabItem
\`\`\`typescript
interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
}
\`\`\`

## 사용 예시
\`\`\`tsx
const [activeTab, setActiveTab] = useState('domestic');

<TabBar
  tabs={[
    { key: 'domestic', label: '국내' },
    { key: 'overseas', label: '해외' },
    { key: 'air', label: '항공' },
  ]}
  activeKey={activeTab}
  onChange={setActiveTab}
/>
\`\`\`

## Anti-patterns
- \`<div role="tablist">...</div>\` — 직접 구현 금지, \`<TabBar>\` 사용
- \`selectedIndex={0}\` — index가 아닌 key 기반
`;
}

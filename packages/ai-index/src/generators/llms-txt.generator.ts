/**
 * llms-txt.generator.ts
 * llms.txt 및 llms-full.txt 생성
 */

export function generateLlmsTxt(): string {
  return `# MyRealTrip Design System

> 컴포넌트 구현 전 반드시 참조. 직접 hex 색상, 하드코딩 spacing 사용 금지.
> **MCP 사용 시 \`discover_tools\`를 먼저 호출하세요.**

## Quick Start (MCP)

1. \`discover_tools()\` — 전체 도구 확인
2. \`list_components()\` — 컴포넌트 목록 확인
3. \`get_component(name)\` — 특정 컴포넌트 스펙 조회

## Design Check Flow

1. \`get_design_check_status()\` — 전체 Figma-코드 동기화 현황
2. \`get_design_check_mismatches(component)\` — 불일치 상세 + 수정 정보

## 핵심 원칙

- **variant는 정의된 값만 사용**: primary | primaryOpt | secondary | secondaryOpt | tertiary | tertiaryOpt | text
- **색상은 반드시 토큰 참조**: 직접 hex (#141719) 하드코딩 금지, 토큰(\`color.gray.1000\`) 사용
- **아이콘 이름은 Ico + PascalCase**: IcoArrowLeft, IcoSearch, IcoHeart
- **typography는 {카테고리}{굵기}{크기} 형식**: headlineBold20, paragraphNormal14
- **Button은 일반 \`<button>\` 태그 금지**: 반드시 \`<Button>\` 컴포넌트 사용

## Import

\`\`\`tsx
import { Button, Text, Icon } from '@myrealtrip/web-ui';
\`\`\`

## 문서

- [Button](./docs/button.md) — CTA 버튼, 7가지 variant, 4가지 size
- [Text](./docs/text.md) — 타이포그래피, display/headline/paragraph/caption
- [Icon](./docs/icon.md) — 247개 아이콘, Ico + PascalCase
- [Design Tokens](./docs/tokens.md) — 색상, 그림자, 타이포그래피 토큰

## MCP Tools (v0.3.0)

| Category | Tool | Description |
|----------|------|-------------|
| Discovery | \`discover_tools\` | 전체 도구 목록 + 카테고리 |
| Components | \`list_components\` | 컴포넌트 목록 + 플랫폼 상태 |
| Components | \`get_component\` | 통합 컴포넌트 스펙 |
| Tokens | \`get_token\` | 토큰 값 조회 |
| Tokens | \`get_semantic_token\` | 의도 기반 토큰 |
| Search | \`search_design_system\` | BM25 자연어 검색 |
| Design Check | \`get_design_check_status\` | Figma-코드 동기화 현황 |
| Design Check | \`get_design_check_mismatches\` | 불일치 항목 + fix 정보 |
| Icons | \`list_icons\` | 카테고리별 아이콘 목록 |
| Icons | \`search_icons\` | 키워드 아이콘 검색 |
| Candidates | \`get_ds_candidates\` | DS 후보군 목록 |
| Candidates | \`register_ds_candidate\` | 후보군 등록 |

## iOS 컴포넌트 매핑

| Web (React) | iOS (Swift) | iOS 위치 | 프레임워크 |
|-------------|-------------|----------|-----------|
| Button | ButtonComponent + DynamicButtonStyle | BaseComponent/ | UIKit |
| Text | TextComponent + DynamicTextStyle + UDTypography | BaseComponent/ + DesignLayer/ | Both |
| Icon | IconComponent + DynamicIconStyle | BaseComponent/ | UIKit |
| Chip | TagComponent + DynamicTagStyle | BaseComponent/ | UIKit |
| TabBar | CommonTabBarView + SwiftUITabBarView | TabContainerManager/ | Both |

### iOS Import 패턴

\`\`\`swift
import BaseComponent    // Button, Text, Icon, Tag
import DesignLayer      // UDTypography (SwiftUI)
import TabContainerManager  // TabBar
\`\`\`

### iOS 네이밍 규칙
- 아이콘: \`ico_\` + snake_case (예: ico_arrow_left) — Web은 Ico + PascalCase
- 스타일: Dynamic{Component}Style (예: DynamicButtonStyle, DynamicTextStyle)
- Typography: UDTypography.headlineBold20 (SwiftUI에서 사용)

## 금지 패턴 (빠른 참조)

\`\`\`tsx
// ❌ 일반 button 태그
<button style={{ backgroundColor: '#141719' }}>버튼</button>

// ❌ 존재하지 않는 variant
<Button variant="solid">버튼</Button>
<Button variant="outlined">버튼</Button>

// ❌ 존재하지 않는 typography
<Text typography="body1">텍스트</Text>
<Text typography="title">텍스트</Text>

// ❌ 아이콘 이름 잘못된 형식
<Icon name="arrow-left" />
<Icon name="search" />
\`\`\`

## 올바른 패턴 (빠른 참조)

\`\`\`tsx
// ✅ 메인 CTA
<Button variant="primary" size="large" fullWidth onClick={handleClick}>
  결제하기
</Button>

// ✅ 로딩 상태
<Button variant="primaryOpt" loading={isLoading}>예약하기</Button>

// ✅ 아이콘 버튼
<Button variant="tertiary" leftIcon="IcoArrowLeft">뒤로 가기</Button>

// ✅ 텍스트
<Text as="h2" typography="headlineBold20">상품 제목</Text>
<Text typography="paragraphNormal14" lineClamp={2}>설명...</Text>

// ✅ 아이콘
<Icon name="IcoSearch" size={24} />
\`\`\`
`;
}

export function generateLlmsFullTxt(docs: Record<string, string>): string {
  const header = generateLlmsTxt();
  const sections = Object.entries(docs)
    .map(([name, content]) => `\n\n---\n\n${content}`)
    .join('');

  return header + sections;
}

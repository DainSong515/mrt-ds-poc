# Design Tokens

마이리얼트립 디자인 시스템 토큰. 직접 hex/숫자 하드코딩 금지 — 반드시 토큰 참조.

## 토큰 계층 구조

```
scale/     → 원시 값 (hex, px)
semantic/  → 의도 기반 참조 ({color.gray.1000} 형태)
component/ → 컴포넌트별 세부 토큰
```

## Scale 토큰 (색상)

### color.black

| 토큰 | 값 |
|------|-----|
| `color.black` | `#000000` |

### color.white

| 토큰 | 값 |
|------|-----|
| `color.white` | `#FFFFFF` |

### color.gray

| 토큰 | 값 |
|------|-----|
| `color.gray.50` | `#f8f9fa` |
| `color.gray.60` | `#f5f6f7` |
| `color.gray.80` | `#f1f3f5` |
| `color.gray.100` | `#e9ecef` |
| `color.gray.200` | `#dee2e6` |
| `color.gray.300` | `#ced4da` |
| `color.gray.400` | `#adb5bd` |
| `color.gray.500` | `#848c94` |
| `color.gray.600` | `#666d75` |
| `color.gray.700` | `#495056` |
| `color.gray.800` | `#343a40` |
| `color.gray.900` | `#212529` |
| `color.gray.1000` | `#141719` |

### color.blue

| 토큰 | 값 |
|------|-----|
| `color.blue.50` | `#f5fbff` |
| `color.blue.80` | `#e7f4fd` |
| `color.blue.100` | `#cbe7fd` |
| `color.blue.200` | `#a7d4f9` |
| `color.blue.300` | `#79bef5` |
| `color.blue.400` | `#51abf3` |
| `color.blue.500` | `#2b96ed` |
| `color.blue.600` | `#1583db` |
| `color.blue.700` | `#0a70c2` |
| `color.blue.800` | `#025ba5` |
| `color.blue.900` | `#01457d` |

### color.green

| 토큰 | 값 |
|------|-----|
| `color.green.50` | `#e6f8f3` |
| `color.green.80` | `#d7f6ee` |
| `color.green.100` | `#94e7d1` |
| `color.green.200` | `#71d2b8` |
| `color.green.300` | `#58caab` |
| `color.green.400` | `#33b893` |
| `color.green.500` | `#27ab86` |
| `color.green.600` | `#1c9674` |
| `color.green.700` | `#137b5e` |
| `color.green.800` | `#10634c` |
| `color.green.900` | `#0a4534` |

### color.yellow

| 토큰 | 값 |
|------|-----|
| `color.yellow.50` | `#fff8e1` |
| `color.yellow.80` | `#fff2c6` |
| `color.yellow.100` | `#ffe182` |
| `color.yellow.200` | `#ffd74e` |
| `color.yellow.300` | `#ffc929` |
| `color.yellow.400` | `#ffbf00` |
| `color.yellow.500` | `#ffad01` |
| `color.yellow.600` | `#ff9a00` |
| `color.yellow.700` | `#f78000` |
| `color.yellow.800` | `#db5600` |
| `color.yellow.900` | `#b94100` |

### color.red

| 토큰 | 값 |
|------|-----|
| `color.red.50` | `#fbf1ef` |
| `color.red.80` | `#ffd4cc` |
| `color.red.100` | `#ffaea1` |
| `color.red.200` | `#ff8d7c` |
| `color.red.300` | `#fe6a54` |
| `color.red.400` | `#fa5b4a` |
| `color.red.500` | `#ec4937` |
| `color.red.600` | `#dd3c2a` |
| `color.red.700` | `#c83323` |
| `color.red.800` | `#aa2a1b` |
| `color.red.900` | `#8d2115` |

### color.purple

| 토큰 | 값 |
|------|-----|
| `color.purple.50` | `#F6F0FF` |
| `color.purple.80` | `#E6D7FE` |
| `color.purple.100` | `#D0B4FD` |
| `color.purple.200` | `#B080FF` |
| `color.purple.300` | `#A26EF7` |
| `color.purple.400` | `#9355F6` |
| `color.purple.500` | `#8238FA` |
| `color.purple.600` | `#7226ED` |
| `color.purple.700` | `#520FBD` |
| `color.purple.800` | `#3D0B8E` |
| `color.purple.900` | `#29085E` |

## Scale 토큰 (그림자)

| 토큰 | 값 |
|------|-----|
| `shadow.E100` | `0px 0.5px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.03), 0px 2px 4px rgba(0, 0, 0, 0.03)` |
| `shadow.E200` | `0px 1px 2px rgba(0, 0, 0, 0.15)` |
| `shadow.E300` | `0px 1px 2px rgba(0, 0, 0, 0.05), 0px 4px 14px rgba(0, 0, 0, 0.1)` |
| `shadow.E400` | `0px 1px 4px rgba(0, 0, 0, 0.03), 0px 4px 12px rgba(0, 0, 0, 0.16)` |
| `shadow.E500` | `0px 4px 8px rgba(0, 0, 0, 0.05), 0px 8px 24px rgba(0, 0, 0, 0.2)` |
| `shadow.E100V` | `0px -0.5px 0px rgba(0, 0, 0, 0.02), 0px -1px 2px rgba(0, 0, 0, 0.03), 0px -2px 4px rgba(0, 0, 0, 0.03)` |
| `shadow.E200V` | `0px -1px 2px rgba(0, 0, 0, 0.15)` |
| `shadow.E300V` | `0px -1px 2px rgba(0, 0, 0, 0.05), 0px -4px 14px rgba(0, 0, 0, 0.1)` |
| `shadow.E400V` | `0px -1px 4px rgba(0, 0, 0, 0.03), 0px -4px 12px rgba(0, 0, 0, 0.16)` |
| `shadow.E500V` | `0px -4px 8px rgba(0, 0, 0, 0.05), 0px -8px 24px rgba(0, 0, 0, 0.2)` |

## Semantic 토큰 (색상 의도)

| 토큰 | 참조 | 설명 |
|------|------|------|
| `color.surface.primary` | `{color.gray.1000}` | 주요 배경 (primary 버튼 배경) |
| `color.surface.secondary` | `{color.gray.80}` | 보조 배경 (secondary 버튼 배경) |
| `color.surface.base` | `{color.white}` | 기본 흰 배경 |
| `color.surface.subtle` | `{color.gray.50}` | 매우 연한 배경 |
| `color.surface.accent` | `{color.blue.50}` | 강조 배경 (파란 계열) |
| `color.surface.danger` | `{color.red.50}` | 위험/오류 배경 |
| `color.surface.success` | `{color.green.50}` | 성공 배경 |
| `color.surface.warning` | `{color.yellow.50}` | 경고 배경 |
| `color.content.primary` | `{color.gray.1000}` | 주요 텍스트 |
| `color.content.secondary` | `{color.gray.700}` | 보조 텍스트 |
| `color.content.tertiary` | `{color.gray.500}` | 3차 텍스트, 플레이스홀더 |
| `color.content.disabled` | `{color.gray.300}` | 비활성 텍스트 |
| `color.content.inverse` | `{color.white}` | 반전 텍스트 (어두운 배경 위) |
| `color.content.accent` | `{color.blue.500}` | 강조 텍스트 (링크, 주요 액션) |
| `color.content.danger` | `{color.red.500}` | 에러, 위험 텍스트 |
| `color.content.success` | `{color.green.500}` | 성공 텍스트 |
| `color.border.default` | `{color.gray.100}` | 기본 테두리 |
| `color.border.strong` | `{color.gray.300}` | 강조 테두리 |
| `color.border.accent` | `{color.blue.500}` | 강조 테두리 (파란) |
| `color.border.danger` | `{color.red.500}` | 에러 테두리 |
| `color.interactive.accent` | `{color.blue.500}` | 주요 인터랙션 (primaryOpt 버튼 배경) |
| `color.interactive.danger` | `{color.red.500}` | 위험 인터랙션 |
| `color.interactive.success` | `{color.green.500}` | 성공 인터랙션 |
| `color.interactive.disabled` | `{color.gray.50}` | 비활성 인터랙션 배경 |

## Component 토큰 (Button)

| 토큰 | 참조/값 | 설명 |
|------|---------|------|
| `button.primary.background` | `{color.gray.1000}` | primary 버튼 기본 배경 |
| `button.primary.background-hover` | `rgba(20, 23, 25, 0.9)` | primary 버튼 호버 배경 |
| `button.primary.background-active` | `{color.gray.900}` | primary 버튼 활성 배경 |
| `button.primary.background-disabled` | `{color.gray.50}` | primary 버튼 비활성 배경 |
| `button.primary.content` | `{color.white}` | primary 버튼 텍스트/아이콘 |
| `button.primary.content-disabled` | `{color.gray.300}` | primary 버튼 비활성 텍스트 |
| `button.primaryOpt.background` | `{color.blue.500}` | primaryOpt 버튼 기본 배경 |
| `button.primaryOpt.background-hover` | `rgba(43, 150, 237, 0.9)` | primaryOpt 버튼 호버 배경 |
| `button.primaryOpt.background-disabled` | `{color.gray.80}` | primaryOpt 버튼 비활성 배경 |
| `button.primaryOpt.content` | `{color.white}` | primaryOpt 버튼 텍스트/아이콘 |
| `button.primaryOpt.content-disabled` | `{color.blue.100}` | primaryOpt 버튼 비활성 텍스트 |
| `button.secondary.background` | `{color.gray.80}` | secondary 버튼 기본 배경 |
| `button.secondary.background-disabled` | `{color.gray.50}` | secondary 버튼 비활성 배경 |
| `button.secondary.content` | `{color.gray.1000}` | secondary 버튼 텍스트 |
| `button.secondary.content-disabled` | `{color.gray.300}` | secondary 버튼 비활성 텍스트 |
| `button.secondaryOpt.background` | `{color.white}` | secondaryOpt 버튼 기본 배경 |
| `button.secondaryOpt.background-disabled` | `{color.gray.50}` | secondaryOpt 버튼 비활성 배경 |
| `button.secondaryOpt.content` | `{color.gray.1000}` | secondaryOpt 버튼 텍스트 |
| `button.secondaryOpt.content-disabled` | `{color.gray.300}` | secondaryOpt 버튼 비활성 텍스트 |
| `button.tertiary.background` | `{color.white}` | tertiary 버튼 기본 배경 |
| `button.tertiary.border` | `{color.gray.100}` | tertiary 버튼 테두리 |
| `button.tertiary.content` | `{color.gray.700}` | tertiary 버튼 텍스트 |
| `button.tertiary.content-disabled` | `{color.gray.300}` | tertiary 버튼 비활성 텍스트 |
| `button.tertiaryOpt.background` | `{color.white}` | tertiaryOpt 버튼 기본 배경 |
| `button.tertiaryOpt.content` | `{color.gray.700}` | tertiaryOpt 버튼 텍스트 |
| `button.tertiaryOpt.content-disabled` | `{color.gray.300}` | tertiaryOpt 버튼 비활성 텍스트 |
| `button.text.content` | `{color.gray.1000}` | text 버튼 텍스트 |
| `button.text.content-disabled` | `{color.gray.300}` | text 버튼 비활성 텍스트 |
| `button.size.large.height` | `56px` |  |
| `button.size.large.padding-x` | `20px` |  |
| `button.size.large.typography` | `{typography.headlineNormal18}` |  |
| `button.size.medium.height` | `48px` |  |
| `button.size.medium.padding-x` | `16px` |  |
| `button.size.medium.typography` | `{typography.headlineNormal16}` |  |
| `button.size.small.height` | `40px` |  |
| `button.size.small.padding-x` | `12px` |  |
| `button.size.small.typography` | `{typography.headlineNormal14}` |  |
| `button.size.xSmall.height` | `36px` |  |
| `button.size.xSmall.padding-x` | `10px` |  |
| `button.size.xSmall.typography` | `{typography.headlineNormal14}` |  |
| `button.shape.pill` | `99px` | pill 형태 테두리 반경 |
| `button.shape.rectangle` | `4px` | rectangle 형태 테두리 반경 |

## 주요 색상 빠른 참조

| 토큰 | 값 | 주요 사용처 |
|------|-----|-----------|
| `color.gray.1000` | #141719 | primary 버튼 배경, 주요 텍스트 |
| `color.gray.900` | #212529 | 진한 텍스트 |
| `color.gray.700` | #495056 | 보조 텍스트 |
| `color.gray.500` | #848c94 | 비활성 텍스트, 플레이스홀더 |
| `color.gray.300` | #ced4da | disabled 텍스트 |
| `color.gray.100` | #e9ecef | 테두리 |
| `color.gray.80` | #f1f3f5 | secondary 버튼 배경 |
| `color.blue.500` | #2b96ed | primaryOpt 버튼, 링크, 강조 |
| `color.red.500` | #ec4937 | 에러, 위험 액션 |
| `color.green.500` | #27ab86 | 성공, 확인 |

## 키워드

토큰, token, 색상, color, 그림자, shadow, 타이포그래피, typography, semantic, scale, component, 디자인 변수

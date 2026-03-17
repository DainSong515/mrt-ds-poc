---
name: design-check
description: MCP 도구를 활용한 Figma-코드 동기화 현황 확인
trigger:
  - /design-check
  - 디자인 체크
  - 동기화 현황
  - Figma 맞는지 확인
arguments: "status | {component} {platform?}"
---

# /design-check — Figma-코드 동기화 현황 확인

MCP 도구를 호출하여 Figma-코드 동기화 상태를 확인하고 보고한다.

## 사용법

```
/design-check status            # 전체 현황 요약
/design-check Button ios        # 특정 컴포넌트 mismatch 상세
/design-check Typography        # 모든 플랫폼의 Typography 현황
```

## 워크플로우

### Step 1: PARSE — 인자 파싱

$ARGUMENTS를 파싱한다:
- `status` → 전체 현황 모드
- `{component}` → 특정 컴포넌트 모드
- `{component} {platform}` → 특정 컴포넌트 + 플랫폼 모드

유효한 component: `Button`, `Chip`, `TabBar`, `Color`, `Typography`
유효한 platform: `web`, `ios`

### Step 2: CALL — MCP 도구 호출

#### 전체 현황 (`status`)

MCP 도구 `get_design_check_status()` 호출:

```
결과: 각 component/platform별 matchRate, total, match, mismatch 수
```

출력 포맷:

```
📊 Design Check 현황

| Component    | Platform | Match Rate | Match/Total | Status      |
|-------------|----------|------------|-------------|-------------|
| Button      | web      | 70.4%      | 19/27       | in-progress |
| Color       | ios      | 100.0%     | 28/28       | done        |
| Typography  | ios      | 55.0%      | 11/20       | in-progress |
...

Status 기준: ≥90% done | 50-89% in-progress | <50% not-ready
```

#### 특정 컴포넌트 (`{component} {platform?}`)

MCP 도구 `get_design_check_mismatches(component, platform?)` 호출:

```
결과: mismatch 항목 상세 (property, figmaValue, codeValue, codeToken)
```

출력 포맷:

```
🔍 {Component} ({platform}) Mismatch 상세

matchRate: {rate}% ({match}/{total})

| # | Category    | Property          | Figma Value | Code Value | Token           |
|---|------------|-------------------|-------------|------------|-----------------|
| 1 | Color      | primary/background| #101418     | #141719    | color.gray.1000 |
...
```

### Step 3: REPORT — 결과 출력

위 포맷에 따라 결과를 출력한다.

### Step 4: SUGGEST — 후속 작업 안내

mismatch가 있으면 안내:

```
💡 수정하려면: /design-sync {component} {platform}
```

mismatch가 없으면:

```
✅ 모든 값이 Figma와 동기화되어 있습니다.
```

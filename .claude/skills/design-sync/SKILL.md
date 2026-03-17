---
name: design-sync
description: Figma-코드 불일치를 읽고 대상 레포에서 값 수정 + PR 생성까지 자동화
trigger:
  - /design-sync
  - 디자인 싱크
  - 토큰 동기화
  - Figma 불일치 수정
  - lineHeight 맞춰줘
arguments: "{component} {platform?}"
---

# /design-sync — Figma-코드 동기화 자동 수정

design-check-results.json의 mismatch를 읽고, 대상 레포(ios-traveler / frontend-dubai)에서 코드 값을 수정하고 PR을 생성한다.

## 사용법

```
/design-sync Typography ios      # iOS Typography mismatch 수정
/design-sync Color web           # Web Color mismatch 수정
/design-sync Button              # 양쪽 플랫폼 모두
```

## 워크플로우

### Step 1: READ — mismatch 데이터 로드

`packages/docs/src/data/design-check-results.json` 파일을 읽는다.

### Step 2: FILTER — component + platform 파싱

$ARGUMENTS에서 component와 platform을 파싱한다.
- platform 미지정 시 해당 component의 모든 플랫폼 결과를 대상으로 한다.
- `status: "mismatch"` 항목만 필터링한다.

mismatch가 없으면 "모든 값이 동기화되어 있습니다" 메시지를 출력하고 종료.

### Step 3: MAPPING — 대상 레포 + 파일 경로 확인

`packages/docs/src/data/sync-mappings.ts`의 `SYNC_MAPPINGS` 배열과 `references/sync-mappings.md`를 참조하여:
- 각 mismatch 항목의 `codeToken` / `property`로 매핑 검색
- 대상 레포(`owner/repo`)와 파일 경로 확인

매핑을 찾지 못한 항목은 "수동 확인 필요" 목록에 추가.

### Step 4: FETCH — 대상 레포의 default branch SHA 조회

```bash
gh api repos/{owner}/{repo}/git/ref/heads/{default_branch} --jq '.object.sha'
```

### Step 5: BRANCH — 싱크 브랜치 생성

```bash
gh api repos/{owner}/{repo}/git/refs \
  -f ref="refs/heads/fix/design-sync-{component}-{YYYY-MM-DD}" \
  -f sha="{default_branch_sha}"
```

이미 존재하면 기존 브랜치 사용.

### Step 6: EDIT — 파일 수정 + 커밋

각 mismatch 항목에 대해:

```bash
# 1. 파일 내용 가져오기
gh api repos/{owner}/{repo}/contents/{file_path} \
  --jq '.content' | base64 -d

# 2. 값 치환 (references/token-value-rules.md의 변환 규칙 적용)
#    - 반드시 규칙 참조: iOS lineHeight는 % → multiple, fontWeight는 숫자 → enum 등

# 3. 수정된 내용 커밋
gh api repos/{owner}/{repo}/contents/{file_path} \
  -X PUT \
  -f message="fix: sync {component} {property} to Figma value" \
  -f content="{base64_encoded_content}" \
  -f sha="{file_sha}" \
  -f branch="fix/design-sync-{component}-{date}"
```

**주의사항** (references/token-value-rules.md 필독):
- iOS `UDTypography+Attribute.swift`: 각 case 독립 수정, 일괄 replace 금지
- iOS `DynamicColor.swift`: 다크모드 쌍 확인
- Web JSON: `$value` 필드만 수정, `$type` 등 메타데이터 유지

### Step 7: PR — Pull Request 생성

```bash
gh pr create \
  --repo {owner}/{repo} \
  --base {default_branch} \
  --head fix/design-sync-{component}-{date} \
  --title "fix: design-sync {Component} — Figma 값 동기화" \
  --body "$(cat <<'EOF'
## Summary
- design-check-results.json mismatch 기반 자동 수정
- 변경 항목: {변경 목록}

## Changed Properties
| Property | Before | After (Figma) |
|----------|--------|---------------|
| ... | ... | ... |

## References
- mrt-ds-poc design-check-results.json
- Figma node: {figmaNodeId}

🤖 Generated with Claude Code /design-sync
EOF
)"
```

### Step 8: REPORT — 결과 요약

변경 요약을 출력한다:
- 수정된 항목 수 / 전체 mismatch 수
- PR URL
- 수동 확인 필요 항목 (매핑 미발견)
- 남은 mismatch가 있으면 추가 `/design-sync` 호출 안내

## 참조 파일

- `references/sync-mappings.md` — 토큰-파일 매핑 요약
- `references/token-value-rules.md` — 플랫폼별 값 변환 규칙

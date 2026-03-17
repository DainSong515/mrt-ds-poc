---
paths:
  - "**/design-check-results.json"
  - "**/sync-mappings.ts"
  - "**/progress-board.ts"
---

# Design Check 데이터 파일 규칙

## design-check-results.json 구조

```typescript
{
  results: Array<{
    component: string;        // "Button" | "Chip" | "TabBar" | "Color" | "Typography"
    platform: "web" | "ios";
    timestamp: string;        // ISO 8601
    figmaNodeId: string;
    summary: {
      total: number;
      match: number;
      mismatch: number;
      matchRate: number;      // 0-100 (백분율)
    };
    items: Array<{
      category: string;       // "Color" | "Spacing" | "Typography" | "Gray" | "Blue" 등
      property: string;
      figmaValue: string;
      figmaToken?: string;
      codeValue: string;
      codeToken?: string;
      status: "match" | "mismatch" | "missing";
    }>;
  }>
}
```

## matchRate 계산

```
matchRate = (match / total) × 100
```

소수점 1자리까지 표기 (예: 70.4).

## status 자동 유도

| matchRate | status |
|-----------|--------|
| ≥ 90% | `done` |
| 50% – 89% | `in-progress` |
| < 50% | `not-ready` |

이 status는 progress-board.ts의 `designCheckStatus` 필드와 연동된다.

## sync-mappings.ts 수정 시

- `SYNC_MAPPINGS` 배열에 새 매핑 추가 시 `SyncMapping` 인터페이스를 따른다.
- `codeTokenPattern`: mismatch 항목의 `codeToken`에서 공통 prefix 추출.
- `filePath`: 대상 레포 기준 상대 경로.
- `jsonPath`: `{placeholder}` 문법으로 동적 경로 표현.
- `platform`: `'web'` | `'ios'`.
- `repo`: `'frontend-dubai'` | `'ios-traveler'`.
- `TARGET_REPOS` 업데이트 시: `owner`, `repo` 필드는 GitHub 레포 식별자와 일치해야 한다.
- `PROPERTY_TO_TOKEN` 매핑: `codeToken` 없는 항목의 fallback 검색용. property prefix → codeTokenPattern.

## progress-board.ts 수정 시

- design-check-results.json의 matchRate 변경 시 progress-board.ts의 해당 컴포넌트 status도 함께 업데이트한다.
- `designCheckStatus` 필드가 자동 유도 기준과 일치하는지 확인한다.

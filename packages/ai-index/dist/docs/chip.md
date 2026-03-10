# Chip

필터/카테고리 선택용 칩 컴포넌트. 기획전 필터바처럼 가로 스크롤 단일 선택 UI에 사용.

## Import

```tsx
import { Chip, ChipGroup } from '@myrealtrip/ds-ui';
```

## variant × selected 상태

| 상태 | 배경 | 텍스트 |
|------|------|--------|
| filled + selected | color.gray.1000 (#141719) | white |
| filled + default | color.gray.80 (#f1f3f5) | color.gray.700 (#495056) |
| outlined + selected | white | color.gray.1000 (#141719) + 테두리 |
| outlined + default | white | color.gray.700 (#495056) + 테두리 gray.100 |

## size

| size | 높이 | 패딩 | 타이포그래피 |
|------|------|------|-------------|
| `medium` | 36px | 12px | headlineNormal14 |
| `small` | 28px | 10px | captionNormal12 |

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `selected` | boolean | false | 선택 상태 |
| `variant` | 'filled' \| 'outlined' | 'filled' | 스타일 변형 |
| `size` | 'medium' \| 'small' | 'medium' | 크기 |
| `disabled` | boolean | false | 비활성화 |
| `onClick` | () => void | - | 클릭 핸들러 |
| `children` | ReactNode | **(필수)** | 칩 텍스트 |

## 사용 예시

```tsx
// 단독 사용
<Chip selected onClick={() => setFilter('all')}>전체</Chip>
<Chip onClick={() => setFilter('hotel')}>호텔/리조트</Chip>

// 가로 스크롤 필터바 (ChipGroup)
<ChipGroup
  options={[
    { id: 'all', label: '전체' },
    { id: 'nol', label: 'NOL 티켓' },
    { id: 'motel', label: '모텔' },
    { id: 'hotel', label: '호텔/리조트' },
    { id: 'pension', label: '펜션/풀빌라' },
  ]}
  defaultSelected="all"
  onChange={(id) => console.log(id)}
/>
```

## 키워드

칩, chip, 필터, filter, 카테고리, category, 태그, tag, 선택, selected, 필터바, filterbar, 가로스크롤

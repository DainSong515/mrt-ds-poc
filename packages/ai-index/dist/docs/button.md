# Button

마이리얼트립 디자인 시스템의 기본 버튼 컴포넌트. variant로 시각적 스타일을 결정한다.

## Import

```tsx
import { Button } from '@myrealtrip/web-ui';
```

## variant

| variant | 배경 | 텍스트 | 설명 |
|---------|------|--------|------|
| `primary` | color.gray.1000 (#141719) | color.white (#FFFFFF) | 메인 CTA. 검정 배경 흰 글씨. |
| `primaryOpt` | color.blue.500 (#2b96ed) | color.white (#FFFFFF) | 강조 CTA. 파란 배경 흰 글씨. |
| `secondary` | color.gray.80 (#f1f3f5) | color.gray.1000 (#141719) | 보조 액션. 밝은 회색 배경 검정 글씨. |
| `secondaryOpt` | color.white (#FFFFFF) | color.gray.1000 (#141719) | 흰 배경 위 보조 액션. |
| `tertiary` | color.white (#FFFFFF) | color.gray.700 (#495056) | 테두리 있는 버튼 (border: color.gray.100). |
| `tertiaryOpt` | color.white (#FFFFFF) | color.gray.700 (#495056) | 테두리 없는 최소 강조 버튼. |
| `text` | transparent | color.gray.1000 (#141719) | 텍스트 언더라인 인라인 링크형 버튼. |

## size

| size | 높이 | 패딩 | 타이포그래피 |
|------|------|------|-------------|
| `large` | 56px | 20px | headlineNormal18 |
| `medium` | 48px | 16px | headlineNormal16 |
| `small` | 40px | 12px | headlineNormal14 |
| `xSmall` | 36px | 10px | headlineNormal14 |

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `variant` | `'primary' | 'primaryOpt' | 'secondary' | 'secondaryOpt' | 'tertiary' | 'tertiaryOpt' | 'text'` | 'primary' | 버튼 시각적 스타일  |
| `size` | `'large' | 'medium' | 'small' | 'xSmall'` | 'medium' | 버튼 크기  |
| `shape` | `'pill' | 'rectangle'` | 'pill' | 버튼 테두리 형태  |
| `leftIcon` | `IconNames` | - | 버튼 왼쪽 아이콘. 예: "IcoArrowLeft"  |
| `rightIcon` | `IconNames` | - | 버튼 오른쪽 아이콘  |
| `iconOnly` | `boolean` | false | 아이콘 전용 정사각형 버튼  |
| `fullWidth` | `boolean` | false | 부모 너비를 꽉 채움  |
| `loading` | `boolean` | false | 로딩 스피너 표시. 클릭 비활성화  |
| `disabled` | `boolean` | false | 비활성화 상태  |
| `isCompact` | `boolean` | false | variant='text'일 때 높이 감소  |
| `onClick` | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - | 클릭 이벤트 핸들러  |
| `children` | `React.ReactNode` | - | 버튼 내용 **(필수)** |

## 사용 예시

```tsx
// 메인 CTA (검정 버튼)
import { Button } from '@myrealtrip/web-ui';

<Button variant="primary" size="large" fullWidth onClick={() => router.push('/checkout')}>
  결제하기
</Button>
```

```tsx
// 강조 CTA (파란 버튼)
<Button variant="primaryOpt" size="large" fullWidth>
  예약하기
</Button>
```

```tsx
// 로딩 상태
<Button variant="primary" loading={isLoading}>
  처리 중...
</Button>
```

```tsx
// 아이콘 + 텍스트
<Button variant="tertiary" leftIcon="IcoArrowLeft">
  뒤로 가기
</Button>
```

```tsx
// 아이콘 전용
<Button variant="secondary" iconOnly>
  <Icon name="IcoSearch" size={20} />
</Button>
```

```tsx
// 전체 너비 보조 버튼
<Button variant="secondary" size="medium" fullWidth>
  장바구니 담기
</Button>
```

## 주의사항

```tsx
// ❌ 일반 button 태그 직접 스타일링
<button style={{ backgroundColor: '#141719' }}>버튼</button>

// ❌ 존재하지 않는 variant
<Button variant="solid">버튼</Button>
<Button variant="outlined">버튼</Button>
<Button color="primary">버튼</Button>
```

## 키워드

버튼, CTA, 클릭, variant, primary, secondary, tertiary, loading, disabled, 로딩, 비활성, 아이콘, icon, 결제, 예약

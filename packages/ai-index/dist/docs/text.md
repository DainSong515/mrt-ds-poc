# Text

마이리얼트립 디자인 시스템의 텍스트 컴포넌트. 타이포그래피 시스템을 통해 일관된 텍스트 스타일을 제공한다.

## Import

```tsx
import { Text } from '@myrealtrip/web-ui';
```

## typography 네이밍 규칙

`{카테고리}{굵기}{크기}`

- **카테고리**: `display` / `headline` / `paragraph` / `caption`
- **굵기**: `Bold` / `Normal`
- **크기**: 숫자 (9~40)

## 카테고리별 variant

### display (랜딩, 이벤트 배너)
displayBold40, displayBold36, displayBold32, displayNormal40, displayNormal36, displayNormal32

### headline (소제목, 카드 제목)
headlineBold28 ~ headlineBold14, headlineNormal28 ~ headlineNormal14

### paragraph (본문)
paragraphBold26 ~ paragraphBold13, paragraphNormal26 ~ paragraphNormal13

### caption (부가 정보, 날짜)
captionBold15 ~ captionBold9, captionNormal15 ~ captionNormal9

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| typography | TextTypography | (필수) | 타이포그래피 variant |
| as | 'p' \| 'span' \| 'h1'~'h6' \| 'div' \| 'label' | 'span' | HTML 태그 |
| color | string | - | 텍스트 색상 |
| lineClamp | number | - | N줄 말줄임표 |

## 사용 예시

```tsx
// 상품 제목
<Text as="h2" typography="headlineBold20">
  제주도 3박 4일 패키지
</Text>

// 2줄 제한 설명
<Text typography="paragraphNormal14" lineClamp={2}>
  긴 상품 설명이 여기에 들어갑니다...
</Text>

// 부가 정보 (회색)
<Text typography="captionNormal12" color="#848c94">
  2024년 3월 15일 출발
</Text>

// 가격 표시
<Text typography="headlineBold24" color="#141719">
  ₩ 299,000
</Text>
```

## 주의사항

- `typography="body1"` 같은 Material UI 스타일 variant 사용 금지
- 일반 `<p>` 태그에 직접 스타일링 금지
- 색상은 토큰 값 참조 권장 (예: `color.gray.500` = `#848c94`)

## 키워드

텍스트, 타이포그래피, typography, headline, paragraph, caption, display, 제목, 본문, 설명, 캡션

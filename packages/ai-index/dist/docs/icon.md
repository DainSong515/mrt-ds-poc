# Icon

마이리얼트립 디자인 시스템의 아이콘 컴포넌트. 247개 아이콘을 제공한다.

## Import

```tsx
import { Icon } from '@myrealtrip/web-ui';
```

## 아이콘 이름 규칙

반드시 **`Ico` + PascalCase** 형식을 사용한다.

✅ `IcoArrowLeft`, `IcoSearch`, `IcoHeart`
❌ `arrow-left`, `search`, `arrowLeft`

## 카테고리별 주요 아이콘

### 방향/화살표
IcoArrowLeft, IcoArrowRight, IcoArrowUp, IcoArrowDown,
IcoChevronLeft, IcoChevronRight, IcoChevronUp, IcoChevronDown

### 액션
IcoSearch, IcoAdd, IcoClose, IcoDelete, IcoEdit,
IcoShare, IcoDownload, IcoUpload, IcoCopy, IcoFilter

### 콘텐츠
IcoHeart, IcoHeartLine, IcoBookmark, IcoBookmarkLine,
IcoStar, IcoStarLine, IcoCheck, IcoCheckCircle, IcoInfo

### 여행
IcoFlight, IcoHotel, IcoCalendar, IcoLocationOn,
IcoLuggage, IcoCar, IcoBus, IcoTrain

### UI
IcoMenu, IcoHome, IcoPerson, IcoSettings,
IcoNotification, IcoCamera, IcoImage, IcoLink

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| name | IconNames | (필수) | 아이콘 이름 (Ico + PascalCase) |
| size | number | 24 | 아이콘 크기 (px) |
| color | string | currentColor | 아이콘 색상 |

## 사용 예시

```tsx
// 단독 사용
<Icon name="IcoSearch" size={24} />
<Icon name="IcoHeart" size={20} color="#ec4937" />

// Button에서 사용 (권장)
<Button variant="tertiary" leftIcon="IcoArrowLeft">뒤로</Button>
<Button variant="primary" rightIcon="IcoArrowRight">다음</Button>

// 아이콘 전용 버튼
<Button variant="secondary" iconOnly>
  <Icon name="IcoSearch" size={20} />
</Button>
```

## 키워드

아이콘, icon, Ico, 화살표, 검색, 하트, 별, 즐겨찾기, 방향, 액션, 여행, navigation

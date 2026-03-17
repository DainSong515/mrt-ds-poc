import{j as e,r as l}from"./index-CXpP05hU.js";function s({props:o}){return e.jsx("div",{className:"overflow-x-auto rounded-lg border border-gray-200",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-50 border-b border-gray-200",children:[e.jsx("th",{className:"text-left px-4 py-2.5 font-semibold text-gray-700",children:"Prop"}),e.jsx("th",{className:"text-left px-4 py-2.5 font-semibold text-gray-700",children:"Type"}),e.jsx("th",{className:"text-left px-4 py-2.5 font-semibold text-gray-700",children:"Default"}),e.jsx("th",{className:"text-left px-4 py-2.5 font-semibold text-gray-700",children:"설명"})]})}),e.jsx("tbody",{children:Object.entries(o).map(([a,t])=>e.jsxs("tr",{className:"border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors",children:[e.jsxs("td",{className:"px-4 py-2.5",children:[e.jsx("code",{className:"text-blue-600 font-mono text-xs",children:a}),t.required&&e.jsx("span",{className:"ml-1.5 text-xs text-red-500 font-medium",children:"*"})]}),e.jsx("td",{className:"px-4 py-2.5",children:e.jsx("code",{className:"text-purple-600 font-mono text-xs break-all",children:t.type})}),e.jsx("td",{className:"px-4 py-2.5",children:t.default?e.jsx("code",{className:"text-gray-500 font-mono text-xs",children:t.default}):e.jsx("span",{className:"text-gray-300",children:"—"})}),e.jsx("td",{className:"px-4 py-2.5 text-gray-600 text-xs",children:t.description})]},a))})]})})}function p({code:o,language:a="tsx"}){const[t,r]=l.useState(!1);function i(){navigator.clipboard.writeText(o),r(!0),setTimeout(()=>r(!1),2e3)}return e.jsxs("div",{className:"relative rounded-lg overflow-hidden border border-gray-200 bg-gray-900",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2 border-b border-gray-700",children:[e.jsx("span",{className:"text-xs text-gray-400 font-mono",children:a}),e.jsx("button",{onClick:i,className:"text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700",children:t?"✓ 복사됨":"복사"})]}),e.jsx("pre",{className:"p-4 overflow-x-auto text-sm",children:e.jsx("code",{className:"text-gray-100 font-mono leading-relaxed",children:o})})]})}function c({patterns:o}){return e.jsxs("div",{className:"rounded-lg border border-red-200 bg-red-50 p-4",children:[e.jsx("p",{className:"text-sm font-semibold text-red-700 mb-2",children:"안티패턴 주의"}),e.jsx("ul",{className:"space-y-1",children:o.map((a,t)=>e.jsx("li",{className:"text-sm text-red-600 font-mono",children:a},t))})]})}const d={importPath:"@myrealtrip/web-ui",description:"마이리얼트립 디자인 시스템의 기본 버튼 컴포넌트. variant로 시각적 스타일을 결정한다.",figmaUrl:"https://www.figma.com/design/TRtkkl5QJ0ly261AcqyUF9/Myrealtrip-Design-System?node-id=7437-9581",props:{variant:{type:"'primary' | 'primaryOpt' | 'secondary' | 'secondaryOpt' | 'tertiary' | 'tertiaryOpt' | 'text'",default:"'primary'",description:"버튼 스타일 변형"},size:{type:"'large' | 'medium' | 'small' | 'xSmall'",default:"'medium'",description:"버튼 크기 (large: 56px, medium: 48px, small: 40px, xSmall: 36px)"},shape:{type:"'pill' | 'rectangle'",default:"'pill'",description:"테두리 형태 (pill: 99px radius, rectangle: 4px radius)"},leftIcon:{type:"IconNames",description:'버튼 왼쪽 아이콘 이름. 예: "IcoArrowLeft"'},rightIcon:{type:"IconNames",description:"버튼 오른쪽 아이콘 이름."},iconOnly:{type:"boolean",default:"false",description:"아이콘만 있는 정사각형 버튼."},fullWidth:{type:"boolean",default:"false",description:"부모 너비를 꽉 채움 (width: 100%)"},loading:{type:"boolean",default:"false",description:"로딩 스피너 표시. 사용자 인터랙션 비활성화."},disabled:{type:"boolean",default:"false",description:"비활성화 상태."},isCompact:{type:"boolean",default:"false",description:"variant='text'일 때 높이를 줄임."},onClick:{type:"(e: React.MouseEvent<HTMLButtonElement>) => void",description:"클릭 이벤트 핸들러"}},usageExamples:{기본:`import { Button } from '@myrealtrip/web-ui';

<Button variant="primary" onClick={() => router.push('/login')}>
  로그인
</Button>`,로딩:`const [isLoading, setIsLoading] = useState(false);

<Button
  variant="primary"
  loading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await submitForm();
    setIsLoading(false);
  }}
>
  예약하기
</Button>`,아이콘:`<Button variant="tertiary" leftIcon="IcoArrowLeft">
  뒤로 가기
</Button>`},antiPatterns:["❌ variant='solid' — 존재하지 않음. primary 사용","❌ variant='outline' — 존재하지 않음. tertiary 사용","❌ <button style={{ backgroundColor: '#141719' }}> — 일반 button 태그 사용 금지","❌ size='sm' — 존재하지 않음. small 사용"],ios:{importPath:"import BaseComponent",modulePath:"BaseComponent/ButtonComponent",framework:"UIKit",props:{style:{type:"DynamicButtonStyle",description:"버튼 스타일 (primary, secondary, tertiary, text 등)"},title:{type:"String",description:"버튼 텍스트"},isEnabled:{type:"Bool",default:"true",description:"활성화 상태"},leftIcon:{type:"UIImage?",description:"왼쪽 아이콘 이미지"},rightIcon:{type:"UIImage?",description:"오른쪽 아이콘 이미지"},action:{type:"(() -> Void)?",description:"탭 이벤트 핸들러"}},usageExamples:{기본:`let button = ButtonComponent()
button.configure(
    style: .primary,
    title: "로그인"
)
button.action = { [weak self] in
    self?.navigateToLogin()
}`,아이콘:`let button = ButtonComponent()
button.configure(
    style: .tertiary,
    title: "뒤로 가기",
    leftIcon: UIImage(named: "ico_arrow_left")
)`,로딩:`let button = ButtonComponent()
button.configure(style: .primary, title: "예약하기")
button.isLoading = true  // 로딩 스피너 표시`}}},m={importPath:"@myrealtrip/web-ui",description:"타이포그래피 컴포넌트. typography prop으로 미리 정의된 스타일을 적용한다.",figmaUrl:"https://www.figma.com/design/TRtkkl5QJ0ly261AcqyUF9/Myrealtrip-Design-System?node-id=8144-74939",props:{typography:{type:"TypographyVariant",default:"'paragraphNormal16'",description:"타이포그래피 변형. {카테고리}{굵기}{크기} 패턴."},as:{type:"'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",default:"'span'",description:"렌더링할 HTML 요소."},lineClamp:{type:"number",description:"텍스트 줄 제한. 넘치는 텍스트는 말줄임표 표시."},align:{type:"CSSProperties['textAlign']",description:"텍스트 정렬 (left/center/right/justify)"},color:{type:"string",description:"CSS color 값. 기본값은 inherit."}},usageExamples:{기본:`import { Text } from '@myrealtrip/web-ui';

<Text typography="paragraphNormal16">안녕하세요</Text>`,제목:`<Text as="h2" typography="headlineBold20">
  제주도 3박 4일 패키지
</Text>`,줄제한:`<Text typography="paragraphNormal14" lineClamp={2}>
  매우 긴 상품 설명 텍스트가 여기에 들어갑니다.
  두 줄을 넘어가면 말줄임표가 표시됩니다.
</Text>`},antiPatterns:["❌ typography='body1' — 존재하지 않음","❌ typography='title' — 존재하지 않음","❌ <p style={{ fontSize: '16px' }}> — 일반 태그 직접 스타일링 금지","❌ <Text variant='bold'> — variant prop 없음, typography 사용"],ios:{importPath:`import BaseComponent
import DesignLayer`,modulePath:"BaseComponent/TextComponent + DesignLayer/UDTypography",framework:"Both",props:{style:{type:"DynamicTextStyle",description:"텍스트 스타일 (headlineBold20, paragraphNormal16 등)"},text:{type:"String",description:"표시할 텍스트"},numberOfLines:{type:"Int",default:"0",description:"텍스트 줄 제한 (0은 무제한)"},textColor:{type:"UIColor",description:"텍스트 색상"},textAlignment:{type:"NSTextAlignment",default:".natural",description:"텍스트 정렬"}},usageExamples:{"기본 (UIKit)":`let label = TextComponent()
label.configure(
    style: .paragraphNormal16,
    text: "안녕하세요"
)`,제목:`let titleLabel = TextComponent()
titleLabel.configure(
    style: .headlineBold20,
    text: "제주도 3박 4일 패키지"
)`,"SwiftUI (UDTypography)":`Text("상품 제목")
    .font(UDTypography.headlineBold20)
    .foregroundColor(.udGray1000)`}}},y={importPath:"@myrealtrip/web-ui",description:"아이콘 컴포넌트. 247개 아이콘 지원. Ico 접두사 + PascalCase 네이밍.",props:{name:{type:"IconNames",required:!0,description:"아이콘 이름 (필수). Ico 접두사 + PascalCase. 예: IcoArrowLeft, IcoSearch"},size:{type:"number",description:"아이콘 크기(px). 기본값은 아이콘마다 다름."},color:{type:"string",description:"SVG fill 색상. 기본값 currentColor."}},usageExamples:{기본:`import { Icon } from '@myrealtrip/web-ui';

<Icon name="IcoSearch" size={24} />`,색상:'<Icon name="IcoHeart" size={20} color="#ec4937" />',버튼아이콘:`// Button의 leftIcon/rightIcon prop 사용 (권장)
<Button variant="tertiary" leftIcon="IcoArrowLeft">
  뒤로 가기
</Button>`},antiPatterns:["❌ <Icon name='arrow-left'> — kebab-case 사용 금지, IcoArrowLeft 사용","❌ <Icon name='ArrowLeft'> — Ico 접두사 필수"]},u={navigation:["IcoArrowLeft","IcoArrowRight","IcoArrowUp","IcoArrowDown","IcoArrowLeftAlt","IcoArrowRightAlt","IcoChevronLeft","IcoChevronRight","IcoChevronUp","IcoChevronDown","IcoChevronLeftSmall","IcoChevronRightSmall","IcoChevronDownSmall","IcoChevronUpSmall"],action:["IcoSearch","IcoAdd","IcoClose","IcoDelete","IcoEdit","IcoShare","IcoDownload","IcoUpload","IcoFilter","IcoSort","IcoRefresh","IcoReset"],content:["IcoHeart","IcoHeartLine","IcoBookmark","IcoBookmarkLine","IcoStar","IcoStarLine","IcoStarHalf","IcoCheck","IcoCheckAll","IcoCheckSmall"],communication:["IcoNotification","IcoNotificationActive","IcoMessage","IcoChatBubble","IcoForum","IcoSupportAgent"],travel:["IcoFlight","IcoHotel","IcoCalendar","IcoLocationOn","IcoMap","IcoLuggage","IcoTransport","IcoConfirmationNumber"],ui:["IcoMenu","IcoMore","IcoMoreAlt","IcoHome","IcoPerson","IcoSettings","IcoHelp","IcoInformation","IcoError","IcoWarning"]},g={importPath:"@myrealtrip/web-ui",description:"선택 상태를 나타내는 칩 컴포넌트. 필터, 태그, 카테고리 선택에 사용.",figmaUrl:"https://www.figma.com/design/TRtkkl5QJ0ly261AcqyUF9/Myrealtrip-Design-System?node-id=11651-107058",props:{label:{type:"string",required:!0,description:"칩에 표시할 텍스트"},selected:{type:"boolean",default:"false",description:"선택 상태"},disabled:{type:"boolean",default:"false",description:"비활성화 상태"},onClick:{type:"() => void",description:"클릭 이벤트 핸들러"}},usageExamples:{기본:`import { Chip } from '@myrealtrip/web-ui';

<Chip label="제주도" selected={false} onClick={() => setSelected(!selected)} />`,그룹:`import { ChipGroup } from '@myrealtrip/web-ui';

<ChipGroup>
  <Chip label="전체" selected={filter === 'all'} onClick={() => setFilter('all')} />
  <Chip label="항공" selected={filter === 'flight'} onClick={() => setFilter('flight')} />
  <Chip label="호텔" selected={filter === 'hotel'} onClick={() => setFilter('hotel')} />
</ChipGroup>`},antiPatterns:["❌ variant='filled' — variant prop 없음","❌ <button className='chip'> — 일반 태그 직접 사용 금지"],ios:{importPath:"import BaseComponent",modulePath:"BaseComponent/TagComponent",framework:"UIKit",props:{style:{type:"DynamicTagStyle",description:"태그 스타일 (선택/비선택 상태, 크기 등)"},title:{type:"String",required:!0,description:"태그에 표시할 텍스트"},isSelected:{type:"Bool",default:"false",description:"선택 상태"},isEnabled:{type:"Bool",default:"true",description:"활성화 상태"},action:{type:"(() -> Void)?",description:"탭 이벤트 핸들러"}},usageExamples:{기본:`let tag = TagComponent()
tag.configure(
    style: .default,
    title: "제주도"
)
tag.isSelected = false
tag.action = { [weak self] in
    self?.toggleFilter()
}`,그룹:`let tags = ["전체", "항공", "호텔"].map { title -> TagComponent in
    let tag = TagComponent()
    tag.configure(style: .default, title: title)
    return tag
}
// StackView에 추가
tags.forEach { stackView.addArrangedSubview($0) }`}}},f={importPath:"@myrealtrip/web-ui",description:"탭 네비게이션 컴포넌트. 숙소/항공/투어 등 카테고리 전환에 사용. Line/Pill 두 가지 형태 지원.",figmaUrl:"https://www.figma.com/design/TRtkkl5QJ0ly261AcqyUF9/Myrealtrip-Design-System?node-id=7509-27151&t=00gOe2mI1g4NKsgL-4",props:{tabs:{type:"TabItem[]",required:!0,description:"탭 목록. { key, label, badge?, disabled? }"},activeKey:{type:"string",required:!0,description:"현재 선택된 탭의 key"},onChange:{type:"(key: string) => void",required:!0,description:"탭 변경 콜백"},size:{type:"'medium' | 'small'",default:"'medium'",description:"탭 크기 (medium: 44px, small: 36px)"}},usageExamples:{기본:`import { TabBar } from '@myrealtrip/web-ui';

const tabs = [
  { key: 'all', label: '전체' },
  { key: 'flight', label: '항공' },
  { key: 'hotel', label: '숙소' },
];

<TabBar tabs={tabs} activeKey={active} onChange={setActive} />`,뱃지:`<TabBar
  tabs={[
    { key: 'all', label: '전체' },
    { key: 'new', label: '신규', badge: true },
    { key: 'promo', label: '프로모션' },
  ]}
  activeKey={active}
  onChange={setActive}
/>`},antiPatterns:["❌ <div onClick> 으로 탭 직접 구현 — TabBar 사용","❌ variant='pill' — 아직 Pill variant 미구현 (Figma에만 존재)"],ios:{importPath:"import TabContainerManager",modulePath:"TabContainerManager/CommonTabBarView + SwiftUITabBarView",framework:"Both",props:{tabs:{type:"[TabItem]",required:!0,description:"탭 목록. TabItem(key, title, badge?, isEnabled?)"},selectedIndex:{type:"Int",required:!0,description:"현재 선택된 탭 인덱스"},onTabSelected:{type:"((Int) -> Void)?",description:"탭 선택 콜백"}},usageExamples:{"기본 (UIKit)":`let tabBar = CommonTabBarView()
tabBar.configure(
    tabs: [
        TabItem(key: "all", title: "전체"),
        TabItem(key: "flight", title: "항공"),
        TabItem(key: "hotel", title: "숙소"),
    ]
)
tabBar.onTabSelected = { [weak self] index in
    self?.switchTab(to: index)
}`,SwiftUI:`SwiftUITabBarView(
    tabs: [
        TabItem(key: "all", title: "전체"),
        TabItem(key: "flight", title: "항공"),
        TabItem(key: "hotel", title: "숙소"),
    ],
    selectedIndex: $selectedTab
)`}}};export{c as A,d as B,p as C,u as I,s as P,m as T,y as a,g as b,f as c};

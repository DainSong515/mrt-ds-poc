// 컴포넌트 메타데이터 (MCP components.ts에서 추출)

export interface PropMeta {
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface ComponentMeta {
  name: string;
  importPath: string;
  description: string;
  props: Record<string, PropMeta>;
  usageExamples: Record<string, string>;
  antiPatterns?: string[];
}

export const BUTTON_META: ComponentMeta = {
  name: 'Button',
  importPath: '@myrealtrip/web-ui',
  description: '마이리얼트립 디자인 시스템의 기본 버튼 컴포넌트. variant로 시각적 스타일을 결정한다.',
  props: {
    variant: {
      type: "'primary' | 'primaryOpt' | 'secondary' | 'secondaryOpt' | 'tertiary' | 'tertiaryOpt' | 'text'",
      default: "'primary'",
      description: '버튼 스타일 변형',
    },
    size: {
      type: "'large' | 'medium' | 'small' | 'xSmall'",
      default: "'medium'",
      description: '버튼 크기 (large: 56px, medium: 48px, small: 40px, xSmall: 36px)',
    },
    shape: {
      type: "'pill' | 'rectangle'",
      default: "'pill'",
      description: '테두리 형태 (pill: 99px radius, rectangle: 4px radius)',
    },
    leftIcon: {
      type: 'IconNames',
      description: '버튼 왼쪽 아이콘 이름. 예: "IcoArrowLeft"',
    },
    rightIcon: {
      type: 'IconNames',
      description: '버튼 오른쪽 아이콘 이름.',
    },
    iconOnly: {
      type: 'boolean',
      default: 'false',
      description: '아이콘만 있는 정사각형 버튼.',
    },
    fullWidth: {
      type: 'boolean',
      default: 'false',
      description: '부모 너비를 꽉 채움 (width: 100%)',
    },
    loading: {
      type: 'boolean',
      default: 'false',
      description: '로딩 스피너 표시. 사용자 인터랙션 비활성화.',
    },
    disabled: {
      type: 'boolean',
      default: 'false',
      description: '비활성화 상태.',
    },
    isCompact: {
      type: 'boolean',
      default: 'false',
      description: "variant='text'일 때 높이를 줄임.",
    },
    onClick: {
      type: '(e: React.MouseEvent<HTMLButtonElement>) => void',
      description: '클릭 이벤트 핸들러',
    },
  },
  usageExamples: {
    기본: `import { Button } from '@myrealtrip/web-ui';

<Button variant="primary" onClick={() => router.push('/login')}>
  로그인
</Button>`,
    로딩: `const [isLoading, setIsLoading] = useState(false);

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
</Button>`,
    아이콘: `<Button variant="tertiary" leftIcon="IcoArrowLeft">
  뒤로 가기
</Button>`,
  },
  antiPatterns: [
    "❌ variant='solid' — 존재하지 않음. primary 사용",
    "❌ variant='outline' — 존재하지 않음. tertiary 사용",
    "❌ <button style={{ backgroundColor: '#141719' }}> — 일반 button 태그 사용 금지",
    "❌ size='sm' — 존재하지 않음. small 사용",
  ],
};

export const TEXT_META: ComponentMeta = {
  name: 'Text',
  importPath: '@myrealtrip/web-ui',
  description: '타이포그래피 컴포넌트. typography prop으로 미리 정의된 스타일을 적용한다.',
  props: {
    typography: {
      type: 'TypographyVariant',
      default: "'paragraphNormal16'",
      description: '타이포그래피 변형. {카테고리}{굵기}{크기} 패턴.',
    },
    as: {
      type: "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
      default: "'span'",
      description: '렌더링할 HTML 요소.',
    },
    lineClamp: {
      type: 'number',
      description: '텍스트 줄 제한. 넘치는 텍스트는 말줄임표 표시.',
    },
    align: {
      type: "CSSProperties['textAlign']",
      description: '텍스트 정렬 (left/center/right/justify)',
    },
    color: {
      type: 'string',
      description: 'CSS color 값. 기본값은 inherit.',
    },
  },
  usageExamples: {
    기본: `import { Text } from '@myrealtrip/web-ui';

<Text typography="paragraphNormal16">안녕하세요</Text>`,
    제목: `<Text as="h2" typography="headlineBold20">
  제주도 3박 4일 패키지
</Text>`,
    줄제한: `<Text typography="paragraphNormal14" lineClamp={2}>
  매우 긴 상품 설명 텍스트가 여기에 들어갑니다.
  두 줄을 넘어가면 말줄임표가 표시됩니다.
</Text>`,
  },
  antiPatterns: [
    "❌ typography='body1' — 존재하지 않음",
    "❌ typography='title' — 존재하지 않음",
    "❌ <p style={{ fontSize: '16px' }}> — 일반 태그 직접 스타일링 금지",
    "❌ <Text variant='bold'> — variant prop 없음, typography 사용",
  ],
};

export const ICON_META: ComponentMeta = {
  name: 'Icon',
  importPath: '@myrealtrip/web-ui',
  description: '아이콘 컴포넌트. 247개 아이콘 지원. Ico 접두사 + PascalCase 네이밍.',
  props: {
    name: {
      type: 'IconNames',
      required: true,
      description: '아이콘 이름 (필수). Ico 접두사 + PascalCase. 예: IcoArrowLeft, IcoSearch',
    },
    size: {
      type: 'number',
      description: '아이콘 크기(px). 기본값은 아이콘마다 다름.',
    },
    color: {
      type: 'string',
      description: 'SVG fill 색상. 기본값 currentColor.',
    },
  },
  usageExamples: {
    기본: `import { Icon } from '@myrealtrip/web-ui';

<Icon name="IcoSearch" size={24} />`,
    색상: `<Icon name="IcoHeart" size={20} color="#ec4937" />`,
    버튼아이콘: `// Button의 leftIcon/rightIcon prop 사용 (권장)
<Button variant="tertiary" leftIcon="IcoArrowLeft">
  뒤로 가기
</Button>`,
  },
  antiPatterns: [
    "❌ <Icon name='arrow-left'> — kebab-case 사용 금지, IcoArrowLeft 사용",
    "❌ <Icon name='ArrowLeft'> — Ico 접두사 필수",
  ],
};

// 아이콘 카테고리별 목록
export const ICON_CATEGORIES: Record<string, string[]> = {
  navigation: ['IcoArrowLeft', 'IcoArrowRight', 'IcoArrowUp', 'IcoArrowDown', 'IcoArrowLeftAlt', 'IcoArrowRightAlt', 'IcoChevronLeft', 'IcoChevronRight', 'IcoChevronUp', 'IcoChevronDown', 'IcoChevronLeftSmall', 'IcoChevronRightSmall', 'IcoChevronDownSmall', 'IcoChevronUpSmall'],
  action: ['IcoSearch', 'IcoAdd', 'IcoClose', 'IcoDelete', 'IcoEdit', 'IcoShare', 'IcoDownload', 'IcoUpload', 'IcoFilter', 'IcoSort', 'IcoRefresh', 'IcoReset'],
  content: ['IcoHeart', 'IcoHeartLine', 'IcoBookmark', 'IcoBookmarkLine', 'IcoStar', 'IcoStarLine', 'IcoStarHalf', 'IcoCheck', 'IcoCheckAll', 'IcoCheckSmall'],
  communication: ['IcoNotification', 'IcoNotificationActive', 'IcoMessage', 'IcoChatBubble', 'IcoForum', 'IcoSupportAgent'],
  travel: ['IcoFlight', 'IcoHotel', 'IcoCalendar', 'IcoLocationOn', 'IcoMap', 'IcoLuggage', 'IcoTransport', 'IcoConfirmationNumber'],
  ui: ['IcoMenu', 'IcoMore', 'IcoMoreAlt', 'IcoHome', 'IcoPerson', 'IcoSettings', 'IcoHelp', 'IcoInformation', 'IcoError', 'IcoWarning'],
};

export const CHIP_META: ComponentMeta = {
  name: 'Chip',
  importPath: '@myrealtrip/web-ui',
  description: '선택 상태를 나타내는 칩 컴포넌트. 필터, 태그, 카테고리 선택에 사용.',
  props: {
    label: {
      type: 'string',
      required: true,
      description: '칩에 표시할 텍스트',
    },
    selected: {
      type: 'boolean',
      default: 'false',
      description: '선택 상태',
    },
    disabled: {
      type: 'boolean',
      default: 'false',
      description: '비활성화 상태',
    },
    onClick: {
      type: '() => void',
      description: '클릭 이벤트 핸들러',
    },
  },
  usageExamples: {
    기본: `import { Chip } from '@myrealtrip/web-ui';

<Chip label="제주도" selected={false} onClick={() => setSelected(!selected)} />`,
    그룹: `import { ChipGroup } from '@myrealtrip/web-ui';

<ChipGroup>
  <Chip label="전체" selected={filter === 'all'} onClick={() => setFilter('all')} />
  <Chip label="항공" selected={filter === 'flight'} onClick={() => setFilter('flight')} />
  <Chip label="호텔" selected={filter === 'hotel'} onClick={() => setFilter('hotel')} />
</ChipGroup>`,
  },
  antiPatterns: [
    "❌ variant='filled' — variant prop 없음",
    "❌ <button className='chip'> — 일반 태그 직접 사용 금지",
  ],
};

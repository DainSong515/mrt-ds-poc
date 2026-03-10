"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButtonUsage = getButtonUsage;
exports.getTextUsage = getTextUsage;
exports.getIconUsage = getIconUsage;
// frontend-dubai 컴포넌트 정적 메타데이터
// 소스: /Users/ran-sunwoo/IdeaProjects/frontend-dubai/packages/components/src/
// ai-index dist 파일 우선 로드, 없으면 하드코딩 폴백
const index_loader_js_1 = require("../search/index-loader.js");
const BUTTON_METADATA = {
    name: 'Button',
    importPath: '@myrealtrip/web-ui',
    description: '마이리얼트립 디자인 시스템의 기본 버튼 컴포넌트. variant로 시각적 스타일을 결정한다.',
    props: {
        variant: {
            type: "'primary' | 'primaryOpt' | 'secondary' | 'secondaryOpt' | 'tertiary' | 'tertiaryOpt' | 'text'",
            default: "'primary'",
            description: '버튼 스타일 변형',
            options: {
                primary: '검정 배경 흰 글씨. 메인 CTA 버튼에 사용. (배경: gray.1000 / #141719)',
                primaryOpt: '파란 배경 흰 글씨. 강조 CTA. (배경: blue.500 / #2b96ed)',
                secondary: '밝은 회색 배경 검정 글씨. 보조 액션. (배경: gray.80 / #f1f3f5)',
                secondaryOpt: '흰 배경 검정 글씨. 흰 배경 위 보조 액션.',
                tertiary: '흰 배경 회색 글씨 테두리. 덜 강조된 액션. (border: gray.100)',
                tertiaryOpt: '테두리 없는 흰 배경. 최소한의 강조.',
                text: '텍스트 언더라인. 인라인 링크형 버튼.',
            },
        },
        size: {
            type: "'large' | 'medium' | 'small' | 'xSmall'",
            default: "'medium'",
            description: '버튼 크기',
            options: {
                large: '높이 56px, 패딩 20px',
                medium: '높이 48px, 패딩 16px',
                small: '높이 40px, 패딩 12px',
                xSmall: '높이 36px, 패딩 10px',
            },
        },
        shape: {
            type: "'pill' | 'rectangle'",
            default: "'pill'",
            description: '버튼 테두리 형태 (pill: border-radius 99px, rectangle: border-radius 4px)',
        },
        leftIcon: {
            type: 'IconNames',
            description: '버튼 왼쪽에 표시할 아이콘 이름. 예: "IcoArrowLeft", "IcoSearch", "IcoHeart"',
        },
        rightIcon: {
            type: 'IconNames',
            description: '버튼 오른쪽에 표시할 아이콘 이름.',
        },
        iconOnly: {
            type: 'boolean',
            default: 'false',
            description: '아이콘만 있는 정사각형 버튼. children에 Icon 컴포넌트 직접 전달.',
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
        basic: `import { Button } from '@myrealtrip/web-ui';

// 기본 CTA 버튼 (검정)
<Button variant="primary" onClick={() => router.push('/login')}>
  로그인
</Button>`,
        withLoading: `// 로딩 상태 버튼
const [isLoading, setIsLoading] = useState(false);

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
        withIcon: `// 왼쪽 아이콘 버튼 (뒤로 가기)
<Button variant="tertiary" leftIcon="IcoArrowLeft" size="medium">
  뒤로 가기
</Button>

// 오른쪽 화살표 버튼
<Button variant="primary" rightIcon="IcoArrowRight">
  다음 단계
</Button>`,
        fullWidth: `// 하단 고정 전체 너비 CTA
<Button variant="primary" fullWidth size="large">
  결제하기
</Button>`,
        iconOnly: `// 아이콘 전용 버튼
<Button variant="secondary" iconOnly>
  <Icon name="IcoSearch" size={20} />
</Button>`,
        textButton: `// 텍스트(링크) 버튼
<Button variant="text" size="medium">
  자세히 보기
</Button>`,
    },
    antiPatterns: [
        "❌ variant='solid' — 존재하지 않음",
        "❌ <button style={{ backgroundColor: '#141719' }}> — 일반 button 태그 사용 금지",
        "❌ <Button color='primary'> — color prop 없음, variant 사용",
        "❌ <Button type='primary'> — type은 HTML button type 속성 (submit/button/reset), variant 사용",
    ],
};
const TEXT_METADATA = {
    name: 'Text',
    importPath: '@myrealtrip/web-ui',
    description: '타이포그래피 컴포넌트. typography prop으로 미리 정의된 스타일 적용.',
    props: {
        typography: {
            type: 'TypographyVariant',
            default: "'paragraphNormal16'",
            description: '타이포그래피 변형. Display > Headline > Paragraph > Caption 계층 구조.',
            categories: {
                display: ['displayBold40', 'displayBold36', 'displayBold32', 'displayNormal40', 'displayNormal36', 'displayNormal32'],
                headline: [
                    'headlineBold28', 'headlineBold26', 'headlineBold24', 'headlineBold22', 'headlineBold21',
                    'headlineBold20', 'headlineBold18', 'headlineBold17', 'headlineBold16', 'headlineBold15', 'headlineBold14',
                    'headlineNormal28', 'headlineNormal26', 'headlineNormal24', 'headlineNormal22', 'headlineNormal21',
                    'headlineNormal20', 'headlineNormal18', 'headlineNormal17', 'headlineNormal16', 'headlineNormal15', 'headlineNormal14',
                ],
                paragraph: [
                    'paragraphBold26', 'paragraphBold24', 'paragraphBold22', 'paragraphBold21', 'paragraphBold20',
                    'paragraphBold18', 'paragraphBold16', 'paragraphBold15', 'paragraphBold14', 'paragraphBold13',
                    'paragraphNormal26', 'paragraphNormal24', 'paragraphNormal22', 'paragraphNormal21', 'paragraphNormal20',
                    'paragraphNormal18', 'paragraphNormal16', 'paragraphNormal15', 'paragraphNormal14', 'paragraphNormal13',
                ],
                caption: [
                    'captionBold15', 'captionBold14', 'captionBold13', 'captionBold12', 'captionBold11', 'captionBold10', 'captionBold9',
                    'captionNormal15', 'captionNormal14', 'captionNormal13', 'captionNormal12', 'captionNormal11', 'captionNormal10', 'captionNormal9',
                ],
            },
        },
        as: {
            type: "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
            default: "'span'",
            description: '렌더링할 HTML 요소. 기본값 span.',
        },
        lineClamp: {
            type: 'number',
            description: '텍스트 줄 제한. 넘치는 텍스트는 말줄임표로 표시. CSS -webkit-line-clamp 사용.',
        },
        align: {
            type: "CSSProperties['textAlign']",
            description: '텍스트 정렬. left/center/right/justify.',
        },
        color: {
            type: 'string',
            description: 'CSS color 값. 기본값은 inherit.',
        },
    },
    usageExamples: {
        basic: `import { Text } from '@myrealtrip/web-ui';

// 기본 텍스트
<Text typography="paragraphNormal16">안녕하세요</Text>`,
        heading: `// 상품 카드 제목 (20px bold)
<Text as="h2" typography="headlineBold20">
  제주도 3박 4일 패키지
</Text>`,
        lineClamp: `// 2줄 제한 설명 텍스트
<Text typography="paragraphNormal14" lineClamp={2}>
  매우 긴 상품 설명 텍스트가 여기에 들어갑니다.
  두 줄을 넘어가면 말줄임표가 표시됩니다.
</Text>`,
        withColor: `// 강조 색상 텍스트
<Text typography="captionBold12" color="#2b96ed">
  NEW
</Text>`,
        caption: `// 날짜/부가 정보
<Text typography="captionNormal12" color="#848c94">
  2024년 3월 15일 출발
</Text>`,
    },
    namingConvention: `typography 네이밍 규칙:
  - {카테고리}{굵기}{크기}
  - 카테고리: display / headline / paragraph / caption
  - 굵기: Bold (700) / Normal (headline: 600, paragraph: 500)
  - 크기: 픽셀 숫자 (9~40)

  예: headlineBold20 → headline 카테고리, bold(700), 20px`,
    antiPatterns: [
        "❌ typography='body1' — 존재하지 않음",
        "❌ typography='title' — 존재하지 않음",
        "❌ <p style={{ fontSize: '16px' }}> — 일반 태그 직접 스타일링 금지",
        "❌ <Text variant='bold'> — variant prop 없음, typography 사용",
    ],
};
const ICON_METADATA = {
    name: 'Icon',
    importPath: '@myrealtrip/web-ui',
    description: '아이콘 컴포넌트. 247개 아이콘 지원. ⚠️ deprecated: @myrealtrip/web-icons 사용 권장.',
    props: {
        name: {
            type: 'IconNames',
            description: '아이콘 이름 (필수). Ico 접두사 + PascalCase. 예: IcoArrowLeft, IcoSearch',
        },
        size: {
            type: 'number',
            description: '아이콘 크기(px). 기본값은 아이콘마다 다름.',
        },
        color: {
            type: 'string',
            description: 'SVG fill 색상. 기본값 currentColor (부모 color 상속).',
        },
    },
    iconList: {
        navigation: ['IcoArrowLeft', 'IcoArrowRight', 'IcoArrowUp', 'IcoArrowDown', 'IcoArrowLeftAlt', 'IcoArrowRightAlt', 'IcoChevronLeft', 'IcoChevronRight', 'IcoChevronUp', 'IcoChevronDown', 'IcoChevronLeftSmall', 'IcoChevronRightSmall', 'IcoChevronDownSmall', 'IcoChevronUpSmall'],
        action: ['IcoSearch', 'IcoAdd', 'IcoClose', 'IcoDelete', 'IcoEdit', 'IcoShare', 'IcoDownload', 'IcoUpload', 'IcoFilter', 'IcoSort', 'IcoRefresh', 'IcoReset'],
        content: ['IcoHeart', 'IcoHeartLine', 'IcoBookmark', 'IcoBookmarkLine', 'IcoStar', 'IcoStarLine', 'IcoStarHalf', 'IcoCheck', 'IcoCheckAll', 'IcoCheckSmall'],
        communication: ['IcoNotification', 'IcoNotificationActive', 'IcoMessage', 'IcoChatBubble', 'IcoForum', 'IcoSupportAgent'],
        travel: ['IcoFlight', 'IcoHotel', 'IcoCalendar', 'IcoLocationOn', 'IcoMap', 'IcoLuggage', 'IcoTransport', 'IcoConfirmationNumber'],
        ui: ['IcoMenu', 'IcoMore', 'IcoMoreAlt', 'IcoHome', 'IcoPerson', 'IcoSettings', 'IcoHelp', 'IcoInformation', 'IcoError', 'IcoWarning'],
    },
    usageExamples: {
        basic: `import { Icon } from '@myrealtrip/web-ui';

// 기본 아이콘
<Icon name="IcoSearch" size={24} />`,
        withColor: `// 색상 지정
<Icon name="IcoHeart" size={20} color="#ec4937" />`,
        inButton: `// Button의 leftIcon/rightIcon prop 사용 (권장)
<Button variant="tertiary" leftIcon="IcoArrowLeft">
  뒤로 가기
</Button>

// 직접 Icon 컴포넌트 사용 (텍스트 없이)
<Button variant="secondary" iconOnly>
  <Icon name="IcoSearch" size={20} />
</Button>`,
    },
    searchHints: {
        '뒤로': ['IcoArrowLeft', 'IcoChevronLeft'],
        '앞으로': ['IcoArrowRight', 'IcoChevronRight'],
        '검색': ['IcoSearch', 'IcoMaintabSearch'],
        '하트': ['IcoHeart', 'IcoHeartLine'],
        '즐겨찾기': ['IcoBookmark', 'IcoBookmarkLine'],
        '별': ['IcoStar', 'IcoStarLine', 'IcoStarHalf'],
        '알림': ['IcoNotification', 'IcoNotificationActive', 'IcoNotificationDisabled'],
        '닫기': ['IcoClose', 'IcoClear'],
        '삭제': ['IcoDelete', 'IcoDeleteLine', 'IcoDeleteForever'],
        '추가': ['IcoAdd', 'IcoPlus'],
        '달력': ['IcoCalendar', 'IcoCalendarMonth'],
        '위치': ['IcoLocationOn', 'IcoLocationSearching', 'IcoMap'],
        '공유': ['IcoShare'],
        '설정': ['IcoSettings', 'IcoPersonSetting'],
        '필터': ['IcoFilter', 'IcoFilterAlt'],
        '홈': ['IcoHome', 'IcoHomeAlt'],
        '사람': ['IcoPerson', 'IcoPersonSearch', 'IcoGroups'],
        '항공': ['IcoFlight', 'IcoFlightAlt', 'IcoConnectingAirports'],
        '호텔': ['IcoHotel'],
        '여행': ['IcoFlight', 'IcoHotel', 'IcoLuggage', 'IcoMap'],
    },
    antiPatterns: [
        "❌ <Icon name='search' /> — PascalCase + Ico 접두사 필수 (IcoSearch)",
        "❌ <Icon name='arrow-left' /> — kebab-case 사용 금지 (IcoArrowLeft)",
    ],
};
function getButtonUsage(variant, useCase) {
    // ai-index dist 파일 우선 로드
    const dynamicDoc = (0, index_loader_js_1.loadComponentDoc)('button');
    if (dynamicDoc && !variant && !useCase) {
        return dynamicDoc;
    }
    let result = `# Button 컴포넌트\n\n`;
    result += `**import**: \`import { Button } from '${BUTTON_METADATA.importPath}';\`\n\n`;
    result += `${BUTTON_METADATA.description}\n\n`;
    if (variant && variant in BUTTON_METADATA.props.variant.options) {
        const key = variant;
        result += `## variant="${variant}"\n${BUTTON_METADATA.props.variant.options[key]}\n\n`;
    }
    else {
        result += `## variant 옵션\n`;
        for (const [key, desc] of Object.entries(BUTTON_METADATA.props.variant.options)) {
            result += `- **${key}**: ${desc}\n`;
        }
        result += '\n';
    }
    result += `## size 옵션\n`;
    for (const [key, desc] of Object.entries(BUTTON_METADATA.props.size.options)) {
        result += `- **${key}**: ${desc}\n`;
    }
    result += `\n## 주요 Props\n`;
    result += `- **shape**: 'pill'(기본, 둥근) | 'rectangle'(각진)\n`;
    result += `- **leftIcon/rightIcon**: IconNames — 아이콘 이름 (예: "IcoArrowLeft")\n`;
    result += `- **loading**: boolean — 로딩 스피너\n`;
    result += `- **fullWidth**: boolean — 100% 너비\n`;
    result += `- **iconOnly**: boolean — 아이콘만 있는 정사각형 버튼\n`;
    result += `\n## 사용 예시\n`;
    if (useCase === 'loading') {
        result += `\`\`\`tsx\n${BUTTON_METADATA.usageExamples.withLoading}\n\`\`\`\n`;
    }
    else if (useCase === 'icon') {
        result += `\`\`\`tsx\n${BUTTON_METADATA.usageExamples.withIcon}\n\`\`\`\n`;
    }
    else {
        result += `\`\`\`tsx\n${BUTTON_METADATA.usageExamples.basic}\n\`\`\`\n\n`;
        result += `\`\`\`tsx\n${BUTTON_METADATA.usageExamples.withIcon}\n\`\`\`\n\n`;
        result += `\`\`\`tsx\n${BUTTON_METADATA.usageExamples.fullWidth}\n\`\`\`\n`;
    }
    result += `\n## ⚠️ 주의사항 (잘못된 사용)\n`;
    BUTTON_METADATA.antiPatterns.forEach((p) => { result += `${p}\n`; });
    return result;
}
function getTextUsage(useCase) {
    // ai-index dist 파일 우선 로드
    const dynamicDoc = (0, index_loader_js_1.loadComponentDoc)('text');
    if (dynamicDoc && !useCase) {
        return dynamicDoc;
    }
    let result = `# Text 컴포넌트\n\n`;
    result += `**import**: \`import { Text } from '${TEXT_METADATA.importPath}';\`\n\n`;
    result += `${TEXT_METADATA.description}\n\n`;
    result += `## typography 네이밍 규칙\n${TEXT_METADATA.namingConvention}\n\n`;
    result += `## typography 목록\n`;
    for (const [cat, variants] of Object.entries(TEXT_METADATA.props.typography.categories)) {
        result += `\n### ${cat}\n`;
        result += variants.join(', ') + '\n';
    }
    result += `\n## 주요 Props\n`;
    result += `- **as**: HTML 태그 ('span'(기본) | 'p' | 'h1'~'h6')\n`;
    result += `- **lineClamp**: number — 줄 제한 (말줄임표)\n`;
    result += `- **align**: 텍스트 정렬\n`;
    result += `- **color**: CSS color 값\n`;
    result += `\n## 사용 예시\n`;
    if (useCase === 'lineClamp') {
        result += `\`\`\`tsx\n${TEXT_METADATA.usageExamples.lineClamp}\n\`\`\`\n`;
    }
    else {
        result += `\`\`\`tsx\n${TEXT_METADATA.usageExamples.basic}\n\`\`\`\n\n`;
        result += `\`\`\`tsx\n${TEXT_METADATA.usageExamples.heading}\n\`\`\`\n\n`;
        result += `\`\`\`tsx\n${TEXT_METADATA.usageExamples.lineClamp}\n\`\`\`\n`;
    }
    result += `\n## ⚠️ 주의사항\n`;
    TEXT_METADATA.antiPatterns.forEach((p) => { result += `${p}\n`; });
    return result;
}
function getIconUsage(keyword) {
    // ai-index dist 파일 우선 로드 (키워드 검색이 없을 때)
    const dynamicDoc = (0, index_loader_js_1.loadComponentDoc)('icon');
    if (dynamicDoc && !keyword) {
        return dynamicDoc;
    }
    let result = `# Icon 컴포넌트\n\n`;
    result += `**import**: \`import { Icon } from '${ICON_METADATA.importPath}';\`\n\n`;
    result += `${ICON_METADATA.description}\n\n`;
    if (keyword) {
        const lower = keyword.toLowerCase();
        // 검색 힌트 매칭
        const hintMatches = Object.entries(ICON_METADATA.searchHints).filter(([key]) => key.includes(lower) || lower.includes(key));
        // 영문 이름 직접 매칭
        const allIcons = Object.values(ICON_METADATA.iconList).flat();
        const directMatches = allIcons.filter((icon) => icon.toLowerCase().includes(lower));
        const suggestions = new Set([
            ...hintMatches.flatMap(([, icons]) => icons),
            ...directMatches,
        ]);
        if (suggestions.size > 0) {
            result += `## "${keyword}" 관련 아이콘\n`;
            result += Array.from(suggestions).map((icon) => `- \`${icon}\``).join('\n');
            result += '\n\n';
        }
        else {
            result += `"${keyword}"에 해당하는 아이콘을 찾지 못했습니다.\n\n`;
        }
    }
    result += `## 카테고리별 아이콘\n`;
    for (const [cat, icons] of Object.entries(ICON_METADATA.iconList)) {
        result += `\n### ${cat}\n`;
        result += icons.map((i) => `\`${i}\``).join(', ') + '\n';
    }
    result += `\n총 247개 아이콘 지원. 전체 목록: /Users/ran-sunwoo/IdeaProjects/frontend-dubai/packages/components/src/icon/IcoComponents/\n`;
    result += `\n## Props\n`;
    result += `- **name**: IconNames (필수) — Ico + PascalCase\n`;
    result += `- **size**: number — 픽셀 크기\n`;
    result += `- **color**: string — CSS color (기본값: currentColor)\n`;
    result += `\n## 사용 예시\n`;
    result += `\`\`\`tsx\n${ICON_METADATA.usageExamples.basic}\n\`\`\`\n\n`;
    result += `\`\`\`tsx\n${ICON_METADATA.usageExamples.inButton}\n\`\`\`\n`;
    result += `\n## ⚠️ 주의사항\n`;
    ICON_METADATA.antiPatterns.forEach((p) => { result += `${p}\n`; });
    return result;
}

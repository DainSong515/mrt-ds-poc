"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateButtonDoc = generateButtonDoc;
exports.generateChipDoc = generateChipDoc;
exports.generateTextDoc = generateTextDoc;
exports.generateIconDoc = generateIconDoc;
function generateButtonDoc() {
    const config = {
        name: 'Button',
        importPath: '@myrealtrip/web-ui',
        description: '마이리얼트립 디자인 시스템의 기본 버튼 컴포넌트. variant로 시각적 스타일을 결정한다.',
        variants: ['primary', 'primaryOpt', 'secondary', 'secondaryOpt', 'tertiary', 'tertiaryOpt', 'text'],
        sizes: ['large', 'medium', 'small', 'xSmall'],
        variantDescriptions: {
            primary: { background: 'color.gray.1000 (#141719)', content: 'color.white (#FFFFFF)', description: '메인 CTA. 검정 배경 흰 글씨.' },
            primaryOpt: { background: 'color.blue.500 (#2b96ed)', content: 'color.white (#FFFFFF)', description: '강조 CTA. 파란 배경 흰 글씨.' },
            secondary: { background: 'color.gray.80 (#f1f3f5)', content: 'color.gray.1000 (#141719)', description: '보조 액션. 밝은 회색 배경 검정 글씨.' },
            secondaryOpt: { background: 'color.white (#FFFFFF)', content: 'color.gray.1000 (#141719)', description: '흰 배경 위 보조 액션.' },
            tertiary: { background: 'color.white (#FFFFFF)', content: 'color.gray.700 (#495056)', description: '테두리 있는 버튼 (border: color.gray.100).' },
            tertiaryOpt: { background: 'color.white (#FFFFFF)', content: 'color.gray.700 (#495056)', description: '테두리 없는 최소 강조 버튼.' },
            text: { background: 'transparent', content: 'color.gray.1000 (#141719)', description: '텍스트 언더라인 인라인 링크형 버튼.' },
        },
        sizeSpecs: {
            large: { height: '56px', paddingX: '20px', typography: 'headlineNormal18' },
            medium: { height: '48px', paddingX: '16px', typography: 'headlineNormal16' },
            small: { height: '40px', paddingX: '12px', typography: 'headlineNormal14' },
            xSmall: { height: '36px', paddingX: '10px', typography: 'headlineNormal14' },
        },
        props: [
            { name: 'variant', type: "'primary' | 'primaryOpt' | 'secondary' | 'secondaryOpt' | 'tertiary' | 'tertiaryOpt' | 'text'", default: "'primary'", description: '버튼 시각적 스타일' },
            { name: 'size', type: "'large' | 'medium' | 'small' | 'xSmall'", default: "'medium'", description: '버튼 크기' },
            { name: 'shape', type: "'pill' | 'rectangle'", default: "'pill'", description: '버튼 테두리 형태' },
            { name: 'leftIcon', type: 'IconNames', description: '버튼 왼쪽 아이콘. 예: "IcoArrowLeft"' },
            { name: 'rightIcon', type: 'IconNames', description: '버튼 오른쪽 아이콘' },
            { name: 'iconOnly', type: 'boolean', default: 'false', description: '아이콘 전용 정사각형 버튼' },
            { name: 'fullWidth', type: 'boolean', default: 'false', description: '부모 너비를 꽉 채움' },
            { name: 'loading', type: 'boolean', default: 'false', description: '로딩 스피너 표시. 클릭 비활성화' },
            { name: 'disabled', type: 'boolean', default: 'false', description: '비활성화 상태' },
            { name: 'isCompact', type: 'boolean', default: 'false', description: "variant='text'일 때 높이 감소" },
            { name: 'onClick', type: '(e: React.MouseEvent<HTMLButtonElement>) => void', description: '클릭 이벤트 핸들러' },
            { name: 'children', type: 'React.ReactNode', required: true, description: '버튼 내용' },
        ],
        usageExamples: [
            `// 메인 CTA (검정 버튼)
import { Button } from '@myrealtrip/web-ui';

<Button variant="primary" size="large" fullWidth onClick={() => router.push('/checkout')}>
  결제하기
</Button>`,
            `// 강조 CTA (파란 버튼)
<Button variant="primaryOpt" size="large" fullWidth>
  예약하기
</Button>`,
            `// 로딩 상태
<Button variant="primary" loading={isLoading}>
  처리 중...
</Button>`,
            `// 아이콘 + 텍스트
<Button variant="tertiary" leftIcon="IcoArrowLeft">
  뒤로 가기
</Button>`,
            `// 아이콘 전용
<Button variant="secondary" iconOnly>
  <Icon name="IcoSearch" size={20} />
</Button>`,
            `// 전체 너비 보조 버튼
<Button variant="secondary" size="medium" fullWidth>
  장바구니 담기
</Button>`,
        ],
        keywords: ['버튼', 'CTA', '클릭', 'variant', 'primary', 'secondary', 'tertiary', 'loading', 'disabled', '로딩', '비활성', '아이콘', 'icon', '결제', '예약'],
    };
    return generateComponentMarkdown(config);
}
function generateChipDoc() {
    return `# Chip

필터/카테고리 선택용 칩 컴포넌트. 기획전 필터바처럼 가로 스크롤 단일 선택 UI에 사용.

## Import

\`\`\`tsx
import { Chip, ChipGroup } from '@myrealtrip/ds-ui';
\`\`\`

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
| \`medium\` | 36px | 12px | headlineNormal14 |
| \`small\` | 28px | 10px | captionNormal12 |

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| \`selected\` | boolean | false | 선택 상태 |
| \`variant\` | 'filled' \\| 'outlined' | 'filled' | 스타일 변형 |
| \`size\` | 'medium' \\| 'small' | 'medium' | 크기 |
| \`disabled\` | boolean | false | 비활성화 |
| \`onClick\` | () => void | - | 클릭 핸들러 |
| \`children\` | ReactNode | **(필수)** | 칩 텍스트 |

## 사용 예시

\`\`\`tsx
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
\`\`\`

## 키워드

칩, chip, 필터, filter, 카테고리, category, 태그, tag, 선택, selected, 필터바, filterbar, 가로스크롤
`;
}
function generateTextDoc() {
    return `# Text

마이리얼트립 디자인 시스템의 텍스트 컴포넌트. 타이포그래피 시스템을 통해 일관된 텍스트 스타일을 제공한다.

## Import

\`\`\`tsx
import { Text } from '@myrealtrip/web-ui';
\`\`\`

## typography 네이밍 규칙

\`{카테고리}{굵기}{크기}\`

- **카테고리**: \`display\` / \`headline\` / \`paragraph\` / \`caption\`
- **굵기**: \`Bold\` / \`Normal\`
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
| as | 'p' \\| 'span' \\| 'h1'~'h6' \\| 'div' \\| 'label' | 'span' | HTML 태그 |
| color | string | - | 텍스트 색상 |
| lineClamp | number | - | N줄 말줄임표 |

## 사용 예시

\`\`\`tsx
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
\`\`\`

## 주의사항

- \`typography="body1"\` 같은 Material UI 스타일 variant 사용 금지
- 일반 \`<p>\` 태그에 직접 스타일링 금지
- 색상은 토큰 값 참조 권장 (예: \`color.gray.500\` = \`#848c94\`)

## 키워드

텍스트, 타이포그래피, typography, headline, paragraph, caption, display, 제목, 본문, 설명, 캡션
`;
}
function generateIconDoc() {
    return `# Icon

마이리얼트립 디자인 시스템의 아이콘 컴포넌트. 247개 아이콘을 제공한다.

## Import

\`\`\`tsx
import { Icon } from '@myrealtrip/web-ui';
\`\`\`

## 아이콘 이름 규칙

반드시 **\`Ico\` + PascalCase** 형식을 사용한다.

✅ \`IcoArrowLeft\`, \`IcoSearch\`, \`IcoHeart\`
❌ \`arrow-left\`, \`search\`, \`arrowLeft\`

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

\`\`\`tsx
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
\`\`\`

## 키워드

아이콘, icon, Ico, 화살표, 검색, 하트, 별, 즐겨찾기, 방향, 액션, 여행, navigation
`;
}
function generateComponentMarkdown(config) {
    const lines = [
        `# ${config.name}`,
        '',
        config.description,
        '',
        '## Import',
        '',
        '```tsx',
        `import { ${config.name} } from '${config.importPath}';`,
        '```',
        '',
    ];
    if (config.variants && config.variantDescriptions) {
        lines.push('## variant');
        lines.push('');
        lines.push('| variant | 배경 | 텍스트 | 설명 |');
        lines.push('|---------|------|--------|------|');
        for (const v of config.variants) {
            const d = config.variantDescriptions[v];
            if (d) {
                lines.push(`| \`${v}\` | ${d.background} | ${d.content} | ${d.description} |`);
            }
        }
        lines.push('');
    }
    if (config.sizes && config.sizeSpecs) {
        lines.push('## size');
        lines.push('');
        lines.push('| size | 높이 | 패딩 | 타이포그래피 |');
        lines.push('|------|------|------|-------------|');
        for (const s of config.sizes) {
            const spec = config.sizeSpecs[s];
            if (spec) {
                lines.push(`| \`${s}\` | ${spec.height} | ${spec.paddingX} | ${spec.typography} |`);
            }
        }
        lines.push('');
    }
    lines.push('## Props');
    lines.push('');
    lines.push('| Prop | Type | Default | 설명 |');
    lines.push('|------|------|---------|------|');
    for (const prop of config.props) {
        const required = prop.required ? '**(필수)**' : '';
        const def = prop.default ?? '-';
        lines.push(`| \`${prop.name}\` | \`${prop.type}\` | ${def} | ${prop.description} ${required} |`);
    }
    lines.push('');
    if (config.usageExamples.length > 0) {
        lines.push('## 사용 예시');
        lines.push('');
        for (const example of config.usageExamples) {
            lines.push('```tsx');
            lines.push(example);
            lines.push('```');
            lines.push('');
        }
    }
    lines.push('## 주의사항');
    lines.push('');
    lines.push('```tsx');
    lines.push('// ❌ 일반 button 태그 직접 스타일링');
    lines.push('<button style={{ backgroundColor: \'#141719\' }}>버튼</button>');
    lines.push('');
    lines.push('// ❌ 존재하지 않는 variant');
    lines.push('<Button variant="solid">버튼</Button>');
    lines.push('<Button variant="outlined">버튼</Button>');
    lines.push('<Button color="primary">버튼</Button>');
    lines.push('```');
    lines.push('');
    lines.push('## 키워드');
    lines.push('');
    lines.push(config.keywords.join(', '));
    lines.push('');
    return lines.join('\n');
}
//# sourceMappingURL=component-doc.generator.js.map
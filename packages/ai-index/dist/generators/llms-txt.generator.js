"use strict";
/**
 * llms-txt.generator.ts
 * llms.txt 및 llms-full.txt 생성
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLlmsTxt = generateLlmsTxt;
exports.generateLlmsFullTxt = generateLlmsFullTxt;
function generateLlmsTxt() {
    return `# MyRealTrip Design System

> 컴포넌트 구현 전 반드시 참조. 직접 hex 색상, 하드코딩 spacing 사용 금지.

## 핵심 원칙

- **variant는 정의된 값만 사용**: primary | primaryOpt | secondary | secondaryOpt | tertiary | tertiaryOpt | text
- **색상은 반드시 토큰 참조**: 직접 hex (#141719) 하드코딩 금지, 토큰(\`color.gray.1000\`) 사용
- **아이콘 이름은 Ico + PascalCase**: IcoArrowLeft, IcoSearch, IcoHeart
- **typography는 {카테고리}{굵기}{크기} 형식**: headlineBold20, paragraphNormal14
- **Button은 일반 \`<button>\` 태그 금지**: 반드시 \`<Button>\` 컴포넌트 사용

## Import

\`\`\`tsx
import { Button, Text, Icon } from '@myrealtrip/web-ui';
\`\`\`

## 문서

- [Button](./docs/button.md) — CTA 버튼, 7가지 variant, 4가지 size
- [Text](./docs/text.md) — 타이포그래피, display/headline/paragraph/caption
- [Icon](./docs/icon.md) — 247개 아이콘, Ico + PascalCase
- [Design Tokens](./docs/tokens.md) — 색상, 그림자, 타이포그래피 토큰

## 금지 패턴 (빠른 참조)

\`\`\`tsx
// ❌ 일반 button 태그
<button style={{ backgroundColor: '#141719' }}>버튼</button>

// ❌ 존재하지 않는 variant
<Button variant="solid">버튼</Button>
<Button variant="outlined">버튼</Button>

// ❌ 존재하지 않는 typography
<Text typography="body1">텍스트</Text>
<Text typography="title">텍스트</Text>

// ❌ 아이콘 이름 잘못된 형식
<Icon name="arrow-left" />
<Icon name="search" />
\`\`\`

## 올바른 패턴 (빠른 참조)

\`\`\`tsx
// ✅ 메인 CTA
<Button variant="primary" size="large" fullWidth onClick={handleClick}>
  결제하기
</Button>

// ✅ 로딩 상태
<Button variant="primaryOpt" loading={isLoading}>예약하기</Button>

// ✅ 아이콘 버튼
<Button variant="tertiary" leftIcon="IcoArrowLeft">뒤로 가기</Button>

// ✅ 텍스트
<Text as="h2" typography="headlineBold20">상품 제목</Text>
<Text typography="paragraphNormal14" lineClamp={2}>설명...</Text>

// ✅ 아이콘
<Icon name="IcoSearch" size={24} />
\`\`\`
`;
}
function generateLlmsFullTxt(docs) {
    const header = generateLlmsTxt();
    const sections = Object.entries(docs)
        .map(([name, content]) => `\n\n---\n\n${content}`)
        .join('');
    return header + sections;
}
//# sourceMappingURL=llms-txt.generator.js.map
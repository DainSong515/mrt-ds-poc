/**
 * semantic-token.ts
 * get_semantic_token tool - 의미 기반 토큰 조회
 */
import semanticColorTokens from '../../../tokens/src/semantic/color.semantic.json';
import shadowSemanticTokens from '../../../tokens/src/semantic/shadow.semantic.json';
import typographySemanticTokens from '../../../tokens/src/semantic/typography.semantic.json';
import buttonComponentTokens from '../../../tokens/src/component/button.component.json';

type TokenNode = {
  $value?: string;
  $type?: string;
  $description?: string;
  [key: string]: TokenNode | string | undefined;
};

function flattenSemantic(obj: Record<string, unknown>, prefix = ''): Array<{
  path: string;
  reference: string;
  type: string;
  description: string;
}> {
  const result: Array<{ path: string; reference: string; type: string; description: string }> = [];

  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;

    const currentPath = prefix ? `${prefix}.${key}` : key;
    const node = val as TokenNode;

    if (node && typeof node === 'object' && '$value' in node) {
      result.push({
        path: currentPath,
        reference: String(node.$value ?? ''),
        type: String(node.$type ?? 'unknown'),
        description: String(node.$description ?? ''),
      });
    } else if (node && typeof node === 'object') {
      result.push(...flattenSemantic(node as Record<string, unknown>, currentPath));
    }
  }

  return result;
}

const allSemanticTokens = [
  ...flattenSemantic(semanticColorTokens as unknown as Record<string, unknown>),
  ...flattenSemantic(shadowSemanticTokens as unknown as Record<string, unknown>),
  ...flattenSemantic(typographySemanticTokens as unknown as Record<string, unknown>),
  ...flattenSemantic(buttonComponentTokens as unknown as Record<string, unknown>),
];

export function getSemanticToken(intent: string): string {
  const lower = intent.toLowerCase();
  const matches = allSemanticTokens.filter(
    (t) =>
      t.path.toLowerCase().includes(lower) ||
      t.description.toLowerCase().includes(lower)
  );

  if (matches.length === 0) {
    return [
      `"${intent}"에 해당하는 semantic 토큰을 찾을 수 없습니다.`,
      '',
      '사용 가능한 intent 카테고리:',
      '- **색상**: surface(배경), content(텍스트), border(테두리), interactive(인터랙션)',
      '- **그림자**: elevation.low, elevation.medium, elevation.high, elevation.overlay, elevation.top',
      '- **타이포그래피**: display, title, body, label, caption',
      '- **버튼 컴포넌트**: button.primary, button.secondary, button.tertiary, button.size',
      '',
      '예시: get_semantic_token({ intent: "surface" })',
      '예시: get_semantic_token({ intent: "CTA" })',
      '예시: get_semantic_token({ intent: "disabled" })',
    ].join('\n');
  }

  const lines: string[] = [
    `## Semantic 토큰: "${intent}"`,
    `${matches.length}개 토큰 매칭\n`,
    '| 토큰 경로 | 참조 | 설명 |',
    '|-----------|------|------|',
  ];

  for (const t of matches.slice(0, 20)) {
    lines.push(`| \`${t.path}\` | \`${t.reference}\` | ${t.description} |`);
  }

  if (matches.length > 20) {
    lines.push(`\n... 및 ${matches.length - 20}개 추가 토큰`);
  }

  return lines.join('\n');
}

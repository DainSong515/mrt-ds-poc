import colorTokens from '../../../tokens/src/scale/color.scale.json';
import shadowTokens from '../../../tokens/src/scale/shadow.scale.json';
import typographyTokens from '../../../tokens/src/scale/typography.scale.json';
import semanticColorTokens from '../../../tokens/src/semantic/color.semantic.json';
import shadowSemanticTokens from '../../../tokens/src/semantic/shadow.semantic.json';
import buttonComponentTokens from '../../../tokens/src/component/button.component.json';

type TokenValue = string | number | Record<string, unknown>;
interface TokenLeaf { $value: TokenValue; $type?: string; $description?: string }
type TokenNode = TokenLeaf | Record<string, unknown>;

function flattenTokens(obj: Record<string, unknown>, prefix = ''): Record<string, { value: TokenValue; type: string }> {
  const result: Record<string, { value: TokenValue; type: string }> = {};

  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;

    const fullKey = prefix ? `${prefix}.${key}` : key;
    const node = val as TokenNode;

    if (node && typeof node === 'object' && '$value' in node) {
      result[fullKey] = {
        value: node.$value as TokenValue,
        type: (node.$type as string) || 'unknown',
      };
    } else if (node && typeof node === 'object') {
      Object.assign(result, flattenTokens(node as Record<string, unknown>, fullKey));
    }
  }

  return result;
}

const allTokens = {
  ...flattenTokens(colorTokens as unknown as Record<string, unknown>),
  ...flattenTokens(shadowTokens as unknown as Record<string, unknown>),
  ...flattenTokens(typographyTokens as unknown as Record<string, unknown>),
  ...flattenTokens(semanticColorTokens as unknown as Record<string, unknown>),
  ...flattenTokens(shadowSemanticTokens as unknown as Record<string, unknown>),
  ...flattenTokens(buttonComponentTokens as unknown as Record<string, unknown>),
};

export function getToken(name: string): string {
  const lower = name.toLowerCase();
  const matches = Object.entries(allTokens).filter(([key]) =>
    key.toLowerCase().includes(lower)
  );

  if (matches.length === 0) {
    return `"${name}" 토큰을 찾을 수 없습니다.\n\n사용 가능한 토큰 카테고리:\n- **Scale**: color.gray, color.blue, color.green, color.yellow, color.red, color.purple, shadow.E100~E500V\n- **Semantic**: color.surface, color.content, color.border, color.interactive, shadow.elevation, typography.display/title/body/label/caption\n- **Component**: button.primary, button.secondary, button.tertiary, button.size.large/medium/small/xSmall\n- **Typography**: typography.headline, typography.paragraph, typography.caption`;
  }

  const lines = matches.map(([key, { value, type }]) => {
    const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value);
    return `- **${key}** (${type}): \`${valueStr}\``;
  });

  return `### 토큰 검색 결과: "${name}"\n\n${lines.join('\n')}`;
}

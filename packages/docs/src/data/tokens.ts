import colorScale from '@tokens/scale/color.scale.json';
import colorSemantic from '@tokens/semantic/color.semantic.json';
import shadowScale from '@tokens/scale/shadow.scale.json';
import shadowSemantic from '@tokens/semantic/shadow.semantic.json';
import typographyScale from '@tokens/scale/typography.scale.json';
import typographySemantic from '@tokens/semantic/typography.semantic.json';
import buttonComponent from '@tokens/component/button.component.json';

export { colorScale, colorSemantic, shadowScale, shadowSemantic, typographyScale, typographySemantic, buttonComponent };

// 색상 스케일 파싱: { gray: { "50": "#f8f9fa", ... }, ... }
export type ColorGroup = Record<string, string>;
export type ColorScale = Record<string, ColorGroup | string>;

export function parseColorScale(): ColorScale {
  const colors = (colorScale as any).color as Record<string, any>;
  const result: ColorScale = {};
  for (const [group, value] of Object.entries(colors)) {
    if (typeof value === 'object' && '$value' in value) {
      result[group] = value.$value as string;
    } else {
      const steps: ColorGroup = {};
      for (const [step, token] of Object.entries(value as Record<string, any>)) {
        steps[step] = token.$value as string;
      }
      result[group] = steps;
    }
  }
  return result;
}

// 시맨틱 색상 파싱: { surface: { primary: { value, ref, description } }, ... }
export interface SemanticColorEntry {
  value: string;
  ref: string;
  description?: string;
}
export type SemanticColorGroup = Record<string, SemanticColorEntry>;
export type SemanticColors = Record<string, SemanticColorGroup>;

export function parseSemanticColors(): SemanticColors {
  const colors = (colorSemantic as any).color as Record<string, any>;
  const scaleColors = parseColorScale();
  const result: SemanticColors = {};

  for (const [group, entries] of Object.entries(colors)) {
    result[group] = {};
    for (const [name, token] of Object.entries(entries as Record<string, any>)) {
      const ref = token.$value as string;
      // ref 형식: {color.gray.1000} → gray.1000
      const resolved = resolveColorRef(ref, scaleColors);
      result[group][name] = {
        value: resolved,
        ref,
        description: token.$description,
      };
    }
  }
  return result;
}

function resolveColorRef(ref: string, scale: ColorScale): string {
  const match = ref.match(/^\{color\.(.+)\}$/);
  if (!match) return ref;
  const path = match[1].split('.');
  if (path.length === 1) {
    const v = scale[path[0]];
    return typeof v === 'string' ? v : ref;
  }
  if (path.length === 2) {
    const group = scale[path[0]];
    if (typeof group === 'object') return group[path[1]] ?? ref;
  }
  return ref;
}

// 쉐도우 파싱
export interface ShadowEntry {
  name: string;
  value: string;
  description?: string;
  isVertical: boolean;
}

export function parseShadows(): ShadowEntry[] {
  const shadows = (shadowScale as any).shadow as Record<string, any>;
  return Object.entries(shadows).map(([name, token]) => ({
    name,
    value: token.$value as string,
    description: token.$description,
    isVertical: name.endsWith('V'),
  }));
}

// 타이포그래피 파싱
export interface TypographyEntry {
  name: string;
  category: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  letterSpacing?: string;
}

export function parseTypography(): Record<string, TypographyEntry[]> {
  const typo = (typographyScale as any).typography as Record<string, any>;
  const result: Record<string, TypographyEntry[]> = {};

  for (const [category, entries] of Object.entries(typo)) {
    result[category] = Object.entries(entries as Record<string, any>).map(([name, token]) => ({
      name,
      category,
      fontSize: token.$value.fontSize,
      fontWeight: token.$value.fontWeight,
      lineHeight: token.$value.lineHeight,
      letterSpacing: token.$value.letterSpacing,
    }));
  }
  return result;
}

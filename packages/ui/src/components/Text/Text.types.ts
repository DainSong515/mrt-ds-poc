import type React from 'react';

export const TEXT_TYPOGRAPHIES = [
  // display
  'displayBold40', 'displayBold36', 'displayBold32',
  'displayNormal40', 'displayNormal36', 'displayNormal32',
  // headline
  'headlineBold28', 'headlineBold24', 'headlineBold22', 'headlineBold20',
  'headlineBold18', 'headlineBold16', 'headlineBold14',
  'headlineNormal28', 'headlineNormal24', 'headlineNormal22', 'headlineNormal20',
  'headlineNormal18', 'headlineNormal16', 'headlineNormal14',
  // paragraph
  'paragraphBold26', 'paragraphBold22', 'paragraphBold20', 'paragraphBold18',
  'paragraphBold16', 'paragraphBold15', 'paragraphBold14', 'paragraphBold13',
  'paragraphNormal26', 'paragraphNormal22', 'paragraphNormal20', 'paragraphNormal18',
  'paragraphNormal16', 'paragraphNormal15', 'paragraphNormal14', 'paragraphNormal13',
  // caption
  'captionBold15', 'captionBold13', 'captionBold12', 'captionBold11',
  'captionBold10', 'captionBold9',
  'captionNormal15', 'captionNormal13', 'captionNormal12', 'captionNormal11',
  'captionNormal10', 'captionNormal9',
] as const;

export type TextTypography = (typeof TEXT_TYPOGRAPHIES)[number];

export interface TextProps {
  /**
   * 타이포그래피 variant. 네이밍: {카테고리}{굵기}{크기}
   * - 카테고리: display | headline | paragraph | caption
   * - 굵기: Bold | Normal
   * - 크기: 숫자 (9~40)
   * 예: headlineBold20, paragraphNormal14, captionNormal12
   */
  typography: TextTypography;
  /** HTML 태그 오버라이드 */
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';
  /** 텍스트 색상 (토큰 값 또는 hex) */
  color?: string;
  /** N줄 이상 말줄임표 처리 */
  lineClamp?: number;
  children: React.ReactNode;
}

/** typography 네이밍 파싱 */
export type TypographyCategory = 'display' | 'headline' | 'paragraph' | 'caption';
export type TypographyWeight = 'Bold' | 'Normal';

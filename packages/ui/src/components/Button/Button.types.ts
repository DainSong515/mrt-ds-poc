import type React from 'react';

export const BUTTON_VARIANTS = [
  'primary',
  'primaryOpt',
  'secondary',
  'secondaryOpt',
  'tertiary',
  'tertiaryOpt',
  'text',
] as const;

export const BUTTON_SIZES = ['large', 'medium', 'small', 'xSmall'] as const;

export const BUTTON_SHAPES = ['pill', 'rectangle'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export type ButtonShape = (typeof BUTTON_SHAPES)[number];

export interface ButtonProps {
  /**
   * 버튼 시각적 스타일.
   * - primary: 검정 배경 흰 글씨. 메인 CTA (결제, 예약)
   * - primaryOpt: 파란 배경 흰 글씨. 강조 CTA
   * - secondary: 밝은 회색 배경 검정 글씨. 보조 액션
   * - secondaryOpt: 흰 배경 검정 글씨. 흰 배경 위 보조 액션
   * - tertiary: 흰 배경 회색 글씨 + 테두리. 덜 강조된 액션
   * - tertiaryOpt: 테두리 없는 흰 배경. 최소한의 강조
   * - text: 텍스트 언더라인. 인라인 링크형 버튼
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * 버튼 크기.
   * - large: 높이 56px, 패딩 20px
   * - medium: 높이 48px, 패딩 16px
   * - small: 높이 40px, 패딩 12px
   * - xSmall: 높이 36px, 패딩 10px
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * 버튼 테두리 형태.
   * - pill: border-radius 99px
   * - rectangle: border-radius 4px
   * @default 'pill'
   */
  shape?: ButtonShape;
  /** 버튼 왼쪽에 표시할 아이콘 이름. 예: "IcoArrowLeft" */
  leftIcon?: string;
  /** 버튼 오른쪽에 표시할 아이콘 이름 */
  rightIcon?: string;
  /** 아이콘만 있는 정사각형 버튼 */
  iconOnly?: boolean;
  /** 부모 너비를 꽉 채움 */
  fullWidth?: boolean;
  /** 로딩 스피너 표시. 사용자 인터랙션 비활성화 */
  loading?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** variant='text'일 때 높이를 줄임 */
  isCompact?: boolean;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** variant별 색상 토큰 참조 */
export const BUTTON_VARIANT_TOKENS: Record<ButtonVariant, {
  background: string;
  content: string;
  description: string;
}> = {
  primary: {
    background: 'color.gray.1000 (#141719)',
    content: 'color.white (#FFFFFF)',
    description: '메인 CTA. 검정 배경 흰 글씨.',
  },
  primaryOpt: {
    background: 'color.blue.500 (#2b96ed)',
    content: 'color.white (#FFFFFF)',
    description: '강조 CTA. 파란 배경 흰 글씨.',
  },
  secondary: {
    background: 'color.gray.80 (#f1f3f5)',
    content: 'color.gray.1000 (#141719)',
    description: '보조 액션. 밝은 회색 배경 검정 글씨.',
  },
  secondaryOpt: {
    background: 'color.white (#FFFFFF)',
    content: 'color.gray.1000 (#141719)',
    description: '흰 배경 위 보조 액션.',
  },
  tertiary: {
    background: 'color.white (#FFFFFF)',
    content: 'color.gray.700 (#495056)',
    description: '테두리 있는 버튼 (border: color.gray.100).',
  },
  tertiaryOpt: {
    background: 'color.white (#FFFFFF)',
    content: 'color.gray.700 (#495056)',
    description: '테두리 없는 최소 강조 버튼.',
  },
  text: {
    background: 'transparent',
    content: 'color.gray.1000 (#141719)',
    description: '텍스트 언더라인 인라인 링크형 버튼.',
  },
};

/** size별 크기 정보 */
export const BUTTON_SIZE_SPECS: Record<ButtonSize, {
  height: string;
  paddingX: string;
  typography: string;
}> = {
  large: { height: '56px', paddingX: '20px', typography: 'headlineNormal18' },
  medium: { height: '48px', paddingX: '16px', typography: 'headlineNormal16' },
  small: { height: '40px', paddingX: '12px', typography: 'headlineNormal14' },
  xSmall: { height: '36px', paddingX: '10px', typography: 'headlineNormal14' },
};

import type React from 'react';

export const CHIP_VARIANTS = ['filled', 'outlined'] as const;
export const CHIP_SIZES = ['medium', 'small'] as const;

export type ChipVariant = (typeof CHIP_VARIANTS)[number];
export type ChipSize = (typeof CHIP_SIZES)[number];

export interface ChipProps {
  /**
   * 선택 여부.
   * - true: gray.1000 배경 + 흰 텍스트 (선택됨)
   * - false: gray.80 배경 + gray.700 텍스트 (미선택)
   * @default false
   */
  selected?: boolean;
  /**
   * 칩 스타일 변형.
   * - filled: 배경색 채움 (기본)
   * - outlined: 테두리만 (border: gray.100)
   * @default 'filled'
   */
  variant?: ChipVariant;
  /**
   * 칩 크기.
   * - medium: 높이 36px, 패딩 12px, headlineNormal14
   * - small: 높이 28px, 패딩 10px, captionNormal12
   * @default 'medium'
   */
  size?: ChipSize;
  /** 비활성화 */
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

/** 선택 상태별 토큰 참조 */
export const CHIP_SELECTED_TOKENS = {
  selected: {
    background: 'color.gray.1000 (#141719)',
    content: 'color.white (#FFFFFF)',
  },
  default: {
    background: 'color.gray.80 (#f1f3f5)',
    content: 'color.gray.700 (#495056)',
  },
  outlined: {
    background: 'color.white (#FFFFFF)',
    border: 'color.gray.100 (#e9ecef)',
    content: 'color.gray.700 (#495056)',
  },
} as const;

export const CHIP_SIZE_SPECS: Record<ChipSize, {
  height: string;
  paddingX: string;
  typography: string;
}> = {
  medium: { height: '36px', paddingX: '12px', typography: 'headlineNormal14' },
  small: { height: '28px', paddingX: '10px', typography: 'captionNormal12' },
};

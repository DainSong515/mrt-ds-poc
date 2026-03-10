import type React from 'react';

export const TAB_SIZES = ['medium', 'small'] as const;
export type TabSize = (typeof TAB_SIZES)[number];

export interface TabItem {
  /** 탭 고유 키 */
  key: string;
  /** 탭 레이블 텍스트 */
  label: string;
  /** 뱃지 표시 여부 (이미지의 "N" 뱃지) */
  badge?: boolean;
  /** 비활성화 */
  disabled?: boolean;
}

export interface TabBarProps {
  /** 탭 목록 */
  tabs: TabItem[];
  /** 현재 선택된 탭 key */
  activeKey: string;
  /** 탭 변경 콜백 */
  onChange: (key: string) => void;
  /**
   * 탭 크기.
   * - medium: 높이 44px, headlineNormal16
   * - small: 높이 36px, headlineNormal14
   * @default 'medium'
   */
  size?: TabSize;
}

/** 크기별 스펙 */
export const TAB_SIZE_SPECS: Record<TabSize, {
  height: string;
  fontSize: string;
  paddingX: string;
  indicatorHeight: string;
}> = {
  medium: { height: '44px', fontSize: '16px', paddingX: '16px', indicatorHeight: '2px' },
  small: { height: '36px', fontSize: '14px', paddingX: '12px', indicatorHeight: '2px' },
};

/** 탭바 토큰 참조 */
export const TAB_TOKENS = {
  active: {
    content: 'color.interactive.accent (#2b96ed)',
    indicator: 'color.interactive.accent (#2b96ed)',
  },
  default: {
    content: 'color.gray.700 (#495056)',
  },
  disabled: {
    content: 'color.gray.300 (#ced4da)',
  },
  badge: {
    background: 'color.red (or semantic danger)',
    content: 'color.white',
  },
  separator: {
    border: 'color.gray.100 (#e9ecef)',
  },
} as const;

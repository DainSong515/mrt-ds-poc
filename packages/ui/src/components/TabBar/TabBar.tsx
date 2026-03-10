import React from 'react';

import type { TabBarProps } from './TabBar.types';
import { TAB_SIZE_SPECS } from './TabBar.types';

const COLORS = {
  blue: { 500: '#2b96ed' },
  gray: { 100: '#e9ecef', 300: '#ced4da', 700: '#495056' },
  red: '#e84118',
  white: '#FFFFFF',
} as const;

export function TabBar({
  tabs,
  activeKey,
  onChange,
  size = 'medium',
}: TabBarProps) {
  const spec = TAB_SIZE_SPECS[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottom: `1px solid ${COLORS.gray[100]}`,
        backgroundColor: COLORS.white,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        const isDisabled = tab.disabled ?? false;

        const textColor = isDisabled
          ? COLORS.gray[300]
          : isActive
          ? COLORS.blue[500]
          : COLORS.gray[700];

        return (
          <button
            key={tab.key}
            onClick={isDisabled ? undefined : () => onChange(tab.key)}
            disabled={isDisabled}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              height: spec.height,
              paddingLeft: spec.paddingX,
              paddingRight: spec.paddingX,
              border: 'none',
              backgroundColor: 'transparent',
              color: textColor,
              fontSize: spec.fontSize,
              fontWeight: isActive ? 700 : 400,
              fontFamily: 'inherit',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}
          >
            {tab.label}

            {/* "N" 뱃지 */}
            {tab.badge && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: COLORS.red,
                  color: COLORS.white,
                  fontSize: '9px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                N
              </span>
            )}

            {/* 활성 탭 하단 인디케이터 */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: spec.indicatorHeight,
                  backgroundColor: COLORS.blue[500],
                  borderRadius: '1px 1px 0 0',
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TabBar;

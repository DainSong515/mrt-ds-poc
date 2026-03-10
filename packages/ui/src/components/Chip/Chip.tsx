import React from 'react';

import type { ChipProps } from './Chip.types';
import { CHIP_SIZE_SPECS } from './Chip.types';

const COLORS = {
  gray: { 80: '#f1f3f5', 100: '#e9ecef', 300: '#ced4da', 700: '#495056', 1000: '#141719' },
  white: '#FFFFFF',
} as const;

export function Chip({
  selected = false,
  variant = 'filled',
  size = 'medium',
  disabled = false,
  children,
  onClick,
}: ChipProps) {
  const spec = CHIP_SIZE_SPECS[size];

  const fontSize = size === 'medium' ? '14px' : '12px';
  const fontWeight = 600;

  let backgroundColor: string;
  let color: string;
  let border: string;

  if (disabled) {
    backgroundColor = COLORS.gray[80];
    color = COLORS.gray[300];
    border = 'none';
  } else if (variant === 'outlined') {
    backgroundColor = COLORS.white;
    color = selected ? COLORS.gray[1000] : COLORS.gray[700];
    border = `1px solid ${selected ? COLORS.gray[1000] : COLORS.gray[100]}`;
  } else {
    // filled (기본)
    backgroundColor = selected ? COLORS.gray[1000] : COLORS.gray[80];
    color = selected ? COLORS.white : COLORS.gray[700];
    border = 'none';
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: spec.height,
        paddingLeft: spec.paddingX,
        paddingRight: spec.paddingX,
        borderRadius: '99px',
        border,
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        whiteSpace: 'nowrap',
        transition: 'background-color 0.15s, color 0.15s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export default Chip;

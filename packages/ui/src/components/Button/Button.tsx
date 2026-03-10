/**
 * Button 컴포넌트
 * frontend-dubai /packages/components/src/button/Button.tsx 기반 이식
 * tokens 직접 참조 버전 (Emotion 테마 의존성 제거)
 */
import React from 'react';

import type { ButtonProps } from './Button.types';
import { BUTTON_VARIANT_TOKENS, BUTTON_SIZE_SPECS } from './Button.types';

const COLORS = {
  gray: {
    50: '#f8f9fa',
    80: '#f1f3f5',
    100: '#e9ecef',
    300: '#ced4da',
    700: '#495056',
    900: '#212529',
    1000: '#141719',
  },
  blue: {
    100: '#cbe7fd',
    500: '#2b96ed',
  },
  white: '#FFFFFF',
} as const;

function getButtonStyles(
  variant: NonNullable<ButtonProps['variant']>,
  size: NonNullable<ButtonProps['size']>,
  shape: NonNullable<ButtonProps['shape']>,
  disabled: boolean,
  fullWidth: boolean
): React.CSSProperties {
  const sizeSpec = BUTTON_SIZE_SPECS[size];
  const borderRadius = shape === 'pill' ? '99px' : '4px';

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius,
    border: '0',
    overflow: 'hidden',
    cursor: disabled ? 'not-allowed' : 'pointer',
    height: sizeSpec.height,
    paddingLeft: sizeSpec.paddingX,
    paddingRight: sizeSpec.paddingX,
    width: fullWidth ? '100%' : undefined,
    fontFamily: 'inherit',
    gap: '2px',
  };

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
    primary: {
      backgroundColor: disabled ? COLORS.gray[50] : COLORS.gray[1000],
      color: disabled ? COLORS.gray[300] : COLORS.white,
      border: 'none',
    },
    primaryOpt: {
      backgroundColor: disabled ? COLORS.gray[80] : COLORS.blue[500],
      color: disabled ? COLORS.blue[100] : COLORS.white,
      border: 'none',
    },
    secondary: {
      backgroundColor: disabled ? COLORS.gray[50] : COLORS.gray[80],
      color: disabled ? COLORS.gray[300] : COLORS.gray[1000],
      border: 'none',
    },
    secondaryOpt: {
      backgroundColor: disabled ? COLORS.gray[50] : COLORS.white,
      color: disabled ? COLORS.gray[300] : COLORS.gray[1000],
      border: 'none',
    },
    tertiary: {
      backgroundColor: COLORS.white,
      color: disabled ? COLORS.gray[300] : COLORS.gray[700],
      border: `1px solid ${disabled ? COLORS.gray[100] : COLORS.gray[100]}`,
    },
    tertiaryOpt: {
      backgroundColor: COLORS.white,
      color: disabled ? COLORS.gray[300] : COLORS.gray[700],
      border: 'none',
    },
    text: {
      backgroundColor: 'transparent',
      color: disabled ? COLORS.gray[300] : COLORS.gray[1000],
      border: 'none',
      textDecoration: 'underline',
    },
  };

  return { ...baseStyles, ...variantStyles[variant] };
}

export function Button({
  variant = 'primary',
  size = 'medium',
  shape = 'pill',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconOnly = false,
  isCompact = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const styles = getButtonStyles(variant, size, shape, disabled || loading, fullWidth);
  const sizeSpec = BUTTON_SIZE_SPECS[size];

  const fontSize = {
    headlineNormal18: '18px',
    headlineNormal16: '16px',
    headlineNormal14: '14px',
  }[sizeSpec.typography] ?? '16px';

  return (
    <button
      style={{ ...styles, fontSize, fontWeight: 600 }}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span style={{ marginRight: '4px', opacity: 0.7 }}>⟳</span>
      )}
      {leftIcon && (
        <span style={{ display: 'inline-flex', marginRight: '2px' }}>
          [{leftIcon}]
        </span>
      )}
      {children}
      {rightIcon && (
        <span style={{ display: 'inline-flex', marginLeft: '2px' }}>
          [{rightIcon}]
        </span>
      )}
    </button>
  );
}

export default Button;

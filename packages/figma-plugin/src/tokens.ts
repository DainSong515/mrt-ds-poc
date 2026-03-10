/** tokens/src/scale/color.scale.json과 동기화된 색상 상수 */
export const COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    50: '#f8f9fa',
    60: '#f5f6f7',
    80: '#f1f3f5',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#848c94',
    600: '#666d75',
    700: '#495056',
    800: '#343a40',
    900: '#212529',
    1000: '#141719',
  },
  blue: {
    50: '#f5fbff',
    80: '#e7f4fd',
    100: '#cbe7fd',
    200: '#97d1fb',
    300: '#60b5f6',
    400: '#2896e8',
    500: '#2b96ed',
  },
  red: {
    500: '#ec4937',
  },
  green: {
    500: '#27ab86',
  },
  yellow: {
    500: '#f59e0b',
  },
} as const;

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}

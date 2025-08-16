// Plain theme objects (no styled-components)
export const lightTheme = {
  colors: {
    bg: '#ffffff',
    text: '#0b2135',
    muted: '#6c757d',
    primary: '#0d6efd',
    card: '#ffffff',
    chipBg: '#f1f3f5',
    tabActiveBg: '#e7f1ff',
    border: '#e9ecef',
  },
  spacing: (n: number) => n * 8,
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 9999,
  },
} as const;

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    bg: '#0b1218',
    text: '#e9ecef',
    muted: '#adb5bd',
    card: '#0f1a22',
    chipBg: '#1b2832',
    tabActiveBg: '#10253e',
    border: '#243342',
  },
} as const;

export type AppTheme = typeof lightTheme;

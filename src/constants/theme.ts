import '@/global.css';

import { Platform } from 'react-native';

export const Palette = {
  primary: '#4F8C5B',
  primaryDark: '#3E7349',
  primarySoft: '#EAF4EC',
  primaryMuted: '#DCECE0',
  background: '#F6F6F6',
  card: '#FFFFFF',
  text: '#111111',
  textSecondary: '#6B6B6B',
  muted: '#9A9A9A',
  border: '#EEEEEE',
  star: '#F5A623',
  danger: '#FF4D4F',
  overlay: 'rgba(0,0,0,0.35)',
} as const;

export const Colors = {
  light: {
    text: Palette.text,
    background: Palette.background,
    backgroundElement: Palette.card,
    backgroundSelected: Palette.primarySoft,
    textSecondary: Palette.textSecondary,
    tint: Palette.primary,
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    tint: Palette.primary,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 430;

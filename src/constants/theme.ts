
import '@/global.css';
import { Platform } from 'react-native';

export const Palette = {
  primary: '#222222',
  primaryDark: '#111111',
  primarySoft: '#F5F0E7',
  primaryMuted: '#E8DCC8',

  accent: '#C5A46D',
  accentSoft: '#F4EBDD',

  // Pearl White light theme
  background: '#F8F5EC',
  card: '#FFFFFF',
  input: '#FBF9F4',
  text: '#292929',
  textSecondary: '#6B6257',
  muted: '#999084',
  border: '#E8E0D2',

  star: '#F5A623',
  danger: '#E5484D',
  overlay: 'rgba(0,0,0,0.35)',
} as const;

export const DarkPalette = {
  primary: '#D6B77A',
  primaryDark: '#B89555',
  primarySoft: '#3A3225',
  primaryMuted: '#51432D',

  accent: '#D6B77A',
  accentSoft: '#3A3225',

  background: '#141414',
  card: '#202020',
  input: '#292929',
  text: '#FFFFFF',
  textSecondary: '#C5C5C5',
  muted: '#929292',
  border: '#383838',

  star: '#F5A623',
  danger: '#FF6B6B',
  overlay: 'rgba(0,0,0,0.65)',
} as const;

export const Colors = {
  light: {
    text: Palette.text,
    background: Palette.background,
    backgroundElement: Palette.card,
    backgroundSelected: Palette.primarySoft,
    textSecondary: Palette.textSecondary,
    tint: Palette.primary,
    border: Palette.border,
    danger: Palette.danger,
  },
  dark: {
    text: DarkPalette.text,
    background: DarkPalette.background,
    backgroundElement: DarkPalette.card,
    backgroundSelected: DarkPalette.primarySoft,
    textSecondary: DarkPalette.textSecondary,
    tint: DarkPalette.primary,
    border: DarkPalette.border,
    danger: DarkPalette.danger,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export type AppTheme = {
  primary: string;
  primaryDark: string;
  primarySoft: string;
  primaryMuted: string;
  accent: string;
  accentSoft: string;
  background: string;
  card: string;
  input: string;
  text: string;
  textSecondary: string;
  muted: string;
  border: string;
  star: string;
  danger: string;
  overlay: string;
};

export const getAppTheme = (isDark: boolean): AppTheme =>
  isDark ? DarkPalette : Palette;

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

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 430;

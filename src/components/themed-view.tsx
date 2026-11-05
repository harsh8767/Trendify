import { View, type ViewProps } from 'react-native';

import type { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/context/theme-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type = 'background',
  ...otherProps
}: ThemedViewProps) {
  const { colors, isDark } = useTheme();

  const themeColors: Record<ThemeColor, string> = {
    text: colors.text,
    background: colors.background,
    backgroundElement: colors.card,
    backgroundSelected: colors.primarySoft,
    textSecondary: colors.textSecondary,
    tint: colors.primary,
    border: colors.border,
    danger: colors.danger,
  };

  const backgroundColor = isDark
    ? darkColor ?? themeColors[type]
    : lightColor ?? themeColors[type];

  return (
    <View
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

import { useTheme } from '@/context/theme-context';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'soft' | 'outline';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({
  label,
  onPress,
  variant = 'solid',
  disabled = false,
  style,
}: PrimaryButtonProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[
        styles.primaryButton,
        variant === 'soft' && styles.primaryButtonSoft,
        variant === 'outline' && styles.primaryButtonOutline,
        disabled && styles.primaryButtonDisabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.primaryButtonLabel,
          variant === 'soft' && styles.primaryButtonLabelSoft,
          variant === 'outline' && styles.primaryButtonLabelOutline,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    primaryButton: {
      height: 58,
      borderRadius: 29,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButtonSoft: {
      backgroundColor: colors.accentSoft,
      borderWidth: 1,
      borderColor: colors.accent,
    },
    primaryButtonOutline: {
      backgroundColor: colors.card,
      borderWidth: 1.5,
      borderColor: colors.accent,
    },
    primaryButtonDisabled: {
      opacity: 0.45,
    },
    primaryButtonLabel: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
    },
    primaryButtonLabelSoft: {
      color: colors.primary,
    },
    primaryButtonLabelOutline: {
      color: colors.primary,
    },
  });
}

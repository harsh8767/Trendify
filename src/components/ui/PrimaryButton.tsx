import { Palette } from '@/constants/theme';
import { StyleSheet, Text, TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'soft' | 'outline';
  style?: StyleProp<ViewStyle>;
};

export default function PrimaryButton({ label, onPress, variant = 'solid', style }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.primaryButton,
        variant === 'soft' && styles.primaryButtonSoft,
        variant === 'outline' && styles.primaryButtonOutline,
        style,
      ]}
    >
      <Text
        style={[
          styles.primaryButtonLabel,
          variant !== 'solid' && styles.primaryButtonLabelAlt,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    height: 58,
    borderRadius: 29,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonSoft: {
    backgroundColor: Palette.primarySoft,
  },
  primaryButtonOutline: {
    backgroundColor: Palette.card,
    borderWidth: 1.5,
    borderColor: '#E6E6E6',
  },
  primaryButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonLabelAlt: {
    color: Palette.primary,
  },
});

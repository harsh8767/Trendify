
import { StyleSheet, Text } from 'react-native';

import { useTheme } from '@/context/theme-context';

export default function FormError({ message }: { message: string | null }) {
  const { colors } = useTheme();

  if (!message) return null;

  const styles = StyleSheet.create({
    formError: {
      color: colors.danger,
      fontSize: 13,
      marginTop: 6,
    },
  });

  return (
    <Text style={styles.formError} accessibilityRole="alert">
      {message}
    </Text>
  );
}

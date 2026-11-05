
import { useTheme } from '@/context/theme-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function SectionHeader({
  title,
  actionLabel = 'See All',
  onAction,
}: SectionHeaderProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>

      {onAction ? (
        <TouchableOpacity
          onPress={onAction}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={styles.sectionHeaderAction}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    sectionHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      marginBottom: 16,
    },
    sectionHeaderTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    sectionHeaderAction: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.accent,
    },
  });
}

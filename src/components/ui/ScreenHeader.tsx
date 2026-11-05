import Logo from '@/components/brand/Logo';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ScreenHeaderProps = {
  title: string;
  showLogo?: boolean;
  onSearch?: () => void;
  onMore?: () => void;
  rightLabel?: string;
};

export default function ScreenHeader({
  title,
  showLogo = true,
  onSearch,
  onMore,
  rightLabel,
}: ScreenHeaderProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.screenHeaderRow}>
      {showLogo ? (
        <Logo size={34} />
      ) : (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.screenHeaderIconBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.screenHeaderIcon}>←</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.screenHeaderTitle}>{title}</Text>

      <View style={styles.screenHeaderActions}>
        {onSearch ? (
          <TouchableOpacity
            onPress={onSearch}
            style={styles.screenHeaderIconBtn}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Text style={styles.screenHeaderIcon}>⌕</Text>
          </TouchableOpacity>
        ) : null}

        {onMore ? (
          <TouchableOpacity
            onPress={onMore}
            style={styles.screenHeaderIconBtn}
            accessibilityRole="button"
            accessibilityLabel="More options"
          >
            <Text style={styles.screenHeaderIcon}>
              {rightLabel ?? '⋮'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    screenHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 8,
      gap: 12,
    },
    screenHeaderTitle: {
      flex: 1,
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
    },
    screenHeaderActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    screenHeaderIconBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accentSoft,
    },
    screenHeaderIcon: {
      fontSize: 22,
      color: colors.primary,
    },
  });
}
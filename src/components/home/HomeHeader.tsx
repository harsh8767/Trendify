import { useTheme } from '@/context/theme-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeHeader() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.homeHeaderContainer}>
      <View style={styles.homeHeaderContent}>
        <View>
          <Text style={styles.homeHeaderLabel}>Deliver to</Text>
          <Text style={styles.homeHeaderLocation}>
            📍 Pune, Maharashtra ▼
          </Text>
        </View>

        <TouchableOpacity
          style={styles.homeHeaderNotification}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Text style={styles.homeHeaderNotificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    homeHeaderContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    homeHeaderContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    homeHeaderLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    homeHeaderLocation: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginTop: 4,
    },
    homeHeaderNotification: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: colors.accentSoft,
    },
    homeHeaderNotificationIcon: {
      fontSize: 24,
    },
  });
}

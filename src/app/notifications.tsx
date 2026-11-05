
import { useState } from 'react';
import { NOTIFICATIONS } from '@/constants/data';
import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [readIds, setReadIds] = useState<string[]>([]);

  const unreadCount = NOTIFICATIONS.filter(
    (item) => !readIds.includes(item.id)
  ).length;

  const todayNotifications = NOTIFICATIONS.filter(
    (item) => item.time !== 'Yesterday'
  );

  const earlierNotifications = NOTIFICATIONS.filter(
    (item) => item.time === 'Yesterday'
  );

  const markAsRead = (id: string) => {
    setReadIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  const markAllAsRead = () => {
    setReadIds(NOTIFICATIONS.map((item) => item.id));
  };

  const renderNotification = (item: (typeof NOTIFICATIONS)[number]) => {
    const isRead = readIds.includes(item.id);

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.notifyCard,
          !isRead && styles.unreadCard,
        ]}
        onPress={() => markAsRead(item.id)}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}. ${item.body}. ${isRead ? 'Read' : 'Unread'}. Mark as read`}
      >
        <View style={styles.notifyIcon}>
          <Text style={styles.bellIcon}>🔔</Text>
        </View>

        <View style={styles.notifyContent}>
          <View style={styles.titleRow}>
            <Text style={styles.notifyName}>{item.title}</Text>
            {!isRead && <View style={styles.unreadDot} />}
          </View>

          <Text style={styles.notifyBody}>{item.body}</Text>
          <Text style={styles.notifyTime}>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.notifyScreen} edges={['top']}>
      <View style={styles.notifyHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}
        >
          <Text style={styles.notifyBack}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.notifyTitle}>Notification</Text>
          {unreadCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        <View style={styles.headerRight}>
          {unreadCount > 0 ? (
            <TouchableOpacity
              onPress={markAllAsRead}
              accessibilityRole="button"
              accessibilityLabel="Mark all notifications as read"
            >
              <Text style={styles.markAllText}>Read all</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.headerPlaceholder} />
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.notifyScroll}
        showsVerticalScrollIndicator={false}
      >
        {NOTIFICATIONS.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptyBody}>
              You’re all caught up. We’ll let you know when something new
              happens.
            </Text>
          </View>
        ) : (
          <>
            {todayNotifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Today</Text>
                {todayNotifications.map(renderNotification)}
              </View>
            )}

            {earlierNotifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Earlier</Text>
                {earlierNotifications.map(renderNotification)}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    notifyScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    notifyHeader: {
      minHeight: 58,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 8,
      backgroundColor: colors.background,
    },
    backButton: {
      width: 64,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    notifyBack: {
      fontSize: 28,
      color: colors.text,
    },
    headerTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    notifyTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: colors.text,
    },
    countBadge: {
      minWidth: 21,
      height: 21,
      borderRadius: 11,
      paddingHorizontal: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    countText: {
      fontSize: 11,
      fontWeight: '800',
      color: '#FFFFFF',
    },
    headerRight: {
      width: 64,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    headerPlaceholder: {
      width: 1,
    },
    markAllText: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.primary,
    },
    notifyScroll: {
      padding: 20,
      paddingBottom: 32,
      gap: 22,
    },
    section: {
      gap: 12,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 2,
    },
    notifyCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 18,
      padding: 16,
    },
    unreadCard: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },
    notifyIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bellIcon: {
      fontSize: 19,
    },
    notifyContent: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    notifyName: {
      flex: 1,
      fontWeight: '800',
      fontSize: 15,
      color: colors.text,
    },
    unreadDot: {
      width: 9,
      height: 9,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    notifyBody: {
      color: colors.textSecondary,
      marginTop: 5,
      lineHeight: 20,
      fontSize: 13,
    },
    notifyTime: {
      color: colors.muted,
      marginTop: 8,
      fontSize: 12,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 28,
      paddingVertical: 80,
    },
    emptyIcon: {
      fontSize: 42,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 8,
    },
    emptyBody: {
      fontSize: 14,
      lineHeight: 21,
      textAlign: 'center',
      color: colors.textSecondary,
    },
  });
}

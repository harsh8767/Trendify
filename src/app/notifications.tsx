import { NOTIFICATIONS } from '@/constants/data';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.notifyScreen} edges={['top']}>
      <View style={styles.notifyHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.notifyBack}>←</Text>
        </TouchableOpacity>
        <Text style={styles.notifyTitle}>Notification</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView contentContainerStyle={styles.notifyScroll}>
        {NOTIFICATIONS.map((item) => (
          <View key={item.id} style={styles.notifyCard}>
            <View style={styles.notifyIcon}>
              <Text>🔔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.notifyName}>{item.title}</Text>
              <Text style={styles.notifyBody}>{item.body}</Text>
              <Text style={styles.notifyTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  notifyScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  notifyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  notifyBack: {
    fontSize: 26,
  },
  notifyTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  notifyScroll: {
    padding: 20,
    gap: 12,
  },
  notifyCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
    padding: 16,
  },
  notifyIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Palette.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyName: {
    fontWeight: '800',
    fontSize: 16,
  },
  notifyBody: {
    color: Palette.textSecondary,
    marginTop: 4,
  },
  notifyTime: {
    color: Palette.muted,
    marginTop: 6,
    fontSize: 12,
  },
});

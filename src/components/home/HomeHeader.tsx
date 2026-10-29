import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeHeader() {
  return (
    <View style={styles.homeHeaderContainer}>
      <View style={styles.homeHeaderContent}>
        <View>
          <Text style={styles.homeHeaderLabel}>Deliver to</Text>
          <Text style={styles.homeHeaderLocation}>📍 Pune, Maharashtra ▼</Text>
        </View>
        <TouchableOpacity style={styles.homeHeaderNotification}>
          <Text style={styles.homeHeaderNotificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeaderContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  homeHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeHeaderLabel: {
    fontSize: 12,
    color: '#666',
  },
  homeHeaderLocation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  homeHeaderNotification: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeHeaderNotificationIcon: {
    fontSize: 24,
  },
});

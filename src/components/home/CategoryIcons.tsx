import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const categories = [
  { id: 1, name: 'Mobiles', icon: '📱' },
  { id: 2, name: 'Fashion', icon: '👕' },
  { id: 3, name: 'Electronics', icon: '💻' },
  { id: 4, name: 'Home', icon: '🏠' },
  { id: 5, name: 'Beauty', icon: '💄' },
];

export default function CategoryIcons() {
  return (
    <View style={styles.categoryIconsContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryIconsScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryIconsItem}>
            <View style={styles.categoryIconsIcon}>
              <Text style={styles.categoryIconsEmoji}>{category.icon}</Text>
            </View>
            <Text style={styles.categoryIconsName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryIconsContainer: {
    paddingVertical: 15,
  },
  categoryIconsScroll: {
    paddingHorizontal: 15,
  },
  categoryIconsItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryIconsIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
  },
  categoryIconsEmoji: {
    fontSize: 28,
  },
  categoryIconsName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

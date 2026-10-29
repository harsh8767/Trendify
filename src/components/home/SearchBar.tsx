import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBarWrapper}>
        <Text style={styles.searchBarIcon}>🔍</Text>
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search for products..."
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBarIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
});

import { useTheme } from '@/context/theme-context';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchBar() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBarWrapper}>
        <Text style={styles.searchBarIcon}>🔍</Text>

        <TextInput
          style={styles.searchBarInput}
          placeholder="Search for products..."
          placeholderTextColor={colors.muted}
        />
      </View>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    searchBarContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    searchBarWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    searchBarIcon: {
      fontSize: 20,
      marginRight: 10,
    },
    searchBarInput: {
      flex: 1,
      fontSize: 15,
      color: colors.text,
    },
  });
}
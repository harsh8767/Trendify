import { useTheme } from '@/context/theme-context';
import { useRouter } from 'expo-router';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const products = [
  {
    id: 1,
    name: 'Smartphones',
    discount: 'Up to 40% Off',
    image: require('@/assets/images/react-logo.png'),
  },
  {
    id: 2,
    name: 'Footwear',
    discount: 'Up to 50% Off',
    image: require('@/assets/images/react-logo.png'),
  },
];

export default function BestDeals() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.bestDealsContainer}>
      <View style={styles.bestDealsHeader}>
        <Text style={styles.bestDealsTitle}>Best Deals</Text>

        <TouchableOpacity accessibilityRole="button">
          <Text style={styles.bestDealsSeeAll}>See All →</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bestDealsScroll}
      >
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.bestDealsCard}
            onPress={() => router.push('/product-detail')}
            accessibilityRole="button"
            accessibilityLabel={`${product.name}, ${product.discount}`}
          >
            <Image
              source={product.image}
              style={styles.bestDealsImage}
            />

            <Text style={styles.bestDealsName}>{product.name}</Text>

            <Text style={styles.bestDealsDiscount}>
              {product.discount}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    bestDealsContainer: {
      paddingVertical: 15,
    },
    bestDealsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 15,
    },
    bestDealsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    bestDealsSeeAll: {
      fontSize: 14,
      color: colors.accent,
      fontWeight: '600',
    },
    bestDealsScroll: {
      paddingHorizontal: 15,
    },
    bestDealsCard: {
      width: 160,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    bestDealsImage: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      backgroundColor: colors.primarySoft,
      marginBottom: 10,
    },
    bestDealsName: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 5,
    },
    bestDealsDiscount: {
      fontSize: 13,
      color: colors.accent,
      fontWeight: '600',
    },
  });
}
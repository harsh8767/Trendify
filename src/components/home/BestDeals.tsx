import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const products = [
  { 
    id: 1, 
    name: 'Smartphones', 
    discount: 'Up to 40% Off',
    image: require('@/assets/images/react-logo.png')
  },
  { 
    id: 2, 
    name: 'Footwear', 
    discount: 'Up to 50% Off',
    image: require('@/assets/images/react-logo.png')
  },
];

export default function BestDeals() {
  const router = useRouter();

  return (
    <View style={styles.bestDealsContainer}>
      <View style={styles.bestDealsHeader}>
        <Text style={styles.bestDealsTitle}>Best Deals</Text>
        <TouchableOpacity>
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
          >
            <Image source={product.image} style={styles.bestDealsImage} />
            <Text style={styles.bestDealsName}>{product.name}</Text>
            <Text style={styles.bestDealsDiscount}>{product.discount}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: '#333',
  },
  bestDealsSeeAll: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: '500',
  },
  bestDealsScroll: {
    paddingHorizontal: 15,
  },
  bestDealsCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bestDealsImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  bestDealsName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  bestDealsDiscount: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '500',
  },
});

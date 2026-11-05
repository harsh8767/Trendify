
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '@/context/theme-context';
import { useShop, type SellerProduct } from '@/context/shop-context';
import { formatRupees } from '@/utils/currency';

const demoProducts: SellerProduct[] = [
  {
    id: 'demo-1',
    name: 'Classic Cotton T-Shirt',
    description: 'Comfortable everyday cotton t-shirt.',
    category: 'Clothing',
    price: 599,
    stock: 24,
    subcategoryId: 'clothing-tshirts',
    image: '',
  },
  {
    id: 'demo-2',
    name: 'Everyday Casual Shoes',
    description: 'Stylish and comfortable casual shoes.',
    category: 'Footwear',
    price: 1299,
    stock: 18,
    subcategoryId: 'footwear-casual',
    image: '',
  },
  {
    id: 'demo-3',
    name: 'Minimalist Backpack',
    description: 'A practical backpack for everyday use.',
    category: 'Accessories',
    price: 899,
    stock: 12,
    subcategoryId: 'accessories-bags',
    image: '',
  },
  {
    id: 'demo-4',
    name: 'Premium Denim Jeans',
    description: 'Classic fit denim jeans.',
    category: 'Clothing',
    price: 1199,
    stock: 3,
    subcategoryId: 'clothing-jeans',
    image: '',
  },
  {
    id: 'demo-5',
    name: 'Elegant Wrist Watch',
    description: 'Minimal design wrist watch.',
    category: 'Accessories',
    price: 1499,
    stock: 15,
    subcategoryId: 'accessories-watches',
    image: '',
  },
  {
    id: 'demo-6',
    name: 'Printed Summer Dress',
    description: 'Lightweight printed summer dress.',
    category: 'Clothing',
    price: 999,
    stock: 0,
    subcategoryId: 'clothing-dresses',
    image: '',
  },
  {
    id: 'demo-7',
    name: 'Leather Wallet',
    description: 'Compact everyday wallet.',
    category: 'Accessories',
    price: 499,
    stock: 8,
    subcategoryId: 'accessories-wallets',
    image: '',
  },
  {
    id: 'demo-8',
    name: 'Sports Running Shoes',
    description: 'Lightweight shoes for running.',
    category: 'Footwear',
    price: 1799,
    stock: 21,
    subcategoryId: 'footwear-sports',
    image: '',
  },
];

export default function SellerProductsScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { sellerProducts, deleteSellerProduct } = useShop();
  const [search, setSearch] = useState('');

  const isDemoMode = sellerProducts.length === 0;
  const products = isDemoMode ? demoProducts : sellerProducts;

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategoryId.toLowerCase().includes(query)
    );
  }, [products, search]);

  const handleAddProduct = () => {
    router.push('/seller-add-product');
  };

  const handleEditProduct = (product: SellerProduct) => {
    if (isDemoMode) {
      Alert.alert(
        'Demo product',
        'Add a real product to your store to enable editing.'
      );
      return;
    }

    router.push({
      pathname: '/seller-add-product',
      params: {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: String(product.price),
        stock: String(product.stock),
        categoryId: product.subcategoryId.split('-')[0],
        subcategoryId: product.subcategoryId,
        imageUrl: product.image,
      },
    });
  };

  const handleDeleteProduct = (product: SellerProduct) => {
    if (isDemoMode) {
      Alert.alert(
        'Demo product',
        'Demo products cannot be deleted. Add a real product to manage your inventory.'
      );
      return;
    }

    Alert.alert(
      'Delete product',
      `Are you sure you want to delete "${product.name}"? This will also remove it from the customer catalogue.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteSellerProduct(product.id),
        },
      ]
    );
  };

  const renderProduct = ({ item }: { item: SellerProduct }) => {
    const outOfStock = item.stock === 0;
    const lowStock = item.stock > 0 && item.stock <= 5;

    return (
      <View style={styles.productCard}>
        <View style={styles.productIcon}>
          <FontAwesome
            name="shopping-bag"
            size={23}
            color={colors.primary}
          />
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.category}>{item.category}</Text>

          <Text style={styles.price}>
            {formatRupees(item.price)}
          </Text>

          <View
            style={[
              styles.stockBadge,
              outOfStock
                ? styles.outOfStockBadge
                : lowStock
                  ? styles.lowStockBadge
                  : styles.inStockBadge,
            ]}
          >
            <Text
              style={[
                styles.stockText,
                outOfStock
                  ? styles.outOfStockText
                  : lowStock
                    ? styles.lowStockText
                    : styles.inStockText,
              ]}
            >
              {outOfStock
                ? 'Out of stock'
                : lowStock
                  ? `${item.stock} left - Low stock`
                  : `${item.stock} in stock`}
            </Text>
          </View>
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditProduct(item)}
            accessibilityRole="button"
            accessibilityLabel={`Edit ${item.name}`}
          >
            <FontAwesome name="pencil" size={16} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteProduct(item)}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${item.name}`}
          >
            <FontAwesome name="trash-o" size={17} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const totalProducts = products.length;
  const inStock = products.filter((product) => product.stock > 0).length;
  const outOfStock = products.filter((product) => product.stock === 0).length;
  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 5
  ).length;

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
        >
          <FontAwesome name="arrow-left" size={17} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.heading}>My Products</Text>
          <Text style={styles.subtitle}>Manage your store inventory</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddProduct}
          accessibilityRole="button"
          accessibilityLabel="Add product"
        >
          <FontAwesome name="plus" size={17} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {isDemoMode && (
        <View style={styles.demoBanner}>
          <FontAwesome name="info-circle" size={15} color={colors.primary} />
          <Text style={styles.demoText}>
            Demo inventory · Sample products for presentation
          </Text>
        </View>
      )}

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total products</Text>
          <Text style={styles.summaryValue}>{totalProducts}</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View>
          <Text style={styles.summaryLabel}>In stock</Text>
          <Text style={styles.summaryValue}>{inStock}</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View>
          <Text style={styles.summaryLabel}>Out of stock</Text>
          <Text style={styles.summaryValue}>{outOfStock}</Text>
        </View>
      </View>

      <View style={styles.lowStockInfo}>
        <FontAwesome name="exclamation-circle" size={14} color="#D69A36" />
        <Text style={styles.lowStockInfoText}>
          {lowStock} products need restocking
        </Text>
      </View>

      <View style={styles.searchWrapper}>
        <FontAwesome name="search" size={16} color={colors.muted} />

        <TextInput
          style={styles.searchInput}
          placeholder="Search your products..."
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <FontAwesome name="times-circle" size={17} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.listHeading}>
        <Text style={styles.listTitle}>Your inventory</Text>
        <Text style={styles.listCount}>
          {filteredProducts.length} products
        </Text>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <FontAwesome name="cube" size={35} color={colors.muted} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>
              Try another search or add a new product to your store.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 18,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingTop: 14,
      paddingBottom: 15,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 13,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      flex: 1,
    },
    heading: {
      fontSize: 22,
      fontWeight: '900',
      color: colors.text,
    },
    subtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
    },
    addButton: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    demoBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      padding: 11,
      borderRadius: 11,
      backgroundColor: colors.primarySoft,
      marginBottom: 13,
    },
    demoText: {
      flex: 1,
      fontSize: 10,
      fontWeight: '700',
      color: colors.text,
    },
    summaryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingVertical: 17,
      borderRadius: 16,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 10,
      color: colors.textSecondary,
    },
    summaryValue: {
      fontSize: 20,
      fontWeight: '900',
      color: colors.text,
      marginTop: 6,
    },
    summaryDivider: {
      width: 1,
      height: 35,
      backgroundColor: colors.border,
    },
    lowStockInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      marginBottom: 15,
    },
    lowStockInfoText: {
      fontSize: 10,
      color: colors.textSecondary,
      fontWeight: '700',
    },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      minHeight: 48,
      paddingHorizontal: 14,
      borderRadius: 12,
      backgroundColor: colors.input,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 19,
    },
    searchInput: {
      flex: 1,
      fontSize: 13,
      color: colors.text,
      paddingVertical: 10,
    },
    listHeading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 13,
    },
    listTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text,
    },
    listCount: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    listContent: {
      paddingBottom: 30,
      flexGrow: 1,
    },
    productCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 15,
      padding: 13,
      marginBottom: 11,
      gap: 12,
    },
    productIcon: {
      width: 55,
      height: 62,
      borderRadius: 12,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    productDetails: {
      flex: 1,
    },
    productName: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.text,
    },
    category: {
      fontSize: 10,
      color: colors.textSecondary,
      marginTop: 4,
    },
    price: {
      fontSize: 13,
      fontWeight: '800',
      color: colors.primary,
      marginTop: 6,
    },
    stockBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginTop: 7,
    },
    inStockBadge: {
      backgroundColor: '#16A34A18',
    },
    lowStockBadge: {
      backgroundColor: '#D69A3618',
    },
    outOfStockBadge: {
      backgroundColor: '#DC262618',
    },
    stockText: {
      fontSize: 9,
      fontWeight: '700',
    },
    inStockText: {
      color: '#16A34A',
    },
    lowStockText: {
      color: '#D69A36',
    },
    outOfStockText: {
      color: '#DC2626',
    },
    productActions: {
      gap: 9,
    },
    actionButton: {
      width: 34,
      height: 34,
      borderRadius: 10,
      backgroundColor: colors.input,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
      paddingVertical: 55,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: '800',
      color: colors.text,
      marginTop: 15,
    },
    emptySubtitle: {
      fontSize: 12,
      lineHeight: 19,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 7,
    },
  });
}

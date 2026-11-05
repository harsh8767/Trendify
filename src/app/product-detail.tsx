
import PrimaryButton from '@/components/ui/PrimaryButton';
import ProductImage from '@/components/ui/ProductImage';
import ProductGallery from '@/components/ui/ProductGallery';
import { formatRupees } from '@/utils/currency';
import {
  getColorHex,
  getColorOptions,
  getProductImages,
  getSizeOptions,
} from '@/constants/product-options';
import { useTheme } from '@/context/theme-context';
import { useShop } from '@/context/shop-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const {
    products,
    addToCart,
    toggleWishlist,
    isWishlisted,
    getProductReviews,
    addProductReview,
  } = useShop();

  const product = useMemo(
    () => products.find((item) => item.id === id) ?? products[0],
    [id, products]
  );

  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (product) {
      setColor(product.color);
      setSize(product.size);
    }
  }, [product]);

  if (!product) {
    return (
      <SafeAreaView style={styles.productScreen} edges={['top']}>
        <View style={styles.productHeader}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.productIconBtn}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.productIcon}>←</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.emptyMessage}>
          This product could not be found.
        </Text>
      </SafeAreaView>
    );
  }

  const saved = isWishlisted(product.id);
  const colorOptions = getColorOptions(product);
  const sizeOptions = getSizeOptions(product);
  const reviews = getProductReviews(product.id);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : product.rating;

  const recommendedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.subcategoryId === product.subcategoryId
    )
    .concat(
      products.filter(
        (item) =>
          item.id !== product.id &&
          item.category === product.category &&
          item.subcategoryId !== product.subcategoryId
      )
    )
    .slice(0, 6);

  const submitReview = () => {
    if (!reviewComment.trim()) {
      Alert.alert(
        'Write a review',
        'Please enter your review before submitting.'
      );
      return;
    }

    addProductReview(
      product.id,
      customerName.trim() || 'Customer',
      reviewRating,
      reviewComment
    );

    setCustomerName('');
    setReviewComment('');
    setReviewRating(5);
    setShowReviewForm(false);

    Alert.alert('Thank you!', 'Your review has been added.');
  };

  return (
    <SafeAreaView style={styles.productScreen} edges={['top']}>
      <View style={styles.productHeader}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.productIconBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.productIcon}>←</Text>
        </TouchableOpacity>

        <View style={styles.productHeaderActions}>
          <TouchableOpacity
            style={styles.productIconBtn}
            onPress={() => toggleWishlist(product.id)}
            accessibilityRole="button"
            accessibilityLabel="Add to wishlist"
          >
            <Text
              style={[
                styles.productIcon,
                saved && styles.productIconSaved,
              ]}
            >
              {saved ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.productIconBtn}
            onPress={() =>
              Alert.alert('Share product', 'Sharing is not available yet.')
            }
            accessibilityRole="button"
            accessibilityLabel="Share product"
          >
            <Text style={styles.productIcon}>⇪</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productScroll}
                stickyHeaderIndices={[0]}
      >
        <ProductGallery
          key={product.id}
          imageUrls={getProductImages(product)}
          productName={product.name}
        />

        <View style={styles.productBody}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.productMeta}>
            <View style={styles.productSold}>
              <Text style={styles.productSoldText}>
                {product.sold?.toLocaleString() ?? '0'} sold
              </Text>
            </View>

            <Text style={styles.productStar}>
              ★ {averageRating.toFixed(1)}
            </Text>

            <Text style={styles.productReviews}>
              ({reviews.length} reviews)
            </Text>
          </View>

          <Text style={styles.productSection}>Description</Text>
          <Text style={styles.productDescription}>
            {product.description}
          </Text>

          <View style={styles.productRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productSection}>Color</Text>

              <View style={styles.productColors}>
                {colorOptions.map((colorName) => (
                  <TouchableOpacity
                    key={colorName}
                    onPress={() => setColor(colorName)}
                    accessibilityRole="button"
                    accessibilityLabel={`Color ${colorName}`}
                    accessibilityState={{ selected: color === colorName }}
                    style={[
                      styles.productSwatch,
                      {
                        backgroundColor: getColorHex(colorName),
                        borderWidth: 1,
                        borderColor: colors.border,
                      },
                      color === colorName && styles.productSwatchOn,
                    ]}
                  />
                ))}
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.productSection}>Size</Text>

              <View style={styles.productSizes}>
                {sizeOptions.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setSize(item)}
                    style={[
                      styles.productSize,
                      item === 'One Size' && styles.productSizeSingle,
                      size === item && styles.productSizeOn,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: size === item }}
                  >
                    <Text
                      style={[
                        styles.productSizeText,
                        size === item && styles.productSizeTextOn,
                      ]}
                      numberOfLines={1}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Customer Reviews */}
          <View style={styles.reviewsSection}>
            <View style={styles.sectionHeadingRow}>
              <Text style={styles.productSection}>Customer Reviews</Text>

              <Text style={styles.reviewCount}>
                {reviews.length} reviews
              </Text>
            </View>

            <View style={styles.ratingSummary}>
              <Text style={styles.averageRating}>
                {averageRating.toFixed(1)}
              </Text>

              <View>
                <Text style={styles.ratingStars}>
                  {'★'.repeat(Math.round(averageRating))}
                  {'☆'.repeat(5 - Math.round(averageRating))}
                </Text>
                <Text style={styles.ratingCaption}>
                  Based on {reviews.length} reviews
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.writeReviewButton}
              onPress={() => setShowReviewForm((current) => !current)}
            >
              <Text style={styles.writeReviewButtonText}>
                {showReviewForm ? 'Close Review Form' : '+ Write a Review'}
              </Text>
            </TouchableOpacity>

            {showReviewForm && (
              <View style={styles.reviewForm}>
                <Text style={styles.formLabel}>Your Name</Text>

                <TextInput
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.muted}
                  style={styles.reviewInput}
                />

                <Text style={styles.formLabel}>Your Rating</Text>

                <View style={styles.ratingPicker}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      onPress={() => setReviewRating(rating)}
                    >
                      <Text
                        style={[
                          styles.ratingPickerStar,
                          rating <= reviewRating &&
                            styles.ratingPickerStarOn,
                        ]}
                      >
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.formLabel}>Your Review</Text>

                <TextInput
                  value={reviewComment}
                  onChangeText={setReviewComment}
                  placeholder="Share your experience with this product..."
                  placeholderTextColor={colors.muted}
                  multiline
                  textAlignVertical="top"
                  style={[styles.reviewInput, styles.reviewTextArea]}
                />

                <PrimaryButton
                  label="Submit Review"
                  onPress={submitReview}
                />
              </View>
            )}

            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewTopRow}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>
                      {review.customerName.charAt(0).toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.reviewCustomerInfo}>
                    <Text style={styles.reviewCustomerName}>
                      {review.customerName}
                    </Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>

                  <Text style={styles.reviewStars}>
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </Text>
                </View>

                <Text style={styles.reviewComment}>
                  {review.comment}
                </Text>

                {review.isDemo && (
                  <Text style={styles.sampleReviewLabel}>
                    Sample review
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Recommended Products */}
          {recommendedProducts.length > 0 && (
            <View style={styles.recommendSection}>
              <Text style={styles.productSection}>
                You May Also Like
              </Text>

              <Text style={styles.recommendSubtitle}>
                More styles selected for you
              </Text>

              <View style={styles.recommendGrid}>
                {recommendedProducts.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recommendCard}
                    activeOpacity={0.9}
                    onPress={() =>
                      router.push({
                        pathname: '/product-detail',
                        params: { id: item.id },
                      })
                    }
                  >
                    <View style={styles.recommendImageWrap}>
                      <ProductImage
                        uri={item.image}
                        style={styles.recommendImage}
                        label={item.name}
                      />
                    </View>

                    <Text
                      style={styles.recommendName}
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>

                    <View style={styles.recommendRatingRow}>
                      <Text style={styles.recommendStar}>★</Text>
                      <Text style={styles.recommendRating}>
                        {item.rating.toFixed(1)}
                      </Text>
                    </View>

                    <Text style={styles.recommendPrice}>
                      {formatRupees(item.price)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.productFooter}>
        <View>
          <Text style={styles.productTotalLabel}>Total Price</Text>
          <Text style={styles.productTotal}>
            {formatRupees(product.price)}
          </Text>
        </View>

        <PrimaryButton
          label="Add to Cart"
          style={{ flex: 1, marginLeft: 16 }}
          onPress={() => {
            addToCart({ ...product, color, size });
            router.push('/(tabs)/cart');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    productScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    productHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 4,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    productHeaderActions: {
      flexDirection: 'row',
    },
    productIconBtn: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    productIcon: {
      fontSize: 24,
      color: colors.text,
    },
    productIconSaved: {
      color: colors.danger,
    },
    productScroll: {
      paddingBottom: 24,
    },
    productBody: {
      paddingHorizontal: 24,
      paddingTop: 20,
    },
    productName: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
    },
    productMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 12,
    },
    productSold: {
      backgroundColor: colors.primarySoft,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    productSoldText: {
      color: colors.primaryDark,
      fontWeight: '700',
      fontSize: 12,
    },
    productStar: {
      fontWeight: '700',
      color: colors.text,
    },
    productReviews: {
      color: colors.textSecondary,
    },
    productSection: {
      marginTop: 22,
      marginBottom: 10,
      fontSize: 18,
      fontWeight: '800',
      color: colors.text,
    },
    productDescription: {
      color: colors.textSecondary,
      lineHeight: 22,
      fontSize: 14,
    },
    productRow: {
      flexDirection: 'row',
      gap: 16,
    },
    productColors: {
      flexDirection: 'row',
      gap: 10,
    },
    productSwatch: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    productSwatchOn: {
      borderWidth: 3,
      borderColor: colors.primary,
    },
    productSizes: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    productSize: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.input,
      alignItems: 'center',
      justifyContent: 'center',
    },
    productSizeSingle: {
      width: 120,
      minWidth: 120,
      paddingHorizontal: 16,
      borderRadius: 18,
    },
    productSizeOn: {
      backgroundColor: colors.primary,
    },
    productSizeText: {
      fontWeight: '700',
      color: colors.text,
    },
    productSizeTextOn: {
      color: '#FFFFFF',
    },
    productFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.card,
    },
    productTotalLabel: {
      color: colors.muted,
      fontSize: 12,
    },
    productTotal: {
      fontSize: 22,
      fontWeight: '800',
      color: colors.text,
    },
    reviewsSection: {
      marginTop: 18,
    },
    sectionHeadingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    reviewCount: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    ratingSummary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      backgroundColor: colors.input,
      borderRadius: 16,
    },
    averageRating: {
      fontSize: 36,
      fontWeight: '800',
      color: colors.text,
    },
    ratingStars: {
      fontSize: 18,
      color: colors.star,
    },
    ratingCaption: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 3,
    },
    writeReviewButton: {
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 12,
      padding: 13,
      alignItems: 'center',
      marginTop: 14,
    },
    writeReviewButtonText: {
      color: colors.primary,
      fontWeight: '800',
    },
    reviewForm: {
      marginTop: 14,
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors.input,
    },
    formLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      marginTop: 10,
    },
    reviewInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: colors.card,
      color: colors.text,
      fontSize: 14,
    },
    reviewTextArea: {
      minHeight: 100,
      marginBottom: 16,
    },
    ratingPicker: {
      flexDirection: 'row',
      gap: 8,
    },
    ratingPickerStar: {
      fontSize: 30,
      color: colors.border,
    },
    ratingPickerStarOn: {
      color: colors.star,
    },
    reviewCard: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    reviewTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewAvatar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.primarySoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    reviewAvatarText: {
      fontWeight: '800',
      color: colors.primaryDark,
      fontSize: 15,
    },
    reviewCustomerInfo: {
      flex: 1,
      marginLeft: 10,
    },
    reviewCustomerName: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text,
    },
    reviewDate: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 3,
    },
    reviewStars: {
      color: colors.star,
      fontSize: 13,
    },
    reviewComment: {
      marginTop: 12,
      fontSize: 13,
      lineHeight: 20,
      color: colors.textSecondary,
    },
    sampleReviewLabel: {
      alignSelf: 'flex-start',
      marginTop: 8,
      color: colors.muted,
      fontSize: 10,
    },
    recommendSection: {
      marginTop: 12,
    },
    recommendSubtitle: {
      color: colors.textSecondary,
      fontSize: 13,
      marginBottom: 14,
    },
    recommendGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    recommendCard: {
      width: '48%',
      marginBottom: 20,
    },
    recommendImageWrap: {
      aspectRatio: 4 / 5,
      borderRadius: 18,
      overflow: 'hidden',
      backgroundColor: colors.input,
    },
    recommendImage: {
      width: '100%',
      height: '100%',
    },
    recommendName: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
      marginTop: 8,
      minHeight: 36,
    },
    recommendRatingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginTop: 5,
    },
    recommendStar: {
      color: colors.star,
      fontSize: 13,
    },
    recommendRating: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    recommendPrice: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '800',
      marginTop: 5,
    },
    emptyMessage: {
      textAlign: 'center',
      marginTop: 48,
      color: colors.muted,
      paddingHorizontal: 24,
    },
  });
}


import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { CATEGORIES, SUBCATEGORIES } from '@/constants/data';
import { useShop } from '@/context/shop-context';
import { useTheme } from '@/context/theme-context';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function SellerAddProductScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    description?: string;
    category?: string;
    categoryId?: string;
    subcategoryId?: string;
    price?: string;
    stock?: string;
    imageUrl?: string;
  }>();

  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { addSellerProduct, updateSellerProduct, sellerProducts } = useShop();

  const isEditing = Boolean(params.id);

  const initialCategory = CATEGORIES.find(
    (item) =>
      item.id === params.categoryId ||
      item.name.toLowerCase() === (params.category ?? '').toLowerCase()
  );

  const [name, setName] = useState(params.name ?? '');
  const [description, setDescription] = useState(params.description ?? '');
  const [categoryId, setCategoryId] = useState(initialCategory?.id ?? '');
  const [subcategoryId, setSubcategoryId] = useState(
    params.subcategoryId ?? ''
  );
  const [price, setPrice] = useState(params.price ?? '');
  const [stock, setStock] = useState(params.stock ?? '');
  const [imageUrl, setImageUrl] = useState(params.imageUrl ?? '');

  const availableSubcategories = useMemo(
    () =>
      SUBCATEGORIES.filter(
        (subcategory) => subcategory.categoryId === categoryId
      ),
    [categoryId]
  );

  const selectedCategory = CATEGORIES.find(
    (category) => category.id === categoryId
  );

  const handleCategoryChange = (id: string) => {
    setCategoryId(id);
    setSubcategoryId('');
  };

  const handleSave = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !categoryId ||
      !subcategoryId ||
      !price.trim() ||
      !stock.trim()
    ) {
      Alert.alert(
        'Missing details',
        'Please complete all required fields and select a subcategory.'
      );
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      Alert.alert('Invalid price', 'Enter a valid price greater than zero.');
      return;
    }

    if (!Number.isInteger(numericStock) || numericStock < 0) {
      Alert.alert(
        'Invalid stock',
        'Stock quantity must be a whole number and cannot be negative.'
      );
      return;
    }

    const cleanImageUrl = imageUrl.trim();

    if (
      cleanImageUrl &&
      !/^https?:\/\/\S+$/i.test(cleanImageUrl)
    ) {
      Alert.alert(
        'Invalid image URL',
        'Enter a valid image URL beginning with http:// or https://.'
      );
      return;
    }

    const selectedSubcategory = SUBCATEGORIES.find(
      (item) => item.id === subcategoryId
    );

    if (!selectedCategory || !selectedSubcategory) {
      Alert.alert('Invalid category', 'Please select a valid category.');
      return;
    }

    const productData = {
      name: name.trim(),
      description: description.trim(),
      category: selectedCategory.name,
      subcategoryId,
      price: numericPrice,
      stock: numericStock,
      rating: 0,
      reviews: 0,
      color: 'Default',
      size: 'One Size',
      image: cleanImageUrl,
      images: cleanImageUrl ? [cleanImageUrl] : undefined,
      sold: 0,
    };

    if (isEditing && params.id) {
      const existingProduct = sellerProducts.find(
        (product) => product.id === params.id
      );

      if (!existingProduct) {
        Alert.alert(
          'Product not found',
          'This product is no longer in your seller inventory.'
        );
        return;
      }

      updateSellerProduct(params.id, productData);

      Alert.alert('Product updated', 'Your product changes have been saved.', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
      return;
    }

    addSellerProduct(productData);

    Alert.alert(
      'Product added',
      'Your product is now available in the shared customer catalogue.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (value: string) => void,
    placeholder: string,
    options?: {
      keyboardType?: 'default' | 'numeric' | 'decimal-pad';
      multiline?: boolean;
      required?: boolean;
    }
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {options?.required !== false ? ' *' : ''}
      </Text>

      <TextInput
        style={[
          styles.input,
          options?.multiline && styles.multilineInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        keyboardType={options?.keyboardType ?? 'default'}
        multiline={options?.multiline}
        textAlignVertical={options?.multiline ? 'top' : 'center'}
        autoCapitalize="sentences"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <FontAwesome name="arrow-left" size={17} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.heading}>
              {isEditing ? 'Edit Product' : 'Add Product'}
            </Text>
            <Text style={styles.subtitle}>
              {isEditing
                ? 'Update your product information'
                : 'Add a new product to your store'}
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeading}>
              <FontAwesome
                name="info-circle"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Product information</Text>
            </View>

            {renderInput(
              'Product name',
              name,
              setName,
              'Enter product name'
            )}

            {renderInput(
              'Product description',
              description,
              setDescription,
              'Describe your product, features and details...',
              { multiline: true }
            )}

            <View style={styles.field}>
              <Text style={styles.label}>Category *</Text>
              <View style={styles.optionList}>
                {CATEGORIES.map((category) => {
                  const selected = categoryId === category.id;

                  return (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.option,
                        selected && styles.selectedOption,
                      ]}
                      onPress={() => handleCategoryChange(category.id)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.selectedOptionText,
                        ]}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {categoryId ? (
              <View style={styles.field}>
                <Text style={styles.label}>Subcategory *</Text>
                <View style={styles.optionList}>
                  {availableSubcategories.map((subcategory) => {
                    const selected = subcategoryId === subcategory.id;

                    return (
                      <TouchableOpacity
                        key={subcategory.id}
                        style={[
                          styles.option,
                          selected && styles.selectedOption,
                        ]}
                        onPress={() => setSubcategoryId(subcategory.id)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selected && styles.selectedOptionText,
                          ]}
                        >
                          {subcategory.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeading}>
              <FontAwesome
                name="rupee"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Pricing and inventory</Text>
            </View>

            {renderInput(
              'Selling price (₹)',
              price,
              setPrice,
              'Enter selling price',
              { keyboardType: 'decimal-pad' }
            )}

            {renderInput(
              'Stock quantity',
              stock,
              setStock,
              'Enter available quantity',
              { keyboardType: 'numeric' }
            )}
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeading}>
              <FontAwesome
                name="image"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>Product image</Text>
            </View>

            <Text style={styles.imageHelp}>
              Enter an image URL for now. Image selection from your device
              will be added in a later step.
            </Text>

            {renderInput(
              'Image URL',
              imageUrl,
              setImageUrl,
              'https://example.com/product.jpg',
              { required: false }
            )}
          </View>

          <View style={styles.requiredNote}>
            <Text style={styles.requiredNoteText}>
              * Required fields
            </Text>
          </View>

          <PrimaryButton
            label={isEditing ? 'Save product changes' : 'Add product'}
            onPress={handleSave}
            style={styles.submitButton}
          />

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            accessibilityRole="button"
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboard: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 19,
    },
    backButton: {
      width: 41,
      height: 41,
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
      fontSize: 21,
      fontWeight: '900',
      color: colors.text,
    },
    subtitle: {
      fontSize: 11,
      color: colors.textSecondary,
      marginTop: 4,
    },
    content: {
      paddingHorizontal: 19,
      paddingBottom: 35,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 16,
      marginBottom: 15,
    },
    sectionHeading: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 19,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: colors.text,
    },
    field: {
      marginBottom: 17,
    },
    label: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      minHeight: 49,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 11,
      backgroundColor: colors.input,
      paddingHorizontal: 13,
      paddingVertical: 11,
      fontSize: 13,
      color: colors.text,
    },
    multilineInput: {
      minHeight: 105,
      paddingTop: 13,
    },
    optionList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    option: {
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.input,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    selectedOption: {
      borderColor: colors.primary,
      backgroundColor: colors.primarySoft,
    },
    optionText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    selectedOptionText: {
      color: colors.primary,
      fontWeight: '800',
    },
    imageHelp: {
      fontSize: 11,
      lineHeight: 17,
      color: colors.textSecondary,
      marginBottom: 15,
    },
    requiredNote: {
      marginBottom: 13,
    },
    requiredNoteText: {
      fontSize: 10,
      color: colors.textSecondary,
    },
    submitButton: {
      marginTop: 2,
    },
    cancelButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      marginTop: 5,
    },
    cancelText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.textSecondary,
    },
  });
}

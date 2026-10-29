# 🎨 Style Guide - E-Commerce App

## CSS Naming Convention

### ✅ The Rule: `[screenName][elementName]`

Every style name starts with the screen/component name followed by the element description.

## 📋 Complete Style Name Reference

### Home Screen Components

#### HomeHeader.tsx
```typescript
homeHeaderContainer          // Main container
homeHeaderContent           // Content wrapper
homeHeaderLabel             // "Deliver to" label
homeHeaderLocation          // Location text
homeHeaderNotification      // Notification button
homeHeaderNotificationIcon  // Bell icon
```

#### SearchBar.tsx
```typescript
searchBarContainer          // Outer container
searchBarWrapper           // Input wrapper
searchBarIcon              // Search icon
searchBarInput             // Text input field
```

#### BannerSlider.tsx
```typescript
bannerSliderContainer      // Main container
bannerSliderScroll         // ScrollView content
bannerSliderCard           // Banner card
bannerSliderCardSecondary  // Secondary colored card
bannerSliderContent        // Text content area
bannerSliderLabel          // "Premium Quality" text
bannerSliderTitle          // Main title
bannerSliderButton         // Shop Now button
bannerSliderButtonText     // Button text
bannerSliderImage          // Icon/emoji
```

#### CategoryIcons.tsx
```typescript
categoryIconsContainer     // Main container
categoryIconsScroll        // ScrollView content
categoryIconsItem          // Single category
categoryIconsIcon          // Icon circle wrapper
categoryIconsEmoji         // Category emoji
categoryIconsName          // Category name text
```

#### BestDeals.tsx
```typescript
bestDealsContainer         // Main container
bestDealsHeader            // Header with title and "See All"
bestDealsTitle             // "Best Deals" title
bestDealsSeeAll            // "See All" link
bestDealsScroll            // ScrollView content
bestDealsCard              // Product card
bestDealsImage             // Product image
bestDealsName              // Product name
bestDealsDiscount          // Discount text
```

### Tab Screens

#### Home Screen (index.tsx)
```typescript
homeScreenContainer        // SafeAreaView wrapper
homeScreenWrapper          // Main wrapper
homeScreenScroll           // ScrollView
```

#### Categories Screen
```typescript
categoriesScreenContainer  // SafeAreaView wrapper
categoriesScreenHeader     // Header bar
categoriesScreenTitle      // "Categories" title
categoriesScreenSearchIcon // Search icon
categoriesScreenScroll     // ScrollView
categoriesScreenGrid       // Grid container
categoriesScreenCard       // Category card
categoriesScreenIconWrapper // Icon background
categoriesScreenIcon       // Category icon
categoriesScreenName       // Category name
```

#### Cart Screen
```typescript
cartScreenContainer        // SafeAreaView wrapper
cartScreenHeader           // Header bar
cartScreenBackButton       // Back arrow
cartScreenTitle            // "My Cart" title
cartScreenDeleteIcon       // Delete icon
cartScreenScroll           // ScrollView
cartScreenItem             // Cart item card
cartScreenItemImage        // Product image
cartScreenItemDetails      // Product info
cartScreenItemName         // Product name
cartScreenItemSize         // Size/color text
cartScreenItemPrice        // Price
cartScreenItemActions      // Actions column
cartScreenRemoveButton     // Remove X button
cartScreenQuantityControl  // Quantity wrapper
cartScreenQuantityButton   // +/- buttons
cartScreenQuantityButtonText // Button text
cartScreenQuantityText     // Quantity number
cartScreenSummary          // Summary section
cartScreenSummaryRow       // Summary row
cartScreenSummaryLabel     // Label text
cartScreenSummaryValue     // Value text
cartScreenSummaryDiscount  // Discount value
cartScreenSummaryFree      // FREE text
cartScreenSummaryTotal     // Total row
cartScreenTotalLabel       // Total label
cartScreenTotalValue       // Total value
cartScreenCheckoutButton   // Checkout button
cartScreenCheckoutButtonText // Button text
```

#### Profile Screen
```typescript
profileScreenContainer     // SafeAreaView wrapper
profileScreenHeader        // Header bar
profileScreenTitle         // "Profile" title
profileScreenSettingsIcon  // Settings gear icon
profileScreenScroll        // ScrollView
profileScreenInfoCard      // User info card
profileScreenAvatar        // Avatar circle
profileScreenAvatarText    // Avatar initials
profileScreenInfo          // User info text area
profileScreenHello         // "Hello," text
profileScreenName          // User name
profileScreenSection       // Section header
profileScreenSectionTitle  // Section title
profileScreenViewAll       // View all button
profileScreenViewAllText   // View all text
profileScreenOrderIcons    // Order icons row
profileScreenOrderIcon     // Single order icon
profileScreenOrderIconEmoji // Icon emoji
profileScreenOrderIconText  // Icon label
profileScreenMenuList      // Menu list container
profileScreenMenuItem      // Menu item row
profileScreenMenuIcon      // Menu icon
profileScreenMenuText      // Menu text
profileScreenMenuArrow     // Arrow >
```

### Product Detail Screen
```typescript
productDetailContainer     // SafeAreaView wrapper
productDetailHeader        // Header overlay
productDetailBackButton    // Back arrow
productDetailFavoriteButton // Heart icon
productDetailScroll        // ScrollView
productDetailImageContainer // Image section
productDetailImage         // Product image
productDetailContent       // Content section
productDetailName          // Product name
productDetailPriceContainer // Price row
productDetailPrice         // Current price
productDetailOriginalPrice // Strikethrough price
productDetailDiscountBadge // Discount badge
productDetailDiscountText  // Discount text
productDetailSection       // Info section
productDetailSectionTitle  // Section title
productDetailColorOptions  // Color picker row
productDetailColorOption   // Color circle
productDetailColorSelected // Selected color
productDetailSizeOptions   // Size picker row
productDetailSizeOption    // Size button
productDetailSizeSelected  // Selected size
productDetailSizeText      // Size number
productDetailSizeTextSelected // Selected size text
productDetailDescription   // Description text
productDetailFooter        // Footer buttons
productDetailAddToCartButton // Add to cart button
productDetailAddToCartIcon   // Cart icon
productDetailAddToCartText   // Button text
productDetailBuyNowButton    // Buy now button
productDetailBuyNowText      // Button text
```

### Checkout Screen
```typescript
checkoutScreenContainer    // SafeAreaView wrapper
checkoutScreenHeader       // Header bar
checkoutScreenBackButton   // Back arrow
checkoutScreenTitle        // "Checkout" title
checkoutScreenScroll       // ScrollView
checkoutScreenSection      // Section container
checkoutScreenSectionTitle // Section title
checkoutScreenAddressCard  // Address card
checkoutScreenAddressHeader // Address header
checkoutScreenAddressType  // Home/Office label
checkoutScreenChangeLink   // Change link
checkoutScreenAddressText  // Address text
checkoutScreenPaymentOption // Payment option row
checkoutScreenPaymentSelected // Selected payment
checkoutScreenPaymentRadio // Radio button
checkoutScreenPaymentRadioInner // Inner circle
checkoutScreenPaymentText  // Payment method text
checkoutScreenCouponRow    // Coupon row
checkoutScreenCouponLabel  // Coupon label
checkoutScreenApplyLink    // Apply link
checkoutScreenSummaryCard  // Summary card
checkoutScreenTotalAmount  // Total price
checkoutScreenPlaceOrderButton // Place order button
checkoutScreenPlaceOrderText // Button text
```

## 🎯 Style Pattern Examples

### Good Examples ✅

```typescript
// Cart quantity control
cartScreenQuantityControl
cartScreenQuantityButton
cartScreenQuantityButtonText
cartScreenQuantityText

// Product detail colors
productDetailColorOptions
productDetailColorOption
productDetailColorSelected

// Profile menu
profileScreenMenuItem
profileScreenMenuIcon
profileScreenMenuText
profileScreenMenuArrow
```

### Bad Examples ❌

```typescript
// Too generic - which screen?
container
button
text

// Not specific enough
cart
product
menu

// Missing screen prefix
quantityButton
colorOption
menuItem
```

## 🔧 Adding New Styles

### Step 1: Identify the Screen
```typescript
// For cart screen
cartScreen[...]

// For product detail
productDetail[...]

// For home components
homeScreen[...] or [componentName][...]
```

### Step 2: Name the Element
```typescript
// Container, wrapper, or view
[screenName]Container
[screenName]Wrapper
[screenName]Card

// Buttons
[screenName]Button
[screenName]PrimaryButton
[screenName]AddToCartButton

// Text elements
[screenName]Title
[screenName]Label
[screenName]Description
```

### Step 3: Create the Style
```typescript
const styles = StyleSheet.create({
  cartScreenAddButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    borderRadius: 8,
  },
});
```

## 🎨 Common Style Patterns

### Containers
```typescript
[screenName]Container: {
  flex: 1,
  backgroundColor: '#f8f8f8',
}
```

### Cards
```typescript
[screenName]Card: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
}
```

### Buttons
```typescript
[screenName]Button: {
  backgroundColor: '#FF6347',
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignItems: 'center',
}

[screenName]ButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
}
```

### Headers
```typescript
[screenName]Header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 15,
  backgroundColor: '#fff',
}
```

## 🚀 Benefits Summary

### 1. Zero Conflicts
Each file has unique prefixes, so styles never clash.

### 2. Easy Discovery
Search for `cartScreen` to find all cart-related styles.

### 3. Self-Documenting
Style names tell you which screen they belong to.

### 4. Maintainable
Clear ownership - know exactly where to update styles.

### 5. Scalable
Pattern works for any number of screens and components.

## 📖 Quick Reference

| Screen | Prefix | Example |
|--------|--------|---------|
| Home | `homeScreen` | `homeScreenContainer` |
| Categories | `categoriesScreen` | `categoriesScreenGrid` |
| Cart | `cartScreen` | `cartScreenItem` |
| Profile | `profileScreen` | `profileScreenMenu` |
| Product Detail | `productDetail` | `productDetailPrice` |
| Checkout | `checkoutScreen` | `checkoutScreenSummary` |
| Home Components | `[component]` | `searchBarInput` |

---

**Follow this guide for consistent, conflict-free styling! 🎉**

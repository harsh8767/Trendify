# E-Commerce App Structure

## 📁 Project Overview
This is a complete e-commerce mobile application built with React Native and Expo Router. The app follows a clean, component-based architecture with separate CSS styles for each component.

## 🎨 Design Features
- **Modern UI**: Clean, professional design with consistent styling
- **Tab Navigation**: 4 main tabs (Home, Categories, Cart, Profile)
- **Product Features**: Product listing, detail view, cart, and checkout
- **Responsive Design**: Works across iOS, Android, and Web

## 📂 File Structure

```
src/
├── app/
│   ├── (tabs)/                    # Tab-based navigation
│   │   ├── _layout.tsx           # Tab navigation configuration
│   │   ├── index.tsx             # Home screen (main page)
│   │   ├── categories.tsx        # Categories grid screen
│   │   ├── cart.tsx              # Shopping cart screen
│   │   └── profile.tsx           # User profile screen
│   │
│   ├── _layout.tsx               # Root layout with Stack navigation
│   ├── index.tsx                 # App entry redirect
│   ├── product-detail.tsx        # Product detail screen
│   ├── checkout.tsx              # Checkout screen
│   └── explore.tsx               # Legacy (replaced)
│
├── components/
│   └── home/                     # Home screen components
│       ├── HomeHeader.tsx        # Location & notification header
│       ├── SearchBar.tsx         # Search input component
│       ├── BannerSlider.tsx      # Promotional banner slider
│       ├── CategoryIcons.tsx     # Horizontal category icons
│       └── BestDeals.tsx         # Best deals product cards
│
├── constants/
│   └── theme.ts                  # Theme constants (spacing, colors)
│
├── hooks/
│   ├── use-color-scheme.ts       # Color scheme hook (native)
│   ├── use-color-scheme.web.ts   # Color scheme hook (web)
│   └── use-theme.ts              # Theme hook
│
└── global.css                    # Global CSS variables & utilities

```

## 🎯 Screen Breakdown

### 1. Home Screen (`(tabs)/index.tsx`)
**Components:**
- `HomeHeader` - Delivery location and notifications
- `SearchBar` - Product search input
- `BannerSlider` - Featured product banners
- `CategoryIcons` - Quick category access
- `BestDeals` - Product deals carousel

**Styling:** Each component has its own inline StyleSheet with `homeScreen*` prefixed styles

### 2. Categories Screen (`(tabs)/categories.tsx`)
**Features:**
- Grid layout of 8 categories
- Icons with labels
- Search icon in header

**Styling:** All styles prefixed with `categoriesScreen*`

### 3. Cart Screen (`(tabs)/cart.tsx`)
**Features:**
- List of cart items with images
- Quantity controls (+/−)
- Price summary (subtotal, discount, delivery)
- Proceed to Checkout button

**Styling:** All styles prefixed with `cartScreen*`

### 4. Profile Screen (`(tabs)/profile.tsx`)
**Features:**
- User info card with avatar
- Order status icons (Pending, Shipped, Ordered, Returns)
- Menu items (Addresses, Payment, Help, About, Logout)

**Styling:** All styles prefixed with `profileScreen*`

### 5. Product Detail Screen (`product-detail.tsx`)
**Features:**
- Large product image
- Color selector (3 colors)
- Size selector (6-10)
- Price with discount badge
- Add to Cart & Buy Now buttons

**Styling:** All styles prefixed with `productDetail*`

### 6. Checkout Screen (`checkout.tsx`)
**Features:**
- Delivery address display
- Payment method selection (UPI, Card, COD)
- Coupon code input
- Total amount
- Place Order button

**Styling:** All styles prefixed with `checkoutScreen*`

## 🎨 Styling Convention

### CSS Naming Pattern
All styles follow this pattern: `[screenName][elementName]`

Examples:
- `homeScreenContainer` - Home screen container
- `productDetailPrice` - Product detail price text
- `cartScreenItem` - Cart item card
- `checkoutScreenButton` - Checkout button

### Benefits:
✅ **No Conflicts**: File-specific prefixes prevent style collisions
✅ **Easy to Find**: Style name matches the file it belongs to
✅ **Maintainable**: Clear relationship between components and styles
✅ **Searchable**: Easy to search for styles by screen name

### Global Styles (`global.css`)
```css
:root {
  /* Colors */
  --color-primary: #FF6347;
  --color-background: #f8f8f8;
  --color-text-primary: #333333;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  
  /* Border Radius */
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## 🔧 Technologies Used

- **React Native**: Mobile framework
- **Expo Router**: File-based routing
- **TypeScript**: Type safety
- **React Native Safe Area Context**: Handle safe areas
- **Expo Image**: Optimized image component

## 📱 Navigation Structure

```
Root Stack
├── (tabs) - Tab Navigator
│   ├── Home
│   ├── Categories
│   ├── Cart
│   └── Profile
├── Product Detail (Modal)
├── Checkout
└── Cart (Standalone)
```

## 🎨 Color Scheme

- **Primary**: #FF6347 (Tomato Red)
- **Background**: #f8f8f8 (Light Gray)
- **Text**: #333333 (Dark Gray)
- **Success**: #4CAF50 (Green)
- **White**: #FFFFFF

## 📦 Component Reusability

Components are organized by feature:
- `/components/home/` - All home screen components
- Each component is self-contained with its own styles
- Easy to extract and reuse in other screens

## 🔄 Future Enhancements

- [ ] Add authentication screens
- [ ] Implement wishlist functionality
- [ ] Add product reviews & ratings
- [ ] Order tracking screen
- [ ] Push notifications
- [ ] Product filtering & sorting
- [ ] Payment gateway integration

## 📝 Notes

- All styles use inline StyleSheet.create() for React Native
- Components follow naming convention for easy identification
- Icons use emoji for simplicity (can replace with icon libraries)
- Images use placeholder - replace with actual product images
- Currency is hardcoded to INR (₹)

---

**Created Date**: 2026-10-13
**Framework**: React Native with Expo Router
**Navigation**: File-based routing with tabs

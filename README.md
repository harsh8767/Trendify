<!-- # Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->


# 🛍️ Trendify

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-Mobile-blue?logo=react" />
  <img src="https://img.shields.io/badge/Expo-Framework-black?logo=expo" />
  <img src="https://img.shields.io/badge/TypeScript-Language-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Project-In_Development-orange" />
</p>

A modern shopping application built with **React Native and Expo**, featuring separate customer and seller experiences.

## 📖 About the Project

Trendify is a frontend shopping application designed to provide a smooth and user-friendly online shopping experience. It includes customer shopping features and seller management screens, with a clean interface and a premium visual design.

## ✨ Features

### 🛒 Customer

- 👤 User registration and sign-in screens
- 🔐 OTP verification interface
- 🔄 Password reset flow
- 🏠 Home screen with promotional banners
- 🗂️ Product categories and subcategories
- 🔎 Product search and product details
- 🖼️ Product image gallery
- 🛍️ Shopping cart and checkout
- ❤️ Wishlist management
- 📦 Order history and order details
- 🔔 Notifications and profile screens

### 🏪 Seller

- 👤 Seller registration and sign-in screens
- 📊 Seller dashboard
- 🏷️ Product listing and management
- ➕ Add and update products
- 📦 Order management
- 📈 Sales analytics
- 🔔 Seller notifications
- ⚙️ Seller settings and help screens

## 🛠️ Tech Stack

- ⚛️ **React Native** – Mobile application framework
- 🚀 **Expo** – Development and build platform
- 📘 **TypeScript** – Type-safe development
- 🧭 **Expo Router** – File-based navigation
- 🔄 **React Context API** – Application state management
- 🎨 **CSS / React Native Styling** – User interface styling

## 📂 Project Structure

```text
Trendify/
├── src/
│   ├── app/
│   │   ├── (seller)/       # 🏪 Seller screens
│   │   ├── (tabs)/         # 🛒 Customer tab navigation
│   │   └──               # 🔐 Authentication and other screens
│   ├── components/
│   │   ├── brand/          # 🏷️ Branding components
│   │   ├── home/           # 🏠 Home screen components
│   │   └── ui/             # 🎨 Reusable UI components
│   ├── constants/          # ⚙️ Theme and application data
│   ├── context/            # 🔄 Application contexts
│   ├── services/           # 🔧 Application services
│   └── utils/              # 🧰 Helper functions
├── assets/                 # 🖼️ Images and other assets
├── package.json            # 📦 Project dependencies
└── README.md               # 📖 Project documentation
```

## 🚀 Getting Started

### 📋 Prerequisites

- 🟢 Node.js
- 📦 npm
- 📱 Expo Go (for testing on a physical device)

### ⚙️ Installation

**1. Clone the repository:**

```bash
git clone https://github.com/harsh8767/Trendify.git
```

**2. Navigate to the project directory:**

```bash
cd Trendify
```

**3. Install dependencies:**

```bash
npm install
```

**4. Start the Expo development server:**

```bash
npx expo start
```

**5.** 📱 Scan the QR code using Expo Go or run the application on an available emulator.

## 📌 Project Status

<kbd>🚧 Development in Progress</kbd>

Trendify is currently a frontend-focused project. Some features may use local or demo data and may require backend integration for production use.

## 🔮 Future Improvements

- ☁️ Backend and database integration
- 🔐 Secure user authentication
- 💳 Payment gateway integration
- 🚚 Real-time order tracking
- 🔄 Seller inventory and order synchronization
- 🌐 Production deployment

## 🔗 Repository

**GitHub:** [https://github.com/harsh8767/Trendify](https://github.com/harsh8767/Trendify)



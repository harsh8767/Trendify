import { ShopProvider } from '@/context/shop-context';
import { Palette } from '@/constants/theme';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ShopProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Palette.card },
            animation: 'fade',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="walkthrough" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="sign-up" />
          <Stack.Screen name="forgot-password" />
          <Stack.Screen name="enter-otp" />
          <Stack.Screen name="reset-password" />
          <Stack.Screen name="reset-success" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product-detail" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="checkout-success" />
          <Stack.Screen name="search" />
          <Stack.Screen name="notifications" />
        </Stack>
      </ShopProvider>
    </SafeAreaProvider>
  );
}

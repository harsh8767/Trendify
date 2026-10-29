import Logo from '@/components/brand/Logo';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/walkthrough');
    }, 1600);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.splashScreen}>
      <View style={styles.splashBrand}>
        <Logo size={108} inverted />
        <Text style={styles.splashTitle}>Trendify</Text>
      </View>
      <ActivityIndicator size="large" color="#FFFFFF" style={styles.splashLoader} />
    </View>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashBrand: {
    alignItems: 'center',
    gap: 22,
  },
  splashTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
  },
  splashLoader: {
    position: 'absolute',
    bottom: 92,
  },
});

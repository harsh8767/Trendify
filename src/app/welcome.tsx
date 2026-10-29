import Logo from '@/components/brand/Logo';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SOCIAL = ['Continue with Google', 'Continue with Apple', 'Continue with Facebook', 'Continue with Twitter'];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.welcomeScreen}>
      <View style={styles.welcomeHero}>
        <Logo size={72} />
        <Text style={styles.welcomeTitle}>Let's Get Started!</Text>
        <Text style={styles.welcomeSubtitle}>Let's dive in into your account</Text>
      </View>

      <View style={styles.welcomeSocialList}>
        {SOCIAL.map((label) => (
          <TouchableOpacity key={label} style={styles.welcomeSocialBtn} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.welcomeSocialText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <PrimaryButton label="Sign up" onPress={() => router.push('/sign-up')} />
      <PrimaryButton label="Sign in" variant="soft" style={{ marginTop: 12 }} onPress={() => router.push('/sign-in')} />

      <Text style={styles.welcomeLegal}>Privacy Policy  ·  Terms of Service</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  welcomeHero: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 28,
  },
  welcomeTitle: {
    marginTop: 22,
    fontSize: 30,
    fontWeight: '800',
    color: Palette.text,
  },
  welcomeSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: Palette.muted,
  },
  welcomeSocialList: {
    gap: 12,
    marginBottom: 22,
  },
  welcomeSocialBtn: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeSocialText: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.text,
  },
  welcomeLegal: {
    textAlign: 'center',
    color: Palette.muted,
    marginTop: 'auto',
    marginBottom: 12,
  },
});

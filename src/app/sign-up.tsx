import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.signUpScreen}>
      <TouchableOpacity onPress={() => router.back()} style={styles.signUpBack}>
        <Text style={styles.signUpBackText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.signUpTitle}>Create Your Account</Text>
      <Text style={styles.signUpSubtitle}>Sign up to start shopping the latest fashion trends.</Text>

      {['Email', 'Password'].map((label) => (
        <View key={label}>
          <Text style={styles.signUpLabel}>{label}</Text>
          <View style={styles.signUpField}>
            <TextInput
              placeholder={label}
              placeholderTextColor={Palette.muted}
              style={styles.signUpInput}
              secureTextEntry={label === 'Password'}
              autoCapitalize="none"
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.signUpSubmit} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.signUpSubmitText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/sign-in')}>
        <Text style={styles.signUpSwitch}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  signUpBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  signUpBackText: {
    fontSize: 26,
  },
  signUpTitle: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: '800',
    color: Palette.text,
  },
  signUpSubtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: Palette.textSecondary,
    fontSize: 15,
  },
  signUpLabel: {
    fontWeight: '700',
    marginBottom: 8,
  },
  signUpField: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  signUpInput: {
    fontSize: 15,
  },
  signUpSubmit: {
    marginTop: 12,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpSubmitText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  signUpSwitch: {
    textAlign: 'center',
    marginTop: 18,
    color: Palette.primary,
    fontWeight: '700',
  },
});

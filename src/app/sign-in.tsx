import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const router = useRouter();
  const [remember, setRemember] = useState(true);

  return (
    <SafeAreaView style={styles.signInScreen}>
      <TouchableOpacity onPress={() => router.back()} style={styles.signInBack}>
        <Text style={styles.signInBackText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.signInTitle}>Welcome Back! 👋</Text>
      <Text style={styles.signInSubtitle}>Sign in to access your personalized fashion.</Text>

      <Text style={styles.signInLabel}>Email</Text>
      <View style={styles.signInField}>
        <Text style={styles.signInFieldIcon}>✉</Text>
        <TextInput placeholder="Email" placeholderTextColor={Palette.muted} style={styles.signInInput} autoCapitalize="none" />
      </View>

      <Text style={styles.signInLabel}>Password</Text>
      <View style={styles.signInField}>
        <Text style={styles.signInFieldIcon}>🔒</Text>
        <TextInput placeholder="Password" placeholderTextColor={Palette.muted} style={styles.signInInput} secureTextEntry />
      </View>

      <View style={styles.signInRow}>
        <TouchableOpacity style={styles.signInRemember} onPress={() => setRemember(!remember)}>
          <View style={[styles.signInCheck, remember && styles.signInCheckOn]} />
          <Text style={styles.signInRememberText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.signInForgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInDivider}>
        <View style={styles.signInLine} />
        <Text style={styles.signInOr}>or</Text>
        <View style={styles.signInLine} />
      </View>

      {['Continue with Google', 'Continue with Apple', 'Continue with Facebook'].map((label) => (
        <TouchableOpacity key={label} style={styles.signInSocial} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.signInSocialText}>{label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.signInSubmit} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.signInSubmitText}>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signInScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  signInBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 4,
  },
  signInBackText: {
    fontSize: 26,
    color: Palette.text,
  },
  signInTitle: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: '800',
    color: Palette.text,
  },
  signInSubtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    color: Palette.textSecondary,
  },
  signInLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    color: Palette.text,
  },
  signInField: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  signInFieldIcon: {
    marginRight: 8,
  },
  signInInput: {
    flex: 1,
    fontSize: 15,
    color: Palette.text,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  signInRemember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signInCheck: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Palette.primary,
  },
  signInCheckOn: {
    backgroundColor: Palette.primary,
  },
  signInRememberText: {
    fontWeight: '600',
    color: Palette.text,
  },
  signInForgot: {
    color: Palette.primary,
    fontWeight: '700',
  },
  signInDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  signInLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8E8',
  },
  signInOr: {
    color: Palette.muted,
  },
  signInSocial: {
    height: 54,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signInSocialText: {
    fontWeight: '600',
    fontSize: 15,
  },
  signInSubmit: {
    marginTop: 'auto',
    marginBottom: 16,
    height: 56,
    borderRadius: 28,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

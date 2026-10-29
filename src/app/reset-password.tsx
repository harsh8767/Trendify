import PrimaryButton from '@/components/ui/PrimaryButton';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <SafeAreaView style={styles.resetScreen}>
      <TouchableOpacity onPress={() => router.back()} style={styles.resetBack}>
        <Text style={styles.resetBackText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.resetTitle}>Create New Password</Text>
      <Text style={styles.resetSubtitle}>Create your new password. If you forget it, then you have to do forgot password.</Text>

      <Text style={styles.resetLabel}>Password</Text>
      <View style={styles.resetField}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={Palette.muted}
          secureTextEntry
          style={styles.resetInput}
        />
      </View>
      <Text style={styles.resetLabel}>Confirm Password</Text>
      <View style={styles.resetField}>
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder="Confirm Password"
          placeholderTextColor={Palette.muted}
          secureTextEntry
          style={styles.resetInput}
        />
      </View>

      <PrimaryButton label="Continue" style={{ marginTop: 'auto', marginBottom: 16 }} onPress={() => router.replace('/reset-success')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resetScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  resetBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  resetBackText: {
    fontSize: 26,
  },
  resetTitle: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: '800',
  },
  resetSubtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: Palette.textSecondary,
    lineHeight: 22,
  },
  resetLabel: {
    fontWeight: '700',
    marginBottom: 8,
  },
  resetField: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  resetInput: {
    fontSize: 15,
  },
});

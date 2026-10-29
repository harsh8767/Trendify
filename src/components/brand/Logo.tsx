import { Palette } from '@/constants/theme';
import { StyleSheet, View } from 'react-native';

type LogoProps = {
  size?: number;
  inverted?: boolean;
};

export default function Logo({ size = 36, inverted = false }: LogoProps) {
  const outer = inverted ? '#FFFFFF' : Palette.primary;
  const inner = inverted ? Palette.primary : '#FFFFFF';
  const radius = Math.max(8, size * 0.28);
  const bar = Math.max(3, size * 0.14);
  const stem = size * 0.46;
  const top = size * 0.42;

  return (
    <View style={[styles.logoWrap, { width: size, height: size, borderRadius: radius, backgroundColor: outer }]}>
      <View style={{ width: top, height: bar, backgroundColor: inner, borderRadius: bar }} />
      <View
        style={{
          width: bar,
          height: stem,
          backgroundColor: inner,
          borderRadius: bar,
          marginTop: -bar * 0.2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import Logo from '@/components/brand/Logo';
import { Palette } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ScreenHeaderProps = {
  title: string;
  showLogo?: boolean;
  onSearch?: () => void;
  onMore?: () => void;
  rightLabel?: string;
};

export default function ScreenHeader({ title, showLogo = true, onSearch, onMore, rightLabel }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.screenHeaderRow}>
      {showLogo ? (
        <Logo size={34} />
      ) : (
        <TouchableOpacity onPress={() => router.back()} style={styles.screenHeaderIconBtn}>
          <Text style={styles.screenHeaderIcon}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.screenHeaderTitle}>{title}</Text>
      <View style={styles.screenHeaderActions}>
        {onSearch ? (
          <TouchableOpacity onPress={onSearch} style={styles.screenHeaderIconBtn}>
            <Text style={styles.screenHeaderIcon}>⌕</Text>
          </TouchableOpacity>
        ) : null}
        {onMore ? (
          <TouchableOpacity onPress={onMore} style={styles.screenHeaderIconBtn}>
            <Text style={styles.screenHeaderIcon}>{rightLabel ?? '⋮'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 12,
  },
  screenHeaderTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: Palette.text,
  },
  screenHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  screenHeaderIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenHeaderIcon: {
    fontSize: 22,
    color: Palette.text,
  },
});

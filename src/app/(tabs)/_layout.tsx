import { Palette } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

function TabGlyph({ label, focused }: { label: string; focused: boolean }) {
  const glyphs: Record<string, string> = {
    Home: '⌂',
    Wishlist: '♡',
    Cart: '👜',
    'My Order': '☰',
    Account: '☺',
  };
  return (
    <View style={styles.tabGlyphWrap}>
      <Text style={[styles.tabGlyph, focused && styles.tabGlyphActive]}>{glyphs[label]}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.primary,
        tabBarInactiveTintColor: '#B8B8B8',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabGlyph label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused }) => <TabGlyph label="Wishlist" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => <TabGlyph label="Cart" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'My Order',
          tabBarIcon: ({ focused }) => <TabGlyph label="My Order" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabGlyph label="Account" focused={focused} />,
        }}
      />
      <Tabs.Screen name="categories" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 78,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  tabGlyphWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabGlyph: {
    fontSize: 20,
    color: '#B8B8B8',
  },
  tabGlyphActive: {
    color: Palette.primary,
  },
});

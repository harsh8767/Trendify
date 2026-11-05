import { useTheme } from '@/context/theme-context';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

function TabGlyph({
  label,
  focused,
  activeColor,
  inactiveColor,
}: {
  label: string;
  focused: boolean;
  activeColor: string;
  inactiveColor: string;
}) {
  const glyphs: Record<string, string> = {
    Home: '⌂',
    Wishlist: '♡',
    Cart: '👜',
    'My Order': '☰',
    Account: '☺',
  };

  return (
    <View style={styles.tabGlyphWrap}>
      <Text
        style={[
          styles.tabGlyph,
          { color: focused ? activeColor : inactiveColor },
        ]}
      >
        {glyphs[label]}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          ...styles.tabBar,
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabGlyph
              label="Home"
              focused={focused}
              activeColor={colors.accent}
              inactiveColor={colors.muted}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused }) => (
            <TabGlyph
              label="Wishlist"
              focused={focused}
              activeColor={colors.accent}
              inactiveColor={colors.muted}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabGlyph
              label="Cart"
              focused={focused}
              activeColor={colors.accent}
              inactiveColor={colors.muted}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'My Order',
          tabBarIcon: ({ focused }) => (
            <TabGlyph
              label="My Order"
              focused={focused}
              activeColor={colors.accent}
              inactiveColor={colors.muted}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <TabGlyph
              label="Account"
              focused={focused}
              activeColor={colors.accent}
              inactiveColor={colors.muted}
            />
          ),
        }}
      />

      {/* Hidden screens - accessible through navigation, not bottom tabs */}
      <Tabs.Screen name="categories" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
      <Tabs.Screen name="order-details" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 78,
    paddingTop: 8,
    paddingBottom: 12,
    borderTopWidth: 1,
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
  },
});
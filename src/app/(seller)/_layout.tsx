
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/context/theme-context';

export default function SellerTabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 62,
          paddingTop: 7,
          paddingBottom: 7,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="seller-dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="seller-products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="seller-orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="seller-profile"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

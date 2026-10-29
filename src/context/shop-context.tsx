import { PRODUCTS, type Product } from '@/constants/data';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type CartItem = Product & { quantity: number; selected: boolean };

type ShopContextValue = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleCartItem: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  selectedCart: CartItem[];
  cartTotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const seedCart: CartItem[] = [
  { ...PRODUCTS[0], quantity: 1, selected: true },
  { ...PRODUCTS[7], quantity: 1, selected: true },
  { ...PRODUCTS[9], quantity: 1, selected: true },
  { ...PRODUCTS[1], quantity: 1, selected: true },
];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(seedCart);
  const [wishlist, setWishlist] = useState<string[]>(PRODUCTS.slice(0, 4).map((item) => item.id));

  const value = useMemo<ShopContextValue>(() => {
    const selectedCart = cart.filter((item) => item.selected);
    const cartTotal = selectedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      cart,
      wishlist,
      selectedCart,
      cartTotal,
      addToCart: (product) => {
        setCart((current) => {
          const existing = current.find((item) => item.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1, selected: true } : item
            );
          }
          return [...current, { ...product, quantity: 1, selected: true }];
        });
      },
      toggleWishlist: (id) => {
        setWishlist((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
      },
      isWishlisted: (id) => wishlist.includes(id),
      toggleCartItem: (id) => {
        setCart((current) =>
          current.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
        );
      },
      changeQuantity: (id, delta) => {
        setCart((current) =>
          current.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
          )
        );
      },
      removeFromCart: (id) => {
        setCart((current) => current.filter((item) => item.id !== id));
      },
    };
  }, [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
}

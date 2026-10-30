import { type Product } from "@/constants/data";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = Product & { quantity: number; selected: boolean };

// A cart line is one product in one colour and one size, so each combination gets its own key.
export function getCartLineKey(
  item: Pick<Product, "id" | "color" | "size">,
): string {
  return `${item.id}::${item.color}::${item.size}`;
}

type ShopContextValue = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleCartItem: (lineKey: string) => void;
  changeQuantity: (lineKey: string, delta: number) => void;
  removeFromCart: (lineKey: string) => void;
  selectedCart: CartItem[];
  cartTotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

type ShopProviderProps = {
  children: ReactNode;
  initialCart?: CartItem[];
  initialWishlist?: string[];
};

export function ShopProvider({
  children,
  initialCart = [],
  initialWishlist = [],
}: ShopProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [wishlist, setWishlist] = useState<string[]>(initialWishlist);

  const value = useMemo<ShopContextValue>(() => {
    const selectedCart = cart.filter((item) => item.selected);
    const cartTotal = selectedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      cart,
      wishlist,
      selectedCart,
      cartTotal,
      addToCart: (product) => {
        setCart((current) => {
          const newLineKey = getCartLineKey(product);
          const existingLine = current.find(
            (line) => getCartLineKey(line) === newLineKey,
          );
          if (existingLine) {
            return current.map((line) =>
              getCartLineKey(line) === newLineKey
                ? { ...line, quantity: line.quantity + 1, selected: true }
                : line,
            );
          }
          return [...current, { ...product, quantity: 1, selected: true }];
        });
      },
      toggleWishlist: (id) => {
        setWishlist((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        );
      },
      isWishlisted: (id) => wishlist.includes(id),
      toggleCartItem: (lineKey) => {
        setCart((current) =>
          current.map((line) =>
            getCartLineKey(line) === lineKey
              ? { ...line, selected: !line.selected }
              : line,
          ),
        );
      },
      changeQuantity: (lineKey, delta) => {
        setCart((current) =>
          current.map((line) =>
            getCartLineKey(line) === lineKey
              ? { ...line, quantity: Math.max(1, line.quantity + delta) }
              : line,
          ),
        );
      },
      removeFromCart: (lineKey) => {
        setCart((current) =>
          current.filter((line) => getCartLineKey(line) !== lineKey),
        );
      },
    };
  }, [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return context;
}

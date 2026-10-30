import { renderHook } from "@testing-library/react-native";
import type { ReactNode } from "react";

import { PRODUCTS } from "@/constants/data";
import { ShopProvider, useShop, type CartItem } from "@/context/shop-context";

type StartingState = {
  initialCart?: CartItem[];
  initialWishlist?: string[];
};

async function renderShopHook(startingState: StartingState = {}) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ShopProvider {...startingState}>{children}</ShopProvider>
  );
  const { result } = await renderHook(() => useShop(), { wrapper });
  return result;
}

describe("ShopProvider starting state", () => {
  it("starts with an empty cart and an empty wishlist by default", async () => {
    const shop = await renderShopHook();

    expect(shop.current.cart).toEqual([]);
    expect(shop.current.wishlist).toEqual([]);
    expect(shop.current.cartTotal).toBe(0);
  });

  it("starts with the cart and wishlist it is given", async () => {
    const savedCartItem: CartItem = {
      ...PRODUCTS[0],
      quantity: 2,
      selected: true,
    };
    const savedWishlistId = PRODUCTS[3].id;

    const shop = await renderShopHook({
      initialCart: [savedCartItem],
      initialWishlist: [savedWishlistId],
    });

    expect(shop.current.cart).toEqual([savedCartItem]);
    expect(shop.current.wishlist).toEqual([savedWishlistId]);
    expect(shop.current.cartTotal).toBe(PRODUCTS[0].price * 2);
  });
});
import { act, renderHook } from "@testing-library/react-native";
import type { ReactNode } from "react";

import { PRODUCTS, type Product } from "@/constants/data";
import {
  ShopProvider,
  getCartLineKey,
  useShop,
  type CartItem,
} from "@/context/shop-context";

const urbanShirt = PRODUCTS[0];

function withVariant(product: Product, color: string, size: string): Product {
  return { ...product, color, size };
}

function findLineBySize(cart: CartItem[], size: string): CartItem {
  const line = cart.find((item) => item.size === size);
  if (!line) {
    throw new Error(`No cart line with size ${size}`);
  }
  return line;
}

async function renderShopHook() {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ShopProvider>{children}</ShopProvider>
  );
  const { result } = await renderHook(() => useShop(), { wrapper });
  return result;
}

describe("adding products to the cart", () => {
  it("increases the quantity when the same product, colour and size is added again", async () => {
    const shop = await renderShopHook();
    const blackMedium = withVariant(urbanShirt, "#111111", "M");

    await act(async () => {
      shop.current.addToCart(blackMedium);
      shop.current.addToCart(blackMedium);
    });

    expect(shop.current.cart).toHaveLength(1);
    expect(shop.current.cart[0].quantity).toBe(2);
  });

  it("keeps different sizes of the same product as separate lines", async () => {
    const shop = await renderShopHook();

    await act(async () => {
      shop.current.addToCart(withVariant(urbanShirt, "#111111", "M"));
      shop.current.addToCart(withVariant(urbanShirt, "#111111", "L"));
    });

    expect(shop.current.cart.map((line) => line.size)).toEqual(["M", "L"]);
  });

  it("keeps different colours of the same product as separate lines", async () => {
    const shop = await renderShopHook();

    await act(async () => {
      shop.current.addToCart(withVariant(urbanShirt, "#111111", "M"));
      shop.current.addToCart(withVariant(urbanShirt, "#C4A484", "M"));
    });

    expect(shop.current.cart.map((line) => line.color)).toEqual([
      "#111111",
      "#C4A484",
    ]);
  });
});

describe("changing one cart line", () => {
  async function renderShopWithMediumAndLarge() {
    const shop = await renderShopHook();
    await act(async () => {
      shop.current.addToCart(withVariant(urbanShirt, "#111111", "M"));
      shop.current.addToCart(withVariant(urbanShirt, "#111111", "L"));
    });
    return shop;
  }

  it("changes the quantity of only the chosen line", async () => {
    const shop = await renderShopWithMediumAndLarge();
    const mediumKey = getCartLineKey(findLineBySize(shop.current.cart, "M"));

    await act(async () => {
      shop.current.changeQuantity(mediumKey, 2);
    });

    expect(findLineBySize(shop.current.cart, "M").quantity).toBe(3);
    expect(findLineBySize(shop.current.cart, "L").quantity).toBe(1);
  });

  it("never lets a quantity drop below one", async () => {
    const shop = await renderShopWithMediumAndLarge();
    const mediumKey = getCartLineKey(findLineBySize(shop.current.cart, "M"));

    await act(async () => {
      shop.current.changeQuantity(mediumKey, -5);
    });

    expect(findLineBySize(shop.current.cart, "M").quantity).toBe(1);
  });

  it("removes only the chosen line", async () => {
    const shop = await renderShopWithMediumAndLarge();
    const mediumKey = getCartLineKey(findLineBySize(shop.current.cart, "M"));

    await act(async () => {
      shop.current.removeFromCart(mediumKey);
    });

    expect(shop.current.cart.map((line) => line.size)).toEqual(["L"]);
  });

  it("deselects only the chosen line and leaves it out of the total", async () => {
    const shop = await renderShopWithMediumAndLarge();
    const mediumKey = getCartLineKey(findLineBySize(shop.current.cart, "M"));

    await act(async () => {
      shop.current.toggleCartItem(mediumKey);
    });

    expect(findLineBySize(shop.current.cart, "M").selected).toBe(false);
    expect(findLineBySize(shop.current.cart, "L").selected).toBe(true);
    expect(shop.current.cartTotal).toBe(urbanShirt.price);
  });
});
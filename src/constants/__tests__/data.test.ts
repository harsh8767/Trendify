import { PRODUCTS } from '@/constants/data';

describe('product catalogue data', () => {
  it('gives every product a unique id so cart and wishlist never mix products up', () => {
    const allProductIds = PRODUCTS.map((product) => product.id);
    const uniqueProductIds = new Set(allProductIds);

    expect(uniqueProductIds.size).toBe(allProductIds.length);
  });

  it('uses a price above zero for every product', () => {
    PRODUCTS.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('only shows an original price when it is higher than the selling price', () => {
    PRODUCTS.filter((product) => product.originalPrice !== undefined).forEach((product) => {
      expect(product.originalPrice).toBeGreaterThan(product.price);
    });
  });

  it('keeps every rating between 0 and 5', () => {
    PRODUCTS.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    });
  });
});
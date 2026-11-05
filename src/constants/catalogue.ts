import { CATEGORIES, PRODUCTS, SUBCATEGORIES, type Product, type Subcategory } from '@/constants/data';

// Every screen reads categories, subcategories and products through these functions.
// When a backend exists, this is the only file that needs to change to fetch from the server.

export function findCategory(categoryId: string) {
  return CATEGORIES.find((category) => category.id === categoryId);
}

export function findSubcategory(subcategoryId: string): Subcategory | undefined {
  return SUBCATEGORIES.find((subcategory) => subcategory.id === subcategoryId);
}

export function getSubcategoriesForCategory(categoryId: string): Subcategory[] {
  return SUBCATEGORIES.filter((subcategory) => subcategory.categoryId === categoryId);
}

export function getProductsForSubcategory(subcategoryId: string): Product[] {
  return PRODUCTS.filter((product) => product.subcategoryId === subcategoryId);
}

// Categories with no products are left out so the home screen never shows an empty tile.
export function getCategoriesWithProducts() {
  return CATEGORIES.filter((category) =>
    getSubcategoriesForCategory(category.id).some(
      (subcategory) => getProductsForSubcategory(subcategory.id).length > 0
    )
  );
}
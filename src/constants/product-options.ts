import { type Product } from '@/constants/data';

// Display colours for the colour names used by products. Unknown names fall back to grey.
const COLOR_HEX: Record<string, string> = {
  Black: '#111111',
  White: '#FFFFFF',
  Grey: '#7A7A7A',
  Beige: '#E7D7C6',
  Tan: '#C4A484',
  Brown: '#6B4423',
  Navy: '#1F2A44',
  Olive: '#6B7B3A',
  Gold: '#C9A227',
  Burgundy: '#6D1F2F',
  Blue: '#3B6FD4',
  Yellow: '#F2C94C',
  Purple: '#7B4FA3',
  Red: '#D64045',
  Green: '#4F8C5B',
  Clear: '#DDE6EA',
  Multicolor: '#C9A0DC',
};

const FALLBACK_COLOR_HEX = '#BDBDBD';

export function getColorHex(colorName: string): string {
  return COLOR_HEX[colorName] ?? FALLBACK_COLOR_HEX;
}

// Sample data has one colour per product, so we offer that colour first plus a few common ones.
// When a backend exists, each product will bring its own list of colours.
const COMMON_COLOR_NAMES = ['Black', 'White', 'Grey', 'Beige'];

export function getColorOptions(product: Product): string[] {
  const otherColors = COMMON_COLOR_NAMES.filter((colorName) => colorName !== product.color);
  return [product.color, ...otherColors].slice(0, 4);
}

const SHOE_SIZES = ['39', '40', '41', '42', '43', '44'];
const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];

export function getSizeOptions(product: Product): string[] {
  if (product.category === 'Shoe') return SHOE_SIZES;
  if (product.size === 'One Size') return ['One Size'];
  return CLOTHING_SIZES;
}

// Photos for the product gallery. A backend can send an ordered list in `images`; the first is the main photo.
// Products without a list fall back to their single `image`.
export function getProductImages(product: Product): string[] {
  const galleryImages = (product.images ?? []).filter((imageUrl) => imageUrl.length > 0);
  if (galleryImages.length > 0) return galleryImages;
  return product.image ? [product.image] : [];
}
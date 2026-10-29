export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  color: string;
  size: string;
  image: string;
  sold?: number;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'urban-blend',
    name: 'Urban Blend Long Sleeve Shirt',
    price: 185,
    originalPrice: 210,
    rating: 4.8,
    reviews: 8374,
    category: 'Women',
    color: 'Black',
    size: 'M',
    sold: 3204,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description:
      'Elevate your style with the Urban Blend Long Sleeve Shirt, a perfect blend of urban sophistication and contemporary comfort. Crafted with meticulous attention to detail, this shirt is designed to make a statement in any setting, read more...',
  },
  {
    id: 'luxe-formal',
    name: 'Luxe Blend Formal Wear',
    price: 160,
    rating: 4.6,
    reviews: 2140,
    category: 'Men',
    color: 'Black',
    size: 'L',
    sold: 2140,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80',
    description: 'A refined black formal shirt for sharp everyday dressing.',
  },
  {
    id: 'urban-flex',
    name: 'Urban Flex Crop Top',
    price: 175,
    rating: 4.7,
    reviews: 980,
    category: 'Women',
    color: 'Black',
    size: 'S',
    sold: 980,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    description: 'Soft stretch crop top with a clean urban silhouette.',
  },
  {
    id: 'trend-fleece',
    name: 'Trend Craft Fleece Hoodie',
    price: 210,
    rating: 4.9,
    reviews: 1560,
    category: 'Men',
    color: 'Navy',
    size: 'L',
    sold: 1560,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight fleece hoodie for weekend comfort.',
  },
  {
    id: 'moda-chic',
    name: 'Moda Chic Luxury Tee',
    price: 200,
    rating: 4.8,
    reviews: 640,
    category: 'Women',
    color: 'Black',
    size: 'M',
    sold: 640,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Minimal black tee with a luxury drape.',
  },
  {
    id: 'urban-elegance',
    name: 'Urban Elegance Business Jacket',
    price: 215,
    rating: 4.5,
    reviews: 410,
    category: 'Men',
    color: 'Charcoal',
    size: 'L',
    sold: 410,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    description: 'Tailored jacket for work-to-evening looks.',
  },
  {
    id: 'street-cozy',
    name: 'Street Style Cozy Hoodie',
    price: 155,
    rating: 4.5,
    reviews: 720,
    category: 'Men',
    color: 'Black',
    size: 'L',
    sold: 720,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    description: 'Everyday black hoodie with a relaxed street fit.',
  },
  {
    id: 'street-comfort',
    name: 'Street Style Comfort Tee',
    price: 155,
    rating: 4.4,
    reviews: 390,
    category: 'Men',
    color: 'Black',
    size: 'L',
    sold: 390,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Soft cotton tee for all-day comfort.',
  },
  {
    id: 'vogue-fit',
    name: 'Vogue Fit Cotton Tee',
    price: 145,
    rating: 4.3,
    reviews: 280,
    category: 'Women',
    color: 'Black',
    size: 'S',
    sold: 280,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    description: 'Fitted cotton tee with a clean neckline.',
  },
  {
    id: 'elite-modal',
    name: 'Elite Style Modal Elegance',
    price: 190,
    rating: 4.7,
    reviews: 510,
    category: 'Women',
    color: 'Black',
    size: 'L',
    sold: 510,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80',
    description: 'Modal knit top with a polished drape.',
  },
];

export const CATEGORIES = [
  { id: 'women', name: 'Women', image: PRODUCTS[0].image },
  { id: 'men', name: 'Men', image: PRODUCTS[1].image },
  { id: 'shoe', name: 'Shoe', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { id: 'bag', name: 'Bag', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d12891?auto=format&fit=crop&w=600&q=80' },
  { id: 'luxury', name: 'Luxury', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80' },
  { id: 'kids', name: 'Kids', image: 'https://images.unsplash.com/photo-1515488044360-fb6302c22dce?auto=format&fit=crop&w=600&q=80' },
  { id: 'sports', name: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { id: 'beauty', name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80' },
  { id: 'lifestyle', name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80' },
  { id: 'other', name: 'Other', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80' },
];

export const PROMO = {
  title: '30% OFF',
  subtitle: "Today's Special!",
  caption: 'Get discount for every order, only valid for today',
  image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
};

export const PROFILE = {
  name: 'Andrew Ainsley',
  email: 'andrew.ainsley@yourdomain.com',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  address: '701 7th Ave, New York, NY 10036, USA',
};

export const WALKTHROUGH = [
  {
    title: 'Explore Fashion Trends with Trendify',
    body: 'Dive into the world of fashion with Trendify, where you can discover the latest and hottest styles curated just for you.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Match Your Style in One Place',
    body: 'Find outfits, accessories, and daily looks that fit your vibe, then save the pieces you love to your wishlist.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Easy Checkout, Fast Delivery',
    body: 'Add to cart, apply promos, and track every order from active to completed without leaving Trendify.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  },
];

export type OrderStatus = 'In Delivery' | 'Completed' | 'Canceled';

export const ORDERS: { id: string; product: Product; status: OrderStatus; date: string }[] = [
  { id: 'ord-1', product: PRODUCTS[0], status: 'In Delivery', date: 'Dec 15, 2024' },
  { id: 'ord-2', product: PRODUCTS[1], status: 'In Delivery', date: 'Dec 14, 2024' },
  { id: 'ord-3', product: PRODUCTS[2], status: 'Completed', date: 'Dec 02, 2024' },
  { id: 'ord-4', product: PRODUCTS[6], status: 'Completed', date: 'Nov 28, 2024' },
  { id: 'ord-5', product: PRODUCTS[4], status: 'Canceled', date: 'Nov 20, 2024' },
];

export const NOTIFICATIONS = [
  { id: 'n1', title: 'Order Shipped', body: 'Your Urban Blend Long Sleeve Shirt is on the way.', time: '2 min ago' },
  { id: 'n2', title: '30% OFF Special', body: 'Today’s Special is live. Get discount for every order.', time: '1 hour ago' },
  { id: 'n3', title: 'Payment Successful', body: 'Your payment of $185.00 has been confirmed.', time: 'Yesterday' },
];

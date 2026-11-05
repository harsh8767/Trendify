
import { PRODUCTS, PROFILE, type OrderStatus, type Product } from '@/constants/data';
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type PaymentMethod = 'UPI' | 'Cash on Delivery';

export type SellerOrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type CartItem = Product & {
  quantity: number;
  selected: boolean;
  sellerId?: string;
};

export type SellerProduct = Product & {
  stock: number;
  sellerId: string;
};

export type NewSellerProduct = Omit<SellerProduct, 'id' | 'sellerId'>;

export type PlacedOrder = {
  id: string;
  placedOn: string;
  status: OrderStatus;
  shippingMethod: string;
  shippingAddress: string;
  addressLabel: string;
  paymentMethod: PaymentMethod;
  paymentApp?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  sellerStatuses?: Record<string, SellerOrderStatus>;
};

export type SellerOrder = {
  id: string;
  placedOn: string;
  customer: string;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
  paymentApp?: string;
  items: CartItem[];
  amount: number;
  status: SellerOrderStatus;
};

export type ProductReview = {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  isDemo?: boolean;
};

export type AccountProfile = {
  name: string;
  email: string;
  phone: string;
};

export function getCartLineKey(
  item: Pick<Product, 'id' | 'color' | 'size'>
): string {
  return `${item.id}::${item.color}::${item.size}`;
}

function formatOrderDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function createDemoReviews(): Record<string, ProductReview[]> {
  const reviews: Record<string, ProductReview[]> = {};

  PRODUCTS.forEach((product) => {
    reviews[product.id] = [
      {
        id: `demo-${product.id}-1`,
        productId: product.id,
        customerName: 'Aarav',
        rating: Math.max(1, Math.min(5, Math.round(product.rating))),
        comment:
          'Good quality and comfortable. The product looks just like the pictures.',
        date: 'Sample review',
        isDemo: true,
      },
      {
        id: `demo-${product.id}-2`,
        productId: product.id,
        customerName: 'Priya',
        rating: 5,
        comment: 'Really happy with this purchase. Great value for the price!',
        date: 'Sample review',
        isDemo: true,
      },
    ];
  });

  return reviews;
}

function getCustomerOrderStatus(
  statuses: SellerOrderStatus[]
): OrderStatus {
  if (
    statuses.length > 0 &&
    statuses.every((status) => status === 'Delivered')
  ) {
    return 'Completed';
  }

  if (
    statuses.length > 0 &&
    statuses.every((status) => status === 'Cancelled')
  ) {
    return 'Canceled';
  }

  // A mixed delivered/cancelled order is considered completed
  // once every seller has reached a terminal status.
  const allFinished = statuses.length > 0 &&
    statuses.every(
      (status) => status === 'Delivered' || status === 'Cancelled'
    );

  if (allFinished) {
    return 'Completed';
  }

  return 'In Delivery';
}

type ShopContextValue = {
  cart: CartItem[];
  wishlist: string[];
  orders: PlacedOrder[];

  products: Product[];
  sellerProducts: SellerProduct[];

  activeSellerId: string;
  setActiveSellerId: (sellerId: string) => void;

  addSellerProduct: (product: NewSellerProduct) => string;
  updateSellerProduct: (
    productId: string,
    changes: Partial<NewSellerProduct>
  ) => void;
  deleteSellerProduct: (productId: string) => void;

  sellerOrders: (sellerId?: string) => SellerOrder[];
  updateSellerOrderStatus: (
    orderId: string,
    sellerId: string,
    status: SellerOrderStatus
  ) => void;

  profile: AccountProfile;
  deliveryAddress: string;
  updateProfile: (changes: Partial<AccountProfile>) => void;
  updateDeliveryAddress: (address: string) => void;

  addToCart: (product: Product) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleCartItem: (lineKey: string) => void;
  changeQuantity: (lineKey: string, delta: number) => void;
  removeFromCart: (lineKey: string) => void;

  placeOrder: (
    shippingMethod: string,
    shippingFee: number,
    shippingAddress: string,
    addressLabel: string,
    paymentMethod: PaymentMethod,
    paymentApp?: string
  ) => void;

  cancelOrder: (orderId: string) => void;
  completeOrder: (orderId: string) => void;

  getProductReviews: (productId: string) => ProductReview[];
  addProductReview: (
    productId: string,
    customerName: string,
    rating: number,
    comment: string
  ) => void;

  selectedCart: CartItem[];
  cartTotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

type ShopProviderProps = {
  children: ReactNode;
  initialCart?: CartItem[];
  initialWishlist?: string[];
  initialOrders?: PlacedOrder[];
};

export function ShopProvider({
  children,
  initialCart = [],
  initialWishlist = [],
  initialOrders = [],
}: ShopProviderProps) {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [wishlist, setWishlist] = useState<string[]>(initialWishlist);
  const [orders, setOrders] = useState<PlacedOrder[]>(initialOrders);
  const [sellerProducts, setSellerProducts] = useState<SellerProduct[]>([]);

  // Temporary frontend demo identity.
  // Seller login must set this to the logged-in seller's unique ID.
  const [activeSellerId, setActiveSellerId] = useState('demo-seller');

  const [profile, setProfile] = useState<AccountProfile>({
    name: PROFILE.name ?? '',
    email: (PROFILE as any).email ?? '',
    phone: (PROFILE as any).phone ?? '',
  });

  const [deliveryAddress, setDeliveryAddress] = useState(
    PROFILE.address ?? ''
  );

  const [productReviews, setProductReviews] =
    useState<Record<string, ProductReview[]>>(createDemoReviews);

  const value = useMemo<ShopContextValue>(() => {
    const selectedCart = cart.filter((item) => item.selected);

    const cartTotal = selectedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const products: Product[] = [...PRODUCTS, ...sellerProducts];

    const getSellerOrders = (sellerId = activeSellerId): SellerOrder[] => {
      return orders.flatMap((order) => {
        const sellerItems = order.items.filter(
          (item) => item.sellerId === sellerId
        );

        if (sellerItems.length === 0) return [];

        const amount = sellerItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return [
          {
            id: order.id,
            placedOn: order.placedOn,
            customer: profile.name || 'Customer',
            shippingAddress: order.shippingAddress,
            paymentMethod: order.paymentMethod,
            paymentApp: order.paymentApp,
            items: sellerItems,
            amount,
            status: order.sellerStatuses?.[sellerId] ?? 'Pending',
          },
        ];
      });
    };

    return {
      cart,
      wishlist,
      orders,
      products,
      sellerProducts,
      activeSellerId,
      setActiveSellerId,

      profile,
      deliveryAddress,
      selectedCart,
      cartTotal,

      addSellerProduct: (product) => {
        const id = `seller-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 7)}`;

        const newProduct: SellerProduct = {
          ...product,
          id,
          sellerId: activeSellerId,
        };

        setSellerProducts((current) => [newProduct, ...current]);

        return id;
      },

      updateSellerProduct: (productId, changes) => {
        setSellerProducts((current) =>
          current.map((product) => {
            if (
              product.id !== productId ||
              product.sellerId !== activeSellerId
            ) {
              return product;
            }

            return {
              ...product,
              ...changes,
              id: product.id,
              sellerId: product.sellerId,
            };
          })
        );
      },

      deleteSellerProduct: (productId) => {
        setSellerProducts((current) =>
          current.filter(
            (product) =>
              !(
                product.id === productId &&
                product.sellerId === activeSellerId
              )
          )
        );
      },

      sellerOrders: getSellerOrders,

      updateSellerOrderStatus: (orderId, sellerId, nextStatus) => {
        // A seller can only update their own orders.
        if (sellerId !== activeSellerId) return;

        setOrders((current) =>
          current.map((order) => {
            if (order.id !== orderId) return order;

            const belongsToSeller = order.items.some(
              (item) => item.sellerId === activeSellerId
            );

            if (!belongsToSeller) return order;

            const nextSellerStatuses = {
              ...(order.sellerStatuses ?? {}),
              [activeSellerId]: nextStatus,
            };

            const sellerIds = [
              ...new Set(
                order.items
                  .map((item) => item.sellerId)
                  .filter((id): id is string => Boolean(id))
              ),
            ];

            const allStatuses = sellerIds.map(
              (id) => nextSellerStatuses[id] ?? 'Pending'
            );

            return {
              ...order,
              sellerStatuses: nextSellerStatuses,
              status: getCustomerOrderStatus(allStatuses),
            };
          })
        );
      },

      updateProfile: (changes) => {
        setProfile((current) => ({
          ...current,
          ...changes,
        }));
      },

      updateDeliveryAddress: (address) => {
        setDeliveryAddress(address);
      },

      addToCart: (product) => {
        const productSellerId =
          (product as Product & { sellerId?: string }).sellerId;

        setCart((current) => {
          const newLineKey = getCartLineKey(product);

          const existingLine = current.find(
            (line) => getCartLineKey(line) === newLineKey
          );

          if (existingLine) {
            return current.map((line) =>
              getCartLineKey(line) === newLineKey
                ? {
                    ...line,
                    quantity: line.quantity + 1,
                    selected: true,
                  }
                : line
            );
          }

          return [
            ...current,
            {
              ...product,
              sellerId: productSellerId,
              quantity: 1,
              selected: true,
            },
          ];
        });
      },

      toggleWishlist: (id) => {
        setWishlist((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id]
        );
      },

      isWishlisted: (id) => wishlist.includes(id),

      toggleCartItem: (lineKey) => {
        setCart((current) =>
          current.map((line) =>
            getCartLineKey(line) === lineKey
              ? { ...line, selected: !line.selected }
              : line
          )
        );
      },

      changeQuantity: (lineKey, delta) => {
        setCart((current) =>
          current.map((line) =>
            getCartLineKey(line) === lineKey
              ? {
                  ...line,
                  quantity: Math.max(1, line.quantity + delta),
                }
              : line
          )
        );
      },

      removeFromCart: (lineKey) => {
        setCart((current) =>
          current.filter((line) => getCartLineKey(line) !== lineKey)
        );
      },

      placeOrder: (
        shippingMethod,
        shippingFee,
        shippingAddress,
        addressLabel,
        paymentMethod,
        paymentApp
      ) => {
        if (selectedCart.length === 0) return;

        const sellerIds = [
          ...new Set(
            selectedCart
              .map((item) => item.sellerId)
              .filter((id): id is string => Boolean(id))
          ),
        ];

        const sellerStatuses: Record<string, SellerOrderStatus> = {};

        sellerIds.forEach((sellerId) => {
          sellerStatuses[sellerId] = 'Pending';
        });

        const newOrder: PlacedOrder = {
          id: `ORD-${Date.now()}`,
          placedOn: formatOrderDate(new Date()),
          status: 'In Delivery',
          shippingMethod,
          shippingAddress,
          addressLabel: addressLabel || 'Delivery Address',
          paymentMethod,
          paymentApp,
          items: [...selectedCart],
          subtotal: cartTotal,
          shippingFee,
          total: cartTotal + shippingFee,
          sellerStatuses,
        };

        setOrders((current) => [newOrder, ...current]);
        setCart((current) => current.filter((line) => !line.selected));
      },

      cancelOrder: (orderId) => {
        setOrders((current) =>
          current.map((order) =>
            order.id === orderId && order.status === 'In Delivery'
              ? { ...order, status: 'Canceled' }
              : order
          )
        );
      },

      completeOrder: (orderId) => {
        setOrders((current) =>
          current.map((order) =>
            order.id === orderId && order.status === 'In Delivery'
              ? { ...order, status: 'Completed' }
              : order
          )
        );
      },

      getProductReviews: (productId) =>
        productReviews[productId] ?? [],

      addProductReview: (productId, customerName, rating, comment) => {
        const newReview: ProductReview = {
          id: `review-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
          productId,
          customerName: customerName.trim() || 'Customer',
          rating: Math.max(1, Math.min(5, Math.round(rating))),
          comment: comment.trim(),
          date: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        };

        if (!newReview.comment) return;

        setProductReviews((current) => ({
          ...current,
          [productId]: [newReview, ...(current[productId] ?? [])],
        }));
      },
    };
  }, [
    cart,
    wishlist,
    orders,
    sellerProducts,
    activeSellerId,
    profile,
    deliveryAddress,
    productReviews,
  ]);

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }

  return context;
}

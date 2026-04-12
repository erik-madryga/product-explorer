import { create } from 'zustand';
import { fetchCart } from '../lib/fakeStoreApi';
import { Cart } from '../components/Cart/cart.types';

interface CartState {
  cart: Cart[];
  loading: boolean;
  error: string | null;
  fetchUserCart: (userId: string) => Promise<void>;
  setCart: (cart: Cart[]) => void;
  clearCart: () => void;
  addItemToCart: (productId: number, quantity: number, userId: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  loading: false,
  error: null,
  fetchUserCart: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const cart = await fetchCart(userId);
      set({ cart, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch cart', loading: false });
    }
  },
  setCart: (cart) => set({ cart }),
  clearCart: () => set({ cart: [] }),
  addItemToCart: (productId: number, quantity: number, userId: number) => 
    set((state) => {
      if (state.cart.length === 0) {
        // Create a new cart if none exists
        const newCart: Cart = {
          id: Math.floor(Math.random() * 10000),
          userId,
          date: new Date().toISOString(),
          products: [{ productId, quantity }],
          __v: 0,
        };
        return { cart: [newCart] };
      }

      // Update existing cart
      const existingCart = state.cart[0];
      const existingProductIndex = existingCart.products.findIndex(
        (item) => item.productId === productId
      );

      let updatedProducts;
      if (existingProductIndex > -1) {
        // Update quantity if product exists
        updatedProducts = existingCart.products.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new product
        updatedProducts = [...existingCart.products, { productId, quantity }];
      }

      return {
        cart: [
          {
            ...existingCart,
            products: updatedProducts,
          },
        ],
      };
    }),
}));

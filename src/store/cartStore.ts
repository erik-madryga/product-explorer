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
}));

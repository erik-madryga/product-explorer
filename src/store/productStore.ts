"use client";
import { create } from "zustand";
import { Product } from "../components/Product/product.types";
import { fetchProducts } from '../lib/fakeStoreApi';

type Filters = {
  category: string[];
  price: [number, number];
  rating: number;
};

type State = {
  search: string;
  filters: Filters;
  sort: string;
  products: Product[];  
  isSignedIn?: boolean;
  setProducts: (products: Product[]) => void;
  setSearch: (s: string) => void;
  setFilters: (f: Partial<Filters>) => void;
  setSort: (s: string) => void;
  fetchAllProducts: () => Promise<void>;
};

export const useProductStore = create<State>((set) => ({
  search: "",
  filters: { category: [], price: [0, 1000], rating: 0 },
  sort: "price-asc",
  products: [],
  setSearch: (s) => set({ search: s }),
  setFilters: (f) => set((state) => ({ filters: { ...state.filters, ...f } })),
  setSort: (s) => set({ sort: s }),
  setProducts: (products: Product[]) => set({ products }),
  fetchAllProducts: async () => {
    set({ products: [] });
    try {
      const products = await fetchProducts();
      set({ products });
    } catch (error: any) {
      // Optionally handle error state
      console.error(error);
    }
  },
}));

import { create } from "zustand";

type Filters = {
  category: string[];
  price: [number, number];
  rating: number;
};

type State = {
  search: string;
  filters: Filters;
  sort: string;
  setSearch: (s: string) => void;
  setFilters: (f: Partial<Filters>) => void;
  setSort: (s: string) => void;
};

export const useProductStore = create<State>((set) => ({
  search: "",
  filters: { category: [], price: [0, 1000], rating: 0 },
  sort: "price-asc",
  setSearch: (s) => set({ search: s }),
  setFilters: (f) => set((state) => ({ filters: { ...state.filters, ...f } })),
  setSort: (s) => set({ sort: s }),
}));

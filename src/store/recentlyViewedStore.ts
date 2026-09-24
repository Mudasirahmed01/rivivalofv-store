import { create } from "zustand";
import { Product } from "../types";

interface RecentlyViewedStore {
  items: Product[];
  addProduct: (product: Product) => void;
  clearHistory: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>((set, get) => ({
  items: [],

  addProduct: (product: Product) => {
    set((state) => {
      // Remove if already exists
      const filtered = state.items.filter((item) => item.id !== product.id);
      // Add to beginning, keep max 10 items
      const newItems = [product, ...filtered].slice(0, 10);
      return { items: newItems };
    });
  },

  clearHistory: () => set({ items: [] }),
}));

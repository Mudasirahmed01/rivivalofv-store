import { create } from "zustand";
import { Product } from "../types";

interface RecentlyViewedStore {
  items: Product[];
  addProduct: (product: Product) => void;
  clearHistory: () => void;
}

// Load recently viewed from localStorage
const loadRecentlyViewedFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save recently viewed to localStorage
const saveRecentlyViewedToStorage = (items: Product[]) => {
  try {
    localStorage.setItem("recentlyViewed", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save recently viewed:", error);
  }
};

export const useRecentlyViewedStore = create<RecentlyViewedStore>((set, get) => ({
  items: loadRecentlyViewedFromStorage(),

  addProduct: (product: Product) => {
    set((state) => {
      // Remove if already exists
      const filtered = state.items.filter((item) => item.id !== product.id);
      // Add to beginning, keep max 10 items
      const newItems = [product, ...filtered].slice(0, 10);
      saveRecentlyViewedToStorage(newItems);
      return { items: newItems };
    });
  },

  clearHistory: () => {
    saveRecentlyViewedToStorage([]);
    set({ items: [] });
  },
}));

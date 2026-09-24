import { create } from "zustand";
import { Product } from "../types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    set((state) => {
      if (state.items.find((item) => item.id === product.id)) return state;
      return { items: [...state.items, product] };
    });
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  isInWishlist: (productId: string) => {
    return get().items.some((item) => item.id === productId);
  },

  toggleItem: (product: Product) => {
    const isIn = get().isInWishlist(product.id);
    if (isIn) {
      get().removeItem(product.id);
    } else {
      get().addItem(product);
    }
  },

  clearWishlist: () => set({ items: [] }),
}));

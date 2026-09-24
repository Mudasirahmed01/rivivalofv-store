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

// Load wishlist from localStorage
const loadWishlistFromStorage = (): Product[] => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlistToStorage = (items: Product[]) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save wishlist:", error);
  }
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: loadWishlistFromStorage(),

  addItem: (product: Product) => {
    set((state) => {
      if (state.items.find((item) => item.id === product.id)) return state;
      const newItems = [...state.items, product];
      saveWishlistToStorage(newItems);
      return { items: newItems };
    });
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId);
      saveWishlistToStorage(newItems);
      return { items: newItems };
    });
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

  clearWishlist: () => {
    saveWishlistToStorage([]);
    set({ items: [] });
  },
}));

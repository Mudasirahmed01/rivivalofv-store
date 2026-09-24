import { create } from "zustand";
import { CartItem, Product } from "../types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, color?: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadCartFromStorage(),
  isOpen: false,

  addItem: (product: Product, size: string) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity: 1, selectedSize: size }];
      }

      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  removeItem: (productId: string, size: string) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      );
      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set((state) => {
      const newItems = state.items.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      );
      saveCartToStorage(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    saveCartToStorage([]);
    set({ items: [] });
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));

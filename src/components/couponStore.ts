import { create } from "zustand";
import BackendService from "../lib/backend";

export interface Coupon {
  id?: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt?: string;
  isActive?: boolean;
}

interface CouponStore {
  availableCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  loading: boolean;
  fetchCoupons: () => Promise<void>;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
  addCoupon: (coupon: Coupon) => Promise<boolean>;
  updateCoupon: (id: string, updates: Partial<Coupon>) => Promise<boolean>;
  deleteCoupon: (id: string) => Promise<boolean>;
}

export const useCouponStore = create<CouponStore>((set, get) => ({
  availableCoupons: [],
  appliedCoupon: null,
  loading: false,

  fetchCoupons: async () => {
    set({ loading: true });
    try {
      const coupons = await BackendService.getAllCoupons();
      set({ availableCoupons: coupons, loading: false });
    } catch (error) {
      console.error("Error fetching coupons:", error);
      set({ loading: false });
    }
  },

  applyCoupon: (code: string) => {
    const coupon = get().availableCoupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!coupon) {
      return { success: false, message: "Invalid coupon code" };
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return { success: false, message: "This coupon has expired" };
    }

    set({ appliedCoupon: coupon });
    return { success: true, message: `Coupon "${coupon.code}" applied successfully!` };
  },

  removeCoupon: () => {
    set({ appliedCoupon: null });
  },

  calculateDiscount: (subtotal: number) => {
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;

    if (coupon.minPurchase && subtotal < coupon.minPurchase) {
      return 0;
    }

    let discount = 0;
    if (coupon.type === "percentage") {
      discount = (subtotal * coupon.discount) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discount;
    }

    return Math.min(discount, subtotal);
  },

  addCoupon: async (coupon: Coupon) => {
    try {
      return await BackendService.addCoupon(coupon);
    } catch (error) {
      console.error("Error adding coupon:", error);
      return false;
    }
  },

  updateCoupon: async (id: string, updates: Partial<Coupon>) => {
    try {
      return await BackendService.updateCoupon(id, updates);
    } catch (error) {
      console.error("Error updating coupon:", error);
      return false;
    }
  },

  deleteCoupon: async (id: string) => {
    try {
      return await BackendService.deleteCoupon(id);
    } catch (error) {
      console.error("Error deleting coupon:", error);
      return false;
    }
  },
}));

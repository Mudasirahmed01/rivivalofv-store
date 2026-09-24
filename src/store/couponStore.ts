import { create } from "zustand";

export interface Coupon {
  code: string;
  discount: number; // percentage or fixed amount
  type: "percentage" | "fixed";
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt?: string;
}

interface CouponStore {
  availableCoupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  calculateDiscount: (subtotal: number) => number;
}

// Sample coupons - in production, these would come from backend
const sampleCoupons: Coupon[] = [
  {
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    minPurchase: 5000,
    maxDiscount: 1000,
    expiresAt: "2026-12-31",
  },
  {
    code: "SAVE500",
    discount: 500,
    type: "fixed",
    minPurchase: 3000,
    expiresAt: "2026-12-31",
  },
  {
    code: "FLAT20",
    discount: 20,
    type: "percentage",
    minPurchase: 10000,
    maxDiscount: 2000,
    expiresAt: "2026-06-30",
  },
];

export const useCouponStore = create<CouponStore>((set, get) => ({
  availableCoupons: sampleCoupons,
  appliedCoupon: null,

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
}));

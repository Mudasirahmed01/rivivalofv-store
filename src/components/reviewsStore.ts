import { create } from "zustand";
import BackendService from "../lib/backend";

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ReviewsStore {
  reviews: Review[];
  loading: boolean;
  fetchReviews: () => Promise<void>;
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => Promise<void>;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  getTotalReviews: (productId: string) => number;
  markReviewHelpful: (reviewId: string) => Promise<void>;
}

export const useReviewsStore = create<ReviewsStore>((set, get) => ({
  reviews: [],
  loading: false,

  fetchReviews: async () => {
    set({ loading: true });
    try {
      const allReviews = await BackendService.getAllReviews();
      set({ reviews: allReviews, loading: false });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      set({ loading: false });
    }
  },

  addReview: async (review) => {
    try {
      const newReview = await BackendService.addReview(review);
      if (newReview) {
        set((state) => ({
          reviews: [newReview, ...state.reviews],
        }));
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  },

  getReviewsByProduct: (productId: string) => {
    return get().reviews.filter((r) => r.productId === productId);
  },

  getAverageRating: (productId: string) => {
    const productReviews = get().reviews.filter((r) => r.productId === productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / productReviews.length) * 10) / 10;
  },

  getTotalReviews: (productId: string) => {
    return get().reviews.filter((r) => r.productId === productId).length;
  },

  markReviewHelpful: async (reviewId: string) => {
    try {
      await BackendService.markReviewHelpful(reviewId);
      set((state) => ({
        reviews: state.reviews.map((r) =>
          r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
        ),
      }));
    } catch (error) {
      console.error("Error marking review helpful:", error);
    }
  },
}));

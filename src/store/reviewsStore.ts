import { create } from "zustand";

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
  addReview: (review: Omit<Review, "id" | "date" | "helpful">) => void;
  getReviewsByProduct: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  getTotalReviews: (productId: string) => number;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "Ahmed K.",
    rating: 5,
    title: "Best hoodie I've ever owned!",
    comment: "The quality is insane. 500 GSM cotton feels so premium. Fits perfectly and the stitching is top-notch. Worth every rupee!",
    date: "2026-02-15",
    helpful: 24,
    verified: true,
  },
  {
    id: "2",
    productId: "1",
    userName: "Sara M.",
    rating: 4,
    title: "Great quality, slightly oversized",
    comment: "Love the fabric and build quality. I'd recommend sizing down if you want a more fitted look. Otherwise perfect!",
    date: "2026-02-10",
    helpful: 18,
    verified: true,
  },
  {
    id: "3",
    productId: "1",
    userName: "Hassan R.",
    rating: 5,
    title: "Premium feel",
    comment: "Received so many compliments. The heavyweight cotton is exactly what I was looking for. Will definitely buy more colors.",
    date: "2026-02-05",
    helpful: 12,
    verified: true,
  },
  {
    id: "4",
    productId: "2",
    userName: "Fatima A.",
    rating: 5,
    title: "Perfect everyday tee",
    comment: "So comfortable and the fit is just right. Not too loose, not too tight. The cotton quality is excellent.",
    date: "2026-02-18",
    helpful: 15,
    verified: true,
  },
  {
    id: "5",
    productId: "2",
    userName: "Ali Z.",
    rating: 4,
    title: "Good but runs large",
    comment: "Great quality tee but definitely runs large. I'm usually M but S fits me better. Material is super soft.",
    date: "2026-02-12",
    helpful: 9,
    verified: true,
  },
  {
    id: "6",
    productId: "3",
    userName: "Usman B.",
    rating: 5,
    title: "Technical and stylish",
    comment: "These cargos are amazing! Water-resistant actually works. Multiple pockets are super useful. Best pants I've bought online.",
    date: "2026-02-20",
    helpful: 21,
    verified: true,
  },
  {
    id: "7",
    productId: "5",
    userName: "Zainab H.",
    rating: 5,
    title: "Obsessed with this tee",
    comment: "The oversized fit is perfect. Dropped shoulders look so good. Already ordered 2 more in different colors!",
    date: "2026-02-14",
    helpful: 17,
    verified: true,
  },
  {
    id: "8",
    productId: "7",
    userName: "Bilal S.",
    rating: 4,
    title: "Quality denim",
    comment: "Japanese selvedge denim is no joke. The fade is beautiful and the fit is exactly as described. Premium quality.",
    date: "2026-02-08",
    helpful: 14,
    verified: true,
  },
  {
    id: "9",
    productId: "13",
    userName: "Ayesha N.",
    rating: 5,
    title: "So cozy!",
    comment: "The brushed fleece inside is incredibly soft. Boxy fit is trendy and comfortable. Perfect for Lahore winters!",
    date: "2026-02-16",
    helpful: 11,
    verified: true,
  },
  {
    id: "10",
    productId: "15",
    userName: "Omar T.",
    rating: 4,
    title: "Wardrobe staple",
    comment: "Basic but essential. The cotton quality is way better than other brands at this price point. Great for layering.",
    date: "2026-02-11",
    helpful: 8,
    verified: true,
  },
];

export const useReviewsStore = create<ReviewsStore>((set, get) => ({
  reviews: mockReviews,

  addReview: (review) => {
    const newReview: Review = {
      ...review,
      id: String(Date.now()),
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    };
    set((state) => ({ reviews: [newReview, ...state.reviews] }));
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
}));

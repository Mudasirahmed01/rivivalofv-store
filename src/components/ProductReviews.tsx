import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ThumbsUp, Check, ChevronDown } from "lucide-react";
import { useReviewsStore, Review } from "../store/reviewsStore";
import RatingStars from "./RatingStars";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { reviews, getReviewsByProduct, getAverageRating, getTotalReviews, addReview } = useReviewsStore();
  const [showAll, setShowAll] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 5,
    title: "",
    comment: "",
    verified: true,
  });

  const productReviews = getReviewsByProduct(productId);
  const avgRating = getAverageRating(productId);
  const totalReviews = getTotalReviews(productId);

  const displayedReviews = showAll ? productReviews : productReviews.slice(0, 3);

  const handleSubmitReview = () => {
    if (newReview.userName && newReview.title && newReview.comment) {
      addReview({
        productId,
        userName: newReview.userName,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        verified: newReview.verified,
      });
      setNewReview({ userName: "", rating: 5, title: "", comment: "", verified: true });
      setShowWriteReview(false);
    }
  };

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = productReviews.filter((r) => r.rating === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, count, percentage };
  });

  if (totalReviews === 0 && !showWriteReview) {
    return (
      <div className="mt-16 md:mt-24">
        <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-6">
          Customer Reviews
        </h2>
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 text-center">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setNewReview((prev) => ({ ...prev, rating: star }));
                  setShowWriteReview(true);
                }}
                className="p-1 hover:scale-125 transition-transform"
              >
                <Star size={28} className="text-[#E0E0E0] hover:text-[#111]" />
              </button>
            ))}
          </div>
          <p className="text-sm text-[#6E6E73] mb-4">Be the first to review this product!</p>
          <button
            onClick={() => setShowWriteReview(true)}
            className="px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-black/90 transition-colors"
          >
            Write a Review
          </button>
        </div>

        <AnimatePresence>
          {showWriteReview && (
            <WriteReviewForm
              newReview={newReview}
              setNewReview={setNewReview}
              onSubmit={handleSubmitReview}
              onCancel={() => setShowWriteReview(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="mt-16 md:mt-24">
      <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-6 md:mb-8">
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Average Rating */}
        <div className="bg-white rounded-2xl p-6 border border-black/5 text-center">
          <p className="text-4xl md:text-5xl font-bold text-[#111] mb-2">
            {avgRating.toFixed(1)}
          </p>
          <RatingStars rating={avgRating} size={18} />
          <p className="text-sm text-[#6E6E73] mt-2">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-black/5 md:col-span-2">
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#111] w-4">{star}</span>
                <Star size={12} className="text-[#111]" fill="#111" />
                <div className="flex-1 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: star * 0.1 }}
                    className="h-full bg-[#111] rounded-full"
                  />
                </div>
                <span className="text-xs text-[#6E6E73] w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-[#6E6E73]">
          {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </p>
        <button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="px-5 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-black/90 transition-colors"
        >
          {showWriteReview ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Write Review Form */}
      <AnimatePresence>
        {showWriteReview && (
          <WriteReviewForm
            newReview={newReview}
            setNewReview={setNewReview}
            onSubmit={handleSubmitReview}
            onCancel={() => setShowWriteReview(false)}
          />
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      {/* Show More Button */}
      {productReviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 mx-auto px-6 py-3 border border-black/10 rounded-full text-sm font-medium text-[#111] hover:border-black transition-colors"
          >
            {showAll ? "Show Less" : `Show All ${productReviews.length} Reviews`}
            <ChevronDown
              size={14}
              className={`transition-transform ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [markedHelpful, setMarkedHelpful] = useState(false);

  const handleHelpful = () => {
    if (!markedHelpful) {
      setHelpful(helpful + 1);
      setMarkedHelpful(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-xl p-5 md:p-6 border border-black/5"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RatingStars rating={review.rating} size={12} />
            {review.verified && (
              <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                <Check size={10} />
                Verified
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-[#111]">{review.title}</h4>
        </div>
        <span className="text-[10px] text-[#6E6E73]">{review.date}</span>
      </div>

      <p className="text-sm text-[#6E6E73] leading-relaxed mb-3">{review.comment}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#6E6E73]">By {review.userName}</span>
        <button
          onClick={handleHelpful}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${
            markedHelpful
              ? "bg-black text-white"
              : "bg-[#F5F5F7] text-[#6E6E73] hover:bg-black hover:text-white"
          }`}
        >
          <ThumbsUp size={10} />
          Helpful ({helpful})
        </button>
      </div>
    </motion.div>
  );
}

function WriteReviewForm({
  newReview,
  setNewReview,
  onSubmit,
  onCancel,
}: {
  newReview: { userName: string; rating: number; title: string; comment: string; verified: boolean };
  setNewReview: React.Dispatch<React.SetStateAction<typeof newReview>>;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-white rounded-2xl p-5 md:p-6 border border-black/5 mb-6 overflow-hidden"
    >
      <h3 className="text-base font-bold text-[#111] mb-4">Write Your Review</h3>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">
          Your Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
              className="p-1 hover:scale-125 transition-transform"
            >
              <Star
                size={24}
                className={star <= newReview.rating ? "text-[#111]" : "text-[#E0E0E0]"}
                fill={star <= newReview.rating ? "#111" : "none"}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="mb-3">
        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">
          Your Name
        </label>
        <input
          type="text"
          value={newReview.userName}
          onChange={(e) => setNewReview((prev) => ({ ...prev, userName: e.target.value }))}
          placeholder="e.g., Ahmed K."
          className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
        />
      </div>

      {/* Title */}
      <div className="mb-3">
        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">
          Review Title
        </label>
        <input
          type="text"
          value={newReview.title}
          onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Summarize your experience"
          className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all"
        />
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">
          Your Review
        </label>
        <textarea
          value={newReview.comment}
          onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
          placeholder="What did you like about this product?"
          rows={4}
          className="w-full px-4 py-3 bg-[#F5F5F7] rounded-xl text-sm outline-none focus:ring-2 focus:ring-black/10 transition-all resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="flex-1 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-black/90 transition-colors"
        >
          Submit Review
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-black/10 text-sm font-medium text-[#6E6E73] rounded-full hover:border-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

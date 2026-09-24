import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showNumber?: boolean;
  reviewCount?: number;
}

export default function RatingStars({
  rating,
  maxStars = 5,
  size = 14,
  showNumber = false,
  reviewCount,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxStars }, (_, i) => {
          const fillPercentage = Math.min(1, Math.max(0, rating - i)) * 100;
          return (
            <div key={i} className="relative">
              <Star
                size={size}
                className="text-[#E0E0E0]"
                fill="#E0E0E0"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star
                  size={size}
                  className="text-[#111]"
                  fill="#111"
                />
              </div>
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs text-[#6E6E73] ml-1">
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}

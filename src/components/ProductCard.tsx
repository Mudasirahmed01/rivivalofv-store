import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useReviewsStore } from "../store/reviewsStore";
import { useToastStore } from "../store/toastStore";
import { Plus, Share2, Heart } from "lucide-react";
import ShareModal from "./ShareModal";
import RatingStars from "./RatingStars";
import { formatPKR } from "../lib/currency";
import ResponsiveImage from "./ResponsiveImage";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || null);
  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { getAverageRating, getTotalReviews } = useReviewsStore();
  const toast = useToastStore();

  const isWishlisted = isInWishlist(product.id);
  const avgRating = getAverageRating(product.id);
  const reviewCount = getTotalReviews(product.id);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareModal(true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem(product);
    if (!isWishlisted) {
      toast.success("Added to wishlist!");
    } else {
      toast.info("Removed from wishlist");
    }
  };

  const handleAddToCart = (size: string) => {
    addItem(product, size);
    openCart();
    setShowSizes(false);
  };

  const handleQuickAdd = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (product.variants.length === 0) {
      handleAddToCart("");
      return;
    }
    setShowSizes((visible) => !visible);
  };

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage = product.images.find((img) => !img.isPrimary) || product.images[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowSizes(false); }}
    >
      {/* Image - Full Bleed, No Border Radius */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#ECECEC]">
        {primaryImage ? (
          <motion.div
            className="h-full w-full"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ResponsiveImage
              src={isHovered && secondaryImage ? secondaryImage.url : primaryImage.url}
              mobileSrc={isHovered && secondaryImage ? secondaryImage.mobileUrl : primaryImage.mobileUrl}
              alt={(isHovered && secondaryImage ? secondaryImage.altText : primaryImage.altText) || product.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-[#6E6E73]">
            Image coming soon
          </div>
        )}

        {/* Dark Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Quick Add - Floating Bottom Button */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 hidden p-3 md:block md:p-4"
          style={{ pointerEvents: isHovered || showSizes ? "auto" : "none" }}
          animate={{ 
            y: isHovered ? 0 : 60,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors duration-300"
          >
            <Plus size={12} />
            {product.variants.length === 0 ? "Add to Bag" : showSizes ? "Choose Size" : "Quick Add"}
          </button>
        </motion.div>

        <button
          onClick={handleQuickAdd}
          className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-2 bg-white px-3 py-3 text-[10px] font-bold uppercase text-black md:hidden"
        >
          <Plus size={12} />
          {product.variants.length === 0 ? "Add to Bag" : showSizes ? "Choose Size" : "Quick Add"}
        </button>

        {/* Sale Badge & Tags */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-1">
          {product.compareAtPrice && (
            <span className="inline-block px-2.5 py-1 bg-red-500 text-white text-[9px] md:text-[10px] font-bold tracking-wider uppercase">
              Sale
            </span>
          )}
          {product.tags?.includes("new-arrival") && (
            <span className="inline-block px-2.5 py-1 bg-black text-white text-[9px] md:text-[10px] font-bold tracking-wider uppercase">
              New
            </span>
          )}
          {product.tags?.includes("bestseller") && (
            <span className="inline-block px-2.5 py-1 bg-amber-500 text-white text-[9px] md:text-[10px] font-bold tracking-wider uppercase">
              Bestseller
            </span>
          )}
        </div>

        {/* Action Buttons - Top Right */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col gap-2 z-10">
          {/* Wishlist Button - Always visible */}
          <motion.button
            onClick={handleWishlistToggle}
            whileTap={{ scale: 0.85 }}
            className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isWishlisted
                ? "bg-red-500 text-white"
                : "bg-white/90 backdrop-blur-sm text-[#111] hover:bg-white"
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={14} fill={isWishlisted ? "white" : "none"} />
          </motion.button>

          {/* Share Button - On hover */}
          <motion.button
            onClick={handleShare}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
            className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#111] flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
            title="Share this product"
          >
            <Share2 size={14} />
          </motion.button>
        </div>
      </div>

      {/* Size Picker Dropdown */}
      {product.variants.length > 0 && <motion.div
        initial={false}
        animate={{ 
          height: showSizes ? "auto" : 0,
          opacity: showSizes ? 1 : 0,
          marginTop: showSizes ? 8 : 0
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-4 gap-1.5 p-2 bg-[#F5F5F7]">
          {product.variants.map((variant) => (
            <button
              key={variant.size}
              onClick={(e) => { e.stopPropagation(); handleAddToCart(variant.size); }}
              className="py-2 bg-white text-[10px] md:text-xs font-bold text-[#111] hover:bg-black hover:text-white transition-colors duration-200"
            >
              {variant.size}
            </button>
          ))}
        </div>
      </motion.div>}

      {/* Product Info - Minimal Typography */}
      <div className="pt-3 md:pt-4">
        {/* Animated underline */}
        <div className="relative inline-block">
          <h3 className="text-xs md:text-sm font-semibold text-[#111] leading-tight pr-1">
            {product.title}
          </h3>
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-[#111]"
            initial={false}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Rating */}
        {reviewCount > 0 && (
          <div className="mt-1.5">
            <RatingStars rating={avgRating} size={12} showNumber reviewCount={reviewCount} />
          </div>
        )}

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color.name);
                }}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  selectedColor === color.name ? "border-black scale-110" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Fabric */}
        <p className="text-[10px] md:text-xs text-[#6E6E73] mt-1 leading-tight">
          {product.fabricDetails}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-xs md:text-sm font-bold text-[#111]">
            {formatPKR(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[10px] md:text-xs text-[#6E6E73] line-through">
              {formatPKR(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        productTitle={product.title}
        productSlug={product.slug}
        productPrice={product.price}
      />
    </motion.div>
  );
}

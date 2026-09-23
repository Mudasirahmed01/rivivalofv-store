import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { ShoppingBag, Heart, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem(product, selectedSize);
      openCart();
      setShowSizePicker(false);
      setSelectedSize(null);
    } else {
      setShowSizePicker(true);
    }
  };

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage = product.images.find((img) => !img.isPrimary) || product.images[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section - Editorial Style */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#F0F0F0] mb-4">
        {/* Primary Image */}
        <motion.img
          src={primaryImage.url}
          alt={primaryImage.altText}
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{ 
            opacity: isHovered && secondaryImage ? 0 : 1,
            scale: isHovered ? 1.05 : 1 
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Secondary Image (on hover) */}
        {secondaryImage && (
          <motion.img
            src={secondaryImage.url}
            alt={secondaryImage.altText}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.05 : 1 
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setLiked(!liked)}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
              liked 
                ? "bg-red-500 text-white" 
                : "bg-white/80 text-black hover:bg-white"
            }`}
          >
            <Heart size={15} fill={liked ? "white" : "none"} />
          </motion.button>
          
          {/* Quick View */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-black flex items-center justify-center hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          >
            <Eye size={15} />
          </motion.button>
        </div>

        {/* Sale Badge */}
        {product.compareAtPrice && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-white text-black text-[10px] font-bold rounded-full tracking-wider">
              SALE
            </span>
          </div>
        )}

        {/* Bottom Add to Cart Bar */}
        <motion.div
          initial={false}
          animate={{ 
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 p-3"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className="w-full py-3 bg-black text-white text-xs font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 hover:bg-black/90 transition-colors backdrop-blur-sm"
          >
            <ShoppingBag size={14} />
            {selectedSize ? `ADD TO BAG — ${selectedSize}` : "ADD TO BAG"}
          </motion.button>
        </motion.div>
      </div>

      {/* Size Picker (appears below image when triggered) */}
      <motion.div
        initial={false}
        animate={{ 
          height: showSizePicker ? "auto" : 0,
          opacity: showSizePicker ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden mb-3"
      >
        <div className="flex flex-wrap gap-1.5 p-2 bg-[#F5F5F7] rounded-xl">
          {product.variants.map((variant) => (
            <button
              key={variant.size}
              onClick={() => setSelectedSize(variant.size)}
              className={`flex-1 min-w-[40px] py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedSize === variant.size
                  ? "bg-black text-white"
                  : "bg-white text-[#111] hover:bg-black/5"
              }`}
            >
              {variant.size}
            </button>
          ))}
          <button
            onClick={() => setShowSizePicker(false)}
            className="w-full py-1.5 text-[10px] text-[#6E6E73] hover:text-[#111] transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>

      {/* Product Info - Minimal Style */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm md:text-base font-semibold text-[#111] leading-tight">
            {product.title}
          </h3>
          {product.compareAtPrice && (
            <span className="text-xs font-bold text-red-500 shrink-0">
              -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </span>
          )}
        </div>
        
        <p className="text-xs text-[#6E6E73] mb-2 line-clamp-1">
          {product.fabricDetails}
          {product.gsmRating && ` • ${product.gsmRating}`}
        </p>
        
        <div className="flex items-baseline gap-2">
          <span className="text-sm md:text-base font-bold text-[#111]">
            ${product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-[#6E6E73] line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { Plus, Share2, Check } from "lucide-react";
import { shareProduct } from "../lib/shareUtils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await shareProduct({
      title: product.title,
      description: product.description,
      slug: product.slug,
      price: product.price,
    });

    if (result.success) {
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  const handleAddToCart = (size: string) => {
    addItem(product, size);
    openCart();
    setShowSizes(false);
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
        <motion.img
          src={isHovered && secondaryImage ? secondaryImage.url : primaryImage.url}
          alt={primaryImage.altText}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Dark Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Quick Add - Floating Bottom Button */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3 md:p-4"
          animate={{ 
            y: isHovered ? 0 : 60,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setShowSizes(!showSizes); }}
            className="w-full py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors duration-300"
          >
            <Plus size={12} />
            Quick Add
          </button>
        </motion.div>

        {/* Sale Badge */}
        {product.compareAtPrice && (
          <div className="absolute top-3 left-3 md:top-4 md:left-4">
            <span className="inline-block px-2.5 py-1 bg-red-500 text-white text-[9px] md:text-[10px] font-bold tracking-wider uppercase">
              Sale
            </span>
          </div>
        )}

        {/* Share Button - Top Right */}
        <motion.button
          onClick={handleShare}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered || isShared ? 1 : 0,
            scale: isHovered || isShared ? 1 : 0.8
          }}
          transition={{ duration: 0.2 }}
          className={`absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
            isShared
              ? "bg-green-500 text-white"
              : "bg-white/90 backdrop-blur-sm text-[#111] hover:bg-white hover:scale-110"
          }`}
          title="Share this product"
        >
          {isShared ? <Check size={14} /> : <Share2 size={14} />}
        </motion.button>

        {/* Share Success Toast */}
        {isShared && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-14 right-3 md:right-4 bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-20"
          >
            Link copied!
          </motion.div>
        )}
      </div>

      {/* Size Picker Dropdown */}
      <motion.div
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
      </motion.div>

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

        {/* Fabric */}
        <p className="text-[10px] md:text-xs text-[#6E6E73] mt-1 leading-tight">
          {product.fabricDetails}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-1.5">
          <span className="text-xs md:text-sm font-bold text-[#111]">
            ${product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-[10px] md:text-xs text-[#6E6E73] line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

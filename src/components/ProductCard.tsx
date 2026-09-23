import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleQuickAdd = (size: string) => {
    addItem(product, size);
    openCart();
    setShowQuickAdd(false);
  };

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage = product.images.find((img) => !img.isPrimary) || product.images[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-[20px] border border-black/[0.06] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500"
      onMouseEnter={() => { setIsHovered(true); setShowQuickAdd(true); }}
      onMouseLeave={() => { setIsHovered(false); setShowQuickAdd(false); }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F7]">
        <motion.img
          src={isHovered && secondaryImage ? secondaryImage.url : primaryImage.url}
          alt={primaryImage.altText}
          className="w-full h-full object-cover"
          initial={false}
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Quick Add Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: showQuickAdd ? 0 : 20, opacity: showQuickAdd ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-3 left-3 right-3"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-full px-4 py-2.5 flex items-center justify-center gap-2 shadow-lg border border-black/5">
            <span className="text-xs font-semibold text-[#111]">+ QUICK ADD</span>
            <div className="flex gap-1">
              {product.variants.slice(0, 4).map((variant) => (
                <button
                  key={variant.size}
                  onClick={(e) => { e.stopPropagation(); handleQuickAdd(variant.size); }}
                  className="w-7 h-7 rounded-full bg-black/5 hover:bg-black hover:text-white text-[10px] font-bold flex items-center justify-center transition-colors duration-200"
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sale Badge */}
        {product.compareAtPrice && (
          <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            SALE
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-[#111] mb-1 truncate">
          {product.title}
        </h3>
        <p className="text-sm text-[#6E6E73] mb-2">
          {product.fabricDetails}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-[#111]">
            ${product.price} USD
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-[#6E6E73] line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useWishlistStore } from "../store/wishlistStore";
import { Product } from "../types";
import ProductCard from "./ProductCard";
import { formatPKR } from "../lib/currency";
import { ProductCardSkeleton } from "./SkeletonLoader";
import { useEffect, useState } from "react";
import BackendService from "../lib/backend";

interface WishlistPageProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export default function WishlistPage({ onBack, onProductClick }: WishlistPageProps) {
  const { items, removeItem, clearWishlist, hydrateWishlist } = useWishlistStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      await hydrateWishlist();
      setLoading(false);
    };
    loadWishlist();
  }, [hydrateWishlist]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 md:pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs md:text-sm text-[#6E6E73] hover:text-[#111] transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>

        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
              MY WISHLIST
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-[#111]">
              Saved Items
            </h1>
            <p className="text-sm text-[#6E6E73] mt-2">
              {items.length} {items.length === 1 ? "item" : "items"} in your wishlist
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm text-[#6E6E73] hover:text-red-500 border border-black/10 rounded-xl hover:border-red-200 transition-colors"
            >
              <Trash2 size={14} />
              <span className="hidden md:inline">Clear All</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-[#6E6E73]" />
            </div>
            <h2 className="text-lg font-bold text-[#111] mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-[#6E6E73] mb-6">
              Save items you love to buy them later
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-black/90 transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
          >
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative"
              >
                <div onClick={() => onProductClick(product)}>
                  <ProductCard product={product} index={i} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(product.id);
                  }}
                  className="absolute top-2 right-2 md:top-3 md:right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white text-[#111] transition-all duration-200 z-20 shadow-md"
                  title="Remove from wishlist"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && items.length > 0 && (
          <div className="mt-12 p-6 bg-white rounded-2xl border border-black/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#111]">Wishlist Summary</h3>
              <span className="text-sm text-[#6E6E73]">{items.length} items</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <span className="text-sm text-[#6E6E73]">Total Value</span>
              <span className="text-xl font-bold text-[#111]">
                {formatPKR(items.reduce((sum, item) => sum + item.price, 0))}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

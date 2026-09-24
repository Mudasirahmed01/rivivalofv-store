import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart } from "lucide-react";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { formatPKR } from "../lib/currency";
import { useState } from "react";

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0]?.name || "");
  const addToCart = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => 
    product ? state.items.some((item) => item.id === product.id) : false
  );

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={product.images[0]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold">{formatPKR(product.price)}</span>
                  {product.compareAtPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPKR(product.compareAtPrice)}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2">Color</h3>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedColor === color.name
                              ? "border-black dark:border-white scale-110"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => setSelectedSize(variant.size)}
                        className={`px-4 py-2 border rounded transition-all ${
                          selectedSize === variant.size
                            ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                            : "border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white"
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-lg border transition-all ${
                      isInWishlist
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-500"
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

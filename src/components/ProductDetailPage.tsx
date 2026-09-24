import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export default function ProductDetailPage({ product, onBack, onProductClick }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    if (selectedSize) {
      for (let i = 0; i < quantity; i++) {
        addItem(product, selectedSize);
      }
      openCart();
    }
  };

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 md:pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs md:text-sm text-[#6E6E73] hover:text-[#111] transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-[#ECECEC] overflow-hidden mb-4">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]?.url}
                alt={product.images[selectedImage]?.altText}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Sale Badge */}
              {product.compareAtPrice && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-500 text-white text-[10px] md:text-xs font-bold tracking-wider uppercase">
                    Sale
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2 md:gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden bg-[#ECECEC] transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-2 ring-black"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Category */}
            <p className="text-[10px] md:text-xs text-[#6E6E73] uppercase tracking-wider mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-[#111] mb-3 md:mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-bold text-[#111]">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-base md:text-lg text-[#6E6E73] line-through">
                    ${product.compareAtPrice}
                  </span>
                  <span className="text-sm font-bold text-red-500">
                    Save ${product.compareAtPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-[#6E6E73] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Fabric Details */}
            <div className="border-t border-black/10 pt-6 mb-6">
              <h3 className="text-xs font-bold text-[#111] uppercase tracking-wider mb-3">
                Material & Care
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-[#6E6E73]">
                  <span className="font-semibold text-[#111]">Fabric:</span> {product.fabricDetails}
                </p>
                {product.gsmRating && (
                  <p className="text-sm text-[#6E6E73]">
                    <span className="font-semibold text-[#111]">Weight:</span> {product.gsmRating}
                  </p>
                )}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-[#111] uppercase tracking-wider">
                  Select Size
                </h3>
                <button className="text-xs text-[#6E6E73] hover:text-[#111] underline transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedSize(variant.size)}
                    className={`py-3 text-sm font-bold transition-all duration-200 ${
                      selectedSize === variant.size
                        ? "bg-black text-white"
                        : "bg-white text-[#111] border border-black/10 hover:border-black"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#111] uppercase tracking-wider mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-black transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-base font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-black/10 flex items-center justify-center hover:border-black transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-4 font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                  selectedSize
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-black/20 text-white/60 cursor-not-allowed"
                }`}
              >
                <ShoppingBag size={16} />
                {selectedSize ? "ADD TO BAG" : "SELECT A SIZE"}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                  isWishlisted
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-black/10 text-[#111] hover:border-black"
                }`}
              >
                <Heart size={18} fill={isWishlisted ? "white" : "none"} />
              </motion.button>
              <button className="w-14 h-14 border border-black/10 flex items-center justify-center hover:border-black transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10">
              <div className="text-center">
                <Truck size={20} className="mx-auto mb-2 text-[#6E6E73]" />
                <p className="text-[10px] md:text-xs text-[#6E6E73]">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield size={20} className="mx-auto mb-2 text-[#6E6E73]" />
                <p className="text-[10px] md:text-xs text-[#6E6E73]">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw size={20} className="mx-auto mb-2 text-[#6E6E73]" />
                <p className="text-[10px] md:text-xs text-[#6E6E73]">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-6 md:mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {relatedProducts.map((relatedProduct, i) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => onProductClick(relatedProduct)}
                  className="cursor-pointer"
                >
                  <ProductCard product={relatedProduct} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

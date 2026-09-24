import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Share2, Truck, Shield, RotateCcw, Check } from "lucide-react";
import { Product } from "../types";
import { useCartStore } from "../store/cartStore";
import { useRecentlyViewedStore } from "../store/recentlyViewedStore";
import { useToastStore } from "../store/toastStore";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import SizeGuide from "./SizeGuide";
import ShareModal from "./ShareModal";
import ProductReviews from "./ProductReviews";
import ImageZoom from "./ImageZoom";
import Breadcrumbs from "./Breadcrumbs";
import { formatPKR } from "../lib/currency";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export default function ProductDetailPage({ product, onBack, onProductClick }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addProduct } = useRecentlyViewedStore();

  // Track recently viewed
  useEffect(() => {
    addProduct(product);
  }, [product.id]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const { addItem, openCart } = useCartStore();
  const toast = useToastStore();

  const handleAddToCart = () => {
    if (selectedSize) {
      for (let i = 0; i < quantity; i++) {
        addItem(product, selectedSize);
      }
      setAddedToCart(true);
      toast.success(`Added to bag!`);
      setTimeout(() => {
        openCart();
        setAddedToCart(false);
      }, 800);
    } else {
      toast.warning("Please select a size first");
    }
  };

  const handleShare = () => {
    setShareModalOpen(true);
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
          className="flex items-center gap-2 text-xs md:text-sm text-[#6E6E73] hover:text-[#111] transition-colors mb-4"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "#" },
            { label: product.category === "tops" ? "Shirts" : "Pants", href: "#" },
            { label: product.title },
          ]}
        />

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Image */}
            <div 
              className="relative aspect-[3/4] bg-[#ECECEC] overflow-hidden mb-4 cursor-zoom-in"
              onClick={() => setZoomOpen(true)}
            >
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]?.url}
                alt={product.images[selectedImage]?.altText}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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

              {/* Share Button - Top Right */}
              <div className="absolute top-4 right-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 backdrop-blur-sm text-[#111] flex items-center justify-center hover:bg-white transition-all duration-300"
                >
                  <Share2 size={16} />
                </motion.button>
              </div>
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
                {formatPKR(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-base md:text-lg text-[#6E6E73] line-through">
                    {formatPKR(product.compareAtPrice)}
                  </span>
                  <span className="text-sm font-bold text-red-500">
                    Save {formatPKR(product.compareAtPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-[#6E6E73] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold text-[#111] uppercase tracking-wider mb-3">
                  Color: <span className="font-normal text-[#6E6E73]">{selectedColor}</span>
                </h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-black scale-110"
                          : "border-gray-300 hover:border-black"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

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
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-xs text-[#6E6E73] hover:text-[#111] underline underline-offset-2 transition-colors"
                >
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

            {/* Action Buttons - Only Add to Bag + Share (no heart) */}
            <div className="flex gap-3 mb-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`flex-1 py-4 font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : selectedSize
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-black/20 text-white/60 cursor-not-allowed"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={16} />
                    ADDED!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    {selectedSize ? "ADD TO BAG" : "SELECT A SIZE"}
                  </>
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleShare}
                className="w-14 h-14 border border-black/10 text-[#111] flex items-center justify-center hover:border-black transition-all duration-300"
              >
                <Share2 size={18} />
              </motion.button>
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

        {/* Product Reviews */}
        <ProductReviews productId={product.id} />

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

      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category as "tops" | "bottoms"}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        productTitle={product.title}
        productSlug={product.slug}
        productPrice={product.price}
      />

      {/* Image Zoom */}
      <ImageZoom
        src={product.images[selectedImage]?.url}
        alt={product.images[selectedImage]?.altText}
        isOpen={zoomOpen}
        onClose={() => setZoomOpen(false)}
      />
    </div>
  );
}

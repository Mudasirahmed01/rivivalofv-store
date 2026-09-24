import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import { Product } from "../types";

const filterCategories = [
  { label: "All", value: "all" },
  { label: "Shirts", value: "tops" },
  { label: "Pants", value: "bottoms" },
];

interface FeaturedProductsProps {
  onViewAll: () => void;
  onProductClick: (product: Product) => void;
}

export default function FeaturedProducts({ onViewAll, onProductClick }: FeaturedProductsProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  // Show only 10 products on homepage
  const displayProducts = filteredProducts.slice(0, 10);

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
            04 / FULL CATALOG
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#111] mb-3 md:mb-4">
            Complete Collection
          </h2>
          <p className="text-sm md:text-base text-[#6E6E73] max-w-xl mx-auto px-4">
            Explore our full range of premium shirts and pants.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {filterCategories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.value
                  ? "bg-black text-white shadow-lg"
                  : "bg-[#F5F5F7] text-[#6E6E73] hover:bg-black/5 hover:text-[#111]"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Product Grid with Animation - Only 10 Products */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {displayProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results Count + View All Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-10 md:mt-12">
          <p className="text-xs md:text-sm text-[#6E6E73]">
            Showing {displayProducts.length} of {filteredProducts.length} products
          </p>
          
          {filteredProducts.length > 10 && (
            <motion.button
              onClick={onViewAll}
              whileHover={{ x: 4 }}
              className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#111] hover:text-black transition-all duration-200 group"
            >
              <span>View All {filteredProducts.length} Products</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}

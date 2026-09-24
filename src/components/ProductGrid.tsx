import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products, categories } from "../data/products";
import ProductCard from "./ProductCard";
import { Product } from "../types";

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ onProductClick }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = activeCategory === "all"
    ? products.filter((p) => p.homepageSlot === "new_release")
    : products.filter(
        (p) => p.homepageSlot === "new_release" && p.category === activeCategory
      );

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
              01 / NEW RELEASES
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-[#111]">
              Latest Drops
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:flex items-center gap-2 text-xs md:text-sm font-semibold text-[#111] hover:gap-3 transition-all duration-200"
          >
            SEE ALL <ArrowRight size={14} />
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-black text-white"
                : "bg-white text-[#6E6E73] border border-black/10 hover:border-black/30"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.slug
                  ? "bg-black text-white"
                  : "bg-white text-[#6E6E73] border border-black/10 hover:border-black/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
        >
          {filteredProducts.map((product, i) => (
            <div key={product.id} onClick={() => onProductClick(product)}>
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6E6E73] text-base md:text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

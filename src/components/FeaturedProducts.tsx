import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const filterCategories = [
  { label: "All", value: "all" },
  { label: "Shirts", value: "tops" },
  { label: "Pants", value: "bottoms" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Fragrances", value: "fragrances" },
  { label: "Accessories", value: "accessories" },
];

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
            04 / FULL CATALOG
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111] mb-4">
            Complete Collection
          </h2>
          <p className="text-[#6E6E73] max-w-xl mx-auto">
            Explore our full range of premium apparel, fragrances, and accessories.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.value
                  ? "bg-black text-white shadow-lg"
                  : "bg-[#F5F5F7] text-[#6E6E73] hover:bg-black/5 hover:text-[#111]"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Product Grid with Animation */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#6E6E73]">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "../types";
import { useProducts } from "../hooks/useProducts";
import { ProductCardSkeleton } from "./SkeletonLoader";

interface AllProductsPageProps {
  initialCategory?: string;
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export default function AllProductsPage({ initialCategory = "all", onBack, onProductClick }: AllProductsPageProps) {
  const [activeFilter, setActiveFilter] = useState(initialCategory);
  const { products, loading } = useProducts();

  useEffect(() => setActiveFilter(initialCategory), [initialCategory]);

  const filteredProducts =
    activeFilter === "all"
      ? products
      : activeFilter === "category:perfumes"
      ? products.filter((product) => product.category.startsWith("perfume"))
      : products.filter((product) => product.category === (activeFilter.startsWith("category:") ? activeFilter.slice("category:".length) : activeFilter));
  const filterCategories = [
    { label: "All", value: "all" },
    ...(products.some((product) => product.category.startsWith("perfume")) ? [{ label: "Perfumes", value: "category:perfumes" }] : []),
    ...[...new Set(products.map((product) => product.category))].map((category) => ({
      label: category === "tops" ? "Shirts" : category === "bottoms" ? "Pants" : category.replace(/[_-]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
      value: `category:${category}`,
    })),
  ];
  const categoryFilter = activeFilter.startsWith("category:") ? activeFilter.slice("category:".length) : activeFilter;
  const collectionTitle = activeFilter === "all"
    ? "All Products"
    : categoryFilter === "perfumes"
    ? "Perfume Collection"
    : categoryFilter === "perfume-men"
    ? "Men's Perfume Collection"
    : categoryFilter === "perfume-women"
    ? "Women's Perfume Collection"
    : categoryFilter === "perfume-unisex"
    ? "Unisex Perfume Collection"
    : categoryFilter === "tops"
    ? "Shirts"
    : categoryFilter === "bottoms"
    ? "Pants"
    : categoryFilter.replace(/[_-]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

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

        <div className="mb-8 md:mb-12">
          <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
            FULL CATALOG
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111] mb-3 md:mb-4">
            {collectionTitle}
          </h1>
          <p className="text-sm md:text-base text-[#6E6E73] max-w-xl">
            {activeFilter === "all" ? "Explore the complete collection across every product category." : `Explore products in the ${collectionTitle.toLowerCase()}.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
          {filterCategories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeFilter === cat.value
                  ? "bg-black text-white shadow-lg"
                  : "bg-white text-[#6E6E73] border border-black/10 hover:border-black/30"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
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
        )}

        {!loading && (
          <div className="text-center mt-10 md:mt-12">
            <p className="text-xs md:text-sm text-[#6E6E73]">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

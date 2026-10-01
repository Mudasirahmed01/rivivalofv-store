import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Product } from "../types";
import { formatPKR } from "../lib/currency";
import RatingStars from "./RatingStars";
import { useReviewsStore } from "../store/reviewsStore";
import { useProducts } from "../hooks/useProducts";
import ResponsiveImage from "./ResponsiveImage";

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export default function AdvancedSearch({ isOpen, onClose, onProductClick }: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState("relevance");
  const { getAverageRating } = useReviewsStore();
  const { products } = useProducts();

  // Filter and search products
  const filteredProducts = products
    .filter((p) => {
      const matchesQuery = query === "" || 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.fabricDetails.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      
      return matchesQuery && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return getAverageRating(b.id) - getAverageRating(a.id);
        default: return 0;
      }
    });

  const trendingSearches = ["Heavyweight Hoodie", "Oversized Tee", "Cargo Pants", "Slim Jeans", "Crewneck"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-8 md:top-16 bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-black/5">
              <Search size={20} className="text-[#6E6E73] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, fabrics, styles..."
                className="flex-1 text-base md:text-lg outline-none placeholder:text-[#6E6E73]"
                autoFocus
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-full transition-colors ${
                  showFilters ? "bg-black text-white" : "hover:bg-black/5 text-[#111]"
                }`}
              >
                <SlidersHorizontal size={18} />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={18} className="text-[#6E6E73]" />
              </button>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-black/5 overflow-hidden"
                >
                  <div className="p-5 space-y-4">
                    {/* Category Filter */}
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">
                        Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "All", value: "all" },
                          { label: "Shirts", value: "tops" },
                          { label: "Pants", value: "bottoms" },
                        ].map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => setCategoryFilter(cat.value)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                              categoryFilter === cat.value
                                ? "bg-black text-white"
                                : "bg-[#F5F5F7] text-[#6E6E73] hover:bg-black/10"
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">
                        Price Range
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                          placeholder="Min"
                          className="flex-1 px-3 py-2 bg-[#F5F5F7] rounded-lg text-sm outline-none"
                        />
                        <span className="text-[#6E6E73]">to</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          placeholder="Max"
                          className="flex-1 px-3 py-2 bg-[#F5F5F7] rounded-lg text-sm outline-none"
                        />
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F5F5F7] rounded-xl text-sm outline-none"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <div className="flex-1 overflow-y-auto">
              {query === "" && !showFilters ? (
                /* Show trending when no search */
                <div className="p-5">
                  <p className="text-xs text-[#6E6E73] uppercase tracking-wider mb-3">Trending</p>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 bg-[#F5F5F7] rounded-full text-sm text-[#111] hover:bg-black hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Show results */
                <div className="p-5">
                  <p className="text-xs text-[#6E6E73] mb-3">
                    {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
                  </p>
                  <div className="space-y-2">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onProductClick(product);
                          onClose();
                        }}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors text-left"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#ECECEC] shrink-0">
                          <ResponsiveImage
                            src={product.images[0]?.url}
                            mobileSrc={product.images[0]?.mobileUrl}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#111] truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-[#6E6E73]">{product.fabricDetails}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-[#111]">
                              {formatPKR(product.price)}
                            </span>
                            {getAverageRating(product.id) > 0 && (
                              <RatingStars rating={getAverageRating(product.id)} size={10} />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-[#6E6E73]">No products found</p>
                      <p className="text-xs text-[#6E6E73] mt-1">Try adjusting your filters</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "../types";
import { useProductBySlot } from "../hooks/useProducts";
import { ProductCardSkeleton } from "./SkeletonLoader";

interface NewReleasesPageProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export default function NewReleasesPage({ onBack, onProductClick }: NewReleasesPageProps) {
  const { products: newReleases, loading } = useProductBySlot("new_release");

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-12"
        >
          <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
            LATEST DROPS
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111] mb-3 md:mb-4">
            New Releases
          </h1>
          <p className="text-sm md:text-base text-[#6E6E73]">
            Discover our latest arrivals — fresh designs crafted for the modern era.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
          >
            {newReleases.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => onProductClick(product)}
                className="cursor-pointer"
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && (
          <div className="text-center mt-10 md:mt-12">
            <p className="text-xs md:text-sm text-[#6E6E73]">
              Showing {newReleases.length} {newReleases.length === 1 ? "product" : "products"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

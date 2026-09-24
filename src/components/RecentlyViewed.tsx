import { motion } from "framer-motion";
import { Product } from "../types";
import { useRecentlyViewedStore } from "../store/recentlyViewedStore";
import ProductCard from "./ProductCard";

interface RecentlyViewedProps {
  onProductClick: (product: Product) => void;
}

export default function RecentlyViewed({ onProductClick }: RecentlyViewedProps) {
  const { items } = useRecentlyViewedStore();

  if (items.length === 0) return null;

  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8 md:mb-12">
          <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
            YOUR HISTORY
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#111]">
            Recently Viewed
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {items.slice(0, 5).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => onProductClick(product)}
              className="cursor-pointer"
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const bestSellers = products.filter((p) => p.homepageSlot === "best_seller");

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAFAFA] py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
              03 / BEST SELLERS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111]">
              Most Loved Pieces
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all duration-200 ${
                canScrollLeft ? "hover:bg-black hover:text-white hover:border-black" : "opacity-30"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-all duration-200 ${
                canScrollRight ? "hover:bg-black hover:text-white hover:border-black" : "opacity-30"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="max-w-[1440px] mx-auto px-6 mb-6">
        <div className="h-[2px] bg-black/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black rounded-full"
            style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 pb-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="shrink-0 w-[calc((100vw-1440px)/2)] hidden lg:block" />
        {bestSellers.map((product, i) => (
          <div
            key={product.id}
            className="shrink-0 w-[300px] md:w-[340px] snap-start"
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
        <div className="shrink-0 w-[calc((100vw-1440px)/2)] hidden lg:block" />
      </div>
    </section>
  );
}

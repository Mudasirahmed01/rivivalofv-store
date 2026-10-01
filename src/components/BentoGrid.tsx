import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import BackendService from "../lib/backend";
import { getStorefrontVisibility, isStorefrontCategoryVisible } from "../lib/storefrontVisibility";

interface BentoCard {
  id: number | string;
  title: string;
  subtitle: string;
  image: string;
  height: string;
  span: string;
  page: string;
}


interface BentoCardProps {
  card: BentoCard;
  index: number;
  onNavigate: (page: string) => void;
}

function BentoCard({ card, index, onNavigate }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / rect.height) * -4;
    const rotateY = ((e.clientX - centerX) / rect.width) * 4;
    x.set(rotateY);
    y.set(rotateX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    onNavigate(card.page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: springY,
        rotateY: springX,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${card.height} ${card.span}`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      {/* Shop Now Button - Shows on Hover */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm tracking-wider shadow-xl">
          SHOP NOW →
        </div>
      </motion.div>

      {/* Glassmorphism Badge */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 md:px-5 md:py-4">
          <p className="text-[10px] md:text-xs text-white/70 tracking-[0.2em] uppercase mb-1">
            {card.title}
          </p>
          <p className="text-base md:text-lg font-bold text-white">
            {card.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface BentoGridProps {
  onNavigate?: (page: string) => void;
  disabledPages?: string[];
}

const noDisabledPages: string[] = [];

export default function BentoGrid({ onNavigate, disabledPages = noDisabledPages }: BentoGridProps) {
  const [bentoCards, setBentoCards] = useState<BentoCard[]>([]);

  useEffect(() => {
    Promise.all([BackendService.getHomepageCategories(), getStorefrontVisibility()]).then(([categories, visibility]) => {
      const visibleCategories = categories.filter((category) => {
        if (!category.image_url) return false;
        if (category.page.startsWith('category:') && disabledPages.includes('all-products')) return false;
        if (category.page === 'shirts') return isStorefrontCategoryVisible('tops', visibility);
        if (category.page === 'pants') return isStorefrontCategoryVisible('bottoms', visibility);
        if (category.page === 'new-releases') return !visibility.disabledSections.includes('new-releases');
        if (category.page.startsWith('category:')) return isStorefrontCategoryVisible(category.page.slice('category:'.length), visibility);
        return true;
      });
      const cards: BentoCard[] = visibleCategories.map((category) => ({
        id: category.id,
        title: category.title,
        subtitle: category.subtitle,
        image: category.image_url,
        height: category.page === 'shirts' ? 'h-[400px] md:h-[580px]' : 'h-[280px] md:h-[280px]',
        span: category.page === 'shirts' ? 'md:row-span-2' : '',
        page: category.page,
      }));
      setBentoCards(cards);
    });
  }, [disabledPages]);
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-360 mx-auto">
        <div className="mb-8 md:mb-12">
          <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
            02 / CATEGORIES
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#111]">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 auto-rows-auto">
          {bentoCards.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} onNavigate={handleNavigate} />
          ))}
          {bentoCards.length === 0 && <p className="py-12 text-center text-sm text-[#6E6E73] md:col-span-2">No active categories configured.</p>}
        </div>
      </div>
    </section>
  );
}

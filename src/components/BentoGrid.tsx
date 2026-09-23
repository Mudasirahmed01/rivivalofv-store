import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const bentoCards = [
  {
    id: 1,
    title: "SHIRTS & TOPS",
    subtitle: "Premium Tees & Hoodies",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=1200&fit=crop",
    height: "h-[400px] md:h-[580px]",
    span: "md:row-span-2",
  },
  {
    id: 2,
    title: "PANTS & BOTTOMS",
    subtitle: "Cargos, Denim & Joggers",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=600&fit=crop",
    height: "h-[280px] md:h-[280px]",
    span: "",
  },
  {
    id: 3,
    title: "NEW SEASON",
    subtitle: "Latest Drops — Limited Stock",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop",
    height: "h-[280px] md:h-[280px]",
    span: "",
  },
];

function BentoCard({ card, index }: { card: typeof bentoCards[0]; index: number }) {
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
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${card.height} ${card.span}`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
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

export default function BentoGrid() {
  return (
    <section className="bg-[#F5F5F7] py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
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
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

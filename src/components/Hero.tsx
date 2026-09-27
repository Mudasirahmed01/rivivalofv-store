import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackendService from "../lib/backend";

interface HeroProps {
  onExploreCollection: () => void;
}

export default function Hero({ onExploreCollection }: HeroProps) {
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    BackendService.getHomepageBanners().then((banners) => {
      const liveSlides = banners
        .filter((banner) => banner.image_url && banner.headline)
        .map((banner) => ({
          id: banner.id,
          preTitle: banner.pre_title || '',
          headline: banner.headline,
          subheadline: banner.subheadline || '',
          cta: banner.cta || 'SHOP NOW',
          image: banner.image_url,
        }));

      if (liveSlides.length > 0) {
        setHeroSlides(liveSlides);
        setCurrentSlide(0);
        setProgress(0);
      }
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (heroSlides.length === 0) {
    return <section className="flex h-[85vh] items-center justify-center bg-[#FAFAFA] text-sm text-[#6E6E73]">No active banners configured.</section>;
  }

  const slide = heroSlides[currentSlide] || heroSlides[0];

  return (
    <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-[#FAFAFA]">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Product Visual */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-48 h-48 md:w-80 md:h-80 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <p className="text-[10px] md:text-sm text-white/70 tracking-[0.2em] md:tracking-[0.25em] mb-3 md:mb-4 uppercase">
              {slide.preTitle}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 md:mb-6 px-2">
              {slide.headline}
            </h1>
            <p className="text-sm md:text-lg text-white/70 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              {slide.subheadline}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreCollection}
              className="px-6 md:px-8 py-3 md:py-4 bg-black text-white rounded-full font-semibold text-xs md:text-sm tracking-wider hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-shadow duration-300"
            >
              {slide.cta}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Pill Indicators */}
        <div className="absolute bottom-8 md:bottom-12 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentSlide(i); setProgress(0); }}
              className="relative h-1 md:h-1.5 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === currentSlide ? 36 : 12 }}
            >
              <span className="absolute inset-0 bg-white/30 rounded-full" />
              {i === currentSlide && (
                <motion.span
                  className="absolute inset-y-0 left-0 bg-white rounded-full"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

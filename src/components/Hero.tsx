import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "../data/products";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

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

  const slide = heroSlides[currentSlide];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#FAFAFA]">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Product Visual */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <p className="text-xs md:text-sm text-white/70 tracking-[0.25em] mb-4 uppercase">
              {slide.preTitle}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              {slide.headline}
            </h1>
            <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              {slide.subheadline}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-black text-white rounded-full font-semibold text-sm tracking-wider hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] transition-shadow duration-300"
            >
              {slide.cta}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Pill Indicators */}
        <div className="absolute bottom-12 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentSlide(i); setProgress(0); }}
              className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
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

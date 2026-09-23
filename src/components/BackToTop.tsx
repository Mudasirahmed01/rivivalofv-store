import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={16} className="md:hidden" />
          <ArrowUp size={18} className="hidden md:block" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

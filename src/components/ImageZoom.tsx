import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageZoomProps {
  src: string;
  mobileSrc?: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageZoom({ src, mobileSrc, alt, isOpen, onClose }: ImageZoomProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -200;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -200;
    setPosition({ x, y });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.max(1, Math.min(3, prev - e.deltaY * 0.001)));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center cursor-zoom-in"
          onClick={onClose}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} className="text-white" />
          </button>

          <picture>
            {mobileSrc && <source srcSet={mobileSrc} media="(max-width: 767px)" />}
            <motion.img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              animate={{
              x: position.x,
              y: position.y,
                scale: scale,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </picture>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs">
            Scroll to zoom • Click to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

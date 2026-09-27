import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackendService from "../lib/backend";

export default function Marquee() {
  const [marqueeItems, setMarqueeItems] = useState<string[]>([]);

  useEffect(() => {
    BackendService.getStoreSettings().then((settings) => setMarqueeItems(settings.marquee?.items || []));
  }, []);

  if (marqueeItems.length === 0) return null;

  return (
    <div className="bg-black py-2 md:py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="text-white/80 text-[9px] md:text-xs font-medium tracking-[0.15em] md:tracking-[0.2em] mx-4 md:mx-6 uppercase"
          >
            {item}{i % 2 === 0 ? '  ★' : ''}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

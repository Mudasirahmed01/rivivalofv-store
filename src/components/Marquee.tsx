import { motion } from "framer-motion";

const marqueeItems = [
  "NEW COLLECTION 01",
  "★",
  "FREE SHIPPING OVER $200",
  "★",
  "PREMIUM ORGANIC COTTON",
  "★",
  "ARCHITECTURAL SILHOUETTES",
  "★",
  "SUSTAINABLE FASHION",
  "★",
];

export default function Marquee() {
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
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

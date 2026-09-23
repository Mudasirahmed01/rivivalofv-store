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
  "HANDCRAFTED PRECISION",
  "★",
];

export default function Marquee() {
  return (
    <div className="bg-black py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span
            key={i}
            className="text-white/80 text-xs font-medium tracking-[0.2em] mx-6 uppercase"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

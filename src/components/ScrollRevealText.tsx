import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const brandText = "We do not design apparel for a single season. Revival of 5 builds architectural silhouettes designed to endure time, movement, and perception.";

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = brandText.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <div
      ref={containerRef}
      className="min-h-[120vh] md:min-h-[150vh] flex items-center justify-center bg-[#FAFAFA] px-4 md:px-6 py-20 md:py-32"
    >
      <div className="sticky top-1/2 -translate-y-1/2 max-w-5xl">
        <p className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-wrap gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-3">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <WordReveal
                key={i}
                word={word}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
}

function WordReveal({
  word,
  scrollYProgress,
  start,
  end,
}: {
  word: string;
  scrollYProgress: any;
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const y = useTransform(scrollYProgress, [start, end], [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="text-[#111] inline-block transition-colors"
    >
      {word}
    </motion.span>
  );
}

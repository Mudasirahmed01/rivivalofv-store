import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

interface NotFoundPageProps {
  onBack: () => void;
}

export default function NotFoundPage({ onBack }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl md:text-9xl font-black text-[#111] mb-4"
        >
          404
        </motion.div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#111] mb-3">
          Page Not Found
        </h1>
        <p className="text-sm md:text-base text-[#6E6E73] mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-black/90 transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#111] text-sm font-bold rounded-full border border-black/10 hover:border-black transition-colors"
          >
            <Home size={16} />
            Home Page
          </button>
        </div>
      </motion.div>
    </div>
  );
}

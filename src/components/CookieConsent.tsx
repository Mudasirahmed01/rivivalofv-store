import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllow = () => {
    localStorage.setItem("cookieConsent", "allowed");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[300] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-black/10 p-5 md:p-6">
            <div className="flex items-start gap-4">
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-bold text-[#111] mb-2">
                  🍪 We use cookies
                </h3>
                <p className="text-xs md:text-sm text-[#6E6E73] leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Allow All", you consent to our use of cookies.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleAllow}
                    className="px-6 py-2.5 bg-black text-white text-xs md:text-sm font-bold rounded-full hover:bg-black/90 transition-colors"
                  >
                    Allow All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="px-6 py-2.5 bg-[#F5F5F7] text-[#111] text-xs md:text-sm font-bold rounded-full hover:bg-black/10 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDecline}
                className="p-2 hover:bg-black/5 rounded-full transition-colors shrink-0"
                aria-label="Close"
              >
                <X size={18} className="text-[#6E6E73]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

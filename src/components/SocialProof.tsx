import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useProducts } from "../hooks/useProducts";

interface Notification {
  id: number;
  type: "purchase" | "viewing";
  productName: string;
  location: string;
  time: string;
  count?: number;
}

const locations = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"];
const times = ["2 minutes ago", "5 minutes ago", "10 minutes ago", "15 minutes ago", "Just now"];

export default function SocialProof() {
  const { products } = useProducts();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Generate initial notifications
    const generateNotification = (): Notification | null => {
      if (products.length === 0) return null;
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      const isPurchase = Math.random() > 0.5;

      return {
        id: Date.now() + Math.random(),
        type: isPurchase ? "purchase" : "viewing",
        productName: randomProduct.title,
        location: randomLocation,
        time: randomTime,
        count: isPurchase ? undefined : Math.floor(Math.random() * 10) + 2,
      };
    };

    // Show notifications periodically
    const interval = setInterval(() => {
      const newNotification = generateNotification();
      if (newNotification) setCurrentNotification(newNotification);

      // Hide after 5 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 5000);
    }, 8000);

    // Show first notification after 3 seconds
    const timeout = setTimeout(() => {
      const newNotification = generateNotification();
      if (newNotification) setCurrentNotification(newNotification);
      setTimeout(() => setCurrentNotification(null), 5000);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [products]);

  return (
    <AnimatePresence>
      {currentNotification && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 20 }}
          className="fixed bottom-6 left-6 z-30 max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              {currentNotification.type === "purchase" ? (
                <ShoppingBag className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {currentNotification.productName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {currentNotification.type === "purchase" ? (
                  <>
                    Someone from <span className="font-semibold">{currentNotification.location}</span> just purchased
                  </>
                ) : (
                  <>
                    <span className="font-semibold">{currentNotification.count} people</span> from {currentNotification.location} are viewing
                  </>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {currentNotification.time}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

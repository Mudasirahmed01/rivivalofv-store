import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, Check } from "lucide-react";
import { useCouponStore } from "../store/couponStore";
import { useToastStore } from "../store/toastStore";

export default function CouponInput() {
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { appliedCoupon, applyCoupon, removeCoupon, fetchCoupons } = useCouponStore();
  const toast = useToastStore();

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleApply = () => {
    if (!code.trim()) {
      toast.warning("Please enter a coupon code");
      return;
    }

    const result = applyCoupon(code);
    if (result.success) {
      toast.success(result.message);
      setCode("");
      setIsOpen(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleRemove = () => {
    removeCoupon();
    toast.info("Coupon removed");
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <AnimatePresence mode="wait">
        {!appliedCoupon ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <Tag className="w-4 h-4" />
                Have a coupon code?
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  onKeyDown={(e) => e.key === "Enter" && handleApply()}
                />
                <button
                  onClick={handleApply}
                  className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setCode("");
                  }}
                  className="px-3 py-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="applied"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                  {appliedCoupon.code}
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  {appliedCoupon.type === "percentage"
                    ? `${appliedCoupon.discount}% off`
                    : `PKR ${appliedCoupon.discount} off`}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-1 hover:bg-green-100 dark:hover:bg-green-900/40 rounded transition-colors"
            >
              <X className="w-4 h-4 text-green-700 dark:text-green-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

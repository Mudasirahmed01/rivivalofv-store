import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToastStore } from "../store/toastStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    success: <Check size={18} className="text-white" />,
    error: <X size={18} className="text-white" />,
    info: <Info size={18} className="text-white" />,
    warning: <AlertTriangle size={18} className="text-white" />,
  };

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="fixed top-20 right-4 z-[400] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`${bgColors[toast.type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[280px]`}
          >
            <div className="shrink-0">{icons[toast.type]}</div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

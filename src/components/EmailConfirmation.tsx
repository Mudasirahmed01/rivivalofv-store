import { motion } from "framer-motion";
import { Mail, Package, Truck, Check } from "lucide-react";

interface EmailConfirmationProps {
  email: string;
  orderNumber: string;
  totalAmount: string;
  items: { title: string; quantity: number; size: string; price: string }[];
}

export default function EmailConfirmation({ email, orderNumber, totalAmount, items }: EmailConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 max-w-md mx-auto"
    >
      {/* Email Preview Card */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-lg">
        {/* Email Header */}
        <div className="bg-[#F5F5F7] px-5 py-3 border-b border-black/5">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-[#6E6E73]" />
            <span className="text-xs text-[#6E6E73]">Confirmation email sent to</span>
          </div>
          <p className="text-sm font-semibold text-[#111]">{email}</p>
        </div>

        {/* Email Body Preview */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">R5</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#111]">REVIVAL OF 5</p>
              <p className="text-[10px] text-[#6E6E73]">Order Confirmation</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <Check size={14} className="text-green-500 mt-0.5 shrink-0" />
              <p className="text-[#6E6E73]">
                Your order <span className="font-bold text-[#111]">#{orderNumber}</span> has been confirmed
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Package size={14} className="text-[#6E6E73] mt-0.5 shrink-0" />
              <p className="text-[#6E6E73]">
                {items.length} {items.length === 1 ? "item" : "items"} • Total: <span className="font-bold text-[#111]">{totalAmount}</span>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Truck size={14} className="text-[#6E6E73] mt-0.5 shrink-0" />
              <p className="text-[#6E6E73]">
                Estimated delivery: <span className="font-bold text-[#111]">3-5 business days</span>
              </p>
            </div>
          </div>

          {/* Order Items Preview */}
          <div className="mt-4 pt-3 border-t border-black/5">
            <p className="text-[10px] text-[#6E6E73] uppercase tracking-wider mb-2">Order Items</p>
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-[#111] truncate flex-1">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="text-[#6E6E73] ml-2">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Track Order Button */}
          <button className="w-full mt-4 py-2.5 bg-black text-white text-xs font-bold rounded-full hover:bg-black/90 transition-colors">
            TRACK YOUR ORDER
          </button>
        </div>
      </div>

      {/* Note */}
      <p className="text-center text-[10px] text-[#6E6E73] mt-3">
        Check your spam folder if you don't see the email
      </p>
    </motion.div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { formatPKR } from "../lib/currency";

interface CartDrawerProps {
  onCheckout?: () => void;
  checkoutDisabled?: boolean;
}

export default function CartDrawer({ onCheckout, checkoutDisabled = false }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer - Full width on mobile, 420px on desktop */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[160] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-[72px] border-b border-black/5 shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <ShoppingBag size={18} className="md:hidden" />
                <ShoppingBag size={20} className="hidden md:block" />
                <h2 className="text-base md:text-lg font-bold text-[#111]">Your Cart</h2>
                <span className="text-xs md:text-sm text-[#6E6E73]">
                  ({items.length})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={18} className="text-[#111]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={24} className="text-[#6E6E73] md:hidden" />
                    <ShoppingBag size={32} className="text-[#6E6E73] hidden md:block" />
                  </div>
                  <p className="text-base md:text-lg font-semibold text-[#111] mb-2">Your cart is empty</p>
                  <p className="text-xs md:text-sm text-[#6E6E73]">
                    Add some items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-3 md:gap-4 p-2.5 md:p-3 bg-[#F5F5F7] rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden bg-white shrink-0">
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs md:text-sm font-semibold text-[#111] truncate">
                          {item.product.title}
                        </h3>
                        <p className="text-[10px] md:text-xs text-[#6E6E73] mt-0.5">
                          Size: {item.selectedSize}
                        </p>
                        <p className="text-xs md:text-sm font-bold text-[#111] mt-1">
                          {formatPKR(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 md:gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white border border-black/10 flex items-center justify-center hover:border-black/30 transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs md:text-sm font-semibold w-5 md:w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white border border-black/10 flex items-center justify-center hover:border-black/30 transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedSize)}
                            className="ml-auto text-[10px] md:text-xs text-[#6E6E73] hover:text-red-500 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-4 md:px-6 py-4 md:py-6 border-t border-black/5 space-y-3 md:space-y-4 shrink-0 bg-white">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-[#6E6E73]">Subtotal</span>
                  <span className="text-base md:text-lg font-bold text-[#111]">
                    {formatPKR(totalPrice)}
                  </span>
                </div>

                {/* Shipping Note */}
                <p className="text-[10px] md:text-xs text-[#6E6E73] text-center">
                  Free shipping on orders over Rs 50,000
                </p>

                {/* Checkout Button */}
                {!checkoutDisabled && <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    closeCart();
                    onCheckout?.();
                  }}
                  className="w-full py-3.5 md:py-4 bg-black text-white rounded-full font-semibold text-xs md:text-sm tracking-wider hover:bg-black/90 transition-colors"
                >
                  CHECKOUT — {formatPKR(totalPrice)}
                </motion.button>}

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-2.5 md:py-3 text-xs md:text-sm text-[#6E6E73] hover:text-[#111] transition-colors text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

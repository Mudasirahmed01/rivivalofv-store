import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Minus, Plus, X, Trash2, Check, Truck, Shield, Banknote } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useCouponStore } from "../store/couponStore";
import { formatPKR } from "../lib/currency";
import EmailConfirmation from "./EmailConfirmation";
import CouponInput from "./CouponInput";
import BackendService from "../lib/backend";

interface CheckoutPageProps {
  onBack: () => void;
}

type CheckoutStep = "info" | "shipping" | "payment" | "success";

export default function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { calculateDiscount, appliedCoupon } = useCouponStore();
  const [step, setStep] = useState<CheckoutStep>("info");
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderItems, setOrderItems] = useState<typeof items>([]);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [orderError, setOrderError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [storeSettings, setStoreSettings] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Pakistan",
    phone: "",
    paymentMethod: "cod" as const,
  });

  useEffect(() => {
    BackendService.getStoreSettings().then((settings) => setStoreSettings(settings.checkout || {}));
  }, []);

  const subtotal = getTotalPrice();
  const discount = calculateDiscount(subtotal);
  const freeShippingThreshold = Number(storeSettings?.free_shipping_threshold || 0);
  const deliveryCharge = Number(storeSettings?.delivery_charge || 0);
  const taxRate = Number(storeSettings?.tax_rate || 0);
  const shipping = subtotal >= freeShippingThreshold && freeShippingThreshold > 0 ? 0 : deliveryCharge;
  const tax = Math.round((subtotal - discount) * (taxRate / 100) * 100) / 100;
  const total = subtotal - discount + shipping + tax;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (placingOrder) return;
    setOrderError("");
    setPlacingOrder(true);

    const result = await BackendService.createOrder({
      items,
      email: formData.email,
      total,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.apartment
          ? `${formData.address}, ${formData.apartment}`
          : formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
      },
      paymentMethod: formData.paymentMethod,
      couponCode: appliedCoupon?.code,
      discount,
    });

    setPlacingOrder(false);
    if (!result.success) {
      setOrderError(result.message || "Unable to place your order. Please try again.");
      return;
    }

    setOrderTotal(total);
    setOrderItems([...items]);
    setOrderNumber(result.order?.id || null);
    clearCart();
    setStep("success");
  };

  const isInfoValid = formData.email && formData.firstName && formData.lastName && formData.phone;
  const isShippingValid = formData.address && formData.city && formData.state && formData.zipCode;
  const isPaymentValid = true; // COD is always valid

  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-28 pb-16 px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck size={32} className="text-[#6E6E73]" />
          </div>
          <h1 className="text-xl font-bold text-[#111] mb-2">Your cart is empty</h1>
          <p className="text-sm text-[#6E6E73] mb-6">Add some items before checking out</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-black/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-24 md:pt-28 pb-16 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={36} className="text-white" />
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#111] mb-3">Order Confirmed!</h1>
          <p className="text-sm text-[#6E6E73] mb-2">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <p className="text-xs text-[#6E6E73] mb-8">
            Order #{orderNumber || "submitted"} • Confirmation sent to {formData.email || "your email"}
          </p>
          <div className="p-4 bg-white rounded-xl border border-black/5 mb-6 text-left">
            <p className="text-xs text-[#6E6E73] mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-[#111]">{formatPKR(orderTotal)}</p>
          </div>
          <button
            onClick={onBack}
            className="w-full py-4 bg-black text-white text-sm font-bold tracking-wider rounded-full hover:bg-black/90 transition-colors"
          >
            CONTINUE SHOPPING
          </button>

          {/* Email Confirmation Preview */}
          <EmailConfirmation
            email={formData.email}
            orderNumber={orderNumber || "submitted"}
            totalAmount={formatPKR(orderTotal)}
            items={orderItems.map((item) => ({
              title: item.product.title,
              quantity: item.quantity,
              size: item.selectedSize,
              price: formatPKR(item.product.price * item.quantity),
            }))}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 md:pt-28 pb-16">
      <div className="max-w-300 mx-auto px-4 md:px-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs md:text-sm text-[#6E6E73] hover:text-[#111] transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft size={14} />
          Back to Cart
        </button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {[
            { id: "info", label: "Information" },
            { id: "shipping", label: "Shipping" },
            { id: "payment", label: "Payment" },
          ].map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.id
                      ? "bg-black text-white"
                      : ["info", "shipping", "payment"].indexOf(step) > ["info", "shipping", "payment"].indexOf(s.id)
                      ? "bg-green-500 text-white"
                      : "bg-[#F5F5F7] text-[#6E6E73]"
                  }`}
                >
                  {["info", "shipping", "payment"].indexOf(step) > ["info", "shipping", "payment"].indexOf(s.id) ? (
                    <Check size={12} />
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-xs md:text-sm font-medium hidden sm:block ${step === s.id ? "text-[#111]" : "text-[#6E6E73]"}`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="w-8 md:w-16 h-px bg-black/10" />}
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === "info" && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="0313-1392018"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          placeholder="John"
                          className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => updateField("lastName", e.target.value)}
                          placeholder="Doe"
                          className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep("shipping")}
                      disabled={!isInfoValid}
                      className={`w-full py-4 font-bold text-sm tracking-wider rounded-full transition-all ${
                        isInfoValid
                          ? "bg-black text-white hover:bg-black/90"
                          : "bg-black/20 text-white/60 cursor-not-allowed"
                      }`}
                    >
                      CONTINUE TO SHIPPING
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-6">Shipping Address</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">Country</label>
                      <div className="w-full px-4 py-3 bg-[#F5F5F7] border border-black/5 rounded-xl text-sm font-semibold text-[#111] flex items-center gap-2">
                        <span className="text-lg">🇵🇰</span>
                        Pakistan
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateField("address", e.target.value)}
                        placeholder="123 Fashion Street"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">Apartment, suite, etc. (optional)</label>
                      <input
                        type="text"
                        value={formData.apartment}
                        onChange={(e) => updateField("apartment", e.target.value)}
                        placeholder="Apt 4B"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">City</label>
                        <select
                          value={formData.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                        >
                          <option value="">Select City</option>
                          <option>Karachi</option>
                          <option>Lahore</option>
                          <option>Islamabad</option>
                          <option>Rawalpindi</option>
                          <option>Faisalabad</option>
                          <option>Multan</option>
                          <option>Peshawar</option>
                          <option>Quetta</option>
                          <option>Sialkot</option>
                          <option>Hyderabad</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">Province</label>
                        <select
                          value={formData.state}
                          onChange={(e) => updateField("state", e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                        >
                          <option value="">Select Province</option>
                          <option>Punjab</option>
                          <option>Sindh</option>
                          <option>KPK</option>
                          <option>Balochistan</option>
                          <option>Islamabad Capital Territory</option>
                          <option>Gilgit-Baltistan</option>
                          <option>Azad Kashmir</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#111] uppercase tracking-wider mb-2 block">ZIP</label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => updateField("zipCode", e.target.value)}
                          placeholder="10001"
                          className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-sm outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setStep("info")}
                        className="px-6 py-4 border border-black/10 rounded-full text-sm font-bold text-[#111] hover:border-black transition-colors"
                      >
                        ← Back
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep("payment")}
                        disabled={!isShippingValid}
                        className={`flex-1 py-4 font-bold text-sm tracking-wider rounded-full transition-all ${
                          isShippingValid
                            ? "bg-black text-white hover:bg-black/90"
                            : "bg-black/20 text-white/60 cursor-not-allowed"
                        }`}
                      >
                        CONTINUE TO PAYMENT
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-[#111] mb-6">Payment Method</h2>
                  {orderError && (
                    <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {orderError}
                    </p>
                  )}
                  
                  {/* Cash on Delivery Only */}
                  <div className="mb-6">
                    <div className="w-full p-5 border-2 border-black bg-black/5 rounded-xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                        <Banknote size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-[#111]">Cash on Delivery (COD)</p>
                        <p className="text-xs text-[#6E6E73] mt-0.5">Pay when you receive your order</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-black rounded-full" />
                      </div>
                    </div>
                    <p className="text-xs text-[#6E6E73] mt-3 leading-relaxed">
                      💡 Pay in cash when your order is delivered. No advance payment required. Available across Pakistan.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={() => setStep("shipping")}
                      className="px-6 py-4 border border-black/10 rounded-full text-sm font-bold text-[#111] hover:border-black transition-colors"
                    >
                      ← Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      disabled={!isPaymentValid || placingOrder}
                      className={`flex-1 py-4 font-bold text-sm tracking-wider rounded-full transition-all flex items-center justify-center gap-2 ${
                        isPaymentValid
                          ? "bg-black text-white hover:bg-black/90"
                          : "bg-black/20 text-white/60 cursor-not-allowed"
                      }`}
                    >
                      <Shield size={14} />
                      {placingOrder ? "PLACING ORDER..." : `PLACE ORDER — ${formatPKR(total)}`}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-black/5 sticky top-24">
              <h3 className="text-base font-bold text-[#111] mb-4">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3">
                    <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-[#F5F5F7] shrink-0">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#111] truncate">{item.product.title}</p>
                      <p className="text-[10px] text-[#6E6E73]">Size: {item.selectedSize}</p>
                      <p className="text-xs font-bold text-[#111] mt-0.5">{formatPKR(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Input */}
              <div className="mb-4">
                <CouponInput />
              </div>

              {/* Totals */}
              <div className="border-t border-black/5 pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6E6E73]">Subtotal</span>
                  <span className="text-[#111] font-semibold">{formatPKR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-green-600 dark:text-green-400">Discount</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">-{formatPKR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-[#6E6E73]">Shipping</span>
                  <span className="text-[#111] font-semibold">
                    {shipping === 0 ? "FREE" : formatPKR(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6E6E73]">Tax</span>
                  <span className="text-[#111] font-semibold">{formatPKR(tax)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-black/5">
                  <span className="text-sm font-bold text-[#111]">Total</span>
                  <span className="text-lg font-bold text-[#111]">{formatPKR(total)}</span>
                </div>
              </div>

              {/* Free Shipping Note */}
              {freeShippingThreshold > 0 && subtotal < freeShippingThreshold && (
                <p className="text-[10px] text-[#6E6E73] text-center mt-3">
                  Add {formatPKR(freeShippingThreshold - subtotal)} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

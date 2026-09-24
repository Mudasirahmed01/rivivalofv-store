import { motion } from "framer-motion";
import { ArrowLeft, Package, RotateCcw, Truck, Shield, Clock, AlertCircle } from "lucide-react";

interface ShippingReturnsProps {
  onBack: () => void;
}

export default function ShippingReturns({ onBack }: ShippingReturnsProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 md:pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs md:text-sm text-[#6E6E73] hover:text-[#111] transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs md:text-sm font-bold text-[#6E6E73] tracking-wider mb-2">
            POLICIES
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111] mb-4">
            Shipping & Returns
          </h1>
          <p className="text-sm md:text-base text-[#6E6E73] mb-8">
            Last updated: February 2026
          </p>
        </motion.div>

        {/* Quick Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          <div className="bg-white p-4 rounded-xl border border-black/5 text-center">
            <Truck size={20} className="mx-auto mb-2 text-[#111]" />
            <p className="text-xs font-bold text-[#111]">Free Shipping</p>
            <p className="text-[10px] text-[#6E6E73]">Orders over Rs 50,000</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-black/5 text-center">
            <Clock size={20} className="mx-auto mb-2 text-[#111]" />
            <p className="text-xs font-bold text-[#111]">3-5 Days</p>
            <p className="text-[10px] text-[#6E6E73]">Delivery Time</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-black/5 text-center">
            <RotateCcw size={20} className="mx-auto mb-2 text-[#111]" />
            <p className="text-xs font-bold text-[#111]">3-Day Returns</p>
            <p className="text-[10px] text-[#6E6E73]">Easy Returns</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-black/5 text-center">
            <Shield size={20} className="mx-auto mb-2 text-[#111]" />
            <p className="text-xs font-bold text-[#111]">Secure</p>
            <p className="text-[10px] text-[#6E6E73]">Packaging</p>
          </div>
        </motion.div>

        {/* Shipping Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Truck size={18} className="text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111]">Shipping Policy</h2>
          </div>

          <div className="space-y-4 text-sm text-[#6E6E73] leading-relaxed">
            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Delivery Areas</h3>
              <p>We currently ship all across Pakistan. Our logistics partners ensure safe and timely delivery to both urban and rural areas.</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Shipping Charges</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Orders above Rs 50,000:</strong> FREE shipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Orders below Rs 50,000:</strong> Flat rate of Rs 250</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Express Delivery:</strong> Additional Rs 500 (1-2 business days)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Processing Time</h3>
              <p>All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Estimated Delivery Times</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Major Cities (Karachi, Lahore, Islamabad):</strong> 2-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Other Cities:</strong> 3-5 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Rural Areas:</strong> 5-7 business days</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Order Tracking</h3>
              <p>Once your order ships, you'll receive a tracking number via email and SMS. You can track your package in real-time through our courier partner's website or app.</p>
            </div>
          </div>
        </motion.section>

        {/* Returns Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <RotateCcw size={18} className="text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111]">Return Policy</h2>
          </div>

          <div className="space-y-4 text-sm text-[#6E6E73] leading-relaxed">
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-sm font-bold text-green-800 flex items-center gap-2">
                <Clock size={16} />
                3-Day Return Window
              </p>
              <p className="text-xs text-green-700 mt-1">
                You have 3 days from the date of delivery to initiate a return.
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Eligibility for Returns</h3>
              <p className="mb-2">To be eligible for a return, your item must be:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Unused and in the same condition that you received it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>In the original packaging with all tags attached</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Returned within 3 days of delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>With the original receipt or proof of purchase</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Non-Returnable Items</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Sale items (unless defective)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Items worn, washed, or altered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Items without original tags or packaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Undergarments and personal care items</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">How to Initiate a Return</h3>
              <ol className="space-y-2 ml-4 list-decimal">
                <li>Contact our support team at <strong className="text-[#111]">rivivalofv@gmail.com</strong> or WhatsApp: <strong className="text-[#111]">+92 300 1234567</strong></li>
                <li>Provide your order number and reason for return</li>
                <li>Receive a Return Authorization (RA) number</li>
                <li>Pack the item securely in original packaging</li>
                <li>Ship the package to our return address (provided in RA email)</li>
              </ol>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#111] mb-2">Refund Process</h3>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Once we receive your return, we'll inspect it within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>If approved, refund will be processed within 3-5 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Refunds will be issued to the original payment method</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>For COD orders, refund will be via bank transfer</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Exchanges Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Package size={18} className="text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#111]">Exchanges</h2>
          </div>

          <div className="space-y-4 text-sm text-[#6E6E73] leading-relaxed">
            <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at <strong className="text-[#111]">rivivalofv@gmail.com</strong> and we'll guide you through the process.</p>
            <p>For size exchanges, we recommend returning the original item and placing a new order for the correct size. This ensures faster processing.</p>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black text-white rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <AlertCircle size={18} className="text-black" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Need Help?</h2>
          </div>
          <div className="space-y-3 text-sm text-white/70">
            <p><strong className="text-white">Email:</strong> rivivalofv@gmail.com</p>
            <p><strong className="text-white">WhatsApp:</strong> +92 300 1234567</p>
            <p><strong className="text-white">Hours:</strong> Mon-Sat, 10:00 AM - 8:00 PM (PKT)</p>
            <p className="text-xs text-white/50 mt-4">We aim to respond to all inquiries within 24 hours.</p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

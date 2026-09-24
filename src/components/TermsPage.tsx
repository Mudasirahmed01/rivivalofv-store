import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
            LEGAL
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111] mb-4">
            Terms & Conditions
          </h1>
          <p className="text-sm md:text-base text-[#6E6E73] mb-8">
            Last updated: February 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Section 1 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">1. Introduction</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>Welcome to REVIVAL OF V. These Terms and Conditions govern your use of our website and the purchase of products from our online store.</p>
              <p>By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website.</p>
              <p>"REVIVAL OF V", "we", "us", or "our" refers to REVIVAL OF V, a registered business in Pakistan. "You" or "your" refers to the user or customer of our website.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">2. Eligibility</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>By using our website, you confirm that:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>You are at least 18 years of age, or have the consent of a parent or guardian</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>You have the legal capacity to enter into binding contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>The information you provide is accurate and complete</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">3. Products & Pricing</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>All prices are displayed in Pakistani Rupees (PKR) and include applicable taxes unless stated otherwise.</p>
              <p>We reserve the right to modify prices at any time without prior notice. However, the price applicable to your order will be the price displayed at the time of purchase.</p>
              <p>Product images are for illustrative purposes. Actual colors may vary slightly due to screen settings and photography lighting.</p>
              <p>We strive to display product information accurately, including sizes, materials, and descriptions. However, we do not warrant that product descriptions or other content are error-free.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">4. Orders & Payment</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>When you place an order, you are making an offer to purchase. We reserve the right to accept or decline your order for any reason.</p>
              <p>We accept the following payment methods:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Credit/Debit Cards (Visa, Mastercard)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Bank Transfer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Cash on Delivery (COD)</span>
                </li>
              </ul>
              <p>For COD orders, payment is due upon delivery. Additional charges may apply for COD orders.</p>
              <p>We reserve the right to cancel any order if we suspect fraudulent activity or if the product is unavailable.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">5. Shipping & Delivery</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>Please refer to our <strong className="text-[#111]">Shipping & Returns</strong> page for detailed information about shipping charges, delivery times, and tracking.</p>
              <p>Delivery times are estimates and not guaranteed. We are not liable for delays caused by courier services or circumstances beyond our control.</p>
              <p>Risk of loss and title for items pass to you upon delivery to the carrier.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">6. Returns & Refunds</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>We offer a <strong className="text-[#111]">3-day return policy</strong> from the date of delivery. Please refer to our <strong className="text-[#111]">Shipping & Returns</strong> page for complete details on eligibility, process, and refund timelines.</p>
              <p>Refunds will be processed to the original payment method within 3-5 business days after we receive and inspect the returned item.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">7. Intellectual Property</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>All content on this website, including text, graphics, logos, images, and software, is the property of REVIVAL OF V and is protected by Pakistani and international copyright laws.</p>
              <p>You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">8. Limitation of Liability</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>REVIVAL OF V shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website.</p>
              <p>Our total liability for any claim shall not exceed the amount paid by you for the product(s) in question.</p>
              <p>We are not responsible for any damage or loss caused by incorrect use, improper care, or normal wear and tear of our products.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">9. Governing Law</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan.</p>
              <p>Any disputes arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts in Pakistan.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">10. Changes to Terms</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.</p>
              <p>Your continued use of the website after changes constitutes acceptance of the modified Terms.</p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-black text-white rounded-2xl p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-bold mb-3">Contact Us</h2>
            <div className="text-sm text-white/70 space-y-2">
              <p>If you have any questions about these Terms, please contact us:</p>
              <p className="mt-3"><strong className="text-white">Email:</strong> rivivalofv@gmail.com</p>
              <p><strong className="text-white">Address:</strong> REVIVAL OF V, Lahore, Pakistan</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

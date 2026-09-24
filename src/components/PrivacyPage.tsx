import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
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
            Privacy Policy
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
              <p>REVIVAL OF V ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.</p>
              <p>Please read this policy carefully. By using our website, you consent to the data practices described in this policy.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">2. Information We Collect</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <h3 className="text-base font-bold text-[#111]">Personal Information</h3>
              <p>We may collect the following personal information when you place an order or create an account:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Full name</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Shipping address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Payment information (processed securely through third-party providers)</span>
                </li>
              </ul>

              <h3 className="text-base font-bold text-[#111] mt-4">Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>IP address and browser type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Device information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Pages visited and time spent on pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span>Referring website addresses</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">3. How We Use Your Information</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>We use the information we collect for the following purposes:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Process Orders:</strong> To process and fulfill your orders, including payment processing and shipping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Communication:</strong> To send order confirmations, shipping updates, and customer service messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Marketing:</strong> To send promotional emails and newsletters (with your consent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Improvement:</strong> To improve our website, products, and services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Security:</strong> To protect against fraud and unauthorized access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Legal Compliance:</strong> To comply with legal obligations</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">4. Data Sharing & Disclosure</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Service Providers:</strong> With trusted third parties who assist us in operating our business (payment processors, shipping carriers, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Legal Requirements:</strong> When required by law, court order, or governmental regulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">5. Data Security</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              <p>Payment transactions are encrypted using SSL technology and processed through secure third-party payment gateways. We do not store complete credit card information on our servers.</p>
              <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">6. Cookies & Tracking</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our site.</p>
              <p>Types of cookies we use:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Essential Cookies:</strong> Required for the website to function properly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Analytics Cookies:</strong> Help us understand how visitors interact with our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Marketing Cookies:</strong> Used to deliver personalized advertisements</span>
                </li>
              </ul>
              <p>You can control cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">7. Your Rights</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>You have the following rights regarding your personal data:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Access:</strong> Request a copy of the personal data we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Correction:</strong> Request correction of inaccurate or incomplete data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#111]">•</span>
                  <span><strong className="text-[#111]">Opt-out:</strong> Unsubscribe from marketing communications at any time</span>
                </li>
              </ul>
              <p>To exercise these rights, please contact us at <strong className="text-[#111]">privacy@revivalofv.com</strong>.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">8. Data Retention</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
              <p>Order information is typically retained for 2 years for accounting and legal purposes. Marketing preferences are retained until you opt out.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">9. Children's Privacy</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-black/5">
            <h2 className="text-lg md:text-xl font-bold text-[#111] mb-3">10. Changes to This Policy</h2>
            <div className="text-sm text-[#6E6E73] leading-relaxed space-y-3">
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
              <p>We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-black text-white rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-black" />
              </div>
              <h2 className="text-lg md:text-xl font-bold">Contact Us</h2>
            </div>
            <div className="text-sm text-white/70 space-y-2">
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <p className="mt-3"><strong className="text-white">Email:</strong> privacy@revivalofv.com</p>
              <p><strong className="text-white">Address:</strong> REVIVAL OF V, Lahore, Pakistan</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

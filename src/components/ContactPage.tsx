import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Instagram, Twitter, MessageCircle } from "lucide-react";

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
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
            GET IN TOUCH
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#111] mb-4">
            Contact Us
          </h1>
          <p className="text-sm md:text-base text-[#6E6E73] mb-8">
            We're here to help! Reach out to us through any of the channels below.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          {/* Email */}
          <div className="bg-white rounded-2xl p-6 border border-black/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Mail size={18} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-[#111]">Email</h3>
            </div>
            <a
              href="mailto:rivivalofv@gmail.com"
              className="text-sm text-[#6E6E73] hover:text-[#111] transition-colors"
            >
              rivivalofv@gmail.com
            </a>
            <p className="text-xs text-[#6E6E73] mt-2">
              We respond within 24 hours
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-6 border border-black/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Phone size={18} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-[#111]">Phone</h3>
            </div>
            <a
              href="tel:03131392018"
              className="text-sm text-[#6E6E73] hover:text-[#111] transition-colors"
            >
              0313-1392018
            </a>
            <p className="text-xs text-[#6E6E73] mt-2">
              Mon-Sat, 10 AM - 8 PM (PKT)
            </p>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl p-6 border border-black/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-[#111]">WhatsApp</h3>
            </div>
            <a
              href="https://wa.me/923131392018"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6E6E73] hover:text-[#111] transition-colors"
            >
              0313-1392018
            </a>
            <p className="text-xs text-[#6E6E73] mt-2">
              Quick responses, chat anytime
            </p>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-6 border border-black/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-[#111]">Location</h3>
            </div>
            <p className="text-sm text-[#6E6E73]">
              REVIVAL OF V<br />
              Lahore, Pakistan
            </p>
            <p className="text-xs text-[#6E6E73] mt-2">
              Nationwide delivery available
            </p>
          </div>
        </motion.div>

        {/* Business Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Clock size={18} className="text-white" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#111]">Business Hours</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-black/5">
              <span className="text-[#6E6E73]">Monday - Friday</span>
              <span className="font-semibold text-[#111]">10:00 AM - 8:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-black/5">
              <span className="text-[#6E6E73]">Saturday</span>
              <span className="font-semibold text-[#111]">10:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-[#6E6E73]">Sunday</span>
              <span className="font-semibold text-[#111]">Closed</span>
            </div>
          </div>
          <p className="text-xs text-[#6E6E73] mt-4">
            All times are in Pakistan Standard Time (PKT, UTC+5)
          </p>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-black text-white rounded-2xl p-6 md:p-8"
        >
          <h2 className="text-lg md:text-xl font-bold mb-4">Follow Us</h2>
          <p className="text-sm text-white/70 mb-6">
            Stay connected with us on social media for the latest updates, new arrivals, and exclusive offers.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Instagram size={18} />
              <span className="text-sm font-medium">Instagram</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Twitter size={18} />
              <span className="text-sm font-medium">Twitter</span>
            </a>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <h2 className="text-lg md:text-xl font-bold text-[#111] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-5 border border-black/5">
              <h3 className="text-sm font-bold text-[#111] mb-2">
                How long does shipping take?
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Shipping typically takes 3-5 business days for major cities and 5-7 business days for other areas across Pakistan.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-black/5">
              <h3 className="text-sm font-bold text-[#111] mb-2">
                What is your return policy?
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                We offer a 3-day return policy from the date of delivery. Items must be unused and in original packaging.
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-black/5">
              <h3 className="text-sm font-bold text-[#111] mb-2">
                Do you offer Cash on Delivery?
              </h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Yes, we offer Cash on Delivery (COD) across Pakistan. Additional charges may apply for COD orders.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

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
          <div className="flex flex-wrap gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/rivivalofv/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 group"
            >
              <svg className="w-[18px] h-[18px] text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-sm font-medium">Instagram</span>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/923131392018"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-[#25D366] rounded-full transition-all duration-300 group"
            >
              <svg className="w-[18px] h-[18px] text-white/70 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-sm font-medium">WhatsApp</span>
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

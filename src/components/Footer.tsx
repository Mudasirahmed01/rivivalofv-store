import { motion } from "framer-motion";
import { Instagram, Twitter, MessageCircle } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "New Releases", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Shirts & Tops", href: "#" },
    { label: "Pants & Bottoms", href: "#" },
  ],
  support: [
    { label: "Shipping & Returns", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Care Guide", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="text-white/50 hover:text-white text-xs md:text-sm transition-colors duration-200 block py-1.5"
    >
      {label}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Section - Brand + Newsletter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8 pb-8 md:pb-12 border-b border-white/10">
          <div>
            <h3 className="text-lg md:text-2xl font-bold tracking-[0.15em] mb-2">
              REVIVAL OF 5
            </h3>
            <p className="text-xs md:text-sm text-white/40 max-w-md leading-relaxed">
              Engineering wearable precision. Premium apparel crafted for the modern era.
            </p>
          </div>
          
          {/* Newsletter */}
          <div className="w-full lg:w-auto">
            <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-wider mb-2 md:mb-3">Join the movement</p>
            <div className="flex w-full lg:w-80">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-l-xl text-xs md:text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
              <button className="px-4 md:px-5 py-2.5 md:py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-wider rounded-r-xl hover:bg-white/90 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 md:mb-5">
              Brand
            </h4>
            <div className="space-y-0">
              <FooterLink label="Our Story" href="#" />
              <FooterLink label="Sustainability" href="#" />
              <FooterLink label="Careers" href="#" />
              <FooterLink label="Press" href="#" />
            </div>
            {/* Status */}
            <div className="flex items-center gap-2 mt-4 md:mt-6">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[10px] md:text-xs text-white/30">All Systems Normal</span>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 md:mb-5">
              Shop
            </h4>
            <div className="space-y-0">
              {footerLinks.shop.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 md:mb-5">
              Support
            </h4>
            <div className="space-y-0">
              {footerLinks.support.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>

          {/* Legal + Social Column */}
          <div>
            <h4 className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4 md:mb-5">
              Legal
            </h4>
            <div className="space-y-0 mb-4 md:mb-6">
              {footerLinks.legal.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
            
            <h4 className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-3 md:mb-4">
              Follow
            </h4>
            <div className="flex gap-2 md:gap-3">
              <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors">
                <Instagram size={14} className="text-white/60 md:hidden" />
                <Instagram size={16} className="text-white/60 hidden md:block" />
              </a>
              <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors">
                <Twitter size={14} className="text-white/60 md:hidden" />
                <Twitter size={16} className="text-white/60 hidden md:block" />
              </a>
              <a href="#" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors">
                <MessageCircle size={14} className="text-white/60 md:hidden" />
                <MessageCircle size={16} className="text-white/60 hidden md:block" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-[10px] md:text-xs text-white/25 text-center md:text-left">
            © 2026 REVIVAL OF 5. All rights reserved.
          </p>
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-[10px] md:text-xs text-white/25 cursor-pointer hover:text-white/50 transition-colors">PKR Rs</span>
            <span className="text-[10px] md:text-xs text-white/25 cursor-pointer hover:text-white/50 transition-colors">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

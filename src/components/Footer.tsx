import { motion } from "framer-motion";

const footerLinks = {
  shop: [
    { label: "New Releases", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Outerwear", href: "#" },
    { label: "Tops & Tees", href: "#" },
    { label: "Fragrances", href: "#" },
    { label: "Accessories", href: "#" },
  ],
  support: [
    { label: "Shipping & Returns", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Care Guide", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Discord", href: "#" },
    { label: "TikTok", href: "#" },
  ],
};

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: 3 }}
      transition={{ duration: 0.15 }}
      className="text-[#6E6E73] hover:text-[#111] text-sm transition-colors duration-200 block py-1"
    >
      {label}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold tracking-[0.15em] mb-3">
              REVIVAL OF 5
            </h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Premium apparel engineered for the modern era. High-density fabrics, zero compromises.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/50">Systems Normal</span>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
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
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Support
            </h4>
            <div className="space-y-0">
              {footerLinks.support.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <div className="space-y-0">
              {footerLinks.legal.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="space-y-0">
              {footerLinks.social.map((link) => (
                <FooterLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Stay in the loop</h4>
              <p className="text-xs text-white/50">Get notified about new drops and exclusive offers.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-l-full text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
              <button className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-r-full hover:bg-white/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 REVIVAL OF 5. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">USD $</span>
            <span className="text-xs text-white/20">|</span>
            <span className="text-xs text-white/40">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

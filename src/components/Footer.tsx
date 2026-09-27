import { motion } from "framer-motion";


interface FooterProps {
  onNavigate?: (page: "shipping" | "terms" | "privacy" | "contact") => void;
}

const footerLinks = {
  shop: [
    { label: "New Releases", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Shirts", href: "#" },
    { label: "Pants", href: "#" },
  ],
  support: [
    { label: "Shipping & Returns", href: "#", page: "shipping" as const },
    { label: "Size Guide", href: "#" },
    { label: "Contact Us", href: "#", page: "contact" as const },
  ],
  legal: [
    { label: "Privacy Policy", href: "#", page: "privacy" as const },
    { label: "Terms of Service", href: "#", page: "terms" as const },
    { label: "Cookie Policy", href: "#" },
  ],
};

function FooterLink({ label, href, onClick }: { label: string; href: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="text-white/50 hover:text-white text-xs md:text-sm transition-colors duration-200 block py-1.5"
    >
      {label}
    </motion.a>
  );
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, page: "shipping" | "terms" | "privacy" | "contact") => {
    e.preventDefault();
    onNavigate?.(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Section - Brand + Newsletter */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8 pb-8 md:pb-12 border-b border-white/10">
          <div>
            <h3 className="text-lg md:text-2xl font-bold tracking-[0.15em] mb-2">
              REVIVAL OF V
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
                <FooterLink
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  onClick={'page' in link && link.page ? (e) => handleLinkClick(e, link.page!) : undefined}
                />
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
                <FooterLink
                  key={link.label}
                  label={link.label}
                  href={link.href}
                  onClick={'page' in link && link.page ? (e) => handleLinkClick(e, link.page!) : undefined}
                />
              ))}
            </div>

            <h4 className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-3 md:mb-4">
              Follow
            </h4>
            <div className="flex gap-2 md:gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/rivivalofv/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/923131392018"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/5 hover:bg-[#25D366] flex items-center justify-center transition-all duration-300 group"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 md:w-[18px] md:h-[18px] text-white/60 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-[10px] md:text-xs text-white/25 text-center md:text-left">
            © 2026 REVIVAL OF V. All rights reserved.
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

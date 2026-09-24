import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";

interface HeaderProps {
  onAccountClick: () => void;
}

export default function Header({ onAccountClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  const navLinks = [
    "HOME",
    "NEW RELEASES",
    "BEST SELLERS",
    "SHIRTS",
    "PANTS",
    "SIZE GUIDE",
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-14 md:h-[72px] flex items-center justify-between">
          {/* Left: Burger + Brand Logo */}
          <div className="flex items-center gap-3 md:gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex flex-col gap-[4px] md:gap-[5px] p-1.5 md:p-2 hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <span className="block w-[18px] md:w-[22px] h-[1.5px] md:h-[2px] bg-[#111] transition-all duration-300 group-hover:w-[22px]" />
              <span className="block w-[12px] md:w-[16px] h-[1.5px] md:h-[2px] bg-[#111] transition-all duration-300 group-hover:w-[22px]" />
              <span className="block w-[18px] md:w-[22px] h-[1.5px] md:h-[2px] bg-[#111] transition-all duration-300 group-hover:w-[22px]" />
            </button>

            {/* Logo - Mobile: Image, Desktop: Text */}
            <a href="/" className="flex items-center">
              {/* Mobile Logo - Image */}
              <div className="md:hidden h-8 w-8 relative">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop&crop=center"
                  alt="REVIVAL OF 5"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full border border-black/10" />
              </div>
              
              {/* Desktop Logo - Text */}
              <span className="hidden md:block text-[#111] font-bold text-lg tracking-[0.15em] hover:opacity-70 transition-opacity">
                REVIVAL OF 5
              </span>
            </a>
          </div>

          {/* Right: Utility Icons */}
          <div className="flex items-center gap-1 md:gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Search"
            >
              <Search size={18} className="text-[#111] md:hidden" />
              <Search size={20} className="text-[#111] hidden md:block" />
            </button>
            <button
              onClick={onAccountClick}
              className="p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Account"
            >
              <User size={18} className="text-[#111] md:hidden" />
              <User size={20} className="text-[#111] hidden md:block" />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={18} className="text-[#111] md:hidden" />
              <ShoppingBag size={20} className="text-[#111] hidden md:block" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-black text-white text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-2xl"
          >
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-full flex flex-col">
              <div className="h-14 md:h-[72px] flex items-center justify-between">
                {/* Mobile: Image, Desktop: Text */}
                <div className="flex items-center">
                  <div className="md:hidden h-8 w-8 relative">
                    <img
                      src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop&crop=center"
                      alt="REVIVAL OF 5"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="hidden md:block text-[#111] font-bold text-lg tracking-[0.15em]">
                    REVIVAL OF 5
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-[#111]" />
                </button>
              </div>
              <div className="flex-1 flex flex-col md:flex-row">
                <nav className="flex-1 flex flex-col justify-center gap-3 md:gap-4 py-8">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link}
                      href="#"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-2xl md:text-5xl font-bold text-[#111] hover:text-[#6E6E73] transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link}
                    </motion.a>
                  ))}
                </nav>
                <div className="flex flex-col justify-end pb-8 md:pb-12 gap-3 text-xs md:text-sm text-[#6E6E73]">
                  <p className="font-semibold text-[#111] text-sm md:text-base">Customer Service</p>
                  <p className="hover:text-[#111] cursor-pointer transition-colors">Shipping & Returns</p>
                  <p className="hover:text-[#111] cursor-pointer transition-colors">Size Guide</p>
                  <p className="hover:text-[#111] cursor-pointer transition-colors">Contact Us</p>
                  <div className="mt-3 flex gap-4">
                    <span className="cursor-pointer hover:text-[#111] transition-colors">Instagram</span>
                    <span className="cursor-pointer hover:text-[#111] transition-colors">Twitter</span>
                    <span className="cursor-pointer hover:text-[#111] transition-colors">Discord</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 md:pt-32 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-black/10 pb-4">
                <Search size={18} className="text-[#6E6E73] shrink-0" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 text-base md:text-lg outline-none placeholder:text-[#6E6E73]"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={18} className="text-[#6E6E73] hover:text-[#111]" />
                </button>
              </div>
              <div className="pt-4">
                <p className="text-xs text-[#6E6E73] uppercase tracking-wider mb-3">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {["Heavyweight Hoodie", "Oversized Tee", "Cargo Pants", "Slim Jeans"].map((term) => (
                    <span
                      key={term}
                      className="px-3 py-1.5 bg-[#F5F5F7] rounded-full text-xs md:text-sm text-[#111] cursor-pointer hover:bg-black hover:text-white transition-colors"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

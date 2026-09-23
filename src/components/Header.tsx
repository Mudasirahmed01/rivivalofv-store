import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export default function Header() {
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

  const navLinks = [
    "HOME",
    "NEW RELEASES",
    "BEST SELLERS",
    "OUTERWEAR",
    "TOPS & TEES",
    "FRAGRANCES",
    "ACCESSORIES",
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
        <div className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Left: Burger + Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex flex-col gap-[5px] p-2 hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <span className="block w-[22px] h-[2px] bg-[#111] transition-all duration-300 group-hover:w-[22px]" />
              <span className="block w-[16px] h-[2px] bg-[#111] transition-all duration-300 group-hover:w-[22px]" />
              <span className="block w-[22px] h-[2px] bg-[#111] transition-all duration-300 group-hover:w-[22px]" />
            </button>
            <a
              href="/"
              className="text-[#111] font-bold text-lg tracking-[0.15em] hover:opacity-70 transition-opacity relative overflow-hidden"
            >
              REVIVAL OF 5
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            </a>
          </div>

          {/* Right: Utility Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Search"
            >
              <Search size={20} className="text-[#111]" />
            </button>
            <button
              className="p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Account"
            >
              <User size={20} className="text-[#111]" />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={20} className="text-[#111]" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center"
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
            <div className="max-w-[1440px] mx-auto px-6 h-full flex flex-col">
              <div className="h-[72px] flex items-center justify-between">
                <span className="text-[#111] font-bold text-lg tracking-[0.15em]">
                  REVIVAL OF 5
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-[#111]" />
                </button>
              </div>
              <div className="flex-1 flex">
                <nav className="flex-1 flex flex-col justify-center gap-4">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link}
                      href="#"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-4xl md:text-5xl font-bold text-[#111] hover:text-[#6E6E73] transition-colors duration-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link}
                    </motion.a>
                  ))}
                </nav>
                <div className="hidden md:flex flex-col justify-end pb-12 gap-4 text-sm text-[#6E6E73]">
                  <p className="font-semibold text-[#111]">Customer Service</p>
                  <p>Shipping & Returns</p>
                  <p>Size Guide</p>
                  <p>Contact Us</p>
                  <div className="mt-4 flex gap-4">
                    <span className="cursor-pointer hover:text-[#111]">Instagram</span>
                    <span className="cursor-pointer hover:text-[#111]">Twitter</span>
                    <span className="cursor-pointer hover:text-[#111]">Discord</span>
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
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl p-6 w-full max-w-xl mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-black/10 pb-4">
                <Search size={20} className="text-[#6E6E73]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 text-lg outline-none placeholder:text-[#6E6E73]"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X size={20} className="text-[#6E6E73] hover:text-[#111]" />
                </button>
              </div>
              <div className="pt-4">
                <p className="text-xs text-[#6E6E73] uppercase tracking-wider mb-3">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {["Heavyweight Hoodie", "Shell Jacket", "Noir EDP", "Cargo Pants"].map((term) => (
                    <span
                      key={term}
                      className="px-3 py-1.5 bg-[#F5F5F7] rounded-full text-sm text-[#111] cursor-pointer hover:bg-black hover:text-white transition-colors"
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

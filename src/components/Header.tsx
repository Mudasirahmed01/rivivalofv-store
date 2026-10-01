import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, X, Heart, ChevronDown } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import AdvancedSearch from "./AdvancedSearch";
import SizeGuide from "./SizeGuide";
import { Product } from "../types";
import BackendService from "../lib/backend";

interface HeaderProps {
  onAccountClick: () => void;
  onWishlistClick: () => void;
  onNavigate?: (page: string) => void;
  disabledCategories?: string[];
  disabledSections?: string[];
  disabledPages?: string[];
}

interface MenuEntry {
  id: string;
  label: string;
  destination: string;
  type: 'link' | 'dropdown';
  active: boolean;
  children: MenuEntry[];
}

const defaultMobileLogo = 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop&crop=center';

const defaultMenu = (categories: Array<{ key: string; label: string }>): MenuEntry[] => [
  { id: 'nav-home', label: 'HOME', destination: 'home', type: 'link', active: true, children: [] },
  { id: 'nav-new-releases', label: 'NEW RELEASES', destination: 'new-releases', type: 'link', active: true, children: [] },
  { id: 'nav-best-sellers', label: 'BEST SELLERS', destination: 'best-sellers', type: 'link', active: true, children: [] },
  { id: 'nav-categories', label: 'CATEGORIES', destination: '', type: 'dropdown', active: true, children: categories.map((category) => ({ id: `category-${category.key}`, label: category.label.toUpperCase(), destination: `category:${category.key}`, type: 'link', active: true, children: [] })) },
];

export default function Header({ onAccountClick, onWishlistClick, onNavigate, disabledCategories = [], disabledSections = [], disabledPages = [] }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuEntry[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [mobileHeaderLogo, setMobileHeaderLogo] = useState(defaultMobileLogo);
  const { toggleCart, getTotalItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const totalItems = getTotalItems();

  const handleProductClickFromSearch = (product: Product) => {
    setSearchOpen(false);
    window.location.hash = `#product/${product.slug}`;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    BackendService.getStoreSettings().then((settings) => {
      const activeCategories = (settings.catalog_options?.categories || []).filter((category: { active?: boolean }) => category.active);
      const savedMobileLogo = settings.mobile_header_logo?.url
        || (typeof settings.mobile_header_logo === 'string' ? settings.mobile_header_logo : '')
        || settings.header_logo?.url
        || (typeof settings.header_logo === 'string' ? settings.header_logo : '')
        || defaultMobileLogo;
      setMobileHeaderLogo(savedMobileLogo);
      setMenuItems(Array.isArray(settings.storefront_navigation?.items)
        ? settings.storefront_navigation.items
        : defaultMenu(activeCategories));
    });
  }, []);

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  const isDestinationVisible = (destination: string) => {
    if (disabledPages.includes(destination)) return false;
    if (destination === 'new-releases' && disabledSections.includes('new-releases')) return false;
    if (destination === 'best-sellers' && disabledSections.includes('best-sellers')) return false;
    if (destination.startsWith('category:')) {
      const category = destination.slice('category:'.length);
      return !disabledPages.includes('all-products') && !disabledCategories.includes(category);
    }
    return true;
  };
  const visibleMenuItems = menuItems.filter((item) => item.active && (item.type === 'dropdown'
    ? item.children.some((child) => child.active && isDestinationVisible(child.destination))
    : isDestinationVisible(item.destination)));

  const handleNavClick = (page: string) => {
    setMenuOpen(false);
    onNavigate?.(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              {mobileHeaderLogo ? (
                <div className="md:hidden h-8 w-8 overflow-hidden">
                  <img
                    src={mobileHeaderLogo}
                    alt="REVIVAL OF V"
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : null}

              {/* Desktop Logo - Text */}
              <span className="hidden md:block text-[#111] font-bold text-lg tracking-[0.15em] hover:opacity-70 transition-opacity">
                REVIVAL OF V
              </span>
            </a>
          </div>

          {/* Right: Utility Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            {!disabledSections.includes('search') && <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Search"
            >
              <Search size={18} className="text-[#111] md:hidden" />
              <Search size={20} className="text-[#111] hidden md:block" />
            </button>}
            {!disabledPages.includes('wishlist') && <button
              onClick={onWishlistClick}
              className="relative p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Wishlist"
            >
              <Heart size={18} className="text-[#111] md:hidden" />
              <Heart size={20} className="text-[#111] hidden md:block" />
              {wishlistItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-[9px] md:text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </button>}
            {(!disabledPages.includes('account') || !disabledPages.includes('auth')) && <button
              onClick={onAccountClick}
              className="p-2 hover:scale-108 transition-transform duration-200"
              aria-label="Account"
            >
              <User size={18} className="text-[#111] md:hidden" />
              <User size={20} className="text-[#111] hidden md:block" />
            </button>}
            {!disabledSections.includes('cart-drawer') && <button
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
            </button>}
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
                  {mobileHeaderLogo ? (
                    <div className="md:hidden h-8 w-8 overflow-hidden">
                      <img
                        src={mobileHeaderLogo}
                        alt="REVIVAL OF V"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}
                  <span className="hidden md:block text-[#111] font-bold text-lg tracking-[0.15em]">
                    REVIVAL OF V
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
                <nav className="flex-1 flex flex-col justify-center gap-3 overflow-y-auto py-8 md:gap-4">
                  {visibleMenuItems.map((item, index) => item.type === 'dropdown' ? (
                    <div key={item.id}>
                      <button
                        type="button"
                        onClick={() => setOpenDropdownId((open) => open === item.id ? null : item.id)}
                        aria-expanded={openDropdownId === item.id}
                        className="flex items-center gap-3 text-2xl font-bold text-[#111] transition-colors hover:text-[#6E6E73] md:text-5xl"
                      >
                        {item.label}
                        <ChevronDown className={`h-6 w-6 transition-transform md:h-8 md:w-8 ${openDropdownId === item.id ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {openDropdownId === item.id && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-3 overflow-hidden pl-4 pt-3 md:pl-8">
                          {item.children.filter((child) => child.active && isDestinationVisible(child.destination)).map((child) => <button key={child.id} type="button" onClick={() => handleNavClick(child.destination)} className="w-fit text-left text-sm font-semibold text-[#6E6E73] transition-colors hover:text-black md:text-lg">{child.label}</button>)}
                        </motion.div>}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button key={item.id} type="button" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="w-fit text-left text-2xl font-bold text-[#111] transition-colors hover:text-[#6E6E73] md:text-5xl" onClick={() => handleNavClick(item.destination)}>{item.label}</motion.button>
                  ))}
                </nav>
                <div className="flex flex-col justify-end pb-8 md:pb-12 gap-4">
                  <p className="text-xs text-[#6E6E73] uppercase tracking-wider">Follow Us</p>
                  <div className="flex gap-3">
                    {/* Instagram Icon */}
                    <a
                      href="https://www.instagram.com/rivivalofv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-[#111] group-hover:text-white transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>

                    {/* WhatsApp Icon */}
                    <a
                      href="https://wa.me/923131392018"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
                      aria-label="WhatsApp"
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-[#111] group-hover:text-white transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Search Modal */}
      {!disabledSections.includes('search') && <AdvancedSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onProductClick={handleProductClickFromSearch}
      />}

      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category="tops"
      />
    </>
  );
}

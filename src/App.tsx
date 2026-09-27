import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Features from "./components/Features";
import ScrollRevealText from "./components/ScrollRevealText";
import ProductGrid from "./components/ProductGrid";
import BentoGrid from "./components/BentoGrid";
import BestSellers from "./components/BestSellers";
import FeaturedProducts from "./components/FeaturedProducts";
import AllProductsPage from "./components/AllProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./components/CheckoutPage";
import WishlistPage from "./components/WishlistPage";
import RecentlyViewed from "./components/RecentlyViewed";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AccountPage from "./components/AccountPage";
import ShippingReturns from "./components/ShippingReturns";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import ContactPage from "./components/ContactPage";
import CookieConsent from "./components/CookieConsent";
import ToastContainer from "./components/ToastContainer";
import ErrorBoundary from "./components/ErrorBoundary";
import ThemeToggle from "./components/ThemeToggle";
import LiveChat from "./components/LiveChat";
import SocialProof from "./components/SocialProof";
import AuthPage from "./components/AuthPage";
import NewReleasesPage from "./components/NewReleasesPage";
import BestSellersPage from "./components/BestSellersPage";
import ShirtsPage from "./components/ShirtsPage";
import PantsPage from "./components/PantsPage";
import SmoothScroll from "./components/SmoothScroll";
import { Product } from "./types";
import { getProductSlugFromUrl, clearProductHash } from "./lib/shareUtils";
import BackendService from "./lib/backend";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "account" | "all-products" | "product-detail" | "checkout" | "wishlist" | "shipping" | "terms" | "privacy" | "contact" | "auth" | "new-releases" | "best-sellers" | "shirts" | "pants">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Check URL hash on mount and when it changes
  useEffect(() => {
    const checkUrlHash = async () => {
      const slug = getProductSlugFromUrl();
      if (slug) {
        const product = await BackendService.getProductBySlug(slug);
        if (product) {
          setSelectedProduct(product);
          setCurrentPage("product-detail");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    // Check on initial load
    checkUrlHash();

    // Listen for hash changes
    window.addEventListener("hashchange", checkUrlHash);
    return () => window.removeEventListener("hashchange", checkUrlHash);
  }, []);

  const handleBackToHome = () => {
    clearProductHash();
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllProducts = () => {
    setCurrentPage("all-products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToCheckout = () => {
    setCurrentPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToWishlist = () => {
    setCurrentPage("wishlist");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ErrorBoundary>
    <SmoothScroll>
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased">
      <Header
        onAccountClick={async () => {
          const currentUser = await BackendService.getCurrentUser();
          setCurrentPage(currentUser ? "account" : "auth");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onWishlistClick={handleGoToWishlist}
        onNavigate={(page) => setCurrentPage(page as any)}
      />
      <CartDrawer onCheckout={handleGoToCheckout} />
      <BackToTop />
      <ToastContainer />

      {currentPage === "home" && (
        <main>
          <Hero />
          <Marquee />
          <Features />
          <ScrollRevealText />
          <ProductGrid onProductClick={handleProductClick} />
          <BentoGrid onNavigate={(page) => setCurrentPage(page as any)} />
          <BestSellers onProductClick={handleProductClick} />
          <FeaturedProducts onViewAll={handleViewAllProducts} onProductClick={handleProductClick} />
          <RecentlyViewed onProductClick={handleProductClick} />
        </main>
      )}

      {currentPage === "account" && (
        <AccountPage onBack={handleBackToHome} />
      )}

      {currentPage === "all-products" && (
        <AllProductsPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "product-detail" && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onBack={handleBackToHome}
          onProductClick={handleProductClick}
        />
      )}

      {currentPage === "checkout" && (
        <CheckoutPage onBack={handleBackToHome} />
      )}

      {currentPage === "wishlist" && (
        <WishlistPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "shipping" && (
        <ShippingReturns onBack={handleBackToHome} />
      )}

      {currentPage === "terms" && (
        <TermsPage onBack={handleBackToHome} />
      )}

      {currentPage === "privacy" && (
        <PrivacyPage onBack={handleBackToHome} />
      )}

      {currentPage === "contact" && (
        <ContactPage onBack={handleBackToHome} />
      )}

      {currentPage === "auth" && (
        <AuthPage
          onBack={handleBackToHome}
          onLoginSuccess={() => setCurrentPage("account")}
        />
      )}

      {currentPage === "new-releases" && (
        <NewReleasesPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "best-sellers" && (
        <BestSellersPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "shirts" && (
        <ShirtsPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "pants" && (
        <PantsPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      <Footer onNavigate={setCurrentPage} />
      <CookieConsent />
      <ThemeToggle />
      <LiveChat />
      <SocialProof />
    </div>
    </SmoothScroll>
    </ErrorBoundary>
  );
}

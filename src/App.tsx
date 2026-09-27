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
import { getProductSlugFromUrl } from "./lib/shareUtils";
import BackendService from "./lib/backend";

type StorePage = "home" | "account" | "all-products" | "product-detail" | "checkout" | "wishlist" | "shipping" | "terms" | "privacy" | "contact" | "auth" | "new-releases" | "best-sellers" | "shirts" | "pants";

const storePages: StorePage[] = ["home", "account", "all-products", "checkout", "wishlist", "shipping", "terms", "privacy", "contact", "auth", "new-releases", "best-sellers", "shirts", "pants"];

const getPageFromUrl = (): StorePage => {
  const match = window.location.hash.match(/^#page\/([^/?]+)/);
  const page = match?.[1] as StorePage | undefined;
  return page && storePages.includes(page) ? page : "home";
};

const getCollectionCategoryFromUrl = () => {
  const hashQuery = window.location.hash.split('?')[1] || '';
  return new URLSearchParams(hashQuery).get('category') || 'all';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<StorePage>(getPageFromUrl);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const syncPageFromUrl = async () => {
      const slug = getProductSlugFromUrl();
      if (slug) {
        const product = await BackendService.getProductBySlug(slug);
        if (product) {
          setSelectedProduct(product);
          setCurrentPage("product-detail");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      setSelectedProduct(null);
      setCurrentPage(getPageFromUrl());
    };

    syncPageFromUrl();
    window.addEventListener("hashchange", syncPageFromUrl);
    window.addEventListener("popstate", syncPageFromUrl);
    return () => {
      window.removeEventListener("hashchange", syncPageFromUrl);
      window.removeEventListener("popstate", syncPageFromUrl);
    };
  }, []);

  const navigateToPage = (page: StorePage, category?: string) => {
    const nextUrl = page === "home"
      ? window.location.pathname + window.location.search
      : `#page/${page}${category ? `?category=${encodeURIComponent(category)}` : ''}`;
    window.history.pushState(null, "", nextUrl);
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleHomepageCategoryNavigation = (destination: string) => {
    if (destination.startsWith('category:')) {
      navigateToPage('all-products', destination.slice('category:'.length));
    } else {
      navigateToPage(destination as StorePage);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    navigateToPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllProducts = () => {
    navigateToPage("all-products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (product: Product) => {
    window.history.pushState(null, "", `#product/${product.slug}`);
    setSelectedProduct(product);
    setCurrentPage("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToCheckout = () => {
    navigateToPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToWishlist = () => {
    navigateToPage("wishlist");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ErrorBoundary>
    <SmoothScroll>
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased">
      <Header
        onAccountClick={async () => {
          const currentUser = await BackendService.getCurrentUser();
          navigateToPage(currentUser ? "account" : "auth");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onWishlistClick={handleGoToWishlist}
        onNavigate={(page) => navigateToPage(page as StorePage)}
      />
      <CartDrawer onCheckout={handleGoToCheckout} />
      <BackToTop />
      <ToastContainer />

      {currentPage === "home" && (
        <main>
          <Hero onExploreCollection={handleViewAllProducts} />
          <Marquee />
          <Features />
          <ScrollRevealText />
          <ProductGrid onProductClick={handleProductClick} onViewAll={handleViewAllProducts} />
          <BentoGrid onNavigate={handleHomepageCategoryNavigation} />
          <BestSellers onProductClick={handleProductClick} />
          <FeaturedProducts onViewAll={handleViewAllProducts} onProductClick={handleProductClick} />
          <RecentlyViewed onProductClick={handleProductClick} />
        </main>
      )}

      {currentPage === "account" && (
        <AccountPage onBack={handleBackToHome} />
      )}

      {currentPage === "all-products" && (
        <AllProductsPage initialCategory={getCollectionCategoryFromUrl()} onBack={handleBackToHome} onProductClick={handleProductClick} />
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
          onLoginSuccess={() => navigateToPage("account")}
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

      <Footer onNavigate={navigateToPage} />
      <CookieConsent />
      <ThemeToggle />
      <LiveChat />
      <SocialProof />
    </div>
    </SmoothScroll>
    </ErrorBoundary>
  );
}

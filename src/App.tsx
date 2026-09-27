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
import DynamicCatalogSections from "./components/DynamicCatalogSections";
import AuthPage from "./components/AuthPage";
import NewReleasesPage from "./components/NewReleasesPage";
import BestSellersPage from "./components/BestSellersPage";
import ShirtsPage from "./components/ShirtsPage";
import PantsPage from "./components/PantsPage";
import SmoothScroll from "./components/SmoothScroll";
import { Product } from "./types";
import { getProductSlugFromUrl } from "./lib/shareUtils";
import BackendService from "./lib/backend";
import { getStorefrontVisibility, isStorefrontCategoryVisible, StorefrontVisibility } from "./lib/storefrontVisibility";

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
  const [storefrontVisibility, setStorefrontVisibility] = useState<StorefrontVisibility>({ disabledCategories: [], disabledSections: [], disabledPages: [] });

  useEffect(() => {
    const syncPageFromUrl = async () => {
      const visibility = await getStorefrontVisibility();
      setStorefrontVisibility(visibility);
      const slug = getProductSlugFromUrl();
      if (slug) {
        const product = await BackendService.getProductBySlug(slug);
        if (product && !visibility.disabledPages.includes('product-detail') && isStorefrontCategoryVisible(product.category, visibility)) {
          setSelectedProduct(product);
          setCurrentPage("product-detail");
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (product) {
          setSelectedProduct(null);
          setCurrentPage("home");
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        return;
      }

      setSelectedProduct(null);
      const requestedPage = getPageFromUrl();
      const pageDisabled = (requestedPage === 'shirts' && !isStorefrontCategoryVisible('tops', visibility))
        || (requestedPage === 'pants' && !isStorefrontCategoryVisible('bottoms', visibility))
        || visibility.disabledPages.includes(requestedPage)
        || (requestedPage === 'new-releases' && visibility.disabledSections.includes('new-releases'))
        || (requestedPage === 'best-sellers' && visibility.disabledSections.includes('best-sellers'));
      setCurrentPage(pageDisabled ? 'home' : requestedPage);
      if (pageDisabled) window.history.replaceState(null, "", window.location.pathname + window.location.search);
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
    const requestedCategory = category?.startsWith('category:') ? category.slice('category:'.length) : category;
    const pageDisabled = (page === 'shirts' && !isStorefrontCategoryVisible('tops', storefrontVisibility))
      || (page === 'pants' && !isStorefrontCategoryVisible('bottoms', storefrontVisibility))
      || storefrontVisibility.disabledPages.includes(page)
      || (page === 'new-releases' && storefrontVisibility.disabledSections.includes('new-releases'))
      || (page === 'all-products' && requestedCategory && requestedCategory !== 'perfumes' && !isStorefrontCategoryVisible(requestedCategory, storefrontVisibility));
    const targetPage = pageDisabled ? 'home' : page;
    const nextUrl = targetPage === "home"
      ? window.location.pathname + window.location.search
      : `#page/${targetPage}${category && !pageDisabled ? `?category=${encodeURIComponent(category)}` : ''}`;
    window.history.pushState(null, "", nextUrl);
    setCurrentPage(targetPage);
    setSelectedProduct(null);
  };

  const handleHomepageCategoryNavigation = (destination: string) => {
    if (destination.startsWith('category:')) {
      navigateToPage('all-products', destination);
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
    if (storefrontVisibility.disabledPages.includes('product-detail') || !isStorefrontCategoryVisible(product.category, storefrontVisibility)) return;
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
      {!storefrontVisibility.disabledSections.includes('header') && <Header
        onAccountClick={async () => {
          const currentUser = await BackendService.getCurrentUser();
          navigateToPage(currentUser ? "account" : "auth");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onWishlistClick={handleGoToWishlist}
        onNavigate={handleHomepageCategoryNavigation}
        disabledCategories={storefrontVisibility.disabledCategories}
        disabledSections={storefrontVisibility.disabledSections}
        disabledPages={storefrontVisibility.disabledPages}
      />}
      {!storefrontVisibility.disabledSections.includes('cart-drawer') && <CartDrawer onCheckout={handleGoToCheckout} checkoutDisabled={storefrontVisibility.disabledPages.includes('checkout')} />}
      {!storefrontVisibility.disabledSections.includes('back-to-top') && <BackToTop />}
      {!storefrontVisibility.disabledSections.includes('toast-container') && <ToastContainer />}

      {currentPage === "home" && !storefrontVisibility.disabledPages.includes('home') && (
        <main>
          {!storefrontVisibility.disabledSections.includes('hero') && <Hero onExploreCollection={handleViewAllProducts} showExploreCollection={!storefrontVisibility.disabledPages.includes('all-products')} />}
          {!storefrontVisibility.disabledSections.includes('marquee') && <Marquee />}
          {!storefrontVisibility.disabledSections.includes('features') && <Features />}
          {!storefrontVisibility.disabledSections.includes('brand-statement') && <ScrollRevealText />}
          {!storefrontVisibility.disabledSections.includes('new-releases') && <ProductGrid onProductClick={handleProductClick} onViewAll={handleViewAllProducts} showViewAll={!storefrontVisibility.disabledPages.includes('all-products')} />}
          {!storefrontVisibility.disabledSections.includes('shop-by-category') && <BentoGrid onNavigate={handleHomepageCategoryNavigation} disabledPages={storefrontVisibility.disabledPages} />}
          {!storefrontVisibility.disabledSections.includes('best-sellers') && <BestSellers onProductClick={handleProductClick} />}
          {!storefrontVisibility.disabledSections.includes('complete-collection') && !storefrontVisibility.disabledPages.includes('all-products') && <FeaturedProducts onViewAll={handleViewAllProducts} onProductClick={handleProductClick} />}
          {!storefrontVisibility.disabledSections.includes('recently-viewed') && <RecentlyViewed onProductClick={handleProductClick} />}
          <DynamicCatalogSections onProductClick={handleProductClick} />
        </main>
      )}

      {currentPage === "account" && !storefrontVisibility.disabledPages.includes('account') && (
        <AccountPage onBack={handleBackToHome} />
      )}

      {currentPage === "all-products" && !storefrontVisibility.disabledPages.includes('all-products') && (
        <AllProductsPage initialCategory={getCollectionCategoryFromUrl()} onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "product-detail" && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onBack={handleBackToHome}
          onProductClick={handleProductClick}
        />
      )}

      {currentPage === "checkout" && !storefrontVisibility.disabledPages.includes('checkout') && (
        <CheckoutPage onBack={handleBackToHome} />
      )}

      {currentPage === "wishlist" && !storefrontVisibility.disabledPages.includes('wishlist') && (
        <WishlistPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "shipping" && !storefrontVisibility.disabledPages.includes('shipping') && (
        <ShippingReturns onBack={handleBackToHome} />
      )}

      {currentPage === "terms" && !storefrontVisibility.disabledPages.includes('terms') && (
        <TermsPage onBack={handleBackToHome} />
      )}

      {currentPage === "privacy" && !storefrontVisibility.disabledPages.includes('privacy') && (
        <PrivacyPage onBack={handleBackToHome} />
      )}

      {currentPage === "contact" && !storefrontVisibility.disabledPages.includes('contact') && (
        <ContactPage onBack={handleBackToHome} />
      )}

      {currentPage === "auth" && !storefrontVisibility.disabledPages.includes('auth') && (
        <AuthPage
          onBack={handleBackToHome}
          onLoginSuccess={() => navigateToPage("account")}
        />
      )}

      {currentPage === "new-releases" && !storefrontVisibility.disabledPages.includes('new-releases') && !storefrontVisibility.disabledSections.includes('new-releases') && (
        <NewReleasesPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "best-sellers" && !storefrontVisibility.disabledPages.includes('best-sellers') && !storefrontVisibility.disabledSections.includes('best-sellers') && (
        <BestSellersPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "shirts" && !storefrontVisibility.disabledPages.includes('shirts') && isStorefrontCategoryVisible('tops', storefrontVisibility) && (
        <ShirtsPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {currentPage === "pants" && !storefrontVisibility.disabledPages.includes('pants') && isStorefrontCategoryVisible('bottoms', storefrontVisibility) && (
        <PantsPage onBack={handleBackToHome} onProductClick={handleProductClick} />
      )}

      {!storefrontVisibility.disabledSections.includes('footer') && <Footer onNavigate={(page) => navigateToPage(page as StorePage)} disabledPages={storefrontVisibility.disabledPages} disabledCategories={storefrontVisibility.disabledCategories} disabledSections={storefrontVisibility.disabledSections} />}
      {!storefrontVisibility.disabledSections.includes('cookie-consent') && <CookieConsent />}
      {!storefrontVisibility.disabledSections.includes('theme-toggle') && <ThemeToggle />}
      {!storefrontVisibility.disabledSections.includes('live-chat') && <LiveChat />}
      {!storefrontVisibility.disabledSections.includes('social-proof') && <SocialProof />}
    </div>
    </SmoothScroll>
    </ErrorBoundary>
  );
}

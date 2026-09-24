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
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AccountPage from "./components/AccountPage";
import SmoothScroll from "./components/SmoothScroll";
import { Product } from "./types";
import { products } from "./data/products";
import { getProductSlugFromUrl, clearProductHash } from "./lib/shareUtils";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "account" | "all-products" | "product-detail" | "checkout">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Check URL hash on mount and when it changes
  useEffect(() => {
    const checkUrlHash = () => {
      const slug = getProductSlugFromUrl();
      if (slug) {
        const product = products.find((p) => p.slug === slug);
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

  return (
    <SmoothScroll>
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased">
      <Header onAccountClick={() => setCurrentPage("account")} />
      <CartDrawer onCheckout={handleGoToCheckout} />
      <BackToTop />
      
      {currentPage === "home" && (
        <main>
          <Hero />
          <Marquee />
          <Features />
          <ScrollRevealText />
          <ProductGrid onProductClick={handleProductClick} />
          <BentoGrid />
          <BestSellers onProductClick={handleProductClick} />
          <FeaturedProducts onViewAll={handleViewAllProducts} onProductClick={handleProductClick} />
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

      <Footer />
    </div>
    </SmoothScroll>
  );
}

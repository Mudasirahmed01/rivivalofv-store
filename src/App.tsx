import { useState } from "react";
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
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AccountPage from "./components/AccountPage";
import { Product } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "account" | "all-products" | "product-detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleBackToHome = () => {
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased">
      <Header onAccountClick={() => setCurrentPage("account")} />
      <CartDrawer />
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

      <Footer />
    </div>
  );
}

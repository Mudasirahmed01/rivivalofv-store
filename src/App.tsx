import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Features from "./components/Features";
import ScrollRevealText from "./components/ScrollRevealText";
import ProductGrid from "./components/ProductGrid";
import BentoGrid from "./components/BentoGrid";
import BestSellers from "./components/BestSellers";
import FeaturedProducts from "./components/FeaturedProducts";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased">
      <Header />
      <CartDrawer />
      <BackToTop />
      
      <main>
        {/* Section 1: Hero Carousel Banner */}
        <Hero />
        
        {/* Marquee Ticker */}
        <Marquee />
        
        {/* Features Strip */}
        <Features />
        
        {/* Section 2: Scroll-Driven Brand Statement */}
        <ScrollRevealText />
        
        {/* Section 3: New Releases Catalog */}
        <ProductGrid />
        
        {/* Section 4: Bento Grid Category Showcase */}
        <BentoGrid />
        
        {/* Section 5: Best Sellers Horizontal Carousel */}
        <BestSellers />
        
        {/* Section 6: Full Catalog with Category Filtering */}
        <FeaturedProducts />
      </main>

      <Footer />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '../types';
import BackendService from '../lib/backend';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from './SkeletonLoader';

interface PerfumesPageProps {
  onBack: () => void;
  onProductClick: (product: Product) => void;
}

export default function PerfumesPage({ onBack, onProductClick }: PerfumesPageProps) {
  const { products, loading } = useProducts();
  const [perfumeCategories, setPerfumeCategories] = useState<Array<{ key: string; label: string; subcategories: Array<{ key: string; label: string }> }>>([]);
  const [activeSubcategory, setActiveSubcategory] = useState('all');

  useEffect(() => {
    BackendService.getStoreSettings().then((settings) => {
      const categories = settings.catalog_options?.categories || [];
      setPerfumeCategories(categories
        .filter((category: { active?: boolean; showOnPerfumesPage?: boolean }) => category.active && category.showOnPerfumesPage)
        .map((category: { key: string; label: string; subcategories?: Array<{ key: string; label: string }> }) => ({
          key: category.key,
          label: category.label,
          subcategories: Array.isArray(category.subcategories) ? category.subcategories : [],
        })));
    });
  }, []);

  const perfumeCategoryKeys = perfumeCategories.map((category) => category.key);
  const perfumeProducts = products.filter((product) =>
    perfumeCategoryKeys.includes(product.category) &&
    (activeSubcategory === 'all' || product.subcategory === activeSubcategory)
  );
  const availableSubcategories = perfumeCategories.flatMap((category) => category.subcategories)
    .filter((subcategory, index, all) => all.findIndex((item) => item.key === subcategory.key) === index);

  return <div className="min-h-screen bg-[#FAFAFA] px-4 pb-16 pt-20 md:px-6 md:pt-28">
    <div className="mx-auto max-w-360">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-sm text-[#6E6E73] hover:text-black">
        <ArrowLeft size={15} /> Back
      </button>
      <div className="mb-8 md:mb-12">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6E6E73]">COLLECTION</p>
        <h1 className="mb-3 text-3xl font-bold text-[#111] md:text-5xl">Perfumes</h1>
        <p className="max-w-xl text-sm text-[#6E6E73]">Explore the fragrance collection.</p>
      </div>
      {availableSubcategories.length > 0 && <div className="mb-8 flex flex-wrap gap-2" aria-label="Filter perfumes by subcategory">
        {[{ key: 'all', label: 'All' }, ...availableSubcategories].map((subcategory) => <button
          key={subcategory.key}
          type="button"
          onClick={() => setActiveSubcategory(subcategory.key)}
          aria-pressed={activeSubcategory === subcategory.key}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${activeSubcategory === subcategory.key ? 'border-black bg-black text-white' : 'border-black/10 bg-white text-[#555] hover:border-black/40'}`}
        >{subcategory.label}</button>)}
      </div>}
      {loading ? <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <ProductCardSkeleton key={index} />)}</div>
        : perfumeProducts.length > 0 ? <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {perfumeProducts.map((product, index) => <div key={product.id} onClick={() => onProductClick(product)}><ProductCard product={product} index={index} /></div>)}
        </motion.div>
        : <p className="py-16 text-center text-sm text-[#6E6E73]">No products are assigned to this collection yet.</p>}
    </div>
  </div>;
}
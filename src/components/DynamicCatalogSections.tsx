import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import type { Product } from '../types';
import BackendService from '../lib/backend';
import { useProducts } from '../hooks/useProducts';
import { getStorefrontVisibility } from '../lib/storefrontVisibility';

interface CatalogPlacement {
  key: string;
  label: string;
  active: boolean;
}

interface DynamicCatalogSectionsProps {
  onProductClick: (product: Product) => void;
}

export default function DynamicCatalogSections({ onProductClick }: DynamicCatalogSectionsProps) {
  const { products } = useProducts();
  const [placements, setPlacements] = useState<CatalogPlacement[]>([]);
  const [disabledSections, setDisabledSections] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([BackendService.getStoreSettings(), getStorefrontVisibility()]).then(([settings, visibility]) => {
      setPlacements(settings.catalog_options?.placements || []);
      setDisabledSections(visibility.disabledSections);
    });
  }, []);

  const dynamicPlacements = placements.filter((placement) =>
    placement.active && !disabledSections.includes(placement.key) && !['none', 'new_release', 'best_seller'].includes(placement.key)
  );

  return <>
    {dynamicPlacements.map((placement) => {
      const sectionProducts = products.filter((product) => product.homepageSlot === placement.key);
      if (!sectionProducts.length) return null;
      return (
        <section key={placement.key} className="bg-white px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-360">
            <h2 className="mb-8 text-2xl font-bold text-[#111] md:mb-10 md:text-4xl">{placement.label}</h2>
            <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {sectionProducts.slice(0, 8).map((product, index) => (
                <div key={product.id} onClick={() => onProductClick(product)}>
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      );
    })}
  </>;
}
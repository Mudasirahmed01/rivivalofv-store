// ============================================
// CUSTOM HOOKS FOR PRODUCT DATA FETCHING
// ============================================
// Reusable hooks for fetching products from Supabase

import { useState, useEffect } from 'react';
import BackendService from '../lib/backend';
import { Product } from '../types';

// ============================================
// HOOK: useProducts
// ============================================
/**
 * Fetch all products from database
 * @returns { products, loading, error, refetch }
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BackendService.getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('❌ Error in useProducts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

// ============================================
// HOOK: useProductByCategory
// ============================================
/**
 * Fetch products by category
 * @param category - 'tops' | 'bottoms'
 * @returns { products, loading, error, refetch }
 */
export const useProductByCategory = (category: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BackendService.getProductsByCategory(category);
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products by category');
      console.error('❌ Error in useProductByCategory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category]);

  return { products, loading, error, refetch: fetchProducts };
};

// ============================================
// HOOK: useProductBySlot
// ============================================
/**
 * Fetch products by homepage slot
 * @param slot - 'new_release' | 'best_seller' | 'hero' | etc.
 * @returns { products, loading, error, refetch }
 */
export const useProductBySlot = (slot: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BackendService.getProductsBySlot(slot);
      setProducts(data);
    } catch (err) {
      setError('Failed to fetch products by slot');
      console.error('❌ Error in useProductBySlot:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slot) {
      fetchProducts();
    }
  }, [slot]);

  return { products, loading, error, refetch: fetchProducts };
};

// ============================================
// HOOK: useProductBySlug
// ============================================
/**
 * Fetch single product by slug
 * @param slug - Product slug
 * @returns { product, loading, error, refetch }
 */
export const useProductBySlug = (slug: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BackendService.getProductBySlug(slug);
      setProduct(data);
    } catch (err) {
      setError('Failed to fetch product');
      console.error('❌ Error in useProductBySlug:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error, refetch: fetchProduct };
};

// ============================================
// HOOK: useProductById
// ============================================
/**
 * Fetch single product by ID
 * @param id - Product ID
 * @returns { product, loading, error, refetch }
 */
export const useProductById = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await BackendService.getProductById(id);
      setProduct(data);
    } catch (err) {
      setError('Failed to fetch product');
      console.error('❌ Error in useProductById:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error, refetch: fetchProduct };
};

// ============================================
// HOOK: useRelatedProducts
// ============================================
/**
 * Fetch related products (same category, exclude current)
 * @param productId - Current product ID
 * @param category - Product category
 * @param limit - Number of products to fetch (default: 4)
 * @returns { products, loading, error }
 */
export const useRelatedProducts = (
  productId: string,
  category: string,
  limit: number = 4
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        setError(null);
        const allProducts = await BackendService.getProductsByCategory(category);
        const related = allProducts
          .filter((p) => p.id !== productId)
          .slice(0, limit);
        setProducts(related);
      } catch (err) {
        setError('Failed to fetch related products');
        console.error('❌ Error in useRelatedProducts:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId && category) {
      fetchRelated();
    }
  }, [productId, category, limit]);

  return { products, loading, error };
};

// ============================================
// HOOK: useFilteredProducts
// ============================================
/**
 * Fetch products with custom filters
 * @param filters - Filter object
 * @returns { products, loading, error, refetch }
 */
export const useFilteredProducts = (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let data = await BackendService.getProducts();

      // Apply filters
      if (filters.category) {
        data = data.filter((p) => p.category === filters.category);
      }

      if (filters.minPrice !== undefined) {
        data = data.filter((p) => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        data = data.filter((p) => p.price <= filters.maxPrice!);
      }

      if (filters.tags && filters.tags.length > 0) {
        data = data.filter((p) =>
          p.tags?.some((tag) => filters.tags!.includes(tag))
        );
      }

      setProducts(data);
    } catch (err) {
      setError('Failed to fetch filtered products');
      console.error('❌ Error in useFilteredProducts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, loading, error, refetch: fetchProducts };
};

// ============================================
// EXPORTS
// ============================================

export default {
  useProducts,
  useProductByCategory,
  useProductBySlot,
  useProductBySlug,
  useProductById,
  useRelatedProducts,
  useFilteredProducts,
};

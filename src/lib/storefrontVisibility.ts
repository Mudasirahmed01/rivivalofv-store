import BackendService from './backend';
import type { Product } from '../types';

export interface StorefrontVisibility {
  disabledCategories: string[];
  disabledSections: string[];
  disabledPages: string[];
}

export const getStorefrontVisibility = async (): Promise<StorefrontVisibility> => {
  const settings = await BackendService.getStoreSettings();
  const visibility = settings.storefront_visibility || {};
  return {
    disabledCategories: [
      ...(Array.isArray(visibility.disabled_categories) ? visibility.disabled_categories : []),
      ...(Array.isArray(settings.catalog_options?.categories) ? settings.catalog_options.categories.filter((category: { active?: boolean }) => !category.active).map((category: { key: string }) => category.key) : []),
    ],
    disabledSections: Array.isArray(visibility.disabled_sections) ? visibility.disabled_sections : [],
    disabledPages: Array.isArray(visibility.disabled_pages) ? visibility.disabled_pages : [],
  };
};

export const isStorefrontCategoryVisible = (category: string, visibility: StorefrontVisibility) =>
  !visibility.disabledCategories.includes(category);

export const filterVisibleProducts = (products: Product[], visibility: StorefrontVisibility) =>
  products.filter((product) => isStorefrontCategoryVisible(product.category, visibility));
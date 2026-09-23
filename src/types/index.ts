export interface ProductImage {
  url: string;
  altText: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  size: "S" | "M" | "L" | "XL" | "XXL";
  stockCount: number;
  sku: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  gsmRating?: string;
  fabricDetails: string;
  images: ProductImage[];
  category: "outerwear" | "tops" | "bottoms" | "accessories" | "fragrances";
  homepageSlot: "hero" | "new_release" | "bento_1" | "bento_2" | "bento_3" | "best_seller" | "none";
  variants: ProductVariant[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

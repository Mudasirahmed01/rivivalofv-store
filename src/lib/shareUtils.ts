const toUrlSegment = (value: string) => value
  .trim()
  .toLowerCase()
  .replace(/[_\s]+/g, '-')
  .replace(/[^a-z0-9-]+/g, '')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

export const getProductPath = (product: { slug: string; category: string; subcategory?: string }): string => {
  const category = ({ tops: 'shirts', bottoms: 'pants', perfumes: 'perfume' } as Record<string, string>)[product.category] || product.category;
  const segments = [category, product.subcategory, product.slug]
    .filter((segment): segment is string => Boolean(segment))
    .map((segment) => encodeURIComponent(toUrlSegment(segment)));
  return `/${segments.join('/')}/`;
};

export const getProductShareUrl = (productSlug: string, category?: string, subcategory?: string): string => {
  const path = category ? getProductPath({ slug: productSlug, category, subcategory }) : `/${encodeURIComponent(productSlug)}/`;
  return `${window.location.origin}${path}`;
};

// Support legacy hash links as well as clean category/product paths.
export const getProductSlugFromUrl = (): string | null => {
  const hash = window.location.hash;
  const match = hash.match(/^#product\/(.+)$/);
  if (match) return decodeURIComponent(match[1]);
  const segments = window.location.pathname.split('/').filter(Boolean);
  if (segments.length < 2) return null;
  try {
    return decodeURIComponent(segments[segments.length - 1]);
  } catch {
    return segments[segments.length - 1];
  }
};

// Helper function to clear URL hash
export const clearProductHash = (): void => {
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
};

// Share function with fallbacks
export const shareProduct = async (product: {
  title: string;
  description: string;
  slug: string;
  price: number;
}) => {
  const shareUrl = getProductShareUrl(product.slug);
  const shareData = {
    title: `${product.title} — REVIVAL OF V`,
    text: `Check out ${product.title} — Rs ${product.price.toLocaleString("en-PK")} at REVIVAL OF V. ${product.description.substring(0, 100)}...`,
    url: shareUrl,
  };

  // Try Web Share API first (mobile native share)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { success: true, method: "native" };
    } catch (err) {
      // User cancelled
      return { success: false, method: "cancelled" };
    }
  } else {
    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      return { success: true, method: "clipboard" };
    } catch (err) {
      // Fallback for older browsers
      try {
        const input = document.createElement("input");
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        return { success: true, method: "clipboard-fallback" };
      } catch (fallbackErr) {
        return { success: false, method: "error" };
      }
    }
  }
};

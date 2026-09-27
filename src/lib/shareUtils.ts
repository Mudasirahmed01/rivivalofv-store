// Helper function to generate shareable product URL
export const getProductShareUrl = (productSlug: string): string => {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#product/${productSlug}`;
};

// Helper function to parse URL hash and get product slug
export const getProductSlugFromUrl = (): string | null => {
  const hash = window.location.hash;
  const match = hash.match(/^#product\/(.+)$/);
  return match ? match[1] : null;
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

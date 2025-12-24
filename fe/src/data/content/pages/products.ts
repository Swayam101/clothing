// ============================================
// PRODUCTS PAGE CONTENT
// Edit this file to customize the Products page
// ============================================

export const PRODUCTS_PAGE = {
  // Page Header
  header: {
    title: 'Shop Collection',
    subtitle: 'Discover quality pieces crafted for style and comfort',
  },

  // Loading State
  loading: {
    message: 'Loading products...',
  },

  // Empty State
  empty: {
    message: 'New arrivals coming soon! Check back for fresh styles.',
  },

  // Error State
  error: {
    title: 'Unable to load products',
  },

  // Pagination
  pagination: {
    itemsPerPage: 12,
    showingText: 'Showing',
    ofText: 'of',
    productsText: 'products',
    pageText: 'Page',
  },
} as const;

// Product Detail Page
export const PRODUCT_DETAIL = {
  // Breadcrumb
  breadcrumb: {
    home: 'HOME',
    shop: 'SHOP',
  },

  // Loading State
  loading: {
    message: 'Loading product details...',
  },

  // Error State
  error: {
    title: 'Error Loading Product',
    backText: 'Back to Shop',
  },

  // Not Found State
  notFound: {
    title: 'Product Not Found',
    backText: 'Back to Shop',
  },

  // Size Selection
  sizeSelection: {
    alertMessage: 'Please select your size before adding to cart!',
  },
} as const;

import type { StrapiProduct } from '../services/products';
import type { Product } from '../../types/product';
import { API_BASE_URL } from '../constants';

// Helper function to get full image URL
const getImageUrl = (url: string): string => {
  // If URL is already absolute (starts with http:// or https://), use as-is
  // This handles external URLs like Unsplash (used in mock data)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If URL is relative (starts with /), prepend the API base URL
  // This handles Strapi uploads like /uploads/image.jpg
  // Remove '/api' from base URL since uploads are served from root
  const baseUrl = API_BASE_URL.replace('/api', '');
  return `${baseUrl}${url}`;
};

// Transform Strapi product to app Product interface
export const transformStrapiProduct = (strapiProduct: StrapiProduct): Product => {
  // Generate slug from title (lowercase, replace spaces with hyphens)
  const slug = strapiProduct.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Extract image URLs from Strapi image array
  const images = strapiProduct.image.map((img) => {
    return getImageUrl(img.url);
  });

  return {
    id: strapiProduct.documentId,
    name: strapiProduct.title,
    slug: slug,
    price: strapiProduct.price,
    images: images,
    sizes: strapiProduct.size ? [strapiProduct.size] : [],
    description: strapiProduct.description || '',
    fabric: strapiProduct.fabric || '',
    fit: strapiProduct.style || '', // Using 'style' as 'fit'
    care: strapiProduct.condition || '', // Using 'condition' as 'care'
    featured: strapiProduct.featured || false,
  };
};

// Transform array of Strapi products
export const transformStrapiProducts = (strapiProducts: StrapiProduct[]): Product[] => {
  return strapiProducts.map(transformStrapiProduct);
};

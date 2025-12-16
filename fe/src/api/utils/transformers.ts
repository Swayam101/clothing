import type { StrapiProduct } from '../services/products';
import type { Product } from '../../types/product';

// Transform Strapi product to app Product interface
export const transformStrapiProduct = (strapiProduct: StrapiProduct): Product => {
  // Generate slug from title (lowercase, replace spaces with hyphens)
  const slug = strapiProduct.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Extract image URLs from Strapi image array
  const images = strapiProduct.image.map((img) => {
    // Use the full URL with localhost:1337 prefix
    return `http://localhost:1337${img.url}`;
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

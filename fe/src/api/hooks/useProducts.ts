import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductById, getProductBySlug } from '../services/products';
import type { ProductsQueryParams } from '../../types/api';

// Query keys
export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  list: (params?: ProductsQueryParams) => [...PRODUCT_QUERY_KEYS.all, 'list', params || {}] as const,
  detail: (productId: string) => [...PRODUCT_QUERY_KEYS.all, 'detail', productId] as const,
  detailBySlug: (slug: string) => [...PRODUCT_QUERY_KEYS.all, 'detail-slug', slug] as const,
} as const;

// Get products hook
export const useProducts = (params?: ProductsQueryParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.list(params),
    queryFn: () => getProducts(params),
    enabled,
  });
};

// Get single product hook (by ID)
export const useProduct = (
  productId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(productId),
    queryFn: () => getProductById(productId),
    enabled: !!productId && enabled,
  });
};

// Get single product hook (by slug)
export const useProductBySlug = (
  slug: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detailBySlug(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug && enabled,
  });
};

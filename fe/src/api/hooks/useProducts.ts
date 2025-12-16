import { useQuery } from '@tanstack/react-query';
import { getProducts, getProduct } from '../services/products';
import type { StrapiProductsResponse, StrapiProductResponse } from '../services/products';

// Query keys
export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  list: (params?: Record<string, any>) => [...PRODUCT_QUERY_KEYS.all, 'list', params || {}] as const,
  detail: (documentId: string) => [...PRODUCT_QUERY_KEYS.all, 'detail', documentId] as const,
} as const;

// Strapi-compatible product query parameters
export interface ProductsQueryParams {
  pagination?: {
    page?: number;
    pageSize?: number;
    withCount?: boolean;
  };
  filters?: {
    title?: {
      $containsi?: string;
    };
    color?: {
      $eq?: string;
    };
    size?: {
      $eq?: string;
    };
    price?: {
      $gte?: number;
      $lte?: number;
    };
    featured?: {
      $eq?: boolean;
    };
  };
  sort?: string[];
  populate?: string | string[];
}

// Get products hook with Strapi filters and pagination
export const useProducts = (params?: ProductsQueryParams, enabled: boolean = true) => {
  return useQuery<StrapiProductsResponse>({
    queryKey: PRODUCT_QUERY_KEYS.list(params),
    queryFn: () => getProducts(params),
    enabled,
  });
};

// Query parameters for single product
export interface ProductQueryParams {
  populate?: string | string[];
}

// Get single product hook
export const useProduct = (
  documentId: string,
  params?: ProductQueryParams,
  enabled: boolean = true
) => {
  return useQuery<StrapiProductResponse>({
    queryKey: PRODUCT_QUERY_KEYS.detail(documentId),
    queryFn: () => getProduct(documentId, params),
    enabled: !!documentId && enabled,
  });
};

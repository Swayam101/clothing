import { apiClient } from '../config';
import { API_ENDPOINTS } from '../constants';

// Strapi API response types
export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  large?: StrapiImageFormat;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats: StrapiImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: null;
  provider: string;
  provider_metadata?: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiProduct {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  color: string;
  condition: string;
  price: number;
  instock: number;
  fabric: string;
  description: string;
  style: string;
  size: string;
  featured?: boolean | null;
  image: StrapiImage[];
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination: StrapiPagination;
}

export interface StrapiProductsResponse {
  data: StrapiProduct[];
  meta: StrapiMeta;
}

export interface StrapiProductResponse {
  data: StrapiProduct;
  meta: Record<string, never>;
}

// Get all products with Strapi filters and pagination
export const getProducts = async (params?: {
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
}): Promise<StrapiProductsResponse> => {
  const queryParams: Record<string, any> = {};

  // Handle pagination
  if (params?.pagination) {
    if (params.pagination.page) queryParams['pagination[page]'] = params.pagination.page;
    if (params.pagination.pageSize) queryParams['pagination[pageSize]'] = params.pagination.pageSize;
    if (params.pagination.withCount !== undefined) queryParams['pagination[withCount]'] = params.pagination.withCount;
  }

  // Handle filters
  if (params?.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([operator, val]) => {
          queryParams[`filters[${key}][${operator}]`] = val;
        });
      } else {
        queryParams[`filters[${key}][$eq]`] = value;
      }
    });
  }

  // Handle sorting
  if (params?.sort && params.sort.length > 0) {
    params.sort.forEach((sortField, index) => {
      queryParams[`sort[${index}]`] = sortField;
    });
  }

  // Handle populate
  if (params?.populate) {
    if (Array.isArray(params.populate)) {
      params.populate.forEach((field, index) => {
        queryParams[`populate[${index}]`] = field;
      });
    } else {
      queryParams['populate'] = params.populate;
    }
  }

  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS, { params: queryParams });
  return response.data;
};

// Get single product by documentId
export const getProduct = async (
  documentId: string,
  params?: {
    populate?: string | string[];
  }
): Promise<StrapiProductResponse> => {
  const queryParams: Record<string, any> = {};

  // Handle populate
  if (params?.populate) {
    if (Array.isArray(params.populate)) {
      params.populate.forEach((field, index) => {
        queryParams[`populate[${index}]`] = field;
      });
    } else {
      queryParams['populate'] = params.populate;
    }
  }

  const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${documentId}`, { params: queryParams });
  return response.data;
};

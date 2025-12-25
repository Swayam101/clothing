import { apiClient } from '../config';
import { API_ENDPOINTS } from '../constants';
import type { ProductsQueryParams, ProductsResponse, ProductResponse } from '../../types/api';

// Get all products with filtering and pagination
export const getProducts = async (params?: ProductsQueryParams): Promise<ProductsResponse> => {
  const queryParams: Record<string, any> = {};

  // Map query parameters
  if (params?.page) queryParams.page = params.page;
  if (params?.limit) queryParams.limit = params.limit;
  if (params?.search) queryParams.search = params.search;
  if (params?.sort) queryParams.sort = params.sort;
  if (params?.style) queryParams.style = params.style;
  if (params?.color) queryParams.color = params.color;
  if (params?.size) queryParams.size = params.size;
  if (params?.fabric) queryParams.fabric = params.fabric;
  if (params?.condition) queryParams.condition = params.condition;
  if (params?.featured !== undefined) queryParams.featured = params.featured;
  if (params?.minPrice) queryParams.minPrice = params.minPrice;
  if (params?.maxPrice) queryParams.maxPrice = params.maxPrice;
  if (params?.inStock !== undefined) queryParams.inStock = params.inStock;
  if (params?.isActive !== undefined) queryParams.isActive = params.isActive;

  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS, { params: queryParams });
  return response.data;
};

// Get single product by ID
export const getProductById = async (productId: string): Promise<ProductResponse> => {
  const response = await apiClient.get(`${API_ENDPOINTS.PRODUCT}/${productId}`);
  return response.data;
};

// Get single product by slug
export const getProductBySlug = async (slug: string): Promise<ProductResponse> => {
  const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS}/slug/${slug}`);
  return response.data;
};

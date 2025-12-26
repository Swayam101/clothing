// Product Types for New Backend API

export interface Product {
  _id: string;
  title: string;
  slug: string;
  color: string;
  condition: string;
  price: number;
  instock: boolean;
  fabric: string;
  description: string;
  style: string;
  size: string;
  featured: boolean;
  image: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  style?: string;
  color?: string;
  size?: string;
  fabric?: string;
  condition?: string;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isActive?: boolean;
}

export interface ProductsResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface ApiError {
  success: false;
  error: string;
}


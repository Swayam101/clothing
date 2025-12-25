// API Constants
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
  },
  // Product endpoints (public)
  PRODUCTS: '/products',
  PRODUCT: '/products',
  // Order endpoints (user)
  ORDERS: {
    CREATE: '/orders',
    MY_ORDERS: '/orders',
    GET_ORDER: '/orders',
    VERIFY: '/orders/verify',
  },
} as const;

// Request timeout in milliseconds
export const API_TIMEOUT = 10000;

// API Constants
export const API_BASE_URL = 'http://localhost:1337/api';

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT: '/products',
  NEWSLETTER: '/newsletter/subscribe',
  CONTACT: '/contact',
  ORDERS: '/orders',
} as const;

// Request timeout in milliseconds
export const API_TIMEOUT = 10000;

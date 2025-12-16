// API Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api';

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

// Mock data toggle - set to true to use mock data instead of API
// Can be controlled via environment variable VITE_USE_MOCK_DATA
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || false;

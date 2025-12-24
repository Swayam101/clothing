// Export query client
export { queryClient } from './queryClient';

// Export configuration
export { apiClient } from './config';
export { API_BASE_URL, API_ENDPOINTS } from './constants';

// Export services
export * from './services/products';
export * from './services/auth';
export * from './services/orders';

// Export hooks
export * from './hooks/useProducts';
export * from './hooks/useOrders';

// Export specific hooks for convenience
export { useProductBySlug } from './hooks/useProducts';

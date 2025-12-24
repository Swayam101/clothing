import axios, { type AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './constants';

// Create axios instance with base configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token retrieval function from Zustand persisted storage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) return null;

    const { state } = JSON.parse(authStorage);

    // Validate token exists and is a string
    if (!state?.token || typeof state.token !== 'string') {
      return null;
    }

    // Basic token format validation (JWT tokens have 3 parts separated by dots)
    const tokenParts = state.token.split('.');
    if (tokenParts.length !== 3) {
      console.warn('Invalid token format detected, clearing auth state');
      localStorage.removeItem('auth-storage');
      return null;
    }

    return state.token;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    // Clear potentially corrupted auth storage
    localStorage.removeItem('auth-storage');
    return null;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token to requests
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth state clearing function - clears localStorage and redirects if needed
const clearAuthState = (redirectToLogin: boolean = true) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('auth-storage');
    
    // Only redirect if not already on auth pages
    if (redirectToLogin) {
      const currentPath = window.location.pathname;
      const authPages = ['/login', '/register', '/forgot-password'];
      
      if (!authPages.includes(currentPath)) {
        window.location.href = '/login';
      }
    }
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
};

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here - only on client side
    if (typeof window !== 'undefined') {
      if (error.response?.status === 401) {
        // Handle unauthorized - token is invalid or expired
        console.warn('Unauthorized request detected, clearing auth state');
        clearAuthState(true);
      } else if (error.response?.status === 403) {
        // Handle forbidden - user doesn't have permission for this resource
        // Don't clear auth state - user is authenticated but lacks permissions
        console.warn('Forbidden request - insufficient permissions');
      } else if (error.response?.status >= 500) {
        // Handle server errors - don't clear auth state
        console.error('Server error:', error.response?.data);
      } else if (!error.response) {
        // Handle network errors
        console.error('Network error:', error.message);
      }
    }

    return Promise.reject(error);
  }
);

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

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request preprocessing here
    // For example: adding auth tokens, request IDs, etc.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Add any response preprocessing here
    return response;
  },
  (error) => {
    // Handle common errors here
    // For example: token refresh, error logging, etc.

    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized request');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response?.data);
    } else if (!error.response) {
      // Handle network errors
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

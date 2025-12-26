import { apiClient } from '../config';
import { API_ENDPOINTS } from '../constants';
import type {
  CreateOrderData,
  CreateOrderResponse,
  OrdersResponse,
  OrderResponse,
  OrderVerificationResponse,
} from '../../types/order';

// Create new order
export const createOrder = async (orderData: CreateOrderData): Promise<CreateOrderResponse> => {
  const response = await apiClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
  return response.data;
};

// Get my orders with pagination and filters
export const getMyOrders = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
}): Promise<OrdersResponse> => {
  console.log('🌐 API Service - getMyOrders called with params:', params);
  
  const queryParams: Record<string, any> = {};

  if (params?.page) queryParams.page = params.page;
  if (params?.limit) queryParams.limit = params.limit;
  if (params?.status) queryParams.status = params.status;
  if (params?.paymentStatus) queryParams.paymentStatus = params.paymentStatus;

  console.log('🌐 API Service - Built query params:', queryParams);
  console.log('🌐 API Service - API endpoint:', API_ENDPOINTS.ORDERS.MY_ORDERS);

  const response = await apiClient.get(API_ENDPOINTS.ORDERS.MY_ORDERS, { params: queryParams });
  
  console.log('✅ API Service - Response received:', {
    status: response.status,
    hasData: !!response.data,
    dataKeys: response.data ? Object.keys(response.data) : null,
    responseData: response.data,
  });
  
  return response.data;
};

// Get specific order by ID
export const getOrderById = async (orderId: string): Promise<OrderResponse> => {
  const response = await apiClient.get(`${API_ENDPOINTS.ORDERS.GET_ORDER}/${orderId}`);
  return response.data;
};

// Verify order payment status
export const verifyOrder = async (orderId: string): Promise<OrderVerificationResponse> => {
  const response = await apiClient.get(`${API_ENDPOINTS.ORDERS.VERIFY}/${orderId}`);
  return response.data;
};


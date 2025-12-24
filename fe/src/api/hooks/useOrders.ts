import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as orderService from '../services/orders';
import type { CreateOrderData } from '../../types/order';

// Query keys
export const ORDER_QUERY_KEYS = {
  all: ['orders'] as const,
  myOrders: (params?: Record<string, any>) => [...ORDER_QUERY_KEYS.all, 'my', params || {}] as const,
  order: (orderId: string) => [...ORDER_QUERY_KEYS.all, 'detail', orderId] as const,
} as const;

// Get my orders
export const useMyOrders = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
}, enabled: boolean = true) => {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.myOrders(params),
    queryFn: () => orderService.getMyOrders(params),
    enabled,
  });
};

// Get single order
export const useOrder = (orderId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ORDER_QUERY_KEYS.order(orderId),
    queryFn: () => orderService.getOrderById(orderId),
    enabled: !!orderId && enabled,
  });
};

// Create order mutation
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderData) => orderService.createOrder(orderData),
    onSuccess: () => {
      // Invalidate my orders list
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEYS.all });
    },
  });
};


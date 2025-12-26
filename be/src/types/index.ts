import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// User type
export interface IUser {
  _id: string;
  firebaseUid: string;
  email: string;
  name?: string;
  phone?: string;
  profilePicture?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  provider?: 'google' | 'facebook';
  createdAt: Date;
  updatedAt: Date;
}

// Google Auth request type
export interface GoogleAuthRequest {
  idToken: string;
}

// JWT payload type
export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
  role: 'user' | 'admin';
}

// Extended Express Request with user
export interface AuthRequest extends Request {
  user?: IJwtPayload;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    role: 'user' | 'admin';
  };
  token: string;
}

// Product types
export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  color: string;
  condition: string;
  price: number;
  instock: number;
  fabric: string;
  description: string;
  style: string;
  size: string;
  featured?: boolean | null;
  image: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductRequest {
  title: string;
  color: string;
  condition: string;
  price: number;
  instock: number;
  fabric: string;
  description: string;
  style: string;
  size: string;
  featured?: boolean | null;
  image?: string[];
}

export interface UpdateProductRequest {
  title?: string;
  color?: string;
  condition?: string;
  price?: number;
  instock?: number;
  fabric?: string;
  description?: string;
  style?: string;
  size?: string;
  featured?: boolean | null;
  image?: string[];
  isActive?: boolean;
}

export interface ProductQueryParams {
  style?: string;
  color?: string;
  size?: string;
  condition?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ProductResponse {
  products: IProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UpdateStockRequest {
  instock: boolean;
}

// Order types
export interface OrderItem {
  product: string;
  title: string;
  color: string;
  size: string;
  fabric: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IOrder {
  _id: string;
  orderId: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  cashfreeOrderId?: string;
  paymentSessionId?: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  trackingNumber?: string;
  shippingCarrier?: string;
  customerNotes?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create Order Request
 * Required: Product IDs, Delivery Address, Phone
 * Quantity is ALWAYS 1 for each product
 */
export interface CreateOrderRequest {
  items: string[]; // Product IDs
  deliveryAddress: OrderAddress; // Delivery address
  phone: string; // Contact phone (10 digits)
}

export interface UpdateOrderRequest {
  status?: string;
  paymentStatus?: string;
  trackingNumber?: string;
  shippingCarrier?: string;
  adminNotes?: string;
}

export interface OrderQueryParams {
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}

export interface OrderResponse {
  orders: IOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  ordersByPaymentStatus: Record<string, number>;
}

// Payment types
export interface CashfreeOrderResponse {
  order_id: string;
  payment_session_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
  customer_details: {
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
  };
  order_meta: {
    return_url: string;
  };
  created_at: string;
}


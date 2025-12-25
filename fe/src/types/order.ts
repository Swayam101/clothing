// Order Types for New Backend API

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  product: string; // Product ID
  quantity: number;
  title?: string;
  color?: string;
  size?: string;
  fabric?: string;
  price?: number;
  image?: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  _id: string;
  orderId: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  customer: OrderCustomer;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  cashfreeOrderId?: string;
  paymentSessionId?: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  trackingNumber?: string | null;
  shippingCarrier?: string | null;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentSession {
  payment_session_id: string;
  order_id: string;
}

export interface CreateOrderData {
  items: string[]; // Array of product IDs (server expects strings, not objects)
  deliveryAddress: Address; // Server expects deliveryAddress, not shippingAddress
  billingAddress: Address;
  phone: string; // Phone number is required by server
  paymentMethod: 'cashfree';
  customerNotes?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: Order & {
    paymentSession: PaymentSession;
  };
}

export interface OrdersResponse {
  success: boolean;
  data: {
    orders: Order[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface OrderResponse {
  success: boolean;
  data: Order;
}

export interface OrderVerificationResponse {
  success: boolean;
  data: {
    orderId: string;
    paymentStatus: Order['paymentStatus'];
    orderStatus: Order['status'];
    totalAmount: number;
  };
}

export interface OrderError {
  success: false;
  error: string;
}


import * as yup from 'yup';

/**
 * Order item validation schema
 */
const orderItemSchema = yup.object({
  product: yup
    .string()
    .required('Product ID is required')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity cannot exceed 100'),
});

/**
 * Address validation schema
 */
const addressSchema = yup.object({
  street: yup
    .string()
    .required('Street address is required')
    .trim()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address must not exceed 200 characters'),
  city: yup
    .string()
    .required('City is required')
    .trim()
    .max(100, 'City must not exceed 100 characters'),
  state: yup
    .string()
    .required('State is required')
    .trim()
    .max(100, 'State must not exceed 100 characters'),
  zipCode: yup
    .string()
    .required('Zip code is required')
    .trim()
    .matches(/^[0-9]{6}$/, 'Zip code must be exactly 6 digits'),
  country: yup
    .string()
    .required('Country is required')
    .trim()
    .max(100, 'Country must not exceed 100 characters')
    .default('India'),
});

/**
 * Customer information validation schema
 */
const customerSchema = yup.object({
  name: yup
    .string()
    .required('Customer name is required')
    .trim()
    .max(100, 'Name must not exceed 100 characters'),
  email: yup
    .string()
    .required('Customer email is required')
    .email('Please provide a valid email address')
    .lowercase()
    .trim(),
  phone: yup
    .string()
    .required('Customer phone is required')
    .trim()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
});

/**
 * Create order validation schema
 */
export const createOrderSchema = yup.object({
  items: yup
    .array()
    .of(orderItemSchema)
    .required('Order items are required')
    .min(1, 'Order must contain at least one item'),
  customer: customerSchema.required('Customer information is required'),
  shippingAddress: addressSchema.required('Shipping address is required'),
  billingAddress: addressSchema.required('Billing address is required'),
  paymentMethod: yup
    .string()
    .required('Payment method is required')
    .oneOf(
      ['cashfree', 'card', 'upi', 'netbanking', 'wallet'],
      'Invalid payment method'
    ),
  customerNotes: yup
    .string()
    .optional()
    .trim()
    .max(500, 'Customer notes must not exceed 500 characters'),
});

/**
 * Update order validation schema (admin)
 */
export const updateOrderSchema = yup.object({
  status: yup
    .string()
    .optional()
    .oneOf(
      ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      'Invalid order status'
    ),
  paymentStatus: yup
    .string()
    .optional()
    .oneOf(
      ['pending', 'paid', 'failed', 'refunded'],
      'Invalid payment status'
    ),
  trackingNumber: yup
    .string()
    .optional()
    .trim()
    .max(100, 'Tracking number must not exceed 100 characters'),
  shippingCarrier: yup
    .string()
    .optional()
    .trim()
    .max(100, 'Shipping carrier must not exceed 100 characters'),
  adminNotes: yup
    .string()
    .optional()
    .trim()
    .max(1000, 'Admin notes must not exceed 1000 characters'),
});

/**
 * Get orders query validation schema
 */
export const getOrdersQuerySchema = yup.object({
  page: yup
    .number()
    .optional()
    .integer('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .default(1),
  limit: yup
    .number()
    .optional()
    .integer('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit must not exceed 100')
    .default(10),
  status: yup
    .string()
    .optional()
    .oneOf(
      ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      'Invalid order status'
    ),
  paymentStatus: yup
    .string()
    .optional()
    .oneOf(
      ['pending', 'paid', 'failed', 'refunded'],
      'Invalid payment status'
    ),
  sortBy: yup
    .string()
    .optional()
    .oneOf(['createdAt', 'totalAmount', 'status'], 'Invalid sort field')
    .default('createdAt'),
  sortOrder: yup
    .string()
    .optional()
    .oneOf(['asc', 'desc'], 'Sort order must be asc or desc')
    .default('desc'),
});

/**
 * MongoDB ObjectId validation schema for params
 */
export const orderIdParamSchema = yup.object({
  id: yup
    .string()
    .required('Order ID is required')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid order ID format'),
});

/**
 * Verify payment validation schema
 */
export const verifyPaymentSchema = yup.object({
  orderId: yup
    .string()
    .required('Order ID is required')
    .trim(),
});


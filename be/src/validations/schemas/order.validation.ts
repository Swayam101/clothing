import * as yup from 'yup';

/**
 * Delivery address validation
 */
const deliveryAddressSchema = yup.object({
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
 * Create Order Schema
 * Required: Product IDs, Delivery Address, Phone
 * Quantity is ALWAYS 1 for each product
 */
export const createOrderSchema = yup.object({
  items: yup
    .array()
    .of(yup.string().matches(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'))
    .required('Product IDs are required')
    .min(1, 'At least one product ID required'),
  
  deliveryAddress: deliveryAddressSchema.required('Delivery address is required'),
  
  phone: yup
    .string()
    .required('Phone number is required')
    .trim()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
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


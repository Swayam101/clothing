import * as yup from 'yup';

/**
 * Create product validation schema
 */
export const createProductSchema = yup.object({
  title: yup
    .string()
    .required('Product title is required')
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters'),
  color: yup
    .string()
    .required('Product color is required')
    .trim()
    .max(50, 'Color must not exceed 50 characters'),
  condition: yup
    .string()
    .required('Product condition is required')
    .trim()
    .max(50, 'Condition must not exceed 50 characters'),
  price: yup
    .number()
    .required('Product price is required')
    .positive('Price must be a positive number')
    .min(0, 'Price must be at least 0'),
  instock: yup
    .number()
    .required('Stock quantity is required')
    .integer('Stock must be an integer')
    .min(0, 'Stock must be a non-negative number')
    .default(0),
  fabric: yup
    .string()
    .required('Product fabric is required')
    .trim()
    .max(100, 'Fabric must not exceed 100 characters'),
  description: yup
    .string()
    .required('Product description is required')
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must not exceed 2000 characters'),
  style: yup
    .string()
    .required('Product style is required')
    .trim()
    .max(100, 'Style must not exceed 100 characters'),
  size: yup
    .string()
    .required('Product size is required')
    .trim()
    .max(50, 'Size must not exceed 50 characters'),
  featured: yup
    .boolean()
    .optional()
    .nullable()
    .default(false),
  image: yup
    .string()
    .required('Product image is required')
    .url('Image must be a valid URL'),
  isActive: yup
    .boolean()
    .optional()
    .default(true),
});

/**
 * Update product validation schema (all fields optional)
 */
export const updateProductSchema = yup.object({
  title: yup
    .string()
    .optional()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must not exceed 200 characters'),
  color: yup
    .string()
    .optional()
    .trim()
    .max(50, 'Color must not exceed 50 characters'),
  condition: yup
    .string()
    .optional()
    .trim()
    .max(50, 'Condition must not exceed 50 characters'),
  price: yup
    .number()
    .optional()
    .positive('Price must be a positive number')
    .min(0, 'Price must be at least 0'),
  instock: yup
    .number()
    .optional()
    .integer('Stock must be an integer')
    .min(0, 'Stock must be a non-negative number'),
  fabric: yup
    .string()
    .optional()
    .trim()
    .max(100, 'Fabric must not exceed 100 characters'),
  description: yup
    .string()
    .optional()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must not exceed 2000 characters'),
  style: yup
    .string()
    .optional()
    .trim()
    .max(100, 'Style must not exceed 100 characters'),
  size: yup
    .string()
    .optional()
    .trim()
    .max(50, 'Size must not exceed 50 characters'),
  featured: yup
    .boolean()
    .optional()
    .nullable(),
  image: yup
    .string()
    .optional()
    .url('Image must be a valid URL'),
  isActive: yup
    .boolean()
    .optional(),
});

/**
 * Update stock validation schema
 */
export const updateStockSchema = yup.object({
  quantity: yup
    .number()
    .required('Quantity is required')
    .integer('Quantity must be an integer')
    .min(0, 'Quantity must be a non-negative number'),
});

/**
 * Get products query validation schema
 */
export const getProductsQuerySchema = yup.object({
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
  style: yup
    .string()
    .optional()
    .trim(),
  color: yup
    .string()
    .optional()
    .trim(),
  size: yup
    .string()
    .optional()
    .trim(),
  condition: yup
    .string()
    .optional()
    .trim(),
  featured: yup
    .boolean()
    .optional(),
  minPrice: yup
    .number()
    .optional()
    .min(0, 'Min price must be non-negative'),
  maxPrice: yup
    .number()
    .optional()
    .min(0, 'Max price must be non-negative'),
  inStock: yup
    .boolean()
    .optional(),
  isActive: yup
    .boolean()
    .optional()
    .default(true),
  search: yup
    .string()
    .optional()
    .trim(),
  sortBy: yup
    .string()
    .optional()
    .oneOf(['price', 'createdAt', 'title', 'featured'], 'Invalid sort field'),
  sortOrder: yup
    .string()
    .optional()
    .oneOf(['asc', 'desc'], 'Sort order must be asc or desc')
    .default('desc'),
});

/**
 * MongoDB ObjectId validation schema for params
 */
export const productIdParamSchema = yup.object({
  id: yup
    .string()
    .required('Product ID is required')
    .matches(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
});

/**
 * Product slug validation schema for params
 */
export const productSlugParamSchema = yup.object({
  slug: yup
    .string()
    .required('Product slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
    .max(200, 'Slug must not exceed 200 characters'),
});


// Export validation middleware
export { validate } from '../middleware/validate';

// Export auth validations
export {
  firebaseAuthSchema,
} from './schemas/auth.validation';

// Export product validations
export {
  createProductSchema,
  updateProductSchema,
  updateStockSchema,
  getProductsQuerySchema,
  productIdParamSchema,
  productSlugParamSchema,
} from './schemas/product.validation';

// Export order validations
export {
  createOrderSchema,
  updateOrderSchema,
  getOrdersQuerySchema,
  orderIdParamSchema,
  verifyPaymentSchema,
} from './schemas/order.validation';


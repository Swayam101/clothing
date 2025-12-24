import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  updateStock,
} from '../controllers/products';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';
import {
  validate,
  createProductSchema,
  updateProductSchema,
  updateStockSchema,
  getProductsQuerySchema,
  productIdParamSchema,
  productSlugParamSchema,
} from '../validations';

const router = Router();

// Public routes - no authentication required for viewing products
router.get('/', validate(getProductsQuerySchema, 'query'), getAllProducts);
router.get('/slug/:slug', validate(productSlugParamSchema, 'params'), getProductBySlug);
router.get('/:id', validate(productIdParamSchema, 'params'), getProductById);

// Admin routes - authentication and admin role required for modifying products
router.post('/', authenticate, requireAdmin, validate(createProductSchema), createProduct);
router.put('/:id', authenticate, requireAdmin, validate(productIdParamSchema, 'params'), validate(updateProductSchema), updateProduct);
router.delete('/:id', authenticate, requireAdmin, validate(productIdParamSchema, 'params'), deleteProduct);
router.patch('/:id/stock', authenticate, requireAdmin, validate(productIdParamSchema, 'params'), validate(updateStockSchema), updateStock);

export default router;

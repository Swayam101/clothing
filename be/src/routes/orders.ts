import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  getAllOrders,
  getOrderStats,
} from '../controllers/orders';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';
import {
  validate,
  createOrderSchema,
  updateOrderSchema,
  getOrdersQuerySchema,
  orderIdParamSchema,
} from '../validations';

const router = Router();

// All order routes require authentication
router.use(authenticate);

// User routes - users can view and create their own orders
router.post('/', validate(createOrderSchema), createOrder); // Create new order
router.get('/', validate(getOrdersQuerySchema, 'query'), getOrders); // Get user's orders
router.get('/:id', validate(orderIdParamSchema, 'params'), getOrderById); // Get specific order (user can only see their own)

// Admin routes - admins can manage all orders
router.get('/admin/all', requireAdmin, validate(getOrdersQuerySchema, 'query'), getAllOrders); // Get all orders (admin only)
router.put('/:id', requireAdmin, validate(orderIdParamSchema, 'params'), validate(updateOrderSchema), updateOrder); // Update order (admin only)
router.get('/admin/stats', requireAdmin, getOrderStats); // Get order statistics (admin only)

export default router;

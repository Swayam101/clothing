import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  getAllOrders,
  getOrderStats,
} from '../controllers/orders';
import verifyOrder from '../controllers/payments/verifyOrder';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';
import {
  validate,
  createOrderSchema,
  updateOrderSchema,
  getOrdersQuerySchema,
  orderIdParamSchema,
} from '../validations';
import * as yup from 'yup';

const router = Router();

// Validation schema for order verification
const orderIdVerifySchema = yup.object({
  orderId: yup.string().required('Order ID is required').trim(),
});

// All order routes require authentication
router.use(authenticate);

// User routes - SIMPLIFIED!
router.post('/', validate(createOrderSchema), createOrder); // Create order - ONLY needs product IDs!
router.get('/', validate(getOrdersQuerySchema, 'query'), getOrders); // Get user's orders
router.get('/verify/:orderId', validate(orderIdVerifySchema, 'params'), verifyOrder); // Verify payment
router.get('/:id', validate(orderIdParamSchema, 'params'), getOrderById); // Get specific order

// Admin routes - admins can manage all orders
router.get('/admin/all', requireAdmin, validate(getOrdersQuerySchema, 'query'), getAllOrders); // Get all orders (admin only)
router.put('/:id', requireAdmin, validate(orderIdParamSchema, 'params'), validate(updateOrderSchema), updateOrder); // Update order (admin only)
router.get('/admin/stats', requireAdmin, getOrderStats); // Get order statistics (admin only)

export default router;

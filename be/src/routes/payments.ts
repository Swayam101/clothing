import { Router } from 'express';
import createOrder from '../controllers/payments/createOrder';
import verifyOrder from '../controllers/payments/verifyOrder';
import { authenticate } from '../middleware/auth';
import { validate, verifyPaymentSchema } from '../validations';
import * as yup from 'yup';

const router = Router();

// Validation schema for orderId param
const orderIdParamSchema = yup.object({
  orderId: yup.string().required('Order ID is required').trim(),
});

// All payment routes require authentication (admin only for order management)
router.post('/create-order', authenticate, createOrder);
router.get('/verify/:orderId', authenticate, validate(orderIdParamSchema, 'params'), verifyOrder);

export default router;

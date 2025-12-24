import { Response } from 'express';
import { createOrder as createOrderService } from '../../services/orders';
import { AuthRequest, CreateOrderRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const createOrder = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    return jsonResponse(res, 401, false, undefined, 'Authentication required');
  }

  const orderData: CreateOrderRequest = req.body;

  // Basic validation
  if (!orderData.items || orderData.items.length === 0) {
    return jsonResponse(res, 400, false, undefined, 'Order must contain at least one item');
  }

  if (!orderData.shippingAddress || !orderData.billingAddress) {
    return jsonResponse(res, 400, false, undefined, 'Shipping and billing addresses are required');
  }

  if (!orderData.paymentMethod) {
    return jsonResponse(res, 400, false, undefined, 'Payment method is required');
  }

  // Validate each item
  for (const item of orderData.items) {
    if (!item.product || !item.quantity || item.quantity < 1) {
      return jsonResponse(res, 400, false, undefined, 'Each item must have a valid product and quantity');
    }
  }

  const order = await createOrderService(req.user.userId, orderData);
  jsonResponse(res, 201, true, order, undefined, 'Order created successfully');
});

export default createOrder;

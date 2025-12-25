import { Response } from 'express';
import { createOrder as createOrderService } from '../../services/orders';
import { AuthRequest, CreateOrderRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

/**
 * Create a new order
 * @route POST /api/orders
 * @access Private (Requires authentication)
 * @description Creates a new order for the authenticated user. Customer information is automatically retrieved from the user's profile.
 */
const createOrder = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    return jsonResponse(res, 401, false, undefined, 'Authentication required');
  }

  const orderData: CreateOrderRequest = req.body;
  const order = await createOrderService(req.user.userId, orderData);
  
  jsonResponse(res, 201, true, order, undefined, 'Order created successfully');
});

export default createOrder;

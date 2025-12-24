import { Response } from 'express';
import { getOrderById as getOrderByIdService } from '../../services/orders';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const getOrderById = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    return jsonResponse(res, 401, false, undefined, 'Authentication required');
  }

  const { id } = req.params;

  if (!id) {
    return jsonResponse(res, 400, false, undefined, 'Order ID is required');
  }

  const order = await getOrderByIdService(id);

  if (!order) {
    return jsonResponse(res, 404, false, undefined, 'Order not found');
  }

  // Check if the order belongs to the authenticated user (users can only see their own orders)
  if (order.user !== req.user.userId) {
    return jsonResponse(res, 403, false, undefined, 'Access denied');
  }

  jsonResponse(res, 200, true, order, undefined, 'Order retrieved successfully');
});

export default getOrderById;

import { Response } from 'express';
import { updateOrder as updateOrderService } from '../../services/orders';
import { AuthRequest, UpdateOrderRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const updateOrder = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    return jsonResponse(res, 401, false, undefined, 'Authentication required');
  }

  const { id } = req.params;
  const updateData: UpdateOrderRequest = req.body;

  if (!id) {
    return jsonResponse(res, 400, false, undefined, 'Order ID is required');
  }

  // Validate status values if provided
  if (updateData.status && !['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'].includes(updateData.status)) {
    return jsonResponse(res, 400, false, undefined, 'Invalid order status');
  }

  // Validate payment status values if provided
  if (updateData.paymentStatus && !['pending', 'paid', 'failed', 'refunded'].includes(updateData.paymentStatus)) {
    return jsonResponse(res, 400, false, undefined, 'Invalid payment status');
  }

  const order = await updateOrderService(id, updateData);

  if (!order) {
    return jsonResponse(res, 404, false, undefined, 'Order not found');
  }

  jsonResponse(res, 200, true, order, undefined, 'Order updated successfully');
});

export default updateOrder;

import { Response } from 'express';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';
import { cashfreeService } from '../../services/payments/cashfreeService';
import { findOrderByOrderId } from '../../dao';

const verifyOrder = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const { orderId } = req.params;

  if (!orderId) {
    return jsonResponse(res, 400, false, undefined, 'Order ID is required');
  }

  // Find order in our database
  const order = await findOrderByOrderId(orderId);
  
  if (!order) {
    return jsonResponse(res, 404, false, undefined, 'Order not found');
  }

  // Use the cashfreeOrderId stored in our database
  const cashfreeOrderId = order.cashfreeOrderId || orderId;
  
  const response = await cashfreeService.verifyOrder(cashfreeOrderId);
  
  jsonResponse(res, 200, true, {
    order_id: orderId, // Our internal order ID
    cashfree_order_id: cashfreeOrderId,
    order_status: response.order_status,
    payment_status: order.paymentStatus,
    order_details: order,
    cashfree_details: response
  }, undefined, 'Order verification successful');
});

export default verifyOrder;

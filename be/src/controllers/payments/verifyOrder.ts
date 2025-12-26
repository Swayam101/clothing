import { Response } from 'express';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';
import { cashfreeService } from '../../services/payments/cashfreeService';
import { findOrderByOrderId, updateOrderPaymentStatus } from '../../dao/orderDao';
import { updateProductStock } from '../../dao/productDao';
import { logger } from '../../utils/logger';
import Order from '../../models/Order';
import Product from '../../models/Product';

const verifyOrder = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const { order_id: orderId } = req.params;

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

  // If payment is confirmed as PAID and order is not already paid, update database
  if (response.order_status === 'PAID' && order.paymentStatus !== 'paid') {
    logger.info(`Payment confirmed for order ${orderId}, updating database...`);

    // Update order payment status
    await updateOrderPaymentStatus(order._id.toString(), 'paid');

    // Update order status to confirmed
    const orderDoc = await Order.findById(order._id);
    if (orderDoc) {
      orderDoc.status = 'confirmed';
      await orderDoc.save();
    }

    // Reduce stock for each item in the order
    // Note: Quantity is always 1, so we always decrement by 1
    for (const item of order.items) {
      // Extract ObjectId - item.product might be populated or just an ID
      const productId = typeof item.product === 'object' && item.product._id 
        ? item.product._id.toString() 
        : item.product.toString();
      
      const product = await Product.findById(productId);
      
      if (product) {
        await updateProductStock(product._id.toString(), false);
        logger.info(`Reduced stock for product ${product.title}: ${product.instock} -> ${false}`);
      }
    }

    logger.info(`Order ${orderId} confirmed and inventory updated`);
  }

  // Fetch updated order details
  const updatedOrder = await findOrderByOrderId(orderId);
  
  jsonResponse(res, 200, true, {
    order_id: orderId, // Our internal order ID
    cashfree_order_id: cashfreeOrderId,
    order_status: response.order_status,
    payment_status: response.order_status,
    order_details: updatedOrder,
    cashfree_details: response
  }, undefined, 'Order verification successful');
});

export default verifyOrder;

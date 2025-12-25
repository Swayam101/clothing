import { Response } from 'express';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';
import { updateOrderPaymentStatus } from '../../dao/orderDao';
import { updateProductStock } from '../../dao/productDao';
import { logger } from '../../utils/logger';

const cashfreeWebhook = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const webhookData = req.body;
  
  logger.info('Cashfree webhook received:', JSON.stringify(webhookData));

  // Extract payment details from webhook
  const { 
    type, 
    data 
  } = webhookData;

  // Handle different webhook events
  if (type === 'PAYMENT_SUCCESS_WEBHOOK') {
    const { 
      order_id, 
      order_amount, 
      payment_status,
      payment_time 
    } = data.order;

    logger.info(`Payment successful for order: ${order_id}`);

    // Find the order by cashfreeOrderId (order_id from webhook is Cashfree's order ID)
    const Order = require('../../models/Order').default;
    const order = await Order.findOne({ cashfreeOrderId: order_id });

    if (!order) {
      logger.error(`Order not found: ${order_id}`);
      return jsonResponse(res, 404, false, undefined, 'Order not found');
    }

    // Update order payment status
    await updateOrderPaymentStatus(order._id.toString(), 'paid');

    // Update order status to confirmed
    order.status = 'confirmed';
    await order.save();

    // Reduce stock for each item in the order
    // Note: Quantity is always 1, so we always decrement by 1
    for (const item of order.items) {
      const Product = require('../../models/Product').default;
      const product = await Product.findById(item.product);
      
      if (product) {
        const newStock = product.instock - 1; // Always -1 since quantity is always 1
        await updateProductStock(item.product.toString(), newStock);
        logger.info(`Reduced stock for product ${product.title}: ${product.instock} -> ${newStock}`);
      }
    }

    logger.info(`Order ${order_id} confirmed and inventory updated`);

    return jsonResponse(res, 200, true, { orderId: order_id }, undefined, 'Payment processed successfully');
  } 
  else if (type === 'PAYMENT_FAILED_WEBHOOK') {
    const { order_id } = data.order;

    logger.warn(`Payment failed for order: ${order_id}`);

    // Find the order by cashfreeOrderId (order_id from webhook is Cashfree's order ID)
    const Order = require('../../models/Order').default;
    const order = await Order.findOne({ cashfreeOrderId: order_id });

    if (order) {
      // Update payment status to failed
      await updateOrderPaymentStatus(order._id.toString(), 'failed');
      logger.info(`Order ${order_id} marked as payment failed`);
    }

    return jsonResponse(res, 200, true, { orderId: order_id }, undefined, 'Payment failure recorded');
  }
  else if (type === 'PAYMENT_USER_DROPPED_WEBHOOK') {
    const { order_id } = data.order;

    logger.warn(`Payment dropped by user for order: ${order_id}`);

    // Optionally update order status
    const Order = require('../../models/Order').default;
    const order = await Order.findOne({ cashfreeOrderId: order_id });

    if (order) {
      order.status = 'cancelled';
      await order.save();
      logger.info(`Order ${order_id} cancelled (user dropped payment)`);
    }

    return jsonResponse(res, 200, true, { orderId: order_id }, undefined, 'Payment drop recorded');
  }

  // For any other webhook type
  logger.info(`Unhandled webhook type: ${type}`);
  return jsonResponse(res, 200, true, undefined, undefined, 'Webhook received');
});

export default cashfreeWebhook;


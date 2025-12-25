import { Types } from 'mongoose';
import { CreateOrderRequest, IOrder } from '../../types';
import { OrderItem } from '../../models/Order';
import { createOrder as createOrderDao, CreateOrderData } from '../../dao';
import { findProductById } from '../../dao';
import { getUserById } from '../auth';
import { cashfreeService } from '../payments/cashfreeService';
import config from '../../config';

const createOrder = async (
  userId: string,
  orderData: CreateOrderRequest
): Promise<IOrder & { paymentSession?: any }> => {
  // Validate user exists
  const user = await getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Validate products and calculate total
  const orderItems: OrderItem[] = [];
  let totalAmount = 0;

  for (const item of orderData.items) {
    const product = await findProductById(item.product);
    if (!product) {
      throw new Error(`Product ${item.product} not found`);
    }

    if (!product.isActive) {
      throw new Error(`Product ${product.title} is not available`);
    }

    if (product.instock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.title}. Available: ${product.instock}`);
    }

    const orderItem: OrderItem = {
      product: new Types.ObjectId(item.product),
      title: product.title,
      color: product.color,
      size: product.size,
      fabric: product.fabric,
      quantity: item.quantity,
      price: product.price,
      image: product.image[0] || '',
    };

    orderItems.push(orderItem);
    totalAmount += product.price * item.quantity;
  }

  // Generate unique order ID
  const orderId = `ORD${Date.now()}${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  // Create Cashfree payment order
  let cashfreeOrderId = orderId;
  let paymentSessionId: string | undefined;
  let paymentSession: any = null;

  try {
    const cashfreeOrderRequest = {
      order_amount: totalAmount,
      order_currency: 'INR',
      order_id: orderId,
      customer_details: {
        customer_id: user._id.toString(),
        customer_name: user.name || user.email,
        customer_email: user.email,
        customer_phone: user.phone || '0000000000',
      },
      order_meta: {
        return_url: `${config.cashfree?.returnUrl}?order_id=${orderId}`,
      },
    };

    const cashfreeResponse = await cashfreeService.createOrder(cashfreeOrderRequest);
    
    if (cashfreeResponse) {
      cashfreeOrderId = cashfreeResponse.order_id || orderId;
      paymentSessionId = cashfreeResponse.payment_session_id;
      paymentSession = {
        payment_session_id: paymentSessionId,
        order_id: cashfreeOrderId,
      };
    }
  } catch (error: any) {
    console.error('Cashfree order creation failed:', error.message);
    // Continue with order creation even if Cashfree fails
    // This allows for COD or manual payment processing
  }

  // Create order data
  const createData: CreateOrderData = {
    user: new Types.ObjectId(user._id),
    items: orderItems,
    totalAmount,
    customer: {
      name: user.name || user.email,
      email: user.email,
      phone: user.phone || '0000000000',
    },
    shippingAddress: orderData.shippingAddress,
    billingAddress: orderData.billingAddress,
    paymentMethod: orderData.paymentMethod,
    cashfreeOrderId,
    paymentSessionId,
    customerNotes: orderData.customerNotes,
  };

  const order = await createOrderDao(createData);

  return {
    _id: order._id.toString(),
    orderId: order.orderId,
    user: order.user.toString(),
    items: order.items.map(item => ({
      product: item.product.toString(),
      title: item.title,
      color: item.color,
      size: item.size,
      fabric: item.fabric,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    totalAmount: order.totalAmount,
    currency: order.currency,
    customer: order.customer,
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    cashfreeOrderId: order.cashfreeOrderId,
    paymentSessionId: order.paymentSessionId,
    status: order.status,
    trackingNumber: order.trackingNumber,
    shippingCarrier: order.shippingCarrier,
    customerNotes: order.customerNotes,
    adminNotes: order.adminNotes,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    paymentSession, // Include payment session for frontend
  };
};

export default createOrder;

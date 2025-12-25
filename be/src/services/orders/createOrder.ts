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
  // Quantity is ALWAYS 1 for each product
  const orderItems: OrderItem[] = [];
  let totalAmount = 0;

  for (const productId of orderData.items) {
    const product = await findProductById(productId);
    if (!product) {
      throw new Error(`Product ${productId} not found`);
    }

    if (!product.isActive) {
      throw new Error(`Product ${product.title} is not available`);
    }

    if (product.instock < 1) {
      throw new Error(`${product.title} is out of stock`);
    }

    const orderItem: OrderItem = {
      product: new Types.ObjectId(productId),
      title: product.title,
      color: product.color,
      size: product.size,
      fabric: product.fabric,
      quantity: 1, // ALWAYS 1
      price: product.price,
      image: product.image[0] || '',
    };

    orderItems.push(orderItem);
    totalAmount += product.price; // No multiplication - always quantity 1
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

  // Create order data with provided delivery details
  const createData: CreateOrderData = {
    user: new Types.ObjectId(user._id),
    items: orderItems,
    totalAmount,
    customer: {
      name: user.name || user.email,
      email: user.email,
      phone: orderData.phone, // Phone from request
    },
    shippingAddress: orderData.deliveryAddress, // Delivery address from request
    billingAddress: orderData.deliveryAddress, // Same as delivery for simplicity
    paymentMethod: 'cashfree', // Default to Cashfree
    cashfreeOrderId,
    paymentSessionId,
    customerNotes: undefined,
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

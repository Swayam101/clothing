import { IOrder } from '../../types';
import { findOrderById } from '../../dao';

const getOrderById = async (orderId: string): Promise<IOrder | null> => {
  const order = await findOrderById(orderId);

  if (!order) {
    return null;
  }

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
  };
};

export default getOrderById;

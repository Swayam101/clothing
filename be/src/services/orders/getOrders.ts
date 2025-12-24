import { Types } from 'mongoose';
import { OrderQueryParams, OrderResponse, IOrder } from '../../types';
import { findOrdersByUser, countOrders } from '../../dao';

const getOrders = async (
  userId: string,
  query: OrderQueryParams = {}
): Promise<OrderResponse> => {
  const { page = 1, limit = 10, startDate, endDate, ...filterQuery } = query;

  // Convert date strings to Date objects
  const queryWithDates = {
    ...filterQuery,
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
  };

  const orders = await findOrdersByUser(new Types.ObjectId(userId), {
    ...queryWithDates,
    page,
    limit,
  });

  const total = await countOrders({
    user: userId,
    ...queryWithDates,
  });

  const totalPages = Math.ceil(total / limit);

  const formattedOrders: IOrder[] = orders.map(order => ({
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
  }));

  return {
    orders: formattedOrders,
    total,
    page,
    limit,
    totalPages,
  };
};

export default getOrders;

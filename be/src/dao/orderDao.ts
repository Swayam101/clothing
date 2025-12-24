import Order, { IOrderDocument, OrderItem } from '../models/Order';
import { Types } from 'mongoose';

export interface OrderQuery {
  user?: string;
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateOrderData {
  user: Types.ObjectId;
  items: OrderItem[];
  totalAmount: number;
  currency?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  cashfreeOrderId?: string;
  paymentSessionId?: string;
  customerNotes?: string;
}

export interface UpdateOrderData {
  status?: string;
  paymentStatus?: string;
  trackingNumber?: string;
  shippingCarrier?: string;
  adminNotes?: string;
}

export const createOrder = async (orderData: CreateOrderData): Promise<IOrderDocument> => {
  const order = await Order.create(orderData);
  return order;
};

export const findOrderById = async (orderId: string): Promise<IOrderDocument | null> => {
  return await Order.findById(orderId).populate('user', 'email').populate('items.product');
};

export const findOrderByOrderId = async (orderId: string): Promise<IOrderDocument | null> => {
  return await Order.findOne({ orderId }).populate('user', 'email').populate('items.product');
};

export const findOrdersByUser = async (userId: Types.ObjectId, query: OrderQuery = {}): Promise<IOrderDocument[]> => {
  const { status, paymentStatus, page = 1, limit = 10, startDate, endDate } = query;

  const filter: any = { user: userId };

  if (status) {
    filter.status = status;
  }

  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = startDate;
    if (endDate) filter.createdAt.$lte = endDate;
  }

  const skip = (page - 1) * limit;

  return await Order.find(filter)
    .populate('user', 'email')
    .populate('items.product')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const findAllOrders = async (query: OrderQuery = {}): Promise<IOrderDocument[]> => {
  const { user, status, paymentStatus, page = 1, limit = 10, startDate, endDate } = query;

  const filter: any = {};

  if (user) {
    filter.user = user;
  }

  if (status) {
    filter.status = status;
  }

  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = startDate;
    if (endDate) filter.createdAt.$lte = endDate;
  }

  const skip = (page - 1) * limit;

  return await Order.find(filter)
    .populate('user', 'email')
    .populate('items.product')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const updateOrder = async (
  orderId: string,
  updateData: UpdateOrderData
): Promise<IOrderDocument | null> => {
  return await Order.findByIdAndUpdate(
    orderId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('user', 'email').populate('items.product');
};

export const updateOrderByOrderId = async (
  orderId: string,
  updateData: UpdateOrderData
): Promise<IOrderDocument | null> => {
  return await Order.findOneAndUpdate(
    { orderId },
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('user', 'email').populate('items.product');
};

export const deleteOrder = async (orderId: string): Promise<IOrderDocument | null> => {
  return await Order.findByIdAndDelete(orderId);
};

export const countOrders = async (query: OrderQuery = {}): Promise<number> => {
  const { user, status, paymentStatus, startDate, endDate } = query;

  const filter: any = {};

  if (user) {
    filter.user = user;
  }

  if (status) {
    filter.status = status;
  }

  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = startDate;
    if (endDate) filter.createdAt.$lte = endDate;
  }

  return await Order.countDocuments(filter);
};

export const getOrderStats = async (): Promise<{
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  ordersByPaymentStatus: Record<string, number>;
}> => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: {
          $sum: {
            $cond: [
              { $eq: ['$paymentStatus', 'paid'] },
              '$totalAmount',
              0
            ]
          }
        },
        pendingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        confirmedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
        },
        processingOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'processing'] }, 1, 0] }
        },
        shippedOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'shipped'] }, 1, 0] }
        },
        deliveredOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] }
        },
        cancelledOrders: {
          $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
        },
        pendingPayments: {
          $sum: { $cond: [{ $eq: ['$paymentStatus', 'pending'] }, 1, 0] }
        },
        paidPayments: {
          $sum: { $cond: [{ $eq: ['$paymentStatus', 'paid'] }, 1, 0] }
        },
        failedPayments: {
          $sum: { $cond: [{ $eq: ['$paymentStatus', 'failed'] }, 1, 0] }
        },
      }
    }
  ]);

  if (stats.length === 0) {
    return {
      totalOrders: 0,
      totalRevenue: 0,
      ordersByStatus: {},
      ordersByPaymentStatus: {},
    };
  }

  const data = stats[0];
  return {
    totalOrders: data.totalOrders,
    totalRevenue: data.totalRevenue,
    ordersByStatus: {
      pending: data.pendingOrders,
      confirmed: data.confirmedOrders,
      processing: data.processingOrders,
      shipped: data.shippedOrders,
      delivered: data.deliveredOrders,
      cancelled: data.cancelledOrders,
    },
    ordersByPaymentStatus: {
      pending: data.pendingPayments,
      paid: data.paidPayments,
      failed: data.failedPayments,
    },
  };
};

// Update order payment status
export const updateOrderPaymentStatus = async (
  orderId: string,
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
): Promise<IOrderDocument | null> => {
  return await Order.findByIdAndUpdate(
    orderId,
    { $set: { paymentStatus } },
    { new: true }
  );
};

import { Response } from 'express';
import { getOrders as getOrdersService } from '../../services/orders';
import { AuthRequest, OrderQueryParams } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const getOrders = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    return jsonResponse(res, 401, false, undefined, 'Authentication required');
  }

  const query: OrderQueryParams = {};

  if (req.query.status && typeof req.query.status === 'string') {
    query.status = req.query.status;
  }

  if (req.query.paymentStatus && typeof req.query.paymentStatus === 'string') {
    query.paymentStatus = req.query.paymentStatus;
  }

  if (req.query.page && typeof req.query.page === 'string') {
    const page = parseInt(req.query.page, 10);
    if (!isNaN(page) && page > 0) {
      query.page = page;
    }
  }

  if (req.query.limit && typeof req.query.limit === 'string') {
    const limit = parseInt(req.query.limit, 10);
    if (!isNaN(limit) && limit > 0 && limit <= 50) {
      query.limit = limit;
    }
  }

  if (req.query.startDate && typeof req.query.startDate === 'string') {
    query.startDate = req.query.startDate;
  }

  if (req.query.endDate && typeof req.query.endDate === 'string') {
    query.endDate = req.query.endDate;
  }

  const result = await getOrdersService(req.user.userId, query);
  jsonResponse(res, 200, true, result, undefined, 'Orders retrieved successfully');
});

export default getOrders;

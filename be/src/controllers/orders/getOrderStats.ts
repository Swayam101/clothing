import { Response } from 'express';
import { getOrderStats as getOrderStatsService } from '../../services/orders';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const getOrderStats = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    return jsonResponse(res, 401, false, undefined, 'Authentication required');
  }

  const stats = await getOrderStatsService();
  jsonResponse(res, 200, true, stats, undefined, 'Order statistics retrieved successfully');
});

export default getOrderStats;

import { Response } from 'express';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';
import { cashfreeService } from '../../services/payments/cashfreeService';

const verifyOrder = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const { orderId } = req.params;

  if (!orderId) {
    return jsonResponse(res, 400, false, undefined, 'Order ID is required');
  }

  const response = await cashfreeService.verifyOrder(orderId);
  jsonResponse(res, 200, true, response, undefined, 'Order verification successful');
});

export default verifyOrder;

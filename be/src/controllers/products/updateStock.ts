import { Response } from 'express';
import { updateStock as updateStockService } from '../../services/products';
import { AuthRequest, UpdateStockRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const updateStock = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const stockData: UpdateStockRequest = req.body;

  if (!id) {
    return jsonResponse(res, 400, false, undefined, 'Product ID is required');
  }

  if (stockData.instock === undefined) {
    return jsonResponse(res, 400, false, undefined, 'Valid stock quantity is required');
  }

  const product = await updateStockService(id, stockData);

  if (!product) {
    return jsonResponse(res, 404, false, undefined, 'Product not found');
  }

  jsonResponse(res, 200, true, product, undefined, 'Product stock updated successfully');
});

export default updateStock;

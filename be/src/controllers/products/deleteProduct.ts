import { Response } from 'express';
import { deleteProduct as deleteProductService } from '../../services/products';
import { AuthRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const deleteProduct = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    return jsonResponse(res, 400, false, undefined, 'Product ID is required');
  }

  const product = await deleteProductService(id);

  if (!product) {
    return jsonResponse(res, 404, false, undefined, 'Product not found');
  }

  jsonResponse(res, 200, true, product, undefined, 'Product deleted successfully');
});

export default deleteProduct;

import { Response, Request } from 'express';
import { getProductById as getProductByIdService } from '../../services/products';
import { jsonResponse, asyncWrapper } from '../../utils';

const getProductById = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    return jsonResponse(res, 400, false, undefined, 'Product ID is required');
  }

  const product = await getProductByIdService(id);

  if (!product) {
    return jsonResponse(res, 404, false, undefined, 'Product not found');
  }

  jsonResponse(res, 200, true, product, undefined, 'Product retrieved successfully');
});

export default getProductById;

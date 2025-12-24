import { Response, Request } from 'express';
import { getProductBySlug as getProductBySlugService } from '../../services/products';
import { jsonResponse, asyncWrapper } from '../../utils';

const getProductBySlug = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;

  if (!slug) {
    return jsonResponse(res, 400, false, undefined, 'Product slug is required');
  }

  const product = await getProductBySlugService(slug);

  if (!product) {
    return jsonResponse(res, 404, false, undefined, 'Product not found');
  }

  jsonResponse(res, 200, true, product, undefined, 'Product retrieved successfully');
});

export default getProductBySlug;

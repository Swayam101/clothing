import { Response } from 'express';
import { updateProduct as updateProductService } from '../../services/products';
import { AuthRequest, UpdateProductRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const updateProduct = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const updateData: UpdateProductRequest = req.body;

  if (!id) {
    return jsonResponse(res, 400, false, undefined, 'Product ID is required');
  }

  // Validate price if provided
  if (updateData.price !== undefined && updateData.price < 0) {
    return jsonResponse(res, 400, false, undefined, 'Price must be a positive number');
  }

  // Validate stock if provided
  if (updateData.instock !== undefined && updateData.instock < 0) {
    return jsonResponse(res, 400, false, undefined, 'Stock must be a non-negative number');
  }

  const product = await updateProductService(id, updateData);

  if (!product) {
    return jsonResponse(res, 404, false, undefined, 'Product not found');
  }

  jsonResponse(res, 200, true, product, undefined, 'Product updated successfully');
});

export default updateProduct;

import { Response } from 'express';
import { createProduct as createProductService } from '../../services/products';
import { AuthRequest, CreateProductRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const createProduct = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const productData: CreateProductRequest = req.body;

  // Basic validation
  if (!productData.title || !productData.description || !productData.price || !productData.color || !productData.condition || !productData.fabric || !productData.style || !productData.size) {
    return jsonResponse(res, 400, false, undefined, 'Title, description, price, color, condition, fabric, style, and size are required');
  }

  if (productData.price < 0) {
    return jsonResponse(res, 400, false, undefined, 'Price must be a positive number');
  }

  if (productData.instock < 0) {
    return jsonResponse(res, 400, false, undefined, 'Stock must be a non-negative number');
  }

  const product = await createProductService(productData);
  jsonResponse(res, 201, true, product, undefined, 'Product created successfully');
});

export default createProduct;

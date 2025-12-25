import { Response, Request } from 'express';
import { getAllProducts as getAllProductsService } from '../../services/products';
import { ProductQueryParams } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';

const getAllProducts = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const query: ProductQueryParams = {};

  if (req.query.style && typeof req.query.style === 'string') {
    query.style = req.query.style;
  }

  if (req.query.color && typeof req.query.color === 'string') {
    query.color = req.query.color;
  }

  if (req.query.size && typeof req.query.size === 'string') {
    query.size = req.query.size;
  }

  if (req.query.condition && typeof req.query.condition === 'string') {
    query.condition = req.query.condition;
  }

  if (req.query.featured !== undefined) {
    if (typeof req.query.featured === 'string') {
      query.featured = req.query.featured === 'true';
    } else if (typeof req.query.featured === 'boolean') {
      query.featured = req.query.featured;
    }
  }

  if (req.query.search && typeof req.query.search === 'string') {
    query.search = req.query.search;
  }

  if (req.query.page && typeof req.query.page === 'string') {
    const page = parseInt(req.query.page, 10);
    if (!isNaN(page) && page > 0) {
      query.page = page;
    }
  }

  if (req.query.limit && typeof req.query.limit === 'string') {
    const limit = parseInt(req.query.limit, 10);
    if (!isNaN(limit) && limit > 0 && limit <= 100) {
      query.limit = limit;
    }
  }

  if (req.query.sort && typeof req.query.sort === 'string') {
    // Validate sort parameter for security
    const allowedSortFields = ['price', 'title', 'createdAt', 'featured', 'instock'];
    const sortParam = req.query.sort;

    // Check if it's a valid sort format (field or field:direction)
    if (sortParam.includes(':')) {
      const [field, direction] = sortParam.split(':');
      if (allowedSortFields.includes(field) && ['asc', 'desc'].includes(direction)) {
        query.sort = sortParam;
      }
    } else if (allowedSortFields.includes(sortParam)) {
      // Default to ascending for single field
      query.sort = `${sortParam}:asc`;
    }
  }

  const result = await getAllProductsService(query);
  jsonResponse(res, 200, true, result, undefined, 'Products retrieved successfully');
});

export default getAllProducts;

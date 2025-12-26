import Product, { IProductDocument } from '../models/Product';

export interface ProductQuery {
  style?: string;
  color?: string;
  size?: string;
  condition?: string;
  featured?: boolean;
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ProductUpdateData {
  title?: string;
  color?: string;
  condition?: string;
  price?: number;
  instock?: number;
  fabric?: string;
  description?: string;
  style?: string;
  size?: string;
  featured?: boolean | null;
  image?: string[];
  isActive?: boolean;
}

export const createProduct = async (productData: Partial<IProductDocument>): Promise<IProductDocument> => {
  return await Product.create(productData);
};

export const findAllProducts = async (query: ProductQuery = {}): Promise<IProductDocument[]> => {
  const { style, color, size, condition, featured, search, isActive = true, page = 1, limit = 10, sort } = query;

  const filter: any = {};

  if (style) {
    filter.style = style;
  }

  if (color) {
    filter.color = color;
  }

  if (size) {
    filter.size = size;
  }

  if (condition) {
    filter.condition = condition;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { style: { $regex: search, $options: 'i' } },
      { fabric: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  // Build sort object
  let sortObj: any = { createdAt: -1 }; // Default sort: newest first

  if (sort) {
    const [field, direction] = sort.split(':');
    const sortDirection = direction === 'desc' ? -1 : 1;

    // Create sort object based on field
    switch (field) {
      case 'price':
        sortObj = { price: sortDirection };
        break;
      case 'title':
        sortObj = { title: sortDirection };
        break;
      case 'createdAt':
        sortObj = { createdAt: sortDirection };
        break;
      case 'featured':
        // Featured products first, then by creation date
        sortObj = { featured: -1, createdAt: -1 };
        break;
      case 'instock':
        sortObj = { instock: sortDirection };
        break;
      default:
        // Keep default sort
        break;
    }
  }

  return await Product.find(filter)
    .sort(sortObj)
    .skip(skip)
    .limit(limit);
};

export const findProductById = async (productId: string): Promise<IProductDocument | null> => {
  return await Product.findById(productId);
};

export const findProductBySlug = async (slug: string): Promise<IProductDocument | null> => {
  return await Product.findOne({ slug, isActive: true });
};

export const updateProduct = async (
  productId: string,
  updateData: ProductUpdateData
): Promise<IProductDocument | null> => {
  return await Product.findByIdAndUpdate(
    productId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

export const deleteProduct = async (productId: string): Promise<IProductDocument | null> => {
  return await Product.findByIdAndDelete(productId);
};

export const updateProductStock = async (
  productId: string,
  inStock: boolean
): Promise<IProductDocument | null> => {
  return await Product.findByIdAndUpdate(
    productId,
    { $set: { instock: inStock } },
    { new: true, runValidators: true }
  );
};

export const findProductsByStyle = async (style: string): Promise<IProductDocument[]> => {
  return await Product.find({ style, isActive: true });
};

export const countProducts = async (query: ProductQuery = {}): Promise<number> => {
  const { style, color, size, condition, featured, search, isActive = true, sort } = query;

  const filter: any = {};

  if (style) {
    filter.style = style;
  }

  if (color) {
    filter.color = color;
  }

  if (size) {
    filter.size = size;
  }

  if (condition) {
    filter.condition = condition;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  if (isActive !== undefined) {
    filter.isActive = isActive;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { style: { $regex: search, $options: 'i' } },
      { fabric: { $regex: search, $options: 'i' } },
    ];
  }

  return await Product.countDocuments(filter);
};

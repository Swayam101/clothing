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
  image?: string;
  isActive?: boolean;
}

export const createProduct = async (productData: Partial<IProductDocument>): Promise<IProductDocument> => {
  return await Product.create(productData);
};

export const findAllProducts = async (query: ProductQuery = {}): Promise<IProductDocument[]> => {
  const { style, color, size, condition, featured, search, isActive = true, page = 1, limit = 10 } = query;

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

  return await Product.find(filter)
    .sort({ createdAt: -1 })
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
  newStock: number
): Promise<IProductDocument | null> => {
  return await Product.findByIdAndUpdate(
    productId,
    { $set: { instock: newStock } },
    { new: true, runValidators: true }
  );
};

export const findProductsByStyle = async (style: string): Promise<IProductDocument[]> => {
  return await Product.find({ style, isActive: true });
};

export const countProducts = async (query: ProductQuery = {}): Promise<number> => {
  const { style, color, size, condition, featured, search, isActive = true } = query;

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

import { UpdateProductRequest, IProduct } from '../../types';
import { updateProduct as updateProductDao } from '../../dao';

const updateProduct = async (
  productId: string,
  updateData: UpdateProductRequest
): Promise<IProduct | null> => {
  const product = await updateProductDao(productId, updateData);

  if (!product) {
    return null;
  }

  return {
    _id: product._id.toString(),
    title: product.title,
    slug: product.slug,
    color: product.color,
    condition: product.condition,
    price: product.price,
    instock: product.instock,
    fabric: product.fabric,
    description: product.description,
    style: product.style,
    size: product.size,
    featured: product.featured,
    image: product.image,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export default updateProduct;

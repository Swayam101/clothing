import { ProductQueryParams, ProductResponse, IProduct } from '../../types';
import { findAllProducts as findAllProductsDao, countProducts } from '../../dao';

const getAllProducts = async (query: ProductQueryParams = {}): Promise<ProductResponse> => {
  const { page = 1, limit = 10, ...filterQuery } = query;

  const products = await findAllProductsDao({ ...filterQuery, page, limit });
  const total = await countProducts(filterQuery);

  const totalPages = Math.ceil(total / limit);

  const formattedProducts: IProduct[] = products.map(product => ({
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
  }));

  return {
    products: formattedProducts,
    total,
    page,
    limit,
    totalPages,
  };
};

export default getAllProducts;

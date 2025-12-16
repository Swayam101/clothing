import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group cursor-pointer block"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-110">
          <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-light">₹{product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;


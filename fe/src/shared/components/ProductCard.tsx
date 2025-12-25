'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Use slug from backend
  const slug = product.slug;

  // Handle both single image string and image array
  const imageUrl = Array.isArray(product.image) ? product.image[0] : product.image;

  return (
    <Link href={`/products/${slug}`} className="group cursor-pointer block">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:scale-110">
          <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium tracking-wide">{product.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-light">₹{product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

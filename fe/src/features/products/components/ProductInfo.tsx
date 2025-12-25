'use client';

import React from 'react';
import Badge from '@/shared/components/ui/Badge';
import ShareButton from '@/shared/components/ShareButton';
import { Heart, Eye, Palette, Star, Shirt, Package } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  price: number;
  description: string;
  color: string;
  condition: string;
  fabric: string;
  style: string;
  instock: number;
  featured: boolean;
  size: string;
  slug: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  price,
  description,
  color,
  condition,
  fabric,
  style,
  instock,
  featured,
  size,
  slug,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [viewCount] = React.useState(Math.floor(Math.random() * 50) + 10);

  // Share URL for the ShareButton component
  const productUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/${slug}` : '';

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', variant: 'default' as const, color: 'bg-red-600' };
    if (stock <= 5) return { text: 'Low Stock', variant: 'outline' as const, color: 'bg-orange-500' };
    return { text: 'In Stock', variant: 'outline' as const, color: 'bg-green-600' };
  };

  const stockStatus = getStockStatus(instock);

  return (
    <div className="space-y-8">
      {/* Header with Name and Price */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h1 className="text-4xl font-light leading-tight">{name}</h1>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 rounded-full hover:bg-gray-50 transition-colors"
              aria-label="Add to favorites"
            >
          
            </button>
            <ShareButton
              productUrl={productUrl}
              productName={name}
              productPrice={price}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-light">₹{price.toFixed(2)}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Eye className="w-4 h-4" />
            <span>{viewCount} views</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed text-base">{description}</p>
      </div>

      {/* Product Attributes - Labeled Badges */}
      <div className="space-y-6">
        {/* Product Details Header */}
        <div className="border-b border-gray-100 pb-4">
          <h3 className="text-sm tracking-widest font-medium text-gray-900 uppercase mb-4">
            Product Details
          </h3>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-400" />
              <span className="text-xs tracking-widest font-medium text-gray-500 uppercase">
                Color
              </span>
            </div>
            <Badge variant="outline" className="capitalize w-full justify-center">
              {color}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gray-400" />
              <span className="text-xs tracking-widest font-medium text-gray-500 uppercase">
                Condition
              </span>
            </div>
            <Badge variant="outline" className="capitalize w-full justify-center">
              {condition}
            </Badge>
          </div>
        </div>

        {/* Style and Status */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-gray-400" />
                <span className="text-xs tracking-widest font-medium text-gray-500 uppercase">
                  Style
                </span>
              </div>
              <Badge variant="outline" className="capitalize">
                {style}
              </Badge>
            </div>
            {featured && (
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs tracking-widest font-medium text-gray-500 uppercase">
                  Status
                </span>
                <Badge variant="default" className="bg-gradient-to-r from-gray-800 to-black" icon={<Star className="w-3 h-3" />}>
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Stock Status with Interactive Counter */}
          <div className="space-y-3 pt-2 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-xs tracking-widest font-medium text-gray-500 uppercase">
                Availability
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant={stockStatus.variant}
                className={`${
                  stockStatus.variant === 'default'
                    ? stockStatus.color + ' text-white'
                    : 'border-gray-300'
                }`}
              >
                {stockStatus.text}
              </Badge>
              {instock > 0 && (
                <span className="text-sm text-gray-500">
                  {instock} available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Specifications */}
      <div className="border-t border-gray-200 pt-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-xs tracking-widest font-medium text-gray-500 uppercase">
              Fabric
            </h4>
            <p className="text-sm text-gray-900 font-medium">{fabric}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs tracking-widest font-medium text-gray-500 uppercase">
              Style
            </h4>
            <p className="text-sm text-gray-900 font-medium">{style}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs tracking-widest font-medium text-gray-500 uppercase">
              Size
            </h4>
            <p className="text-sm text-gray-900 font-medium">{size}</p>
          </div>
        </div>

        {/* Care Instructions with subtle animation */}

      </div>

    </div>
  );
};

export default ProductInfo;

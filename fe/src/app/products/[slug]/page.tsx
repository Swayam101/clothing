'use client';

import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProductBySlug } from '@/api';
import { useProductStore } from '@/store/useProductStore';
import { useConfig } from '@/context/ConfigContext';
import ImageGallery from '@/features/products/components/ImageGallery';
import ProductInfo from '@/features/products/components/ProductInfo';
import SizeSelector from '@/features/products/components/SizeSelector';
import OrderButtons from '@/features/products/components/OrderButtons';
import TrustSignals from '@/features/products/components/TrustSignals';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { contact } = useConfig();
  const { selectedSize, setSelectedSize, resetSelection } = useProductStore();

  // Fetch product directly by slug
  const { data: productData, isLoading, error } = useProductBySlug(slug || '');

  // Extract product from response
  const product = useMemo(() => {
    if (!productData?.data) return null;
    return productData.data;
  }, [productData]);

  useEffect(() => {
    // Reset size selection when changing products
    resetSelection();
  }, [slug, resetSelection]);

  // Loading state
  if (isLoading || (!product && !error)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light mb-4 text-red-600">
            Error Loading Product
          </h1>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <Link
            href="/products"
            className="inline-block text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-light mb-4">Product Not Found</h1>
        <Link
          href="/products"
          className="text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const handleInstagramOrder = () => {
    if (!selectedSize) {
      alert('Please select a size first to claim this thrifted piece!');
      return;
    }
    window.open(contact.instagramUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-500 tracking-wide">
            <Link href="/" className="hover:text-black transition">
              HOME
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-black transition">
              SHOP
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">{product.title.toUpperCase()}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Product Images */}
            <ImageGallery images={[product.image]} productName={product.title} />

            {/* Product Info & Actions */}
            <div className="space-y-8">
              <ProductInfo
                name={product.title}
                price={product.price}
                description={product.description}
                fabric={product.fabric}
                fit={product.style}
                care={product.condition}
              />

              <SizeSelector
                sizes={[product.size]}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
              />

              <OrderButtons
                selectedSize={selectedSize}
                onInstagramOrder={handleInstagramOrder}
              />

              <TrustSignals />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


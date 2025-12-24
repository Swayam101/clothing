'use client';

import { useEffect, useMemo } from 'react';
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
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import ErrorDisplay from '@/shared/components/ui/ErrorDisplay';
import EmptyState from '@/shared/components/ui/EmptyState';

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
        <LoadingSpinner message="Loading product..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <ErrorDisplay
          title="Error Loading Product"
          message={error.message}
          backLinkHref="/products"
          backLinkText="Back to Products"
        />
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <EmptyState
          message="Product Not Found"
          showLink
          linkHref="/products"
          linkText="Back to Products"
        />
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
          <nav className="mb-8 text-sm text-gray-500 tracking-wide" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-black transition">
              HOME
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-black transition">
              SHOP
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">{product.title.toUpperCase()}</span>
          </nav>

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


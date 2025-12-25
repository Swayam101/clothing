'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProductBySlug } from '@/api';
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

  // Fetch product directly by slug
  const { data: productData, isLoading, error } = useProductBySlug(slug || '');

  // Extract product from response
  const product = useMemo(() => {
    if (!productData?.data) return null;
    return productData.data;
  }, [productData]);

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
            <ImageGallery images={Array.isArray(product.image) ? product.image : [product.image]} productName={product.title} />

            {/* Product Info & Actions */}
            <div className="space-y-8">
              <ProductInfo
                name={product.title}
                price={product.price}
                description={product.description}
                color={product.color}
                condition={product.condition}
                fabric={product.fabric}
                style={product.style}
                instock={product.instock}
                featured={product.featured}
                size={product.size}
                slug={slug}
              />

            

              <OrderButtons
                selectedSize={product.size}
                productId={product._id}
                productName={product.title}
                productPrice={product.price}
                isOutOfStock={product.instock === 0}
              />

              <TrustSignals />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useMemo } from 'react';
import HeroSection from '@/features/home/components/HeroSection';
import FeaturesSection from '@/features/home/components/FeaturesSection';
import FeaturedProducts from '@/features/home/components/FeaturedProducts';
import BenefitsSection from '@/features/home/components/BenefitsSection';
import NewsletterSection from '@/features/home/components/NewsletterSection';
import { useProducts } from '@/api';

export default function HomePage() {
  // Fetch featured products from new API
  const { data, isLoading } = useProducts({
    featured: true,
    limit: 4,
    inStock: true,
    isActive: true,
  });

  // Extract featured products
  const featuredProducts = useMemo(() => {
    if (!data?.data?.products) return [];
    return data.data.products;
  }, [data]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with featured products carousel */}
      {isLoading ? (
        <div className="pb-20 flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      ) : featuredProducts.length > 0 ? (
        <HeroSection featuredProducts={featuredProducts} />
      ) : (
        <div className="pb-20 flex items-center justify-center min-h-[600px]">
          <p className="text-gray-600">No thrifted pieces yet</p>
        </div>
      )}

      <div className="px-6 lg:px-8">
        <div className="mx-auto">
          <FeaturesSection />
        </div>
      </div>

      {/* Featured Products Section */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
        </div>
      ) : (
        <FeaturedProducts products={featuredProducts} />
      )}

      <BenefitsSection />

      <NewsletterSection />
    </div>
  );
}


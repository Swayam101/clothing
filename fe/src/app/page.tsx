'use client';

import { useMemo } from 'react';
import HeroSection from '@/features/home/components/HeroSection';
import FeaturesSection from '@/features/home/components/FeaturesSection';
import FeaturedProducts from '@/features/home/components/FeaturedProducts';
import BenefitsSection from '@/features/home/components/BenefitsSection';
import NewsletterSection from '@/features/home/components/NewsletterSection';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import EmptyState from '@/shared/components/ui/EmptyState';
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
          <LoadingSpinner message="Loading..." />
        </div>
      ) : featuredProducts.length > 0 ? (
        <HeroSection featuredProducts={featuredProducts} />
      ) : (
        <div className="pb-20 flex items-center justify-center min-h-[600px]">
          <EmptyState message="No thrifted pieces yet" />
        </div>
      )}

      <div className="px-6 lg:px-8">
        <div className="mx-auto">
          <FeaturesSection />
        </div>
      </div>

      {/* Featured Products Section */}
      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <FeaturedProducts products={featuredProducts} />
      )}

      <BenefitsSection />

      <NewsletterSection />
    </div>
  );
}


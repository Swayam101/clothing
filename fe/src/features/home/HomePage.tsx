import React, { useMemo } from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import FeaturedProducts from './components/FeaturedProducts';
import BenefitsSection from './components/BenefitsSection';
import NewsletterSection from './components/NewsletterSection';
import { useProducts, transformStrapiProducts } from '../../api';

const HomePage: React.FC = () => {
  // Fetch featured products from API
  const { data, isLoading } = useProducts({
    populate: 'image',
    filters: {
      featured: { $eq: true },
    },
    pagination: {
      pageSize: 4,
    },
  });

  // Transform Strapi products to app Product format
  const featuredProducts = useMemo(() => {
    if (!data?.data) return [];
    return transformStrapiProducts(data.data);
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
          <p className="text-gray-600">No featured products available</p>
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
};

export default HomePage;

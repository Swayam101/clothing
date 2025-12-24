'use client';

import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/shared/components/ui/Button';
import type { Product } from '@/types/api';
import HeroCarousel, { type CarouselSlide } from './HeroCarousel';
import { HOME_HERO } from '@/data/content/pages/home';

interface HeroSectionProps {
  featuredProducts: Product[];
}

// Convert featured products to carousel slides (one slide per product)
const createSlidesFromProducts = (products: Product[]): CarouselSlide[] => {
  return products.map((product) => ({
    id: product._id,
    image: product.image,
    alt: product.title,
    price: product.price,
    label: HOME_HERO.carouselLabel,
  }));
};

const HeroSection: React.FC<HeroSectionProps> = ({ featuredProducts }) => {
  const slides = useMemo(
    () => createSlidesFromProducts(featuredProducts),
    [featuredProducts]
  );

  return (
    <div className="pb-20">
      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-8 items-start">
            <div className="space-y-4">
              <div className="text-sm tracking-widest text-gray-500">
                {HOME_HERO.badge}
              </div>
              <h1 className="text-6xl md:text-7xl font-light leading-tight">
                {HOME_HERO.titleLine1}
                <br />
                <span className="font-normal">{HOME_HERO.titleLine2}</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              {HOME_HERO.subtitle}
            </p>
            <div className="flex gap-6 items-center">
              <Button to={HOME_HERO.ctaHref} className="group">
                {HOME_HERO.ctaText}
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </Button>
            </div>
          </div>

          {/* Right Carousel */}
          <div className="relative">
            <div className="aspect-square bg-gray-100 overflow-hidden">
              {slides.length > 0 ? (
                <HeroCarousel
                  slides={slides}
                  autoplayInterval={4000}
                  showPrice={true}
                  showNavigation={true}
                  showIndicators={true}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">{HOME_HERO.emptyMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

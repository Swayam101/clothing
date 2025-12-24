'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CarouselSlide {
  id: number | string;
  image: string;
  alt?: string;
  price?: number;
  label?: string;
}

interface HeroCarouselProps {
  slides: CarouselSlide[];
  autoplayInterval?: number;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showPrice?: boolean;
  className?: string;
}

const HeroCarousel = ({
  slides,
  autoplayInterval = 5000,
  showNavigation = true,
  showIndicators = true,
  showPrice = true,
  className = '',
}: HeroCarouselProps) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Autoplay
  useEffect(() => {
    if (autoplayInterval <= 0) return;
    const interval = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplayInterval, nextSlide]);

  if (!slides.length) return null;

  return (
    <div
      className={`relative w-full h-full overflow-hidden group ${className}`}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt || `Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />

            {/* Floating Price Badge */}
            {showPrice && slide.price && (
              <div className="absolute bottom-6 right-6 bg-white border border-gray-200 px-5 py-3 shadow-lg z-20">
                <div className="text-2xl font-light tracking-tight">
                  ₹{slide.price.toLocaleString()}
                </div>
                {slide.label && (
                  <div className="text-xs text-gray-500 tracking-wide mt-0.5">
                    {slide.label}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-gray-200 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-black" strokeWidth={1.5} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white border border-gray-200 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-black" strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-0.5 transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-black'
                  : 'w-4 bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;

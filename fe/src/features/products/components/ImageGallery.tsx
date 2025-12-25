'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div>
      {/* Main Image with Navigation */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4 group">
        <Image
          src={images[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-px transition-all ${
                index === currentImageIndex
                  ? 'bg-black w-8'
                  : 'bg-gray-400 w-6'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative aspect-square bg-gray-100 overflow-hidden border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              index === currentImageIndex
                ? 'border-black ring-2 ring-black/20'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              sizes="(max-width: 768px) 25vw, 12vw"
            />
            {index === currentImageIndex && (
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

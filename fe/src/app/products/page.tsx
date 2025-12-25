'use client';

import React, { Suspense } from 'react';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

// Lazy load the products content for code splitting
const ProductsContent = React.lazy(() =>
  import('@/features/products/components/ProductsContent')
);

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner message="Loading products..." />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}


'use client';

import React, { Suspense } from 'react';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

// Lazy load the orders content for code splitting
const OrdersContent = React.lazy(() =>
  import('@/features/orders/components/OrdersContent')
);

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner message="Loading your orders..." />
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}

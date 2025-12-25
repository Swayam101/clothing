'use client';

import React, { Suspense } from 'react';
import OrderFailure from '@/shared/components/OrderFailure';

const OrderFailureContent: React.FC = () => {
  const { useRouter, useSearchParams } = require('next/navigation');
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';
  const errorMessage = searchParams.get('error') || searchParams.get('reason') || 'Payment could not be processed';

  const handleRetry = () => {
    router.back(); // Go back to product page to retry
  };

  const handleContinueShopping = () => {
    router.push('/products');
  };

  return (
    <OrderFailure
      orderId={orderId}
      errorMessage={errorMessage}
      onRetry={handleRetry}
      onContinueShopping={handleContinueShopping}
    />
  );
};

const OrderFailurePage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderFailureContent />
    </Suspense>
  );
};

export default OrderFailurePage;

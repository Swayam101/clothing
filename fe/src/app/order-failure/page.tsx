'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OrderFailure from '@/shared/components/OrderFailure';

const OrderFailurePage: React.FC = () => {
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

export default OrderFailurePage;

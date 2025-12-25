'use client';

import React, { Suspense } from 'react';
import OrderSuccess from '@/shared/components/OrderSuccess';

const OrderSuccessContent: React.FC = () => {
  const { useRouter, useSearchParams } = require('next/navigation');
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';

  const handleContinueShopping = () => {
    router.push('/products');
  };

  const handleViewOrders = () => {
    router.push('/orders'); // This might need to be implemented later
  };

  return (
    <OrderSuccess
      orderId={orderId}
      onContinueShopping={handleContinueShopping}
      onViewOrders={handleViewOrders}
    />
  );
};

const OrderSuccessPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccessPage;

'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import OrderSuccess from '@/shared/components/OrderSuccess';

const OrderSuccessPage: React.FC = () => {
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

export default OrderSuccessPage;

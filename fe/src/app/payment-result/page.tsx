'use client';

import React, { Suspense } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useVerifyOrder } from '@/api/hooks/useOrders';

const PaymentResultContent: React.FC = () => {
  const { useRouter, useSearchParams, useEffect } = require('next/navigation');
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id') || '';

  // Use the verify order hook
  const { data: verificationData, isLoading, error } = useVerifyOrder(orderId, !!orderId);

  useEffect(() => {
    if (!orderId) {
      // No order ID provided, redirect to failure
      setTimeout(() => {
        router.push('/order-failure?reason=no_order_id');
      }, 1000);
      return;
    }

    if (verificationData?.success) {
      if (verificationData.data.paymentStatus === 'paid') {
        // Payment successful, redirect after delay
        setTimeout(() => {
          router.push(`/order-success?order_id=${orderId}`);
        }, 2000);
      } else {
        // Payment not completed, redirect to failure
        setTimeout(() => {
          router.push(`/order-failure?order_id=${orderId}&reason=payment_pending`);
        }, 2000);
      }
    } else if (error) {
      // Verification failed, redirect to failure
      setTimeout(() => {
        router.push(`/order-failure?order_id=${orderId}&reason=verification_failed`);
      }, 2000);
    }
  }, [verificationData, error, orderId, router]);

  // Determine status based on hook state
  const getStatus = () => {
    if (isLoading) return 'loading';
    if (verificationData?.success && verificationData.data.paymentStatus === 'paid') return 'success';
    if (error || (verificationData?.success && verificationData.data.paymentStatus !== 'paid')) return 'failure';
    return 'loading';
  };

  const status = getStatus();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-gray-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              Verifying Payment
            </h1>
            <p className="text-gray-600 mb-6">
              Please wait while we confirm your payment status...
            </p>
            {orderId && (
              <p className="text-sm text-gray-500">
                Order ID: <span className="font-mono">{orderId}</span>
              </p>
            )}
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Redirecting you to order confirmation...
            </p>
          </>
        )}

        {status === 'failure' && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-4">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              Redirecting you to order status page...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

const PaymentResultPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultContent />
    </Suspense>
  );
};

export default PaymentResultPage;

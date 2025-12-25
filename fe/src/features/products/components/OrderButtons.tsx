'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCreateOrder } from '@/api/hooks/useOrders';
import OrderModal from '@/shared/components/OrderModal';
import PaymentModal from '@/shared/components/PaymentModal';

interface OrderButtonsProps {
  selectedSize: string;
  productId: string;
  productName: string;
  productPrice: number;
  isOutOfStock?: boolean;
}

const OrderButtons: React.FC<OrderButtonsProps> = ({
  selectedSize,
  productId,
  productName,
  productPrice,
  isOutOfStock = false,
}) => {
  const router = useRouter();
  const { user } = useAuthStore();

  // Modal states
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Order data
  const [orderData, setOrderData] = useState<any>(null);

  // API hooks
  const createOrderMutation = useCreateOrder();

  const handleOrderClick = () => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }
    setShowOrderModal(true);
  };

  const handleOrderSubmit = async (orderFormData: any) => {
    try {
      const result = await createOrderMutation.mutateAsync({
        items: [productId], // Server expects array of product ID strings
        deliveryAddress: orderFormData.deliveryAddress, // Server expects deliveryAddress
        billingAddress: orderFormData.deliveryAddress, // Same as delivery for now
        phone: orderFormData.phone, // Add the phone field
        paymentMethod: 'cashfree',
        customerNotes: `Size: ${selectedSize}`,
      });

      if (result.success) {
        setOrderData(result.data);
        setShowOrderModal(false);
        setShowPaymentModal(true);
      } else {
        throw new Error(result.message || 'Failed to create order');
      }
    } catch (error: any) {
      console.error('Order creation error:', error);
      alert(error.message || 'Failed to create order. Please try again.');
    }
  };

  const handlePaymentSuccess = (orderId: string) => {
    setShowPaymentModal(false);
    router.push(`/order-success?order_id=${orderId}`);
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    setShowPaymentModal(false);
    router.push(`/order-failure?order_id=${orderData?.orderId}&error=${encodeURIComponent(error.message || 'Payment failed')}`);
  };

  if (isOutOfStock) {
    return (
      <div className="space-y-4">
        <button
          disabled
          className="w-full py-4 bg-gray-200 text-gray-400 cursor-not-allowed text-sm tracking-wide rounded-none"
        >
          OUT OF STOCK
        </button>
        <p className="text-xs text-center text-gray-500">
          This item is currently out of stock
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <button
        style={{ backgroundColor: '#000' }}
          onClick={handleOrderClick}
          className="w-full py-4 text-white text-sm font-medium hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:scale-[1.02] rounded-none"
        >
          <CreditCard
            size={18}
            strokeWidth={2}
            className="transition-transform group-hover:scale-110"
          />
          BUY NOW - ₹{productPrice.toFixed(2)}
        </button>

        {!user && (
          <p className="text-xs text-center text-gray-500">
            Please sign in to place an order
          </p>
        )}

        {user && (
          <p className="text-xs text-center text-gray-500">
            Secure checkout powered by Cashfree ✨
          </p>
        )}
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        productName={productName}
        productPrice={productPrice}
        productSize={selectedSize}
        onSubmit={handleOrderSubmit}
        isLoading={createOrderMutation.isPending}
      />

      {/* Payment Modal */}
      {orderData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentSession={orderData.paymentSession}
          orderId={orderData.orderId}
          totalAmount={orderData.totalAmount}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
        />
      )}
    </>
  );
};

export default OrderButtons;

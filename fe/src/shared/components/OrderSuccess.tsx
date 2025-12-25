'use client';

import React from 'react';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

interface OrderSuccessProps {
  orderId: string;
  onContinueShopping?: () => void;
  onViewOrders?: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({
  orderId,
  onContinueShopping,
  onViewOrders,
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Your payment has been processed successfully</p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-lg font-medium text-gray-900 font-mono">{orderId}</p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-medium text-gray-900 text-center">{"What's Next?"}</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Order Processing</p>
                <p className="text-xs text-gray-600">{"We'll prepare your item within 1-2 business days"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Shipping</p>
                <p className="text-xs text-gray-500">Standard delivery in 5-7 business days</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery</p>
                <p className="text-xs text-gray-500">{"You'll receive tracking updates via WhatsApp"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onContinueShopping}
            className="w-full py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors rounded-none"
          >
            Continue Shopping
          </button>

          <button
            onClick={onViewOrders}
            className="w-full py-4 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors rounded-none"
          >
            View My Orders
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-2">
            Questions about your order?
          </p>
          <p className="text-xs text-gray-500">
            Contact us via WhatsApp or Instagram
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

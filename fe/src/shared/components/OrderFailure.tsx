'use client';

import React from 'react';
import { XCircle, RefreshCw, Home } from 'lucide-react';

interface OrderFailureProps {
  orderId?: string;
  errorMessage?: string;
  onRetry?: () => void;
  onContinueShopping?: () => void;
}

const OrderFailure: React.FC<OrderFailureProps> = ({
  orderId,
  errorMessage,
  onRetry,
  onContinueShopping,
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Failure Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600">We couldn't process your payment</p>
        </div>

        {/* Error Details */}
        {(orderId || errorMessage) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            {orderId && (
              <div className="mb-2">
                <p className="text-sm text-red-800 font-medium">Order ID</p>
                <p className="text-sm text-red-700 font-mono">{orderId}</p>
              </div>
            )}
            {errorMessage && (
              <div>
                <p className="text-sm text-red-800 font-medium">Error</p>
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}
          </div>
        )}

        {/* Common Issues */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Common Solutions</h3>
          <ul className="text-xs text-gray-600 space-y-2">
            <li>• Check your internet connection</li>
            <li>• Ensure sufficient balance in your account</li>
            <li>• Verify your card details</li>
            <li>• Try a different payment method</li>
            <li>• Contact your bank if the issue persists</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors rounded-none flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}

          <button
            onClick={onContinueShopping}
            className="w-full py-4 border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors rounded-none flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            Still having issues?
          </p>
          <p className="text-xs text-gray-500">
            Contact our support team via WhatsApp or Instagram
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderFailure;

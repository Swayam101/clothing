'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { X, CreditCard, Shield, Loader2 } from 'lucide-react';
import { useModal } from '@/hooks/useModal';

interface PaymentSession {
  payment_session_id: string;
  order_id: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentSession: PaymentSession;
  orderId: string;
  totalAmount: number;
  onPaymentSuccess?: (orderId: string) => void;
  onPaymentFailure?: (error: any) => void;
}

declare global {
  interface Window {
    Cashfree: any;
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  paymentSession,
  orderId,
  totalAmount,
  onPaymentSuccess,
  onPaymentFailure,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  // Modal accessibility and scrolling
  const { handleBackdropClick } = useModal({ isOpen, onClose });
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen]);

  // Load Cashfree SDK
  useEffect(() => {
    if (isOpen && !sdkLoaded) {
      const loadCashfreeSDK = () => {
        return new Promise<void>((resolve, reject) => {
          // Check if already loaded
          if (window.Cashfree) {
            setSdkLoaded(true);
            resolve();
            return;
          }

          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.async = true;

          script.onload = () => {
            setSdkLoaded(true);
            resolve();
          };

          script.onerror = (error) => {
            console.error('Failed to load Cashfree SDK:', error);
            reject(new Error('Failed to load Cashfree SDK'));
          };

          document.head.appendChild(script);

          // Timeout fallback
          setTimeout(() => {
            if (!window.Cashfree) {
              reject(new Error('SDK load timeout'));
            }
          }, 10000);
        });
      };

      loadCashfreeSDK().catch((error) => {
        console.error('SDK loading error:', error);
        onPaymentFailure?.(error);
      });
    }
  }, [isOpen, sdkLoaded, onPaymentFailure]);

  const initiatePayment = useCallback(async () => {
    // Validate payment session
    if (!paymentSession?.payment_session_id) {
      console.error('No payment session ID provided');
      onPaymentFailure?.(new Error('Payment session ID is missing'));
      return;
    }

    if (typeof paymentSession.payment_session_id !== 'string' || paymentSession.payment_session_id.trim() === '') {
      console.error('Invalid payment session ID');
      onPaymentFailure?.(new Error('Payment session ID is invalid'));
      return;
    }

    if (!window.Cashfree) {
      console.error('Cashfree SDK not loaded');
      onPaymentFailure?.(new Error('Payment SDK not available'));
      return;
    }

    try {
      setIsLoading(true);
      setPaymentInitiated(true);

      const cashfree = window.Cashfree({
        mode: 'sandbox'
      });

      const returnUrl = `${window.location.origin}/payment-result?order_id=${orderId}`;
      const checkoutOptions = {
        paymentSessionId: paymentSession.payment_session_id,
        returnUrl: returnUrl,
        redirectTarget: '_self',
      };

      if (!checkoutOptions.paymentSessionId || checkoutOptions.paymentSessionId.trim() === '') {
        console.error('Invalid checkout options');
        onPaymentFailure?.(new Error('Invalid checkout options'));
        return;
      }
      cashfree.checkout(checkoutOptions).then((result: any) => {
        if (result.error) {
          console.error('Checkout error:', result.error);
          setIsLoading(false);
          setPaymentInitiated(false);
          onPaymentFailure?.(result.error);
          return;
        }

        if (result.redirect) {
          // Modal will close automatically when user is redirected
          return;
        }

        if (result.payment) {
          setIsLoading(false);
          onPaymentSuccess?.(result);
          return;
        }

        setIsLoading(false);
        onPaymentFailure?.(new Error('Unexpected checkout result'));

      }).catch((error: any) => {
        console.error('Checkout failed:', error);
        setIsLoading(false);
        setPaymentInitiated(false);
        onPaymentFailure?.(error);
      });

    } catch (error) {
      console.error('Payment setup error:', error);
      setIsLoading(false);
      setPaymentInitiated(false);
      onPaymentFailure?.(error);
    }
  }, [paymentSession.payment_session_id, orderId, onPaymentFailure]);

  // Initialize payment when modal opens and SDK is loaded
  useEffect(() => {
    if (isOpen && sdkLoaded && !paymentInitiated) {
      initiatePayment();
    }
  }, [isOpen, sdkLoaded, paymentInitiated, initiatePayment]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        <div
          ref={modalRef}
          className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 id="payment-modal-title" className="text-lg font-medium text-gray-900">
                    Secure Payment
                  </h2>
                  <p className="text-sm text-gray-600">Order #{orderId}</p>
                </div>
              </div>
              <button
                ref={initialFocusRef}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                disabled={isLoading}
                aria-label="Close payment modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {sdkLoaded ? 'Processing Payment...' : 'Loading Payment...'}
                </h3>
                <p className="text-sm text-gray-600">
                  {sdkLoaded
                    ? 'Please wait while we redirect you to our secure payment gateway'
                    : 'Initializing secure payment gateway'
                  }
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Initializing Payment</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Setting up your secure payment session
                </p>

                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="text-lg font-medium text-gray-900">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={initiatePayment}
                  className="w-full py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors rounded-none"
                >
                  Start Payment Process
                </button>
              </div>
            )}

            {/* Security Note */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;

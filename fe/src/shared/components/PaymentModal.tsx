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
  console.log('🔍 PaymentModal - Component render:', {
    isOpen,
    orderId,
    totalAmount,
    paymentSessionId: paymentSession?.payment_session_id,
    hasOnPaymentSuccess: !!onPaymentSuccess,
    hasOnPaymentFailure: !!onPaymentFailure,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  // Modal accessibility and scrolling
  const { handleBackdropClick } = useModal({
    isOpen,
    onClose: () => {
      console.log('🔍 PaymentModal - Modal closed via backdrop or ESC');
      onClose();
    }
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    console.log('🔍 PaymentModal - Focus management useEffect:', { isOpen });
    if (isOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen]);

  // Load Cashfree SDK
  useEffect(() => {
    console.log('🔍 PaymentModal - SDK Loading useEffect:', {
      isOpen,
      sdkLoaded,
      hasCashfree: !!window.Cashfree,
      userAgent: navigator.userAgent,
      protocol: window.location.protocol,
      hostname: window.location.hostname
    });

    if (isOpen && !sdkLoaded) {
      console.log('🔍 PaymentModal - Starting SDK load...');

      const loadCashfreeSDK = () => {
        return new Promise<void>((resolve, reject) => {
          // Check if already loaded
          if (window.Cashfree) {
            console.log('✅ PaymentModal - Cashfree SDK already available');
            setSdkLoaded(true);
            resolve();
            return;
          }

          console.log('🔍 PaymentModal - Creating Cashfree script element...');

          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.async = true;
          script.crossOrigin = 'anonymous';

          script.onload = () => {
            console.log('✅ PaymentModal - Cashfree SDK loaded successfully');
            console.log('🔍 PaymentModal - window.Cashfree available:', !!window.Cashfree);
            setSdkLoaded(true);
            resolve();
          };

          script.onerror = (error) => {
            console.error('❌ PaymentModal - Failed to load Cashfree SDK:', error);
            console.error('❌ PaymentModal - Script load error details:', {
              src: script.src,
              error: error
            });
            reject(new Error('Failed to load Cashfree SDK'));
          };

          console.log('🔍 PaymentModal - Appending script to document head...');
          document.head.appendChild(script);

          // Timeout fallback
          setTimeout(() => {
            if (!window.Cashfree) {
              console.error('❌ PaymentModal - SDK load timeout after 10 seconds');
              reject(new Error('SDK load timeout'));
            }
          }, 10000);
        });
      };

      loadCashfreeSDK().catch((error) => {
        console.error('❌ PaymentModal - SDK loading error:', error);
        onPaymentFailure?.(error);
      });
    }
  }, [isOpen, sdkLoaded, onPaymentFailure]);

  const initiatePayment = useCallback(async () => {
    console.log('🔍 PaymentModal - initiatePayment called:', {
      hasCashfree: !!window.Cashfree,
      sdkLoaded,
      paymentSessionId: paymentSession.payment_session_id,
      orderId,
      totalAmount,
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      nextPublicVercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL
    });
    if (!window.Cashfree) {
      console.error('❌ PaymentModal - Cashfree SDK not loaded');
      console.error('❌ PaymentModal - window.Cashfree:', window.Cashfree);
      console.error('❌ PaymentModal - sdkLoaded state:', sdkLoaded);
      onPaymentFailure?.(new Error('Payment SDK not available'));
      return;
    }

    try {
      console.log('✅ PaymentModal - SDK available, initializing Cashfree...');
      setIsLoading(true);
      setPaymentInitiated(true);

      // Initialize Cashfree
      const cashfreeMode = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';
      console.log('🔍 PaymentModal - Initializing Cashfree with mode:', cashfreeMode);

      const cashfree = window.Cashfree({
        mode: cashfreeMode
      });

      console.log('✅ PaymentModal - Cashfree instance created:', !!cashfree);

      // Create checkout options
      const returnUrl = `${window.location.origin}/payment-result?order_id=${orderId}`;
      const checkoutOptions = {
        paymentSessionId: paymentSession.payment_session_id,
        returnUrl: returnUrl,
        redirectTarget: '_self', // Stay in same tab
      };

      console.log('🔍 PaymentModal - Checkout options:', {
        paymentSessionId: paymentSession.payment_session_id,
        returnUrl,
        redirectTarget: '_self'
      });

      console.log('🚀 PaymentModal - Calling cashfree.checkout()...');

      // Start payment
      cashfree.checkout(checkoutOptions).then((result: any) => {
        console.log('✅ PaymentModal - Checkout success result:', result);
        console.log('🔍 PaymentModal - Result details:', {
          hasError: !!result.error,
          hasRedirect: !!result.redirect,
          resultKeys: Object.keys(result)
        });

        if (result.error) {
          console.error('❌ PaymentModal - Checkout error:', result.error);
          console.error('❌ PaymentModal - Error details:', {
            error: result.error,
            errorType: typeof result.error,
            errorMessage: result.error?.message || 'Unknown error'
          });
          setIsLoading(false);
          setPaymentInitiated(false);
          onPaymentFailure?.(result.error);
        }

        // Handle redirect (normal flow)
        if (result.redirect) {
          console.log('🔄 PaymentModal - Redirecting to payment page...');
          console.log('🔍 PaymentModal - Redirect details:', result.redirect);
          // Modal will close automatically when user is redirected
        }
      }).catch((error: any) => {
        console.error('❌ PaymentModal - Checkout promise rejected:', error);
        const errorObj = error as any;
        console.error('❌ PaymentModal - Checkout error details:', {
          error,
          errorType: typeof error,
          errorMessage: errorObj?.message || 'Unknown checkout error',
          errorStack: errorObj?.stack
        });
        setIsLoading(false);
        setPaymentInitiated(false);
        onPaymentFailure?.(error);
      });

    } catch (error) {
      console.error('❌ PaymentModal - Payment setup error:', error);
      const errorObj = error as any;
      console.error('❌ PaymentModal - Setup error details:', {
        error,
        errorType: typeof error,
        errorMessage: errorObj?.message || 'Unknown setup error',
        errorStack: errorObj?.stack,
        cashfreeAvailable: !!window.Cashfree,
        paymentSession: paymentSession
      });
      setIsLoading(false);
      setPaymentInitiated(false);
      onPaymentFailure?.(error);
    }
  }, [paymentSession.payment_session_id, orderId, onPaymentFailure]);

  // Initialize payment when modal opens and SDK is loaded
  useEffect(() => {
    console.log('🔍 PaymentModal - Payment Init useEffect:', {
      isOpen,
      sdkLoaded,
      paymentInitiated,
      hasCashfree: !!window.Cashfree
    });

    if (isOpen && sdkLoaded && !paymentInitiated) {
      console.log('🔍 PaymentModal - Auto-initiating payment...');
      initiatePayment();
    }
  }, [isOpen, sdkLoaded, paymentInitiated, initiatePayment]);

  if (!isOpen) {
    console.log('🔍 PaymentModal - Component not rendered (isOpen=false)');
    return null;
  }

  console.log('🔍 PaymentModal - Rendering modal with props:', {
    orderId,
    totalAmount,
    paymentSessionId: paymentSession.payment_session_id,
    isLoading,
    sdkLoaded,
    paymentInitiated
  });

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
                onClick={() => {
                  console.log('🔍 PaymentModal - Close button clicked');
                  onClose();
                }}
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
                  onClick={() => {
                    console.log('🔍 PaymentModal - "Start Payment Process" button clicked');
                    initiatePayment();
                  }}
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

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, MapPin, Phone, Package } from 'lucide-react';
import { Input } from '@/shared/components/ui';
import { useModal } from '@/hooks/useModal';

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderData {
  deliveryAddress: DeliveryAddress;
  phone: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
  productSize: string;
  onSubmit: (orderData: OrderData) => void;
  isLoading?: boolean;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  productName,
  productPrice,
  productSize,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<OrderData>({
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
    },
    phone: '',
  });

  const [errors, setErrors] = useState<Partial<OrderData & DeliveryAddress>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderData & DeliveryAddress> = {};

    if (!formData.deliveryAddress.street.trim()) {
      newErrors.street = 'Street address is required';
    } else if (formData.deliveryAddress.street.trim().length < 5) {
      newErrors.street = 'Street address must be at least 5 characters';
    }
    if (!formData.deliveryAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.deliveryAddress.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.deliveryAddress.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^[0-9]{6}$/.test(formData.deliveryAddress.zipCode.trim())) {
      newErrors.zipCode = 'ZIP code must be exactly 6 digits';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        phone: formData.phone.replace(/\s+/g, ''), // Remove spaces
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof OrderData] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 -z-10"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="bg-white w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="modal-title" className="text-xl font-medium text-gray-900">
            Complete Your Order
          </h2>
          <button
            ref={initialFocusRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-6">

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Order Summary</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{productName}</span>
                <span className="font-medium">₹{productPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Size: {productSize}</span>
                <span className="text-gray-600">Qty: 1</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{productPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Delivery Address */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-900">Delivery Address</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Street address, apartment, suite, etc."
                    value={formData.deliveryAddress.street}
                    onChange={(e) => handleInputChange('deliveryAddress.street', e.target.value)}
                    className={`w-full ${errors.street ? 'border-red-300 focus:border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  {errors.street && (
                    <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="City"
                      value={formData.deliveryAddress.city}
                      onChange={(e) => handleInputChange('deliveryAddress.city', e.target.value)}
                      className={`w-full ${errors.city ? 'border-red-300 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="State"
                      value={formData.deliveryAddress.state}
                      onChange={(e) => handleInputChange('deliveryAddress.state', e.target.value)}
                      className={`w-full ${errors.state ? 'border-red-300 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="ZIP Code"
                      value={formData.deliveryAddress.zipCode}
                      onChange={(e) => handleInputChange('deliveryAddress.zipCode', e.target.value)}
                      className={`w-full ${errors.zipCode ? 'border-red-300 focus:border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Country"
                      value={formData.deliveryAddress.country}
                      onChange={(e) => handleInputChange('deliveryAddress.country', e.target.value)}
                      className="w-full"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-900">Contact Information</h3>
              </div>

              <div>
                <Input
                  type="tel"
                  placeholder="Phone number (10 digits)"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full ${errors.phone ? 'border-red-300 focus:border-red-500' : ''}`}
                  disabled={isLoading}
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  style={{ backgroundColor: '#000' }}
                  disabled={isLoading}
                  className="w-full py-4 text-white text-sm font-medium hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors rounded-none"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default OrderModal;

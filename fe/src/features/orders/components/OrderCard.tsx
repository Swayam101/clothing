'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import type { Order } from '@/types/order';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="border border-gray-200 bg-white hover:border-gray-300 transition-colors">
      {/* Order Header - Always Visible */}
      <div className="p-4 sm:p-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h3 className="text-xs sm:text-sm font-medium tracking-wider truncate">
                ORDER #{order.cashfreeOrderId || order.orderId}
              </h3>
              <span className="text-xs text-gray-500 tracking-wide">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'} • ₹{order.totalAmount.toFixed(2)}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
            aria-label={isExpanded ? 'Collapse order details' : 'Expand order details'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        {/* Order Items Preview */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto">
          {order.items.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 flex-shrink-0 overflow-hidden"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title || 'Product'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 56px, 64px"
                />
              )}
            </div>
          ))}
          {order.items.length > 4 && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-gray-500">+{order.items.length - 4}</span>
            </div>
          )}
        </div>
      </div>

      {/* Order Details - Expandable */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 sm:px-6 py-4 sm:py-6">
          <div className="space-y-6 sm:space-y-8">
            {/* Order Items Details */}
            <div>
              <h4 className="text-xs font-medium tracking-wider uppercase text-gray-900 mb-3 sm:mb-4">
                Items Ordered
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3 sm:gap-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.title || 'Product'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs sm:text-sm font-medium mb-1">
                        {item.title || 'Product'}
                      </h5>
                      <div className="text-xs text-gray-600 space-y-0.5">
                        {item.color && <div>Color: {item.color}</div>}
                        {item.size && <div>Size: {item.size}</div>}
                        {item.fabric && <div>Fabric: {item.fabric}</div>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs sm:text-sm font-medium">₹{item.price?.toFixed(2)}</div>
                      <div className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h4 className="text-xs font-medium tracking-wider uppercase text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                Delivery Address
              </h4>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <div className="font-medium text-gray-900">{order.customer.name}</div>
                <div className="mt-1">{order.shippingAddress.street}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                <div>{order.shippingAddress.zipCode}, {order.shippingAddress.country}</div>
                <div className="mt-2">Phone: {order.customer.phone}</div>
              </div>
            </div>

            {/* Order Total */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-medium tracking-wide">Total Amount</span>
                <span className="text-base sm:text-lg font-medium">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
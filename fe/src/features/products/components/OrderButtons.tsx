'use client';

import React from 'react';
import { Instagram } from 'lucide-react';

interface OrderButtonsProps {
  selectedSize: string;
  onInstagramOrder: () => void;
  isOutOfStock?: boolean;
}

const OrderButtons: React.FC<OrderButtonsProps> = ({
  selectedSize,
  onInstagramOrder,
  isOutOfStock = false,
}) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onInstagramOrder}
        disabled={isOutOfStock}
        className={`w-full py-4 text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group ${
          isOutOfStock
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-900 hover:shadow-lg hover:scale-[1.02]'
        }`}
      >
        <Instagram
          size={18}
          strokeWidth={2}
          className={`transition-transform group-hover:scale-110 ${isOutOfStock ? '' : 'group-hover:rotate-12'}`}
        />
        {isOutOfStock ? 'OUT OF STOCK' : 'CLAIM VIA INSTAGRAM DM'}
      </button>
      <p className="text-xs text-center text-gray-500">
        {isOutOfStock
          ? 'This item is currently out of stock'
          : 'DM us on Instagram to secure this pre-loved treasure ✨'
        }
      </p>
    </div>
  );
};

export default OrderButtons;

'use client';

import React from 'react';
import { Instagram } from 'lucide-react';

interface OrderButtonsProps {
  selectedSize: string;
  onInstagramOrder: () => void;
}

const OrderButtons: React.FC<OrderButtonsProps> = ({
  selectedSize,
  onInstagramOrder,
}) => {
  const handleOrder = () => {
    if (!selectedSize) {
      alert('Please select a size first to claim this thrifted piece!');
      return;
    }
    onInstagramOrder();
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleOrder}
        disabled={!selectedSize}
        className={`w-full py-4 text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
          selectedSize
            ? 'bg-black text-white hover:bg-gray-900'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Instagram size={18} strokeWidth={2} />
        CLAIM VIA INSTAGRAM DM
      </button>
      <p className="text-xs text-center text-gray-500">
        DM us on Instagram to secure this pre-loved treasure ✨
      </p>
    </div>
  );
};

export default OrderButtons;

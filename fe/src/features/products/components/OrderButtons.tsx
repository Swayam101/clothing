import React from 'react';

interface OrderButtonsProps {
  selectedSize: string;
  onWhatsAppOrder: () => void;
  onInstagramOrder: () => void;
}

const OrderButtons: React.FC<OrderButtonsProps> = ({
  selectedSize,
  onWhatsAppOrder,
  onInstagramOrder,
}) => {
  const handleOrder = (orderType: 'whatsapp' | 'instagram') => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    
    if (orderType === 'whatsapp') {
      onWhatsAppOrder();
    } else {
      onInstagramOrder();
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => handleOrder('whatsapp')}
        disabled={!selectedSize}
        className={`w-full py-4 text-sm tracking-wide transition-all duration-300 ${
          selectedSize
            ? 'bg-black text-white hover:bg-gray-900'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        ORDER VIA WHATSAPP
      </button>
      <button
        onClick={() => handleOrder('instagram')}
        disabled={!selectedSize}
        className={`w-full py-4 border text-sm tracking-wide transition-all duration-300 ${
          selectedSize
            ? 'border-black hover:bg-black hover:text-white'
            : 'border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        ORDER VIA INSTAGRAM
      </button>
    </div>
  );
};

export default OrderButtons;


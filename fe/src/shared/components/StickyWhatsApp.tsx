'use client';

import React from 'react';
import { openWhatsApp, getContactMessage } from '@/utils/whatsapp';
import WhatsAppIcon from './icons/WhatsAppIcon';

const StickyWhatsApp: React.FC = () => {
  const handleWhatsAppClick = () => {
    openWhatsApp(getContactMessage());
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-white border border-gray-300 hover:border-black text-black rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon size={24} />
    </button>
  );
};

export default StickyWhatsApp;

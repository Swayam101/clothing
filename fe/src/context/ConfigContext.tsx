'use client';

import React, { createContext, useContext } from 'react';
import {
  SITE_CONFIG,
  CONTACT_INFO,
  DELIVERY_INFO,
  PAYMENT_INFO,
} from '@/data/content/site';
import { FAQS, WHATSAPP_MESSAGES } from '@/data/content/pages/contact';

interface ConfigContextType {
  site: typeof SITE_CONFIG;
  contact: typeof CONTACT_INFO & { brandName: string };
  delivery: typeof DELIVERY_INFO;
  payment: typeof PAYMENT_INFO;
  faqs: typeof FAQS;
  whatsappMessages: typeof WHATSAPP_MESSAGES;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value: ConfigContextType = {
    site: SITE_CONFIG,
    contact: {
      ...CONTACT_INFO,
      brandName: SITE_CONFIG.brandName,
    },
    delivery: DELIVERY_INFO,
    payment: PAYMENT_INFO,
    faqs: FAQS,
    whatsappMessages: WHATSAPP_MESSAGES,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

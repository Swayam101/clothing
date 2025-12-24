'use client';

import React, { createContext, useContext } from 'react';
import {
  CONTACT_INFO,
  DELIVERY_INFO,
  FAQS,
  WHATSAPP_MESSAGES,
} from '@/utils/constants';

interface ConfigContextType {
  contact: typeof CONTACT_INFO;
  delivery: typeof DELIVERY_INFO;
  faqs: typeof FAQS;
  whatsappMessages: typeof WHATSAPP_MESSAGES;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = {
    contact: CONTACT_INFO,
    delivery: DELIVERY_INFO,
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

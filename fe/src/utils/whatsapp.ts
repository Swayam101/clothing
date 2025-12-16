import { CONTACT_INFO, WHATSAPP_MESSAGES } from './constants';

export const openWhatsApp = (message: string) => {
  const url = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export const getOrderMessage = (productName: string, size: string) => {
  return WHATSAPP_MESSAGES.order(productName, size);
};

export const getContactMessage = () => {
  return WHATSAPP_MESSAGES.general;
};

export const getSizingHelpMessage = () => {
  return WHATSAPP_MESSAGES.sizing;
};

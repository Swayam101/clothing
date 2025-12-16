// ============================================
// CONTACT INFORMATION
// ============================================
export const CONTACT_INFO = {
  // Phone & Social
  whatsapp: '919876543210',
  whatsappUrl: 'https://wa.me/919876543210',
  instagram: 'yourbrand',
  instagramUrl: 'https://instagram.com/yourbrand',
  email: 'hello@yourbrand.com',
  
  // Brand
  brandName: 'Drift N Thrift',
  
  // Response Time
  responseTime: '1-2 hours',
  businessHours: '9 AM - 8 PM IST, Monday to Saturday',
} as const;

// ============================================
// DELIVERY INFORMATION
// ============================================
export const DELIVERY_INFO = {
  standardDelivery: '5-7 business days',
  deliveryMessage: 'We deliver to all major cities across India',
  exchangePolicy: 'Easy size exchange within 7 days',
  exchangePolicyDetailed: 'Just reach out to us within 7 days of receiving your order, and we will help you get the right fit.',
} as const;

// ============================================
// FREQUENTLY ASKED QUESTIONS
// ============================================
export const FAQS = [
  {
    id: 'how-to-order',
    question: 'How do I place an order?',
    answer:
      'Simply browse our products, select your size, and click "Order via WhatsApp" or "Order via Instagram DM". We will guide you through the rest!',
  },
  {
    id: 'delivery-times',
    question: 'What are the delivery times?',
    answer:
      'We typically deliver within 5-7 business days across India. We will provide tracking details once your order ships.',
  },
  {
    id: 'exchange-policy',
    question: 'Can I exchange if the size does not fit?',
    answer:
      'Yes! We offer size exchanges. Just reach out to us within 7 days of receiving your order, and we will help you get the right fit.',
  },
  {
    id: 'payment-methods',
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI, bank transfers, and cash on delivery (select locations). Payment details will be shared when you place your order.',
  },
  {
    id: 'shipping-coverage',
    question: 'Do you ship across India?',
    answer:
      'Yes! We deliver to all major cities and towns across India.',
  },
] as const;

// ============================================
// WHATSAPP MESSAGES
// ============================================
export const WHATSAPP_MESSAGES = {
  general: 'Hi, I have a question about your products.',
  sizing: 'Hi, I need help with sizing.',
  order: (productName: string, size: string) =>
    `Hi, I want to order:\nProduct: ${productName}\nSize: ${size}\nCity: `,
} as const;

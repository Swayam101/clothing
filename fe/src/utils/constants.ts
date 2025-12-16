// ============================================
// CONTACT INFORMATION
// ============================================
export const CONTACT_INFO = {
  // Phone & Social
  whatsapp: '918770075267',
  whatsappUrl: 'https://wa.me/918770075267',
  instagram: 'drift_nthrift',
  instagramUrl: 'https://instagram.com/drift_nthrift',
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
  deliveryMessage: 'We ship pre-loved treasures to all major cities across India',
  exchangePolicy: 'Easy size exchange within 7 days',
  exchangePolicyDetailed: 'Just reach out to us within 7 days of receiving your thrifted piece, and we will help you get the right fit.',
} as const;

// ============================================
// FREQUENTLY ASKED QUESTIONS
// ============================================
export const FAQS = [
  {
    id: 'how-to-order',
    question: 'How do I claim a thrifted piece?',
    answer:
      'Simply browse our curated pre-loved collection, select your size, and DM us on Instagram. We will guide you through securing your treasure!',
  },
  {
    id: 'condition',
    question: 'What condition are the thrifted items in?',
    answer:
      'All our pieces are carefully handpicked, cleaned, and quality-checked. We only sell items in excellent to like-new condition. Each piece has its own unique character and story!',
  },
  {
    id: 'delivery-times',
    question: 'What are the delivery times?',
    answer:
      'We typically ship within 2-3 days and deliver within 5-7 business days across India. Tracking details will be shared once your pre-loved piece is on its way!',
  },
  {
    id: 'exchange-policy',
    question: 'Can I exchange if the size does not fit?',
    answer:
      'Yes! We offer size exchanges. Just reach out to us within 7 days of receiving your thrifted piece, and we will help you get the right fit.',
  },
  {
    id: 'payment-methods',
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI, bank transfers, and cash on delivery (select locations). Payment details will be shared via Instagram DM when you claim your piece.',
  },
  {
    id: 'sustainability',
    question: 'Why thrift?',
    answer:
      'Thrifting is sustainable fashion! By giving pre-loved clothing a second life, you reduce waste, save resources, and create a unique style. Every thrifted piece is one-of-a-kind!',
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

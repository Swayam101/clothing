// ============================================
// CONTACT PAGE CONTENT
// Edit this file to customize the Contact page
// ============================================

export const CONTACT_PAGE = {
  // Page Header
  header: {
    title: 'Get in Touch',
    subtitle: "Questions? Feedback? We'd love to hear from you",
  },

  // Contact Methods
  methods: {
    whatsapp: {
      title: 'WHATSAPP',
      description: 'Quick responses, real humans',
      buttonText: 'CHAT NOW',
    },
    instagram: {
      title: 'INSTAGRAM',
      description: 'Follow us for style inspo',
      buttonText: 'FOLLOW US',
    },
    email: {
      title: 'EMAIL',
      description: 'For detailed inquiries',
      buttonText: 'SEND EMAIL',
    },
  },

  // FAQ Section
  faq: {
    title: 'FREQUENTLY ASKED QUESTIONS',
  },

  // Response Time Card
  responseTime: {
    title: 'Response Time',
    description: 'We typically respond within',
  },
} as const;

// ============================================
// FREQUENTLY ASKED QUESTIONS
// ============================================
export const FAQS = [
  {
    id: 'how-to-order',
    question: 'How do I place an order?',
    answer: 'Simply browse our collection, select your size, and proceed to checkout. You can pay via UPI, card, net banking, or cash on delivery.',
  },
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Orders are processed within 1-2 business days. Standard delivery takes 5-7 business days across India. You will receive tracking details once shipped.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer easy exchanges within 7 days of delivery. Items must be unworn, unwashed, and with original tags attached. Contact us to initiate a return.',
  },
  {
    id: 'sizing',
    question: 'How do I find my size?',
    answer: 'Check our detailed Size Guide for measurements. If you are between sizes or unsure, our team is happy to help you find the perfect fit!',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept UPI, credit/debit cards, net banking, and cash on delivery (available in select areas). All payments are processed securely.',
  },
  {
    id: 'quality',
    question: 'What makes your products special?',
    answer: 'We focus on premium materials, expert craftsmanship, and timeless designs. Every piece is quality-checked before shipping to ensure you receive the best.',
  },
] as const;

// ============================================
// WHATSAPP MESSAGE TEMPLATES
// ============================================
export const WHATSAPP_MESSAGES = {
  general: 'Hi! I have a question about your products.',
  sizing: 'Hi! I need help finding my size.',
  order: (productName: string, size: string) =>
    `Hi! I'd like to order:\n\nProduct: ${productName}\nSize: ${size}\n\nPlease confirm availability.`,
} as const;

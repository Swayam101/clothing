// ============================================
// SITE-WIDE CONFIGURATION
// Edit this file to customize for different clients
// ============================================

export const SITE_CONFIG = {
  // Brand Identity
  brandName: 'LUXE THREADS',
  tagline: 'Premium fashion, curated for you.',
  description: 'Discover quality clothing that combines style, comfort, and timeless design.',
  
  // Legal & Compliance
  legalDates: {
    privacyPolicyUpdated: 'January 1, 2025',
    termsUpdated: 'January 1, 2025',
    dataDeletionUpdated: 'January 1, 2025',
  },
  
  // Age Requirement
  minimumAge: 18,
  
  // Currency
  currency: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupees',
  },
  
  // Country/Region
  region: {
    country: 'India',
    governingLaw: 'India',
  },
} as const;

// ============================================
// CONTACT & SOCIAL INFORMATION
// ============================================
export const CONTACT_INFO = {
  // Phone & WhatsApp
  whatsapp: '919876543210',
  whatsappUrl: 'https://wa.me/919876543210',
  
  // Social Media
  instagram: 'luxethreads_official',
  instagramUrl: 'https://instagram.com/luxethreads_official',
  
  // Email
  email: 'hello@luxethreads.com',
  
  // Response Time
  responseTime: '2-4 hours',
  businessHours: '10 AM - 7 PM IST, Monday to Saturday',
} as const;

// ============================================
// DELIVERY & SHIPPING INFORMATION
// ============================================
export const DELIVERY_INFO = {
  standardDelivery: '5-7 business days',
  processingTime: '1-2 days',
  deliveryMessage: 'We deliver to all major cities across India',
  exchangePolicy: 'Easy exchange within 7 days',
  exchangePolicyDetailed: 'Not the right fit? No worries! Reach out within 7 days of receiving your order, and we will help you exchange it.',
  exchangeDays: 7,
  refundProcessingDays: '5-7 business days',
  taxRetentionYears: 7,
} as const;

// ============================================
// PAYMENT METHODS
// ============================================
export const PAYMENT_INFO = {
  methods: ['UPI', 'net banking', 'debit/credit cards', 'cash on delivery'],
  processor: 'Razorpay',
  codAvailability: 'select locations',
} as const;

// ============================================
// THIRD-PARTY SERVICES
// ============================================
export const THIRD_PARTY_SERVICES = {
  authentication: ['Google', 'Facebook'],
  payment: ['Razorpay'],
  infrastructure: ['Firebase'],
} as const;

// ============================================
// NAVIGATION LINKS
// ============================================
export const NAVIGATION = {
  mainNav: [
    { name: 'SHOP', path: '/products' },
    { name: 'SIZE GUIDE', path: '/size-guide' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ],
  legalLinks: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Data Deletion', href: '/data-deletion' },
  ],
  auth: {
    signIn: 'SIGN IN',
    signOut: 'LOGOUT',
  },
} as const;

// ============================================
// FOOTER CONTENT
// ============================================
export const FOOTER_CONTENT = {
  copyright: '© {year} All rights reserved',
} as const;

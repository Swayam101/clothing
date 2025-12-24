// ============================================
// HOME PAGE CONTENT
// Edit this file to customize the Home page
// ============================================

import { Truck, RotateCcw, Shield, type LucideIcon } from 'lucide-react';

// Hero Section
export const HOME_HERO = {
  badge: 'NEW COLLECTION ✨',
  titleLine1: 'Elevate',
  titleLine2: 'Your Style',
  subtitle: 'Premium quality clothing designed for the modern lifestyle. Timeless pieces that combine comfort with effortless elegance.',
  ctaText: 'SHOP NOW',
  ctaHref: '/products',
  carouselLabel: 'New',
  emptyMessage: 'Coming soon...',
} as const;

// Features Section
export const HOME_FEATURES: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Carefully sourced materials & expert craftsmanship',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary delivery on orders above ₹999',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free exchanges within 7 days',
  },
];

// Featured Products Section
export const HOME_FEATURED_PRODUCTS = {
  title: 'Featured Collection',
  subtitle: 'Handpicked styles from our latest arrivals',
  viewAllText: 'View All Products',
  viewAllHref: '/products',
} as const;

// Benefits Section
export const HOME_BENEFITS = {
  title: 'Why Choose Us',
  subtitle: 'We believe in quality over quantity—pieces that speak through craftsmanship, not hype',
  items: [
    {
      title: 'Premium Materials',
      description: 'We source only the finest fabrics—soft, breathable, and built to last. Feel the difference in every thread.',
    },
    {
      title: 'Perfect Fit Guarantee',
      description: "Our sizing is consistent and true. With detailed measurements and easy exchanges, finding your perfect fit is effortless.",
    },
    {
      title: 'Timeless Designs',
      description: 'Classic styles that never go out of fashion. Build a versatile wardrobe with pieces you will love for years.',
    },
  ],
} as const;

// Newsletter Section
export const HOME_NEWSLETTER = {
  titleLine1: 'Stay in the',
  titleLine2: 'Loop',
  subtitle: 'Be the first to know about new arrivals, exclusive offers, and style inspiration ✨',
  placeholder: 'Enter your email',
  buttonText: 'SUBSCRIBE',
  loadingText: 'SUBSCRIBING...',
  successMessage: 'Welcome to the family! Check your inbox for a special surprise.',
} as const;

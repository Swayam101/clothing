// ============================================
// ABOUT PAGE CONTENT
// Edit this file to customize the About page
// ============================================

export const ABOUT_PAGE = {
  // Hero Section
  hero: {
    titleLine1: 'Style Meets',
    titleLine2: 'Substance',
    subtitle: "We believe fashion should be effortless. Quality pieces that look great, feel amazing, and stand the test of time.",
  },

  // Our Story Section
  story: {
    title: 'OUR STORY',
    paragraphs: [
      "It started with a simple idea: create clothing that people actually want to wear every day. Not fast fashion that falls apart, not overpriced luxury—just well-made essentials that fit right.",
      "We spent countless hours sourcing the best materials, perfecting our fits, and building relationships with skilled artisans who share our vision for quality craftsmanship.",
      "Today, we're proud to offer a curated collection of timeless pieces that our customers love. Every item is designed to be a wardrobe staple you'll reach for again and again.",
    ],
  },

  // Philosophy Section
  philosophy: {
    title: 'OUR PHILOSOPHY',
    items: [
      {
        title: 'QUALITY OVER QUANTITY',
        description: 'We source premium materials and work with skilled craftspeople. Every piece is built to last.',
      },
      {
        title: 'TIMELESS DESIGN',
        description: "Classic styles that transcend trends. Pieces you'll love wearing for years, not just one season.",
      },
      {
        title: 'PERFECT FIT',
        description: 'We obsess over fit because we know how important it is. Comfortable, flattering, and true to size.',
      },
    ],
  },

  // Values Section
  values: {
    title: 'WHAT WE STAND FOR',
    items: [
      {
        title: 'TRANSPARENCY',
        description: "Honest pricing, clear product information, and straightforward policies. What you see is what you get.",
      },
      {
        title: 'SUSTAINABILITY',
        description: 'Quality pieces that last longer mean less waste. We choose materials and partners responsibly.',
      },
      {
        title: 'CUSTOMER FIRST',
        description: "Your satisfaction is our priority. If something isn't right, we'll make it right. No questions asked.",
      },
    ],
  },

  // CTA Section
  cta: {
    text: 'Ready to upgrade your wardrobe?',
    buttonText: 'EXPLORE COLLECTION',
    buttonHref: '/products',
  },
} as const;

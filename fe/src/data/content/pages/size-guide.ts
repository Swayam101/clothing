// ============================================
// SIZE GUIDE PAGE CONTENT
// Edit this file to customize the Size Guide page
// ============================================

export const SIZE_GUIDE_PAGE = {
  // Page Header
  header: {
    title: 'Size Guide',
    subtitle: 'Find your perfect fit with our detailed measurements',
  },

  // Introduction
  introduction: {
    text: 'All measurements are in centimeters (CM) and inches. Please note that measurements may vary slightly (±2cm) due to fabric properties and manufacturing tolerances.',
  },

  // Size Chart Section
  sizeChart: {
    title: 'T-SHIRTS & TOPS',
    columns: ['SIZE', 'CHEST (CM/IN)', 'LENGTH (CM/IN)', 'SHOULDER (CM/IN)'],
    rows: [
      { size: 'S', chest: '96 CM / 38"', length: '69 CM / 27"', shoulder: '44 CM / 17"' },
      { size: 'M', chest: '102 CM / 40"', length: '71 CM / 28"', shoulder: '46 CM / 18"' },
      { size: 'L', chest: '108 CM / 42"', length: '73 CM / 29"', shoulder: '48 CM / 19"' },
      { size: 'XL', chest: '114 CM / 45"', length: '75 CM / 30"', shoulder: '50 CM / 20"' },
      { size: 'XXL', chest: '120 CM / 47"', length: '77 CM / 30"', shoulder: '52 CM / 20"' },
    ],
  },

  // How to Measure Section
  howToMeasure: {
    title: 'HOW TO MEASURE',
    items: [
      {
        title: 'CHEST',
        description: 'Measure around the fullest part of your chest, keeping the tape measure horizontal and snug but not tight.',
      },
      {
        title: 'LENGTH',
        description: 'Measure from the highest point of the shoulder (where it meets the neck) down to the bottom hem.',
      },
      {
        title: 'SHOULDER',
        description: 'Measure from the edge of one shoulder to the other, across the back at the widest point.',
      },
    ],
  },

  // Fit Guide Section
  fitGuide: {
    title: 'FIT TYPES',
    items: [
      {
        title: 'REGULAR FIT',
        description: "Classic, comfortable fit that's not too tight or loose. Great for everyday wear and layering.",
      },
      {
        title: 'RELAXED FIT',
        description: 'Loose, comfortable cut with extra room throughout. Perfect for a laid-back, casual look.',
      },
      {
        title: 'SLIM FIT',
        description: 'Tailored, closer-to-body fit for a modern, streamlined silhouette. Consider sizing up if between sizes.',
      },
    ],
  },

  // CTA Section
  cta: {
    text: 'Still need help finding your size?',
    contactButtonText: 'ASK US',
    shopButtonText: 'SHOP NOW',
    shopButtonHref: '/products',
  },
} as const;

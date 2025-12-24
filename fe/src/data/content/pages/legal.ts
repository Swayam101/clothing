// ============================================
// LEGAL PAGES CONTENT
// Edit this file to customize Privacy Policy, Terms, and Data Deletion pages
// ============================================

// ============================================
// PRIVACY POLICY PAGE
// ============================================
export const PRIVACY_PAGE = {
  title: 'Privacy Policy',

  introduction: {
    paragraph1: 'we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.',
    paragraph2: 'By using our services, you agree to the collection and use of information in accordance with this policy.',
  },

  sections: {
    informationWeCollect: {
      title: 'INFORMATION WE COLLECT',
      personalInfo: {
        title: 'PERSONAL INFORMATION',
        intro: 'When you create an account, place an order, or contact us, we may collect:',
        items: [
          'Full name',
          'Email address',
          'Phone number',
          'Shipping and billing address',
          'Payment information (processed securely through our payment partners)',
        ],
      },
      accountInfo: {
        title: 'ACCOUNT INFORMATION',
        text: 'If you sign in using Google or Facebook, we receive your name, email address, and profile picture from these services. We do not store your social media passwords.',
      },
      autoCollected: {
        title: 'AUTOMATICALLY COLLECTED INFORMATION',
        intro: 'When you visit our website, we automatically collect:',
        items: [
          'Device information (browser type, operating system)',
          'IP address',
          'Pages visited and time spent on our site',
          'Referring website',
        ],
      },
    },

    howWeUse: {
      title: 'HOW WE USE YOUR INFORMATION',
      items: [
        { title: 'ORDER PROCESSING', description: 'To process and fulfill your orders, send order confirmations, and provide shipping updates.' },
        { title: 'CUSTOMER SUPPORT', description: 'To respond to your inquiries, provide customer service, and resolve any issues.' },
        { title: 'COMMUNICATION', description: 'To send you updates about your orders, and with your consent, promotional materials and newsletters.' },
        { title: 'IMPROVEMENT', description: 'To analyze usage patterns and improve our website, products, and services.' },
        { title: 'LEGAL COMPLIANCE', description: 'To comply with legal obligations and protect our rights.' },
      ],
    },

    dataSharing: {
      title: 'DATA SHARING & DISCLOSURE',
      intro: 'We do not sell your personal information. We may share your data with:',
      items: [
        { label: 'Service Providers', description: 'Payment processors, shipping partners, and analytics providers who help us operate our business' },
        { label: 'Legal Requirements', description: 'When required by law or to protect our rights and safety' },
        { label: 'Business Transfers', description: 'In connection with any merger, sale, or acquisition of our business' },
      ],
    },

    dataSecurity: {
      title: 'DATA SECURITY',
      intro: 'We implement appropriate technical and organizational measures to protect your personal information, including:',
      items: [
        'Secure HTTPS encryption for all data transmission',
        'Secure authentication through trusted providers (Google, Facebook)',
        'Regular security assessments and updates',
        'Limited access to personal data on a need-to-know basis',
      ],
    },

    yourRights: {
      title: 'YOUR RIGHTS',
      intro: 'You have the right to:',
      items: [
        { label: 'Access', description: 'Request a copy of your personal data' },
        { label: 'Correction', description: 'Update or correct inaccurate information' },
        { label: 'Deletion', description: 'Request deletion of your personal data' },
        { label: 'Portability', description: 'Receive your data in a portable format' },
        { label: 'Withdraw Consent', description: 'Opt-out of marketing communications at any time' },
      ],
      linkText: 'To exercise these rights, please visit our Data Deletion page or contact us directly.',
    },

    cookies: {
      title: 'COOKIES & TRACKING',
      intro: 'We use cookies and similar technologies to:',
      items: [
        'Keep you signed in to your account',
        'Remember your preferences',
        'Analyze website traffic and usage',
        'Improve our services',
      ],
      footer: 'You can manage cookie preferences through your browser settings.',
    },

    thirdParty: {
      title: 'THIRD-PARTY SERVICES',
      intro: 'Our website integrates with third-party services that have their own privacy policies:',
      footer: 'We encourage you to review their privacy policies.',
    },

    children: {
      title: "CHILDREN'S PRIVACY",
      text: 'Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.',
    },

    changes: {
      title: 'CHANGES TO THIS POLICY',
      text: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.',
    },

    contact: {
      title: 'CONTACT US',
      intro: 'If you have any questions about this Privacy Policy, please contact us:',
    },
  },

  relatedPolicies: {
    title: 'Related Policies',
    links: [
      { text: 'TERMS & CONDITIONS', href: '/terms' },
      { text: 'DATA DELETION', href: '/data-deletion' },
    ],
  },
} as const;

// ============================================
// TERMS & CONDITIONS PAGE
// ============================================
export const TERMS_PAGE = {
  title: 'Terms & Conditions',

  introduction: {
    paragraph1: 'By accessing our website and making purchases, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.',
    paragraph2: 'These terms apply to all visitors, users, and customers of our website and services.',
  },

  definitions: {
    title: 'DEFINITIONS',
    items: [
      { term: '"We," "Us," "Our"', definition: 'refers to {brandName}.' },
      { term: '"You," "Your"', definition: 'refers to the user or customer.' },
      { term: '"Products"', definition: 'refers to items available for purchase on our website.' },
      { term: '"Services"', definition: 'refers to all services provided by {brandName}.' },
      { term: '"Website"', definition: 'refers to our online platform and all its pages.' },
    ],
  },

  sections: {
    accountTerms: {
      title: 'ACCOUNT TERMS',
      items: [
        { title: 'ACCOUNT CREATION', description: 'You may create an account using Google or Facebook authentication. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.' },
        { title: 'ACCOUNT ACCURACY', description: 'You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.' },
        { title: 'AGE REQUIREMENT', description: 'You must be at least {minimumAge} years old to create an account and make purchases. By using our services, you represent that you meet this age requirement.' },
      ],
    },

    productsAndPricing: {
      title: 'PRODUCTS & PRICING',
      items: [
        { title: 'PRODUCT DESCRIPTIONS', description: 'We strive to display our products as accurately as possible. Colors may vary slightly due to photography and screen settings. Please refer to product descriptions for details on materials and care instructions.' },
        { title: 'PRICING', description: 'All prices are listed in {currency} and include applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice.' },
        { title: 'AVAILABILITY', description: 'Product availability is subject to change. Items are sold on a first-come, first-served basis. We cannot guarantee availability of any product and reserve the right to limit quantities.' },
      ],
    },

    ordersAndPayment: {
      title: 'ORDERS & PAYMENT',
      items: [
        { title: 'ORDER PLACEMENT', description: 'Orders can be placed through our website. By placing an order, you make an offer to purchase the selected items subject to these terms.' },
        { title: 'ORDER ACCEPTANCE', description: 'We reserve the right to accept or decline any order at our discretion. An order is confirmed only after successful payment processing and order confirmation notification.' },
        { title: 'PAYMENT METHODS', description: 'We accept {paymentMethods} through our secure payment gateway ({paymentProcessor}), and cash on delivery for {codAvailability}. All payments are processed securely.' },
        { title: 'ORDER CANCELLATION', description: 'Orders can be cancelled before shipment by contacting us. Once shipped, cancellation is not possible. Refunds for cancelled orders will be processed within {refundDays}.' },
      ],
    },

    shippingAndDelivery: {
      title: 'SHIPPING & DELIVERY',
      items: [
        { title: 'DELIVERY TIMELINE', description: 'Standard delivery takes {deliveryTime}. Delivery times may vary based on location and external factors beyond our control.' },
        { title: 'SHIPPING COVERAGE', description: '{deliveryMessage}. Additional charges may apply for remote areas.' },
        { title: 'RISK OF LOSS', description: 'Risk of loss and title for products pass to you upon delivery of the items to the shipping carrier. We are not responsible for delays caused by shipping carriers.' },
      ],
    },

    returnsAndExchanges: {
      title: 'RETURNS & EXCHANGES',
      items: [
        { title: 'EXCHANGE POLICY', description: '{exchangePolicy}' },
        { title: 'RETURN CONDITIONS', description: 'Items must be unworn, unwashed, and in original condition with tags attached. We do not accept returns for items that have been worn, altered, or damaged by the customer.' },
        { title: 'NON-RETURNABLE ITEMS', description: 'Final sale items, intimates, and swimwear are non-returnable for hygiene reasons. Items marked as "Final Sale" cannot be returned or exchanged.' },
        { title: 'REFUNDS', description: 'Refunds are processed to the original payment method within {refundDays} after we receive and inspect the returned item. Shipping charges are non-refundable.' },
      ],
    },

    intellectualProperty: {
      title: 'INTELLECTUAL PROPERTY',
      text: 'All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of {brandName} or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content without our prior written permission.',
    },

    userConduct: {
      title: 'USER CONDUCT',
      intro: 'You agree not to:',
      items: [
        'Use our website for any unlawful purpose',
        'Attempt to gain unauthorized access to our systems',
        'Interfere with or disrupt our website or servers',
        'Submit false or misleading information',
        'Use automated scripts to collect information from our website',
        'Engage in fraudulent activities or impersonate others',
      ],
    },

    limitation: {
      title: 'LIMITATION OF LIABILITY',
      text: 'To the fullest extent permitted by law, {brandName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses. Our total liability for any claim arising from these terms or your use of our services shall not exceed the amount you paid for the relevant product or service.',
    },

    disclaimer: {
      title: 'DISCLAIMER',
      intro: 'Our website and services are provided "as is" and "as available" without any warranties, express or implied. We do not warrant that:',
      items: [
        'The website will be uninterrupted or error-free',
        'Defects will be corrected',
        'The website is free of viruses or harmful components',
        'The results of using our services will meet your expectations',
      ],
    },

    indemnification: {
      title: 'INDEMNIFICATION',
      text: 'You agree to indemnify and hold harmless {brandName}, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your use of our website, violation of these terms, or infringement of any rights of another party.',
    },

    governingLaw: {
      title: 'GOVERNING LAW',
      paragraph1: 'These terms shall be governed by and construed in accordance with the laws of {governingLaw}. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in {governingLaw}.',
      paragraph2: 'If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.',
    },

    changes: {
      title: 'CHANGES TO TERMS',
      text: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our website after changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.',
    },

    contact: {
      title: 'CONTACT US',
      intro: 'If you have any questions about these Terms and Conditions, please contact us:',
    },
  },

  relatedPolicies: {
    title: 'Related Policies',
    links: [
      { text: 'PRIVACY POLICY', href: '/privacy' },
      { text: 'DATA DELETION', href: '/data-deletion' },
    ],
  },
} as const;

// ============================================
// DATA DELETION PAGE
// ============================================
export const DATA_DELETION_PAGE = {
  title: 'Data Deletion',

  introduction: {
    paragraph1: 'we respect your right to control your personal data. This page explains how you can request the deletion of your personal information from our systems.',
    paragraph2: 'In compliance with data protection regulations including GDPR and similar laws, you have the right to request the erasure of your personal data under certain circumstances.',
  },

  whatGetsDeleted: {
    title: 'WHAT DATA WILL BE DELETED',
    intro: 'Upon your request, we will delete the following data associated with your account:',
    categories: [
      {
        title: 'ACCOUNT DATA',
        items: ['Your name and profile information', 'Email address', 'Phone number', 'Profile picture'],
      },
      {
        title: 'ADDRESS DATA',
        items: ['Shipping addresses', 'Billing addresses', 'Saved locations'],
      },
      {
        title: 'ACTIVITY DATA',
        items: ['Browsing history on our site', 'Wishlist items', 'Communication preferences'],
      },
      {
        title: 'COMMUNICATION DATA',
        items: ['Newsletter subscriptions', 'Marketing preferences', 'Support ticket history'],
      },
    ],
  },

  whatWeRetain: {
    title: 'DATA WE MAY RETAIN',
    warning: 'Some data may be retained for legal, tax, or business purposes even after your deletion request. This includes:',
    items: [
      { label: 'Order History', description: 'Transaction records required for tax and accounting purposes (typically retained for {taxRetentionYears} years)' },
      { label: 'Invoice Data', description: 'Billing information required for legal compliance' },
      { label: 'Legal Hold', description: 'Data involved in ongoing legal proceedings or disputes' },
      { label: 'Fraud Prevention', description: 'Limited data to prevent fraudulent activities' },
    ],
  },

  deletionProcess: {
    title: 'HOW TO REQUEST DELETION',
    steps: [
      { title: 'STEP 1: SUBMIT REQUEST', description: 'Contact us via email or WhatsApp with your deletion request. Include your account email and name for verification.' },
      { title: 'STEP 2: VERIFICATION', description: 'We will verify your identity to ensure the request is legitimate and protect against unauthorized deletions.' },
      { title: 'STEP 3: PROCESSING', description: 'Once verified, we will process your deletion request within 30 days. We will notify you once complete.' },
      { title: 'STEP 4: CONFIRMATION', description: 'You will receive a confirmation email when your data has been successfully deleted from our systems.' },
    ],
  },

  requestSection: {
    title: 'REQUEST DATA DELETION',
    loggedInAs: 'Logged in as',
    successMessage: 'Thank you for your request. We will process it within 30 days and send you a confirmation once complete.',
    emailButton: 'REQUEST VIA EMAIL',
    whatsappButton: 'REQUEST VIA WHATSAPP',
    emailNote: 'You can also email us directly at',
    processingDays: 30,
  },

  thirdParty: {
    title: 'THIRD-PARTY DATA',
    intro: "If you signed in using Google or Facebook, you may also want to revoke our app's access through their platforms:",
    links: [
      { provider: 'Google', text: 'Google Account Permissions', url: 'https://myaccount.google.com/permissions' },
      { provider: 'Facebook', text: 'Facebook App Settings', url: 'https://www.facebook.com/settings?tab=applications' },
    ],
  },

  questions: {
    title: 'QUESTIONS?',
    intro: 'If you have any questions about data deletion, please contact us:',
  },

  relatedPolicies: {
    title: 'Related Policies',
    links: [
      { text: 'PRIVACY POLICY', href: '/privacy' },
      { text: 'TERMS & CONDITIONS', href: '/terms' },
    ],
  },
} as const;

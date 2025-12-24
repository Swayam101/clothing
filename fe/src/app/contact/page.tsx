'use client';

import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { openWhatsApp, getContactMessage } from '@/utils/whatsapp';
import ContactMethodCard from '@/features/contact/components/ContactMethodCard';
import FAQItem from '@/features/contact/components/FAQItem';
import ResponseTimeCard from '@/features/contact/components/ResponseTimeCard';

export default function ContactPage() {
  const { contact, faqs } = useConfig();

  const handleWhatsAppClick = () => {
    const message = getContactMessage();
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg">
              Have questions? We&apos;re here to help
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* WhatsApp */}
            <ContactMethodCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              }
              title="WHATSAPP"
              description="Fastest way to reach us"
              buttonText="CHAT NOW"
              onClick={handleWhatsAppClick}
              buttonVariant="secondary"
            />

            {/* Instagram */}
            <ContactMethodCard
              icon={<Instagram className="w-7 h-7" strokeWidth={1.5} />}
              title="INSTAGRAM"
              description="DM us or check our stories"
              buttonText="FOLLOW US"
              buttonHref={contact.instagramUrl}
              buttonVariant="secondary"
            />

            {/* Email */}
            <ContactMethodCard
              icon={<Mail className="w-7 h-7" strokeWidth={1.5} />}
              title="EMAIL"
              description="For detailed inquiries"
              buttonText="SEND EMAIL"
              buttonHref={`mailto:${contact.email}`}
              buttonVariant="secondary"
            />
          </div>

          {/* FAQ Section */}
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-12 text-center tracking-wide">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="space-y-8">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>

          {/* Response Time */}
          <ResponseTimeCard
            responseTime={contact.responseTime}
            businessHours={contact.businessHours}
          />
        </div>
      </div>
    </div>
  );
}


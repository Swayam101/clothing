'use client';

import { Instagram, Mail } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { openWhatsApp, getContactMessage } from '@/utils/whatsapp';
import ContactMethodCard from '@/features/contact/components/ContactMethodCard';
import FAQItem from '@/features/contact/components/FAQItem';
import ResponseTimeCard from '@/features/contact/components/ResponseTimeCard';
import WhatsAppIcon from '@/shared/components/icons/WhatsAppIcon';
import { CONTACT_PAGE } from '@/data/content/pages/contact';

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
            <h1 className="text-5xl font-light mb-4">{CONTACT_PAGE.header.title}</h1>
            <p className="text-gray-600 text-lg">
              {CONTACT_PAGE.header.subtitle}
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* WhatsApp */}
            <ContactMethodCard
              icon={<WhatsAppIcon size={28} />}
              title={CONTACT_PAGE.methods.whatsapp.title}
              description={CONTACT_PAGE.methods.whatsapp.description}
              buttonText={CONTACT_PAGE.methods.whatsapp.buttonText}
              onClick={handleWhatsAppClick}
              buttonVariant="secondary"
            />

            {/* Instagram */}
            <ContactMethodCard
              icon={<Instagram className="w-7 h-7" strokeWidth={1.5} />}
              title={CONTACT_PAGE.methods.instagram.title}
              description={CONTACT_PAGE.methods.instagram.description}
              buttonText={CONTACT_PAGE.methods.instagram.buttonText}
              buttonHref={contact.instagramUrl}
              buttonVariant="secondary"
            />

            {/* Email */}
            <ContactMethodCard
              icon={<Mail className="w-7 h-7" strokeWidth={1.5} />}
              title={CONTACT_PAGE.methods.email.title}
              description={CONTACT_PAGE.methods.email.description}
              buttonText={CONTACT_PAGE.methods.email.buttonText}
              buttonHref={`mailto:${contact.email}`}
              buttonVariant="secondary"
            />
          </div>

          {/* FAQ Section */}
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-12 text-center tracking-wide">
              {CONTACT_PAGE.faq.title}
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
            title={CONTACT_PAGE.responseTime.title}
            description={CONTACT_PAGE.responseTime.description}
          />
        </div>
      </div>
    </div>
  );
}


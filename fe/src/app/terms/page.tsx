'use client';

import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/context/ConfigContext';
import { TERMS_PAGE } from '@/data/content/pages/legal';

export default function TermsAndConditionsPage() {
  const { site, contact, delivery, payment } = useConfig();
  const content = TERMS_PAGE;
  const { sections, definitions } = content;

  // Helper function to replace placeholders in text
  const replaceVars = (text: string) => {
    return text
      .replace(/{brandName}/g, contact.brandName)
      .replace(/{minimumAge}/g, String(site.minimumAge))
      .replace(/{currency}/g, `${site.currency.name} (${site.currency.code})`)
      .replace(/{paymentMethods}/g, payment.methods.slice(0, -1).join(', '))
      .replace(/{paymentProcessor}/g, payment.processor)
      .replace(/{codAvailability}/g, payment.codAvailability)
      .replace(/{refundDays}/g, delivery.refundProcessingDays)
      .replace(/{deliveryTime}/g, delivery.standardDelivery)
      .replace(/{deliveryMessage}/g, delivery.deliveryMessage)
      .replace(/{exchangePolicy}/g, delivery.exchangePolicyDetailed)
      .replace(/{governingLaw}/g, site.region.governingLaw);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">
              {content.title}
            </h1>
            <p className="text-sm text-gray-500 tracking-wide">
              Last Updated: {site.legalDates.termsUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <p className="text-gray-600 leading-relaxed mb-6">
              Welcome to {contact.brandName}. {content.introduction.paragraph1}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {content.introduction.paragraph2}
            </p>
          </div>

          {/* Definitions */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{definitions.title}</h2>
            <div className="space-y-3 text-sm text-gray-600">
              {definitions.items.map((item, index) => (
                <p key={index}>
                  <strong>{item.term}</strong> {replaceVars(item.definition)}
                </p>
              ))}
            </div>
          </div>

          {/* Account Terms */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.accountTerms.title}</h2>
            <div className="space-y-4">
              {sections.accountTerms.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {replaceVars(item.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Products & Pricing */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.productsAndPricing.title}</h2>
            <div className="space-y-4">
              {sections.productsAndPricing.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {replaceVars(item.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Orders & Payment */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.ordersAndPayment.title}</h2>
            <div className="space-y-4">
              {sections.ordersAndPayment.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {replaceVars(item.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Delivery */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.shippingAndDelivery.title}</h2>
            <div className="space-y-4">
              {sections.shippingAndDelivery.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {replaceVars(item.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Returns & Exchanges */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.returnsAndExchanges.title}</h2>
            <div className="space-y-4">
              {sections.returnsAndExchanges.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {replaceVars(item.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.intellectualProperty.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {replaceVars(sections.intellectualProperty.text)}
            </p>
          </div>

          {/* User Conduct */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.userConduct.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.userConduct.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              {sections.userConduct.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.limitation.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {replaceVars(sections.limitation.text)}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.disclaimer.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.disclaimer.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              {sections.disclaimer.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Indemnification */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.indemnification.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {replaceVars(sections.indemnification.text)}
            </p>
          </div>

          {/* Governing Law */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.governingLaw.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {replaceVars(sections.governingLaw.paragraph1)}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {sections.governingLaw.paragraph2}
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.changes.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {sections.changes.text}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.contact.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.contact.intro}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>WhatsApp:</strong> +91 {contact.whatsapp.slice(2)}</p>
              <p><strong>Instagram:</strong> @{contact.instagram}</p>
              <p><strong>Business Hours:</strong> {contact.businessHours}</p>
            </div>
          </div>

          {/* Related Links */}
          <div className="text-center border-t border-gray-200 pt-12">
            <p className="text-gray-600 mb-6 text-sm">{content.relatedPolicies.title}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {content.relatedPolicies.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-black transition-all duration-300"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

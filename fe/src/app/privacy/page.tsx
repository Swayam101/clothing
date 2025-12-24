'use client';

import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/context/ConfigContext';
import { PRIVACY_PAGE } from '@/data/content/pages/legal';
import { THIRD_PARTY_SERVICES } from '@/data/content/site';

export default function PrivacyPolicyPage() {
  const { site, contact } = useConfig();
  const content = PRIVACY_PAGE;
  const { sections } = content;

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
              Last Updated: {site.legalDates.privacyPolicyUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <p className="text-gray-600 leading-relaxed mb-6">
              At {contact.brandName}, {content.introduction.paragraph1}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {content.introduction.paragraph2}
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.informationWeCollect.title}</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm tracking-widest font-medium mb-3">{sections.informationWeCollect.personalInfo.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {sections.informationWeCollect.personalInfo.intro}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
                  {sections.informationWeCollect.personalInfo.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm tracking-widest font-medium mb-3">{sections.informationWeCollect.accountInfo.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {sections.informationWeCollect.accountInfo.text}
                </p>
              </div>

              <div>
                <h3 className="text-sm tracking-widest font-medium mb-3">{sections.informationWeCollect.autoCollected.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {sections.informationWeCollect.autoCollected.intro}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
                  {sections.informationWeCollect.autoCollected.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.howWeUse.title}</h2>
            <div className="space-y-4">
              {sections.howWeUse.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sharing */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.dataSharing.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.dataSharing.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-3 ml-4">
              {sections.dataSharing.items.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.description}</li>
              ))}
            </ul>
          </div>

          {/* Data Security */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.dataSecurity.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.dataSecurity.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              {sections.dataSecurity.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Your Rights */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.yourRights.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.yourRights.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              {sections.yourRights.items.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {item.description}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              To exercise these rights, please visit our{' '}
              <Link href="/data-deletion" className="text-black underline hover:no-underline">
                Data Deletion page
              </Link>{' '}
              or contact us directly.
            </p>
          </div>

          {/* Cookies */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.cookies.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.cookies.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              {sections.cookies.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              {sections.cookies.footer}
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.thirdParty.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {sections.thirdParty.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              {THIRD_PARTY_SERVICES.authentication.map((service) => (
                <li key={service}>{service} (Authentication)</li>
              ))}
              {THIRD_PARTY_SERVICES.payment.map((service) => (
                <li key={service}>Payment processors ({service})</li>
              ))}
              {THIRD_PARTY_SERVICES.infrastructure.map((service) => (
                <li key={service}>{service} (Authentication services)</li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              {sections.thirdParty.footer}
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{sections.children.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {sections.children.text}
            </p>
          </div>

          {/* Changes to Policy */}
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

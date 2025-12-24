'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Mail, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { useAuthStore } from '@/store/useAuthStore';
import { DATA_DELETION_PAGE } from '@/data/content/pages/legal';

export default function DataDeletionPage() {
  const { site, contact, delivery } = useConfig();
  const { user, isAuthenticated } = useAuthStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const content = DATA_DELETION_PAGE;

  // Helper function to replace placeholders
  const replaceVars = (text: string) => {
    return text.replace(/{taxRetentionYears}/g, String(delivery.taxRetentionYears));
  };

  const handleDeleteRequest = () => {
    const subject = encodeURIComponent('Data Deletion Request');
    const body = encodeURIComponent(
      `Hi ${contact.brandName} Team,\n\n` +
      `I would like to request the deletion of my personal data from your systems.\n\n` +
      `Account Email: ${user?.email || '[Your email address]'}\n` +
      `Name: ${user?.name || '[Your name]'}\n\n` +
      `Please confirm once my data has been deleted.\n\n` +
      `Thank you.`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setShowConfirmation(true);
  };

  const handleWhatsAppRequest = () => {
    const message = encodeURIComponent(
      `Hi, I would like to request deletion of my personal data.\n\n` +
      `Account Email: ${user?.email || '[Your email address]'}\n` +
      `Name: ${user?.name || '[Your name]'}\n\n` +
      `Please process my data deletion request.`
    );
    window.open(`${contact.whatsappUrl}?text=${message}`, '_blank');
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <Trash2 className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">
              {content.title}
            </h1>
            <p className="text-sm text-gray-500 tracking-wide">
              Last Updated: {site.legalDates.dataDeletionUpdated}
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

          {/* What Gets Deleted */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{content.whatGetsDeleted.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {content.whatGetsDeleted.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {content.whatGetsDeleted.categories.map((category, index) => (
                <div key={index} className="bg-gray-50 p-4">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{category.title}</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* What We May Retain */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{content.whatWeRetain.title}</h2>
            <div className="bg-amber-50 border border-amber-200 p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {content.whatWeRetain.warning}
                  </p>
                </div>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-3 ml-4">
              {content.whatWeRetain.items.map((item, index) => (
                <li key={index}><strong>{item.label}:</strong> {replaceVars(item.description)}</li>
              ))}
            </ul>
          </div>

          {/* Deletion Process */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{content.deletionProcess.title}</h2>
            <div className="space-y-6">
              {content.deletionProcess.steps.map((step, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Request Deletion CTA */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{content.requestSection.title}</h2>
            
            {isAuthenticated && user && (
              <div className="bg-gray-50 p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600">
                  {content.requestSection.loggedInAs} <strong>{user.email}</strong>
                </p>
              </div>
            )}

            {showConfirmation && (
              <div className="bg-green-50 border border-green-200 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">
                    {content.requestSection.successMessage}
                  </p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={handleDeleteRequest}
                className="flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                <Mail size={18} strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{content.requestSection.emailButton}</span>
              </button>
              <button
                onClick={handleWhatsAppRequest}
                className="flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{content.requestSection.whatsappButton}</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {content.requestSection.emailNote} {contact.email}
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{content.thirdParty.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {content.thirdParty.intro}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              {content.thirdParty.links.map((link, index) => (
                <li key={index}>
                  <strong>{link.provider}:</strong> Visit{' '}
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black underline hover:no-underline"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">{content.questions.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {content.questions.intro}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>WhatsApp:</strong> +91 {contact.whatsapp.slice(2)}</p>
              <p><strong>Response Time:</strong> {contact.responseTime}</p>
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

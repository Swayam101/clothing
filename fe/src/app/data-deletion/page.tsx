'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, Mail, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';
import { useAuthStore } from '@/store/useAuthStore';

export default function DataDeletionPage() {
  const { contact } = useConfig();
  const { user, isAuthenticated } = useAuthStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const lastUpdated = 'December 24, 2024';

  const handleDeleteRequest = () => {
    // Open email client with pre-filled deletion request
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
              Data Deletion
            </h1>
            <p className="text-sm text-gray-500 tracking-wide">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <p className="text-gray-600 leading-relaxed mb-6">
              At {contact.brandName}, we respect your right to control your personal data. This page explains how you can request the deletion of your personal information from our systems.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In compliance with data protection regulations including GDPR and similar laws, you have the right to request the erasure of your personal data under certain circumstances.
            </p>
          </div>

          {/* What Gets Deleted */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">WHAT DATA WILL BE DELETED</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Upon your request, we will delete the following data associated with your account:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4">
                <h3 className="text-sm tracking-widest font-medium mb-2">ACCOUNT DATA</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Your name and profile information</li>
                  <li>• Email address</li>
                  <li>• Phone number</li>
                  <li>• Profile picture</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4">
                <h3 className="text-sm tracking-widest font-medium mb-2">ADDRESS DATA</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Shipping addresses</li>
                  <li>• Billing addresses</li>
                  <li>• Saved locations</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4">
                <h3 className="text-sm tracking-widest font-medium mb-2">ACTIVITY DATA</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Browsing history on our site</li>
                  <li>• Wishlist items</li>
                  <li>• Communication preferences</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4">
                <h3 className="text-sm tracking-widest font-medium mb-2">COMMUNICATION DATA</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Newsletter subscriptions</li>
                  <li>• Marketing preferences</li>
                  <li>• Support ticket history</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What We May Retain */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">DATA WE MAY RETAIN</h2>
            <div className="bg-amber-50 border border-amber-200 p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Some data may be retained for legal, tax, or business purposes even after your deletion request. This includes:
                  </p>
                </div>
              </div>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-3 ml-4">
              <li><strong>Order History:</strong> Transaction records required for tax and accounting purposes (typically retained for 7 years)</li>
              <li><strong>Invoice Data:</strong> Billing information required for legal compliance</li>
              <li><strong>Legal Hold:</strong> Data involved in ongoing legal proceedings or disputes</li>
              <li><strong>Fraud Prevention:</strong> Limited data to prevent fraudulent activities</li>
            </ul>
          </div>

          {/* Deletion Process */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">HOW TO REQUEST DELETION</h2>
            
            <div className="space-y-6">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">STEP 1: SUBMIT REQUEST</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Contact us via email or WhatsApp with your deletion request. Include your account email and name for verification.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">STEP 2: VERIFICATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We will verify your identity to ensure the request is legitimate and protect against unauthorized deletions.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">STEP 3: PROCESSING</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Once verified, we will process your deletion request within 30 days. We will notify you once complete.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">STEP 4: CONFIRMATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You will receive a confirmation email when your data has been successfully deleted from our systems.
                </p>
              </div>
            </div>
          </div>

          {/* Request Deletion CTA */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">REQUEST DATA DELETION</h2>
            
            {isAuthenticated && user && (
              <div className="bg-gray-50 p-4 mb-6 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-gray-600">
                  Logged in as <strong>{user.email}</strong>
                </p>
              </div>
            )}

            {showConfirmation && (
              <div className="bg-green-50 border border-green-200 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">
                    Thank you for your request. We will process it within 30 days and send you a confirmation once complete.
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
                <span className="text-sm tracking-wide">REQUEST VIA EMAIL</span>
              </button>
              <button
                onClick={handleWhatsAppRequest}
                className="flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 hover:border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                <span className="text-sm tracking-wide">REQUEST VIA WHATSAPP</span>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              You can also email us directly at {contact.email}
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">THIRD-PARTY DATA</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              If you signed in using Google or Facebook, you may also want to revoke our app&apos;s access through their platforms:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li>
                <strong>Google:</strong> Visit{' '}
                <a 
                  href="https://myaccount.google.com/permissions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black underline hover:no-underline"
                >
                  Google Account Permissions
                </a>
              </li>
              <li>
                <strong>Facebook:</strong> Visit{' '}
                <a 
                  href="https://www.facebook.com/settings?tab=applications" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black underline hover:no-underline"
                >
                  Facebook App Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">QUESTIONS?</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              If you have any questions about data deletion, please contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>WhatsApp:</strong> +91 {contact.whatsapp.slice(2)}</p>
              <p><strong>Response Time:</strong> {contact.responseTime}</p>
            </div>
          </div>

          {/* Related Links */}
          <div className="text-center border-t border-gray-200 pt-12">
            <p className="text-gray-600 mb-6 text-sm">Related Policies</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/privacy"
                className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-black transition-all duration-300"
              >
                PRIVACY POLICY
              </Link>
              <Link
                href="/terms"
                className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-black transition-all duration-300"
              >
                TERMS & CONDITIONS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


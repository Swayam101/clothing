'use client';

import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/context/ConfigContext';

export default function PrivacyPolicyPage() {
  const { contact } = useConfig();
  const lastUpdated = 'December 24, 2024';

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500 tracking-wide">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <p className="text-gray-600 leading-relaxed mb-6">
              At {contact.brandName}, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">INFORMATION WE COLLECT</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm tracking-widest font-medium mb-3">PERSONAL INFORMATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  When you create an account, place an order, or contact us, we may collect:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing address</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm tracking-widest font-medium mb-3">ACCOUNT INFORMATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  If you sign in using Google or Facebook, we receive your name, email address, and profile picture from these services. We do not store your social media passwords.
                </p>
              </div>

              <div>
                <h3 className="text-sm tracking-widest font-medium mb-3">AUTOMATICALLY COLLECTED INFORMATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  When you visit our website, we automatically collect:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">HOW WE USE YOUR INFORMATION</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">ORDER PROCESSING</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To process and fulfill your orders, send order confirmations, and provide shipping updates.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">CUSTOMER SUPPORT</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To respond to your inquiries, provide customer service, and resolve any issues.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">COMMUNICATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To send you updates about your orders, and with your consent, promotional materials and newsletters.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">IMPROVEMENT</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To analyze usage patterns and improve our website, products, and services.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">LEGAL COMPLIANCE</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  To comply with legal obligations and protect our rights.
                </p>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">DATA SHARING & DISCLOSURE</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-3 ml-4">
              <li><strong>Service Providers:</strong> Payment processors, shipping partners, and analytics providers who help us operate our business</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our business</li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">DATA SECURITY</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li>Secure HTTPS encryption for all data transmission</li>
              <li>Secure authentication through trusted providers (Google, Facebook)</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal data on a need-to-know basis</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">YOUR RIGHTS</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications at any time</li>
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
            <h2 className="text-2xl font-light mb-6 tracking-wide">COOKIES & TRACKING</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li>Keep you signed in to your account</li>
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage</li>
              <li>Improve our services</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              You can manage cookie preferences through your browser settings.
            </p>
          </div>

          {/* Third-Party Services */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">THIRD-PARTY SERVICES</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Our website integrates with third-party services that have their own privacy policies:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li>Google (Authentication)</li>
              <li>Facebook (Authentication)</li>
              <li>Payment processors (Cashfree)</li>
              <li>Firebase (Authentication services)</li>
            </ul>
            <p className="text-sm text-gray-600 leading-relaxed mt-4">
              We encourage you to review their privacy policies.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">CHILDREN&apos;S PRIVACY</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">CHANGES TO THIS POLICY</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* Contact */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">CONTACT US</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>WhatsApp:</strong> +91 {contact.whatsapp.slice(2)}</p>
              <p><strong>Instagram:</strong> @{contact.instagram}</p>
            </div>
          </div>

          {/* Related Links */}
          <div className="text-center border-t border-gray-200 pt-12">
            <p className="text-gray-600 mb-6 text-sm">Related Policies</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/terms"
                className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-black transition-all duration-300"
              >
                TERMS & CONDITIONS
              </Link>
              <Link
                href="/data-deletion"
                className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-black transition-all duration-300"
              >
                DATA DELETION
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


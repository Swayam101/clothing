'use client';

import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/context/ConfigContext';

export default function TermsAndConditionsPage() {
  const { contact, delivery } = useConfig();
  const lastUpdated = 'December 24, 2024';

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-500 tracking-wide">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <p className="text-gray-600 leading-relaxed mb-6">
              Welcome to {contact.brandName}. By accessing our website and making purchases, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.
            </p>
            <p className="text-gray-600 leading-relaxed">
              These terms apply to all visitors, users, and customers of our website and services.
            </p>
          </div>

          {/* Definitions */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">DEFINITIONS</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p><strong>&quot;We,&quot; &quot;Us,&quot; &quot;Our&quot;</strong> refers to {contact.brandName}.</p>
              <p><strong>&quot;You,&quot; &quot;Your&quot;</strong> refers to the user or customer.</p>
              <p><strong>&quot;Products&quot;</strong> refers to items available for purchase on our website.</p>
              <p><strong>&quot;Services&quot;</strong> refers to all services provided by {contact.brandName}.</p>
              <p><strong>&quot;Website&quot;</strong> refers to our online platform and all its pages.</p>
            </div>
          </div>

          {/* Account Terms */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">ACCOUNT TERMS</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">ACCOUNT CREATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You may create an account using Google or Facebook authentication. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">ACCOUNT ACCURACY</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">AGE REQUIREMENT</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You must be at least 18 years old to create an account and make purchases. By using our services, you represent that you meet this age requirement.
                </p>
              </div>
            </div>
          </div>

          {/* Products & Pricing */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">PRODUCTS & PRICING</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">PRODUCT DESCRIPTIONS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We strive to display our products as accurately as possible. However, as our items are pre-loved/thrifted, each piece is unique. Colors may vary slightly due to photography and screen settings. Product descriptions include known flaws or wear.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">PRICING</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">AVAILABILITY</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  As our items are one-of-a-kind thrifted pieces, availability is limited. Items are sold on a first-come, first-served basis. We cannot guarantee availability of any product.
                </p>
              </div>
            </div>
          </div>

          {/* Orders & Payment */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">ORDERS & PAYMENT</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">ORDER PLACEMENT</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Orders can be placed through our website or via Instagram DM. By placing an order, you make an offer to purchase the selected items subject to these terms.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">ORDER ACCEPTANCE</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We reserve the right to accept or decline any order at our discretion. An order is confirmed only after successful payment processing and order confirmation notification.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">PAYMENT METHODS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We accept UPI, net banking, debit/credit cards through our secure payment gateway (Cashfree), and cash on delivery for select locations. All payments are processed securely.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">ORDER CANCELLATION</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Orders can be cancelled before shipment by contacting us. Once shipped, cancellation is not possible. Refunds for cancelled orders will be processed within 5-7 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping & Delivery */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">SHIPPING & DELIVERY</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">DELIVERY TIMELINE</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Standard delivery takes {delivery.standardDelivery}. Delivery times may vary based on location and external factors beyond our control.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">SHIPPING COVERAGE</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {delivery.deliveryMessage}. Additional charges may apply for remote areas.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">RISK OF LOSS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Risk of loss and title for products pass to you upon delivery of the items to the shipping carrier. We are not responsible for delays caused by shipping carriers.
                </p>
              </div>
            </div>
          </div>

          {/* Returns & Exchanges */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">RETURNS & EXCHANGES</h2>
            <div className="space-y-4">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">EXCHANGE POLICY</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {delivery.exchangePolicyDetailed}
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">RETURN CONDITIONS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Items must be unworn, unwashed, and in original condition with tags attached. We do not accept returns for items that have been worn, altered, or damaged by the customer.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">NON-RETURNABLE ITEMS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Due to the nature of thrifted items, final sale items, accessories, and intimates are non-returnable. Items marked as &quot;Final Sale&quot; cannot be returned or exchanged.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">REFUNDS</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Refunds are processed to the original payment method within 7-10 business days after we receive and inspect the returned item. Shipping charges are non-refundable.
                </p>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">INTELLECTUAL PROPERTY</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of {contact.brandName} or its content suppliers and is protected by intellectual property laws.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content without our prior written permission.
            </p>
          </div>

          {/* User Conduct */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">USER CONDUCT</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li>Use our website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our website or servers</li>
              <li>Submit false or misleading information</li>
              <li>Use automated scripts to collect information from our website</li>
              <li>Engage in fraudulent activities or impersonate others</li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">LIMITATION OF LIABILITY</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              To the fullest extent permitted by law, {contact.brandName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our total liability for any claim arising from these terms or your use of our services shall not exceed the amount you paid for the relevant product or service.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">DISCLAIMER</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Our website and services are provided &quot;as is&quot; and &quot;as available&quot; without any warranties, express or implied. We do not warrant that:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li>The website will be uninterrupted or error-free</li>
              <li>Defects will be corrected</li>
              <li>The website is free of viruses or harmful components</li>
              <li>The results of using our services will meet your expectations</li>
            </ul>
          </div>

          {/* Indemnification */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">INDEMNIFICATION</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless {contact.brandName}, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from your use of our website, violation of these terms, or infringement of any rights of another party.
            </p>
          </div>

          {/* Governing Law */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">GOVERNING LAW</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">CHANGES TO TERMS</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our website after changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
            </p>
          </div>

          {/* Contact */}
          <div className="mb-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-light mb-6 tracking-wide">CONTACT US</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
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
            <p className="text-gray-600 mb-6 text-sm">Related Policies</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/privacy"
                className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-black transition-all duration-300"
              >
                PRIVACY POLICY
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


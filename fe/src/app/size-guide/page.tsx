'use client';

import React from 'react';
import Link from 'next/link';
import { openWhatsApp, getSizingHelpMessage } from '@/utils/whatsapp';

export default function SizeGuidePage() {
  const handleContactClick = () => {
    const message = getSizingHelpMessage();
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light mb-4">Size Guide</h1>
            <p className="text-gray-600">
              Find your perfect fit with our comprehensive measurements
            </p>
          </div>

          {/* Introduction */}
          <div className="border border-gray-200 p-8 mb-12">
            <p className="text-gray-600 leading-relaxed mb-4">
              All measurements are in centimeters (CM) and inches. Measurements
              can vary slightly (±2cm) due to the nature of the fabric and
              manufacturing process.
            </p>
          </div>

          {/* T-Shirts Size Chart */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 tracking-wide">
              T-SHIRTS & CASUAL WEAR
            </h2>
            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-4 px-6 text-sm tracking-wide font-medium">
                      SIZE
                    </th>
                    <th className="py-4 px-6 text-sm tracking-wide font-medium">
                      CHEST (CM/IN)
                    </th>
                    <th className="py-4 px-6 text-sm tracking-wide font-medium">
                      LENGTH (CM/IN)
                    </th>
                    <th className="py-4 px-6 text-sm tracking-wide font-medium">
                      SHOULDER (CM/IN)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-sm font-medium">S</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      96 CM / 38&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      69 CM / 27&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      44 CM / 17&quot;
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-sm font-medium">M</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      102 CM / 40&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      71 CM / 28&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      46 CM / 18&quot;
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-sm font-medium">L</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      108 CM / 42&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      73 CM / 29&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      48 CM / 19&quot;
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 text-sm font-medium">XL</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      114 CM / 45&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      75 CM / 30&quot;
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      50 CM / 20&quot;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 tracking-wide">
              HOW TO MEASURE
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-wide font-medium mb-2">
                  CHEST
                </h3>
                <p className="text-sm text-gray-600">
                  Measure around the fullest part of your chest, keeping the
                  tape measure horizontal.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-wide font-medium mb-2">
                  LENGTH
                </h3>
                <p className="text-sm text-gray-600">
                  Measure from the highest point of the shoulder to the bottom
                  hem.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-wide font-medium mb-2">
                  SHOULDER
                </h3>
                <p className="text-sm text-gray-600">
                  Measure from one shoulder edge to the other across the back.
                </p>
              </div>
            </div>
          </div>

          {/* Fit Guide */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 tracking-wide">
              FIT GUIDE
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-gray-200 p-6 text-center">
                <h3 className="text-sm tracking-wide font-medium mb-3">
                  REGULAR FIT
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Standard fit that&apos;s not too tight or too loose. Perfect for
                  everyday wear.
                </p>
              </div>
              <div className="border border-gray-200 p-6 text-center">
                <h3 className="text-sm tracking-wide font-medium mb-3">
                  OVERSIZED FIT
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Relaxed and roomy fit with dropped shoulders. Contemporary and
                  comfortable.
                </p>
              </div>
              <div className="border border-gray-200 p-6 text-center">
                <h3 className="text-sm tracking-wide font-medium mb-3">
                  SLIM FIT
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tailored fit that follows the body&apos;s contours. Modern and
                  sleek appearance.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center border-t border-gray-200 pt-12">
            <p className="text-gray-600 mb-6">Still not sure about your size?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleContactClick}
                className="inline-block px-8 py-4 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition-all duration-300"
              >
                CONTACT US
              </button>
              <Link
                href="/products"
                className="inline-block px-8 py-4 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


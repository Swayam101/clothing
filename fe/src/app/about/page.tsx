'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-light mb-8 leading-tight">
              Less is
              <br />
              <span className="font-normal">More</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We believe that great clothing shouldn&apos;t be complicated. It should
              just work—every single day.
            </p>
          </div>

          {/* Brand Origin */}
          <div className="mb-20 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-8 tracking-wide">OUR STORY</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                YourBrand was born from a simple observation: finding
                high-quality, comfortable clothing that actually fits well
                shouldn&apos;t be this hard.
              </p>
              <p>
                We spent months searching for the perfect fabrics, testing
                different fits, and obsessing over every detail. Not because we
                wanted to be perfectionists, but because we knew exactly what we
                were missing in our own wardrobes.
              </p>
              <p>
                What started as a personal quest turned into something bigger—a
                brand that prioritizes quality, comfort, and honest design over
                everything else.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="mb-20 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-8 tracking-wide">
              OUR PHILOSOPHY
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="text-sm tracking-widest font-medium">
                  QUALITY FIRST
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use premium fabrics and construction methods. No shortcuts,
                  no compromises.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm tracking-widest font-medium">
                  HONEST DESIGN
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Clean, timeless designs that don&apos;t chase trends. Built to last
                  seasons, not weeks.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm tracking-widest font-medium">
                  REAL COMFORT
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Comfort isn&apos;t just about soft fabric—it&apos;s about fit,
                  breathability, and movement.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-8 tracking-wide">
              WHAT WE STAND FOR
            </h2>
            <div className="space-y-8">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">
                  TRANSPARENCY
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We&apos;re honest about our products, our process, and our pricing.
                  No hidden costs, no false claims.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">
                  SUSTAINABILITY
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We create pieces meant to last, reducing the need for constant
                  replacements and fast fashion waste.
                </p>
              </div>
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-sm tracking-widest font-medium mb-2">
                  CUSTOMER-FIRST
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your satisfaction matters. If something isn&apos;t right, we&apos;ll
                  make it right. Simple as that.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center border-t border-gray-200 pt-16">
            <p className="text-gray-600 mb-8 text-lg">
              Ready to experience the difference?
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition-all duration-300"
            >
              SHOP OUR COLLECTION
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


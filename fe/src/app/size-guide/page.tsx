'use client';

import Link from 'next/link';
import { openWhatsApp, getSizingHelpMessage } from '@/utils/whatsapp';
import { SIZE_GUIDE_PAGE } from '@/data/content/pages/size-guide';

export default function SizeGuidePage() {
  const { header, introduction, sizeChart, howToMeasure, fitGuide, cta } = SIZE_GUIDE_PAGE;

  const handleContactClick = () => {
    const message = getSizingHelpMessage();
    openWhatsApp(message);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light mb-4">{header.title}</h1>
            <p className="text-gray-600">{header.subtitle}</p>
          </div>

          {/* Introduction */}
          <div className="border border-gray-200 p-8 mb-12">
            <p className="text-gray-600 leading-relaxed mb-4">
              {introduction.text}
            </p>
          </div>

          {/* Size Chart */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 tracking-wide">
              {sizeChart.title}
            </h2>
            <div className="overflow-x-auto border border-gray-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {sizeChart.columns.map((column, index) => (
                      <th key={index} className="py-4 px-6 text-sm tracking-wide font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.rows.map((row, index) => (
                    <tr
                      key={index}
                      className={`${index < sizeChart.rows.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-50 transition`}
                    >
                      <td className="py-4 px-6 text-sm font-medium">{row.size}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{row.chest}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{row.length}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{row.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 tracking-wide">
              {howToMeasure.title}
            </h2>
            <div className="space-y-6">
              {howToMeasure.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-wide font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fit Guide */}
          <div className="mb-16">
            <h2 className="text-2xl font-light mb-8 tracking-wide">
              {fitGuide.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {fitGuide.items.map((item, index) => (
                <div key={index} className="border border-gray-200 p-6 text-center">
                  <h3 className="text-sm tracking-wide font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center border-t border-gray-200 pt-12">
            <p className="text-gray-600 mb-6">{cta.text}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleContactClick}
                className="inline-block px-8 py-4 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition-all duration-300"
              >
                {cta.contactButtonText}
              </button>
              <Link
                href={cta.shopButtonHref}
                className="inline-block px-8 py-4 border border-black text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300"
              >
                {cta.shopButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


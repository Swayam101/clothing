import Link from 'next/link';
import { ABOUT_PAGE } from '@/data/content/pages/about';

export default function AboutPage() {
  const { hero, story, philosophy, values, cta } = ABOUT_PAGE;

  return (
    <div className="min-h-screen bg-white">
      <div className="pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-light mb-8 leading-tight">
              {hero.titleLine1}
              <br />
              <span className="font-normal">{hero.titleLine2}</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </div>

          {/* Brand Origin */}
          <div className="mb-20 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-8 tracking-wide">{story.title}</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              {story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="mb-20 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-8 tracking-wide">
              {philosophy.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {philosophy.items.map((item, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-sm tracking-widest font-medium">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-20 border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-light mb-8 tracking-wide">
              {values.title}
            </h2>
            <div className="space-y-8">
              {values.items.map((item, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <h3 className="text-sm tracking-widest font-medium mb-2">
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
          <div className="text-center border-t border-gray-200 pt-16">
            <p className="text-gray-600 mb-8 text-lg">{cta.text}</p>
            <Link
              href={cta.buttonHref}
              className="inline-block px-8 py-4 bg-black text-white text-sm tracking-wide hover:bg-gray-900 transition-all duration-300"
            >
              {cta.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


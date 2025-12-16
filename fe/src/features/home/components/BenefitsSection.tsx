import React from 'react';
import Section from '../../../shared/components/ui/Section';
import SectionHeader from '../../../shared/components/ui/SectionHeader';
import { benefits } from '../../../data/features';

const BenefitsSection: React.FC = () => {
  return (
    <Section className='pb-20'>
      <SectionHeader
        title="Why Choose Us"
        subtitle="We believe in creating clothing that speaks through quality, not quantity"
      />

      <div className="grid md:grid-cols-3 gap-12">
        {benefits.map((benefit, i) => (
          <div key={i} className="text-center space-y-3">
            <h3 className="text-lg font-medium tracking-wide">{benefit.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default BenefitsSection;


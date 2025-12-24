import Section from '@/shared/components/ui/Section';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import { HOME_BENEFITS } from '@/data/content/pages/home';

const BenefitsSection = () => {
  return (
    <Section className="pb-20">
      <SectionHeader
        title={HOME_BENEFITS.title}
        subtitle={HOME_BENEFITS.subtitle}
      />

      <div className="grid md:grid-cols-3 gap-12">
        {HOME_BENEFITS.items.map((benefit, i) => (
          <div key={i} className="text-center space-y-3">
            <h3 className="text-lg font-medium tracking-wide">
              {benefit.title}
            </h3>
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

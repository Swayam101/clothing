import React from 'react';
import FeatureCard from '../../../shared/components/ui/FeatureCard';
import { mainFeatures } from '../../../data/features';

const FeaturesSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-24 pt-16 border-t border-gray-200">
      {mainFeatures.map((feature, i) => (
        <FeatureCard
          key={i}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;


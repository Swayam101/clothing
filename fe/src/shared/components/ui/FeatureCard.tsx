import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 border border-gray-300 rounded-full">
        <Icon className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm tracking-wide font-medium">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;


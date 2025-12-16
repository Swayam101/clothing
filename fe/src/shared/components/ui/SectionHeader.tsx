import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  align = 'center' 
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const subtitleWidth = align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl';
  
  return (
    <div className={`mb-16 ${alignClass}`}>
      <h2 className="text-4xl font-light mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-gray-600 ${subtitleWidth}`}>{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;


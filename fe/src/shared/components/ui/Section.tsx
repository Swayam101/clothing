import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray';
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  background = 'white' 
}) => {
  const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  
  return (
    <section className={`px-6 lg:px-8 ${bgClass} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;


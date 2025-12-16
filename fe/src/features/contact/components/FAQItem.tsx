import React from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="border-l-2 border-gray-200 pl-6">
      <h3 className="text-sm tracking-wide font-medium mb-2">{question}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
    </div>
  );
};

export default FAQItem;


import React from 'react';

interface ResponseTimeCardProps {
  responseTime: string;
  businessHours: string;
  title?: string;
  description?: string;
}

const ResponseTimeCard: React.FC<ResponseTimeCardProps> = ({
  responseTime,
  businessHours,
  title = 'OUR RESPONSE TIME',
  description = 'We typically respond within',
}) => {
  return (
    <div className="mt-16 text-center border border-gray-200 p-8">
      <h3 className="text-sm tracking-widest font-medium mb-2">
        {title.toUpperCase()}
      </h3>
      <p className="text-sm text-gray-600">
        {description} {responseTime} during business hours
        <br />({businessHours})
      </p>
    </div>
  );
};

export default ResponseTimeCard;


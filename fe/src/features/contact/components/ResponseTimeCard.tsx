import React from 'react';

interface ResponseTimeCardProps {
  responseTime: string;
  businessHours: string;
}

const ResponseTimeCard: React.FC<ResponseTimeCardProps> = ({
  responseTime,
  businessHours,
}) => {
  return (
    <div className="mt-16 text-center border border-gray-200 p-8">
      <h3 className="text-sm tracking-widest font-medium mb-2">
        OUR RESPONSE TIME
      </h3>
      <p className="text-sm text-gray-600">
        We typically respond within {responseTime} during business hours
        <br />({businessHours})
      </p>
    </div>
  );
};

export default ResponseTimeCard;


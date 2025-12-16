import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';

const TrustSignals: React.FC = () => {
  return (
    <div className="border-t border-gray-200 pt-8 space-y-4">
      <div className="flex items-start space-x-3">
        <Truck className="text-gray-600 flex-shrink-0 mt-1" size={18} strokeWidth={1.5} />
        <div>
          <p className="text-sm font-medium">Pan-India Delivery</p>
          <p className="text-xs text-gray-500">Fast shipping to all major cities</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RotateCcw className="text-gray-600 flex-shrink-0 mt-1" size={18} strokeWidth={1.5} />
        <div>
          <p className="text-sm font-medium">Size Exchange Available</p>
          <p className="text-xs text-gray-500">Easy exchange if size doesn't fit</p>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;


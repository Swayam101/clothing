'use client';

import React from 'react';
import { Truck, RotateCcw, Sparkles } from 'lucide-react';

const TrustSignals: React.FC = () => {
  return (
    <div className="border-t border-gray-200 pt-8 space-y-4">
      <div className="flex items-start space-x-3">
        <Sparkles
          className="text-gray-600 flex-shrink-0 mt-1"
          size={18}
          strokeWidth={1.5}
        />
        <div>
          <p className="text-sm font-medium">Handpicked & Quality-Checked</p>
          <p className="text-xs text-gray-500">
            Every pre-loved piece is carefully curated
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Truck
          className="text-gray-600 flex-shrink-0 mt-1"
          size={18}
          strokeWidth={1.5}
        />
        <div>
          <p className="text-sm font-medium">Pan-India Shipping</p>
          <p className="text-xs text-gray-500">
            Sustainable fashion delivered to your doorstep
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RotateCcw
          className="text-gray-600 flex-shrink-0 mt-1"
          size={18}
          strokeWidth={1.5}
        />
        <div>
          <p className="text-sm font-medium">Size Exchange Available</p>
          <p className="text-xs text-gray-500">Easy exchange within 7 days</p>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;

import React from 'react';
import { Link } from 'react-router-dom';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm tracking-wide font-medium">SELECT SIZE *</h3>
        <Link
          to="/size-guide"
          className="text-sm underline underline-offset-4 hover:no-underline transition"
        >
          Size Guide
        </Link>
      </div>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`px-6 py-3 border text-sm tracking-wide transition-all ${
              selectedSize === size
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-black'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;


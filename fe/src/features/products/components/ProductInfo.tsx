import React from 'react';

interface ProductInfoProps {
  name: string;
  price: number;
  description: string;
  fabric: string;
  fit: string;
  care: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  price,
  description,
  fabric,
  fit,
  care,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-light mb-4">{name}</h1>
        <p className="text-3xl font-light">₹{price}</p>
      </div>

      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Product Details */}
      <div className="border-t border-gray-200 pt-8 space-y-6">
        <div>
          <h4 className="text-sm tracking-wide font-medium mb-2">FABRIC</h4>
          <p className="text-sm text-gray-600">{fabric}</p>
        </div>
        <div>
          <h4 className="text-sm tracking-wide font-medium mb-2">FIT</h4>
          <p className="text-sm text-gray-600">{fit}</p>
        </div>
        <div>
          <h4 className="text-sm tracking-wide font-medium mb-2">
            CARE INSTRUCTIONS
          </h4>
          <p className="text-sm text-gray-600">{care}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;


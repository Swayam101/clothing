import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../../../shared/components/ui/Section';
import SectionHeader from '../../../shared/components/ui/SectionHeader';
import ProductCard from '../../../shared/components/ProductCard';
import type { Product } from '../../../types/product';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
  
      <Section background="gray" className='py-16 mb-12'>
      <SectionHeader
        title="Featured Collection"
        subtitle="Timeless pieces for the modern minimalist"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/products"
          className="inline-block text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
        >
          View All Products
        </Link>
      </div>
    </Section>
 
  );
};

export default FeaturedProducts;


import Link from 'next/link';
import Section from '@/shared/components/ui/Section';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import ProductCard from '@/shared/components/ProductCard';
import type { Product } from '@/types/api';
import { HOME_FEATURED_PRODUCTS } from '@/data/content/pages/home';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <Section background="gray" className="py-16 mb-12">
      <SectionHeader
        title={HOME_FEATURED_PRODUCTS.title}
        subtitle={HOME_FEATURED_PRODUCTS.subtitle}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href={HOME_FEATURED_PRODUCTS.viewAllHref}
          className="inline-block text-sm tracking-wide underline underline-offset-4 hover:no-underline transition"
        >
          {HOME_FEATURED_PRODUCTS.viewAllText}
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedProducts;

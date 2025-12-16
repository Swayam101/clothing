import React, { useMemo, useState } from 'react';
import Section from '../../shared/components/ui/Section';
import SectionHeader from '../../shared/components/ui/SectionHeader';
import ProductCard from '../../shared/components/ProductCard';
import Pagination from '../../shared/components/ui/Pagination';
import { useProducts, transformStrapiProducts } from '../../api';

const PRODUCTS_PER_PAGE = 12;

const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from API with image population
  const { data, isLoading, error } = useProducts({
    populate: 'image',
    pagination: {
      page: currentPage,
      pageSize: PRODUCTS_PER_PAGE,
    },
  });

  // Transform Strapi products to app Product format
  const products = useMemo(() => {
    if (!data?.data) return [];
    return transformStrapiProducts(data.data);
  }, [data]);

  const totalPages = data?.meta?.pagination?.pageCount || 0;

  if (isLoading) {
    return (
      <Section>
        <SectionHeader
          title="Thrift Shop"
          subtitle="Discover unique pre-loved pieces, each with their own story"
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4"></div>
            <p className="text-gray-600">Finding thrifted treasures...</p>
          </div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <SectionHeader
          title="Our Collection"
          subtitle="Explore our curated selection of essentials"
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center text-red-600">
            <p className="text-lg font-medium mb-2">Error loading products</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      </Section>
    );
  }

  if (!products.length) {
    return (
      <Section>
        <SectionHeader
          title="Thrift Shop"
          subtitle="Discover unique pre-loved pieces, each with their own story"
        />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-600">No thrifted pieces available at the moment. Check back soon!</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader
        title="Thrift Shop"
        subtitle="Discover unique pre-loved pieces, each with their own story"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {data?.meta?.pagination && (
        <div className="mt-16 space-y-6">
          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          {/* Pagination Info */}
          <div className="text-center text-sm text-gray-500">
            Showing {products.length} of {data.meta.pagination.total} products
            <span className="mx-2">•</span>
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </Section>
  );
};

export default ProductsPage;

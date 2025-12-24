'use client';

import { useMemo, useState } from 'react';
import Section from '@/shared/components/ui/Section';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import ProductCard from '@/shared/components/ProductCard';
import Pagination from '@/shared/components/ui/Pagination';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import ErrorDisplay from '@/shared/components/ui/ErrorDisplay';
import EmptyState from '@/shared/components/ui/EmptyState';
import { useProducts } from '@/api';
import { PRODUCTS_PAGE } from '@/data/content/pages/products';

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products from new API
  const { data, isLoading, error } = useProducts({
    page: currentPage,
    limit: PRODUCTS_PAGE.pagination.itemsPerPage,
    inStock: true,
    isActive: true,
  });

  // Extract products from response
  const products = useMemo(() => {
    if (!data?.data?.products) return [];
    return data.data.products;
  }, [data]);

  const totalPages = data?.data?.pagination?.totalPages || 0;

  if (isLoading) {
    return (
      <Section>
        <SectionHeader title={PRODUCTS_PAGE.header.title} subtitle={PRODUCTS_PAGE.header.subtitle} />
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner message={PRODUCTS_PAGE.loading.message} />
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <SectionHeader title={PRODUCTS_PAGE.header.title} subtitle={PRODUCTS_PAGE.header.subtitle} />
        <div className="flex items-center justify-center py-20">
          <ErrorDisplay
            title={PRODUCTS_PAGE.error.title}
            message={error.message}
            showBackLink={false}
          />
        </div>
      </Section>
    );
  }

  if (!products.length) {
    return (
      <Section>
        <SectionHeader title={PRODUCTS_PAGE.header.title} subtitle={PRODUCTS_PAGE.header.subtitle} />
        <div className="flex items-center justify-center py-20">
          <EmptyState message={PRODUCTS_PAGE.empty.message} />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader title={PRODUCTS_PAGE.header.title} subtitle={PRODUCTS_PAGE.header.subtitle} />

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {data?.data?.pagination && (
        <div className="mt-16 space-y-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

          <div className="text-center text-sm text-gray-500">
            {PRODUCTS_PAGE.pagination.showingText} {products.length} {PRODUCTS_PAGE.pagination.ofText} {data.data.pagination.total} {PRODUCTS_PAGE.pagination.productsText}
            <span className="mx-2">•</span>
            {PRODUCTS_PAGE.pagination.pageText} {currentPage} {PRODUCTS_PAGE.pagination.ofText} {totalPages}
          </div>
        </div>
      )}
    </Section>
  );
}


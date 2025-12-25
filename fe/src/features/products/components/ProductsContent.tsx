'use client';

import React, { useMemo, useState, useCallback } from 'react';
import Section from '@/shared/components/ui/Section';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import ErrorDisplay from '@/shared/components/ui/ErrorDisplay';
import EmptyState from '@/shared/components/ui/EmptyState';
import { useProducts } from '@/api';
import { PRODUCTS_PAGE } from '@/data/content/pages/products';
import ProductsFilters from './ProductsFilters';
import ProductsGrid from './ProductsGrid';
import ProductsPagination from './ProductsPagination';

const ProductsContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Reset to page 1 when search or sort changes
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  // Fetch products with search and sort
  const { data, isLoading, error } = useProducts({
    page: currentPage,
    limit: PRODUCTS_PAGE.pagination.itemsPerPage,
    search: searchQuery || undefined,
    sort: sortBy || undefined,
    inStock: true,
    isActive: true,
  });

  // Extract products from response
  const products = useMemo(() => {
    if (!data?.data?.products) return [];
    return data.data.products;
  }, [data]);

  const totalPages = data?.data?.pagination?.totalPages || 0;
  const totalProducts = data?.data?.pagination?.total || 0;

  return (
    <Section className='mb-12'>
      <SectionHeader title={PRODUCTS_PAGE.header.title} subtitle={PRODUCTS_PAGE.header.subtitle} />

      <ProductsFilters
        searchQuery={searchQuery}
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        className="mb-12"
      />

      {/* Products Content Area */}
      <div className="space-y-12">
        {isLoading ? (
          // Loading state - only for products area
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner message={PRODUCTS_PAGE.loading.message} />
          </div>
        ) : error ? (
          // Error state - only for products area
          <div className="flex items-center justify-center py-20">
            <ErrorDisplay
              title={PRODUCTS_PAGE.error.title}
              message={error.message}
              showBackLink={false}
            />
          </div>
        ) : !products.length ? (
          // Empty state - only for products area
          <div className="flex items-center justify-center py-20">
            <EmptyState
              message={
                searchQuery
                  ? `No products found for "${searchQuery}"`
                  : PRODUCTS_PAGE.empty.message
              }
            />
          </div>
        ) : (
          // Success state - show products and pagination
          <>
            <ProductsGrid products={products} />

            <ProductsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              currentProductsCount={products.length}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </Section>
  );
};

export default ProductsContent;

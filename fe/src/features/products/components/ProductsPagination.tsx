'use client';

import React from 'react';
import Pagination from '@/shared/components/ui/Pagination';
import { PRODUCTS_PAGE } from '@/data/content/pages/products';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  currentProductsCount: number;
  onPageChange: (page: number) => void;
}

const ProductsPagination: React.FC<ProductsPaginationProps> = ({
  currentPage,
  totalPages,
  totalProducts,
  currentProductsCount,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-16 space-y-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <div className="text-center text-sm text-gray-500">
        {PRODUCTS_PAGE.pagination.showingText} {currentProductsCount} {PRODUCTS_PAGE.pagination.ofText} {totalProducts} {PRODUCTS_PAGE.pagination.productsText}
        <span className="mx-2">•</span>
        {PRODUCTS_PAGE.pagination.pageText} {currentPage} {PRODUCTS_PAGE.pagination.ofText} {totalPages}
      </div>
    </div>
  );
};

export default ProductsPagination;

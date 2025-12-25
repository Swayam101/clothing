'use client';

import React from 'react';
import { ArrowUpDown, Filter } from 'lucide-react';
import SearchBar from '@/shared/components/SearchBar';

const sortOptions = [
  { value: 'createdAt:desc', label: 'Newest First', icon: '🕒' },
  { value: 'price:asc', label: 'Price: Low to High', icon: '💰' },
  { value: 'price:desc', label: 'Price: High to Low', icon: '💎' },
  { value: 'title:asc', label: 'Name: A-Z', icon: '🔤' },
  { value: 'featured', label: 'Featured First', icon: '⭐' },
];

interface ProductsFiltersProps {
  searchQuery: string;
  sortBy: string;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  className?: string;
}

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  searchQuery,
  sortBy,
  onSearchChange,
  onSortChange,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>

      {/* Search and Sort Container */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:justify-between lg:items-end">
        {/* Search Bar */}
        <div className="flex-1 lg:max-w-md w-full">
          <SearchBar
            placeholder="Search by name, style, color..."
            initialValue={searchQuery}
            onSearch={onSearchChange}
            debounceMs={300}
          />
        </div>

        {/* Sort Section */}
        <div className="flex items-center gap-4 lg:min-w-[240px] lg:max-w-md w-full">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Sort by</span>
          </div>

          {/* Custom Styled Select */}
          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none px-4 py-3 pr-10 bg-white border border-gray-200 rounded-none text-sm font-medium text-gray-900 focus:border-black focus:ring-0 hover:border-gray-400 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              <option value="" className="text-gray-500">Choose sorting...</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value} className="text-gray-900">
                  {option.icon} {option.label}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyOrders } from '@/api/hooks/useOrders';
import { useAuthStore } from '@/store/useAuthStore';
import Section from '@/shared/components/ui/Section';
import SectionHeader from '@/shared/components/ui/SectionHeader';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import ErrorDisplay from '@/shared/components/ui/ErrorDisplay';
import EmptyState from '@/shared/components/ui/EmptyState';
import Pagination from '@/shared/components/ui/Pagination';
import OrderCard from './OrderCard';

const ORDERS_PAGE = {
  title: 'MY ORDERS',
  subtitle: 'View and track your purchase history',
  loading: {
    message: 'Loading orders...'
  },
  empty: {
    title: 'No orders yet',
    description: 'You haven\'t placed any orders yet. Start shopping to see your orders here.',
    actionText: 'Browse Products'
  }
};

const OrdersContent: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  console.log('🔍 OrdersContent - Component render:', {
    currentPage,
    isAuthenticated,
    hasUser: !!user,
    userId: user?.id,
    userEmail: user?.email,
    hasHydrated: _hasHydrated,
  });

  // Redirect if not authenticated (only after hydration completes)
  useEffect(() => {
    if (_hasHydrated && !isAuthenticated) {
      console.log('❌ OrdersContent - Not authenticated after hydration, redirecting to login');
      router.push('/login?redirect=/orders');
    }
  }, [_hasHydrated, isAuthenticated, router]);

  // Build query parameters
  const queryParams = {
    page: currentPage,
    limit: 10,
  };

  console.log('🔍 OrdersContent - Query params:', queryParams);

  // Fetch orders
  const { data, isLoading, error } = useMyOrders(queryParams, !!user);

  console.log('🔍 OrdersContent - API state:', {
    isLoading,
    hasError: !!error,
    error: error,
    hasData: !!data,
    dataKeys: data ? Object.keys(data) : null,
  });

  // Log raw API response
  useEffect(() => {
    if (data) {
      console.log('✅ OrdersContent - Raw API response:', JSON.stringify(data, null, 2));
    }
  }, [data]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    console.log('📄 OrdersContent - Page change requested:', {
      fromPage: currentPage,
      toPage: page,
    });
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show loading while hydrating
  if (!_hasHydrated) {
    console.log('⏸️ OrdersContent - Waiting for hydration...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading..." />
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    console.log('⏸️ OrdersContent - Not rendering, not authenticated');
    return null;
  }

  const orders = data?.data?.orders || [];
  const pagination = data?.data ? {
    currentPage: currentPage, // Use local state instead of API response (backend returns page: 1 always)
    totalPages: data.data.totalPages,
    totalOrders: data.data.total,
  } : null;

  console.log('🔍 OrdersContent - Extracted data:', {
    ordersCount: orders.length,
    pagination: pagination,
    rawDataStructure: data?.data ? {
      hasOrders: !!data.data.orders,
      ordersLength: data.data.orders?.length,
      page: data.data.page,
      totalPages: data.data.totalPages,
      total: data.data.total,
      limit: data.data.limit,
    } : null,
  });

  return (
    <Section className="mb-16">
      <SectionHeader title={ORDERS_PAGE.title} subtitle={ORDERS_PAGE.subtitle} />

      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner message={ORDERS_PAGE.loading.message} />
          </div>
        ) : error ? (
          <ErrorDisplay
            title="Failed to load orders"
            message="We couldn't load your orders. Please try again."
            backLinkText="Refresh Page"
            backLinkHref={window.location.href}
          />
        ) : !orders.length ? (
          <EmptyState
            message={`${ORDERS_PAGE.empty.description} ${ORDERS_PAGE.empty.actionText}?`}
            showLink={true}
            linkHref="/products"
            linkText={ORDERS_PAGE.empty.actionText}
          />
        ) : (
          <>
            <div className="grid gap-6">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <>
                {console.log('📊 OrdersContent - Rendering Pagination component:', {
                  currentPage: pagination.currentPage,
                  totalPages: pagination.totalPages,
                  totalOrders: pagination.totalOrders,
                  shouldRender: pagination.totalPages > 1,
                })}
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                  className="mt-8 sm:mt-10 lg:mt-12"
                />
              </>
            )}
          </>
        )}
      </div>
    </Section>
  );
};

export default OrdersContent;

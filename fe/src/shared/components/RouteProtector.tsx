'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfile } from '@/api/services/auth';
import { useAuthStore } from '@/store/useAuthStore';

// Query key for profile
export const PROFILE_QUERY_KEY = ['auth', 'profile'] as const;

interface RouteProtectorProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const RouteProtector: React.FC<RouteProtectorProps> = ({
  children,
  fallback,
  requireAuth = true,
  redirectTo = '/login',
}) => {
  const router = useRouter();
  const { token, isAuthenticated, clearAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  // Query to verify profile with backend
  const {
    data: profileData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
    enabled: !!token && isAuthenticated,
    retry: (failureCount, err: unknown) => {
      // Don't retry on auth errors
      const axiosError = err as { response?: { status?: number } };
      if (axiosError?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    // Not authenticated and auth is required - redirect
    if (!isAuthenticated || !token) {
      if (requireAuth) {
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
      return;
    }

    // If profile query failed with 401 - token is invalid
    if (isError && error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError?.response?.status === 401) {
        console.warn('Profile verification failed, clearing auth state');
        clearAuth();
        if (requireAuth) {
          router.push(redirectTo);
        }
        return;
      }
    }

    // Query is still loading
    if (isLoading) {
      return;
    }

    // Profile verification succeeded
    if (profileData?.success) {
      setIsChecking(false);
    } else if (!isLoading && !isError) {
      // Query finished but no success - something went wrong
      setIsChecking(false);
    }
  }, [isAuthenticated, token, profileData, error, isError, isLoading, requireAuth, redirectTo, router, clearAuth]);

  // Show loading state while checking authentication
  if (isChecking || (isAuthenticated && token && isLoading)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent mb-4"></div>
            <p className="text-gray-600">Verifying authentication...</p>
          </div>
        </div>
      )
    );
  }

  // If auth is required but user is not authenticated, don't render children
  if (requireAuth && (!isAuthenticated || !token || !profileData?.success)) {
    return null;
  }

  // Render children
  return <>{children}</>;
};

// Hook for checking auth status in components
export const useAuthCheck = () => {
  const { token, user, isAuthenticated, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: profileData, isLoading, error, refetch } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
    enabled: !!token && isAuthenticated,
    retry: (failureCount, err: unknown) => {
      const axiosError = err as { response?: { status?: number } };
      if (axiosError?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Invalidate profile query on logout
  const invalidateProfile = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
  }, [queryClient]);

  return {
    isAuthenticated: isAuthenticated && !!profileData?.success,
    user: profileData?.data?.user || user,
    isLoading,
    error,
    refetch,
    invalidateProfile,
    clearAuth,
  };
};

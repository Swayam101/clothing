'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const {
    isAuthenticated,
    loading,
    error,
    signInWithGoogle,
    signInWithFacebook,
  } = useFirebaseAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleGoogleSignIn = async () => {
    const result = await signInWithGoogle();
    if (result.success) {
      router.push('/');
    }
  };

  const handleFacebookSignIn = async () => {
    const result = await signInWithFacebook();
    if (result.success) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-widest mb-3">WELCOME</h1>
          <p className="text-sm text-gray-600 tracking-wide">
            Sign in to access your thrift treasures
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-600 text-sm tracking-wide">
            {error}
          </div>
        )}

        {/* Social Sign-In Buttons */}
        <div className="space-y-3">
          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm tracking-wide">
              {loading ? 'SIGNING IN...' : 'CONTINUE WITH GOOGLE'}
            </span>
          </button>

          {/* Facebook Sign-In */}
          <button
            onClick={handleFacebookSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 hover:border-black hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="text-sm tracking-wide">
              {loading ? 'SIGNING IN...' : 'CONTINUE WITH FACEBOOK'}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-white text-gray-500 tracking-wide">
              SECURE AUTHENTICATION
            </span>
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center space-y-3">
          <p className="text-xs text-gray-600 tracking-wide flex items-center justify-center gap-2">
            <Mail size={14} strokeWidth={1.5} />
            We&apos;ll never share your information
          </p>
          <p className="text-xs text-gray-500 tracking-wide">
            By signing in, you agree to our terms and privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}


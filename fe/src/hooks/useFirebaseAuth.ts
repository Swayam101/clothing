'use client';

import { useState, useEffect, useRef } from 'react';
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/config/firebase';
import { authenticateWithFirebase } from '@/api/services/auth';
import { useAuthStore } from '@/store/useAuthStore';

type ProviderType = 'google' | 'facebook';

interface SignInResult {
  success: boolean;
  error?: string;
  isNewUser?: boolean;
}

export const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, clearAuth, token, user } = useAuthStore();

  // Use refs to avoid stale closures in useEffect
  const tokenRef = useRef(token);
  const clearAuthRef = useRef(clearAuth);

  // Update refs when dependencies change
  useEffect(() => {
    tokenRef.current = token;
    clearAuthRef.current = clearAuth;
  }, [token, clearAuth]);

  // Listen for Firebase auth state changes
  useEffect(() => {
    // Only run on client side when auth is available
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        try {
          const currentToken = tokenRef.current;

          if (firebaseUser && !currentToken) {
            // User is signed in with Firebase but no JWT token yet
            // This can happen on page refresh - the stored token will be loaded by Zustand persist
            setLoading(false);
          } else if (!firebaseUser && currentToken) {
            // Firebase session expired but we still have local token
            // Clear everything to prevent inconsistent state
            clearAuthRef.current();
            setLoading(false);
          } else {
            // Both Firebase and JWT states are consistent
            setLoading(false);
          }
        } catch (err) {
          console.error('Error in auth state change handler:', err);
          // Clear auth state on error to prevent inconsistent state
          clearAuthRef.current();
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []); // Remove dependencies to prevent stale closure issues

  /**
   * Generic sign-in function that works with any Firebase provider
   */
  const signInWithProvider = async (
    provider: GoogleAuthProvider | FacebookAuthProvider,
    providerName: ProviderType
  ): Promise<SignInResult> => {
    if (!auth) {
      return { success: false, error: 'Authentication not available' };
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Sign in with Firebase
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Step 2: Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      // Step 3: Send ID token to backend to get JWT
      const response = await authenticateWithFirebase({
        idToken,
        provider: providerName, // 'google' or 'facebook'
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      });

      if (!response.success) {
        throw new Error(response.error || 'Authentication failed');
      }

      // Step 4: Store JWT token and user data in Zustand store (persisted to localStorage)
      const { token: jwtToken, user: userData, isNewUser } = response.data;

      // Transform backend user data to match our User interface
      const transformedUser = {
        ...userData,
        id: userData._id, // Map _id to id for our User interface
      };

      setAuth(jwtToken, transformedUser);

      return { success: true, isNewUser };
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error(`${providerName} sign-in error:`, err);

      // Handle specific Firebase errors
      let errorMessage = 'Authentication failed';

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Please allow popups for this site';
      } else if (
        error.code === 'auth/account-exists-with-different-credential'
      ) {
        errorMessage = 'Account exists with different sign-in method';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);

      // Sign out from Firebase if backend auth failed
      if (auth) {
        await firebaseSignOut(auth);
      }

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign in with Google
   */
  const signInWithGoogle = () => {
    if (!googleProvider) {
      return Promise.resolve({
        success: false,
        error: 'Google provider not available',
      });
    }
    return signInWithProvider(googleProvider, 'google');
  };

  /**
   * Sign in with Facebook
   */
  const signInWithFacebook = () => {
    if (!facebookProvider) {
      return Promise.resolve({
        success: false,
        error: 'Facebook provider not available',
      });
    }
    return signInWithProvider(facebookProvider, 'facebook');
  };

  /**
   * Sign out from both Firebase and clear JWT token
   */
  const signOut = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      setError(null);

      // Clear local state first to prevent race conditions
      clearAuth();

      // Then sign out from Firebase
      if (auth) {
        await firebaseSignOut(auth);
      }

      return { success: true };
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error('Sign out error:', err);

      let errorMessage = 'Sign out failed';
      if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error during sign out. Please check your connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithFacebook,
    signOut,
    isAuthenticated: !!user && !!token,
  };
};

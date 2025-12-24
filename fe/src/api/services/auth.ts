import { apiClient } from '../config';

interface FirebaseAuthData {
  idToken: string;
  provider: 'google' | 'facebook';
  displayName?: string | null;
  photoURL?: string | null;
}

interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      _id: string;
      email: string;
      name?: string;
      phone?: string;
      photoURL?: string;
      role: 'user' | 'admin';
      createdAt: string;
    };
    isNewUser: boolean;
  };
  error?: string;
}

/**
 * Authenticate user with Firebase ID token
 * This is the main authentication method that sends the Firebase token to the backend
 */
export const authenticateWithFirebase = async (authData: FirebaseAuthData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/firebase', authData);
  return response.data;
};

interface ProfileResponse {
  success: boolean;
  data: {
    user: {
      _id: string;
      email: string;
      name?: string;
      phone?: string;
      photoURL?: string;
      role: 'user' | 'admin';
      createdAt: string;
    };
  };
}

/**
 * Get current user profile - used for token verification
 */
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await apiClient.get<ProfileResponse>('/auth/profile');
  return response.data;
};

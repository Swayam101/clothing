'use client';

import { create } from 'zustand';

interface NewsletterState {
  email: string;
  isSubscribed: boolean;
  isLoading: boolean;
  error: string | null;
  setEmail: (email: string) => void;
  subscribe: () => Promise<void>;
  reset: () => void;
}

export const useNewsletterStore = create<NewsletterState>((set, get) => ({
  email: '',
  isSubscribed: false,
  isLoading: false,
  error: null,
  setEmail: (email) => set({ email }),
  subscribe: async () => {
    const { email } = get();

    if (!email || !email.includes('@')) {
      set({ error: 'Please enter a valid email address' });
      return;
    }

    set({ isLoading: true, error: null });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, you'd make an actual API call here
    console.log('Newsletter subscription:', email);

    set({ isSubscribed: true, isLoading: false, email: '' });

    // Reset after 3 seconds
    setTimeout(() => {
      set({ isSubscribed: false });
    }, 3000);
  },
  reset: () =>
    set({ email: '', isSubscribed: false, error: null, isLoading: false }),
}));

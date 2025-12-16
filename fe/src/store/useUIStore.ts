import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isNewsletterModalOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openNewsletterModal: () => void;
  closeNewsletterModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isNewsletterModalOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openNewsletterModal: () => set({ isNewsletterModalOpen: true }),
  closeNewsletterModal: () => set({ isNewsletterModalOpen: false }),
}));


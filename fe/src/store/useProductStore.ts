'use client';

import { create } from 'zustand';
import type { Product } from '@/types/product';

interface ProductState {
  selectedProduct: Product | null;
  selectedSize: string;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedSize: (size: string) => void;
  resetSelection: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  selectedSize: '',
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  resetSelection: () => set({ selectedProduct: null, selectedSize: '' }),
}));

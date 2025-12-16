export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  sizes: string[];
  description: string;
  fabric: string;
  fit: string;
  care: string;
  featured?: boolean;
}


# API Integration Documentation

This directory contains API-related code for the clothing brand application, built with **Axios** and **React TanStack Query**. Currently focused on **Strapi CMS integration**.

## 🏗️ Architecture

```
lib/api/
├── constants.ts          # API URLs and endpoints
├── config.ts             # Axios config with interceptors
├── queryClient.ts        # React Query client configuration
├── QueryProvider.tsx     # React Query provider component
├── services/             # Axios service functions
│   └── products.ts       # Strapi products API
├── hooks/                # React Query hooks
│   └── useProducts.ts    # Products query hook
├── utils/                # Utility functions
│   └── transformers.ts   # Strapi to App data transformers
├── index.ts              # Main exports
└── README.md             # Documentation
```

## 🚀 Usage Examples

### Get All Products (Strapi)

```tsx
import { useProducts } from '@/api';

// Get all products with images populated
const { data, isLoading, error } = useProducts({
  populate: 'image', // Always populate images
  pagination: {
    page: 1,
    pageSize: 12
  }
});

// Get featured products only
const { data: featuredData } = useProducts({
  populate: 'image',
  filters: {
    featured: { $eq: true } // Only featured products
  },
  pagination: { pageSize: 10 }
});

// Filter products with multiple conditions
const filteredProducts = useProducts({
  populate: 'image',
  filters: {
    title: { $containsi: 'coat' }, // Case-insensitive search
    price: { $gte: 100, $lte: 500 }, // Price range
    color: { $eq: 'Red' } // Exact color match
  },
  pagination: { page: 1, pageSize: 12 },
  sort: ['createdAt:desc'] // Sort by newest first
});

// Access response data
if (data) {
  console.log('Products:', data.data);
  console.log('Pagination:', data.meta.pagination);
}

// Real-world example: Featured products on HomePage
import { useProducts, transformStrapiProducts } from '@/api';

const HomePage = () => {
  const { data, isLoading } = useProducts({
    populate: 'image',
    filters: { featured: { $eq: true } },
    pagination: { pageSize: 10 }
  });

  const featuredProducts = useMemo(() => {
    if (!data?.data) return [];
    return transformStrapiProducts(data.data);
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <HeroCarousel products={featuredProducts} />
      <FeaturedProductsSection products={featuredProducts} />
    </div>
  );
};
```

### Get Single Product (Strapi)

```tsx
import { useProduct, transformStrapiProduct } from '@/api';

// Get single product by documentId
const { data, isLoading, error } = useProduct(
  'w0x4yti2j9v5elg2spu9nra3', // documentId
  { populate: 'image' }
);

// Transform to app Product format
const product = useMemo(() => {
  if (!data?.data) return null;
  return transformStrapiProduct(data.data);
}, [data]);

// Use the product
if (product) {
  console.log('Product:', product.name, product.price);
  console.log('Images:', product.images);
}
```

## ⚙️ Configuration

### Base URL
```typescript
export const API_BASE_URL = 'http://localhost:1337/api';
```

### Strapi Endpoints
```
GET /api/products?populate=image                              # Get all products
GET /api/products?populate=image&filters[featured][$eq]=true  # Get featured products
GET /api/products/:documentId?populate=image                  # Get single product
```

### Query Client Settings
- **Stale Time**: 5 minutes
- **Cache Time**: 10 minutes
- **Retry Logic**: Up to 3 retries for non-4xx errors
- **Refetch on Focus**: Disabled

## 🔧 Strapi Filters & Pagination

### Filters
```typescript
filters: {
  title: { $containsi: 'search term' }, // Case-insensitive search
  color: { $eq: 'Red' },                 // Exact match
  size: { $eq: 'M' },                    // Size filter
  price: { $gte: 100, $lte: 500 },      // Price range
  featured: { $eq: true }                // Boolean filter
}
```

### Pagination
```typescript
pagination: {
  page: 1,        // Current page (1-based)
  pageSize: 12,   // Items per page
  withCount: true // Include total count
}
```

### Sorting
```typescript
sort: ['createdAt:desc', 'price:asc'] // Multiple sort fields
```

### Populate
```typescript
populate: 'image'        // Single relation
populate: ['image', 'category'] // Multiple relations
```

## 📝 Strapi Response Format

### Multiple Products Response
```typescript
interface StrapiProductsResponse {
  data: StrapiProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
```

### Single Product Response
```typescript
interface StrapiProductResponse {
  data: StrapiProduct;
  meta: Record<string, never>;
}
```

### Product Structure
```typescript
interface StrapiProduct {
  id: number;
  documentId: string;
  title: string;
  color: string;
  condition: string;
  price: number;
  instock: number;
  fabric: string;
  description: string;
  style: string;
  size: string;
  featured?: boolean | null;
  image: StrapiImage[]; // Populated image data
  // ... other Strapi fields
}
```

## 🔄 Data Transformers

Use transformers to convert Strapi data to app-compatible format:

```typescript
import { useProducts, transformStrapiProducts, transformStrapiProduct } from '@/api';

const { data } = useProducts({ populate: 'image' });

// Transform Strapi products to app Product[] format
const products = transformStrapiProducts(data?.data || []);

// Or transform single product
const product = transformStrapiProduct(strapiProduct);
```

**What it does:**
- Maps `title` → `name`
- Maps `documentId` → `id`
- Generates `slug` from title
- Converts Strapi image objects → image URL strings
- Maps other Strapi fields to app Product interface

## 🏷️ TypeScript Support

All hooks and services are fully typed. Import types:
```typescript
import type {
  StrapiProductsResponse,
  StrapiProductResponse,
  StrapiProduct,
  ProductsQueryParams,
  ProductQueryParams
} from '@/api';
```
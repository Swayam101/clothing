import type { StrapiProduct, StrapiProductsResponse, StrapiProductResponse } from '../services/products';

// Mock Strapi images
const createMockImage = (id: number, name: string, url: string) => ({
  id,
  documentId: `img_${id}`,
  name,
  alternativeText: name,
  caption: undefined,
  width: 800,
  height: 1000,
  formats: {
    thumbnail: {
      name: `thumbnail_${name}`,
      hash: `thumbnail_hash_${id}`,
      ext: '.jpg',
      mime: 'image/jpeg',
      path: null,
      width: 156,
      height: 195,
      size: 5.32,
      sizeInBytes: 5320,
      url: url,
    },
    small: {
      name: `small_${name}`,
      hash: `small_hash_${id}`,
      ext: '.jpg',
      mime: 'image/jpeg',
      path: null,
      width: 400,
      height: 500,
      size: 25.18,
      sizeInBytes: 25180,
      url: url,
    },
    medium: {
      name: `medium_${name}`,
      hash: `medium_hash_${id}`,
      ext: '.jpg',
      mime: 'image/jpeg',
      path: null,
      width: 600,
      height: 750,
      size: 52.45,
      sizeInBytes: 52450,
      url: url,
    },
    large: {
      name: `large_${name}`,
      hash: `large_hash_${id}`,
      ext: '.jpg',
      mime: 'image/jpeg',
      path: null,
      width: 800,
      height: 1000,
      size: 85.62,
      sizeInBytes: 85620,
      url: url,
    },
  },
  hash: `hash_${id}`,
  ext: '.jpg',
  mime: 'image/jpeg',
  size: 85.62,
  url: url,
  previewUrl: null,
  provider: 'local',
  provider_metadata: null,
  createdAt: '2024-01-15T10:00:00.000Z',
  updatedAt: '2024-01-15T10:00:00.000Z',
  publishedAt: '2024-01-15T10:00:00.000Z',
});

// Mock products data in Strapi format
export const MOCK_PRODUCTS: StrapiProduct[] = [
  {
    id: 1,
    documentId: 'doc_oversized_tee_black',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
    publishedAt: '2024-01-15T10:00:00.000Z',
    title: 'Oversized Black Tee',
    color: 'Black',
    condition: 'Machine wash cold, tumble dry low',
    price: 899,
    instock: 10,
    fabric: '100% Cotton',
    description: 'Classic oversized black t-shirt with a relaxed fit. Perfect for everyday wear, this premium cotton tee offers ultimate comfort and style.',
    style: 'Oversized',
    size: 'L',
    featured: true,
    image: [
      createMockImage(1, 'oversized_black_tee_1.jpg', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop'),
      createMockImage(2, 'oversized_black_tee_2.jpg', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 2,
    documentId: 'doc_vintage_denim_jacket',
    createdAt: '2024-01-16T10:00:00.000Z',
    updatedAt: '2024-01-16T10:00:00.000Z',
    publishedAt: '2024-01-16T10:00:00.000Z',
    title: 'Vintage Denim Jacket',
    color: 'Blue',
    condition: 'Gentle wash, hang dry',
    price: 2499,
    instock: 5,
    fabric: 'Denim',
    description: 'Authentic vintage denim jacket with a timeless appeal. Features classic button closure and multiple pockets. A wardrobe essential.',
    style: 'Regular Fit',
    size: 'M',
    featured: true,
    image: [
      createMockImage(3, 'denim_jacket_1.jpg', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop'),
      createMockImage(4, 'denim_jacket_2.jpg', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 3,
    documentId: 'doc_white_hoodie',
    createdAt: '2024-01-17T10:00:00.000Z',
    updatedAt: '2024-01-17T10:00:00.000Z',
    publishedAt: '2024-01-17T10:00:00.000Z',
    title: 'Classic White Hoodie',
    color: 'White',
    condition: 'Wash inside out, low heat',
    price: 1499,
    instock: 8,
    fabric: '80% Cotton, 20% Polyester',
    description: 'Cozy white hoodie with adjustable drawstrings and kangaroo pocket. Perfect for layering or wearing solo in cooler weather.',
    style: 'Regular Fit',
    size: 'L',
    featured: true,
    image: [
      createMockImage(5, 'white_hoodie_1.jpg', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop'),
      createMockImage(6, 'white_hoodie_2.jpg', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 4,
    documentId: 'doc_cargo_pants_olive',
    createdAt: '2024-01-18T10:00:00.000Z',
    updatedAt: '2024-01-18T10:00:00.000Z',
    publishedAt: '2024-01-18T10:00:00.000Z',
    title: 'Olive Cargo Pants',
    color: 'Olive',
    condition: 'Machine wash, tumble dry',
    price: 1799,
    instock: 6,
    fabric: '98% Cotton, 2% Spandex',
    description: 'Functional cargo pants with multiple utility pockets. Durable and comfortable for everyday adventures.',
    style: 'Relaxed Fit',
    size: 'M',
    featured: true,
    image: [
      createMockImage(7, 'cargo_pants_1.jpg', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop'),
      createMockImage(8, 'cargo_pants_2.jpg', 'https://images.unsplash.com/photo-1624378440070-7b44e16555e1?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 5,
    documentId: 'doc_striped_shirt',
    createdAt: '2024-01-19T10:00:00.000Z',
    updatedAt: '2024-01-19T10:00:00.000Z',
    publishedAt: '2024-01-19T10:00:00.000Z',
    title: 'Striped Button Shirt',
    color: 'Navy/White',
    condition: 'Iron if needed, dry clean recommended',
    price: 1299,
    instock: 12,
    fabric: '100% Cotton',
    description: 'Classic striped button-up shirt perfect for both casual and semi-formal occasions. Breathable fabric for all-day comfort.',
    style: 'Slim Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(9, 'striped_shirt_1.jpg', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop'),
      createMockImage(10, 'striped_shirt_2.jpg', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 6,
    documentId: 'doc_grey_sweatpants',
    createdAt: '2024-01-20T10:00:00.000Z',
    updatedAt: '2024-01-20T10:00:00.000Z',
    publishedAt: '2024-01-20T10:00:00.000Z',
    title: 'Grey Sweatpants',
    color: 'Grey',
    condition: 'Machine wash, hang dry',
    price: 1199,
    instock: 15,
    fabric: '70% Cotton, 30% Polyester',
    description: 'Comfortable grey sweatpants with elastic waistband and side pockets. Perfect for lounging or light workouts.',
    style: 'Regular Fit',
    size: 'L',
    featured: false,
    image: [
      createMockImage(11, 'grey_sweatpants_1.jpg', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop'),
      createMockImage(12, 'grey_sweatpants_2.jpg', 'https://images.unsplash.com/photo-1517438322307-e67111341475?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 7,
    documentId: 'doc_leather_bomber',
    createdAt: '2024-01-21T10:00:00.000Z',
    updatedAt: '2024-01-21T10:00:00.000Z',
    publishedAt: '2024-01-21T10:00:00.000Z',
    title: 'Leather Bomber Jacket',
    color: 'Brown',
    condition: 'Professional leather care only',
    price: 4999,
    instock: 3,
    fabric: 'Genuine Leather',
    description: 'Premium leather bomber jacket with ribbed cuffs and hem. A timeless piece that gets better with age.',
    style: 'Regular Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(13, 'leather_bomber_1.jpg', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop'),
      createMockImage(14, 'leather_bomber_2.jpg', 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 8,
    documentId: 'doc_graphic_tee_white',
    createdAt: '2024-01-22T10:00:00.000Z',
    updatedAt: '2024-01-22T10:00:00.000Z',
    publishedAt: '2024-01-22T10:00:00.000Z',
    title: 'Graphic Print Tee',
    color: 'White',
    condition: 'Wash inside out, cold water',
    price: 799,
    instock: 20,
    fabric: '100% Cotton',
    description: 'Trendy graphic print t-shirt with unique artwork. Express your style with this statement piece.',
    style: 'Regular Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(15, 'graphic_tee_1.jpg', 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop'),
      createMockImage(16, 'graphic_tee_2.jpg', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 9,
    documentId: 'doc_black_jeans',
    createdAt: '2024-01-23T10:00:00.000Z',
    updatedAt: '2024-01-23T10:00:00.000Z',
    publishedAt: '2024-01-23T10:00:00.000Z',
    title: 'Black Skinny Jeans',
    color: 'Black',
    condition: 'Machine wash, tumble dry',
    price: 1899,
    instock: 10,
    fabric: '98% Cotton, 2% Elastane',
    description: 'Sleek black skinny jeans with stretch for comfort. A versatile wardrobe staple that pairs with everything.',
    style: 'Skinny Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(17, 'black_jeans_1.jpg', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=1000&fit=crop'),
      createMockImage(18, 'black_jeans_2.jpg', 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 10,
    documentId: 'doc_flannel_shirt_red',
    createdAt: '2024-01-24T10:00:00.000Z',
    updatedAt: '2024-01-24T10:00:00.000Z',
    publishedAt: '2024-01-24T10:00:00.000Z',
    title: 'Red Flannel Shirt',
    color: 'Red',
    condition: 'Machine wash, iron if needed',
    price: 1399,
    instock: 8,
    fabric: '100% Cotton Flannel',
    description: 'Cozy red flannel shirt perfect for fall and winter. Classic plaid pattern with button-down design.',
    style: 'Regular Fit',
    size: 'L',
    featured: false,
    image: [
      createMockImage(19, 'flannel_shirt_1.jpg', 'https://images.unsplash.com/photo-1598032895397-b9872f3eba28?w=800&h=1000&fit=crop'),
      createMockImage(20, 'flannel_shirt_2.jpg', 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 11,
    documentId: 'doc_beige_chinos',
    createdAt: '2024-01-25T10:00:00.000Z',
    updatedAt: '2024-01-25T10:00:00.000Z',
    publishedAt: '2024-01-25T10:00:00.000Z',
    title: 'Beige Chinos',
    color: 'Beige',
    condition: 'Machine wash, iron recommended',
    price: 1699,
    instock: 7,
    fabric: '97% Cotton, 3% Spandex',
    description: 'Versatile beige chinos with a modern cut. Perfect for smart-casual occasions and everyday wear.',
    style: 'Slim Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(21, 'beige_chinos_1.jpg', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=1000&fit=crop'),
      createMockImage(22, 'beige_chinos_2.jpg', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 12,
    documentId: 'doc_navy_polo',
    createdAt: '2024-01-26T10:00:00.000Z',
    updatedAt: '2024-01-26T10:00:00.000Z',
    publishedAt: '2024-01-26T10:00:00.000Z',
    title: 'Navy Polo Shirt',
    color: 'Navy',
    condition: 'Machine wash, no iron needed',
    price: 999,
    instock: 14,
    fabric: '100% Pique Cotton',
    description: 'Classic navy polo shirt with ribbed collar and cuffs. A timeless essential for any wardrobe.',
    style: 'Regular Fit',
    size: 'L',
    featured: false,
    image: [
      createMockImage(23, 'navy_polo_1.jpg', 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&h=1000&fit=crop'),
      createMockImage(24, 'navy_polo_2.jpg', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 13,
    documentId: 'doc_track_jacket',
    createdAt: '2024-01-27T10:00:00.000Z',
    updatedAt: '2024-01-27T10:00:00.000Z',
    publishedAt: '2024-01-27T10:00:00.000Z',
    title: 'Retro Track Jacket',
    color: 'Black/White',
    condition: 'Machine wash, hang dry',
    price: 1899,
    instock: 6,
    fabric: '100% Polyester',
    description: 'Sporty retro track jacket with contrast stripes. Perfect for athletic activities or streetwear style.',
    style: 'Athletic Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(25, 'track_jacket_1.jpg', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop'),
      createMockImage(26, 'track_jacket_2.jpg', 'https://images.unsplash.com/photo-1548126032-079166db86f6?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 14,
    documentId: 'doc_green_henley',
    createdAt: '2024-01-28T10:00:00.000Z',
    updatedAt: '2024-01-28T10:00:00.000Z',
    publishedAt: '2024-01-28T10:00:00.000Z',
    title: 'Green Henley Shirt',
    color: 'Forest Green',
    condition: 'Machine wash cold, tumble dry',
    price: 1099,
    instock: 9,
    fabric: '100% Cotton',
    description: 'Comfortable henley shirt with button placket. A versatile piece that works for casual outings.',
    style: 'Regular Fit',
    size: 'L',
    featured: false,
    image: [
      createMockImage(27, 'green_henley_1.jpg', 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=1000&fit=crop'),
      createMockImage(28, 'green_henley_2.jpg', 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 15,
    documentId: 'doc_shorts_khaki',
    createdAt: '2024-01-29T10:00:00.000Z',
    updatedAt: '2024-01-29T10:00:00.000Z',
    publishedAt: '2024-01-29T10:00:00.000Z',
    title: 'Khaki Shorts',
    color: 'Khaki',
    condition: 'Machine wash, iron if needed',
    price: 899,
    instock: 11,
    fabric: '100% Cotton',
    description: 'Classic khaki shorts perfect for summer. Features multiple pockets and comfortable fit.',
    style: 'Regular Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(29, 'khaki_shorts_1.jpg', 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=1000&fit=crop'),
      createMockImage(30, 'khaki_shorts_2.jpg', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop'),
    ],
  },
  {
    id: 16,
    documentId: 'doc_windbreaker_orange',
    createdAt: '2024-01-30T10:00:00.000Z',
    updatedAt: '2024-01-30T10:00:00.000Z',
    publishedAt: '2024-01-30T10:00:00.000Z',
    title: 'Orange Windbreaker',
    color: 'Orange',
    condition: 'Machine wash, air dry',
    price: 2199,
    instock: 5,
    fabric: 'Nylon/Polyester blend',
    description: 'Lightweight windbreaker jacket perfect for unpredictable weather. Packs into its own pocket for easy storage.',
    style: 'Regular Fit',
    size: 'L',
    featured: false,
    image: [
      createMockImage(31, 'windbreaker_1.jpg', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop'),
      createMockImage(32, 'windbreaker_2.jpg', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop'),
    ],
  },
];

// Helper function to paginate mock data
export const paginateMockProducts = (
  products: StrapiProduct[],
  page: number = 1,
  pageSize: number = 12
) => {
  const total = products.length;
  const pageCount = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = products.slice(start, end);

  return {
    data: paginatedData,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    },
  };
};

// Helper function to filter mock products
export const filterMockProducts = (
  products: StrapiProduct[],
  filters?: {
    title?: { $containsi?: string };
    color?: { $eq?: string };
    size?: { $eq?: string };
    price?: { $gte?: number; $lte?: number };
    featured?: { $eq?: boolean };
  }
): StrapiProduct[] => {
  let filtered = [...products];

  if (filters?.title?.$containsi) {
    const searchTerm = filters.title.$containsi.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchTerm));
  }

  if (filters?.color?.$eq) {
    filtered = filtered.filter((p) => p.color === filters.color?.$eq);
  }

  if (filters?.size?.$eq) {
    filtered = filtered.filter((p) => p.size === filters.size?.$eq);
  }

  if (filters?.price?.$gte !== undefined) {
    filtered = filtered.filter((p) => p.price >= (filters.price?.$gte || 0));
  }

  if (filters?.price?.$lte !== undefined) {
    filtered = filtered.filter((p) => p.price <= (filters.price?.$lte || Infinity));
  }

  if (filters?.featured?.$eq !== undefined) {
    filtered = filtered.filter((p) => p.featured === filters.featured?.$eq);
  }

  return filtered;
};

// Helper function to sort mock products
export const sortMockProducts = (
  products: StrapiProduct[],
  sort?: string[]
): StrapiProduct[] => {
  if (!sort || sort.length === 0) return products;

  const sorted = [...products];
  
  sort.forEach((sortField) => {
    const isDescending = sortField.startsWith('-');
    const field = isDescending ? sortField.substring(1) : sortField;

    sorted.sort((a, b) => {
      const aValue = (a as any)[field];
      const bValue = (b as any)[field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return isDescending ? -comparison : comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return isDescending ? bValue - aValue : aValue - bValue;
      }

      return 0;
    });
  });

  return sorted;
};

// Mock response generator for getProducts
export const getMockProductsResponse = (params?: {
  pagination?: { page?: number; pageSize?: number; withCount?: boolean };
  filters?: any;
  sort?: string[];
}): StrapiProductsResponse => {
  let products = [...MOCK_PRODUCTS];

  // Apply filters
  if (params?.filters) {
    products = filterMockProducts(products, params.filters);
  }

  // Apply sorting
  if (params?.sort) {
    products = sortMockProducts(products, params.sort);
  }

  // Apply pagination
  const page = params?.pagination?.page || 1;
  const pageSize = params?.pagination?.pageSize || 12;

  return paginateMockProducts(products, page, pageSize);
};

// Mock response generator for getProduct
export const getMockProductResponse = (documentId: string): StrapiProductResponse | null => {
  const product = MOCK_PRODUCTS.find((p) => p.documentId === documentId);
  
  if (!product) {
    return null;
  }

  return {
    data: product,
    meta: {},
  };
};


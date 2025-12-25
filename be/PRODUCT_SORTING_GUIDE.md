# 🔄 Product Sorting API Guide

This guide explains how to use the sorting functionality in the products API endpoint.

## API Endpoint

```http
GET /api/products?sort={field}:{direction}
```

## Available Sort Options

### Sort Fields

| Field | Description | Default Direction |
|-------|-------------|-------------------|
| `price` | Sort by product price | ascending |
| `title` | Sort by product title (alphabetical) | ascending |
| `createdAt` | Sort by creation date | descending |
| `featured` | Sort featured products first | N/A (special logic) |
| `instock` | Sort by stock quantity | ascending |

### Sort Directions

| Direction | Description |
|-----------|-------------|
| `asc` | Ascending (A-Z, low to high, oldest first) |
| `desc` | Descending (Z-A, high to low, newest first) |

## Usage Examples

### Basic Sorting

```bash
# Sort by price (ascending - cheapest first)
GET /api/products?sort=price

# Sort by price (descending - most expensive first)
GET /api/products?sort=price:desc

# Sort by title (alphabetical A-Z)
GET /api/products?sort=title

# Sort by title (alphabetical Z-A)
GET /api/products?sort=title:desc

# Sort by newest products first
GET /api/products?sort=createdAt:desc

# Sort by oldest products first
GET /api/products?sort=createdAt:asc

# Featured products first
GET /api/products?sort=featured

# Sort by stock quantity (lowest first)
GET /api/products?sort=instock

# Sort by stock quantity (highest first)
GET /api/products?sort=instock:desc
```

### Combined with Other Filters

```bash
# Search + Sort
GET /api/products?search=cotton&sort=price:asc

# Filter + Sort
GET /api/products?style=casual&sort=title

# Multiple filters + Sort
GET /api/products?style=casual&color=blue&sort=price:desc

# Pagination + Sort
GET /api/products?page=1&limit=20&sort=createdAt:desc
```

## Default Behavior

When no `sort` parameter is provided, products are sorted by `createdAt:desc` (newest first).

## Frontend Implementation Examples

### React Component

```tsx
import { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('createdAt:desc');

  useEffect(() => {
    fetchProducts(sortBy);
  }, [sortBy]);

  const fetchProducts = async (sort: string) => {
    const response = await fetch(`/api/products?sort=${sort}&limit=20`);
    const data = await response.json();
    setProducts(data.data.products);
  };

  return (
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt:desc">Newest First</option>
        <option value="createdAt:asc">Oldest First</option>
        <option value="price:asc">Price: Low to High</option>
        <option value="price:desc">Price: High to Low</option>
        <option value="title:asc">Name: A-Z</option>
        <option value="title:desc">Name: Z-A</option>
        <option value="featured">Featured First</option>
        <option value="instock:desc">Most in Stock</option>
      </select>

      {/* Product list */}
    </div>
  );
}
```

### JavaScript Fetch

```javascript
// Sort by price ascending
const response = await fetch('/api/products?sort=price:asc&limit=20');
const data = await response.json();

// Sort by newest first
const response = await fetch('/api/products?sort=createdAt:desc&limit=20');
const data = await response.json();

// Sort featured products first
const response = await fetch('/api/products?sort=featured&limit=20');
const data = await response.json();
```

## Security Features

- ✅ **Field validation**: Only allowed fields can be sorted
- ✅ **Direction validation**: Only `asc` and `desc` directions allowed
- ✅ **No SQL injection**: Uses parameterized queries
- ✅ **Modular design**: Sorting logic is separate from model

## Performance Notes

- Sorting is performed at the database level using MongoDB indexes
- Complex sorts (like featured) use compound indexes for optimal performance
- Default sort uses `createdAt` index for fast queries

## Error Handling

Invalid sort parameters are ignored and the default sorting is applied. This ensures backward compatibility.

## API Response

The response format remains the same, only the order of products in the `products` array changes:

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [...], // Products in sorted order
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

## Implementation Details

### Backend Architecture

The sorting functionality is implemented in three layers:

1. **Controller Layer** (`getAllProducts.ts`): Validates and parses sort parameters
2. **Service Layer** (`getAllProducts.ts`): Passes sort parameter to DAO
3. **DAO Layer** (`productDao.ts`): Converts sort parameter to MongoDB sort object

### Code Structure

```typescript
// Controller validation
if (req.query.sort && typeof req.query.sort === 'string') {
  const allowedSortFields = ['price', 'title', 'createdAt', 'featured', 'instock'];
  const sortParam = req.query.sort;

  if (sortParam.includes(':')) {
    const [field, direction] = sortParam.split(':');
    if (allowedSortFields.includes(field) && ['asc', 'desc'].includes(direction)) {
      query.sort = sortParam;
    }
  } else if (allowedSortFields.includes(sortParam)) {
    query.sort = `${sortParam}:asc`;
  }
}

// DAO sorting logic
let sortObj: any = { createdAt: -1 }; // Default

if (sort) {
  const [field, direction] = sort.split(':');
  const sortDirection = direction === 'desc' ? -1 : 1;

  switch (field) {
    case 'price': sortObj = { price: sortDirection }; break;
    case 'title': sortObj = { title: sortDirection }; break;
    case 'createdAt': sortObj = { createdAt: sortDirection }; break;
    case 'featured': sortObj = { featured: -1, createdAt: -1 }; break;
    case 'instock': sortObj = { instock: sortDirection }; break;
  }
}
```

## Testing Examples

```bash
# Test all sort options
curl "http://localhost:3000/api/products?sort=price:asc&limit=5"
curl "http://localhost:3000/api/products?sort=title:desc&limit=5"
curl "http://localhost:3000/api/products?sort=featured&limit=5"
curl "http://localhost:3000/api/products?sort=instock:desc&limit=5"

# Test with filters
curl "http://localhost:3000/api/products?style=casual&sort=price:desc&limit=5"
curl "http://localhost:3000/api/products?search=dress&sort=createdAt:desc&limit=5"

# Test invalid sort (should use default)
curl "http://localhost:3000/api/products?sort=invalid:field&limit=5"
```

## Future Enhancements

Potential additions:
- Sort by popularity (if sales data is added)
- Sort by rating (if review system is added)
- Custom sort combinations
- Sort by multiple fields

---

🎯 **Ready to use!** The sorting functionality is now available on your products API endpoint.

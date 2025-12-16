# Mock Data Setup Guide

This project supports running without a backend API using mock data. This is useful for:
- Client demos
- Development without backend setup
- Testing UI components
- Showcasing the application

## 🚀 Quick Start

### Using Mock Data (No API Required)

1. **Create a `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```

2. **Enable mock data** by setting the environment variable:
   ```env
   VITE_USE_MOCK_DATA=true
   ```

3. **Run the development server**:
   ```bash
   yarn dev
   ```

The application will now use mock data instead of making API calls to the backend! 🎭

### Using Real API

To switch back to the real API:

1. **Disable mock data** in `.env`:
   ```env
   VITE_USE_MOCK_DATA=false
   ```
   
   Or simply remove the variable.

2. **Ensure your backend is running** at the configured URL:
   ```env
   VITE_API_BASE_URL=http://localhost:1337/api
   ```

3. **Run the development server**:
   ```bash
   yarn dev
   ```

## 📁 Mock Data Structure

All mock data is located in:
```
src/api/mocks/products.mock.ts
```

### Mock Data Features

- **16 sample products** with complete details
- **Strapi-compatible format** - matches real API response structure
- **High-quality images** from Unsplash
- **Complete product attributes**:
  - Title, color, price
  - Multiple product images
  - Size, fabric, style information
  - Care instructions
  - Featured flag for homepage display

### Available Mock Products

1. Oversized Black Tee - ₹899 (Featured)
2. Vintage Denim Jacket - ₹2,499 (Featured)
3. Classic White Hoodie - ₹1,499 (Featured)
4. Olive Cargo Pants - ₹1,799 (Featured)
5. Striped Button Shirt - ₹1,299
6. Grey Sweatpants - ₹1,199
7. Leather Bomber Jacket - ₹4,999
8. Graphic Print Tee - ₹799
9. Black Skinny Jeans - ₹1,899
10. Red Flannel Shirt - ₹1,399
11. Beige Chinos - ₹1,699
12. Navy Polo Shirt - ₹999
13. Retro Track Jacket - ₹1,899
14. Green Henley Shirt - ₹1,099
15. Khaki Shorts - ₹899
16. Orange Windbreaker - ₹2,199

## 🔧 How It Works

### Automatic Fallback

Even when `VITE_USE_MOCK_DATA=false`, the application has automatic fallback logic:

- If the API call fails (network error, timeout, etc.)
- The app automatically falls back to mock data
- A console warning is logged: `⚠️ API call failed, falling back to mock data`
- The user experience remains uninterrupted

### Service Layer

The `src/api/services/products.ts` file contains the logic:

```typescript
// Check environment variable
if (USE_MOCK_DATA) {
  // Use mock data
  return getMockProductsResponse(params);
}

// Try API call
try {
  const response = await apiClient.get(API_ENDPOINTS.PRODUCTS);
  return response.data;
} catch (error) {
  // Fallback to mock data on error
  return getMockProductsResponse(params);
}
```

### Supported Features with Mock Data

✅ **Fully Functional:**
- Product listing with pagination
- Product detail pages
- Filtering by featured products
- Search and filters (title, color, size, price)
- Sorting
- Image galleries
- Size selection
- WhatsApp/Instagram order integration

## 🎨 Customizing Mock Data

### Adding New Products

Edit `src/api/mocks/products.mock.ts`:

```typescript
export const MOCK_PRODUCTS: StrapiProduct[] = [
  // Existing products...
  {
    id: 17,
    documentId: 'doc_your_new_product',
    createdAt: '2024-01-31T10:00:00.000Z',
    updatedAt: '2024-01-31T10:00:00.000Z',
    publishedAt: '2024-01-31T10:00:00.000Z',
    title: 'Your Product Name',
    color: 'Blue',
    condition: 'Machine wash',
    price: 1999,
    instock: 10,
    fabric: '100% Cotton',
    description: 'Your product description',
    style: 'Regular Fit',
    size: 'M',
    featured: false,
    image: [
      createMockImage(33, 'product_1.jpg', 'https://images.unsplash.com/your-image-url'),
    ],
  },
];
```

### Modifying Existing Products

Simply edit the properties in the `MOCK_PRODUCTS` array.

### Using Custom Images

Replace the Unsplash URLs with:
- Your own hosted images
- Local images in the `public` folder
- Other CDN URLs

## 🧪 Testing Mock Data

### Verify Mock Data is Active

Open the browser console and look for:
```
🎭 Using mock data for products
```

### Test Pagination

The mock data supports pagination:
- Default: 12 products per page
- Navigate through pages to see all 16 products

### Test Filtering

Try filtering featured products:
- Homepage shows only featured products (4 products)
- Products page shows all products

### Test Product Details

Click on any product to see:
- Full product information
- Image gallery
- Size selection
- Order buttons

## 📝 Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:1337/api` | Backend API URL |
| `VITE_USE_MOCK_DATA` | `false` | Enable mock data mode |

## 🚨 Important Notes

1. **Mock data persists only in memory** - refreshing the page resets to initial state
2. **No actual orders are placed** - WhatsApp/Instagram integration still works for UI testing
3. **Images are from Unsplash** - free stock images used for demo purposes
4. **Network delay simulation** - 300ms delay added to mock requests for realistic behavior

## 🎯 Use Cases

### For Client Demos
```env
VITE_USE_MOCK_DATA=true
```
Show the client a fully functional website without backend setup.

### For Development
```env
VITE_USE_MOCK_DATA=false
```
Work with real API during development, with automatic fallback to mock data if API is unavailable.

### For Production
Never deploy with `VITE_USE_MOCK_DATA=true` in production!

## 🔄 Switching Between Modes

**No rebuild required!** Changes to `.env` are picked up on page refresh during development with Vite.

1. Edit `.env` file
2. Save the file
3. Refresh the browser (Ctrl+R / Cmd+R)
4. Check console for confirmation message

---

**Happy coding! 🎉**

If you have questions about the mock data setup, check the source code in `src/api/mocks/products.mock.ts` or the service layer in `src/api/services/products.ts`.


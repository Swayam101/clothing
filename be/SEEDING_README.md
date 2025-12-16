# Product Seeding Documentation

## Overview
A seeding script has been successfully implemented to automatically populate your Strapi database with 20 sample clothing products on application startup.

## What Was Done

### 1. Created Seeding Script
- **Location**: `src/index.ts` - integrated into the `bootstrap` function
- **Products**: 20 luxury fashion items with complete details
- **Smart Detection**: Checks for existing products to prevent duplicates

### 2. Updated Product Schema
- **Location**: `src/api/product/content-types/product/schema.json`
- **Change**: Made `image` field optional (`required: false`) for flexibility

### 3. Image Import System
- **Automatic Import**: Reads existing images from `public/uploads/` folder
- **Database Registration**: Creates Strapi file entries for each image
- **Smart Assignment**: Randomly assigns 1-3 images per product
- **Handles 21 images**: All product images from your uploads folder are used

### 4. Sample Products Included

All 20 products include:
- **Designer Brands**: Dior Homme, Gucci, Saint Laurent, Givenchy, Burberry, Rick Owens, Balenciaga, Versace, Tom Ford, Off-White, Stone Island, Alexander McQueen, Moncler, and more
- **Complete Details**: Title, color, condition, price, stock, fabric, description, style, size
- **Product Images**: 1-3 randomly assigned images per product from your existing uploads
- **Variety**: Shirts, jackets, jeans, trainers, coats, hoodies, blazers, accessories
- **Price Range**: $120 - $2,500
- **Featured Items**: 10 products marked as featured
- **Published**: All products are auto-published with images attached

## How It Works

### Bootstrap Function
The seeding runs automatically when Strapi starts:

```typescript
async bootstrap({ strapi }: { strapi: Core.Strapi }) {
  await seedProducts(strapi);
}
```

### Image Import & Assignment
The script intelligently handles existing images:

1. **Checks Database**: Looks for uploaded images in Strapi
2. **Imports from Filesystem**: If no images in database, imports from `public/uploads/`
3. **Random Assignment**: Each product gets 1-3 randomly selected images
4. **Smart Filtering**: Excludes thumbnail and variant images (small_, medium_, large_)

### Duplicate Prevention
The script checks if products already exist:
- ✅ **First Run**: Imports images + creates all 20 products with images
- ✅ **Subsequent Runs**: Skips seeding if products exist
- 📝 **Log Output**: Shows which products and images were created

## Viewing the Products

### Option 1: Admin Panel
1. Go to http://localhost:1337/admin
2. Navigate to "Content Manager" → "Product"
3. View all 20 seeded products

### Option 2: API Access
The API endpoint is: `GET /api/products`

**Note**: By default, this requires authentication. To enable public access:

1. Go to Settings → Users & Permissions plugin → Roles
2. Select "Public"
3. Under "Product", check "find" and "findOne"
4. Save

Then you can access:
```bash
curl http://localhost:1337/api/products
```

## Verification

### Server Logs
When starting the server, you'll see:

```
[info] 🌱 Starting product seeding...
[info] 📸 No images in database, importing from uploads folder...
[info] 📦 Found 21 images in uploads folder
[info] 🔄 Importing images into Strapi database...
[info]    ✓ Imported: black cotton dior homme shirt...
[info]    ✓ Imported: blue wool dior homme jacket...
...
[info] ✅ Successfully imported 21 images
[info] 📸 Using 21 images for products
[info] ✓ Created product: Dior Homme Black Cotton Shirt with 1 image(s)
[info] ✓ Created product: Givenchy Black Sweatshirt with 2 image(s)
[info] ✓ Created product: Saint Laurent Denim Jacket with 3 image(s)
...
[info] 🎉 Product seeding completed!
[info]    - Successfully created: 20 products
```

### Database
Products are stored in: `.tmp/data.db` (SQLite)

## Sample Products List

1. Dior Homme Black Cotton Shirt - $850 (Featured)
2. Givenchy Black Sweatshirt - $650 (Featured)
3. Saint Laurent Denim Jacket - $1,200 (Featured)
4. Gucci Blue Cotton Jeans - $750
5. Dior Homme Wool Jacket - $1,800 (Featured)
6. Gucci Leather Trainers - $650
7. John Galliano Linen T-Shirt - $350
8. Rick Owens Polyamide Coat - $2,200 (Featured)
9. Sandro Wool Coat - $950
10. Burberry Orange Cotton Jacket - $1,100 (Featured)
11. Balenciaga Oversized Hoodie - $850
12. Prada Black Leather Loafers - $780
13. Versace Gold Print T-Shirt - $450 (Featured)
14. Tom Ford Navy Blazer - $2,500 (Featured)
15. Off-White Striped Shirt - $520
16. Armani Silk Scarf - $280
17. Stone Island Tech Jacket - $890
18. Alexander McQueen Sneakers - $590 (Featured)
19. Burberry Trench Coat - $1,850 (Featured)
20. Moncler Down Vest - $720

## Resetting the Seed

To re-run the seeding with fresh data:

```bash
# Stop the server
# Delete the database
rm .tmp/data.db

# Restart the server
npm run develop
```

The seeding will automatically run on startup.

## Customization

### Adding More Products
Edit the `sampleProducts` array in `src/index.ts`:

```typescript
const sampleProducts: SeedProduct[] = [
  {
    title: "Your Product",
    color: "Black",
    condition: "New",
    price: 500,
    instock: 10,
    fabric: "Cotton",
    description: "Product description",
    style: "Casual",
    size: "M",
    featured: false,
  },
  // ... more products
];
```

### Disabling Seeding
Comment out the seeding call in the bootstrap function:

```typescript
async bootstrap({ strapi }: { strapi: Core.Strapi }) {
  // await seedProducts(strapi);
}
```

## Next Steps

1. ✅ **Add Images**: Upload product images through the admin panel
2. ✅ **Configure Permissions**: Set up public/authenticated access rules
3. ✅ **Test API**: Verify endpoints work as expected
4. ✅ **Customize Data**: Modify sample products to match your brand

## Technical Details

- **Strapi Version**: 5.32.0
- **Node Version**: 24.6.0
- **Database**: SQLite (development)
- **TypeScript**: Fully typed with proper interfaces
- **Error Handling**: Comprehensive logging for successes and failures
- **Image Handling**: 
  - Automatically imports images from `public/uploads/`
  - Creates proper file entries in Strapi database
  - Randomly assigns 1-3 images per product
  - Uses Strapi's Documents API for seamless integration

## Features

✅ **Automatic Image Import**: Detects and imports existing images from filesystem
✅ **Smart Filtering**: Excludes thumbnail and size variants (small_, medium_, large_)  
✅ **Random Assignment**: Each product gets 1-3 different images
✅ **Duplicate Prevention**: Won't re-seed if products already exist
✅ **Full Logging**: Detailed output for debugging and verification
✅ **Type Safe**: Complete TypeScript types for all operations

---

✨ **Seeding completed successfully!** Your database is now populated with 20 sample products, each with real product images, ready for development and testing.


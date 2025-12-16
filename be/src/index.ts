// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";

// Sample product data for seeding
type ProductSize = "S" | "M" | "L" | "XL";

interface SeedProduct {
  title: string;
  color: string;
  condition: string;
  price: number;
  instock: number;
  fabric: string;
  description: string;
  style: string;
  size: ProductSize;
  featured: boolean;
}

const sampleProducts: SeedProduct[] = [
  {
    title: "Dior Homme Black Cotton Shirt",
    color: "Black",
    condition: "New",
    price: 850,
    instock: 15,
    fabric: "Cotton",
    description: "Elegant black cotton shirt from Dior Homme. Perfect for formal occasions with a modern slim fit design.",
    style: "Formal",
    size: "M" as ProductSize,
    featured: true,
  },
  {
    title: "Givenchy Black Sweatshirt",
    color: "Black",
    condition: "New",
    price: 650,
    instock: 20,
    fabric: "Cotton",
    description: "Comfortable Givenchy knitwear sweatshirt. Features the iconic Givenchy logo on the chest.",
    style: "Casual",
    size: "L",
    featured: true,
  },
  {
    title: "Saint Laurent Denim Jacket",
    color: "Black",
    condition: "Excellent",
    price: 1200,
    instock: 8,
    fabric: "Denim",
    description: "Classic Saint Laurent denim jacket with distressed details. A timeless piece for any wardrobe.",
    style: "Casual",
    size: "M",
    featured: true,
  },
  {
    title: "Gucci Blue Cotton Jeans",
    color: "Blue",
    condition: "New",
    price: 750,
    instock: 25,
    fabric: "Cotton",
    description: "Premium Gucci jeans in classic blue denim. Comfortable fit with signature Gucci detailing.",
    style: "Casual",
    size: "M",
    featured: false,
  },
  {
    title: "Dior Homme Wool Jacket",
    color: "Blue",
    condition: "New",
    price: 1800,
    instock: 5,
    fabric: "Wool",
    description: "Sophisticated blue wool jacket by Dior Homme. Perfect for business and formal events.",
    style: "Formal",
    size: "L",
    featured: true,
  },
  {
    title: "Gucci Leather Trainers",
    color: "Brown",
    condition: "New",
    price: 650,
    instock: 30,
    fabric: "Leather",
    description: "Luxurious brown leather trainers from Gucci. Combines comfort with high-end fashion.",
    style: "Casual",
    size: "M",
    featured: false,
  },
  {
    title: "John Galliano Linen T-Shirt",
    color: "Green",
    condition: "New",
    price: 350,
    instock: 40,
    fabric: "Linen",
    description: "Breathable green linen t-shirt by John Galliano. Perfect for summer wear.",
    style: "Casual",
    size: "S",
    featured: false,
  },
  {
    title: "Rick Owens Polyamide Coat",
    color: "Grey",
    condition: "Excellent",
    price: 2200,
    instock: 3,
    fabric: "Polyamide",
    description: "Avant-garde grey coat from Rick Owens. Features distinctive draping and oversized silhouette.",
    style: "Streetwear",
    size: "L",
    featured: true,
  },
  {
    title: "Sandro Wool Coat",
    color: "Grey",
    condition: "New",
    price: 950,
    instock: 12,
    fabric: "Wool",
    description: "Classic grey wool coat by Sandro. Elegant and warm for the winter season.",
    style: "Formal",
    size: "M",
    featured: false,
  },
  {
    title: "Burberry Orange Cotton Jacket",
    color: "Orange",
    condition: "New",
    price: 1100,
    instock: 10,
    fabric: "Cotton",
    description: "Bold orange cotton jacket from Burberry. Statement piece with classic Burberry craftsmanship.",
    style: "Casual",
    size: "L",
    featured: true,
  },
  {
    title: "Balenciaga Oversized Hoodie",
    color: "White",
    condition: "New",
    price: 850,
    instock: 18,
    fabric: "Cotton",
    description: "Trendy oversized hoodie from Balenciaga. Features bold logo print and relaxed fit.",
    style: "Streetwear",
    size: "XL",
    featured: false,
  },
  {
    title: "Prada Black Leather Loafers",
    color: "Black",
    condition: "New",
    price: 780,
    instock: 22,
    fabric: "Leather",
    description: "Elegant Prada leather loafers. Perfect for both casual and formal settings.",
    style: "Formal",
    size: "M",
    featured: false,
  },
  {
    title: "Versace Gold Print T-Shirt",
    color: "White",
    condition: "New",
    price: 450,
    instock: 35,
    fabric: "Cotton",
    description: "Iconic Versace t-shirt with gold baroque print. Statement piece for any collection.",
    style: "Casual",
    size: "M",
    featured: true,
  },
  {
    title: "Tom Ford Navy Blazer",
    color: "Navy",
    condition: "Excellent",
    price: 2500,
    instock: 4,
    fabric: "Wool",
    description: "Premium Tom Ford blazer in navy blue. Impeccable tailoring and luxurious fabric.",
    style: "Formal",
    size: "L",
    featured: true,
  },
  {
    title: "Off-White Striped Shirt",
    color: "White",
    condition: "New",
    price: 520,
    instock: 16,
    fabric: "Cotton",
    description: "Contemporary striped shirt by Off-White. Features signature diagonal stripes.",
    style: "Streetwear",
    size: "M",
    featured: false,
  },
  {
    title: "Armani Silk Scarf",
    color: "Multi",
    condition: "New",
    price: 280,
    instock: 50,
    fabric: "Silk",
    description: "Luxurious silk scarf from Armani. Beautiful multi-color pattern.",
    style: "Accessory",
    size: "S",
    featured: false,
  },
  {
    title: "Stone Island Tech Jacket",
    color: "Navy",
    condition: "New",
    price: 890,
    instock: 14,
    fabric: "Polyester",
    description: "Technical jacket from Stone Island. Features innovative fabric technology and signature compass patch.",
    style: "Casual",
    size: "L",
    featured: false,
  },
  {
    title: "Alexander McQueen Sneakers",
    color: "White",
    condition: "New",
    price: 590,
    instock: 28,
    fabric: "Leather",
    description: "Iconic oversized Alexander McQueen sneakers. Clean white leather with signature thick sole.",
    style: "Casual",
    size: "M",
    featured: true,
  },
  {
    title: "Burberry Trench Coat",
    color: "Beige",
    condition: "Excellent",
    price: 1850,
    instock: 7,
    fabric: "Cotton",
    description: "Classic Burberry trench coat in signature beige. Timeless British elegance.",
    style: "Formal",
    size: "M",
    featured: true,
  },
  {
    title: "Moncler Down Vest",
    color: "Black",
    condition: "New",
    price: 720,
    instock: 20,
    fabric: "Nylon",
    description: "Warm Moncler down vest. Perfect for layering with iconic Moncler badge.",
    style: "Casual",
    size: "L",
    featured: false,
  },
];

// Import required modules for file operations
import * as fs from "fs";
import * as path from "path";

async function importExistingImages(strapi: Core.Strapi) {
  try {
    const uploadsDir = path.join(__dirname, "..", "..", "public", "uploads");
    
    // Check if uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      strapi.log.warn("⚠️ Uploads directory not found");
      return [];
    }

    // Get all webp files (excluding variants)
    const files = fs.readdirSync(uploadsDir);
    const originalImages = files.filter((file) => {
      return file.endsWith(".webp") &&
             !file.startsWith("thumbnail_") &&
             !file.startsWith("small_") &&
             !file.startsWith("medium_") &&
             !file.startsWith("large_");
    });

    if (originalImages.length === 0) {
      strapi.log.warn("⚠️ No original images found in uploads directory");
      return [];
    }

    strapi.log.info(`📦 Found ${originalImages.length} images in uploads folder`);
    strapi.log.info(`🔄 Importing images into Strapi database...`);

    const importedFiles = [];

    for (const filename of originalImages) {
      try {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        
        // Extract info from filename
        const displayName = filename.replace(".webp", "").replace(/_/g, " ");
        const hash = filename.replace(".webp", "");

        // Create file entry directly in database using entity service
        const fileData = {
          name: displayName,
          alternativeText: displayName,
          caption: null,
          hash: hash,
          ext: ".webp",
          mime: "image/webp",
          size: stats.size / 1024, // Convert to KB
          url: `/uploads/${filename}`,
          provider: "local",
          folderPath: "/",
          width: null,
          height: null,
        };

        // Create file entry using documents API
        const file = await strapi.documents("plugin::upload.file").create({
          data: fileData,
        });

        importedFiles.push(file);
        strapi.log.info(`   ✓ Imported: ${displayName}`);
      } catch (error) {
        strapi.log.warn(`   ⚠️ Could not import ${filename}: ${error.message}`);
      }
    }

    strapi.log.info(`✅ Successfully imported ${importedFiles.length} images`);
    return importedFiles;
  } catch (error) {
    strapi.log.error("❌ Error importing images:", error);
    return [];
  }
}

async function seedProducts(strapi: Core.Strapi) {
  try {
    // Check if products already exist
    const existingProducts = await strapi.documents("api::product.product").findMany({
      limit: 1,
    });

    if (existingProducts && existingProducts.length > 0) {
      strapi.log.info("✅ Products already seeded, skipping...");
      return;
    }

    strapi.log.info("🌱 Starting product seeding...");

    // First, check if images are already in the database
    let uploadedFiles = await strapi.documents("plugin::upload.file").findMany({
      limit: 100,
    });

    // If no images found, try to import from uploads folder
    if (!uploadedFiles || uploadedFiles.length === 0) {
      strapi.log.info("📸 No images in database, importing from uploads folder...");
      const importedImages = await importExistingImages(strapi);
      
      // Fetch again after import
      if (importedImages.length > 0) {
        uploadedFiles = await strapi.documents("plugin::upload.file").findMany({
          limit: 100,
        });
      }
    }

    // Filter to get only original images (exclude thumbnails and variants)
    const originalImages = uploadedFiles ? uploadedFiles.filter((file: any) => {
      const name = file.name || "";
      return !name.startsWith("thumbnail") && 
             !name.startsWith("small") && 
             !name.startsWith("medium") && 
             !name.startsWith("large");
    }) : [];

    if (originalImages.length === 0) {
      strapi.log.warn("⚠️ No images available. Products will be created without images.");
    } else {
      strapi.log.info(`📸 Using ${originalImages.length} images for products`);
    }

    let createdCount = 0;
    let failedCount = 0;

    // Helper function to get random images
    const getRandomImages = (images: any[], min: number = 1, max: number = 3) => {
      if (images.length === 0) return [];
      
      const count = Math.floor(Math.random() * (max - min + 1)) + min;
      const shuffled = [...images].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(count, images.length));
    };

    for (const productData of sampleProducts) {
      try {
        // Get random images for this product (1-3 images)
        const productImages = getRandomImages(originalImages, 1, 3);
        
        // Create product with images using the correct ID format
        const product = await strapi.documents("api::product.product").create({
          data: {
            ...productData,
            image: productImages.length > 0 ? productImages.map((img: any) => img.id) : null,
            publishedAt: new Date(), // Auto-publish the products
          },
        });

        createdCount++;
        const imageInfo = productImages.length > 0 
          ? `with ${productImages.length} image(s)` 
          : "without images";
        strapi.log.info(`✓ Created product: ${productData.title} ${imageInfo}`);
      } catch (error) {
        failedCount++;
        strapi.log.error(`✗ Failed to create product: ${productData.title}`, error.message);
      }
    }

    strapi.log.info(`🎉 Product seeding completed!`);
    strapi.log.info(`   - Successfully created: ${createdCount} products`);
    if (failedCount > 0) {
      strapi.log.warn(`   - Failed to create: ${failedCount} products`);
    }
  } catch (error) {
    strapi.log.error("❌ Error during product seeding:", error);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed products on application startup
    await seedProducts(strapi);
  },
};

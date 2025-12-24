import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import Product from '../models/Product';
import { logger } from '../utils/logger';

// Load environment variables
dotenv.config();

/**
 * Migration Script: Add slugs to existing products
 *
 * This script generates slugs for all products that don't have one yet.
 * It uses the same slug generation logic as the Product model pre-save middleware.
 */

// Helper function to generate slug from title (copied from Product model)
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug for a product
 */
async function generateUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Find a unique slug by checking existing ones
  while (true) {
    const existingProduct = await Product.findOne({
      slug: uniqueSlug,
      ...(excludeId && { _id: { $ne: excludeId } }), // Exclude current document if updating
    });

    if (!existingProduct) {
      break; // Unique slug found
    }

    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
}

/**
 * Migration function
 */
const migrateProductSlugs = async (): Promise<void> => {
  try {
    logger.info('🚀 Starting product slug migration...');

    // Connect to database
    await connectDatabase();
    logger.info('✅ Connected to database');

    // Find all products that don't have a slug or have empty slug
    const productsWithoutSlug = await Product.find({
      $or: [
        { slug: { $exists: false } },
        { slug: '' },
        { slug: null },
      ],
    });

    const totalProducts = productsWithoutSlug.length;
    logger.info(`📊 Found ${totalProducts} products without slugs`);

    if (totalProducts === 0) {
      logger.info('✅ All products already have slugs. Migration complete!');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    // Process each product
    for (let i = 0; i < productsWithoutSlug.length; i++) {
      const product = productsWithoutSlug[i];

      try {
        if (!product.title) {
          logger.warn(`⚠️  Product ${product._id} has no title, skipping...`);
          continue;
        }

        // Generate base slug
        const baseSlug = generateSlug(product.title);

        // Generate unique slug
        const uniqueSlug = await generateUniqueSlug(baseSlug, product._id.toString());

        // Update product with slug
        await Product.findByIdAndUpdate(product._id, { slug: uniqueSlug });

        successCount++;
        logger.info(`✅ [${i + 1}/${totalProducts}] Updated: "${product.title}" → "${uniqueSlug}"`);

      } catch (error: any) {
        errorCount++;
        logger.error(`❌ Failed to update product ${product._id}: ${error.message}`);
      }
    }

    // Summary
    logger.info('='.repeat(60));
    logger.info('📈 MIGRATION SUMMARY');
    logger.info('='.repeat(60));
    logger.info(`Total products processed: ${totalProducts}`);
    logger.info(`Successfully updated: ${successCount}`);
    logger.info(`Errors: ${errorCount}`);
    logger.info('='.repeat(60));

    if (successCount > 0) {
      logger.info('🎉 Migration completed successfully!');
      logger.info(`   ${successCount} products now have SEO-friendly slugs.`);
    }

    if (errorCount > 0) {
      logger.warn(`⚠️  ${errorCount} products failed to update. Check logs above.`);
    }

    logger.info('='.repeat(60));

  } catch (error: any) {
    logger.error('❌ Migration failed:', error.message);
    throw error;
  }
};

// Run the migration
migrateProductSlugs()
  .then(() => {
    logger.info('🏁 Migration script finished');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('💥 Migration script failed:', error.message);
    process.exit(1);
  });


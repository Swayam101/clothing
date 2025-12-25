import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import Product from '../models/Product';
import { logger } from '../utils/logger';

// Load environment variables
dotenv.config();

/**
 * Migration Script: Convert single image strings to arrays
 *
 * This script converts existing products that have a single image string
 * to use the new array format. Products without images are skipped.
 */

const migrateProductImages = async (): Promise<void> => {
  try {
    logger.info('🖼️  Starting product images migration...');

    // Connect to database
    await connectDatabase();
    logger.info('✅ Connected to database');

    // Find all products that have image as string (not array)
    const productsWithStringImages = await Product.find({
      // Find products where image exists and is not an array
      image: { $exists: true },
      $expr: {
        $not: {
          $isArray: '$image'
        }
      }
    });

    const totalProducts = productsWithStringImages.length;
    logger.info(`📊 Found ${totalProducts} products with string images`);

    if (totalProducts === 0) {
      logger.info('✅ All products already have image arrays. Migration complete!');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    // Process each product
    for (let i = 0; i < productsWithStringImages.length; i++) {
      const product = productsWithStringImages[i];

      try {
        // Convert single string image to array
        const imageArray = Array.isArray(product.image)
          ? product.image
          : [product.image];

        // Update product with image array
        await Product.findByIdAndUpdate(product._id, { image: imageArray });

        successCount++;
        logger.info(`✅ [${i + 1}/${totalProducts}] Updated: "${product.title}" - converted to image array`);

      } catch (error: any) {
        errorCount++;
        logger.error(`❌ Failed to update product ${product._id}: ${error.message}`);
      }
    }

    // Summary
    logger.info('='.repeat(60));
    logger.info('🖼️  IMAGES MIGRATION SUMMARY');
    logger.info('='.repeat(60));
    logger.info(`Total products processed: ${totalProducts}`);
    logger.info(`Successfully updated: ${successCount}`);
    logger.info(`Errors: ${errorCount}`);
    logger.info('='.repeat(60));

    if (successCount > 0) {
      logger.info('🎉 Migration completed successfully!');
      logger.info(`   ${successCount} products now have image arrays instead of single strings.`);
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
migrateProductImages()
  .then(() => {
    logger.info('🏁 Images migration script finished');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('💥 Images migration script failed:', error.message);
    process.exit(1);
  });


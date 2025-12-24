import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import User from '../models/User';
import { logger } from '../utils/logger';

// Load environment variables
dotenv.config();

/**
 * Seed Admin User for Firebase Authentication
 * 
 * This script creates an admin user profile that will be linked
 * to a Firebase account on first sign-in (Google or Facebook).
 * 
 * Usage:
 * 1. Run this script: yarn seed:admin
 * 2. Sign in via Firebase (Google/Facebook) using the admin email
 * 3. The Firebase account will be automatically linked with admin privileges
 * 
 * How it works:
 * - Creates user with email and role='admin' (no firebaseUid yet)
 * - When user signs in with Firebase, backend finds user by email
 * - Firebase UID is automatically linked to the existing user
 * - User retains admin role and gets Firebase authentication
 */
const seedAdmin = async () => {
  try {
    logger.info('Starting admin seeding...');

    // Connect to database
    await connectDatabase();

    // Admin email to use
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@clothing.com';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    
    if (existingAdmin) {
      logger.info('Admin user already exists!');
      logger.info('='.repeat(50));
      logger.info(`Email: ${ADMIN_EMAIL}`);
      logger.info(`Role: ${existingAdmin.role}`);
      logger.info(`Name: ${existingAdmin.name || 'Not set'}`);
      logger.info(`Firebase UID: ${existingAdmin.firebaseUid || '(not linked yet)'}`);
      logger.info(`Provider: ${existingAdmin.provider || 'None'}`);
      logger.info('='.repeat(50));
      logger.info('📝 To access admin:');
      logger.info(`   Sign in via Firebase using: ${ADMIN_EMAIL}`);
      logger.info('   Supported: Google, Facebook');
      logger.info('='.repeat(50));
      process.exit(0);
    }

    // Create admin user (without password - OAuth only)
    const admin = await User.create({
      email: ADMIN_EMAIL,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
    });

    logger.info('✅ Admin user profile created successfully!');
    logger.info('='.repeat(50));
    logger.info('🔐 Admin Account Details:');
    logger.info(`   Email: ${ADMIN_EMAIL}`);
    logger.info(`   Role: admin`);
    logger.info(`   Firebase UID: (will be set on first sign-in)`);
    logger.info('='.repeat(50));
    logger.info('📋 Next Steps:');
    logger.info('   1. Set up Firebase Authentication in your frontend');
    logger.info(`   2. Sign in using: ${ADMIN_EMAIL}`);
    logger.info('   3. Choose any provider: Google or Facebook');
    logger.info('   4. Firebase UID will be automatically linked');
    logger.info('   5. You will have admin privileges immediately');
    logger.info('='.repeat(50));
    logger.warn('⚠️  IMPORTANT:');
    logger.warn('   - This app uses Firebase Authentication');
    logger.warn('   - Supports: Google and Facebook sign-in');
    logger.warn('   - No passwords are used or stored');
    logger.warn('   - Admin email must match your Firebase account');
    logger.info('='.repeat(50));
    logger.info('🔥 Firebase Configuration:');
    logger.info('   - Make sure Firebase is initialized on backend');
    logger.info('   - Service account key should be configured');
    logger.info('   - Enable auth providers in Firebase Console');
    logger.info('='.repeat(50));

    process.exit(0);
  } catch (error: any) {
    logger.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

// Run the seeding
seedAdmin();


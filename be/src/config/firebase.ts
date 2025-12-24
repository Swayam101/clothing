import admin from 'firebase-admin';
import path from 'path';
import config from './index';
import { logger } from '../utils/logger';

let firebaseApp: admin.app.App;

/**
 * Initialize Firebase Admin SDK
 * Supports both service account JSON file and individual credentials
 */
export const initializeFirebase = (): admin.app.App => {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    // Option 1: Use service account key file (recommended for production)
    if (config.firebase.serviceAccountPath) {
      const serviceAccountPath = path.resolve(process.cwd(), config.firebase.serviceAccountPath);
      const serviceAccount = require(serviceAccountPath);
      
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: config.firebase.projectId,
      });
      
      logger.info('Firebase Admin initialized with service account');
    } 
    // Option 2: Use individual credentials from environment variables
    else if (config.firebase.projectId && config.firebase.clientEmail && config.firebase.privateKey) {
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: config.firebase.projectId,
          clientEmail: config.firebase.clientEmail,
          privateKey: config.firebase.privateKey.replace(/\\n/g, '\n'),
        }),
      });
      
      logger.info('Firebase Admin initialized with environment credentials');
    } 
    // Option 3: Use default credentials (for Google Cloud environments)
    else {
      firebaseApp = admin.initializeApp();
      logger.info('Firebase Admin initialized with default credentials');
    }

    return firebaseApp;
  } catch (error) {
    logger.error('Failed to initialize Firebase Admin:', error);
    throw new Error('Firebase Admin initialization failed');
  }
};

/**
 * Get Firebase Auth instance
 */
export const getFirebaseAuth = (): admin.auth.Auth => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return admin.auth();
};

/**
 * Verify Firebase ID token
 */
export const verifyFirebaseToken = async (idToken: string): Promise<admin.auth.DecodedIdToken> => {
  try {
    const auth = getFirebaseAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    logger.error('Firebase token verification failed:', error);
    throw new Error('Invalid or expired Firebase token');
  }
};

export default { initializeFirebase, getFirebaseAuth, verifyFirebaseToken };


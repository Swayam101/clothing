import { Router } from 'express';
import { firebaseAuth, getProfile } from '../controllers/auth';
import { authenticate } from '../middleware/auth';
import { validate, firebaseAuthSchema } from '../validations';

const router = Router();

// Firebase authentication (supports Google and Facebook)
router.post('/firebase', validate(firebaseAuthSchema), firebaseAuth);

// Get user profile (protected)
router.get('/profile', authenticate, getProfile);

export default router;


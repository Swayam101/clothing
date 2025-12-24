import { Request, Response } from 'express';
import { authenticateWithFirebase } from '../../services/auth/firebaseAuth';
import { jsonResponse, asyncWrapper } from '../../utils';

/**
 * POST /api/auth/firebase
 * Authenticate user with Firebase ID token
 * Supports Google and Facebook sign-in
 */
const firebaseAuth = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
  const { idToken, displayName, photoURL } = req.body;

  const result = await authenticateWithFirebase(idToken, {
    displayName,
    photoURL,
  });

  const message = result.isNewUser 
    ? 'Account created successfully' 
    : 'Authentication successful';

  jsonResponse(res, 200, true, result, message);
});

export default firebaseAuth;


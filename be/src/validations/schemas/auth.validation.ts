import * as yup from 'yup';

/**
 * Firebase authentication validation schema
 * Supports Google and Facebook sign-in through Firebase
 */
export const firebaseAuthSchema = yup.object({
  idToken: yup
    .string()
    .required('Firebase ID token is required')
    .trim(),
  displayName: yup
    .string()
    .optional()
    .trim(),
  photoURL: yup
    .string()
    .url('Photo URL must be a valid URL')
    .optional()
    .trim(),
});

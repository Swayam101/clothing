import User, { IUserDocument, Provider } from '../models/User';

/**
 * Find user by Firebase UID
 */
export const findUserByFirebaseUid = async (firebaseUid: string): Promise<IUserDocument | null> => {
  return await User.findOne({ firebaseUid });
};

/**
 * Find user by email
 */
export const findUserByEmail = async (email: string): Promise<IUserDocument | null> => {
  return await User.findOne({ email });
};

/**
 * Find user by MongoDB ID
 */
export const findUserById = async (userId: string): Promise<IUserDocument | null> => {
  return await User.findById(userId);
};

/**
 * Create new user
 */
export const createUser = async (userData: {
  firebaseUid: string;
  email: string;
  name?: string;
  phone?: string;
  profilePicture?: string;
  role?: 'user' | 'admin';
  provider?: Provider;
  isActive?: boolean;
}): Promise<IUserDocument> => {
  return await User.create(userData);
};


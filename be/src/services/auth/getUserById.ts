import { IUserDocument } from '../../models/User';
import { findUserById } from '../../dao';

export const getUserById = async (userId: string): Promise<IUserDocument | null> => {
  return await findUserById(userId);
};


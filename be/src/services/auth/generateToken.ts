import jwt from 'jsonwebtoken';
import { IUserDocument } from '../../models/User';
import config from '../../config';

export const generateToken = (user: IUserDocument): string => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as any,
  });
};


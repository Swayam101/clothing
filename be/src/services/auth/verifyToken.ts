import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../../types';
import config from '../../config';

export const verifyToken = (token: string): IJwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret as string) as IJwtPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};


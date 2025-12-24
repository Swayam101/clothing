import { Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth';
import { AuthRequest } from '../types';
import { jsonResponse } from '../utils';

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return jsonResponse(res, 401, false, undefined, 'No token provided');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    jsonResponse(res, 401, false, undefined, error.message || 'Invalid token');
  }
};


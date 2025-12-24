import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { jsonResponse } from '../utils';

/**
 * Middleware to check if the authenticated user has admin role
 * Must be used after authenticate middleware
 */
export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      return jsonResponse(res, 401, false, undefined, 'Authentication required');
    }

    if (req.user.role !== 'admin') {
      return jsonResponse(res, 403, false, undefined, 'Access denied. Admin privileges required.');
    }

    next();
  } catch (error: any) {
    jsonResponse(res, 403, false, undefined, error.message || 'Access denied');
  }
};


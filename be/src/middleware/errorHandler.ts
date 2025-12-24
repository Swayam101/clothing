import { Request, Response, NextFunction } from 'express';
import { jsonResponse } from '../utils';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  jsonResponse(res, statusCode, false, undefined, message);
};


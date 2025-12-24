import { Response } from 'express';
import { ApiResponse } from '../types';

export const jsonResponse = <T = any>(
  res: Response,
  statusCode: number,
  success: boolean,
  data?: T,
  error?: string,
  message?: string
): void => {
  const response: ApiResponse<T> = {
    success,
    ...(message && { message }),
    ...(data && { data }),
    ...(error && { error }),
  };

  res.status(statusCode).json(response);
};


import { Request, Response } from 'express';
import { jsonResponse } from '../utils';

export const notFoundHandler = (req: Request, res: Response): void => {
  jsonResponse(res, 404, false, undefined, `Route ${req.originalUrl} not found`);
};


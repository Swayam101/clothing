import { Router, Request, Response } from 'express';
import { jsonResponse } from '../utils';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  jsonResponse(res, 200, true, {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }, undefined, 'Server is running');
});

export default router;


import { Router } from 'express';
import { cashfreeWebhook } from '../controllers/webhooks';

const router = Router();

// Cashfree webhook endpoint - no authentication required as it comes from Cashfree servers
router.post('/cashfree', cashfreeWebhook);

export default router;


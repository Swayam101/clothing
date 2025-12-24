import { Response } from 'express';
import { AuthRequest, CreateOrderRequest } from '../../types';
import { jsonResponse, asyncWrapper } from '../../utils';
import { cashfreeService } from '../../services/payments/cashfreeService';
import config from '../../config';

const createOrder = asyncWrapper(async (req: AuthRequest, res: Response): Promise<void> => {
  const { amount, orderId, customer }: CreateOrderRequest = req.body;

  // Validate required fields
  if (!amount || !orderId || !customer) {
    return jsonResponse(res, 400, false, undefined, 'Amount, orderId, and customer details are required');
  }

  if (amount <= 0) {
    return jsonResponse(res, 400, false, undefined, 'Amount must be greater than 0');
  }

  // Create order request for Cashfree
  const orderRequest = {
    order_amount: amount,
    order_currency: 'INR',
    order_id: orderId,
    customer_details: {
      customer_id: customer.id,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
    },
    order_meta: {
      return_url: `${config.cashfree?.returnUrl}?order_id=${orderId}`,
    },
  };

  const response = await cashfreeService.createOrder(orderRequest);
  jsonResponse(res, 200, true, response, undefined, 'Order created successfully');
});

export default createOrder;

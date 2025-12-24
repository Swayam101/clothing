import { Cashfree, CFEnvironment } from 'cashfree-pg';
import config from '../../config';

class CashfreeService {
  private cashfree: Cashfree;

  constructor() {
    this.cashfree = new Cashfree(
      config.cashfree?.environment === 'production'
        ? CFEnvironment.PRODUCTION
        : CFEnvironment.SANDBOX,
      config.cashfree?.clientId || '',
      config.cashfree?.clientSecret || ''
    );
  }

  async createOrder(orderRequest: {
    order_amount: number;
    order_currency: string;
    order_id: string;
    customer_details: {
      customer_id: string;
      customer_name: string;
      customer_email: string;
      customer_phone: string;
    };
    order_meta: {
      return_url: string;
    };
  }) {
    try {
      const response = await this.cashfree.PGCreateOrder(orderRequest);
      return response.data;
    } catch (error) {
      console.error('Cashfree create order error:', error);
      throw error;
    }
  }

  async verifyOrder(orderId: string) {
    try {
      const response = await this.cashfree.PGFetchOrder(orderId);
      return response.data;
    } catch (error) {
      console.error('Cashfree verify order error:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const cashfreeService = new CashfreeService();

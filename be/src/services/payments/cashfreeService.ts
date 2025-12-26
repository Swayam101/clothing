/**
 * Cashfree Payment Gateway Service
 * Using official cashfree-pg SDK (v5.1.0)
 * Docs: https://docs.cashfree.com/reference/pg-new-apis-endpoint
 */
import axios, { AxiosInstance } from 'axios';
import config from '../../config';
import { logger } from '../../utils/logger';

class CashfreeService {
  private axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Set base URL based on environment
    this.baseURL = config.cashfree?.environment === 'production'
      ? 'https://api.cashfree.com/pg'
      : 'https://sandbox.cashfree.com/pg';

    // Create axios instance with auth headers
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': config.cashfree?.clientId || '',
        'x-client-secret': config.cashfree?.clientSecret || '',
      },
    });

    logger.info(`Cashfree initialized in ${config.cashfree?.environment || 'sandbox'} mode`);
  }

  /**
   * Create a Cashfree payment order
   * @param orderRequest Order details
   * @returns Order response with payment_session_id
   */
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
    order_meta?: {
      return_url?: string;
      notify_url?: string;
    };
  }) {
    try {
      logger.info(`Creating Cashfree order: ${orderRequest.order_id}`);

      const response = await this.axiosInstance.post('/orders', {
        order_amount: orderRequest.order_amount,
        order_currency: orderRequest.order_currency,
        order_id: orderRequest.order_id,
        customer_details: orderRequest.customer_details,
        order_meta: orderRequest.order_meta || {},
      }, {
        headers: {
          'x-api-version': '2023-08-01',
        },
      });

      logger.info(`Cashfree order created: ${orderRequest.order_id}`);
      console.log(response.data);
      
      return response.data;
    } catch (error: any) {
      logger.error('Cashfree create order error:', error.response?.data || error.message);

      if (error.response?.data) {
        const message = error.response.data.message || 'Failed to create payment order';
        throw new Error(message);
      }

      throw new Error('Failed to create Cashfree order');
    }
  }

  /**
   * Verify/Fetch order details
   * @param orderId Cashfree order ID
   * @returns Order details with payment status
   */
  async verifyOrder(orderId: string) {
    try {
      logger.info(`Verifying Cashfree order: ${orderId}`);

      const response = await this.axiosInstance.get(`/orders/${orderId}`, {
        headers: {
          'x-api-version': '2023-08-01',
        },
      });

      logger.info(`Order status: ${response.data.order_status}`);

      return response.data;
    } catch (error: any) {
      logger.error('Cashfree verify order error:', error.response?.data || error.message);

      if (error.response?.data) {
        const message = error.response.data.message || 'Failed to verify order';
        throw new Error(message);
      }

      throw new Error('Failed to verify order');
    }
  }

  /**
   * Get payment details for an order
   * @param orderId Cashfree order ID
   * @returns Payment details
   */
  async getPaymentDetails(orderId: string) {
    try {
      logger.info(`Fetching payment details: ${orderId}`);

      const response = await this.axiosInstance.get(`/orders/${orderId}/payments`, {
        headers: {
          'x-api-version': '2023-08-01',
        },
      });

      return response.data;
    } catch (error: any) {
      logger.error('Cashfree get payment details error:', error.response?.data || error.message);

      if (error.response?.data) {
        const message = error.response.data.message || 'Failed to fetch payment details';
        throw new Error(message);
      }

      throw new Error('Failed to fetch payment details');
    }
  }
}

// Export singleton instance
export const cashfreeService = new CashfreeService();

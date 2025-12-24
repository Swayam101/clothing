import mongoose, { Schema, Document } from 'mongoose';

export interface OrderItem {
  product: mongoose.Types.ObjectId;
  title: string; // Store product title at time of order
  color: string;
  size: string;
  fabric: string;
  quantity: number;
  price: number; // Price per unit at time of order
  image: string;
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IOrderDocument extends Document {
  orderId: string; // Unique order identifier (e.g., "ORD_123456")
  user: mongoose.Types.ObjectId; // Reference to user who placed the order

  // Order items
  items: OrderItem[];
  totalAmount: number;
  currency: string;

  // Customer information (stored for order history)
  customer: {
    name: string;
    email: string;
    phone: string;
  };

  // Shipping and billing addresses
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;

  // Payment information
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  cashfreeOrderId?: string; // Cashfree order ID if using Cashfree
  paymentSessionId?: string; // Cashfree payment session ID

  // Order status
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  trackingNumber?: string;
  shippingCarrier?: string;

  // Notes
  customerNotes?: string;
  adminNotes?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  title: { type: String },
  color: { type: String },
  size: { type: String },
  fabric: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  image: { type: String },
}, { _id: false });

const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String },
}, { _id: false });

const orderSchema = new Schema<IOrderDocument>(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // Order items
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'INR',
    },

    // Customer information
    customer: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },

    // Addresses
    shippingAddress: addressSchema,
    billingAddress: addressSchema,

    // Payment information
    paymentMethod: {
      type: String,
      enum: ['cashfree', 'card', 'upi', 'netbanking', 'wallet'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    cashfreeOrderId: String,
    paymentSessionId: String,

    // Order status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      default: 'pending',
    },
    trackingNumber: String,
    shippingCarrier: String,

    // Notes
    customerNotes: String,
    adminNotes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

// Pre-save middleware to generate orderId if not provided
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
  next();
});

const Order = mongoose.model<IOrderDocument>('Order', orderSchema);

export default Order;

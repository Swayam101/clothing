import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDocument extends Document {
  title: string;
  slug: string; // URL-friendly identifier generated from title
  color: string;
  condition: string;
  price: number;
  instock: number;
  fabric: string;
  description: string;
  style: string;
  size: string;
  featured?: boolean | null;
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

const productSchema = new Schema<IProductDocument>(
  {
    title: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    color: {
      type: String,
    },
    condition: {
      type: String,
    },
    price: {
      type: Number,
    },
    instock: {
      type: Number,
      default: 0,
    },
    fabric: {
      type: String,
    },
    description: {
      type: String,
    },
    style: {
      type: String,
    },
    size: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate unique slug
productSchema.pre('save', async function(next) {
  const product = this as IProductDocument;

  // Only generate slug if title is modified or slug is empty
  if (!product.isModified('title') && product.slug) {
    return next();
  }

  if (!product.title) {
    return next();
  }

  const baseSlug = generateSlug(product.title);
  let uniqueSlug = baseSlug;
  let counter = 1;

  // Find a unique slug by checking existing ones
  while (true) {
    const existingProduct = await Product.findOne({
      slug: uniqueSlug,
      _id: { $ne: product._id } // Exclude current document if updating
    });

    if (!existingProduct) {
      break; // Unique slug found
    }

    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  product.slug = uniqueSlug;
  next();
});

// Indexes for better query performance
productSchema.index({ title: 1, style: 1 });
productSchema.index({ style: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ featured: 1 });

const Product = mongoose.model<IProductDocument>('Product', productSchema);

export default Product;

import mongoose, { Schema, Document } from 'mongoose';

export type Provider = 'google.com' | 'facebook';

export interface IUserDocument extends Document {
  firebaseUid: string; // Firebase UID (unique identifier)
  email: string;
  name?: string;
  phone?: string;
  profilePicture?: string;
  role: 'user' | 'admin';
  isActive: boolean;
  
  // OAuth provider information (managed by Firebase)
  provider?: Provider; // google or facebook
  
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    firebaseUid: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    
    // OAuth provider information (managed by Firebase)
    provider: {
      type: String,
      enum: ['google.com', 'facebook'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;


import mongoose, { Schema, Model } from 'mongoose';
import { Admin } from '@/types';

const AdminSchema = new Schema<Admin>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['super_admin'],
      default: 'super_admin',
    },
  },
  {
    timestamps: true,
  }
);

const AdminModel: Model<Admin> = mongoose.models.Admin || mongoose.model<Admin>('Admin', AdminSchema);

export default AdminModel;

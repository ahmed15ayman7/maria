import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  isApproved: boolean; // الحقل الجديد
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: Boolean,
    default: false, // بشكل افتراضي، الحسابات غير معتمدة
  },
});

// Create and export the User model
const User = mongoose.models?.User || mongoose.model('User', userSchema);
export default User;

// models/Ad.ts
import { Schema, model, models } from 'mongoose';

// Define the schema for ads
const adSchema = new Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  redirectUrl: {
    type: String,
    required: [true, 'Redirect URL is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model if it doesn't exist
const Ad = models.Ad || model('Ad', adSchema);

export default Ad;

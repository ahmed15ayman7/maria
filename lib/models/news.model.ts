import mongoose, { Schema, Document, model } from 'mongoose';

// Define a TypeScript interface for the news document
export interface INews extends Document {
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  imageUrl?: string;
}

// Create a Mongoose schema
const NewsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Create a Mongoose model using the schema and TypeScript interface
const News = mongoose.models.News || model<INews>('News', NewsSchema);

export default News;

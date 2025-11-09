import mongoose, { Schema, Model } from 'mongoose';
import { NewsArticle } from '@/types';

const NewsArticleSchema = new Schema<NewsArticle>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ['finance', 'automobiles', 'tech', 'cinema'],
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    author: {
      name: String,
      email: String,
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
NewsArticleSchema.index({ category: 1, published: 1, createdAt: -1 });
NewsArticleSchema.index({ slug: 1 });

const NewsArticleModel: Model<NewsArticle> = 
  mongoose.models.NewsArticle || mongoose.model<NewsArticle>('NewsArticle', NewsArticleSchema);

export default NewsArticleModel;

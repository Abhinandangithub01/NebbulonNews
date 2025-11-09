import { v4 as uuidv4 } from 'uuid';
import dynamoDB, { TABLES } from '../dynamodb';
import { NewsArticle, NewsCategory } from '@/types';

export const ArticleDB = {
  // Create new article
  create: async (data: Omit<NewsArticle, '_id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<NewsArticle> => {
    const now = new Date().toISOString();
    const article: NewsArticle = {
      _id: uuidv4(),
      ...data,
      views: 0,
      createdAt: now as any,
      updatedAt: now as any,
    };

    await dynamoDB.put(TABLES.NEWS_ARTICLES, article);
    return article;
  },

  // Get article by ID
  getById: async (id: string): Promise<NewsArticle | null> => {
    const article = await dynamoDB.get(TABLES.NEWS_ARTICLES, { _id: id });
    return article as NewsArticle | null;
  },

  // Get article by slug
  getBySlug: async (slug: string): Promise<NewsArticle | null> => {
    const items = await dynamoDB.scan(TABLES.NEWS_ARTICLES, {
      FilterExpression: 'slug = :slug AND published = :published',
      ExpressionAttributeValues: {
        ':slug': slug,
        ':published': true,
      },
    });
    return items[0] as NewsArticle | null;
  },

  // Get all articles (with optional filters)
  getAll: async (filters?: {
    category?: NewsCategory;
    published?: boolean;
    limit?: number;
  }): Promise<NewsArticle[]> => {
    let items: any[];

    if (filters?.category) {
      // Query by category (requires GSI)
      items = await dynamoDB.scan(TABLES.NEWS_ARTICLES, {
        FilterExpression: filters.published !== undefined
          ? 'category = :category AND published = :published'
          : 'category = :category',
        ExpressionAttributeValues: filters.published !== undefined
          ? {
              ':category': filters.category,
              ':published': filters.published,
            }
          : {
              ':category': filters.category,
            },
      });
    } else if (filters?.published !== undefined) {
      items = await dynamoDB.scan(TABLES.NEWS_ARTICLES, {
        FilterExpression: 'published = :published',
        ExpressionAttributeValues: {
          ':published': filters.published,
        },
      });
    } else {
      items = await dynamoDB.scan(TABLES.NEWS_ARTICLES);
    }

    // Sort by createdAt descending
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply limit
    if (filters?.limit) {
      items = items.slice(0, filters.limit);
    }

    return items as NewsArticle[];
  },

  // Update article
  update: async (id: string, updates: Partial<NewsArticle>): Promise<NewsArticle | null> => {
    const updatedArticle = await dynamoDB.update(
      TABLES.NEWS_ARTICLES,
      { _id: id },
      {
        ...updates,
        updatedAt: new Date().toISOString(),
      }
    );
    return updatedArticle as NewsArticle | null;
  },

  // Delete article
  delete: async (id: string): Promise<void> => {
    await dynamoDB.delete(TABLES.NEWS_ARTICLES, { _id: id });
  },

  // Increment views
  incrementViews: async (id: string): Promise<void> => {
    const article = await ArticleDB.getById(id);
    if (article) {
      await dynamoDB.update(TABLES.NEWS_ARTICLES, { _id: id }, {
        views: (article.views || 0) + 1,
      });
    }
  },

  // Get statistics
  getStats: async (): Promise<{
    totalArticles: number;
    publishedArticles: number;
    totalViews: number;
  }> => {
    const allArticles = await dynamoDB.scan(TABLES.NEWS_ARTICLES);
    
    const totalArticles = allArticles.length;
    const publishedArticles = allArticles.filter((a: any) => a.published).length;
    const totalViews = allArticles.reduce((sum: number, a: any) => sum + (a.views || 0), 0);

    return {
      totalArticles,
      publishedArticles,
      totalViews,
    };
  },
};

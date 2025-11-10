// API client for Lambda functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.nebbulon.com';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Article APIs
  async getArticles(params?: { category?: string; limit?: number; lastKey?: string }) {
    const queryParams = new URLSearchParams(params as any).toString();
    return this.request(`/api/articles${queryParams ? `?${queryParams}` : ''}`);
  }

  async getArticleBySlug(slug: string) {
    return this.request(`/api/articles/${slug}`);
  }

  async searchArticles(query: string, category?: string) {
    const params = new URLSearchParams({ q: query });
    if (category) params.append('category', category);
    return this.request(`/api/articles/search?${params.toString()}`);
  }

  async getTrendingArticles(limit: number = 10, days: number = 7) {
    return this.request(`/api/articles/trending?limit=${limit}&days=${days}`);
  }

  // Image APIs
  async uploadImage(imageData: string, fileName: string, contentType: string) {
    return this.request('/api/images/upload', {
      method: 'POST',
      body: JSON.stringify({ image: imageData, fileName, contentType }),
    });
  }

  // Newsletter APIs
  async subscribeNewsletter(email: string) {
    return this.request('/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Comment APIs
  async addComment(data: {
    articleId: string;
    content: string;
    author: string;
    email: string;
    parentId?: string;
  }) {
    return this.request('/api/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getComments(articleId: string) {
    return this.request(`/api/comments/${articleId}`);
  }

  // Analytics APIs
  async trackView(data: {
    articleId: string;
    sessionId: string;
    referrer?: string;
    userAgent?: string;
  }) {
    return this.request('/api/analytics/track', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();
export default api;

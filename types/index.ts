export type NewsCategory = 'finance' | 'automobiles' | 'tech' | 'cinema';

export interface NewsArticle {
  _id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    email: string;
  };
  tags?: string[];
  published: boolean;
  featured?: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'super_admin';
  createdAt: Date;
}

export interface AdPlacement {
  id: string;
  position: 'sidebar-top' | 'sidebar-middle' | 'in-content' | 'below-header';
  enabled: boolean;
}

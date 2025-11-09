import {
  Container,
  Grid,
  Title,
  Stack,
  Text,
} from '@mantine/core';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import AdSense from '@/components/AdSense';
import { NewsCategory, NewsArticle } from '@/types';

const validCategories: NewsCategory[] = ['finance', 'automobiles', 'tech', 'cinema'];

const categoryTitles: Record<NewsCategory, string> = {
  finance: 'Finance News',
  automobiles: 'Automobile News',
  tech: 'Technology News',
  cinema: 'Cinema News',
};

const mockArticles: Record<NewsCategory, NewsArticle[]> = {
  finance: [
    {
      _id: '2',
      title: 'Stock Market Hits Record High as Tech Sector Rallies',
      slug: 'stock-market-record-high',
      category: 'finance',
      excerpt: 'Major indices reach all-time highs driven by strong earnings.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200',
      author: { name: 'Michael Chen', email: 'michael@nebbulon.com' },
      views: 2100,
      published: true,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '5',
      title: 'Federal Reserve Signals Potential Interest Rate Cuts',
      slug: 'fed-interest-rate-cuts',
      category: 'finance',
      excerpt: 'Fed Chair hints at policy shift as inflation cools.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200',
      author: 'David Thompson',
      views: 1600,
      published: true,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  automobiles: [
    {
      _id: '1',
      title: 'Tesla Unveils Revolutionary Electric Sedan with 600-Mile Range',
      slug: 'tesla-revolutionary-electric-sedan',
      category: 'automobiles',
      excerpt: 'Tesla announces groundbreaking battery technology.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200',
      author: { name: 'Sarah Johnson', email: 'sarah@nebbulon.com' },
      views: 1250,
      published: true,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '7',
      title: 'Luxury SUV Market Sees Surge in Hybrid Models',
      slug: 'luxury-suv-hybrid-surge',
      category: 'automobiles',
      excerpt: 'Premium automakers report record demand for hybrids.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200',
      author: { name: 'Robert Anderson', email: 'robert@nebbulon.com' },
      views: 980,
      published: true,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  tech: [
    {
      _id: '3',
      title: 'AI Breakthrough: New Model Achieves Human-Level Reasoning',
      slug: 'ai-breakthrough-human-reasoning',
      category: 'tech',
      excerpt: 'Researchers unveil AI with unprecedented capabilities.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      author: { name: 'Dr. Emily Rodriguez', email: 'emily@nebbulon.com' },
      views: 3500,
      published: true,
      featured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '6',
      title: 'Quantum Computing Startup Achieves Error Correction Milestone',
      slug: 'quantum-computing-milestone',
      category: 'tech',
      excerpt: 'Major breakthrough brings quantum computers closer.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
      author: { name: 'Dr. Lisa Wang', email: 'lisa@nebbulon.com' },
      views: 2200,
      published: true,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  cinema: [
    {
      _id: '4',
      title: 'Box Office: Epic Fantasy Film Breaks Opening Weekend Records',
      slug: 'fantasy-film-box-office-records',
      category: 'cinema',
      excerpt: 'New fantasy blockbuster shatters expectations.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200',
      author: { name: 'James Martinez', email: 'james@nebbulon.com' },
      views: 1800,
      published: true,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '8',
      title: 'Streaming Wars: New Platform Launches with Exclusive Content',
      slug: 'streaming-platform-launch',
      category: 'cinema',
      excerpt: 'Major studio launches streaming service.',
      content: '<p>Content...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200',
      author: { name: 'Amanda Foster', email: 'amanda@nebbulon.com' },
      views: 1400,
      published: true,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category as NewsCategory;
  
  if (!validCategories.includes(category)) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryTitles[category]} | Nebbulon News`,
    description: `Latest ${categoryTitles[category].toLowerCase()} and updates`,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category as NewsCategory;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const articles = mockArticles[category] || [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Container size="xl" py="xl" style={{ flex: 1 }}>
        <Grid gutter="xl">
          {/* Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              <Title order={1}>{categoryTitles[category]}</Title>

              {articles.length > 0 ? (
                <Grid>
                  {articles.map((article) => (
                    <Grid.Col key={article._id} span={{ base: 12, sm: 6 }}>
                      <NewsCard article={article} />
                    </Grid.Col>
                  ))}
                </Grid>
              ) : (
                <Stack align="center" py="xl">
                  <Text size="xl" c="dimmed">
                    No articles in this category yet.
                  </Text>
                </Stack>
              )}
            </Stack>
          </Grid.Col>

          {/* Sidebar with Ads */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xl" style={{ position: 'sticky', top: '80px' }}>
              <AdSense adSlot="5555555555" />
              <AdSense adSlot="6666666666" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

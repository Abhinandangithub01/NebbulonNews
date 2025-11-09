'use client';

import {
  Container,
  Grid,
  Title,
  Stack,
  Text,
  Group,
  Button,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import AdSense from '@/components/AdSense';
import { NewsArticle } from '@/types';

// Mock data for demo
const mockArticles: NewsArticle[] = [
  {
    _id: '1',
    title: 'Tesla Unveils Revolutionary Electric Sedan with 600-Mile Range',
    slug: 'tesla-revolutionary-electric-sedan',
    category: 'automobiles',
    excerpt: 'Tesla announces groundbreaking battery technology that could change the EV industry forever.',
    content: '<p>Tesla has unveiled its latest electric sedan...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200',
    author: { name: 'Sarah Johnson', email: 'sarah@nebbulon.com' },
    views: 1250,
    published: true,
    featured: true,
    createdAt: new Date('2024-11-09'),
    updatedAt: new Date('2024-11-09'),
  },
  {
    _id: '2',
    title: 'Stock Market Hits Record High as Tech Sector Rallies',
    slug: 'stock-market-record-high',
    category: 'finance',
    excerpt: 'Major indices reach all-time highs driven by strong earnings from technology companies.',
    content: '<p>The S&P 500 and Nasdaq Composite...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200',
    author: { name: 'Michael Chen', email: 'michael@nebbulon.com' },
    views: 2100,
    published: true,
    featured: true,
    createdAt: new Date('2024-11-09'),
    updatedAt: new Date('2024-11-09'),
  },
  {
    _id: '3',
    title: 'AI Breakthrough: New Model Achieves Human-Level Reasoning',
    slug: 'ai-breakthrough-human-reasoning',
    category: 'tech',
    excerpt: 'Researchers unveil AI system that demonstrates unprecedented problem-solving capabilities.',
    content: '<p>A team of researchers has developed...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
    author: { name: 'Dr. Emily Rodriguez', email: 'emily@nebbulon.com' },
    views: 3500,
    published: true,
    featured: true,
    createdAt: new Date('2024-11-09'),
    updatedAt: new Date('2024-11-09'),
  },
  {
    _id: '4',
    title: 'Box Office: Epic Fantasy Film Breaks Opening Weekend Records',
    slug: 'fantasy-film-box-office-records',
    category: 'cinema',
    excerpt: 'New fantasy blockbuster shatters expectations with $235M global opening weekend.',
    content: '<p>The highly anticipated fantasy epic...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=1200',
    author: { name: 'James Martinez', email: 'james@nebbulon.com' },
    views: 1800,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-11-08'),
  },
  {
    _id: '5',
    title: 'Federal Reserve Signals Potential Interest Rate Cuts',
    slug: 'fed-interest-rate-cuts',
    category: 'finance',
    excerpt: 'Fed Chair hints at policy shift as inflation shows signs of cooling.',
    content: '<p>Federal Reserve Chair Jerome Powell...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200',
    author: { name: 'David Thompson', email: 'david@nebbulon.com' },
    views: 1600,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-11-08'),
  },
  {
    _id: '6',
    title: 'Quantum Computing Startup Achieves Error Correction Milestone',
    slug: 'quantum-computing-milestone',
    category: 'tech',
    excerpt: 'Major breakthrough in quantum error correction brings practical quantum computers closer.',
    content: '<p>A Silicon Valley startup has demonstrated...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200',
    author: { name: 'Dr. Lisa Wang', email: 'lisa@nebbulon.com' },
    views: 2200,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-11-08'),
  },
  {
    _id: '7',
    title: 'Luxury SUV Market Sees Surge in Hybrid Models',
    slug: 'luxury-suv-hybrid-surge',
    category: 'automobiles',
    excerpt: 'Premium automakers report record demand for hybrid luxury SUVs.',
    content: '<p>Luxury automakers are reporting...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200',
    author: { name: 'Robert Anderson', email: 'robert@nebbulon.com' },
    views: 980,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-07'),
    updatedAt: new Date('2024-11-07'),
  },
  {
    _id: '8',
    title: 'Streaming Wars: New Platform Launches with Exclusive Content',
    slug: 'streaming-platform-launch',
    category: 'cinema',
    excerpt: 'Major studio launches streaming service with library of classic films.',
    content: '<p>A major Hollywood studio has entered...</p>',
    featuredImage: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200',
    author: { name: 'Amanda Foster', email: 'amanda@nebbulon.com' },
    views: 1400,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-07'),
    updatedAt: new Date('2024-11-07'),
  },
];

export default function HomePage() {
  const latestNews = mockArticles;
  const financeNews = mockArticles.filter(a => a.category === 'finance');
  const autoNews = mockArticles.filter(a => a.category === 'automobiles');
  const techNews = mockArticles.filter(a => a.category === 'tech');
  const cinemaNews = mockArticles.filter(a => a.category === 'cinema');

  const featuredArticle = latestNews[0];
  const recentArticles = latestNews.slice(1, 5);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container size="xl" py="xl" style={{ flex: 1 }}>
        <Grid gutter="xl">
          {/* Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              {/* Featured Article */}
              {featuredArticle && (
                <div>
                  <Title order={2} mb="md">
                    Featured Story
                  </Title>
                  <NewsCard article={featuredArticle} featured />
                </div>
              )}

              {/* Latest News */}
              <div>
                <Group justify="space-between" mb="md">
                  <Title order={2}>Latest News</Title>
                </Group>
                <Grid>
                  {recentArticles.map((article) => (
                    <Grid.Col key={article._id} span={{ base: 12, sm: 6 }}>
                      <NewsCard article={article} />
                    </Grid.Col>
                  ))}
                </Grid>
              </div>

              {/* Finance Section */}
              {financeNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="md">
                    <Title order={2}>Finance</Title>
                    <Link href="/category/finance" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid>
                    {financeNews.map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}

              {/* Automobiles Section */}
              {autoNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="md">
                    <Title order={2}>Automobiles</Title>
                    <Link href="/category/automobiles" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid>
                    {autoNews.map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}

              {/* Tech Section */}
              {techNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="md">
                    <Title order={2}>Technology</Title>
                    <Link href="/category/tech" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid>
                    {techNews.map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}

              {/* Cinema Section */}
              {cinemaNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="md">
                    <Title order={2}>Cinema</Title>
                    <Link href="/category/cinema" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid>
                    {cinemaNews.map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}

              {latestNews.length === 0 && (
                <Stack align="center" py="xl">
                  <Text size="xl" c="dimmed">
                    No news articles yet. Check back soon!
                  </Text>
                </Stack>
              )}
            </Stack>
          </Grid.Col>

          {/* Sidebar with Ads */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xl" style={{ position: 'sticky', top: '80px' }}>
              {/* Top Sidebar Ad */}
              <AdSense adSlot="1234567890" />
              
              {/* Middle Sidebar Ad */}
              <AdSense adSlot="0987654321" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

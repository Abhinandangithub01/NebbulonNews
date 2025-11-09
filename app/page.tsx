'use client';

import {
  Container,
  Grid,
  Title,
  Stack,
  Text,
  Group,
  Button,
  Paper,
  NavLink,
  Box,
  Flex,
} from '@mantine/core';
import { IconArrowRight, IconChartLine, IconCar, IconDeviceLaptop, IconMovie } from '@tabler/icons-react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import AdSense from '@/components/AdSense';
import AdSenseDisplay from '@/components/AdSenseDisplay';
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

  const categories = [
    { name: 'Finance', icon: IconChartLine, href: '/category/finance', color: 'blue' },
    { name: 'Automobiles', icon: IconCar, href: '/category/automobiles', color: 'red' },
    { name: 'Tech', icon: IconDeviceLaptop, href: '/category/tech', color: 'cyan' },
    { name: 'Cinema', icon: IconMovie, href: '/category/cinema', color: 'grape' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container size="xl" py="md" style={{ flex: 1 }}>
        <Flex gap="lg">
          {/* Left Sidebar Navigation - Hidden on mobile */}
          <Box 
            className="left-sidebar"
            style={{ 
              width: '240px', 
              flexShrink: 0
            }}
          >
            <Paper p="lg" withBorder style={{ position: 'sticky', top: '100px', backgroundColor: '#25262B' }}>
              <Title order={4} mb="md" c="white">Categories</Title>
              <Stack gap="xs">
                {categories.map((cat) => (
                  <NavLink
                    key={cat.name}
                    component={Link}
                    href={cat.href}
                    label={cat.name}
                    leftSection={<cat.icon size={20} />}
                    variant="light"
                    style={{ borderRadius: '8px', padding: '12px' }}
                  />
                ))}
              </Stack>
            </Paper>
          </Box>

          {/* Main Content */}
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Stack gap="md">
              {/* Featured Article */}
              {featuredArticle && (
                <div>
                  <Title order={3} mb="sm">
                    Featured Story
                  </Title>
                  <NewsCard article={featuredArticle} featured />
                </div>
              )}

              {/* Latest News - Compact Grid */}
              <div>
                <Title order={3} mb="sm">Latest News</Title>
                <Grid gutter="sm">
                  {recentArticles.map((article) => (
                    <Grid.Col key={article._id} span={{ base: 12, sm: 6, lg: 3 }}>
                      <NewsCard article={article} />
                    </Grid.Col>
                  ))}
                </Grid>
              </div>

              {/* Google AdSense Ad */}
              <div style={{ margin: '1rem 0' }}>
                <AdSenseDisplay adSlot="7470621474" />
              </div>

              {/* Finance Section - Compact */}
              {financeNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="sm">
                    <Title order={3}>Finance</Title>
                    <Link href="/category/finance" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" size="sm" rightSection={<IconArrowRight size={14} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="sm">
                    {financeNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, lg: 3 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}

              {/* Automobiles Section - Compact */}
              {autoNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="sm">
                    <Title order={3}>Automobiles</Title>
                    <Link href="/category/automobiles" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" size="sm" rightSection={<IconArrowRight size={14} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="sm">
                    {autoNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, lg: 3 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}

              {/* Tech Section - Compact */}
              {techNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="sm">
                    <Title order={3}>Technology</Title>
                    <Link href="/category/tech" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" size="sm" rightSection={<IconArrowRight size={14} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="sm">
                    {techNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, lg: 3 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}

              {/* Cinema Section - Compact */}
              {cinemaNews.length > 0 && (
                <div>
                  <Group justify="space-between" mb="sm">
                    <Title order={3}>Cinema</Title>
                    <Link href="/category/cinema" style={{ textDecoration: 'none' }}>
                      <Button variant="subtle" size="sm" rightSection={<IconArrowRight size={14} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="sm">
                    {cinemaNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, lg: 3 }}>
                        <NewsCard article={article} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </div>
              )}
            </Stack>
          </Box>

          {/* Right Sidebar with Ads */}
          <Box 
            className="right-sidebar"
            style={{ 
              width: '320px', 
              flexShrink: 0
            }}
          >
            <Stack gap="lg" style={{ position: 'sticky', top: '100px' }}>
              {/* Google AdSense - Right Sidebar Top */}
              <Paper p="md" withBorder style={{ backgroundColor: '#25262B', minHeight: '250px' }}>
                <AdSenseDisplay adSlot="1111111111" />
              </Paper>
              
              {/* Google AdSense - Right Sidebar Middle */}
              <Paper p="md" withBorder style={{ backgroundColor: '#25262B', minHeight: '250px' }}>
                <AdSenseDisplay adSlot="4444444444" />
              </Paper>
            </Stack>
          </Box>
        </Flex>
      </Container>

      <Footer />
    </div>
  );
}

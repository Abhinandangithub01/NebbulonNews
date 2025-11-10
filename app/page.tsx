'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Title,
  Stack,
  Text,
  Group,
  Button,
  Paper,
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
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1A1B1E' }}>
      {/* Fixed Left Sidebar - Full Height */}
      <Box
        className="left-sidebar"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '260px',
          height: '100vh',
          backgroundColor: '#141517',
          borderRight: '1px solid #2C2E33',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100
        }}
      >
        {/* Logo */}
        <Box p="xl" style={{ borderBottom: '1px solid #2C2E33' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text
              size="24px"
              fw={700}
              c="white"
              style={{ letterSpacing: '1px' }}
            >
              NEBBULON
            </Text>
          </Link>
        </Box>

        {/* Categories */}
        <Box p="lg" style={{ flex: 1, overflowY: 'auto' }}>
          <Text size="xs" tt="uppercase" fw={700} c="dimmed" mb="md" style={{ letterSpacing: '1px' }}>
            Categories
          </Text>
          <Stack gap="xs">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} style={{ textDecoration: 'none' }}>
                <Box
                  p="md"
                  style={{
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    border: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1F2023';
                    e.currentTarget.style.borderColor = '#373A40';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <Group gap="sm">
                    <cat.icon size={20} color="#5C7CFA" stroke={1.5} />
                    <Text size="sm" fw={500} c="white">{cat.name}</Text>
                  </Group>
                </Box>
              </Link>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <Box
          style={{
            backgroundColor: '#1A1B1E',
            borderBottom: '1px solid #2C2E33',
            padding: '20px 40px',
            position: 'sticky',
            top: 0,
            zIndex: 50
          }}
        >
          <Text size="lg" fw={600} c="white">Discover News</Text>
        </Box>

        {/* Content Container */}
        <Container size="xl" py="xl" style={{ flex: 1 }}>
          <Box style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <Stack gap="xl">
              {/* Featured Article */}
              {featuredArticle && (
                <Box>
                  <Title order={2} mb="lg" c="white" fw={600}>
                    Featured Story
                  </Title>
                  <Box style={{ height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
                    <NewsCard article={featuredArticle} featured />
                  </Box>
                </Box>
              )}

              {/* Latest News - Fixed Size Cards */}
              <Box>
                <Title order={2} mb="lg" c="white" fw={600}>Latest News</Title>
                <Grid gutter="lg">
                  {recentArticles.map((article) => (
                    <Grid.Col key={article._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                      <Box style={{ height: '320px' }}>
                        <NewsCard article={article} />
                      </Box>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>

              {/* Google AdSense Ad */}
              <Box style={{ padding: '40px', backgroundColor: '#1F2023', borderRadius: '12px', border: '1px solid #2C2E33' }}>
                <AdSenseDisplay adSlot="7470621474" />
              </Box>

              {/* Finance Section */}
              {financeNews.length > 0 && (
                <Box>
                  <Group justify="space-between" mb="lg">
                    <Title order={2} c="white" fw={600}>Finance</Title>
                    <Link href="/category/finance" style={{ textDecoration: 'none' }}>
                      <Button variant="light" size="sm" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="lg">
                    {financeNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                        <Box style={{ height: '320px' }}>
                          <NewsCard article={article} />
                        </Box>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Automobiles Section */}
              {autoNews.length > 0 && (
                <Box>
                  <Group justify="space-between" mb="lg">
                    <Title order={2} c="white" fw={600}>Automobiles</Title>
                    <Link href="/category/automobiles" style={{ textDecoration: 'none' }}>
                      <Button variant="light" size="sm" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="lg">
                    {autoNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                        <Box style={{ height: '320px' }}>
                          <NewsCard article={article} />
                        </Box>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Tech Section */}
              {techNews.length > 0 && (
                <Box>
                  <Group justify="space-between" mb="lg">
                    <Title order={2} c="white" fw={600}>Technology</Title>
                    <Link href="/category/tech" style={{ textDecoration: 'none' }}>
                      <Button variant="light" size="sm" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="lg">
                    {techNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                        <Box style={{ height: '320px' }}>
                          <NewsCard article={article} />
                        </Box>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Cinema Section */}
              {cinemaNews.length > 0 && (
                <Box>
                  <Group justify="space-between" mb="lg">
                    <Title order={2} c="white" fw={600}>Cinema</Title>
                    <Link href="/category/cinema" style={{ textDecoration: 'none' }}>
                      <Button variant="light" size="sm" rightSection={<IconArrowRight size={16} />}>
                        View All
                      </Button>
                    </Link>
                  </Group>
                  <Grid gutter="lg">
                    {cinemaNews.slice(0, 4).map((article) => (
                      <Grid.Col key={article._id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                        <Box style={{ height: '320px' }}>
                          <NewsCard article={article} />
                        </Box>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Box>
              )}
            </Stack>
          </Box>
        </Container>

        {/* Footer */}
        <Box style={{ backgroundColor: '#141517', borderTop: '1px solid #2C2E33', padding: '40px' }}>
          <Container size="xl">
            <Text size="sm" c="dimmed" ta="center">
              © 2024 Nebbulon News. All rights reserved.
            </Text>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

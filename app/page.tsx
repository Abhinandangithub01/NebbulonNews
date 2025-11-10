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
  Burger,
  Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
  const [opened, { open, close }] = useDisclosure(false);
  
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
    <div style={{ minHeight: '100vh', backgroundColor: '#202124' }}>
      {/* Top Header Bar */}
      <Box
        style={{
          backgroundColor: '#292A2D',
          borderBottom: '1px solid #3C4043',
          padding: '12px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <Group justify="space-between">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text size="20px" fw={500} c="white">Nebbulon News</Text>
          </Link>
          <Burger opened={opened} onClick={open} hiddenFrom="sm" color="white" size="sm" />
        </Group>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title={<Text size="lg" fw={600} c="white">Menu</Text>}
        styles={{
          header: { backgroundColor: '#292A2D', borderBottom: '1px solid #3C4043' },
          body: { backgroundColor: '#202124', padding: 0 },
          title: { color: 'white' }
        }}
      >
        <Stack gap="xs" p="md">
          <Link href="/" style={{ textDecoration: 'none' }} onClick={close}>
            <Paper p="md" style={{ backgroundColor: '#292A2D', borderRadius: '8px', cursor: 'pointer' }}>
              <Text size="md" c="white">Home</Text>
            </Paper>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} style={{ textDecoration: 'none' }} onClick={close}>
              <Paper p="md" style={{ backgroundColor: '#292A2D', borderRadius: '8px', cursor: 'pointer' }}>
                <Group gap="sm">
                  <cat.icon size={20} color="#8AB4F8" />
                  <Text size="md" c="white">{cat.name}</Text>
                </Group>
              </Paper>
            </Link>
          ))}
        </Stack>
      </Drawer>

      {/* Category Navigation - Desktop Only */}
      <Box
        visibleFrom="sm"
        style={{
          backgroundColor: '#292A2D',
          borderBottom: '1px solid #3C4043',
          padding: '0 24px',
          position: 'sticky',
          top: '48px',
          zIndex: 99
        }}
      >
        <Group gap="lg">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              p="sm"
              style={{
                borderBottom: '3px solid #8AB4F8',
                cursor: 'pointer'
              }}
            >
              <Text size="sm" fw={500} c="#8AB4F8">Home</Text>
            </Box>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} style={{ textDecoration: 'none' }}>
              <Box
                p="sm"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottom = '3px solid #5F6368';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottom = '3px solid transparent';
                }}
              >
                <Text size="sm" fw={400} c="#E8EAED">{cat.name}</Text>
              </Box>
            </Link>
          ))}
        </Group>
      </Box>

      {/* Main Content */}
      <Container size="xl" py="lg">
        <Grid gutter="lg">
          {/* Left Column - Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* Your Briefing */}
            <Box mb="xl">
              <Title order={2} c="white" fw={400} mb="xs">Your briefing</Title>
              <Text size="sm" c="#9AA0A6">Monday 10 November</Text>
            </Box>
            {/* Top Stories Section */}
            <Box mb="xl">
              <Group justify="space-between" mb="md">
                <Text size="lg" fw={500} c="white">Top stories</Text>
                <Text size="sm" c="#8AB4F8" style={{ cursor: 'pointer' }}>→</Text>
              </Group>
              
              <Grid gutter="md">
                {/* Main Featured Story */}
                <Grid.Col span={6}>
                  <Link href={`/news/${featuredArticle.slug}`} style={{ textDecoration: 'none' }}>
                    <Paper
                      p="md"
                      style={{
                        backgroundColor: '#292A2D',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        height: '100%',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3C4043'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#292A2D'}
                    >
                      <Box
                        style={{
                          width: '100%',
                          height: '200px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          marginBottom: '12px',
                          backgroundColor: '#3C4043'
                        }}
                      >
                        {featuredArticle.image && (
                          <img
                            src={featuredArticle.image}
                            alt={featuredArticle.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )}
                      </Box>
                      <Text size="xs" c="#9AA0A6" mb="xs">{featuredArticle.category.toUpperCase()}</Text>
                      <Text size="md" fw={500} c="white" mb="xs">{featuredArticle.title}</Text>
                      <Text size="xs" c="#9AA0A6">1 hour ago</Text>
                    </Paper>
                  </Link>
                </Grid.Col>

                {/* Side Stories */}
                <Grid.Col span={6}>
                  <Stack gap="xs">
                    {recentArticles.slice(0, 3).map((article) => (
                      <Link key={article._id} href={`/news/${article.slug}`} style={{ textDecoration: 'none' }}>
                        <Paper
                          p="sm"
                          style={{
                            backgroundColor: '#292A2D',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3C4043'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#292A2D'}
                        >
                          <Text size="xs" c="#9AA0A6" mb="4px">{article.category.toUpperCase()}</Text>
                          <Text size="sm" fw={400} c="white" lineClamp={2}>{article.title}</Text>
                          <Text size="xs" c="#9AA0A6" mt="4px">2 hours ago</Text>
                        </Paper>
                      </Link>
                    ))}
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>

            {/* Local News Section */}
            <Box mb="xl">
              <Group justify="space-between" mb="md">
                <Text size="lg" fw={500} c="white">Latest News</Text>
                <Text size="sm" c="#8AB4F8" style={{ cursor: 'pointer' }}>→</Text>
              </Group>
              
              <Stack gap="xs">
                {recentArticles.slice(0, 4).map((article) => (
                  <Link key={article._id} href={`/news/${article.slug}`} style={{ textDecoration: 'none' }}>
                    <Paper
                      p="md"
                      style={{
                        backgroundColor: '#292A2D',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3C4043'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#292A2D'}
                    >
                      <Group gap="md" align="flex-start">
                        <Box style={{ flex: 1 }}>
                          <Text size="xs" c="#9AA0A6" mb="4px">{article.category.toUpperCase()}</Text>
                          <Text size="sm" fw={400} c="white" mb="xs">{article.title}</Text>
                          <Text size="xs" c="#9AA0A6">{article.excerpt}</Text>
                          <Text size="xs" c="#9AA0A6" mt="xs">5 hours ago</Text>
                        </Box>
                        {article.image && (
                          <Box
                            style={{
                              width: '100px',
                              height: '100px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              flexShrink: 0,
                              backgroundColor: '#3C4043'
                            }}
                          >
                            <img
                              src={article.image}
                              alt={article.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Box>
                        )}
                      </Group>
                    </Paper>
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Finance Section */}
            {financeNews.length > 0 && (
              <Box mb="xl">
                <Group justify="space-between" mb="md">
                  <Text size="lg" fw={500} c="white">Finance</Text>
                  <Link href="/category/finance" style={{ textDecoration: 'none' }}>
                    <Text size="sm" c="#8AB4F8" style={{ cursor: 'pointer' }}>View all →</Text>
                  </Link>
                </Group>
                
                <Grid gutter="md">
                  {financeNews.slice(0, 3).map((article) => (
                    <Grid.Col key={article._id} span={4}>
                      <Link href={`/news/${article.slug}`} style={{ textDecoration: 'none' }}>
                        <Paper
                          p="md"
                          style={{
                            backgroundColor: '#292A2D',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            height: '100%',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3C4043'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#292A2D'}
                        >
                          {article.image && (
                            <Box
                              style={{
                                width: '100%',
                                height: '120px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                marginBottom: '12px',
                                backgroundColor: '#3C4043'
                              }}
                            >
                              <img
                                src={article.image}
                                alt={article.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </Box>
                          )}
                          <Text size="xs" c="#9AA0A6" mb="4px">FINANCE</Text>
                          <Text size="sm" fw={400} c="white" lineClamp={2}>{article.title}</Text>
                          <Text size="xs" c="#9AA0A6" mt="xs">1 day ago</Text>
                        </Paper>
                      </Link>
                    </Grid.Col>
                  ))}
                </Grid>
              </Box>
            )}

          </Grid.Col>

          {/* Right Column - Picks for You & Ads */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            {/* Picks for You */}
            <Box mb="xl">
              <Group justify="space-between" mb="md">
                <Text size="lg" fw={500} c="white">Picks for you</Text>
              </Group>
              
              <Stack gap="xs">
                {[...autoNews, ...techNews, ...cinemaNews].slice(0, 5).map((article) => (
                  <Link key={article._id} href={`/news/${article.slug}`} style={{ textDecoration: 'none' }}>
                    <Paper
                      p="sm"
                      style={{
                        backgroundColor: '#292A2D',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3C4043'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#292A2D'}
                    >
                      <Group gap="sm" align="flex-start">
                        <Box style={{ flex: 1 }}>
                          <Text size="xs" c="#9AA0A6" mb="4px">{article.category.toUpperCase()}</Text>
                          <Text size="sm" fw={400} c="white" lineClamp={2}>{article.title}</Text>
                          <Text size="xs" c="#9AA0A6" mt="4px">23 hours ago</Text>
                        </Box>
                        {article.image && (
                          <Box
                            style={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              flexShrink: 0,
                              backgroundColor: '#3C4043'
                            }}
                          >
                            <img
                              src={article.image}
                              alt={article.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Box>
                        )}
                      </Group>
                    </Paper>
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Ad Section */}
            <Box>
              <Text size="xs" c="#9AA0A6" mb="md">SPONSORED</Text>
              <Paper
                p="md"
                style={{
                  backgroundColor: '#292A2D',
                  borderRadius: '8px',
                  minHeight: '300px',
                  border: '1px solid #3C4043'
                }}
              >
                <AdSenseDisplay adSlot="7470621474" />
              </Paper>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Footer */}
      <Box style={{ backgroundColor: '#292A2D', borderTop: '1px solid #3C4043', padding: '40px', marginTop: '60px' }}>
        <Container size="xl">
          <Text size="sm" c="#9AA0A6" ta="center">
            © 2024 Nebbulon News. All rights reserved.
          </Text>
        </Container>
      </Box>
    </div>
  );
}

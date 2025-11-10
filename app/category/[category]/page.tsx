'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Title,
  Stack,
  Text,
  Box,
  Group,
  Paper,
} from '@mantine/core';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSenseDisplay from '@/components/AdSenseDisplay';
import { NewsCategory, NewsArticle } from '@/types';
import { IconChartLine, IconCar, IconDeviceLaptop, IconMovie } from '@tabler/icons-react';

const validCategories: NewsCategory[] = ['finance', 'automobiles', 'tech', 'cinema'];

const categoryTitles: Record<NewsCategory, string> = {
  finance: 'Finance',
  automobiles: 'Automobiles',
  tech: 'Technology',
  cinema: 'Cinema',
};

const categories = [
  { name: 'Finance', value: 'finance', icon: IconChartLine },
  { name: 'Automobiles', value: 'automobiles', icon: IconCar },
  { name: 'Tech', value: 'tech', icon: IconDeviceLaptop },
  { name: 'Cinema', value: 'cinema', icon: IconMovie },
];

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
      author: { name: 'David Thompson', email: 'david@nebbulon.com' },
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

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const category = params.category as NewsCategory;

  if (!mounted) {
    return null;
  }

  if (!validCategories.includes(category)) {
    notFound();
  }

  const articles = mockArticles[category] || [];

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
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Text size="20px" fw={500} c="white">Nebbulon News</Text>
        </Link>
      </Box>

      {/* Category Navigation */}
      <Box
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
            <Box p="sm" style={{ cursor: 'pointer' }}>
              <Text size="sm" fw={400} c="#E8EAED">Home</Text>
            </Box>
          </Link>
          {categories.map((cat) => (
            <Link key={cat.value} href={`/category/${cat.value}`} style={{ textDecoration: 'none' }}>
              <Box
                p="sm"
                style={{
                  borderBottom: cat.value === category ? '3px solid #8AB4F8' : '3px solid transparent',
                  cursor: 'pointer'
                }}
              >
                <Text size="sm" fw={cat.value === category ? 500 : 400} c={cat.value === category ? '#8AB4F8' : '#E8EAED'}>
                  {cat.name}
                </Text>
              </Box>
            </Link>
          ))}
        </Group>
      </Box>

      {/* Breadcrumb */}
      <Box style={{ backgroundColor: '#202124', padding: '16px 24px', borderBottom: '1px solid #3C4043' }}>
        <Container size="xl">
          <Group gap="xs">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Text size="sm" c="#8AB4F8">Home</Text>
            </Link>
            <Text size="sm" c="#9AA0A6">/</Text>
            <Text size="sm" c="#E8EAED">{categoryTitles[category]}</Text>
          </Group>
        </Container>
      </Box>

      <Container size="xl" py="lg">
        <Grid gutter="lg">
          {/* Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Box mb="xl">
              <Title order={1} c="white" fw={400} mb="lg">{categoryTitles[category]}</Title>
              
              {articles.length > 0 ? (
                <Stack gap="xs">
                  {articles.map((article) => (
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
                            <Text size="xs" c="#9AA0A6" mb="4px">{category.toUpperCase()}</Text>
                            <Text size="md" fw={400} c="white" mb="xs">{article.title}</Text>
                            <Text size="sm" c="#9AA0A6" lineClamp={2}>{article.excerpt}</Text>
                            <Group gap="lg" mt="xs">
                              <Text size="xs" c="#9AA0A6">{article.author.name}</Text>
                              <Text size="xs" c="#9AA0A6">{article.views} views</Text>
                            </Group>
                          </Box>
                          {article.featuredImage && (
                            <Box
                              style={{
                                width: '160px',
                                height: '120px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                backgroundColor: '#3C4043'
                              }}
                            >
                              <img
                                src={article.featuredImage}
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
              ) : (
                <Paper p="xl" style={{ backgroundColor: '#292A2D', borderRadius: '8px', textAlign: 'center' }}>
                  <Text size="lg" c="#9AA0A6">
                    No articles in this category yet.
                  </Text>
                </Paper>
              )}
            </Box>
          </Grid.Col>

          {/* Right Sidebar - Ads */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box style={{ position: 'sticky', top: '120px' }}>
              <Text size="xs" c="#9AA0A6" mb="md">SPONSORED</Text>
              <Stack gap="lg">
                <Paper
                  p="md"
                  style={{
                    backgroundColor: '#292A2D',
                    borderRadius: '8px',
                    minHeight: '300px',
                    border: '1px solid #3C4043'
                  }}
                >
                  <AdSenseDisplay adSlot="5555555555" />
                </Paper>
                
                <Paper
                  p="md"
                  style={{
                    backgroundColor: '#292A2D',
                    borderRadius: '8px',
                    minHeight: '300px',
                    border: '1px solid #3C4043'
                  }}
                >
                  <AdSenseDisplay adSlot="6666666666" />
                </Paper>
              </Stack>
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

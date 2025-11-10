'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Title,
  Text,
  Box,
  Group,
  Stack,
  Paper,
  Divider,
} from '@mantine/core';
import { IconClock, IconEye, IconBook } from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSenseDisplay from '@/components/AdSenseDisplay';
import ShareButtons from '@/components/ShareButtons';
import Breadcrumbs from '@/components/Breadcrumbs';
import OptimizedImage from '@/components/OptimizedImage';
import CommentSection from '@/components/CommentSection';
import ReadingProgress from '@/components/ReadingProgress';
import { NewsArticle } from '@/types';

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Mock articles data
const mockArticles: NewsArticle[] = [
  {
    _id: '1',
    title: 'Tesla Unveils Revolutionary Electric Sedan with 600-Mile Range',
    slug: 'tesla-revolutionary-electric-sedan',
    category: 'automobiles',
    excerpt: 'Tesla announces groundbreaking battery technology that could change the EV industry forever.',
    content: '<p>Tesla has unveiled its latest innovation in electric vehicle technology, introducing a revolutionary new sedan that boasts an unprecedented 600-mile range on a single charge. This breakthrough represents a significant leap forward in addressing one of the primary concerns of potential EV buyers: range anxiety.</p><p>The new vehicle, which CEO Elon Musk described as "the future of sustainable transportation," incorporates cutting-edge battery technology developed over the past three years. The advanced lithium-ion cells feature improved energy density and faster charging capabilities, allowing drivers to add 200 miles of range in just 15 minutes.</p><p>Industry analysts suggest this development could accelerate the transition away from traditional combustion engines, as the extended range makes electric vehicles more practical for long-distance travel and reduces the need for frequent charging stops.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=600&fit=crop',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop',
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
    excerpt: 'Major indices reach all-time highs driven by strong tech earnings.',
    content: '<p>The stock market reached unprecedented heights today as major technology companies reported better-than-expected quarterly earnings, driving investor confidence to new levels.</p><p>The S&P 500 closed at a record high, with the tech-heavy Nasdaq Composite leading the charge with a 2.5% gain. Major players including Apple, Microsoft, and Google parent Alphabet all posted strong results, beating analyst expectations.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    author: { name: 'Michael Chen', email: 'michael@nebbulon.com' },
    views: 3160,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-08'),
    updatedAt: new Date('2024-11-08'),
  },
];

const relatedArticles: NewsArticle[] = [
  {
    _id: '3',
    title: 'AI Breakthrough: New System Achieves Human-Level Reasoning',
    slug: 'ai-breakthrough-human-reasoning',
    category: 'tech',
    excerpt: 'Researchers unveil AI system with unprecedented reasoning capabilities.',
    content: '',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    author: { name: 'Dr. Emily Rodriguez', email: 'emily@nebbulon.com' },
    views: 3550,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-07'),
    updatedAt: new Date('2024-11-07'),
  },
  {
    _id: '4',
    title: 'Box Office: Epic Fantasy Film Breaks Opening Weekend Records',
    slug: 'box-office-fantasy-film-records',
    category: 'cinema',
    excerpt: 'New fantasy blockbuster shatters expectations with $200M opening.',
    content: '',
    image: 'https://images.unsplash.com/photo-1574267432644-f610a5ab1b8c?w=400&h=300&fit=crop',
    author: { name: 'James Martinez', email: 'james@nebbulon.com' },
    views: 1800,
    published: true,
    featured: false,
    createdAt: new Date('2024-11-06'),
    updatedAt: new Date('2024-11-06'),
  },
];

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const article = mockArticles.find(a => a.slug === params.slug);

  if (!mounted) {
    return null;
  }

  if (!article) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#202124' }}>
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
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

      {/* Breadcrumb */}
      <Box style={{ backgroundColor: '#202124', padding: '16px 24px', borderBottom: '1px solid #3C4043' }}>
        <Container size="xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: article.category, href: `/category/${article.category}` },
              { label: article.title }
            ]}
          />
        </Container>
      </Box>

      <Container size="xl" py="lg">
        <Grid gutter="lg">
          {/* Main Article Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p="xl" style={{ backgroundColor: '#292A2D', borderRadius: '8px' }}>
              <Stack gap="lg">
                {/* Category */}
                <Text size="xs" c="#8AB4F8" tt="uppercase" fw={600}>
                  {article.category}
                </Text>

                {/* Title */}
                <Title order={1} c="white" fw={400} size="36px">
                  {article.title}
                </Title>

                {/* Meta Information */}
                <Group gap="lg" wrap="wrap">
                  <Group gap="xs">
                    <IconClock size={16} color="#9AA0A6" />
                    <Text size="sm" c="#9AA0A6">
                      {new Date(article.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconEye size={16} color="#9AA0A6" />
                    <Text size="sm" c="#9AA0A6">
                      {article.views} views
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconBook size={16} color="#9AA0A6" />
                    <Text size="sm" c="#9AA0A6">
                      {calculateReadingTime(article.content)} min read
                    </Text>
                  </Group>
                </Group>

                {/* Share Buttons */}
                <ShareButtons url={`/news/${article.slug}`} title={article.title} />

                <Divider color="#3C4043" />

                {/* Featured Image */}
                {article.featuredImage && (
                  <OptimizedImage
                    src={article.featuredImage}
                    alt={article.title}
                    width={1200}
                    height={600}
                    priority
                    style={{
                      width: '100%',
                      height: '400px',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  />
                )}

                {/* Excerpt */}
                <Text size="lg" c="#E8EAED" style={{ fontStyle: 'italic', lineHeight: 1.6 }}>
                  {article.excerpt}
                </Text>

                <Divider color="#3C4043" />

                {/* Article Content */}
                <Box
                  style={{ color: '#E8EAED', lineHeight: 1.8, fontSize: '16px' }}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Author Info */}
                <Paper p="md" style={{ backgroundColor: '#3C4043', borderRadius: '8px' }}>
                  <Text size="sm" c="#9AA0A6" mb="xs">Written by</Text>
                  <Text size="md" c="white" fw={500}>{article.author.name}</Text>
                </Paper>

                {/* In-Content Ad */}
                <Paper p="md" style={{ backgroundColor: '#3C4043', borderRadius: '8px', minHeight: '200px' }}>
                  <AdSenseDisplay adSlot="7470621474" />
                </Paper>
              </Stack>
            </Paper>

            {/* Related Articles */}
            <Box mt="xl">
              <Text size="lg" fw={500} c="white" mb="md">More stories</Text>
              <Stack gap="xs">
                {relatedArticles.map((related) => (
                  <Link key={related._id} href={`/news/${related.slug}`} style={{ textDecoration: 'none' }}>
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
                          <Text size="xs" c="#9AA0A6" mb="4px">{related.category.toUpperCase()}</Text>
                          <Text size="sm" fw={400} c="white" lineClamp={2}>{related.title}</Text>
                          <Text size="xs" c="#9AA0A6" mt="xs">1 day ago</Text>
                        </Box>
                        {related.image && (
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
                              src={related.image}
                              alt={related.title}
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
          </Grid.Col>

          {/* Right Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box style={{ position: 'sticky', top: '80px' }}>
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
                  <AdSenseDisplay adSlot="1111111111" />
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
                  <AdSenseDisplay adSlot="4444444444" />
                </Paper>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Comments Section */}
      <Container size="xl" py="xl">
        <CommentSection articleId={article._id} />
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

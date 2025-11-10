'use client';

import { Paper, Stack, Text, Group, Box } from '@mantine/core';
import { IconTrendingUp, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import { NewsArticle } from '@/types';

interface TrendingWidgetProps {
  articles: NewsArticle[];
}

export default function TrendingWidget({ articles }: TrendingWidgetProps) {
  // Sort by views and take top 5
  const trending = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  return (
    <Paper p="md" style={{ backgroundColor: '#292A2D', borderRadius: '8px', border: '1px solid #3C4043' }}>
      <Group gap="xs" mb="md">
        <IconTrendingUp size={20} color="#8AB4F8" />
        <Text size="md" fw={500} c="white">Trending Now</Text>
      </Group>
      
      <Stack gap="xs">
        {trending.map((article, index) => (
          <Link key={article._id} href={`/news/${article.slug}`} style={{ textDecoration: 'none' }}>
            <Box
              p="sm"
              style={{
                backgroundColor: '#3C4043',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5F6368'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3C4043'}
            >
              <Group gap="xs" mb="4px">
                <Text size="lg" fw={700} c="#8AB4F8" style={{ minWidth: '20px' }}>
                  {index + 1}
                </Text>
                <Text size="sm" c="white" lineClamp={2} style={{ flex: 1 }}>
                  {article.title}
                </Text>
              </Group>
              <Group gap="xs" ml="28px">
                <IconEye size={12} color="#9AA0A6" />
                <Text size="xs" c="#9AA0A6">{article.views} views</Text>
              </Group>
            </Box>
          </Link>
        ))}
      </Stack>
    </Paper>
  );
}

'use client';

import { Card, Image, Text, Badge, Group, Stack } from '@mantine/core';
import { IconEye, IconClock } from '@tabler/icons-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NewsArticle } from '@/types';

dayjs.extend(relativeTime);

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const categoryColors: Record<string, string> = {
  finance: 'green',
  automobiles: 'orange',
  tech: 'blue',
  cinema: 'pink',
};

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  return (
    <Link
      href={`/news/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          },
        }}
      >
        <Card.Section>
          <Image
            src={article.featuredImage}
            height={featured ? 400 : 200}
            alt={article.title}
            fallbackSrc="https://placehold.co/600x400/1a1b1e/ffffff?text=News+Image"
          />
        </Card.Section>

        <Stack gap="sm" mt="md">
          <Group justify="space-between">
            <Badge color={categoryColors[article.category]} variant="light">
              {article.category.toUpperCase()}
            </Badge>
            <Group gap="xs">
              <IconEye size={16} />
              <Text size="xs" c="dimmed">
                {article.views}
              </Text>
            </Group>
          </Group>

          <Text fw={600} size={featured ? 'xl' : 'lg'} lineClamp={2}>
            {article.title}
          </Text>

          <Text size="sm" c="dimmed" lineClamp={featured ? 3 : 2}>
            {article.excerpt}
          </Text>

          <Group justify="space-between" mt="auto">
            <Text size="xs" c="dimmed">
              By {article.author.name}
            </Text>
            <Group gap="xs">
              <IconClock size={14} />
              <Text size="xs" c="dimmed">
                {dayjs(article.createdAt).fromNow()}
              </Text>
            </Group>
          </Group>
        </Stack>
      </Card>
    </Link>
  );
}

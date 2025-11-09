import {
  Container,
  Grid,
  Title,
  Text,
  Image,
  Badge,
  Group,
  Stack,
  Paper,
} from '@mantine/core';
import { IconEye, IconClock, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSense from '@/components/AdSense';
import { ArticleDB } from '@/lib/db/articles';
import { NewsArticle } from '@/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const categoryColors: Record<string, string> = {
  finance: 'green',
  automobiles: 'orange',
  tech: 'blue',
  cinema: 'pink',
};

async function getArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const article = await ArticleDB.getBySlug(slug);
    
    if (!article) return null;
    
    // Increment view count
    await ArticleDB.incrementViews(article._id);
    
    return article;
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Nebbulon News`,
    description: article.excerpt,
    keywords: article.tags?.join(', ') || article.category,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Container size="xl" py="xl" style={{ flex: 1 }}>
        <Grid gutter="xl">
          {/* Article Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              {/* Category Badge */}
              <Badge
                color={categoryColors[article.category]}
                variant="light"
                size="lg"
                style={{ width: 'fit-content' }}
              >
                {article.category.toUpperCase()}
              </Badge>

              {/* Title */}
              <Title order={1} size="h1">
                {article.title}
              </Title>

              {/* Meta Information */}
              <Group gap="xl">
                <Group gap="xs">
                  <IconUser size={18} />
                  <Text size="sm" c="dimmed">
                    {article.author.name}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconClock size={18} />
                  <Text size="sm" c="dimmed">
                    {dayjs(article.createdAt).format('MMMM D, YYYY')}
                  </Text>
                </Group>
                <Group gap="xs">
                  <IconEye size={18} />
                  <Text size="sm" c="dimmed">
                    {article.views} views
                  </Text>
                </Group>
              </Group>

              {/* Featured Image */}
              <Image
                src={article.featuredImage}
                alt={article.title}
                radius="md"
                fallbackSrc="https://placehold.co/1200x600/1a1b1e/ffffff?text=News+Image"
              />

              {/* Excerpt */}
              <Text size="lg" fw={500} c="dimmed" style={{ fontStyle: 'italic' }}>
                {article.excerpt}
              </Text>

              {/* In-Content Ad */}
              <AdSense adSlot="1111111111" adFormat="horizontal" />

              {/* Article Content */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* In-Content Ad (Bottom) */}
              <AdSense adSlot="2222222222" adFormat="horizontal" />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <Paper p="md" withBorder>
                  <Group gap="xs">
                    <Text size="sm" fw={600}>
                      Tags:
                    </Text>
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Paper>
              )}
            </Stack>
          </Grid.Col>

          {/* Sidebar with Ads */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xl" style={{ position: 'sticky', top: '80px' }}>
              {/* Top Sidebar Ad */}
              <AdSense adSlot="3333333333" />

              {/* Middle Sidebar Ad */}
              <AdSense adSlot="4444444444" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

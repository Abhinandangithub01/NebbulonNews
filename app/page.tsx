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
import { ArticleDB } from '@/lib/db/articles';
import { NewsCategory } from '@/types';

async function getLatestNews() {
  const articles = await ArticleDB.getAll({ published: true, limit: 10 });
  return articles;
}

async function getCategoryNews(category: NewsCategory, limit = 4) {
  const articles = await ArticleDB.getAll({ category, published: true, limit });
  return articles;
}

export default async function HomePage() {
  const latestNews = await getLatestNews();
  const financeNews = await getCategoryNews('finance');
  const autoNews = await getCategoryNews('automobiles');
  const techNews = await getCategoryNews('tech');
  const cinemaNews = await getCategoryNews('cinema');

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

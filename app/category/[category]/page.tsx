import {
  Container,
  Grid,
  Title,
  Stack,
  Text,
} from '@mantine/core';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import AdSense from '@/components/AdSense';
import { ArticleDB } from '@/lib/db/articles';
import { NewsCategory } from '@/types';

const validCategories: NewsCategory[] = ['finance', 'automobiles', 'tech', 'cinema'];

const categoryTitles: Record<NewsCategory, string> = {
  finance: 'Finance News',
  automobiles: 'Automobile News',
  tech: 'Technology News',
  cinema: 'Cinema News',
};

async function getCategoryArticles(category: NewsCategory) {
  const articles = await ArticleDB.getAll({ category, published: true, limit: 20 });
  return articles;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category as NewsCategory;
  
  if (!validCategories.includes(category)) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${categoryTitles[category]} | Nebbulon News`,
    description: `Latest ${categoryTitles[category].toLowerCase()} and updates`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category as NewsCategory;

  if (!validCategories.includes(category)) {
    notFound();
  }

  const articles = await getCategoryArticles(category);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <Container size="xl" py="xl" style={{ flex: 1 }}>
        <Grid gutter="xl">
          {/* Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              <Title order={1}>{categoryTitles[category]}</Title>

              {articles.length > 0 ? (
                <Grid>
                  {articles.map((article) => (
                    <Grid.Col key={article._id} span={{ base: 12, sm: 6 }}>
                      <NewsCard article={article} />
                    </Grid.Col>
                  ))}
                </Grid>
              ) : (
                <Stack align="center" py="xl">
                  <Text size="xl" c="dimmed">
                    No articles in this category yet.
                  </Text>
                </Stack>
              )}
            </Stack>
          </Grid.Col>

          {/* Sidebar with Ads */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="xl" style={{ position: 'sticky', top: '80px' }}>
              <AdSense adSlot="5555555555" />
              <AdSense adSlot="6666666666" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

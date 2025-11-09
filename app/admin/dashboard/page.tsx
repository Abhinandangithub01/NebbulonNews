'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Grid,
  Paper,
  Text,
  Stack,
  Group,
  Button,
  Table,
  Badge,
  ActionIcon,
} from '@mantine/core';
import {
  IconNews,
  IconEye,
  IconEdit,
  IconTrash,
  IconPlus,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalViews: 0,
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentArticles(data.recentArticles);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A1B1E' }}>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Title order={1}>Admin Dashboard</Title>
              <Text c="dimmed">Welcome back, {session?.user?.name}</Text>
            </div>
            <Group>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button variant="subtle">View Site</Button>
              </Link>
              <Button variant="outline" color="red" onClick={() => signOut()}>
                Logout
              </Button>
            </Group>
          </Group>

          {/* Stats */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper p="md" withBorder>
                <Group>
                  <IconNews size={32} />
                  <div>
                    <Text size="xl" fw={700}>
                      {stats.totalArticles}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Total Articles
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper p="md" withBorder>
                <Group>
                  <IconNews size={32} color="green" />
                  <div>
                    <Text size="xl" fw={700}>
                      {stats.publishedArticles}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Published
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Paper p="md" withBorder>
                <Group>
                  <IconEye size={32} color="blue" />
                  <div>
                    <Text size="xl" fw={700}>
                      {stats.totalViews}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Total Views
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>

          {/* Actions */}
          <Group>
            <Link href="/admin/news/create" style={{ textDecoration: 'none' }}>
              <Button leftSection={<IconPlus size={18} />}>
                Create New Article
              </Button>
            </Link>
          </Group>

          {/* Recent Articles */}
          <Paper p="md" withBorder>
            <Title order={3} mb="md">
              Recent Articles
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Views</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recentArticles.map((article) => (
                  <Table.Tr key={article._id}>
                    <Table.Td>{article.title}</Table.Td>
                    <Table.Td>
                      <Badge variant="light">{article.category}</Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={article.published ? 'green' : 'gray'}>
                        {article.published ? 'Published' : 'Draft'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{article.views}</Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Link
                          href={`/admin/news/edit/${article._id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <ActionIcon variant="subtle">
                            <IconEdit size={18} />
                          </ActionIcon>
                        </Link>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => handleDelete(article._id)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
}

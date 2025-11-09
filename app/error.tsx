'use client';

import { useEffect } from 'react';
import { Container, Title, Text, Button, Stack, Paper } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <Container size="sm" py="xl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper p="xl" radius="md" withBorder style={{ width: '100%' }}>
        <Stack align="center" gap="md">
          <IconAlertTriangle size={64} color="red" />
          <Title order={2}>Something went wrong!</Title>
          <Text c="dimmed" ta="center">
            We're having trouble loading the page. This might be because:
          </Text>
          <Stack gap="xs" style={{ width: '100%' }}>
            <Text size="sm">• The database is empty (no articles yet)</Text>
            <Text size="sm">• AWS services are not configured</Text>
            <Text size="sm">• Network connectivity issues</Text>
          </Stack>
          
          {error.digest && (
            <Text size="xs" c="dimmed">
              Error ID: {error.digest}
            </Text>
          )}

          <Stack gap="sm" style={{ width: '100%' }}>
            <Button onClick={reset} fullWidth>
              Try Again
            </Button>
            <Link href="/admin/login" style={{ textDecoration: 'none', width: '100%' }}>
              <Button variant="outline" fullWidth>
                Go to Admin Panel
              </Button>
            </Link>
            <Link href="/" style={{ textDecoration: 'none', width: '100%' }}>
              <Button variant="subtle" fullWidth>
                Back to Home
              </Button>
            </Link>
          </Stack>

          <Paper p="md" withBorder style={{ width: '100%', backgroundColor: '#f8f9fa' }}>
            <Text size="sm" fw={500} mb="xs">
              First time setup?
            </Text>
            <Text size="xs" c="dimmed">
              1. Visit <Text span c="blue" fw={500}>/api/admin/init</Text> to create admin account
            </Text>
            <Text size="xs" c="dimmed">
              2. Login at <Text span c="blue" fw={500}>/admin/login</Text>
            </Text>
            <Text size="xs" c="dimmed">
              3. Create your first article
            </Text>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}

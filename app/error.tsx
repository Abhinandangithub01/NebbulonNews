'use client';

import { useEffect } from 'react';
import { Container, Title, Text, Button, Stack, Box } from '@mantine/core';
import { IconAlertTriangle, IconRefresh, IconHome } from '@tabler/icons-react';
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
    <div style={{ minHeight: '100vh', backgroundColor: '#202124', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container size="sm">
        <Stack align="center" gap="xl">
          <Box style={{ textAlign: 'center' }}>
            <IconAlertTriangle size={80} color="#EA4335" />
            <Title order={1} c="white" fw={400} mt="xl" size="48px">
              Something went wrong
            </Title>
            <Text size="lg" c="#9AA0A6" mt="md">
              We encountered an error while loading this page.
            </Text>
          </Box>

          {error.digest && (
            <Text size="xs" c="#9AA0A6">
              Error ID: {error.digest}
            </Text>
          )}

          <Stack gap="sm" style={{ width: '100%', maxWidth: '300px' }}>
            <Button
              fullWidth
              size="lg"
              leftSection={<IconRefresh size={20} />}
              onClick={reset}
              variant="filled"
              color="blue"
            >
              Try Again
            </Button>
            
            <Link href="/" style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                fullWidth
                size="lg"
                leftSection={<IconHome size={20} />}
                variant="outline"
                color="gray"
                styles={{
                  root: {
                    borderColor: '#5F6368',
                    color: '#E8EAED',
                    '&:hover': {
                      backgroundColor: '#3C4043'
                    }
                  }
                }}
              >
                Go to Homepage
              </Button>
            </Link>
          </Stack>

          <Text size="sm" c="#9AA0A6" ta="center">
            If the problem persists, please try refreshing the page or contact support.
          </Text>
        </Stack>
      </Container>
    </div>
  );
}

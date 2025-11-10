'use client';

import { Container, Title, Text, Button, Stack, Box } from '@mantine/core';
import { IconHome, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#202124', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container size="sm">
        <Stack align="center" gap="xl">
          <Box style={{ textAlign: 'center' }}>
            <Title order={1} size="120px" c="#8AB4F8" fw={700}>
              404
            </Title>
            <Title order={2} c="white" fw={400} mt="md">
              Page not found
            </Title>
            <Text size="lg" c="#9AA0A6" mt="md">
              Sorry, we couldn't find the page you're looking for.
            </Text>
          </Box>

          <Stack gap="sm" style={{ width: '100%', maxWidth: '300px' }}>
            <Link href="/" style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                fullWidth
                size="lg"
                leftSection={<IconHome size={20} />}
                variant="filled"
                color="blue"
              >
                Go to Homepage
              </Button>
            </Link>
          </Stack>

          <Text size="sm" c="#9AA0A6" ta="center">
            If you think this is a mistake, please contact support.
          </Text>
        </Stack>
      </Container>
    </div>
  );
}

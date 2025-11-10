'use client';

import { Paper, Skeleton, Stack, Box } from '@mantine/core';

export default function ArticleCardSkeleton() {
  return (
    <Paper p="md" style={{ backgroundColor: '#292A2D', borderRadius: '8px' }}>
      <Stack gap="xs">
        <Skeleton height={120} radius="md" />
        <Skeleton height={12} width="30%" radius="xl" />
        <Skeleton height={20} radius="md" />
        <Skeleton height={16} width="80%" radius="md" />
        <Box mt="xs">
          <Skeleton height={12} width="40%" radius="xl" />
        </Box>
      </Stack>
    </Paper>
  );
}

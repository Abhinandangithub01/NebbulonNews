import { Container, Loader, Stack, Text } from '@mantine/core';

export default function Loading() {
  return (
    <Container size="xl" py="xl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack align="center" gap="md">
        <Loader size="xl" />
        <Text size="lg" c="dimmed">Loading Nebbulon News...</Text>
      </Stack>
    </Container>
  );
}

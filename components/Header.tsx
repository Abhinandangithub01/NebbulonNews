'use client';

import {
  Container,
  Group,
  Text,
  Box,
} from '@mantine/core';
import Link from 'next/link';

export default function Header() {
  return (
    <Box
      component="header"
      style={{
        borderBottom: '1px solid #2C2E33',
        backgroundColor: '#1A1B1E',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container size="xl" py="lg">
        <Group justify="space-between">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text
              size="28px"
              fw={700}
              c="white"
              style={{ 
                cursor: 'pointer',
                letterSpacing: '0.5px'
              }}
            >
              NEBBULON
            </Text>
          </Link>
        </Group>
      </Container>
    </Box>
  );
}

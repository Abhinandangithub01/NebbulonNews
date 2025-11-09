'use client';

import { Container, Group, Text, Stack, Anchor } from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid #373A40',
        backgroundColor: '#1A1B1E',
        padding: '2rem 0',
      }}
    >
      <Container size="xl">
        <Stack gap="xl">
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Text
                size="lg"
                fw={900}
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              >
                NEBBULON
              </Text>
              <Text size="sm" c="dimmed" maw={300}>
                Your trusted source for the latest news in finance, technology,
                automobiles, and cinema.
              </Text>
            </Stack>

            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Categories
              </Text>
              <Link href="/category/finance" style={{ textDecoration: 'none' }}>
                <Text size="sm" c="dimmed">
                  Finance
                </Text>
              </Link>
              <Link href="/category/automobiles" style={{ textDecoration: 'none' }}>
                <Text size="sm" c="dimmed">
                  Automobiles
                </Text>
              </Link>
              <Link href="/category/tech" style={{ textDecoration: 'none' }}>
                <Text size="sm" c="dimmed">
                  Tech
                </Text>
              </Link>
              <Link href="/category/cinema" style={{ textDecoration: 'none' }}>
                <Text size="sm" c="dimmed">
                  Cinema
                </Text>
              </Link>
            </Stack>

            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Follow Us
              </Text>
              <Group gap="sm">
                <Anchor href="https://twitter.com" target="_blank" c="dimmed">
                  <IconBrandTwitter size={20} />
                </Anchor>
                <Anchor href="https://facebook.com" target="_blank" c="dimmed">
                  <IconBrandFacebook size={20} />
                </Anchor>
                <Anchor href="https://instagram.com" target="_blank" c="dimmed">
                  <IconBrandInstagram size={20} />
                </Anchor>
                <Anchor href="https://linkedin.com" target="_blank" c="dimmed">
                  <IconBrandLinkedin size={20} />
                </Anchor>
              </Group>
            </Stack>
          </Group>

          <Group justify="center" pt="md" style={{ borderTop: '1px solid #373A40' }}>
            <Text size="xs" c="dimmed">
              © {new Date().getFullYear()} Nebbulon News. All rights reserved.
            </Text>
          </Group>
        </Stack>
      </Container>
    </footer>
  );
}

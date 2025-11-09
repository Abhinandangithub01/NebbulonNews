'use client';

import { useState } from 'react';
import {
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  Text,
  UnstyledButton,
  rem,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChartLine,
  IconCar,
  IconDeviceLaptop,
  IconMovie,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { label: 'Finance', href: '/category/finance', icon: IconChartLine },
  { label: 'Automobiles', href: '/category/automobiles', icon: IconCar },
  { label: 'Tech', href: '/category/tech', icon: IconDeviceLaptop },
  { label: 'Cinema', href: '/category/cinema', icon: IconMovie },
];

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <Box
      component="header"
      style={{
        borderBottom: '1px solid #373A40',
        backgroundColor: '#1A1B1E',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container size="xl" py="md">
        <Group justify="space-between">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text
              size="xl"
              fw={900}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
              style={{ cursor: 'pointer' }}
            >
              NEBBULON
            </Text>
          </Link>

          <Group gap="xl" visibleFrom="sm">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = pathname === category.href;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  style={{ textDecoration: 'none' }}
                >
                  <UnstyledButton>
                    <Group gap="xs">
                      <Icon size={18} stroke={1.5} />
                      <Text
                        size="sm"
                        fw={isActive ? 600 : 500}
                        c={isActive ? 'blue' : 'dimmed'}
                        style={{
                          transition: 'color 0.2s',
                          '&:hover': { color: 'var(--mantine-color-blue-4)' },
                        }}
                      >
                        {category.label}
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Link>
              );
            })}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Menu"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Stack gap="lg">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.href}
                href={category.href}
                style={{ textDecoration: 'none' }}
                onClick={close}
              >
                <Group gap="sm">
                  <Icon size={20} />
                  <Text size="md">{category.label}</Text>
                </Group>
              </Link>
            );
          })}
        </Stack>
      </Drawer>
    </Box>
  );
}

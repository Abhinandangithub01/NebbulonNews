'use client';

import { Group, Text, Box } from '@mantine/core';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Box style={{ backgroundColor: '#202124', padding: '16px 0', borderBottom: '1px solid #3C4043' }}>
      <Group gap="xs">
        {items.map((item, index) => (
          <Group key={index} gap="xs">
            {item.href ? (
              <Link href={item.href} style={{ textDecoration: 'none' }}>
                <Text
                  size="sm"
                  c="#8AB4F8"
                  style={{
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#AECBFA'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#8AB4F8'}
                >
                  {item.label}
                </Text>
              </Link>
            ) : (
              <Text size="sm" c="#E8EAED">{item.label}</Text>
            )}
            {index < items.length - 1 && (
              <IconChevronRight size={14} color="#9AA0A6" />
            )}
          </Group>
        ))}
      </Group>
    </Box>
  );
}

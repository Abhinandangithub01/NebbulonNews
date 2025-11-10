// Dynamic imports for code splitting
import dynamic from 'next/dynamic';
import { Skeleton } from '@mantine/core';

// Lazy load heavy components
export const TrendingWidgetDynamic = dynamic(
  () => import('@/components/TrendingWidget'),
  {
    loading: () => <Skeleton height={400} radius="md" />,
    ssr: false,
  }
);

export const AdSenseDisplayDynamic = dynamic(
  () => import('@/components/AdSenseDisplay'),
  {
    loading: () => <Skeleton height={300} radius="md" />,
    ssr: false,
  }
);

export const ShareButtonsDynamic = dynamic(
  () => import('@/components/ShareButtons'),
  {
    loading: () => <Skeleton height={40} width={300} radius="md" />,
    ssr: false,
  }
);

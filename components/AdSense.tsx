'use client';

import { useEffect } from 'react';
import { Paper } from '@mantine/core';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
}: AdSenseProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && clientId) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [clientId]);

  // Show placeholder in development or if no client ID
  if (!clientId || clientId === 'ca-pub-XXXXXXXXXXXXXXXX') {
    return (
      <Paper
        p="md"
        withBorder
        style={{
          minHeight: '250px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#25262b',
          ...style,
        }}
      >
        <div style={{ textAlign: 'center', color: '#909296' }}>
          <div style={{ fontSize: '14px', marginBottom: '8px' }}>Advertisement</div>
          <div style={{ fontSize: '12px' }}>
            Add your AdSense Client ID in .env.local
          </div>
        </div>
      </Paper>
    );
  }

  return (
    <Paper p="xs" withBorder style={{ overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </Paper>
  );
}

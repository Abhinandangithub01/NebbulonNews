'use client';

import { Group, ActionIcon, Tooltip, Text } from '@mantine/core';
import { IconBrandTwitter, IconBrandFacebook, IconBrandLinkedin, IconBrandWhatsapp, IconLink, IconCheck } from '@tabler/icons-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);
    
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <Group gap="xs">
      <Text size="sm" c="#9AA0A6" mr="xs">Share:</Text>
      
      <Tooltip label="Share on Twitter">
        <ActionIcon
          variant="subtle"
          color="blue"
          onClick={() => handleShare('twitter')}
          style={{ backgroundColor: '#3C4043' }}
        >
          <IconBrandTwitter size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Share on Facebook">
        <ActionIcon
          variant="subtle"
          color="blue"
          onClick={() => handleShare('facebook')}
          style={{ backgroundColor: '#3C4043' }}
        >
          <IconBrandFacebook size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Share on LinkedIn">
        <ActionIcon
          variant="subtle"
          color="blue"
          onClick={() => handleShare('linkedin')}
          style={{ backgroundColor: '#3C4043' }}
        >
          <IconBrandLinkedin size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Share on WhatsApp">
        <ActionIcon
          variant="subtle"
          color="green"
          onClick={() => handleShare('whatsapp')}
          style={{ backgroundColor: '#3C4043' }}
        >
          <IconBrandWhatsapp size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={copied ? 'Copied!' : 'Copy link'}>
        <ActionIcon
          variant="subtle"
          color={copied ? 'green' : 'gray'}
          onClick={handleCopyLink}
          style={{ backgroundColor: '#3C4043' }}
        >
          {copied ? <IconCheck size={18} /> : <IconLink size={18} />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

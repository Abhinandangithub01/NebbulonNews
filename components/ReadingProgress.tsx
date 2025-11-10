'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mantine/core';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: '#3C4043',
        zIndex: 9999,
        opacity: progress > 0 ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <Box
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: '#8AB4F8',
          transition: 'width 0.1s ease',
          boxShadow: '0 0 10px rgba(138, 180, 248, 0.5)'
        }}
      />
    </Box>
  );
}

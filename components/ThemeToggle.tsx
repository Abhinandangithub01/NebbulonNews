'use client';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light') => {
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.style.backgroundColor = newTheme === 'dark' ? '#202124' : '#FFFFFF';
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      <ActionIcon
        onClick={toggleTheme}
        size="lg"
        variant="subtle"
        color={theme === 'dark' ? 'yellow' : 'blue'}
        style={{
          backgroundColor: theme === 'dark' ? '#3C4043' : '#E8EAED',
          transition: 'all 0.3s ease'
        }}
      >
        {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
      </ActionIcon>
    </Tooltip>
  );
}

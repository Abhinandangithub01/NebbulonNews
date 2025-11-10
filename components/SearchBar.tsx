'use client';

import { useState, useEffect, useRef } from 'react';
import { TextInput, Paper, Stack, Text, Loader, Box, Group } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';
import Link from 'next/link';
import api from '@/lib/api';
import { NewsArticle } from '@/types';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 300);
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchArticles = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setLoading(true);
      const result = await api.searchArticles(debouncedQuery);
      
      if (result.success && result.data) {
        setResults(result.data.articles || []);
        setShowResults(true);
      }
      
      setLoading(false);
    };

    searchArticles();
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <Box ref={searchRef} style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
      <TextInput
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        leftSection={loading ? <Loader size={16} /> : <IconSearch size={16} />}
        rightSection={
          query && (
            <IconX
              size={16}
              style={{ cursor: 'pointer' }}
              onClick={handleClear}
            />
          )
        }
        styles={{
          input: {
            backgroundColor: '#3C4043',
            borderColor: '#5F6368',
            color: '#E8EAED',
            '&::placeholder': {
              color: '#9AA0A6'
            }
          }
        }}
      />

      {showResults && results.length > 0 && (
        <Paper
          p="xs"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            backgroundColor: '#292A2D',
            border: '1px solid #3C4043',
            borderRadius: '8px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          <Stack gap="xs">
            {results.slice(0, 5).map((article) => (
              <Link
                key={article._id}
                href={`/news/${article.slug}`}
                style={{ textDecoration: 'none' }}
                onClick={() => {
                  setShowResults(false);
                  setQuery('');
                }}
              >
                <Box
                  p="sm"
                  style={{
                    backgroundColor: '#3C4043',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5F6368'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3C4043'}
                >
                  <Text size="sm" c="white" lineClamp={1} fw={500}>
                    {article.title}
                  </Text>
                  <Group gap="xs" mt="4px">
                    <Text size="xs" c="#8AB4F8">
                      {article.category}
                    </Text>
                    <Text size="xs" c="#9AA0A6">
                      •
                    </Text>
                    <Text size="xs" c="#9AA0A6">
                      {article.views} views
                    </Text>
                  </Group>
                </Box>
              </Link>
            ))}
            
            {results.length > 5 && (
              <Link href={`/search?q=${encodeURIComponent(query)}`} style={{ textDecoration: 'none' }}>
                <Text size="sm" c="#8AB4F8" ta="center" p="sm">
                  View all {results.length} results →
                </Text>
              </Link>
            )}
          </Stack>
        </Paper>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && !loading && (
        <Paper
          p="md"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            backgroundColor: '#292A2D',
            border: '1px solid #3C4043',
            borderRadius: '8px',
            zIndex: 1000
          }}
        >
          <Text size="sm" c="#9AA0A6" ta="center">
            No results found for "{query}"
          </Text>
        </Paper>
      )}
    </Box>
  );
}

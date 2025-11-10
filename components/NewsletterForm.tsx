'use client';

import { useState } from 'react';
import { TextInput, Button, Group, Text, Paper, Alert } from '@mantine/core';
import { IconMail, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import api from '@/lib/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const result = await api.subscribeNewsletter(email);

    if (result.success) {
      setSuccess(true);
      setEmail('');
    } else {
      setError(result.error || 'Failed to subscribe. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Paper p="xl" style={{ backgroundColor: '#292A2D', borderRadius: '8px' }}>
      <Group gap="xs" mb="md">
        <IconMail size={24} color="#8AB4F8" />
        <Text size="lg" fw={500} c="white">Subscribe to Newsletter</Text>
      </Group>
      
      <Text size="sm" c="#9AA0A6" mb="md">
        Get the latest news and updates delivered to your inbox.
      </Text>

      {success && (
        <Alert icon={<IconCheck size={16} />} color="green" mb="md">
          Successfully subscribed! Check your email for confirmation.
        </Alert>
      )}

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Group gap="xs">
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            style={{ flex: 1 }}
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
          <Button
            type="submit"
            loading={loading}
            color="blue"
            disabled={success}
          >
            Subscribe
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

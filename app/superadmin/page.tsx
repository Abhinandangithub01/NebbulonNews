'use client';

// Prevent SSR for this page
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Center,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SuperAdminLogin() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const session = useSession();
  const status = session?.status || 'loading';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        notifications.show({
          title: 'Login Failed',
          message: 'Invalid email or password',
          color: 'red',
        });
      } else {
        notifications.show({
          title: 'Success',
          message: 'Logged in successfully',
          color: 'green',
        });
        router.push('/admin/dashboard');
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Something went wrong',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (mounted && status === 'authenticated') {
      router.push('/admin/dashboard');
    }
  }, [mounted, status, router]);

  // Prevent SSR
  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container size={420}>
        <Center mb="xl">
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            NEBBULON ADMIN
          </Text>
        </Center>

        <Paper radius="md" p="xl" withBorder>
          <Title order={1} ta="center" mb="md">
            Super Admin Login
          </Title>
          <Text c="dimmed" size="sm" ta="center" mb="xl">
            Secure access to Nebbulon News admin panel
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="admin@nebbulon.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" fullWidth loading={loading}>
                Sign In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Paper, Stack, Text, Textarea, TextInput, Button, Group, Divider, Box, Avatar, Alert } from '@mantine/core';
import { IconMessage, IconSend, IconAlertCircle, IconCheck } from '@tabler/icons-react';
import api from '@/lib/api';

interface Comment {
  _id: string;
  content: string;
  author: string;
  createdAt: string;
  replies?: Comment[];
  likes: number;
}

interface CommentSectionProps {
  articleId: string;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  });

  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    setLoading(true);
    const result = await api.getComments(articleId);
    
    if (result.success && result.data) {
      setComments(result.data.comments || []);
    }
    
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    const result = await api.addComment({
      articleId,
      ...formData
    });

    if (result.success) {
      setSuccess(true);
      setFormData({ author: '', email: '', content: '' });
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || 'Failed to post comment');
    }

    setSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderComment = (comment: Comment, depth: number = 0) => (
    <Box key={comment._id} ml={depth > 0 ? 'xl' : 0} mb="md">
      <Group gap="sm" align="flex-start">
        <Avatar color="blue" radius="xl">
          {comment.author[0].toUpperCase()}
        </Avatar>
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group gap="xs">
            <Text size="sm" fw={500} c="white">
              {comment.author}
            </Text>
            <Text size="xs" c="#9AA0A6">
              {formatDate(comment.createdAt)}
            </Text>
          </Group>
          <Text size="sm" c="#E8EAED">
            {comment.content}
          </Text>
        </Stack>
      </Group>
      
      {comment.replies && comment.replies.length > 0 && (
        <Box mt="md">
          {comment.replies.map(reply => renderComment(reply, depth + 1))}
        </Box>
      )}
    </Box>
  );

  return (
    <Paper p="xl" style={{ backgroundColor: '#292A2D', borderRadius: '8px' }}>
      <Group gap="xs" mb="xl">
        <IconMessage size={24} color="#8AB4F8" />
        <Text size="lg" fw={500} c="white">
          Comments ({comments.length})
        </Text>
      </Group>

      {/* Comment Form */}
      <Paper p="md" mb="xl" style={{ backgroundColor: '#3C4043', borderRadius: '8px' }}>
        <Text size="md" fw={500} c="white" mb="md">
          Leave a Comment
        </Text>

        {success && (
          <Alert icon={<IconCheck size={16} />} color="green" mb="md">
            Comment submitted successfully and is pending approval!
          </Alert>
        )}

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <Group grow>
              <TextInput
                placeholder="Your Name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                styles={{
                  input: {
                    backgroundColor: '#292A2D',
                    borderColor: '#5F6368',
                    color: '#E8EAED'
                  }
                }}
              />
              <TextInput
                placeholder="Your Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                styles={{
                  input: {
                    backgroundColor: '#292A2D',
                    borderColor: '#5F6368',
                    color: '#E8EAED'
                  }
                }}
              />
            </Group>

            <Textarea
              placeholder="Write your comment..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              minRows={4}
              styles={{
                input: {
                  backgroundColor: '#292A2D',
                  borderColor: '#5F6368',
                  color: '#E8EAED'
                }
              }}
            />

            <Button
              type="submit"
              leftSection={<IconSend size={16} />}
              loading={submitting}
              color="blue"
            >
              Post Comment
            </Button>
          </Stack>
        </form>
      </Paper>

      <Divider color="#3C4043" mb="xl" />

      {/* Comments List */}
      {loading ? (
        <Text size="sm" c="#9AA0A6" ta="center">
          Loading comments...
        </Text>
      ) : comments.length === 0 ? (
        <Text size="sm" c="#9AA0A6" ta="center">
          No comments yet. Be the first to comment!
        </Text>
      ) : (
        <Stack gap="lg">
          {comments.map(comment => renderComment(comment))}
        </Stack>
      )}
    </Paper>
  );
}

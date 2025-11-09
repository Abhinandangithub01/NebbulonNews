'use client';

import { useState } from 'react';
import {
  Container,
  Title,
  Paper,
  TextInput,
  Textarea,
  Select,
  Button,
  Stack,
  Group,
  FileInput,
  Switch,
  TagsInput,
} from '@mantine/core';
import { RichTextEditor, Link as TiptapLink } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { IconUpload, IconArrowLeft } from '@tabler/icons-react';
import LinkComponent from 'next/link';
import { generateSlug } from '@/lib/utils';

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string | null>('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, TiptapLink],
    content: '<p>Start writing your article...</p>',
  });

  const handleImageChange = (file: File | null) => {
    setFeaturedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async () => {
    if (!title || !category || !excerpt || !featuredImage || !editor) {
      notifications.show({
        title: 'Error',
        message: 'Please fill in all required fields',
        color: 'red',
      });
      return;
    }

    setLoading(true);

    try {
      // Upload image first
      const formData = new FormData();
      formData.append('file', featuredImage);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const { url: imageUrl } = await uploadResponse.json();

      // Create article
      const articleData = {
        title,
        slug: generateSlug(title),
        category,
        excerpt,
        content: editor.getHTML(),
        featuredImage: imageUrl,
        tags,
        published,
      };

      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      notifications.show({
        title: 'Success',
        message: 'Article created successfully',
        color: 'green',
      });

      router.push('/admin/dashboard');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to create article',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1A1B1E' }}>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Group>
            <LinkComponent href="/admin/dashboard" style={{ textDecoration: 'none' }}>
              <Button variant="subtle" leftSection={<IconArrowLeft size={18} />}>
                Back to Dashboard
              </Button>
            </LinkComponent>
          </Group>

          <Title order={1}>Create New Article</Title>

          <Paper p="xl" withBorder>
            <Stack gap="md">
              <TextInput
                label="Title"
                placeholder="Enter article title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Select
                label="Category"
                placeholder="Select category"
                required
                value={category}
                onChange={setCategory}
                data={[
                  { value: 'finance', label: 'Finance' },
                  { value: 'automobiles', label: 'Automobiles' },
                  { value: 'tech', label: 'Tech' },
                  { value: 'cinema', label: 'Cinema' },
                ]}
              />

              <Textarea
                label="Excerpt"
                placeholder="Brief summary of the article"
                required
                minRows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
              />

              <FileInput
                label="Featured Image"
                placeholder="Upload image"
                required
                accept="image/*"
                leftSection={<IconUpload size={18} />}
                value={featuredImage}
                onChange={handleImageChange}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                />
              )}

              <div>
                <label style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px', display: 'block' }}>
                  Content *
                </label>
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>

                  <RichTextEditor.Content />
                </RichTextEditor>
              </div>

              <TagsInput
                label="Tags"
                placeholder="Add tags"
                value={tags}
                onChange={setTags}
              />

              <Switch
                label="Publish immediately"
                checked={published}
                onChange={(e) => setPublished(e.currentTarget.checked)}
              />

              <Group justify="flex-end">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} loading={loading}>
                  Create Article
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
}

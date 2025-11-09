# Nebbulon News - Modern News Portal

A beautiful, modern news website built with Next.js, React, and Mantine UI, featuring finance, automobiles, tech, and cinema news with integrated Google AdSense.

## Features

- 📰 **Multi-Category News**: Finance, Automobiles, Tech, Cinema
- 👨‍💼 **Admin Dashboard**: Super admin panel to create, edit, and manage news posts
- 💰 **Google AdSense Integration**: Strategic ad placements for revenue generation
- 📱 **Responsive Design**: Beautiful UI inspired by modern news platforms
- 🖼️ **Image Support**: Upload and manage images for news articles
- 🎨 **Modern UI**: Built with Mantine components for a sleek look
- ⚡ **Fast Performance**: Optimized with Next.js 14 and App Router
- 🔒 **Secure Admin**: Protected admin routes with NextAuth

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Mantine UI v7
- **Database**: AWS DynamoDB
- **Storage**: AWS S3
- **Authentication**: NextAuth.js
- **Rich Text Editor**: Tiptap
- **Deployment**: AWS Amplify
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- AWS Account
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up AWS services (see `AWS_SETUP.md`):
   - Create DynamoDB tables
   - Create S3 bucket
   - Set up IAM user/role

4. Set up environment variables:
   - Copy `.env.local` and update with your values
   - Add your AWS credentials
   - Add your Google AdSense Client ID
   - Set a secure NEXTAUTH_SECRET

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

### Initial Admin Setup

Default admin credentials (change after first login):
- Email: admin@nebbulon.com
- Password: Admin@123

## Project Structure

```
nebbulon/
├── app/                    # Next.js app directory
│   ├── (admin)/           # Admin routes
│   ├── (public)/          # Public routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utilities and configurations
├── models/                # MongoDB models
├── public/                # Static assets
└── types/                 # TypeScript types
```

## Deployment to AWS Amplify

1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository to AWS Amplify
3. Configure build settings (auto-detected for Next.js)
4. Add environment variables in Amplify Console
5. Deploy!

## Additional Features to Consider

- 📧 **Newsletter Subscription**: Email collection for updates
- 🔍 **Advanced Search**: Full-text search across articles
- 💬 **Comments System**: Reader engagement
- 🔖 **Bookmarks**: Save articles for later
- 📊 **Analytics Dashboard**: Track views and engagement
- 🌐 **Multi-language Support**: Reach wider audience
- 📱 **PWA Support**: Mobile app-like experience
- 🔔 **Push Notifications**: Alert readers of breaking news
- 📈 **SEO Optimization**: Better search rankings
- 🎯 **Related Articles**: AI-powered recommendations
- 👥 **Social Sharing**: Easy sharing to social platforms
- ⚡ **Breaking News Banner**: Highlight urgent stories
- 🎬 **Video Content**: Embed and manage video news
- 📊 **Trending Section**: Most viewed/popular articles

## License

MIT

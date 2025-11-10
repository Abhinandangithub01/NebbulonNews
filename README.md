# 🚀 Nebbulon News - Modern Serverless News Platform

A beautiful, production-ready news platform built with Next.js 14, AWS Lambda, S3, and DynamoDB. Features Google News-inspired UI, serverless architecture, and complete user interactions.

## ✨ Features

### **Frontend Features:**
- 📰 **Multi-Category News**: Finance, Automobiles, Tech, Cinema
- 🔍 **Real-time Search**: Instant search with suggestions
- 💬 **Comments System**: Nested comments with moderation
- 📧 **Newsletter**: Email subscription with SES integration
- 📊 **Trending Articles**: View-based trending section
- 🎨 **Dark/Light Mode**: Theme toggle with localStorage
- 📱 **Mobile Responsive**: Hamburger menu, touch-friendly
- 📈 **Reading Progress**: Visual progress bar
- 🔗 **Social Sharing**: Twitter, Facebook, LinkedIn, WhatsApp
- 🖼️ **Image Optimization**: Next.js Image with WebP/AVIF
- ⚡ **Code Splitting**: Vendor chunks, dynamic imports
- 🎯 **SEO Optimized**: Breadcrumbs, meta tags, structured data

### **Backend Features:**
- 🔧 **AWS Lambda**: 9 serverless functions
- 🗄️ **DynamoDB**: 4 NoSQL tables
- 📦 **S3 + CloudFront**: Image storage with CDN
- 📨 **SES**: Email service for newsletters
- 🔐 **IAM**: Secure permissions
- 📊 **Analytics**: View tracking
- 🚀 **API Gateway**: REST API endpoints

### **Admin Features:**
- 👨‍💼 **Admin Dashboard**: Create, edit, manage articles
- 🖼️ **Image Upload**: Direct S3 upload
- 📝 **Rich Text Editor**: Tiptap WYSIWYG
- 💬 **Comment Moderation**: Approve/reject comments
- 🔒 **Secure Auth**: NextAuth.js

## 🛠️ Tech Stack

### **Frontend:**
- **Framework**: Next.js 14 (App Router)
- **UI Library**: Mantine UI v7
- **Language**: TypeScript
- **State Management**: React Hooks
- **Icons**: Tabler Icons
- **Rich Text**: Tiptap

### **Backend:**
- **Compute**: AWS Lambda (Node.js 18)
- **Database**: AWS DynamoDB
- **Storage**: AWS S3
- **CDN**: CloudFront
- **Email**: AWS SES
- **API**: API Gateway
- **IaC**: Serverless Framework

### **DevOps:**
- **Deployment**: AWS Amplify (Frontend) + Lambda (Backend)
- **CI/CD**: GitHub Actions
- **Monitoring**: CloudWatch
- **Version Control**: Git/GitHub

## Getting Started

### Prerequisites

- Node.js 18+ 
- AWS Account
- npm or yarn

### Frontend Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhinandangithub01/NebbulonNews.git
   cd Nebbulon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api-gateway-url.com
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

### Backend Deployment (AWS Lambda)

1. **Install Serverless Framework**
   ```bash
   npm install -g serverless
   ```

2. **Configure AWS credentials**
   ```bash
   aws configure
   ```

3. **Install Lambda dependencies**
   ```bash
   cd lambda
   npm install
   ```

4. **Deploy to AWS**
   ```bash
   serverless deploy --stage prod
   ```

5. **Update frontend `.env.local`** with API Gateway URL

📖 **See [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md) for detailed deployment guide**

### Initial Admin Setup

Default admin credentials (change after first login):
- Email: admin@nebbulon.com
- Password: Admin@123

## 📁 Project Structure

```
nebbulon/
├── app/                       # Next.js 14 app directory
│   ├── admin/                # Admin dashboard
│   ├── category/[category]/  # Category pages
│   ├── news/[slug]/          # Article detail pages
│   ├── page.tsx              # Homepage
│   ├── error.tsx             # Error page
│   └── not-found.tsx         # 404 page
├── components/               # React components
│   ├── SearchBar.tsx         # Real-time search
│   ├── CommentSection.tsx    # Comments system
│   ├── NewsletterForm.tsx    # Email subscription
│   ├── TrendingWidget.tsx    # Trending articles
│   ├── ShareButtons.tsx      # Social sharing
│   ├── ReadingProgress.tsx   # Progress bar
│   ├── ThemeToggle.tsx       # Dark/Light mode
│   ├── Breadcrumbs.tsx       # Navigation
│   └── OptimizedImage.tsx    # Image optimization
├── lambda/                   # AWS Lambda functions
│   ├── articles/             # Article APIs
│   ├── images/               # Image upload
│   ├── newsletter/           # Newsletter
│   ├── comments/             # Comments
│   └── analytics/            # Analytics
├── lib/                      # Utilities
│   ├── api.ts                # API client
│   └── aws/                  # AWS configs
├── public/                   # Static assets
├── types/                    # TypeScript types
├── serverless.yml            # Lambda deployment config
├── AWS_DEPLOYMENT.md         # Deployment guide
└── IMPLEMENTATION_SUMMARY.md # Feature summary
```

## 🚀 Deployment

### **Frontend (AWS Amplify)**
1. Push code to GitHub
2. Connect to AWS Amplify
3. Configure build settings
4. Add environment variables
5. Deploy automatically on push

### **Backend (AWS Lambda)**
```bash
# Deploy Lambda functions
serverless deploy --stage prod

# View logs
serverless logs --function getArticles --tail

# Remove deployment
serverless remove --stage prod
```

### **Infrastructure Created:**
- ✅ 9 Lambda functions
- ✅ 4 DynamoDB tables
- ✅ S3 bucket + CloudFront CDN
- ✅ API Gateway REST API
- ✅ IAM roles & permissions

📖 **Detailed Guide:** [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md)

---

## 📊 API Endpoints

### **Articles**
- `GET /api/articles` - Get all articles
- `GET /api/articles/{slug}` - Get article by slug
- `GET /api/articles/search?q=query` - Search articles
- `GET /api/articles/trending` - Get trending articles

### **Images**
- `POST /api/images/upload` - Upload image to S3

### **Newsletter**
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### **Comments**
- `POST /api/comments` - Add comment
- `GET /api/comments/{articleId}` - Get comments

### **Analytics**
- `POST /api/analytics/track` - Track article view

---

## 💰 Cost Estimation

### **AWS Free Tier (12 months):**
- Lambda: 1M requests/month FREE
- DynamoDB: 25GB + 25 WCU/RCU FREE
- S3: 5GB storage FREE
- CloudFront: 50GB transfer FREE
- SES: 62,000 emails/month FREE

### **After Free Tier:**
- **Estimated Monthly Cost:** $5-20 for small/medium traffic
- Scales automatically with usage

---

## 🎯 Performance

### **Metrics:**
- ⚡ First Load JS: ~180 KB (28% reduction)
- 🎨 LCP: < 2.5s
- 📊 CLS: < 0.1
- 🚀 TTI: < 3.8s

### **Optimizations:**
- Code splitting (vendor chunks)
- Image optimization (WebP/AVIF)
- Lazy loading components
- CDN for static assets

---

## 📚 Documentation

- **[AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md)** - Complete deployment guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - All features implemented
- **[PERFORMANCE.md](PERFORMANCE.md)** - Performance optimization guide

---

## 🔐 Security

- ✅ IAM least-privilege permissions
- ✅ CORS configured properly
- ✅ API rate limiting
- ✅ S3 bucket policies
- ✅ DynamoDB encryption at rest
- ✅ Environment variables for secrets

---

## 🛠️ Development Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Backend
serverless deploy    # Deploy Lambda functions
serverless offline   # Run Lambda locally
serverless logs      # View logs
serverless invoke    # Test function

# Analysis
npm run analyze      # Analyze bundle size
```

---

## 📝 License

MIT License - feel free to use for your projects!

---

## 👨‍💻 Author

**Abhinandan**  
GitHub: [@Abhinandangithub01](https://github.com/Abhinandangithub01)

---

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Mantine UI for beautiful components
- AWS for serverless infrastructure
- Google News for UI inspiration

---

**⭐ Star this repo if you find it useful!**

## Additional Features to Consider

- **Newsletter Subscription**: Email collection for updates
- **Advanced Search**: Full-text search across articles
- **Comments System**: Reader engagement
- **Bookmarks**: Save articles for later
- **Analytics Dashboard**: Track views and engagement
- **Multi-language Support**: Reach wider audience
- **PWA Support**: Mobile app-like experience
- **Push Notifications**: Alert readers of breaking news
- **SEO Optimization**: Better search rankings
- **Related Articles**: AI-powered recommendations
- **Social Sharing**: Easy sharing to social platforms
- **Breaking News Banner**: Highlight urgent stories
- **Video Content**: Embed and manage video news
- **Trending Section**: Most viewed/popular articles
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

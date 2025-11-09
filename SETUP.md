# Nebbulon News - Quick Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd c:/Users/mail2/Downloads/Nebbulon
npm install
```

### 2. Set Up MongoDB

**Option A: MongoDB Atlas (Recommended for Production)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string

**Option B: Local MongoDB (For Development)**
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/nebbulon-news`

### 3. Configure Environment Variables

Update `.env.local` with your values:

```env
# MongoDB - REQUIRED
MONGODB_URI=your-mongodb-connection-string

# NextAuth - REQUIRED
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Admin Credentials - REQUIRED
ADMIN_EMAIL=admin@nebbulon.com
ADMIN_PASSWORD=Admin@123

# Google AdSense - Add your ID
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 5. Initialize Admin Account

Open your browser and visit:
```
http://localhost:3000/api/admin/init
```

Or use curl:
```bash
curl -X POST http://localhost:3000/api/admin/init
```

### 6. Login to Admin Panel

1. Go to: http://localhost:3000/admin/login
2. Use credentials from `.env.local`:
   - Email: admin@nebbulon.com
   - Password: Admin@123

### 7. Create Your First Article

1. Click "Create New Article"
2. Fill in:
   - Title
   - Category (Finance, Automobiles, Tech, or Cinema)
   - Excerpt
   - Featured Image
   - Content (use rich text editor)
   - Tags
3. Toggle "Publish immediately" if ready
4. Click "Create Article"

## 📱 Features Overview

### Public Features
- ✅ Homepage with latest news from all categories
- ✅ Category pages (Finance, Automobiles, Tech, Cinema)
- ✅ Individual news article pages
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Google AdSense integration (sidebar + in-content)
- ✅ View counter for articles
- ✅ SEO-optimized metadata
- ✅ Dark theme UI

### Admin Features
- ✅ Secure login with NextAuth
- ✅ Dashboard with statistics
- ✅ Create/Edit/Delete articles
- ✅ Rich text editor with formatting
- ✅ Image upload
- ✅ Draft/Publish toggle
- ✅ Tag management
- ✅ Category selection

### AdSense Placement
- ✅ Right sidebar (2 ad units)
- ✅ In-content ads (2 ad units in article)
- ✅ Responsive ad units
- ✅ Placeholder ads in development

## 🎨 Design Highlights

Based on the DEV.to-inspired design you shared:
- Clean, modern dark theme
- Card-based layout for articles
- Category badges with color coding
- Smooth hover effects
- Responsive grid system
- Professional typography
- Sticky header navigation

## 🔧 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Mantine v7
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Rich Text**: Tiptap Editor
- **Icons**: Tabler Icons
- **Styling**: CSS-in-JS with Mantine
- **Deployment**: AWS Amplify Ready

## 📦 Project Structure

```
nebbulon/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Homepage
│   │   ├── news/[slug]/          # Article detail
│   │   └── category/[category]/  # Category pages
│   ├── admin/
│   │   ├── login/                # Admin login
│   │   ├── dashboard/            # Admin dashboard
│   │   └── news/create/          # Create article
│   └── api/
│       ├── auth/                 # NextAuth routes
│       ├── admin/                # Admin API routes
│       └── upload/               # Image upload
├── components/
│   ├── Header.tsx                # Navigation
│   ├── Footer.tsx                # Footer
│   ├── NewsCard.tsx              # Article card
│   └── AdSense.tsx               # Ad component
├── lib/
│   ├── mongodb.ts                # DB connection
│   ├── auth.ts                   # Auth config
│   └── utils.ts                  # Utilities
├── models/
│   ├── Admin.ts                  # Admin model
│   └── NewsArticle.ts            # Article model
└── types/
    └── index.ts                  # TypeScript types
```

## 🚀 Deployment to AWS Amplify

See `DEPLOYMENT.md` for detailed instructions.

Quick steps:
1. Push to GitHub
2. Connect to AWS Amplify
3. Add environment variables
4. Deploy!

## 💡 Additional Features You Can Add

Based on your requirements, here are suggested enhancements:

### High Priority
1. **Newsletter Subscription** - Collect emails for updates
2. **Search Functionality** - Full-text search across articles
3. **Social Sharing** - Share buttons for articles
4. **Related Articles** - Show similar content
5. **Comments System** - Reader engagement (Disqus/custom)

### Medium Priority
6. **Trending Section** - Most viewed articles
7. **Breaking News Banner** - Highlight urgent stories
8. **Author Profiles** - Multiple admin authors
9. **Article Scheduling** - Publish at specific times
10. **SEO Enhancements** - Sitemap, robots.txt, structured data

### Nice to Have
11. **PWA Support** - Mobile app experience
12. **Push Notifications** - Alert readers
13. **Multi-language** - Internationalization
14. **Video Content** - Embed videos
15. **Analytics Dashboard** - Track performance
16. **Bookmarks** - Save articles for later
17. **Reading Time** - Estimated read time
18. **Dark/Light Mode Toggle** - Theme switcher
19. **Infinite Scroll** - Pagination alternative
20. **RSS Feed** - Content syndication

## 🔐 Security Best Practices

- ✅ Environment variables for secrets
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Protected admin routes
- ✅ Input validation
- ⚠️ Change default admin password
- ⚠️ Use strong NEXTAUTH_SECRET
- ⚠️ Enable MongoDB authentication
- ⚠️ Configure CORS properly

## 🐛 Troubleshooting

### TypeScript Errors
The lint errors you see are expected before running `npm install`. They will resolve after installing dependencies.

### MongoDB Connection
If you can't connect:
- Check connection string format
- Verify network access in MongoDB Atlas
- Ensure database user has correct permissions

### Images Not Showing
- Check `/public/uploads` directory exists
- Verify file upload permissions
- Consider using cloud storage (S3) for production

### AdSense Not Displaying
- Ads show as placeholders until you add your Client ID
- AdSense needs site approval before showing real ads
- Test with placeholder ads first

## 📞 Support

For issues:
1. Check this guide
2. Review `README.md`
3. Check `DEPLOYMENT.md`
4. Review error logs in console

## 🎉 Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Start development server
4. ✅ Initialize admin account
5. ✅ Create your first article
6. ✅ Test the website
7. ✅ Set up Google AdSense
8. ✅ Deploy to AWS Amplify
9. ✅ Add custom domain
10. ✅ Start publishing content!

Happy publishing! 🚀

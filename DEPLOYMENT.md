# Deployment Guide for Nebbulon News

## Prerequisites

1. **MongoDB Database**
   - Set up MongoDB Atlas (recommended) or local MongoDB
   - Get your connection string

2. **Google AdSense Account**
   - Sign up for Google AdSense
   - Get your AdSense Client ID

3. **AWS Account**
   - Create an AWS account for Amplify deployment

## Step-by-Step Deployment

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file with the following:

```env
# MongoDB Connection (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nebbulon-news

# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=https://your-domain.amplifyapp.com
NEXTAUTH_SECRET=generate-a-random-secret-key-here

# Admin Credentials (REQUIRED - Change these!)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourSecurePassword123!

# Google AdSense (REQUIRED for ads)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

**Important:** Generate a secure NEXTAUTH_SECRET using:
```bash
openssl rand -base64 32
```

### 3. Initialize Admin Account

After deploying, make a POST request to initialize the admin:

```bash
curl -X POST https://your-domain.amplifyapp.com/api/admin/init
```

Or visit: `https://your-domain.amplifyapp.com/api/admin/init` in your browser.

### 4. Deploy to AWS Amplify

#### Option A: Using Amplify Console (Recommended)

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Amplify**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Connect your Git repository
   - Select your repository and branch

3. **Configure Build Settings**
   - Amplify will auto-detect Next.js
   - The `amplify.yml` file is already configured

4. **Add Environment Variables**
   - In Amplify Console, go to "Environment variables"
   - Add all variables from `.env.local`:
     - `MONGODB_URI`
     - `NEXTAUTH_URL` (use your Amplify domain)
     - `NEXTAUTH_SECRET`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`
     - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`

5. **Deploy**
   - Click "Save and deploy"
   - Wait for deployment to complete

#### Option B: Using Amplify CLI

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Publish
amplify publish
```

### 5. Post-Deployment Steps

1. **Initialize Admin Account**
   ```bash
   curl -X POST https://your-domain.amplifyapp.com/api/admin/init
   ```

2. **Login to Admin Panel**
   - Visit: `https://your-domain.amplifyapp.com/admin/login`
   - Use credentials from `ADMIN_EMAIL` and `ADMIN_PASSWORD`

3. **Create Your First Article**
   - Go to dashboard
   - Click "Create New Article"
   - Fill in details and publish

4. **Verify AdSense**
   - Add your site to Google AdSense
   - Verify ownership
   - Ads will start showing after approval

### 6. Custom Domain (Optional)

1. In Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Follow the instructions to configure DNS
4. Update `NEXTAUTH_URL` environment variable

## Troubleshooting

### Database Connection Issues
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Admin Login Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure admin was initialized

### Images Not Uploading
- Check file permissions in Amplify
- Verify upload directory exists
- Consider using S3 for production images

### AdSense Not Showing
- Verify `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is correct
- Check if site is approved by AdSense
- Ensure ad slots are properly configured

## Monitoring

- **Amplify Console**: Monitor builds and deployments
- **CloudWatch**: View application logs
- **MongoDB Atlas**: Monitor database performance

## Backup

- **Database**: Use MongoDB Atlas automated backups
- **Code**: Keep Git repository updated
- **Images**: Consider S3 backup for uploaded images

## Security Checklist

- [ ] Changed default admin password
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enabled HTTPS (automatic with Amplify)
- [ ] Configured MongoDB IP whitelist
- [ ] Set up environment variables securely
- [ ] Enabled MongoDB authentication

## Support

For issues or questions:
- Check the README.md
- Review Next.js documentation
- Check Amplify documentation
- Review MongoDB Atlas documentation

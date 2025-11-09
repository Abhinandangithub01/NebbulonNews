# Quick Start Guide - Nebbulon News

Get your news website running in 15 minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd c:/Users/mail2/Downloads/Nebbulon
npm install
```

## Step 2: Set Up AWS Services (10 minutes)

Follow the detailed guide in `AWS_SETUP.md`, or use this quick version:

### Create DynamoDB Tables

```bash
# Using AWS CLI (if installed)
aws dynamodb create-table \
    --table-name nebbulon-news-articles \
    --attribute-definitions AttributeName=_id,AttributeType=S \
    --key-schema AttributeName=_id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST

aws dynamodb create-table \
    --table-name nebbulon-admins \
    --attribute-definitions AttributeName=_id,AttributeType=S \
    --key-schema AttributeName=_id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
```

Or create them manually in [DynamoDB Console](https://console.aws.amazon.com/dynamodb)

### Create S3 Bucket

```bash
# Using AWS CLI
aws s3 mb s3://nebbulon-news-images --region us-east-1
aws s3api put-bucket-policy --bucket nebbulon-news-images --policy file://bucket-policy.json
```

Or create it manually in [S3 Console](https://console.aws.amazon.com/s3)

## Step 3: Configure Environment (1 minute)

Update `.env.local` with your AWS credentials:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-here
AWS_SECRET_ACCESS_KEY=your-secret-key-here

DYNAMODB_TABLE_NEWS=nebbulon-news-articles
DYNAMODB_TABLE_ADMINS=nebbulon-admins
S3_BUCKET_NAME=nebbulon-news-images

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

ADMIN_EMAIL=admin@nebbulon.com
ADMIN_PASSWORD=Admin@123

NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## Step 4: Run the App (1 minute)

```bash
npm run dev
```

Visit: http://localhost:3000

## Step 5: Initialize Admin (30 seconds)

Visit: http://localhost:3000/api/admin/init

You should see:
```json
{"message":"Admin created successfully","email":"admin@nebbulon.com"}
```

## Step 6: Login & Create Content (1 minute)

1. Go to: http://localhost:3000/admin/login
2. Login with:
   - Email: `admin@nebbulon.com`
   - Password: `Admin@123`
3. Click "Create New Article"
4. Fill in the form and publish!

## Done! 🎉

Your news website is now running locally with:
- ✅ AWS DynamoDB for data storage
- ✅ AWS S3 for image storage
- ✅ Admin panel for content management
- ✅ Google AdSense placeholders
- ✅ Beautiful responsive UI

## Next Steps

1. **Create some articles** to see the homepage populate
2. **Test different categories** (Finance, Automobiles, Tech, Cinema)
3. **Upload images** to see S3 integration
4. **Set up Google AdSense** for real ads
5. **Deploy to AWS Amplify** (see `AWS_SETUP.md`)

## Troubleshooting

### Can't connect to DynamoDB?
- Check AWS credentials in `.env.local`
- Verify table names match
- Ensure AWS region is correct

### Images not uploading?
- Check S3 bucket exists
- Verify bucket policy allows uploads
- Check AWS credentials have S3 permissions

### Admin init fails?
- Check DynamoDB tables exist
- Verify AWS credentials
- Check console for error messages

## Need Help?

- **AWS Setup**: See `AWS_SETUP.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Full Documentation**: See `README.md`

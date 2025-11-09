# AWS Setup Guide for Nebbulon News

This guide will help you set up all required AWS services for your news website.

## Prerequisites

- AWS Account (create one at https://aws.amazon.com)
- AWS CLI installed (optional but recommended)

## Step 1: Create DynamoDB Tables

### 1.1 Create News Articles Table

1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click "Create table"
3. Configure:
   - **Table name**: `nebbulon-news-articles`
   - **Partition key**: `_id` (String)
   - **Table settings**: Use default settings (On-demand)
4. Click "Create table"

### 1.2 Create Admins Table

1. Click "Create table" again
2. Configure:
   - **Table name**: `nebbulon-admins`
   - **Partition key**: `_id` (String)
   - **Table settings**: Use default settings (On-demand)
3. Click "Create table"

## Step 2: Create S3 Bucket for Images

1. Go to [S3 Console](https://console.aws.amazon.com/s3)
2. Click "Create bucket"
3. Configure:
   - **Bucket name**: `nebbulon-news-images` (must be globally unique, change if needed)
   - **AWS Region**: `us-east-1` (or your preferred region)
   - **Block Public Access**: Uncheck "Block all public access"
   - Check the acknowledgment box
4. Click "Create bucket"

### 2.1 Configure Bucket Policy

1. Click on your bucket name
2. Go to "Permissions" tab
3. Scroll to "Bucket policy"
4. Click "Edit" and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nebbulon-news-images/*"
    }
  ]
}
```

5. Click "Save changes"

### 2.2 Enable CORS

1. Go to "Permissions" tab
2. Scroll to "Cross-origin resource sharing (CORS)"
3. Click "Edit" and paste:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

4. Click "Save changes"

## Step 3: Create IAM User (For Local Development)

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Click "Users" → "Create user"
3. **User name**: `nebbulon-dev`
4. Click "Next"
5. **Permissions**: Click "Attach policies directly"
6. Search and select:
   - `AmazonDynamoDBFullAccess`
   - `AmazonS3FullAccess`
7. Click "Next" → "Create user"

### 3.1 Create Access Keys

1. Click on the user you just created
2. Go to "Security credentials" tab
3. Scroll to "Access keys"
4. Click "Create access key"
5. Select "Application running outside AWS"
6. Click "Next" → "Create access key"
7. **IMPORTANT**: Copy both:
   - Access key ID
   - Secret access key
8. Save them securely!

### 3.2 Update .env.local

Add your credentials to `.env.local`:

```env
AWS_ACCESS_KEY_ID=your-access-key-id-here
AWS_SECRET_ACCESS_KEY=your-secret-access-key-here
```

## Step 4: Set Up AWS Amplify for Deployment

### 4.1 Create IAM Role for Amplify

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Click "Roles" → "Create role"
3. **Trusted entity type**: AWS service
4. **Use case**: Amplify
5. Click "Next"
6. Add permissions:
   - `AmazonDynamoDBFullAccess`
   - `AmazonS3FullAccess`
7. **Role name**: `AmplifyNebbulon`
8. Click "Create role"

### 4.2 Deploy to Amplify

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Click "New app" → "Host web app"
4. Connect your Git repository
5. Select repository and branch
6. **Build settings**: Auto-detected (amplify.yml)
7. Click "Next"

### 4.3 Configure Environment Variables in Amplify

1. In Amplify Console, go to "Environment variables"
2. Add the following:

```
AWS_REGION=us-east-1
DYNAMODB_TABLE_NEWS=nebbulon-news-articles
DYNAMODB_TABLE_ADMINS=nebbulon-admins
S3_BUCKET_NAME=nebbulon-news-images
NEXTAUTH_URL=https://your-app-name.amplifyapp.com
NEXTAUTH_SECRET=generate-a-secure-random-string
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourSecurePassword123!
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

**Generate NEXTAUTH_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 4.4 Attach IAM Role to Amplify

1. In Amplify Console, go to "App settings" → "General"
2. Scroll to "Service role"
3. Select the `AmplifyNebbulon` role you created
4. Click "Save"

### 4.5 Deploy

1. Click "Save and deploy"
2. Wait for deployment to complete
3. Your app will be available at: `https://your-app-name.amplifyapp.com`

## Step 5: Initialize Admin Account

After deployment:

1. Visit: `https://your-app-name.amplifyapp.com/api/admin/init`
2. You should see: `{"message":"Admin created successfully","email":"admin@yourdomain.com"}`
3. Now you can login at: `https://your-app-name.amplifyapp.com/admin/login`

## Step 6: Test Everything

1. **Login to admin panel**
2. **Create a test article** with an image
3. **Verify**:
   - Article appears on homepage
   - Image loads from S3
   - Data is in DynamoDB
   - AdSense placeholders show

## Cost Estimates (Free Tier)

- **DynamoDB**: 25 GB storage + 25 WCU/RCU (Free forever)
- **S3**: 5 GB storage + 20,000 GET requests (First 12 months)
- **Amplify**: 1,000 build minutes + 15 GB served (First 12 months)

**Total monthly cost after free tier**: ~$5-10 for moderate traffic

## Troubleshooting

### DynamoDB Access Denied
- Check IAM role has `AmazonDynamoDBFullAccess`
- Verify table names match environment variables
- Check AWS region is correct

### S3 Upload Fails
- Verify bucket policy allows public reads
- Check CORS configuration
- Ensure IAM role has S3 permissions

### Amplify Build Fails
- Check environment variables are set
- Verify IAM role is attached
- Review build logs in Amplify Console

## Security Best Practices

1. **Never commit AWS credentials** to Git
2. **Use IAM roles** in production (not access keys)
3. **Enable MFA** on your AWS account
4. **Rotate access keys** regularly
5. **Use least privilege** IAM policies
6. **Enable CloudTrail** for audit logging

## Optional: Set Up CloudWatch Alarms

Monitor your application:

1. Go to [CloudWatch Console](https://console.aws.amazon.com/cloudwatch)
2. Create alarms for:
   - DynamoDB throttling
   - S3 bucket size
   - Amplify build failures

## Next Steps

- [ ] Set up custom domain in Amplify
- [ ] Configure SSL certificate
- [ ] Set up CloudFront CDN for better performance
- [ ] Enable DynamoDB backups
- [ ] Set up S3 lifecycle policies
- [ ] Configure AWS WAF for security

## Support

For AWS-specific issues:
- [AWS Documentation](https://docs.aws.amazon.com)
- [AWS Support](https://console.aws.amazon.com/support)
- [AWS Forums](https://forums.aws.amazon.com)

# AWS Amplify Environment Variables Setup

## Step 1: Go to Amplify Console

1. Open: https://console.aws.amazon.com/amplify/home?region=us-east-1#/d2qztaflooyp3k
2. Click on your app: **NebbulonNews**
3. Go to **"Environment variables"** in the left sidebar

## Step 2: Add Environment Variables

Click **"Manage variables"** and add the following:

### AWS Configuration
```
NEBBULON_AWS_REGION = ap-south-1
NEBBULON_AWS_ACCESS_KEY_ID = your-aws-access-key-id
NEBBULON_AWS_SECRET_ACCESS_KEY = your-aws-secret-access-key
```

**Note:** Amplify doesn't allow environment variables starting with "AWS_" prefix, so we use "NEBBULON_AWS_" instead.

### DynamoDB Tables
```
DYNAMODB_TABLE_NEWS = nebbulon-news-articles
DYNAMODB_TABLE_ADMINS = nebbulon-admins
```

### S3 Bucket
```
S3_BUCKET_NAME = nebbulon-news-images
```

### NextAuth Configuration
```
NEXTAUTH_URL = https://main.d2qztaflooyp3k.amplifyapp.com
NEXTAUTH_SECRET = <generate-random-secret>
```

**Generate NEXTAUTH_SECRET:**
Run this command locally and copy the output:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Admin Credentials
```
ADMIN_EMAIL = admin@nebbulon.com
ADMIN_PASSWORD = Admin@123
```

### Google AdSense (Optional - add your ID later)
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID = ca-pub-XXXXXXXXXXXXXXXX
```

## Step 3: Save and Redeploy

1. Click **"Save"**
2. Go to **"Deployments"** tab
3. Click **"Redeploy this version"** on the latest build

## Step 4: Create DynamoDB Tables

Before the app works, you need to create the DynamoDB tables:

### Option 1: AWS Console (Recommended)

1. Go to: https://console.aws.amazon.com/dynamodb
2. Click **"Create table"**
3. Table 1:
   - Name: `nebbulon-news-articles`
   - Partition key: `_id` (String)
   - Click "Create table"
4. Table 2:
   - Name: `nebbulon-admins`
   - Partition key: `_id` (String)
   - Click "Create table"

### Option 2: Using AWS CLI

```bash
aws dynamodb create-table \
    --table-name nebbulon-news-articles \
    --attribute-definitions AttributeName=_id,AttributeType=S \
    --key-schema AttributeName=_id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1

aws dynamodb create-table \
    --table-name nebbulon-admins \
    --attribute-definitions AttributeName=_id,AttributeType=S \
    --key-schema AttributeName=_id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region us-east-1
```

## Step 5: Create S3 Bucket

1. Go to: https://console.aws.amazon.com/s3
2. Click **"Create bucket"**
3. Bucket name: `nebbulon-news-images`
4. Region: `us-east-1`
5. **Uncheck** "Block all public access"
6. Acknowledge the warning
7. Click **"Create bucket"**

### Configure Bucket Policy

1. Click on the bucket
2. Go to **"Permissions"** tab
3. Scroll to **"Bucket policy"**
4. Click **"Edit"** and paste:

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

5. Click **"Save changes"**

### Enable CORS

1. Go to **"Permissions"** tab
2. Scroll to **"Cross-origin resource sharing (CORS)"**
3. Click **"Edit"** and paste:

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

4. Click **"Save changes"**

## Step 6: Initialize Admin Account

Once the deployment is successful:

1. Visit: `https://main.d2qztaflooyp3k.amplifyapp.com/api/admin/init`
2. You should see: `{"message":"Admin created successfully","email":"admin@nebbulon.com"}`
3. Login at: `https://main.d2qztaflooyp3k.amplifyapp.com/admin/login`

## Step 7: Test Your Website

1. Homepage: `https://main.d2qztaflooyp3k.amplifyapp.com`
2. Admin Login: `https://main.d2qztaflooyp3k.amplifyapp.com/admin/login`
3. Create your first article!

## Troubleshooting

### Build Still Failing?
- Make sure all environment variables are set
- Check that you pushed the latest code
- Review build logs in Amplify Console

### Can't Access DynamoDB?
- Verify AWS credentials are correct
- Check table names match exactly
- Ensure tables exist in us-east-1 region

### Images Not Uploading?
- Verify S3 bucket exists
- Check bucket policy is set
- Ensure CORS is configured

## Security Note

⚠️ **IMPORTANT**: The AWS credentials shown here have full access. For production:

1. Create an IAM role with limited permissions
2. Attach the role to Amplify (instead of using access keys)
3. Remove AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from environment variables
4. The app will automatically use the IAM role

See AWS_SETUP.md for detailed instructions on creating an IAM role.

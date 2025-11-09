# AWS Amplify Deployment - Step by Step Guide

## ✅ Current Status
- ✓ Code pushed to GitHub
- ✓ Amplify app created (ID: d2qztaflooyp3k)
- ✗ Build failed - missing AWS resources
- ✗ Environment variables not configured

## 🚀 Fix the Build in 3 Steps

### Step 1: Create DynamoDB Tables (2 minutes)

**Option A: Using AWS Console (Easiest)**

1. Open: https://console.aws.amazon.com/dynamodb/home?region=ap-south-1#tables
2. Click **"Create table"**
3. **Table 1:**
   - Table name: `nebbulon-news-articles`
   - Partition key: `_id` (Type: String)
   - Leave everything else default
   - Click **"Create table"**
4. Click **"Create table"** again
5. **Table 2:**
   - Table name: `nebbulon-admins`
   - Partition key: `_id` (Type: String)
   - Leave everything else default
   - Click **"Create table"**

**Option B: Using Commands (Copy & Paste)**

Open PowerShell and run:

```powershell
aws dynamodb create-table --table-name nebbulon-news-articles --attribute-definitions AttributeName=_id,AttributeType=S --key-schema AttributeName=_id,KeyType=HASH --billing-mode PAY_PER_REQUEST --region ap-south-1

aws dynamodb create-table --table-name nebbulon-admins --attribute-definitions AttributeName=_id,AttributeType=S --key-schema AttributeName=_id,KeyType=HASH --billing-mode PAY_PER_REQUEST --region ap-south-1
```

---

### Step 2: Create S3 Bucket (2 minutes)

**Option A: Using AWS Console (Easiest)**

1. Open: https://s3.console.aws.amazon.com/s3/bucket/create?region=ap-south-1
2. **Bucket name:** `nebbulon-news-images-YOUR-UNIQUE-ID` (must be globally unique)
3. **Region:** Asia Pacific (Mumbai) ap-south-1
4. **Block Public Access:** UNCHECK "Block all public access"
5. Check the acknowledgment box
6. Click **"Create bucket"**

**Configure the bucket:**

1. Click on your bucket name
2. Go to **"Permissions"** tab
3. Scroll to **"Bucket policy"**, click **"Edit"**
4. Paste this (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

5. Click **"Save changes"**
6. Scroll to **"CORS"**, click **"Edit"**
7. Paste this:

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

8. Click **"Save changes"**

**Option B: Using Commands**

```powershell
# Create bucket (change name if it exists)
aws s3 mb s3://nebbulon-news-images --region ap-south-1

# Create policy file
echo '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":"*","Action":"s3:GetObject","Resource":"arn:aws:s3:::nebbulon-news-images/*"}]}' > bucket-policy.json

# Apply policy
aws s3api put-bucket-policy --bucket nebbulon-news-images --policy file://bucket-policy.json

# Create CORS file
echo '[{"AllowedHeaders":["*"],"AllowedMethods":["GET","PUT","POST","DELETE"],"AllowedOrigins":["*"],"ExposeHeaders":[]}]' > cors.json

# Apply CORS
aws s3api put-bucket-cors --bucket nebbulon-news-images --cors-configuration file://cors.json
```

---

### Step 3: Configure Amplify Environment Variables (3 minutes)

1. Open: https://console.aws.amazon.com/amplify/home?region=us-east-1#/d2qztaflooyp3k/settings/variables
2. Click **"Manage variables"**
3. Add these variables (click "Add variable" for each):

| Key | Value |
|-----|-------|
| `AWS_REGION` | `ap-south-1` |
| `AWS_ACCESS_KEY_ID` | `your-aws-access-key-id` |
| `AWS_SECRET_ACCESS_KEY` | `your-aws-secret-access-key` |
| `DYNAMODB_TABLE_NEWS` | `nebbulon-news-articles` |
| `DYNAMODB_TABLE_ADMINS` | `nebbulon-admins` |
| `S3_BUCKET_NAME` | `nebbulon-news-images` (or your bucket name) |
| `NEXTAUTH_URL` | `https://main.d2qztaflooyp3k.amplifyapp.com` |
| `NEXTAUTH_SECRET` | Generate one below ⬇️ |
| `ADMIN_EMAIL` | `admin@nebbulon.com` |
| `ADMIN_PASSWORD` | `Admin@123` |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | `ca-pub-XXXXXXXXXXXXXXXX` |

**Generate NEXTAUTH_SECRET:**

Run this in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and use it as the value for `NEXTAUTH_SECRET`.

4. Click **"Save"**

---

### Step 4: Redeploy (1 minute)

1. Go to: https://console.aws.amazon.com/amplify/home?region=us-east-1#/d2qztaflooyp3k/deployments
2. Find the latest deployment
3. Click **"Redeploy this version"**
4. Wait 2-3 minutes for the build to complete

---

### Step 5: Initialize Admin & Test (1 minute)

Once deployed:

1. **Initialize admin:**
   Visit: `https://main.d2qztaflooyp3k.amplifyapp.com/api/admin/init`
   
   You should see:
   ```json
   {"message":"Admin created successfully","email":"admin@nebbulon.com"}
   ```

2. **Login:**
   Go to: `https://main.d2qztaflooyp3k.amplifyapp.com/admin/login`
   - Email: `admin@nebbulon.com`
   - Password: `Admin@123`

3. **Create your first article!**

---

## 🎉 Done!

Your news website is now live at:
**https://main.d2qztaflooyp3k.amplifyapp.com**

## 📝 Quick Reference

- **App URL:** https://main.d2qztaflooyp3k.amplifyapp.com
- **Admin Login:** https://main.d2qztaflooyp3k.amplifyapp.com/admin/login
- **Amplify Console:** https://console.aws.amazon.com/amplify/home?region=ap-south-1#/d2qztaflooyp3k
- **DynamoDB:** https://console.aws.amazon.com/dynamodb/home?region=ap-south-1
- **S3:** https://s3.console.aws.amazon.com/s3/buckets?region=ap-south-1

## ⚠️ Troubleshooting

**Build still failing?**
- Check all environment variables are set correctly
- Verify DynamoDB tables exist
- Check S3 bucket name matches

**Can't login?**
- Make sure you visited `/api/admin/init` first
- Check DynamoDB tables have data
- Verify NEXTAUTH_SECRET is set

**Images not uploading?**
- Check S3 bucket policy is set
- Verify CORS configuration
- Ensure bucket name in env vars matches actual bucket

## 🔒 Security Note

After everything works, improve security:
1. Create an IAM role for Amplify
2. Remove AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY from env vars
3. Attach the IAM role to your Amplify app

See `AWS_SETUP.md` for detailed instructions.

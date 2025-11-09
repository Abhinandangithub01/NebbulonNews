# Amplify Environment Variables Fix

## Problem
Environment variables are set in Amplify Console but not being loaded by the application.

## Solution

### Step 1: Verify Variables Are Set
Go to: https://console.aws.amazon.com/amplify/home?region=ap-south-1#/d2qztaflooyp3k/settings/variables

Ensure ALL these variables exist:
- NEBBULON_AWS_REGION
- NEBBULON_AWS_ACCESS_KEY_ID  
- NEBBULON_AWS_SECRET_ACCESS_KEY
- DYNAMODB_TABLE_NEWS
- DYNAMODB_TABLE_ADMINS
- S3_BUCKET_NAME
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- ADMIN_EMAIL
- ADMIN_PASSWORD
- NEXT_PUBLIC_ADSENSE_CLIENT_ID

### Step 2: Force Rebuild
After variables are set, you MUST trigger a new build for them to take effect.

**Option A: Redeploy from Console**
1. Go to: https://console.aws.amazon.com/amplify/home?region=ap-south-1#/d2qztaflooyp3k
2. Click "Redeploy this version"

**Option B: Push a change to GitHub**
Make any small change and push to trigger automatic rebuild.

### Step 3: Wait for Build
Wait 2-3 minutes for the build to complete with the new environment variables.

### Step 4: Test
Visit: https://nebbulon.com/api/admin/init

Should return:
```json
{
  "message": "Admin created successfully",
  "email": "admin@nebbulon.com"
}
```

## Important Notes
- Environment variables are ONLY loaded during build time
- Changing variables requires a new deployment
- The app won't see the variables until it's rebuilt

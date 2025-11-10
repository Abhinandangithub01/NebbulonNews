# 🚀 AWS Lambda + S3 Deployment Guide

## **Architecture Overview**

```
┌─────────────────┐
│   CloudFront    │ ← CDN for images
└────────┬────────┘
         │
    ┌────▼─────┐
    │    S3    │ ← Image storage
    └──────────┘

┌─────────────────┐
│  API Gateway    │ ← REST API endpoints
└────────┬────────┘
         │
    ┌────▼─────┐
    │  Lambda  │ ← Serverless functions
    └────┬─────┘
         │
    ┌────▼─────┐
    │ DynamoDB │ ← NoSQL database
    └──────────┘

┌─────────────────┐
│      SES        │ ← Email service
└─────────────────┘
```

---

## **📦 Lambda Functions Created**

### **Articles API:**
1. `getArticles.js` - Get all articles with pagination
2. `getArticleBySlug.js` - Get single article + increment views
3. `searchArticles.js` - Search articles by query
4. `getTrendingArticles.js` - Get trending by views

### **Images API:**
5. `uploadImage.js` - Upload images to S3

### **Newsletter API:**
6. `subscribe.js` - Subscribe to newsletter + send welcome email

### **Comments API:**
7. `addComment.js` - Add comment (pending approval)
8. `getComments.js` - Get approved comments

### **Analytics API:**
9. `trackView.js` - Track article views

---

## **🗄️ DynamoDB Tables**

### **1. Articles Table**
```
Primary Key: _id (String)
GSI: slug-index (slug)
GSI: category-createdAt-index (category, createdAt)
```

### **2. Subscribers Table**
```
Primary Key: email (String)
```

### **3. Comments Table**
```
Primary Key: _id (String)
GSI: articleId-index (articleId, createdAt)
```

### **4. Analytics Table**
```
Primary Key: articleId (String)
Sort Key: timestamp (String)
```

---

## **📝 Prerequisites**

### **1. Install Serverless Framework**
```bash
npm install -g serverless
```

### **2. Configure AWS Credentials**
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter region: ap-south-1
# Enter output format: json
```

### **3. Install Dependencies**
```bash
cd lambda
npm install
```

---

## **🚀 Deployment Steps**

### **Step 1: Deploy Lambda Functions**
```bash
# Deploy to dev environment
serverless deploy --stage dev

# Deploy to production
serverless deploy --stage prod
```

### **Step 2: Note API Gateway URL**
After deployment, you'll see:
```
endpoints:
  GET - https://xxxxxxxx.execute-api.ap-south-1.amazonaws.com/dev/api/articles
  GET - https://xxxxxxxx.execute-api.ap-south-1.amazonaws.com/dev/api/articles/{slug}
  ...
```

### **Step 3: Update Environment Variables**
Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://xxxxxxxx.execute-api.ap-south-1.amazonaws.com/dev
```

### **Step 4: Configure SES (Email Service)**
```bash
# Verify sender email
aws ses verify-email-identity --email-address noreply@nebbulon.com

# Move out of sandbox (for production)
# Request production access in AWS Console > SES
```

### **Step 5: Configure S3 Bucket**
```bash
# Bucket is created automatically by serverless.yml
# CloudFront distribution is also created automatically
```

---

## **🔧 Configuration Files**

### **serverless.yml**
- Defines all Lambda functions
- Creates DynamoDB tables
- Sets up S3 bucket + CloudFront
- Configures IAM permissions
- Sets up API Gateway

### **lambda/package.json**
- Lambda function dependencies
- aws-sdk, uuid

### **lib/api.ts**
- Frontend API client
- Handles all API calls
- Type-safe responses

---

## **🧪 Testing Lambda Functions**

### **Test Locally**
```bash
# Install serverless-offline
npm install --save-dev serverless-offline

# Start local API
serverless offline --stage dev

# API will run on http://localhost:4000
```

### **Test Individual Functions**
```bash
# Invoke function locally
serverless invoke local --function getArticles

# Invoke deployed function
serverless invoke --function getArticles --stage dev
```

### **Test with cURL**
```bash
# Get articles
curl https://your-api-url/api/articles

# Get article by slug
curl https://your-api-url/api/articles/tesla-revolutionary-electric-sedan

# Search articles
curl "https://your-api-url/api/articles/search?q=tesla"

# Subscribe to newsletter
curl -X POST https://your-api-url/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

## **📊 Monitoring & Logs**

### **View Logs**
```bash
# Tail logs in real-time
serverless logs --function getArticles --tail --stage dev

# View recent logs
serverless logs --function getArticles --stage dev
```

### **CloudWatch Metrics**
- Go to AWS Console > CloudWatch
- View Lambda invocations, errors, duration
- Set up alarms for errors

---

## **💰 Cost Estimation**

### **Free Tier (First 12 months):**
- Lambda: 1M requests/month free
- DynamoDB: 25GB storage + 25 WCU/RCU free
- S3: 5GB storage + 20,000 GET requests free
- CloudFront: 50GB data transfer free
- SES: 62,000 emails/month free (from EC2)

### **After Free Tier:**
- Lambda: $0.20 per 1M requests
- DynamoDB: $0.25 per GB/month (on-demand)
- S3: $0.023 per GB/month
- CloudFront: $0.085 per GB
- SES: $0.10 per 1,000 emails

**Estimated Monthly Cost:** $5-20 for small to medium traffic

---

## **🔒 Security Best Practices**

### **1. API Gateway**
- Enable CORS properly
- Add API keys for admin endpoints
- Rate limiting (1000 requests/second)

### **2. Lambda**
- Minimum IAM permissions
- Environment variables for secrets
- VPC for sensitive operations

### **3. S3**
- Public read, private write
- CloudFront for HTTPS
- Versioning enabled
- Lifecycle policies for old images

### **4. DynamoDB**
- Encryption at rest enabled
- Point-in-time recovery
- Backup retention: 7 days

---

## **🔄 CI/CD Pipeline**

### **GitHub Actions Workflow**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          npm install -g serverless
          cd lambda && npm install
      
      - name: Deploy to AWS
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: serverless deploy --stage prod
```

---

## **📱 Frontend Integration**

### **Update Next.js App**
```typescript
// Use API client
import api from '@/lib/api';

// Get articles
const { data } = await api.getArticles({ category: 'tech', limit: 10 });

// Search
const { data } = await api.searchArticles('tesla');

// Subscribe
await api.subscribeNewsletter('user@example.com');

// Add comment
await api.addComment({
  articleId: '123',
  content: 'Great article!',
  author: 'John Doe',
  email: 'john@example.com'
});
```

---

## **🐛 Troubleshooting**

### **Issue: Lambda timeout**
```yaml
# Increase timeout in serverless.yml
provider:
  timeout: 30  # seconds
```

### **Issue: CORS errors**
```javascript
// Ensure headers in Lambda response
headers: {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
}
```

### **Issue: DynamoDB throttling**
```yaml
# Use on-demand billing
BillingMode: PAY_PER_REQUEST
```

---

## **📈 Scaling**

### **Automatic Scaling:**
- Lambda: Scales automatically (up to 1000 concurrent)
- DynamoDB: On-demand scales automatically
- S3: Unlimited storage
- CloudFront: Global CDN

### **Performance Optimization:**
- Enable Lambda ProvisionedConcurrency for critical functions
- Use DynamoDB DAX for caching
- Enable CloudFront compression
- Use S3 Transfer Acceleration

---

## **✅ Deployment Checklist**

- [ ] AWS credentials configured
- [ ] Serverless Framework installed
- [ ] Lambda dependencies installed
- [ ] `serverless.yml` configured
- [ ] Deploy to dev environment
- [ ] Test all API endpoints
- [ ] Configure SES email
- [ ] Update frontend `.env.local`
- [ ] Deploy to production
- [ ] Set up monitoring/alerts
- [ ] Configure CI/CD pipeline

---

## **🎯 Next Steps**

1. Deploy Lambda functions
2. Test API endpoints
3. Integrate with frontend
4. Set up monitoring
5. Configure CI/CD
6. Add authentication (Cognito)
7. Implement caching (ElastiCache)
8. Add search (OpenSearch)

---

**Your serverless backend is ready to scale! 🚀**

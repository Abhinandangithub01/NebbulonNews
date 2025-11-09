# PowerShell script to set up all AWS resources for Nebbulon News
# Run this script to create DynamoDB tables and S3 bucket

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Nebbulon News - AWS Resources Setup  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$REGION = "ap-south-1"
$TABLE_NEWS = "nebbulon-news-articles"
$TABLE_ADMINS = "nebbulon-admins"
$BUCKET_NAME = "nebbulon-news-images"

# Check if AWS CLI is installed
Write-Host "Checking AWS CLI..." -ForegroundColor Yellow
try {
    $awsVersion = aws --version
    Write-Host "✓ AWS CLI found: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ AWS CLI not found. Please install it from: https://aws.amazon.com/cli/" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Creating DynamoDB Tables..." -ForegroundColor Yellow
Write-Host ""

# Create News Articles Table
Write-Host "1. Creating table: $TABLE_NEWS" -ForegroundColor Cyan
try {
    aws dynamodb create-table `
        --table-name $TABLE_NEWS `
        --attribute-definitions AttributeName=_id,AttributeType=S `
        --key-schema AttributeName=_id,KeyType=HASH `
        --billing-mode PAY_PER_REQUEST `
        --region $REGION | Out-Null
    Write-Host "   ✓ Table created successfully" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ Table might already exist or error occurred" -ForegroundColor Yellow
}

# Create Admins Table
Write-Host "2. Creating table: $TABLE_ADMINS" -ForegroundColor Cyan
try {
    aws dynamodb create-table `
        --table-name $TABLE_ADMINS `
        --attribute-definitions AttributeName=_id,AttributeType=S `
        --key-schema AttributeName=_id,KeyType=HASH `
        --billing-mode PAY_PER_REQUEST `
        --region $REGION | Out-Null
    Write-Host "   ✓ Table created successfully" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ Table might already exist or error occurred" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Waiting for tables to become active..." -ForegroundColor Yellow
aws dynamodb wait table-exists --table-name $TABLE_NEWS --region $REGION
aws dynamodb wait table-exists --table-name $TABLE_ADMINS --region $REGION
Write-Host "✓ Tables are active" -ForegroundColor Green

Write-Host ""
Write-Host "Creating S3 Bucket..." -ForegroundColor Yellow
Write-Host ""

# Create S3 Bucket
Write-Host "3. Creating bucket: $BUCKET_NAME" -ForegroundColor Cyan
try {
    aws s3 mb s3://$BUCKET_NAME --region $REGION
    Write-Host "   ✓ Bucket created successfully" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ Bucket might already exist or error occurred" -ForegroundColor Yellow
}

# Create bucket policy file
$policyContent = "{`"Version`":`"2012-10-17`",`"Statement`":[{`"Sid`":`"PublicReadGetObject`",`"Effect`":`"Allow`",`"Principal`":`"*`",`"Action`":`"s3:GetObject`",`"Resource`":`"arn:aws:s3:::$BUCKET_NAME/*`"}]}"
$policyContent | Out-File -FilePath "bucket-policy.json" -Encoding utf8 -NoNewline

# Apply bucket policy
Write-Host "4. Applying bucket policy..." -ForegroundColor Cyan
try {
    aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file://bucket-policy.json
    Write-Host "   ✓ Bucket policy applied" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ Error applying bucket policy" -ForegroundColor Yellow
}

# Create CORS configuration
$corsContent = "[{`"AllowedHeaders`":[`"*`"],`"AllowedMethods`":[`"GET`",`"PUT`",`"POST`",`"DELETE`"],`"AllowedOrigins`":[`"*`"],`"ExposeHeaders`":[]}]"
$corsContent | Out-File -FilePath "cors-config.json" -Encoding utf8 -NoNewline

# Apply CORS configuration
Write-Host "5. Applying CORS configuration..." -ForegroundColor Cyan
try {
    aws s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file://cors-config.json
    Write-Host "   ✓ CORS configuration applied" -ForegroundColor Green
} catch {
    Write-Host "   ⚠ Error applying CORS configuration" -ForegroundColor Yellow
}

# Clean up temporary files
Remove-Item "bucket-policy.json" -ErrorAction SilentlyContinue
Remove-Item "cors-config.json" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "           Setup Complete!              " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Resources created:" -ForegroundColor Yellow
Write-Host "  ✓ DynamoDB Table: $TABLE_NEWS" -ForegroundColor Green
Write-Host "  ✓ DynamoDB Table: $TABLE_ADMINS" -ForegroundColor Green
Write-Host "  ✓ S3 Bucket: $BUCKET_NAME" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Configure environment variables in AWS Amplify" -ForegroundColor White
Write-Host "  2. Redeploy your application" -ForegroundColor White
Write-Host "  3. Visit /api/admin/init to create admin account" -ForegroundColor White
Write-Host ""
Write-Host "See amplify-env-setup.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""

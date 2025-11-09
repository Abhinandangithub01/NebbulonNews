# PowerShell script to create DynamoDB tables

Write-Host "Creating DynamoDB tables..." -ForegroundColor Green

# Create News Articles Table
aws dynamodb create-table `
    --table-name nebbulon-news-articles `
    --attribute-definitions AttributeName=_id,AttributeType=S `
    --key-schema AttributeName=_id,KeyType=HASH `
    --billing-mode PAY_PER_REQUEST `
    --region us-east-1

# Create Admins Table
aws dynamodb create-table `
    --table-name nebbulon-admins `
    --attribute-definitions AttributeName=_id,AttributeType=S `
    --key-schema AttributeName=_id,KeyType=HASH `
    --billing-mode PAY_PER_REQUEST `
    --region us-east-1

Write-Host "Tables created! Waiting for them to become active..." -ForegroundColor Yellow
aws dynamodb wait table-exists --table-name nebbulon-news-articles --region us-east-1
aws dynamodb wait table-exists --table-name nebbulon-admins --region us-east-1
Write-Host "Done! Tables are ready." -ForegroundColor Green

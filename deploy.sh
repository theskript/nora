#!/bin/bash

# Deployment script for Nora's Birthday Website
# This script syncs the website to S3

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎂 Deploying Nora's Birthday Website...${NC}\n"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed.${NC}"
    echo -e "${BLUE}Please install it first:${NC}"
    echo "brew install awscli"
    echo "or visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Set your S3 bucket name here
S3_BUCKET="nora-birthday"

# Sync files to S3
echo -e "${BLUE}📤 Syncing files to S3 bucket: ${S3_BUCKET}...${NC}\n"

aws s3 sync . s3://${S3_BUCKET} \
    --exclude ".git/*" \
    --exclude "*.md" \
    --exclude ".DS_Store" \
    --exclude "deploy.sh" \
    --delete \
    --acl public-read

# Check if sync was successful
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🎉 Website is live!${NC}\n"
    
    # If using CloudFront, uncomment the line below and add your distribution ID
    # echo -e "${BLUE}Invalidating CloudFront cache...${NC}"
    # aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
else
    echo -e "\n${RED}❌ Deployment failed!${NC}"
    exit 1
fi

echo -e "${BLUE}Website URL: http://${S3_BUCKET}.s3-website-us-east-1.amazonaws.com${NC}"
echo -e "${BLUE}(Update region in URL if your bucket is in a different region)${NC}\n"

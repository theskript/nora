#!/bin/bash

# Quick AWS Configuration and Deployment Script

echo "🎂 Nora Birthday Website Deployment"
echo "===================================="
echo ""
echo "AWS CLI is installed, but credentials need to be configured."
echo ""
echo "Please run the following command to configure AWS:"
echo ""
echo "  /Users/ahmed.rahim/Library/Python/3.13/bin/aws configure"
echo ""
echo "You will need:"
echo "  1. AWS Access Key ID"
echo "  2. AWS Secret Access Key"
echo "  3. Default region (e.g., us-east-1)"
echo "  4. Default output format (json)"
echo ""
echo "After configuring, run this script again to deploy."
echo ""

# Check if credentials exist
if [ -f ~/.aws/credentials ]; then
    echo "✅ AWS credentials found! Deploying..."
    echo ""
    
    # Add aws to PATH for this session
    export PATH="/Users/ahmed.rahim/Library/Python/3.13/bin:$PATH"
    
    # Deploy to S3
    aws s3 sync . s3://nora-birthday \
        --exclude ".git/*" \
        --exclude "*.md" \
        --exclude ".DS_Store" \
        --exclude "deploy.sh" \
        --exclude "configure-and-deploy.sh" \
        --delete \
        --acl public-read
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Deployment successful! 🎉"
        echo ""
        echo "Your website is live at:"
        echo "http://nora-birthday.s3-website-us-east-1.amazonaws.com"
        echo "(Update region if your bucket is in a different region)"
    else
        echo ""
        echo "❌ Deployment failed. Check the error messages above."
    fi
else
    echo "⚠️  AWS credentials not found."
    echo ""
    echo "To configure now, run:"
    echo ""
    echo "  /Users/ahmed.rahim/Library/Python/3.13/bin/aws configure"
    echo ""
    echo "Or add this to your ~/.zshrc for easier access:"
    echo ""
    echo "  export PATH=\"/Users/ahmed.rahim/Library/Python/3.13/bin:\$PATH\""
    echo ""
    echo "Then you can just run: aws configure"
fi

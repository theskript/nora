# Deployment Guide

## ✅ Git Changes Committed and Pushed

All changes have been committed to git with the following message:
```
Add hybrid/Zoom RSVP option, 12-month photo gallery, birthday effects, and calendar invites
```

Changes pushed to: `https://github.com/theskript/nora`

## 🚀 S3 Deployment

### Prerequisites

1. **Install AWS CLI** (if not already installed):
   ```bash
   brew install awscli
   ```
   Or download from: https://aws.amazon.com/cli/

2. **Configure AWS credentials**:
   ```bash
   aws configure
   ```
   You'll need:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region (e.g., `us-east-1`)

### Deployment Steps

#### Option 1: Use the Deploy Script (Recommended)

```bash
./deploy.sh
```

This will automatically:
- Sync all website files to S3
- Exclude unnecessary files (.git, .md files, etc.)
- Set files to public-read
- Display the website URL

#### Option 2: Manual S3 Sync

```bash
aws s3 sync . s3://nora-birthday \
    --exclude ".git/*" \
    --exclude "*.md" \
    --exclude ".DS_Store" \
    --delete \
    --acl public-read
```

### S3 Bucket Configuration

If you haven't set up the S3 bucket yet:

1. **Create the bucket**:
   ```bash
   aws s3 mb s3://nora-birthday --region us-east-1
   ```

2. **Enable static website hosting**:
   ```bash
   aws s3 website s3://nora-birthday --index-document index.html --error-document index.html
   ```

3. **Set bucket policy for public access**:
   
   Create a file `bucket-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::nora-birthday/*"
       }
     ]
   }
   ```
   
   Apply it:
   ```bash
   aws s3api put-bucket-policy --bucket nora-birthday --policy file://bucket-policy.json
   ```

4. **Disable Block Public Access**:
   ```bash
   aws s3api put-public-access-block \
     --bucket nora-birthday \
     --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"
   ```

### Website URL

After deployment, your website will be available at:
```
http://nora-birthday.s3-website-us-east-1.amazonaws.com
```

*(Replace `us-east-1` with your actual region if different)*

### Optional: CloudFront CDN

For better performance and custom domain:

1. Create a CloudFront distribution pointing to your S3 bucket
2. Add your custom domain (if you have one)
3. Update the deploy script with your CloudFront distribution ID to invalidate cache on deploy

## 📝 Post-Deployment Checklist

- [ ] Test the website URL
- [ ] Submit a test RSVP to verify form works
- [ ] Check that calendar invite downloads
- [ ] Test Zoom link (update with actual link in `script.js`)
- [ ] Verify all 12 photos display correctly
- [ ] Test confetti and balloon effects
- [ ] Test on mobile devices
- [ ] Share the link with guests!

## 🔄 Future Updates

To deploy future changes:

1. Make your changes to the code
2. Commit and push to git:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
3. Deploy to S3:
   ```bash
   ./deploy.sh
   ```

## 🆘 Troubleshooting

**AWS CLI not found?**
- Install it with `brew install awscli`

**Permission denied?**
- Run `chmod +x deploy.sh` to make the script executable

**Access denied errors?**
- Check your AWS credentials with `aws sts get-caller-identity`
- Verify bucket permissions

**Website not loading?**
- Check bucket policy is set correctly
- Verify static website hosting is enabled
- Check the bucket region matches the URL

---

Need help? Contact: info@theskript.com 🎂

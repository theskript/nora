# HTTPS Setup Guide for Nora's Birthday Website

## Current Situation

Your website is deployed at:
**http://nora-birthday.s3-website-us-east-1.amazonaws.com** (HTTP only)

AWS S3 static websites only support HTTP. To enable HTTPS, you need to use CloudFront.

## ⚠️ Account Verification Required

Your AWS account needs to be verified before you can create CloudFront distributions. 

### To Verify Your Account:

1. Go to AWS Support Center: https://console.aws.amazon.com/support/home
2. Create a support case
3. Mention you need CloudFront access
4. Include this error message: "Your account must be verified before you can add new CloudFront resources"

This usually takes 1-2 business days.

## Option 1: Use AWS Console (Easiest)

Once your account is verified:

1. **Go to CloudFront Console**: https://console.aws.amazon.com/cloudfront/
2. Click **Create Distribution**
3. **Origin Settings**:
   - Origin Domain: `nora-birthday.s3-website-us-east-1.amazonaws.com`
   - Protocol: HTTP only
   - Name: `S3-nora-birthday`
4. **Default Cache Behavior**:
   - Viewer Protocol Policy: **Redirect HTTP to HTTPS**
   - Allowed HTTP Methods: GET, HEAD
   - Compress Objects: Yes
5. **Settings**:
   - Price Class: Use Only North America and Europe
   - Default Root Object: `index.html`
6. Click **Create Distribution**
7. Wait 10-15 minutes for deployment

Your HTTPS URL will be: `https://[random-id].cloudfront.net`

## Option 2: Use AWS CLI (After Verification)

Once verified, run:

```bash
export PATH="/Users/ahmed.rahim/Library/Python/3.13/bin:$PATH"

aws cloudfront create-distribution \
  --origin-domain-name nora-birthday.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html \
  --comment "Nora Birthday Website" \
  --enabled
```

Or use the prepared config file:
```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## Option 3: Quick Alternative - Use Netlify (Free HTTPS)

If you need HTTPS immediately and don't want to wait for AWS verification:

1. **Create Netlify Account**: https://app.netlify.com/signup (free)

2. **Deploy via drag-and-drop**:
   - Go to https://app.netlify.com/drop
   - Drag the entire `/Users/ahmed.rahim/VSCode/nora` folder
   - Netlify will give you an HTTPS URL instantly

3. **Or deploy via Git** (recommended):
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   cd /Users/ahmed.rahim/VSCode/nora
   netlify deploy --prod
   ```

Your site will be at: `https://[random-name].netlify.app`

## Option 4: Custom Domain with HTTPS

If you have a custom domain (e.g., norabirthday.com):

1. **Using CloudFront** (after verification):
   - Request SSL certificate in AWS Certificate Manager (ACM)
   - Add custom domain to CloudFront distribution
   - Update DNS records to point to CloudFront

2. **Using Netlify** (immediate):
   - Add custom domain in Netlify dashboard
   - Update DNS records
   - HTTPS enabled automatically (Let's Encrypt)

## Recommended: Netlify for Now

Since AWS needs verification, I recommend:

1. Deploy to Netlify now for immediate HTTPS
2. Later migrate to CloudFront if needed (better AWS integration)

### Quick Netlify Deploy:

```bash
# If you have Node.js installed
npm install -g netlify-cli
netlify login
cd /Users/ahmed.rahim/VSCode/nora
netlify deploy --prod
```

The site will be live on HTTPS in seconds!

## After CloudFront is Set Up

When you get your CloudFront distribution working, you'll need to invalidate cache when you update:

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

---

**Current Status**: Your site is live at HTTP. For HTTPS, either:
- ✅ Wait for AWS verification + use CloudFront (1-2 days)
- ✅ Use Netlify immediately (takes 2 minutes)

Let me know which option you'd like to pursue!

# Webhook Setup Guide: Strapi → Vercel

This guide explains how to set up webhooks from Strapi CMS to automatically trigger Vercel rebuilds when content is published or updated.

## Overview

When you publish or update content in Strapi, a webhook will automatically trigger a new Vercel deployment. This ensures:
- ✅ Fresh content appears immediately after publishing
- ✅ All pages are statically generated for optimal SEO
- ✅ Fast page loads from CDN
- ✅ No manual deployment needed

## Prerequisites

- Strapi CMS instance
- Vercel project connected to your Git repository
- Access to Vercel project settings
- Access to Strapi admin panel

## Step 1: Create Vercel Deploy Hook

**Recommended Method (Simplest):**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Git** → **Deploy Hooks**
3. Click **Create Hook**
4. Name it: `strapi-webhook` (or any name you prefer)
5. Select branch: `main` (or your default branch)
6. Click **Create Hook**
7. **Copy the hook URL** - you'll need this for Strapi

The URL will look like:
```
https://api.vercel.com/v1/integrations/deploy/xxxxx/yyyyy
```

## Step 2: Set Environment Variables

### In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

   - **`WEBHOOK_SECRET`**: A secure random string (generate with: `openssl rand -hex 32`)
     - This prevents unauthorized webhook calls
     - Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

   - **`VERCEL_DEPLOY_HOOK_URL`**: The deploy hook URL from Step 1
     - Example: `https://api.vercel.com/v1/integrations/deploy/xxxxx/yyyyy`

3. Make sure to add these for **Production**, **Preview**, and **Development** environments (or just Production if you prefer)

### Alternative: Using Vercel API (if deploy hooks don't work)

If you prefer using the Vercel API directly, set these instead:

- **`VERCEL_TOKEN`**: Your Vercel API token
  - Get it from: **Settings** → **Tokens** → **Create Token**
  - Give it "Full Account" scope

- **`VERCEL_PROJECT_ID`**: Your Vercel project ID
  - Found in **Settings** → **General** → **Project ID**

- **`VERCEL_TEAM_ID`** (optional): Only if you're using Vercel teams
  - Found in team settings

## Step 3: Configure Strapi Webhook

1. Log in to your Strapi admin panel
2. Go to **Settings** → **Webhooks**
3. Click **Create new webhook**
4. Configure the webhook:

   **Name**: `Trigger Vercel Deployment` (or any name)

   **URL**:
   ```
   https://your-domain.com/api/webhook/vercel
   ```
   Replace `your-domain.com` with your actual Vercel deployment URL.

   **Events**: Select the events that should trigger a rebuild:
   - ✅ `entry.create` - When new content is created
   - ✅ `entry.update` - When content is updated
   - ✅ `entry.publish` - When content is published (recommended)
   - ✅ `entry.unpublish` - When content is unpublished
   - ⚠️ `entry.delete` - Optional, only if you want rebuilds on deletion

   **Headers**: Add a custom header for security:
   - **Key**: `x-webhook-secret`
   - **Value**: The same `WEBHOOK_SECRET` value you set in Vercel

   **Status**: Enable the webhook

5. Click **Save**

## Step 4: Test the Webhook

1. In Strapi, create or update a piece of content (news, event, person, etc.)
2. Publish the content
3. Check your Vercel dashboard - you should see a new deployment triggered
4. Wait for the deployment to complete (usually 1-3 minutes)
5. Visit your site - the new content should be visible

## Troubleshooting

### Webhook not triggering deployments

1. **Check Vercel logs**:
   - Go to **Deployments** tab in Vercel
   - Check if the webhook endpoint is being called
   - Look for any error messages

2. **Verify environment variables**:
   - Ensure `WEBHOOK_SECRET` matches in both Vercel and Strapi
   - Ensure `VERCEL_DEPLOY_HOOK_URL` is set correctly

3. **Check Strapi webhook logs**:
   - In Strapi admin, go to **Settings** → **Webhooks**
   - Click on your webhook to see recent delivery attempts
   - Check for any error messages

4. **Test the endpoint manually**:
   ```bash
   curl -X POST https://your-domain.com/api/webhook/vercel \
     -H "Content-Type: application/json" \
     -H "x-webhook-secret: your-secret-here" \
     -d '{"event":"entry.publish","model":"news"}'
   ```

### Deployment takes too long

- This is normal for static site generation
- Builds typically take 1-3 minutes
- Consider using Vercel's "Deploy Hooks" for faster triggering

### Content not appearing after deployment

1. Check that the content is **published** in Strapi (not just saved as draft)
2. Verify the build completed successfully in Vercel
3. Check that `publicationState=live` is used in all API calls (already configured)
4. Clear your browser cache or test in incognito mode

## Security Best Practices

1. **Always use `WEBHOOK_SECRET`**: Never expose your webhook endpoint without authentication
2. **Use HTTPS**: Always use HTTPS for webhook URLs
3. **Limit webhook events**: Only enable events you actually need
4. **Monitor webhook calls**: Regularly check Vercel logs for suspicious activity

## How It Works

1. **Content Update**: You publish/update content in Strapi
2. **Webhook Trigger**: Strapi sends HTTP POST to `/api/webhook/vercel`
3. **Security Check**: Endpoint verifies `x-webhook-secret` header
4. **Deployment Trigger**: Endpoint calls Vercel API or deploy hook
5. **Build Process**: Vercel rebuilds your site with fresh content
6. **Static Generation**: All pages are prerendered at build time
7. **CDN Deployment**: New static pages are deployed to Vercel's CDN
8. **Content Live**: Updated content is now visible on your site

## Benefits of This Approach

- **SEO Optimized**: Fully static HTML pages are perfect for search engines
- **Fast Performance**: Pages served from CDN edge locations worldwide
- **Cost Effective**: No server costs, only build minutes
- **Automatic Updates**: No manual deployment needed
- **Reliable**: Webhook ensures content updates trigger rebuilds

## Additional Notes

- The `/publications` page remains dynamic (not prerendered) due to external HAL API integration
- All other pages are statically generated at build time
- Builds are triggered automatically, but you can also trigger manually from Vercel dashboard
- Consider setting up monitoring/notifications for failed deployments


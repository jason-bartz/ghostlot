# GhostLot Demo - Deployment Guide

This document provides instructions for deploying the GhostLot demo to various hosting platforms.

## Build for Production

Before deploying, create an optimized production build:

```bash
npm run build
```

This will create a `build` directory with optimized files ready for deployment.

## Deployment Options

### Option 1: Netlify (Recommended)

Netlify offers the simplest deployment experience with continuous deployment options.

#### Option 1A: Netlify CLI

1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy your site:
   ```bash
   netlify deploy
   ```

4. Follow the prompts, selecting the `build` directory when asked for the publish directory.

5. When you're satisfied with the preview, deploy to production:
   ```bash
   netlify deploy --prod
   ```

#### Option 1B: Netlify Git Integration

1. Push your project to a Git repository (GitHub, GitLab, or Bitbucket).
2. Log in to [Netlify](https://app.netlify.com/).
3. Click "New site from Git" and select your repository.
4. Set build command to `npm run build` and publish directory to `build`.
5. Click "Deploy site".

Netlify will automatically redeploy when you push changes to your repository.

### Option 2: Vercel

Vercel is another excellent platform for React applications.

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy your application:
   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment.

4. For production deployment:
   ```bash
   vercel --prod
   ```

Alternatively, you can use Vercel's Git integration for continuous deployment.

### Option 3: GitHub Pages

1. Add `homepage` field to your `package.json`:
   ```json
   "homepage": "https://your-username.github.io/ghostlot-demo"
   ```

2. Install GitHub Pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     ...
   }
   ```

4. Deploy the application:
   ```bash
   npm run deploy
   ```

### Option 4: AWS Amplify

AWS Amplify is a great option for more complex applications or those requiring additional AWS services.

1. Install and configure the AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. Initialize Amplify in your project:
   ```bash
   amplify init
   ```

3. Add hosting:
   ```bash
   amplify add hosting
   ```

4. Publish the site:
   ```bash
   amplify publish
   ```

## Environment Variables

If you need to use environment variables (API keys, etc.), create a `.env` file in the root directory:

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your_api_key
```

Make sure to add `.env` to your `.gitignore` file to avoid exposing sensitive information.

## Custom Domain Setup

### Netlify Custom Domain

1. Go to your site's dashboard on Netlify.
2. Navigate to "Domain settings".
3. Click "Add custom domain".
4. Follow the instructions to configure DNS settings.

### Vercel Custom Domain

1. Go to your site's dashboard on Vercel.
2. Navigate to "Settings" > "Domains".
3. Add your domain and follow the instructions.

## Post-Deployment Checks

After deploying, verify that:

- The site loads correctly
- All links and navigation work properly
- Forms and interactive elements function as expected
- Mobile responsiveness works correctly

## Troubleshooting

### Build Errors

If you encounter build errors:

1. Check your Node.js version (v14+ recommended).
2. Ensure all dependencies are installed: `npm install`.
3. Check for errors in your code.
4. Look for specific error messages in the build output.

### Runtime Errors

If the site deploys but doesn't function correctly:

1. Open browser developer tools to check for console errors.
2. Verify that all API endpoints are accessible from your deployed site.
3. Check that environment variables are properly configured.

## Need Help?

If you encounter issues deploying the GhostLot demo, please create an issue in the GitHub repository or contact support at support@refraction.dev.

---

*This deployment guide is for the demo version of GhostLot. Production deployments would include additional security, scalability, and monitoring considerations.*

# Deployment Guide

This guide covers deploying TrimToolsHub to various platforms.

## 🚀 Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account
- Domain (optional)

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Ensure all environment variables are documented in `.env.example`

### Step 2: Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Environment Variables
Add these in Vercel project settings:
```
VITE_SITE_URL=https://yourdomain.vercel.app
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxx
VITE_ENABLE_ADS=true
```

### Step 4: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `VITE_SITE_URL` environment variable

## 🌐 Netlify

### Step 1: Build Settings
```yaml
Build command: npm run build
Publish directory: dist
```

### Step 2: Environment Variables
Add in Netlify dashboard:
```
VITE_SITE_URL=https://yourdomain.netlify.app
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxx
VITE_ENABLE_ADS=true
```

### Step 3: Redirects
Create `public/_redirects`:
```
/*    /index.html   200
```

## 🔧 Manual Deployment

### Step 1: Build
```bash
npm run build
```

### Step 2: Upload
Upload the `dist` folder to your hosting provider:
- **Apache**: Upload to `public_html`
- **Nginx**: Upload to web root
- **CDN**: Upload to bucket/container

### Step 3: Server Configuration

#### Apache (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

#### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔐 Environment Variables

### Required
- `VITE_SITE_URL` - Your website URL

### Optional
- `VITE_GA_MEASUREMENT_ID` - Google Analytics ID
- `VITE_ADSENSE_CLIENT` - AdSense client ID
- `VITE_ENABLE_ADS` - Enable/disable ads (true/false)

### Development
Copy `.env.example` to `.env.local` and update values:
```bash
cp .env.example .env.local
```

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck
```

### CDN Configuration
- Enable gzip compression
- Set proper cache headers
- Use a CDN for static assets

### Image Optimization
- Use WebP format when possible
- Implement lazy loading
- Optimize image sizes

## 🔍 SEO Setup

### Sitemap
The build process automatically generates:
- `sitemap.xml` - All pages and tools
- `robots.txt` - Search engine instructions

### Meta Tags
Each page includes:
- Dynamic title and description
- Open Graph tags
- Twitter Cards
- JSON-LD structured data

### Analytics
- Google Analytics 4 integration
- Page view tracking
- Route change monitoring

## 🚨 Troubleshooting

### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables
- Ensure all required variables are set
- Check variable names (case-sensitive)
- Verify values are correct

### Routing Issues
- Ensure server is configured for SPA routing
- Check that all routes redirect to `index.html`

### Performance Issues
- Enable gzip compression
- Set proper cache headers
- Use a CDN
- Optimize images and assets

## 📈 Monitoring

### Health Checks
- Set up uptime monitoring
- Monitor Core Web Vitals
- Track error rates

### Analytics
- Google Analytics 4
- Search Console
- Performance monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions
The project includes a GitHub Actions workflow for:
- Automated testing
- Build verification
- Deployment to Vercel

### Manual Deployment
```bash
# Build and deploy
npm run build
# Upload dist/ folder to your hosting provider
```

## 📞 Support

If you encounter issues:
- Check the [GitHub Issues](https://github.com/yourusername/trimtoolshub/issues)
- Review the [Documentation](https://trimtoolshub.com/docs)
- Contact: contact@trimkore.com

---

Happy deploying! 🚀

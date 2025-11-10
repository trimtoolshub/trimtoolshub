import fs from 'fs';
import path from 'path';

// TypeScript app routes - no need to import registry data

const baseUrl = 'https://www.trimtoolshub.com';

// Helper function to get file modification time
const getFileModTime = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch (error) {
    // Fallback to current date if file doesn't exist
    return new Date().toISOString().split('T')[0];
  }
};

// Helper function to get the most recent modification time from multiple files
const getMostRecentModTime = (filePaths) => {
  let mostRecent = new Date(0);
  
  for (const filePath of filePaths) {
    try {
      const stats = fs.statSync(filePath);
      if (stats.mtime > mostRecent) {
        mostRecent = stats.mtime;
      }
    } catch (error) {
      // Skip files that don't exist
      continue;
    }
  }
  
  return mostRecent.toISOString().split('T')[0];
};

// Create routes array matching TypeScript app routes
const routes = [
  '/',
  '/pdf',
  '/qr',
  '/barcodes',
  '/cad',
  '/images',
  '/dates',
  '/blog',
  '/privacy',
  '/terms'
];

// Remove duplicates using Set
const uniqueRoutes = [...new Set(routes)];

// All routes are ready (TypeScript app routes)
const readyRoutes = uniqueRoutes;

// Generate sitemap with proper lastmod timestamps
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${readyRoutes.map(route => {
  // Get appropriate lastmod based on route type
  let lastmod;
  if (route === '/') {
    // Homepage: check TypeScript page
    lastmod = getFileModTime('./src/pages/HomePage.tsx');
  } else if (route === '/pdf') {
    lastmod = getFileModTime('./src/pages/PdfPage.tsx');
  } else if (route === '/qr') {
    lastmod = getFileModTime('./src/pages/QrPage.tsx');
  } else if (route === '/barcodes') {
    lastmod = getFileModTime('./src/pages/BarcodesPage.tsx');
  } else if (route === '/cad') {
    lastmod = getFileModTime('./src/pages/CadPage.tsx');
  } else if (route === '/images') {
    lastmod = getFileModTime('./src/pages/ImagesPage.tsx');
  } else if (route === '/dates') {
    lastmod = getFileModTime('./src/pages/DateToolsPage.tsx');
  } else if (route === '/blog') {
    lastmod = getFileModTime('./src/pages/BlogPage.tsx');
  } else if (route === '/privacy') {
    lastmod = getFileModTime('./src/pages/PrivacyPage.tsx');
  } else if (route === '/terms') {
    lastmod = getFileModTime('./src/pages/TermsPage.tsx');
  } else {
    // Fallback: use current date
    lastmod = new Date().toISOString().split('T')[0];
  }
  
  return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}).join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log(`Sitemap generated successfully with ${readyRoutes.length} URLs!`);
console.log('✅ Trailing-slash policy: Consistent no-trailing-slash format');
console.log('✅ Lastmod quality: Using actual file modification times where possible');
import fs from 'fs';
import path from 'path';

// Import the registry data directly
import { toolsRegistry } from '../src/tools/registryData.js';
import { blogPosts } from '../src/data/blogPosts.js';

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

// Create routes array and remove duplicates
const routes = [
  '/',
  '/tools',
  '/blog',
  '/docs',
  '/terms',
  ...toolsRegistry.map(tool => `/tools/${tool.slug}`),
  ...blogPosts.map(post => `/blog/${post.slug}`)
];

// Remove duplicates using Set
const uniqueRoutes = [...new Set(routes)];

// Filter out any routes that might not be ready (placeholder tools)
const readyRoutes = uniqueRoutes.filter(route => {
  // Skip any tools that might be placeholders or not fully implemented
  const toolSlug = route.replace('/tools/', '');
  if (route.startsWith('/tools/') && toolSlug) {
    // Check if this is a real tool by looking at the registry
    const tool = toolsRegistry.find(t => t.slug === toolSlug);
    return tool && tool.name; // Only include tools with proper names
  }
  return true;
});

// Generate sitemap with proper lastmod timestamps
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${readyRoutes.map(route => {
  // Get appropriate lastmod based on route type
  let lastmod;
  if (route === '/') {
    lastmod = getFileModTime('./src/pages/Home.jsx');
  } else if (route === '/tools') {
    lastmod = getFileModTime('./src/pages/AllTools.jsx');
  } else if (route.startsWith('/tools/')) {
    const toolSlug = route.replace('/tools/', '');
    lastmod = getFileModTime(`./src/tools/${toolSlug}/${toolSlug.charAt(0).toUpperCase() + toolSlug.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}.jsx`);
  } else if (route.startsWith('/blog/')) {
    lastmod = getFileModTime('./src/data/blogPosts.js');
  } else {
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
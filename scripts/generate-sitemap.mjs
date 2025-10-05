import fs from 'fs';
import path from 'path';

// Import the registry data directly
import { toolsRegistry } from '../src/tools/registryData.js';
import { blogPosts } from '../src/data/blogPosts.js';

const baseUrl = 'https://www.trimtoolshub.com';

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

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${readyRoutes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log(`Sitemap generated successfully with ${readyRoutes.length} URLs!`);
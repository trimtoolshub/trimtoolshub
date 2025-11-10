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
    // Homepage: check multiple files that affect it
    lastmod = getMostRecentModTime([
      './src/pages/Home.jsx',
      './src/components/Header.jsx',
      './src/components/Footer.jsx',
      './src/styles/home-modern.css'
    ]);
  } else if (route === '/tools') {
    // Tools page: check tools-related files
    lastmod = getMostRecentModTime([
      './src/pages/AllTools.jsx',
      './src/tools/registryData.js',
      './src/tools/registryComponents.jsx'
    ]);
  } else if (route.startsWith('/tools/')) {
    // Tool pages: check individual tool files
    const toolSlug = route.replace('/tools/', '');
    const toolName = toolSlug.charAt(0).toUpperCase() + toolSlug.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    lastmod = getFileModTime(`./src/tools/${toolSlug}/${toolName}.jsx`);
  } else if (route.startsWith('/blog/')) {
    // Blog posts: check blog data file
    lastmod = getFileModTime('./src/data/blogPosts.js');
  } else if (route === '/blog') {
    // Blog hub: check blog-related files
    lastmod = getMostRecentModTime([
      './src/pages/Blog.jsx',
      './src/data/blogPosts.js'
    ]);
  } else {
    // Static pages: use current date
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
import fs from 'fs';
import path from 'path';

// Import the registry data directly
import { toolsRegistry } from '../src/tools/registryData.js';
import { blogPosts } from '../src/data/blogPosts.js';

const baseUrl = 'https://www.trimtoolshub.com';
const routes = [
  '/',
  '/tools',
  '/blog',
  '/docs',
  '/terms',
  ...toolsRegistry.map(tool => `/tools/${tool.slug}`),
  ...blogPosts.map(post => `/blog/${post.slug}`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully!');
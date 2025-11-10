import { Link } from 'react-router-dom';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
}

// Blog posts data - in production, this would come from a CMS or API
const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-merge-pdfs-online',
    title: 'How to Merge PDFs Online for Free',
    description: 'Learn how to merge multiple PDF files into one document using our free online PDF merger. No software installation required.',
    date: '2024-01-15',
    category: 'PDF Tools',
    readTime: '5 min read',
  },
  {
    slug: 'create-qr-codes-for-business',
    title: 'Create QR Codes for Your Business: A Complete Guide',
    description: 'Discover how to create custom QR codes with your logo and branding for marketing campaigns, business cards, and more.',
    date: '2024-01-10',
    category: 'QR Codes',
    readTime: '8 min read',
  },
  {
    slug: 'optimize-images-for-web',
    title: 'How to Optimize Images for Web: Complete Guide',
    description: 'Learn how to compress and optimize images for faster website loading without sacrificing quality.',
    date: '2024-01-05',
    category: 'Image Tools',
    readTime: '6 min read',
  },
  {
    slug: 'view-cad-files-online',
    title: 'View CAD Files Online Without Software',
    description: 'Learn how to view DXF and DWG files directly in your browser without installing expensive CAD software.',
    date: '2024-01-01',
    category: 'CAD Tools',
    readTime: '4 min read',
  },
];

export function BlogPage() {
  const title = 'Blog - Tips, Guides & Tutorials';
  const url = generateCanonicalUrl('/blog');
  const jsonLd = generateJsonLd({
    name: 'TrimToolsHub Blog',
    url: url,
    description: 'Tips, guides, and tutorials for using our free online tools. Learn how to merge PDFs, create QR codes, optimize images, and more.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Tips, guides, and tutorials for using our free online tools. Learn how to merge PDFs, create QR codes, optimize images, and view CAD files."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['blog', 'tutorials', 'guides', 'PDF tips', 'QR code guide', 'image optimization', 'CAD viewer']}
        jsonLd={jsonLd}
      />
      <div className="space-y-10">
        <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">Blog</span>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Tips, Guides & Tutorials</h1>
            <p className="max-w-3xl text-base text-slate-300">
              Learn how to get the most out of our free online tools with helpful guides, tutorials, and tips.
            </p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-brand-accent/40 hover:bg-slate-900/80"
            >
              <div className="mb-4 flex items-center gap-3 text-xs text-slate-400">
                <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <h2 className="mb-2 text-xl font-semibold text-white transition group-hover:text-brand-accent">
                {post.title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-300">{post.description}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent transition hover:gap-3"
              >
                Read more
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}


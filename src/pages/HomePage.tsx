import { Link } from 'react-router-dom';
import { AdSlot } from '../components/ads/AdSlot';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

const featuredTools = [
  {
    to: '/pdf',
    title: 'PDF Tools - Merge, Split, Compress & More',
    description: 'Free PDF tools to merge multiple PDFs, split PDF pages, compress file size, add watermarks, sign documents, extract text with OCR, and convert PDF to Word. All processing happens in your browser for complete privacy.',
    badge: '100% Private',
  },
  {
    to: '/qr',
    title: 'QR Code Generator - Create Custom QR Codes',
    description: 'Generate custom QR codes with your logo, colors, and branding. Create vCard QR codes for contact sharing. Batch generate QR codes from CSV files. Download as PNG, SVG, or PDF.',
    badge: 'Custom Branding',
  },
  {
    to: '/cad',
    title: 'CAD & SketchUp Tools - Viewers & Converters',
    description: 'View and inspect DXF CAD files and SketchUp SKP files directly in your browser. Convert between DWG, DXF, and SKP formats. Toggle layers, measure distances, zoom and pan. Export views as PNG or SVG images. No software installation required.',
    badge: 'Browser-Based',
  },
];

export function HomePage() {
  const title = generatePageTitle('Free PDF Tools, QR Code Generator & CAD Viewer');
  const url = generateCanonicalUrl('/');
  const jsonLd = generateJsonLd({
    name: 'TrimToolsHub',
    url: url,
    description: 'Free online PDF tools, QR code generator, and CAD/SketchUp viewer and converter. All tools run in your browser with complete privacy.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Free online PDF tools, QR code generator, and CAD/SketchUp viewer and converter. Merge, split, compress PDFs. Generate QR codes. View DXF and SKP files. Convert between DWG, DXF, and SKP formats. All tools run in your browser with complete privacy."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['PDF tools', 'QR code generator', 'CAD viewer', 'SketchUp viewer', 'DXF viewer', 'DWG to DXF converter', 'DXF to SKP converter', 'SKP to DXF converter', 'PDF merger', 'PDF splitter', 'PDF compressor', 'free online tools', 'privacy-first tools']}
        jsonLd={jsonLd}
      />
      <div className="space-y-16">
      {/* Slim banner ad above hero */}
      <div className="w-full">
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_HOME_TOP}
          className="min-h-[90px] w-full rounded-2xl bg-slate-950/70 p-2"
          format="auto"
        />
      </div>
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="relative px-6 py-16 sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-grid-small opacity-40" />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_right,_rgba(34,211,238,0.35),_transparent_60%)] lg:block" />
          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
                Simple Tools, Easier Life
              </span>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                Free PDF Tools, QR Code Generator & CAD/SketchUp Viewer
              </h1>
              <p className="text-lg text-slate-300">
                Powerful tools that make your work easier. No complicated software, no downloads, no hassle. 
                Edit PDFs, create QR codes, and view CAD files in seconds—all in your browser. 
                Simple, fast, and completely free. Get things done without the complexity.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/pdf"
                  className="inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/40 transition hover:bg-brand-secondary"
                >
                  Launch PDF Toolkit
                </Link>
                <Link
                  to="/cad"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:text-white"
                >
                  View CAD Files
                </Link>
              </div>
            </div>
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/40 backdrop-blur">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Why Choose TrimToolsHub</h2>
              <p className="mt-4 text-base text-slate-200">
                Tools designed to make your life easier:
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li>• <strong>Super Easy:</strong> Just drag, drop, and done. No learning curve, no confusion.</li>
                <li>• <strong>Instant Access:</strong> Start using tools immediately—no sign-ups or downloads required.</li>
                <li>• <strong>100% Free:</strong> All essential features are free forever, no hidden costs or limits.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {featuredTools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/60 p-8 transition hover:border-brand-accent/40 hover:bg-slate-900/80"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative space-y-4">
              <span className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase text-brand-accent">
                {tool.badge}
              </span>
              <h3 className="text-2xl font-semibold text-white">{tool.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{tool.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent">
                Open tool
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4.5 11.5L11 5M11 5H5.75M11 5V10.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
          <h2 className="text-xl font-semibold text-white">Professional Tools Made Simple</h2>
          <p className="mt-3 text-sm text-slate-300">
            Whether you're a student, professional, or business owner, our tools simplify your daily tasks. 
            Work with PDFs, create QR codes, and handle CAD files effortlessly—all without installing anything. 
            Just open your browser and get things done faster.
          </p>
          <div className="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-4">
              <p className="font-semibold text-brand-accent">PDF Tools</p>
              <p className="mt-2 text-slate-300">Merge, split, compress, watermark, sign, and convert PDFs. Extract text with OCR. Convert PDF to Word format.</p>
            </div>
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-4">
              <p className="font-semibold text-brand-accent">CAD & SketchUp Tools</p>
              <p className="mt-2 text-slate-300">View DXF and SKP files in your browser. Convert between DWG, DXF, and SKP formats. Toggle layers, measure distances, and export views as images.</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Featured sponsor</h2>
          <AdSlot
            slotId={import.meta.env.VITE_ADSENSE_SLOT_HOME_HERO}
            className="mt-4 min-h-[250px] rounded-2xl bg-slate-950/70 p-4"
            format="auto"
          />
        </div>
      </section>
    </div>
    </>
  );
}


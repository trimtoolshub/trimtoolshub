import { Link } from 'react-router-dom';
import { AdSlot } from '../components/ads/AdSlot';

const featuredTools = [
  {
    to: '/pdf',
    title: 'PDF Powerhouse',
    description: 'Merge, split, compress, sign, watermark, and OCR entirely in your browser.',
    badge: 'Private-first',
  },
  {
    to: '/qr',
    title: 'QR & vCard Studio',
    description: 'Generate branded QR codes, batches from CSV, and downloadable contact cards.',
    badge: 'CSV batching',
  },
  {
    to: '/barcodes',
    title: 'Barcode Lab',
    description: 'Create CODE128 & EAN-13 sets with label sheet layouts ready to print.',
    badge: 'Print-ready PDFs',
  },
  {
    to: '/cad',
    title: 'CAD Viewers',
    description: 'Inspect DXF drawings, toggle layers, measure, and export crisp PNG/SVG snapshots.',
    badge: 'Heavy files welcome',
  },
];

export function HomePage() {
  return (
    <div className="space-y-16">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="relative px-6 py-16 sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-grid-small opacity-40" />
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_right,_rgba(34,211,238,0.35),_transparent_60%)] lg:block" />
          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
                Client-side first
              </span>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                File utilities that respect privacy and still pay the bills.
              </h1>
              <p className="text-lg text-slate-300">
                TrimToolsHub keeps your PDFs, CAD drawings, and contact batches in the browser by default. Heavy-duty
                conversions switch to a stateless microservice—perfect for monetizing premium workloads without breaking
                trust.
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
                  Explore CAD Viewers
                </Link>
              </div>
            </div>
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/40 backdrop-blur">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Monetization</h2>
              <p className="mt-4 text-base text-slate-200">
                Enable consented analytics, blend on-page AdSense, and upsell heavy conversions. Cumulative RPM wins
                without sacrificing UX:
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                <li>• Two responsive ad slots per tool page with modal suppression.</li>
                <li>• GA4 & Meta Pixel shape funnel insights after explicit consent.</li>
                <li>• Flagged `/convert` endpoints pave the way for paid power users.</li>
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
          <h2 className="text-xl font-semibold text-white">Heavy conversions, optional revenue stream</h2>
          <p className="mt-3 text-sm text-slate-300">
            Keep DXF and PDF workflows snappy with client-side WebAssembly, then upsell DWG/SKP conversions when users
            hit locked formats. Conversion jobs run statelessly with presigned URLs—perfect for usage-based pricing or
            gating behind higher-intent funnels.
          </p>
          <div className="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-4">
              <p className="font-semibold text-brand-accent">DWG ⇢ DXF/SVG/PNG</p>
              <p className="mt-2 text-slate-300">Queue jobs through `/convert` when users need locked-down AutoCAD exports.</p>
            </div>
            <div className="rounded-2xl border border-brand-accent/20 bg-brand-accent/10 p-4">
              <p className="font-semibold text-brand-accent">SKP ⇢ glTF</p>
              <p className="mt-2 text-slate-300">Hook into licensed converters later; for v1 guide users to OBJ/DAE uploads.</p>
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
  );
}


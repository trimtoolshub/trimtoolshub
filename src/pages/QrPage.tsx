import { AdSlot } from '../components/ads/AdSlot';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

const qrHighlights = [
  {
    title: 'Brand-forward QR codes',
    description: 'Custom colors, gradients, and center logos with accessible contrast checks.',
  },
  {
    title: 'vCard wizard',
    description: 'Guided form with validation, newline sanitization, and instant preview.',
  },
  {
    title: 'Batch CSV mode',
    description: 'Drop in spreadsheets, preview rows, and export label-ready PDFs.',
  },
];

export function QrPage() {
  const title = generatePageTitle('QR & vCard Studio');
  const url = generateCanonicalUrl('/qr');
  const jsonLd = generateJsonLd({
    name: 'QR & vCard Studio',
    url: url,
    description: 'Generate branded QR codes, batches from CSV, and downloadable contact cards.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Generate branded QR codes, batches from CSV, and downloadable contact cards."
        canonical={url}
        ogImage="/og-default.png"
        jsonLd={jsonLd}
      />
      <div className="space-y-12">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">QR & vCard</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Make every scan measurable and monetizable.</h1>
          <p className="max-w-3xl text-base text-slate-300">
            CSV batching, branded QR templates, and analytics hooks give marketers high lifetime value. Tie campaign
            launches to contextual ad slots and surface premium barcode bundles for cross-sell.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_QR_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {qrHighlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-brand-accent/30 bg-brand-accent/10 p-8 text-sm text-slate-200">
        <h2 className="text-xl font-semibold text-white">Next steps</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Wire CSV parsing with PapaParse and parallel generation workers.</li>
          <li>Export PNG/SVG with configurable margins, ECC, and palette validation.</li>
          <li>Emit GA4 events for template selections to inform pricing experiments.</li>
        </ul>
      </section>
    </div>
    </>
  );
}


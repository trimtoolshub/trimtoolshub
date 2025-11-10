import { AdSlot } from '../components/ads/AdSlot';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

const barcodeFeatures = [
  {
    title: 'Multiple Barcode Formats',
    description: 'Generate CODE128, EAN-13, UPC-A, and other popular barcode formats. Render crisp, scannable barcodes with configurable height, quiet zones, and readable text labels.',
  },
  {
    title: 'Print-Ready Label Sheets',
    description: 'Create barcode label sheets compatible with Avery and other standard label templates. Export to print-ready PDF with proper spacing, crop marks, and alignment guides.',
  },
  {
    title: 'Batch Barcode Generation',
    description: 'Upload a CSV file to generate multiple barcodes at once. Perfect for inventory management, product labeling, and retail applications. Validate data and preview before export.',
  },
];

export function BarcodesPage() {
  const title = generatePageTitle('Free Barcode Generator - Create Print-Ready Barcodes');
  const url = generateCanonicalUrl('/barcodes');
  const jsonLd = generateJsonLd({
    name: 'Barcode Generator',
    url: url,
    description: 'Free online barcode generator to create CODE128, EAN-13, and other barcode formats. Generate barcode labels in bulk from CSV. Export print-ready PDF sheets.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Free online barcode generator to create CODE128, EAN-13, and other barcode formats. Generate barcode labels in bulk from CSV files. Export print-ready PDF sheets with proper spacing and crop marks. All barcode generation happens in your browser."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['barcode generator', 'barcode creator', 'CODE128 generator', 'EAN-13 generator', 'barcode labels', 'print barcodes', 'free barcode generator', 'online barcode']}
        jsonLd={jsonLd}
      />
      <div className="space-y-12">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">Barcode Generator</span>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Free Barcode Generator - Create Print-Ready Barcodes</h1>
        <p className="mt-4 max-w-3xl text-base text-slate-300">
          Create professional barcodes in CODE128, EAN-13, UPC-A, and other formats. Generate barcode labels in bulk from CSV files. 
          Export print-ready PDF sheets with proper spacing and crop marks. Perfect for inventory management, product labeling, 
          and retail applications. All barcode generation happens in your browser—completely free and private.
        </p>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_BARCODES_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {barcodeFeatures.map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-sm text-slate-300">
        <h2 className="text-xl font-semibold text-white">Common Use Cases for Barcode Generator</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li><strong>Product Labeling:</strong> Generate EAN-13 or UPC-A barcodes for retail products. Create print-ready labels for inventory management.</li>
          <li><strong>Inventory Management:</strong> Create CODE128 barcodes for internal tracking. Batch generate barcodes from product databases via CSV import.</li>
          <li><strong>Event Management:</strong> Generate unique barcodes for tickets, badges, or access control. Export as PDF for printing on standard label sheets.</li>
          <li><strong>Asset Tracking:</strong> Create barcodes for equipment, tools, or documents. Use batch generation to label multiple items at once.</li>
        </ul>
      </section>
    </div>
    </>
  );
}


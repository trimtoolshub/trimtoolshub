import { AdSlot } from '../components/ads/AdSlot';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

const qrHighlights = [
  {
    title: 'Custom QR Codes with Logo',
    description: 'Create branded QR codes with your logo, custom colors, and gradients. Adjust error correction levels and ensure accessible contrast for better scanning.',
  },
  {
    title: 'vCard QR Code Generator',
    description: 'Generate vCard QR codes for easy contact sharing. Add name, phone, email, website, and more. Perfect for business cards and networking events.',
  },
  {
    title: 'Batch QR Code Generation',
    description: 'Upload a CSV file to generate multiple QR codes at once. Perfect for events, marketing campaigns, and product labeling. Export as PNG, SVG, or PDF.',
  },
];

export function QrPage() {
  const title = generatePageTitle('Free QR Code Generator - Create Custom QR Codes');
  const url = generateCanonicalUrl('/qr');
  const jsonLd = generateJsonLd({
    name: 'QR Code Generator',
    url: url,
    description: 'Free online QR code generator to create custom QR codes with your logo, colors, and branding. Generate vCard QR codes for contact sharing. Batch generate QR codes from CSV files.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Free online QR code generator to create custom QR codes with your logo, colors, and branding. Generate vCard QR codes for contact sharing. Batch generate QR codes from CSV files. Download as PNG, SVG, or PDF."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['QR code generator', 'QR code creator', 'custom QR code', 'vCard QR code', 'QR code with logo', 'batch QR code', 'free QR code generator', 'online QR code']}
        jsonLd={jsonLd}
      />
      <div className="space-y-12">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">QR Code Generator</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Free QR Code Generator - Create Custom QR Codes</h1>
          <p className="max-w-3xl text-base text-slate-300">
            Create custom QR codes with your logo, colors, and branding. Generate vCard QR codes for contact sharing. 
            Batch generate QR codes from CSV files for events and marketing campaigns. Download as PNG, SVG, or PDF. 
            All QR code generation happens in your browser—completely free and private.
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
        <h2 className="text-xl font-semibold text-white">How to Use Our QR Code Generator</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li><strong>Create Custom QR Codes:</strong> Enter your URL, text, or contact information. Customize colors, add your logo, and adjust error correction levels.</li>
          <li><strong>Generate vCard QR Codes:</strong> Fill in contact details to create a vCard QR code that can be scanned to save contact information directly to a phone.</li>
          <li><strong>Batch Generate from CSV:</strong> Upload a CSV file with multiple URLs or text entries to generate multiple QR codes at once.</li>
          <li><strong>Download in Multiple Formats:</strong> Export your QR codes as PNG, SVG, or PDF files for use in print or digital materials.</li>
        </ul>
      </section>
    </div>
    </>
  );
}


import { AdSlot } from '../components/ads/AdSlot';
import { PdfWorkspace } from '../features/pdf/components/PdfWorkspace';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

export function PdfPage() {
  const title = generatePageTitle('Free PDF Tools - Merge, Split, Compress & More');
  const url = generateCanonicalUrl('/pdf');
  const jsonLd = generateJsonLd({
    name: 'PDF Tools',
    url: url,
    description: 'Free online PDF tools to merge, split, compress, watermark, sign, OCR, and convert PDFs. All processing happens in your browser.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Free online PDF tools to merge multiple PDFs, split PDF pages, compress file size, add watermarks, sign documents, extract text with OCR, and convert PDF to Word. All processing happens in your browser for complete privacy."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['PDF merger', 'PDF splitter', 'PDF compressor', 'PDF watermark', 'PDF signer', 'PDF OCR', 'PDF to Word', 'free PDF tools', 'online PDF editor']}
        jsonLd={jsonLd}
      />
      <div className="space-y-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">PDF Tools</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Free PDF Tools - Merge, Split, Compress & More
          </h1>
          <p className="max-w-3xl text-base text-slate-300">
            Use our free online PDF tools to merge multiple PDFs into one, split PDF pages, compress file size, add watermarks, 
            sign documents, extract text with OCR, and convert PDF to Word format. All processing happens entirely in your 
            browser—your files never leave your device, ensuring complete privacy and security.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_PDF_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
        <PdfWorkspace />
      </section>
    </div>
    </>
  );
}


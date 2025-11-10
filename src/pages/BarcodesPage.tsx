import { useState } from 'react';
import { AdSlot } from '../components/ads/AdSlot';
import { RelatedTools } from '../components/related/RelatedTools';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo';

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
  const title = 'Free Barcode Generator - Create Print-Ready Barcodes';
  const url = generateCanonicalUrl('/barcodes');
  const jsonLd = generateJsonLd({
    name: 'Barcode Generator',
    url: url,
    description: 'Free online barcode generator to create CODE128, EAN-13, and other barcode formats. Generate barcode labels in bulk from CSV. Export print-ready PDF sheets.',
  });

  // FAQPage structured data for SEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I create a barcode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Creating a barcode is simple with our free online barcode generator. Select your barcode format (CODE128, EAN-13, UPC-A, etc.), enter your data (product code, number, or text), customize the appearance with height and quiet zone settings, then click "Generate Barcode". Your barcode will appear instantly, and you can download it as PNG or SVG format.',
        },
      },
      {
        '@type': 'Question',
        name: 'What barcode formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support many common barcode formats including CODE128 (alphanumeric), EAN-13 (13-digit product codes), UPC-A (12-digit product codes), EAN-8 (8-digit product codes), CODE39 (alphanumeric), and ITF-14 (14-digit shipping codes). Each format has specific use cases - EAN-13 and UPC-A are for retail products, CODE128 is for internal tracking, and CODE39 is for general alphanumeric data.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I generate barcodes in bulk from CSV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To generate barcodes in bulk, prepare a CSV file with your barcode data. Each row should contain the data you want to encode in the barcode. Upload the CSV file using the batch generation feature, select your barcode format and settings, then click "Generate Barcodes". All barcodes will be generated and bundled into a ZIP file for easy download. Perfect for inventory management and product labeling.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create print-ready barcode label sheets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After generating your barcodes, select the "Export Label Sheet" option. Choose your label template (Avery or custom), set the spacing and alignment, then export to PDF. The PDF will include crop marks, alignment guides, and proper spacing for printing on standard label sheets. This is perfect for creating professional product labels and inventory tags.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I customize the appearance of my barcodes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can customize barcode height, quiet zone (white space around the barcode), text label visibility, and color scheme. Adjust the height slider to make barcodes taller or shorter. Set the quiet zone to ensure proper scanning. Enable or disable text labels below the barcode. Choose colors that work with your branding while maintaining scannability.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my barcode data private and secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! All barcode generation happens entirely in your web browser using JavaScript. Your data never leaves your device and is never uploaded to our servers. This ensures complete privacy and security. You can generate barcodes for sensitive products, inventory items, or confidential data without any privacy concerns.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between EAN-13 and UPC-A?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EAN-13 (European Article Number) uses 13 digits and is used internationally, while UPC-A (Universal Product Code) uses 12 digits and is primarily used in North America. Both formats are used for retail product identification. EAN-13 can encode the same data as UPC-A with an additional leading digit. Choose EAN-13 for international products or UPC-A for North American products.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I ensure my barcodes are scannable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To ensure scannability, maintain adequate quiet zone (white space) around the barcode, use sufficient height (at least 0.5 inches for most formats), ensure good contrast between bars and background, avoid distortion when printing, and test with multiple scanners. Our tool automatically includes proper quiet zones and generates high-quality barcodes optimized for scanning.',
        },
      },
    ],
  };

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
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="space-y-10">
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

      <FaqSection />

      <RelatedTools currentPath="/barcodes" />
    </div>
    </>
  );
}

// Collapsible FAQ Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I create a barcode?',
      answer: 'Creating a barcode is simple with our free online barcode generator. Select your barcode format (CODE128, EAN-13, UPC-A, etc.), enter your data (product code, number, or text), customize the appearance with height and quiet zone settings, then click "Generate Barcode". Your barcode will appear instantly, and you can download it as PNG or SVG format.',
    },
    {
      question: 'What barcode formats are supported?',
      answer: 'We support many common barcode formats including CODE128 (alphanumeric), EAN-13 (13-digit product codes), UPC-A (12-digit product codes), EAN-8 (8-digit product codes), CODE39 (alphanumeric), and ITF-14 (14-digit shipping codes). Each format has specific use cases - EAN-13 and UPC-A are for retail products, CODE128 is for internal tracking, and CODE39 is for general alphanumeric data.',
    },
    {
      question: 'How do I generate barcodes in bulk from CSV?',
      answer: 'To generate barcodes in bulk, prepare a CSV file with your barcode data. Each row should contain the data you want to encode in the barcode. Upload the CSV file using the batch generation feature, select your barcode format and settings, then click "Generate Barcodes". All barcodes will be generated and bundled into a ZIP file for easy download. Perfect for inventory management and product labeling.',
    },
    {
      question: 'How do I create print-ready barcode label sheets?',
      answer: 'After generating your barcodes, select the "Export Label Sheet" option. Choose your label template (Avery or custom), set the spacing and alignment, then export to PDF. The PDF will include crop marks, alignment guides, and proper spacing for printing on standard label sheets. This is perfect for creating professional product labels and inventory tags.',
    },
    {
      question: 'Can I customize the appearance of my barcodes?',
      answer: 'Yes! You can customize barcode height, quiet zone (white space around the barcode), text label visibility, and color scheme. Adjust the height slider to make barcodes taller or shorter. Set the quiet zone to ensure proper scanning. Enable or disable text labels below the barcode. Choose colors that work with your branding while maintaining scannability.',
    },
    {
      question: 'Is my barcode data private and secure?',
      answer: 'Absolutely! All barcode generation happens entirely in your web browser using JavaScript. Your data never leaves your device and is never uploaded to our servers. This ensures complete privacy and security. You can generate barcodes for sensitive products, inventory items, or confidential data without any privacy concerns.',
    },
    {
      question: 'What is the difference between EAN-13 and UPC-A?',
      answer: 'EAN-13 (European Article Number) uses 13 digits and is used internationally, while UPC-A (Universal Product Code) uses 12 digits and is primarily used in North America. Both formats are used for retail product identification. EAN-13 can encode the same data as UPC-A with an additional leading digit. Choose EAN-13 for international products or UPC-A for North American products.',
    },
    {
      question: 'How do I ensure my barcodes are scannable?',
      answer: 'To ensure scannability, maintain adequate quiet zone (white space) around the barcode, use sufficient height (at least 0.5 inches for most formats), ensure good contrast between bars and background, avoid distortion when printing, and test with multiple scanners. Our tool automatically includes proper quiet zones and generates high-quality barcodes optimized for scanning.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
      <h2 className="mb-6 text-2xl font-semibold text-white">Frequently Asked Questions (FAQs)</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <article key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 transition-all">
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-900/50"
            >
              <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
              <svg
                className={`h-5 w-5 flex-shrink-0 text-brand-accent transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed text-slate-300">{faq.answer}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}


import { useState } from 'react';
import { AdSlot } from '../components/ads/AdSlot';
import { RelatedTools } from '../components/related/RelatedTools';
import { CadWorkspace } from '../features/cad/components/CadWorkspace';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo';

export function CadPage() {
  const title = generatePageTitle('Free CAD & SketchUp Tools - Viewers & Converters');
  const url = generateCanonicalUrl('/cad');
  const jsonLd = generateJsonLd({
    name: 'CAD & SketchUp Tools',
    url: url,
    description: 'Free online CAD and SketchUp viewer and converter. View DXF and SKP files. Convert between DWG, DXF, and SKP formats. Toggle layers, measure distances, zoom and pan. Export views as PNG or SVG images.',
  });

  // FAQPage structured data for SEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I view DXF CAD files in the browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To view DXF files, simply drag and drop your DXF CAD file onto the upload area or click to select a file. The viewer will automatically load and display your CAD drawing with full layer support. You can zoom, pan, toggle layers, and measure distances directly in your browser. No software installation is required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I view DWG files in the browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! ASCII DWG files can be viewed directly in the browser. However, binary DWG files require conversion to DXF format first using AutoCAD or another CAD application. Our viewer will attempt to read ASCII DWG files and display them just like DXF files.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I view SketchUp SKP files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SKP files are proprietary binary format and cannot be viewed directly in the browser. To view SKP files, please convert them to DXF or DWG format first using SketchUp, AutoCAD, or another CAD application. Alternatively, you can use SketchUp\'s web viewer at viewer.sketchup.com.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I toggle layers in the CAD viewer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the layer panel on the left side of the viewer to show or hide specific layers. Each layer has a checkbox - uncheck to hide a layer, check to show it. This helps you focus on specific components or sections of your CAD drawing. The layer panel automatically appears when your CAD file contains multiple layers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I measure distances in CAD files?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click the "Measure Distance" button to enable measurement mode. Then click two points on the canvas to measure the distance between them. The measurement will be displayed in CAD units. You can make multiple measurements, and they will all be displayed on the canvas. Click "Clear Measurements" to remove all measurements.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I zoom and pan in the CAD viewer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the zoom controls (+/-) in the top right of the viewer to zoom in and out. Click "Reset" to return to the default view. To pan, click the "Pan" button to enable pan mode, then click and drag on the canvas to move the view. You can also use the zoom percentage display to see the current zoom level.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I export my CAD view as an image?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Click the "Export PNG" button to export your current view as a PNG image. The exported image maintains the current zoom level and layer visibility, making it perfect for sharing designs, creating documentation, or including in presentations.',
        },
      },
      {
        '@type': 'Question',
        name: 'What CAD file formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support DXF files (full support), ASCII DWG files (can be viewed), and SKP files (require conversion to DXF/DWG first). DXF files work best as they are open format and fully supported. Binary DWG and SKP files are proprietary formats that require conversion before viewing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my CAD file data private and secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! All CAD file processing happens entirely in your web browser. Your CAD files never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can view sensitive designs, confidential drawings, or proprietary CAD files without any privacy concerns.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I convert between CAD formats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CAD format conversion (DWG to DXF, DXF to SKP, etc.) requires server-side processing. For now, only DXF files can be viewed directly in the browser. Please use desktop CAD applications like AutoCAD, SketchUp, or LibreCAD for format conversion. We may add server-side conversion in the future.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={title}
        description="Free online CAD and SketchUp viewer and converter. View and inspect DXF and SKP files directly in your browser. Convert between DWG, DXF, and SKP formats. Toggle layers, measure distances, zoom and pan. Export views as PNG or SVG images. No software installation required."
        canonical={url}
        ogImage="/og-default.png"
        keywords={['CAD viewer', 'SketchUp viewer', 'DXF viewer', 'SKP viewer', 'DWG to DXF converter', 'DXF to SKP converter', 'SKP to DXF converter', 'DWG converter', 'online CAD viewer', 'DXF file viewer', 'SKP file viewer', 'free CAD viewer', 'view DXF online', 'view SKP online', 'CAD viewer browser']}
        jsonLd={jsonLd}
      />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      <div className="space-y-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">CAD & SketchUp Tools</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Free CAD & SketchUp Tools - Viewers & Converters</h1>
          <p className="max-w-3xl text-base text-slate-300">
            View and inspect DXF CAD files and SketchUp SKP files directly in your web browser. Convert between DWG, DXF, and SKP formats seamlessly. 
            Toggle layers, measure distances, zoom and pan for detailed inspection. Export views as PNG or SVG images. No software installation required—all CAD and SketchUp viewing and conversion 
            happens in your browser for complete privacy and convenience.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_CAD_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
        <CadWorkspace />
      </section>

      <FaqSection />

      <HowToSection />

      <RelatedTools currentPath="/cad" />
    </div>
    </>
  );
}

// Collapsible FAQ Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I view DXF CAD files in the browser?',
      answer: 'To view DXF files, simply drag and drop your DXF CAD file onto the upload area or click to select a file. The viewer will automatically load and display your CAD drawing with full layer support. You can zoom, pan, toggle layers, and measure distances directly in your browser. No software installation is required.',
    },
    {
      question: 'Can I view DWG files in the browser?',
      answer: 'Yes! ASCII DWG files can be viewed directly in the browser. However, binary DWG files require conversion to DXF format first using AutoCAD or another CAD application. Our viewer will attempt to read ASCII DWG files and display them just like DXF files.',
    },
    {
      question: 'Can I view SketchUp SKP files?',
      answer: 'SKP files are proprietary binary format and cannot be viewed directly in the browser. To view SKP files, please convert them to DXF or DWG format first using SketchUp, AutoCAD, or another CAD application. Alternatively, you can use SketchUp\'s web viewer at viewer.sketchup.com.',
    },
    {
      question: 'How do I toggle layers in the CAD viewer?',
      answer: 'Use the layer panel on the left side of the viewer to show or hide specific layers. Each layer has a checkbox - uncheck to hide a layer, check to show it. This helps you focus on specific components or sections of your CAD drawing. The layer panel automatically appears when your CAD file contains multiple layers.',
    },
    {
      question: 'How do I measure distances in CAD files?',
      answer: 'Click the "Measure Distance" button to enable measurement mode. Then click two points on the canvas to measure the distance between them. The measurement will be displayed in CAD units. You can make multiple measurements, and they will all be displayed on the canvas. Click "Clear Measurements" to remove all measurements.',
    },
    {
      question: 'How do I zoom and pan in the CAD viewer?',
      answer: 'Use the zoom controls (+/-) in the top right of the viewer to zoom in and out. Click "Reset" to return to the default view. To pan, click the "Pan" button to enable pan mode, then click and drag on the canvas to move the view. You can also use the zoom percentage display to see the current zoom level.',
    },
    {
      question: 'Can I export my CAD view as an image?',
      answer: 'Yes! Click the "Export PNG" button to export your current view as a PNG image. The exported image maintains the current zoom level and layer visibility, making it perfect for sharing designs, creating documentation, or including in presentations.',
    },
    {
      question: 'What CAD file formats are supported?',
      answer: 'We support DXF files (full support), ASCII DWG files (can be viewed), and SKP files (require conversion to DXF/DWG first). DXF files work best as they are open format and fully supported. Binary DWG and SKP files are proprietary formats that require conversion before viewing.',
    },
    {
      question: 'Is my CAD file data private and secure?',
      answer: 'Absolutely! All CAD file processing happens entirely in your web browser. Your CAD files never leave your device and are never uploaded to our servers. This ensures complete privacy and security. You can view sensitive designs, confidential drawings, or proprietary CAD files without any privacy concerns.',
    },
    {
      question: 'Can I convert between CAD formats?',
      answer: 'CAD format conversion (DWG to DXF, DXF to SKP, etc.) requires server-side processing. For now, only DXF files can be viewed directly in the browser. Please use desktop CAD applications like AutoCAD, SketchUp, or LibreCAD for format conversion. We may add server-side conversion in the future.',
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

// Enhanced How To Section
function HowToSection() {
  return (
    <section className="rounded-3xl border border-brand-accent/30 bg-brand-accent/10 p-8 text-sm text-slate-200">
      <h2 className="mb-6 text-2xl font-semibold text-white">How to Use Our CAD & SketchUp Tools</h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">1. View DXF CAD Files in Your Browser</h3>
          <p className="leading-relaxed text-slate-200">
            To view DXF files, simply drag and drop your DXF CAD file onto the upload area or click to select a file. The viewer will automatically load and display your CAD drawing with full layer support. The viewer supports zoom, pan, layer toggling, and distance measurement. No software installation is required - everything happens in your browser for complete privacy and convenience.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">2. View ASCII DWG Files</h3>
          <p className="leading-relaxed text-slate-200">
            ASCII DWG files can be viewed directly in the browser just like DXF files. Simply upload your DWG file and the viewer will attempt to parse and display it. However, binary DWG files require conversion to DXF format first using AutoCAD or another CAD application. If you encounter an error with a DWG file, it\'s likely a binary format that needs conversion.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">3. Toggle Layers for Better Focus</h3>
          <p className="leading-relaxed text-slate-200">
            Use the layer panel on the left side of the viewer to show or hide specific layers. Each layer has a checkbox and a color indicator. Uncheck a layer to hide it, check it to show it. This helps you focus on specific components or sections of your CAD drawing. The layer panel automatically appears when your CAD file contains multiple layers. You can scroll through the layer list if you have many layers.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">4. Measure Distances with Precision</h3>
          <p className="leading-relaxed text-slate-200">
            Click the "Measure Distance" button to enable measurement mode. Then click two points on the canvas to measure the distance between them. The measurement will be displayed in CAD units with a dashed line connecting the points. You can make multiple measurements, and they will all be displayed on the canvas. Click "Clear Measurements" to remove all measurements. This is perfect for verifying dimensions and checking distances in your CAD drawings.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">5. Zoom and Pan for Detailed Inspection</h3>
          <p className="leading-relaxed text-slate-200">
            Use the zoom controls (+/-) in the top right of the viewer to zoom in and out. The current zoom level is displayed as a percentage. Click "Reset" to return to the default view. To pan, click the "Pan" button to enable pan mode, then click and drag on the canvas to move the view around. You can also enable the grid display to help with alignment and measurement. The viewer supports smooth zooming and panning for detailed inspection of your CAD drawings.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">6. Export Views as Images</h3>
          <p className="leading-relaxed text-slate-200">
            Click the "Export PNG" button to export your current view as a PNG image. The exported image maintains the current zoom level and layer visibility, making it perfect for sharing designs, creating documentation, or including in presentations. The exported image will be high quality and can be used in reports, emails, or printed materials. This is especially useful for creating snapshots of specific views or sections of your CAD drawing.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">7. Understanding File Format Support</h3>
          <p className="leading-relaxed text-slate-200">
            We support DXF files (full support with all features), ASCII DWG files (can be viewed), and SKP files (require conversion to DXF/DWG first). DXF files work best as they are open format and fully supported. Binary DWG and SKP files are proprietary formats that require conversion before viewing. For SKP files, use SketchUp to export to DXF or DWG format, or use SketchUp\'s web viewer at viewer.sketchup.com for direct SKP viewing.
          </p>
        </div>
      </div>
    </section>
  );
}


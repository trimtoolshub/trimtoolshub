import { AdSlot } from '../components/ads/AdSlot';
import { CadWorkspace } from '../features/cad/components/CadWorkspace';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

const cadMilestones = [
  {
    title: 'View DXF & SKP Files in Browser',
    description: 'Upload and view DXF CAD files and SketchUp SKP files directly in your web browser. No software installation required. Supports standard DXF and SKP formats with full layer support and rendering.',
  },
  {
    title: 'File Format Converters',
    description: 'Convert between DWG, DXF, and SKP formats seamlessly. Transform DWG to DXF, DXF to SKP, SKP to DXF, and more. All conversions happen in your browser with complete privacy.',
  },
  {
    title: 'Layer Management & Measurement',
    description: 'Toggle layers on and off to focus on specific parts of your drawing. Measure distances between points with precision. Zoom and pan for detailed inspection of CAD and SketchUp files.',
  },
  {
    title: 'Export Views as Images',
    description: 'Export your CAD and SketchUp views as high-quality PNG or SVG images. Perfect for sharing designs, creating documentation, or including in presentations.',
  },
];

export function CadPage() {
  const title = generatePageTitle('Free CAD & SketchUp Tools - Viewers & Converters');
  const url = generateCanonicalUrl('/cad');
  const jsonLd = generateJsonLd({
    name: 'CAD & SketchUp Tools',
    url: url,
    description: 'Free online CAD and SketchUp viewer and converter. View DXF and SKP files. Convert between DWG, DXF, and SKP formats. Toggle layers, measure distances, zoom and pan. Export views as PNG or SVG images.',
  });

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
      <div className="space-y-12">
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

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cadMilestones.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-lg shadow-black/30">
        <CadWorkspace />
      </section>

      <section className="rounded-3xl border border-brand-accent/30 bg-brand-accent/10 p-8 text-sm text-slate-200">
        <h2 className="text-xl font-semibold text-white">How to Use Our CAD & SketchUp Tools</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li><strong>View DXF Files:</strong> Simply drag and drop or select your DXF CAD file to view it instantly in your browser. The viewer supports layers, zoom, and pan controls.</li>
          <li><strong>Toggle Layers:</strong> Use the layer panel to show or hide specific layers in your CAD drawing. This helps you focus on specific components or sections.</li>
          <li><strong>Measure Distances:</strong> Click the "Measure Distance" button, then click two points on the canvas to measure the distance between them. Measurements are displayed in CAD units.</li>
          <li><strong>Zoom and Pan:</strong> Use the zoom controls (+/-) to zoom in and out, or click "Reset" to return to the default view. Pan by clicking and dragging on the canvas.</li>
          <li><strong>Export Views:</strong> Export your current view as a PNG image for sharing or documentation purposes. The exported image maintains the current zoom level and layer visibility.</li>
          <li><strong>Format Conversion:</strong> CAD format conversion (DWG to DXF, DXF to SKP, etc.) requires server-side processing. For now, only DXF files can be viewed directly in the browser. Please use desktop CAD applications for format conversion.</li>
        </ul>
      </section>
    </div>
    </>
  );
}


import { AdSlot } from '../components/ads/AdSlot';
import SEOHead, { generatePageTitle, generateCanonicalUrl, generateJsonLd } from '../lib/seo.tsx';

const cadMilestones = [
  {
    title: 'Client-side DXF renderer',
    description: 'Parse with dxf-parser, render via custom canvas with zoom/pan and layer controls.',
  },
  {
    title: 'Measurement toolkit',
    description: 'Two-point distance, snapping hints, and exportable snapshots in PNG/SVG.',
  },
  {
    title: 'Optional conversions',
    description: 'DWG ⇢ DXF/SVG and SKP ⇢ glTF routed through a feature-flagged `/convert` microservice.',
  },
];

export function CadPage() {
  const title = generatePageTitle('CAD Viewers');
  const url = generateCanonicalUrl('/cad');
  const jsonLd = generateJsonLd({
    name: 'CAD Viewers',
    url: url,
    description: 'Inspect DXF drawings, toggle layers, measure, and export crisp PNG/SVG snapshots.',
  });

  return (
    <>
      <SEOHead
        title={title}
        description="Inspect DXF drawings, toggle layers, measure, and export crisp PNG/SVG snapshots."
        canonical={url}
        ogImage="/og-default.png"
        jsonLd={jsonLd}
      />
      <div className="space-y-12">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">CAD Viewers</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Make CAD previews instant—and upsell heavy lifts.</h1>
          <p className="max-w-3xl text-base text-slate-300">
            Designers and engineers need quick DXF snapshots. We keep the core tool offline-ready, then invite users to
            trigger premium conversions when they bring DWG or SKP files that require licensed processors.
          </p>
        </div>
        <AdSlot
          slotId={import.meta.env.VITE_ADSENSE_SLOT_CAD_TOP}
          className="mt-6 min-h-[90px] rounded-2xl bg-slate-950/70 p-4"
          format="auto"
        />
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {cadMilestones.map((item) => (
          <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-brand-accent/30 bg-brand-accent/10 p-8 text-sm text-slate-200">
        <h2 className="text-xl font-semibold text-white">Conversion service roadmap</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Ship a feature-flagged `/convert` client with presigned URL orchestration.</li>
          <li>Auto-expire uploads on completion and log anonymized telemetry only.</li>
          <li>Gate licensed formats behind a paywall or quota once usage data validates demand.</li>
        </ul>
      </section>
    </div>
    </>
  );
}


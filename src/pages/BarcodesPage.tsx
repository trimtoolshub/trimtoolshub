import { AdSlot } from '../components/ads/AdSlot';

const barcodeFeatures = [
  {
    title: 'CODE128 & EAN-13 launch-ready',
    description: 'Render crisp SVG bars with configurable height, quiet zones, and readable text.',
  },
  {
    title: 'Label sheet builder',
    description: 'Lay out barcodes on Avery-style templates, export to print-ready PDF with crop marks.',
  },
  {
    title: 'Batch automation',
    description: 'Parse CSV uploads, validate data, and surface failed rows for quick fixes.',
  },
];

export function BarcodesPage() {
  return (
    <div className="space-y-12">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">Barcode Lab</span>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Generate compliant barcodes and monetize the workflow.</h1>
        <p className="mt-4 max-w-3xl text-base text-slate-300">
          Barcodes drive recurring operational tasks—perfect for sponsorships and upsell prompts. Keep everything
          client-side with jsbarcode and fall back to bwip-js in WASM when advanced symbologies land.
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
        <h2 className="text-xl font-semibold text-white">Engineering checklist</h2>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>Integrate jsbarcode for client rendering with worker fallback for batches.</li>
          <li>Ship PapaParse CSV ingestion + validation utilities shared with QR tools.</li>
          <li>Export PDF label sheets via pdf-lib using reusable grid templates.</li>
        </ul>
      </section>
    </div>
  );
}


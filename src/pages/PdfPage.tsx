import { AdSlot } from '../components/ads/AdSlot';
import { PdfWorkspace } from '../features/pdf/components/PdfWorkspace';

export function PdfPage() {
  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 shadow-xl shadow-black/30">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-accent">PDF Toolkit</span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Enterprise-grade PDF tools, running right in your browser.
          </h1>
          <p className="max-w-3xl text-base text-slate-300">
            Merge, split, extract, rotate, compress, and convert without uploading sensitive documents. Heavy workloads
            stay private—and when users need server-side conversions, you can upsell without interrupting their flow.
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
  );
}


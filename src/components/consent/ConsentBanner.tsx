import { useConsent } from '../../context/ConsentContext';

export function ConsentBanner() {
  const { status, accept, decline } = useConsent();

  if (status !== 'unknown') {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-brand-accent/10 backdrop-blur">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">We value your privacy</p>
            <p className="mt-2 text-sm text-slate-300">
              TrimToolsHub stores files in your browser by default. We use cookies to understand usage and to fund the
              product through analytics and ads. Choose “Allow” to enable these services or “Decline” to continue
              without them.
            </p>
          </div>
          <div className="flex flex-1 flex-col items-stretch gap-2 sm:max-w-xs">
            <button
              type="button"
              onClick={accept}
              className="inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-primary/40 transition hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              Allow analytics & ads
            </button>
            <button
              type="button"
              onClick={decline}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


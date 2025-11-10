import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AdSlot } from '../ads/AdSlot';

const NAV_LINKS = [
  { to: '/', label: 'Overview' },
  { to: '/pdf', label: 'PDF Toolkit' },
  { to: '/qr', label: 'QR & vCard' },
  { to: '/barcodes', label: 'Barcodes' },
  { to: '/cad', label: 'CAD Viewers' },
];

export function ShellLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLink = (to: string, label: string) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        [
          'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
          isActive
            ? 'bg-brand-primary/20 text-brand-accent'
            : 'text-slate-300 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </NavLink>
  );

  return (
    <div className="flex min-h-screen flex-col bg-brand-surface text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
            <img src="/tth-logo.png" alt="TrimToolsHub" className="h-9 w-9 rounded-2xl object-contain" />
            TrimToolsHub
          </NavLink>
          <nav className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => renderLink(link.to, link.label))}
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:border-white/30 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:hidden"
            aria-label="Toggle navigation"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M3 6H17M3 10H17M3 14H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {menuOpen ? (
          <nav className="mx-4 mb-4 rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-lg shadow-black/30 md:hidden">
            <div className="flex flex-col gap-2">{NAV_LINKS.map((link) => renderLink(link.to, link.label))}</div>
          </nav>
        ) : null}
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <Outlet />
        </div>
      </main>
      <footer className="border-t border-white/5 bg-slate-950/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Sponsored</h2>
            <AdSlot
              slotId={import.meta.env.VITE_ADSENSE_SLOT_FOOTER}
              className="mt-3 min-h-[90px] rounded-2xl bg-slate-900/60 p-4"
              format="auto"
            />
          </div>
          <div className="flex flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} TrimToolsHub. Private by design, monetized with transparency.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/privacy" className="hover:text-white">
                Privacy
              </a>
              <a href="/terms" className="hover:text-white">
                Terms
              </a>
              <a
                href="mailto:hello@trimtoolshub.com"
                className="rounded-full border border-white/10 px-4 py-2 hover:border-white/30 hover:text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


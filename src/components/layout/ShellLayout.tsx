import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Overview' },
  { to: '/pdf', label: 'PDF Toolkit' },
  { to: '/qr', label: 'QR & vCard' },
  { to: '/images', label: 'Image Converter' },
  { to: '/cad', label: 'CAD Tools' },
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
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Tools</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/pdf" className="hover:text-white transition-colors">
                    PDF Tools
                  </Link>
                </li>
                <li>
                  <Link to="/qr" className="hover:text-white transition-colors">
                    QR Code Generator
                  </Link>
                </li>
                <li>
                  <Link to="/images" className="hover:text-white transition-colors">
                    Image Converter
                  </Link>
                </li>
                <li>
                  <Link to="/cad" className="hover:text-white transition-colors">
                    CAD & SketchUp Tools
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">About</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Features</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white transition-colors">100% Private</li>
                <li className="hover:text-white transition-colors">No Registration</li>
                <li className="hover:text-white transition-colors">Free Forever</li>
                <li className="hover:text-white transition-colors">Browser-Based</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 border-t border-white/5 pt-6">
            <div className="flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} TrimToolsHub. Simple tools that make your life easier.</p>
              <div className="flex flex-col gap-2 text-xs text-slate-500 md:items-end">
                <span>Private by design, monetized with transparency</span>
                <span>Designed and developed by Trimsoft Studio</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


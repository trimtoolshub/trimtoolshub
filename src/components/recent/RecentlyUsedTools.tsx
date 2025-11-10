import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRecentlyUsedTools, addRecentlyUsedTool, type ToolUsage } from '../../lib/storage';

const toolNames: Record<string, string> = {
  '/pdf': 'PDF Tools',
  '/qr': 'QR Code Generator',
  '/barcodes': 'Barcode Generator',
  '/cad': 'CAD & SketchUp Tools',
  '/images': 'Image Converter',
  '/dates': 'Date & Time Tools',
};

const toolIcons: Record<string, string> = {
  '/pdf': '📄',
  '/qr': '🔲',
  '/barcodes': '📊',
  '/cad': '📐',
  '/images': '🖼️',
  '/dates': '📅',
};

export function RecentlyUsedTools() {
  const location = useLocation();
  const [recentTools, setRecentTools] = useState<ToolUsage[]>([]);

  useEffect(() => {
    // Update recent tools when location changes
    if (location.pathname !== '/' && toolNames[location.pathname]) {
      addRecentlyUsedTool({
        path: location.pathname,
        name: toolNames[location.pathname],
      });
    }
    setRecentTools(getRecentlyUsedTools());
  }, [location.pathname]);

  if (recentTools.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recently Used Tools</h2>
        <span className="text-xs text-slate-400">{recentTools.length} tools</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recentTools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 transition hover:border-brand-accent/40 hover:bg-slate-900/80"
          >
            <span className="text-2xl">{toolIcons[tool.path] || '🔧'}</span>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
              <p className="text-xs text-slate-400">
                {new Date(tool.timestamp).toLocaleDateString()}
              </p>
            </div>
            <svg
              className="h-4 w-4 text-slate-400 transition group-hover:text-brand-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}


import { Link } from 'react-router-dom';

interface RelatedTool {
  path: string;
  name: string;
  description: string;
  icon: string;
}

const relatedToolsMap: Record<string, RelatedTool[]> = {
  '/pdf': [
    { path: '/images', name: 'Image Converter', description: 'Convert images to PDF or extract images from PDFs', icon: '🖼️' },
    { path: '/qr', name: 'QR Code Generator', description: 'Add QR codes to your PDF documents', icon: '🔲' },
    { path: '/dates', name: 'Date Tools', description: 'Add timestamps and dates to PDFs', icon: '📅' },
  ],
  '/qr': [
    { path: '/barcodes', name: 'Barcode Generator', description: 'Create barcodes alongside QR codes', icon: '📊' },
    { path: '/images', name: 'Image Converter', description: 'Convert QR codes to different image formats', icon: '🖼️' },
    { path: '/pdf', name: 'PDF Tools', description: 'Embed QR codes in PDF documents', icon: '📄' },
  ],
  '/barcodes': [
    { path: '/qr', name: 'QR Code Generator', description: 'Create QR codes alongside barcodes', icon: '🔲' },
    { path: '/images', name: 'Image Converter', description: 'Convert barcodes to different formats', icon: '🖼️' },
    { path: '/pdf', name: 'PDF Tools', description: 'Add barcodes to PDF documents', icon: '📄' },
  ],
  '/cad': [
    { path: '/images', name: 'Image Converter', description: 'Export CAD views as images', icon: '🖼️' },
    { path: '/pdf', name: 'PDF Tools', description: 'Convert CAD files to PDF', icon: '📄' },
    { path: '/dates', name: 'Date Tools', description: 'Add timestamps to CAD exports', icon: '📅' },
  ],
  '/images': [
    { path: '/pdf', name: 'PDF Tools', description: 'Convert images to PDF or extract from PDFs', icon: '📄' },
    { path: '/qr', name: 'QR Code Generator', description: 'Add QR codes to images', icon: '🔲' },
    { path: '/barcodes', name: 'Barcode Generator', description: 'Add barcodes to images', icon: '📊' },
  ],
  '/dates': [
    { path: '/pdf', name: 'PDF Tools', description: 'Add dates and timestamps to PDFs', icon: '📄' },
    { path: '/images', name: 'Image Converter', description: 'Add dates to image metadata', icon: '🖼️' },
    { path: '/qr', name: 'QR Code Generator', description: 'Create QR codes with date information', icon: '🔲' },
  ],
};

interface RelatedToolsProps {
  currentPath: string;
}

export function RelatedTools({ currentPath }: RelatedToolsProps) {
  const related = relatedToolsMap[currentPath] || [];

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-brand-accent/30 bg-brand-accent/10 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Related Tools</h2>
      <p className="mb-4 text-sm text-slate-300">
        Try these related tools to enhance your workflow
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group rounded-2xl border border-white/10 bg-slate-900/50 p-4 transition hover:border-brand-accent/40 hover:bg-slate-900/80"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="text-2xl">{tool.icon}</span>
              <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{tool.description}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-accent">
              Open tool
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}


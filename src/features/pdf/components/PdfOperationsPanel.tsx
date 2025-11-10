import type { PdfOperationType } from '../types';

interface PdfOperationsPanelProps {
  active: PdfOperationType;
  onSelect: (operation: PdfOperationType) => void;
  disabled?: boolean;
}

const OPERATIONS: Array<{ key: PdfOperationType; title: string; description: string }> = [
  { key: 'merge', title: 'Merge', description: 'Combine multiple PDFs into a single file.' },
  { key: 'split', title: 'Split', description: 'Split a PDF into individual pages or ranges.' },
  { key: 'extract', title: 'Extract', description: 'Extract specific pages using a range expression.' },
  { key: 'compress', title: 'Compress', description: 'Reduce file size by adjusting quality.' },
  { key: 'watermark', title: 'Watermark', description: 'Overlay text or image watermarks.' },
  { key: 'ocr', title: 'OCR', description: 'Make scanned PDFs searchable with Tesseract.js.' },
  { key: 'pdf2word', title: 'PDF → Word', description: 'Convert PDF to editable Word document.' },
  { key: 'extractImages', title: 'Extract Images', description: 'Extract all images from PDF pages.' },
  { key: 'pdf2csv', title: 'PDF → CSV', description: 'Convert PDF tables to CSV format.' },
];

export function PdfOperationsPanel({ active, onSelect, disabled }: PdfOperationsPanelProps) {
  return (
    <aside className="flex flex-col gap-3">
      {OPERATIONS.map((operation) => {
        const isActive = operation.key === active;
        return (
          <button
            key={operation.key}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(operation.key)}
            className={[
              'flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition',
              isActive
                ? 'border-brand-accent bg-brand-accent/10 text-brand-accent shadow-lg shadow-brand-accent/30'
                : 'border-white/10 bg-slate-950/50 text-slate-200 hover:border-white/30 hover:text-white',
              disabled ? 'cursor-not-allowed opacity-60 hover:border-white/10 hover:text-slate-200' : '',
            ].join(' ')}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">{operation.title}</span>
            <span className="text-xs text-slate-400">{operation.description}</span>
          </button>
        );
      })}
    </aside>
  );
}


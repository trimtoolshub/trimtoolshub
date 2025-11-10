import type { PdfFileEntry } from '../types';

interface PdfFileListProps {
  files: PdfFileEntry[];
  onRemove: (id: string) => void;
}

export function PdfFileList({ files, onRemove }: PdfFileListProps) {
  if (!files.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-400">
        No files yet. Add PDFs or images to get started.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {files.map((file) => (
        <li
          key={file.id}
          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3"
        >
          <div className="flex flex-1 items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-accent">
              {file.file.type.startsWith('image/') ? 'IMG' : 'PDF'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{file.name}</p>
              <p className="text-xs text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
                {typeof file.pageCount === 'number' ? ` • ${file.pageCount} pages` : ''}
              </p>
            </div>
          </div>
          {Object.keys(file.rotationMap).length ? (
            <span className="rounded-full border border-brand-accent/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent">
              {Object.keys(file.rotationMap).length} rotated
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => onRemove(file.id)}
            className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-white/40 hover:text-white"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}


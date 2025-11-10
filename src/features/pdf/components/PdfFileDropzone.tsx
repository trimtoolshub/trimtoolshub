import { useCallback, useState } from 'react';

interface PdfFileDropzoneProps {
  onFiles: (files: FileList | File[]) => void;
}

export function PdfFileDropzone({ onFiles }: PdfFileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);

      if (event.dataTransfer.files?.length) {
        onFiles(event.dataTransfer.files);
      }
    },
    [onFiles],
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        onFiles(event.target.files);
      }
    },
    [onFiles],
  );

  return (
    <label
      htmlFor="pdf-dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        'relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 transition',
        isDragging
          ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
          : 'border-white/15 bg-slate-950/50 text-slate-300 hover:border-white/30 hover:bg-slate-900/60',
      ].join(' ')}
    >
      <input
        id="pdf-dropzone"
        name="pdf-dropzone"
        type="file"
        accept=".pdf,image/*"
        multiple
        onChange={handleInput}
        className="hidden"
      />
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <path
            d="M13 5.5v15M6.5 13H19.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-white">Drop PDFs or images</p>
        <p className="mt-1 text-sm text-slate-400">We process everything locally by default. Max 50 files per session.</p>
      </div>
      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
        Click to browse
      </span>
    </label>
  );
}


import { useEffect, useMemo, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { usePdfWorkspace } from '../hooks/usePdfWorkspace';
import { PdfFileDropzone } from './PdfFileDropzone';
import { PdfFileList } from './PdfFileList';
import { PdfOperationsPanel } from './PdfOperationsPanel';
import { downloadBlob, downloadBatchAsZip } from '../../../lib/download';
import {
  extractPageRanges,
  imagesToPdf,
  mergePdfs,
  rotatePdf,
  splitPdf,
  compressPdf,
  watermarkPdf,
  signPdf,
  ocrPdf,
  pdfToWord,
  type WatermarkOptions,
  type SignatureOptions,
} from '../services/pdfProcessing';
import type { PdfFileEntry } from '../types';

export function PdfWorkspace() {
  const { state, helpers } = usePdfWorkspace();
  const { files, activeOperation, rangeExpression, compressPreset, isProcessing, error, successMessage } = state;
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [watermarkOptions, setWatermarkOptions] = useState<WatermarkOptions>({
    type: 'text',
    text: 'DRAFT',
    opacity: 0.3,
    fontSize: 50,
    angle: 45,
  });
  const [signatures, setSignatures] = useState<SignatureOptions[]>([]);
  const [ocrLanguage, setOcrLanguage] = useState<string>('eng');

  const pdfFiles = useMemo(() => files.filter((entry) => entry.file.type === 'application/pdf'), [files]);
  const imageFiles = useMemo(() => files.filter((entry) => entry.file.type.startsWith('image/')), [files]);
  const hasBothMediaTypes = pdfFiles.length > 0 && imageFiles.length > 0;

  const selectedFile = useMemo<PdfFileEntry | null>(() => {
    if (selectedFileId) {
      return files.find((file) => file.id === selectedFileId) ?? null;
    }
    return files[0] ?? null;
  }, [files, selectedFileId]);

  useEffect(() => {
    const pending = files.filter(
      (entry) => entry.file.type === 'application/pdf' && typeof entry.pageCount === 'undefined',
    );
    if (!pending.length) {
      return;
    }

    let cancelled = false;

    (async () => {
      for (const entry of pending) {
        try {
          const bytes = await entry.file.arrayBuffer();
          const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
          if (!cancelled) {
            helpers.updateFileMeta(entry.id, doc.getPageCount());
          }
        } catch {
          // ignore metadata errors; operations will surface issues during processing
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [files, helpers]);

  const handleProcess = async () => {
    helpers.clearFeedback();
    helpers.startProcessing();
    try {
      let successMessage: string | undefined;

      switch (activeOperation) {
        case 'merge': {
          const result = await mergePdfs(pdfFiles.map((entry) => entry.file));
          downloadBlob(result.blob, result.filename);
          successMessage = 'Merged PDF ready to download.';
          break;
        }
        case 'split': {
          if (!selectedFile) {
            throw new Error('Select a PDF to split.');
          }
          const results = await splitPdf(selectedFile.file);
          const archiveName = `${selectedFile.name.replace(/\.pdf$/i, '')}-pages.zip`;
          if (results.length > 5) {
            await downloadBatchAsZip(results, archiveName);
            successMessage = `Exported ${results.length} PDFs (bundled as ZIP).`;
          } else {
            results.forEach(({ blob, filename }) => downloadBlob(blob, filename));
            successMessage = `Exported ${results.length} separate PDF${results.length === 1 ? '' : 's'}.`;
          }
          break;
        }
        case 'extract': {
          if (!selectedFile) {
            throw new Error('Select a PDF to extract from.');
          }
          const result = await extractPageRanges(selectedFile.file, rangeExpression);
          downloadBlob(result.blob, result.filename);
          successMessage = 'Extracted pages saved.';
          break;
        }
        case 'rotate': {
          if (!selectedFile) {
            throw new Error('Select a PDF to rotate.');
          }
          const rotationEntries = Object.entries(selectedFile.rotationMap);
          if (!rotationEntries.length) {
            throw new Error('Choose at least one page rotation before exporting.');
          }
          const result = await rotatePdf(selectedFile.file, selectedFile.rotationMap);
          downloadBlob(result.blob, result.filename);
          successMessage = `Rotated ${rotationEntries.length} page${rotationEntries.length === 1 ? '' : 's'}.`;
          break;
        }
        case 'img2pdf': {
          const result = await imagesToPdf(imageFiles.map((entry) => entry.file));
          downloadBlob(result.blob, result.filename);
          successMessage = `Images converted to PDF (${imageFiles.length} page${imageFiles.length === 1 ? '' : 's'}).`;
          break;
        }
        case 'compress': {
          if (!selectedFile) {
            throw new Error('Select a PDF to compress.');
          }
          const result = await compressPdf(selectedFile.file);
          downloadBlob(result.blob, result.filename);
          successMessage = `Compressed (${compressPreset}) export complete.`;
          break;
        }
        case 'watermark': {
          if (!selectedFile) {
            throw new Error('Select a PDF to watermark.');
          }
          const result = await watermarkPdf(selectedFile.file, watermarkOptions);
          downloadBlob(result.blob, result.filename);
          successMessage = 'Watermark applied successfully.';
          break;
        }
        case 'sign': {
          if (!selectedFile) {
            throw new Error('Select a PDF to sign.');
          }
          if (!signatures.length) {
            throw new Error('Add at least one signature before processing.');
          }
          const result = await signPdf(selectedFile.file, signatures);
          downloadBlob(result.blob, result.filename);
          successMessage = `Added ${signatures.length} signature${signatures.length === 1 ? '' : 's'}.`;
          break;
        }
        case 'ocr': {
          if (!selectedFile) {
            throw new Error('Select a PDF to process with OCR.');
          }
          const result = await ocrPdf(selectedFile.file, ocrLanguage);
          downloadBlob(result.blob, result.filename);
          successMessage = `OCR processing complete (${ocrLanguage}).`;
          break;
        }
        case 'pdf2word': {
          if (!selectedFile) {
            throw new Error('Select a PDF to convert to Word.');
          }
          const result = await pdfToWord(selectedFile.file);
          downloadBlob(result.blob, result.filename);
          successMessage = 'PDF converted to Word document.';
          break;
        }
        default:
          throw new Error('Unsupported operation.');
      }

      helpers.finishProcessing(successMessage);
    } catch (processingError) {
      const message =
        processingError instanceof Error ? processingError.message : 'Something went wrong while processing the PDF.';
      helpers.setError(message);
      helpers.finishProcessing();
    }
  };

  const canProcess = useMemo(() => {
    switch (activeOperation) {
      case 'merge':
        return pdfFiles.length >= 2;
      case 'split':
      case 'extract':
      case 'compress':
        return !!selectedFile && selectedFile.file.type === 'application/pdf';
      case 'rotate':
        return (
          !!selectedFile &&
          selectedFile.file.type === 'application/pdf' &&
          Object.keys(selectedFile.rotationMap).length > 0
        );
      case 'img2pdf':
        return imageFiles.length >= 1 && !hasBothMediaTypes;
      case 'watermark':
      case 'sign':
      case 'ocr':
      case 'pdf2word':
        return !!selectedFile && selectedFile.file.type === 'application/pdf';
      default:
        return false;
    }
  }, [activeOperation, hasBothMediaTypes, imageFiles.length, pdfFiles.length, selectedFile]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <PdfOperationsPanel
        active={activeOperation}
        onSelect={(operation) => helpers.setOperation(operation)}
        disabled={isProcessing}
      />
      <div className="space-y-6">
        <PdfFileDropzone onFiles={helpers.addFiles} />
        {hasBothMediaTypes ? (
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
            You added PDFs and images together. Some workflows only accept one type at a time—remove the extras to
            continue.
          </div>
        ) : null}
        <PdfFileList
          files={files}
          onRemove={(fileId) => {
            if (selectedFileId === fileId) {
              setSelectedFileId(null);
            }
            helpers.removeFile(fileId);
          }}
        />
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <WorkspaceControls
            activeOperation={activeOperation}
            rangeExpression={rangeExpression}
            onRangeChange={helpers.setRange}
            selectedFileId={selectedFile?.id ?? ''}
            onSelectFile={setSelectedFileId}
            files={files}
            compressPreset={compressPreset}
            setCompressPreset={helpers.setCompressPreset}
            selectedFile={selectedFile}
            onRotationChange={(pageIndex, rotation) => {
              if (selectedFile) {
                helpers.setRotation(selectedFile.id, pageIndex, rotation);
              }
            }}
            onRotateAll={(rotation) => {
              if (!selectedFile?.pageCount) {
                return;
              }
              for (let index = 0; index < selectedFile.pageCount; index += 1) {
                helpers.setRotation(selectedFile.id, index, rotation);
              }
            }}
            onClearRotations={() => {
              if (selectedFile) {
                helpers.clearRotations(selectedFile.id);
              }
            }}
            watermarkOptions={watermarkOptions}
            onWatermarkOptionsChange={setWatermarkOptions}
            signatures={signatures}
            onSignaturesChange={setSignatures}
            ocrLanguage={ocrLanguage}
            onOcrLanguageChange={setOcrLanguage}
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleProcess}
              disabled={!canProcess || isProcessing}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/40 transition hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isProcessing ? 'Processing…' : 'Run operation'}
            </button>
            <button
              type="button"
              onClick={() => helpers.clearFeedback()}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              Reset feedback
            </button>
          </div>
          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          {successMessage ? <p className="mt-3 text-sm text-emerald-400">{successMessage}</p> : null}
        </div>
      </div>
    </div>
  );
}

interface WorkspaceControlsProps {
  activeOperation: string;
  rangeExpression: string;
  onRangeChange: (range: string) => void;
  selectedFileId: string;
  onSelectFile: (fileId: string) => void;
  files: PdfFileEntry[];
  compressPreset: 'high' | 'medium' | 'low';
  setCompressPreset: (preset: 'high' | 'medium' | 'low') => void;
  selectedFile: PdfFileEntry | null;
  onRotationChange: (pageIndex: number, rotation: 0 | 90 | 180 | 270) => void;
  onRotateAll: (rotation: 0 | 90 | 180 | 270) => void;
  onClearRotations: () => void;
  watermarkOptions: WatermarkOptions;
  onWatermarkOptionsChange: (options: WatermarkOptions) => void;
  signatures: SignatureOptions[];
  onSignaturesChange: (signatures: SignatureOptions[]) => void;
  ocrLanguage: string;
  onOcrLanguageChange: (language: string) => void;
}

function WorkspaceControls({
  activeOperation,
  rangeExpression,
  onRangeChange,
  selectedFileId,
  onSelectFile,
  files,
  compressPreset,
  setCompressPreset,
  selectedFile,
  onRotationChange,
  onRotateAll,
  onClearRotations,
  watermarkOptions,
  onWatermarkOptionsChange,
  signatures,
  onSignaturesChange,
  ocrLanguage,
  onOcrLanguageChange,
}: WorkspaceControlsProps) {
  if (!files.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-300">
        Add files to unlock tool controls.
      </div>
    );
  }

  const requiresSinglePdf = ['split', 'extract', 'rotate', 'compress'].includes(activeOperation);

  return (
    <div className="space-y-5">
      {['split', 'extract', 'rotate', 'compress', 'watermark', 'sign', 'ocr', 'pdf2word'].includes(activeOperation) ? (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Target PDF</label>
          <select
            value={selectedFileId}
            onChange={(event) => onSelectFile(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
          >
            <option value="">Select a PDF</option>
            {files
              .filter((item) => item.file.type === 'application/pdf')
              .map((file) => (
                <option key={file.id} value={file.id}>
                  {file.name}
                </option>
              ))}
          </select>
          <p className="text-xs text-slate-400">Choose which PDF to manipulate for this operation.</p>
        </div>
      ) : null}

      {activeOperation === 'extract' ? (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Page ranges</label>
          <input
            type="text"
            value={rangeExpression}
            onChange={(event) => onRangeChange(event.target.value)}
            placeholder="e.g. 1-3,5,8"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
          />
          <p className="text-xs text-slate-400">Separate ranges with commas, use hyphen for spans.</p>
        </div>
      ) : null}

      {activeOperation === 'compress' ? (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Compression preset</label>
          <div className="grid grid-cols-3 gap-2">
            {['high', 'medium', 'low'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCompressPreset(preset as 'high' | 'medium' | 'low')}
                className={[
                  'rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]',
                  compressPreset === preset
                    ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                    : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent',
                ].join(' ')}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {activeOperation === 'rotate' ? (
        <RotationControls
          file={selectedFile}
          onRotationChange={onRotationChange}
          onRotateAll={onRotateAll}
          onClearRotations={onClearRotations}
        />
      ) : null}

      {activeOperation === 'watermark' ? (
        <WatermarkControls options={watermarkOptions} onOptionsChange={onWatermarkOptionsChange} />
      ) : null}
      {activeOperation === 'sign' ? (
        <SignControls signatures={signatures} onSignaturesChange={onSignaturesChange} />
      ) : null}
      {activeOperation === 'ocr' ? (
        <OcrControls language={ocrLanguage} onLanguageChange={onOcrLanguageChange} />
      ) : null}
    </div>
  );
}

const rotationOptions: Array<{ label: string; value: 0 | 90 | 180 | 270 }> = [
  { label: '0°', value: 0 },
  { label: '90°', value: 90 },
  { label: '180°', value: 180 },
  { label: '270°', value: 270 },
];

interface RotationControlsProps {
  file: PdfFileEntry | null;
  onRotationChange: (pageIndex: number, rotation: 0 | 90 | 180 | 270) => void;
  onRotateAll: (rotation: 0 | 90 | 180 | 270) => void;
  onClearRotations: () => void;
}

function RotationControls({ file, onRotationChange, onRotateAll, onClearRotations }: RotationControlsProps) {
  if (!file) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-300">
        Select a PDF to enable per-page rotation controls.
      </div>
    );
  }

  if (!file.pageCount) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-300">
        Loading page thumbnails… once ready, you can rotate each page individually.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Quick rotate</label>
        {[90, 180, 270].map((angle) => (
          <button
            key={angle}
            type="button"
            onClick={() => onRotateAll(angle as 0 | 90 | 180 | 270)}
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-brand-accent/50 hover:text-brand-accent"
          >
            All {angle}°
          </button>
        ))}
        <button
          type="button"
          onClick={onClearRotations}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-rose-400/60 hover:text-rose-300"
        >
          Reset
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/40 p-4">
        <ul className="flex flex-col gap-3">
          {Array.from({ length: file.pageCount }).map((_, index) => {
            const currentRotation = file.rotationMap[index] ?? 0;
            return (
              <li key={index} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 px-3 py-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Page {index + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  {rotationOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => onRotationChange(index, option.value)}
                      className={[
                        'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition',
                        currentRotation === option.value
                          ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                          : 'border-white/10 bg-slate-900/60 text-slate-200 hover:border-brand-accent/50 hover:text-brand-accent',
                      ].join(' ')}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

interface WatermarkControlsProps {
  options: WatermarkOptions;
  onOptionsChange: (options: WatermarkOptions) => void;
}

function WatermarkControls({ options, onOptionsChange }: WatermarkControlsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Watermark type</label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onOptionsChange({ ...options, type: 'text' })}
          className={`rounded-2xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            options.type === 'text'
              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
              : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-brand-accent/50'
          }`}
        >
          Text
        </button>
        <button
          type="button"
          onClick={() => onOptionsChange({ ...options, type: 'image' })}
          className={`rounded-2xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            options.type === 'image'
              ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
              : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-brand-accent/50'
          }`}
        >
          Image
        </button>
      </div>
      {options.type === 'text' ? (
        <>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Text</label>
            <input
              type="text"
              value={options.text || ''}
              onChange={(e) => onOptionsChange({ ...options, text: e.target.value })}
              placeholder="DRAFT"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Font size</label>
            <input
              type="number"
              value={options.fontSize || 50}
              onChange={(e) => onOptionsChange({ ...options, fontSize: parseInt(e.target.value, 10) || 50 })}
              min="10"
              max="200"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
            />
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Image file</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onOptionsChange({ ...options, imageFile: file });
              }
            }}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
      )}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Opacity: {options.opacity ?? 0.3}</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={options.opacity ?? 0.3}
          onChange={(e) => onOptionsChange({ ...options, opacity: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Angle: {options.angle ?? 45}°</label>
        <input
          type="range"
          min="0"
          max="360"
          step="15"
          value={options.angle ?? 45}
          onChange={(e) => onOptionsChange({ ...options, angle: parseInt(e.target.value, 10) })}
          className="w-full"
        />
      </div>
    </div>
  );
}

interface SignControlsProps {
  signatures: SignatureOptions[];
  onSignaturesChange: (signatures: SignatureOptions[]) => void;
}

function SignControls({ signatures, onSignaturesChange }: SignControlsProps) {
  const addTextSignature = () => {
    onSignaturesChange([
      ...signatures,
      {
        type: 'text',
        signatureData: 'Signature',
        pageIndex: 0,
      },
    ]);
  };

  const addImageSignature = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          onSignaturesChange([
            ...signatures,
            {
              type: 'image',
              signatureData: dataUrl,
              pageIndex: 0,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const removeSignature = (index: number) => {
    onSignaturesChange(signatures.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Signatures</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={addTextSignature}
            className="rounded-full border border-white/10 bg-slate-900/50 px-3 py-1 text-xs font-semibold text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent"
          >
            + Text
          </button>
          <button
            type="button"
            onClick={addImageSignature}
            className="rounded-full border border-white/10 bg-slate-900/50 px-3 py-1 text-xs font-semibold text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent"
          >
            + Image
          </button>
        </div>
      </div>
      {signatures.length === 0 ? (
        <p className="text-sm text-slate-400">Add a text or image signature to place on the PDF.</p>
      ) : (
        <div className="space-y-2">
          {signatures.map((sig, index) => (
            <div key={index} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 p-3">
              <span className="text-sm text-slate-300">
                {sig.type === 'text' ? `Text: ${sig.signatureData}` : 'Image signature'}
              </span>
              <button
                type="button"
                onClick={() => removeSignature(index)}
                className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-300 hover:bg-rose-400/20"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface OcrControlsProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

function OcrControls({ language, onLanguageChange }: OcrControlsProps) {
  const languages = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
    { code: 'por', name: 'Portuguese' },
    { code: 'chi_sim', name: 'Chinese (Simplified)' },
    { code: 'jpn', name: 'Japanese' },
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">OCR Language</label>
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <p className="text-xs text-slate-400">
        Note: OCR processing may take longer for large PDFs. Language packs are loaded on-demand.
      </p>
    </div>
  );
}

import { useState, useMemo, useRef } from 'react';
import { convertImage, compressImage, removeBackground, convertToSvg, convertToVector } from '../services/imageProcessing';
import { downloadBlob, downloadBatchAsZip } from '../../../lib/download';
import type {
  ImageOperationType,
  ImageFormat,
  ImageFileEntry,
  CompressOptions,
  BackgroundRemovalOptions,
  VectorOptions,
} from '../types';
import { nanoid } from 'nanoid';

export function ImageWorkspace() {
  const [files, setFiles] = useState<ImageFileEntry[]>([]);
  const [activeOperation, setActiveOperation] = useState<ImageOperationType>('convert');
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('png');
  const [compressOptions, setCompressOptions] = useState<CompressOptions>({
    quality: 80,
    format: 'jpg',
  });
  const [bgRemovalOptions, setBgRemovalOptions] = useState<BackgroundRemovalOptions>({
    tolerance: 30,
    edgeRefinement: true,
    sampleMethod: 'smart',
  });
  const [vectorOptions, setVectorOptions] = useState<VectorOptions>({
    colors: 64,
    smoothness: 50,
  });
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedFile = useMemo(() => {
    if (selectedFileId) {
      return files.find((f) => f.id === selectedFileId) ?? null;
    }
    return files[0] ?? null;
  }, [files, selectedFileId]);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    const imageFiles: ImageFileEntry[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const id = nanoid();
        const entry: ImageFileEntry = {
          id,
          file,
          name: file.name,
          size: file.size,
        };

        // Load preview and dimensions
        const img = new Image();
        img.onload = () => {
          entry.width = img.width;
          entry.height = img.height;
          entry.preview = img.src;
          setFiles((prev) => prev.map((f) => (f.id === id ? entry : f)));
        };
        img.src = URL.createObjectURL(file);

        imageFiles.push(entry);
      }
    });

    setFiles((prev) => [...prev, ...imageFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
    if (selectedFileId === id) {
      setSelectedFileId(null);
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      setError('Please add at least one image file.');
      return;
    }

    setError(null);
    setSuccessMessage(null);
    setIsProcessing(true);

    try {
      const filesToProcess = activeOperation === 'removeBackground' || activeOperation === 'toSvg' || activeOperation === 'toVector'
        ? (selectedFile ? [selectedFile] : [])
        : files;

      if (filesToProcess.length === 0) {
        throw new Error('Please select a file for this operation.');
      }

      const results: Array<{ blob: Blob; filename: string }> = [];

      for (const entry of filesToProcess) {
        let result;

        switch (activeOperation) {
          case 'convert':
            result = await convertImage(entry.file, targetFormat);
            break;
          case 'compress':
            result = await compressImage(entry.file, compressOptions);
            break;
          case 'removeBackground':
            result = await removeBackground(entry.file, bgRemovalOptions);
            break;
          case 'toSvg':
            result = await convertToSvg(entry.file);
            break;
          case 'toVector':
            result = await convertToVector(entry.file, vectorOptions);
            break;
          default:
            throw new Error('Unsupported operation.');
        }

        results.push({ blob: result.blob, filename: result.filename });
      }

      // Download results
      if (results.length > 5) {
        await downloadBatchAsZip(results, `images-${activeOperation}-${Date.now()}.zip`);
        setSuccessMessage(`Processed ${results.length} images (bundled as ZIP).`);
      } else {
        results.forEach((r) => downloadBlob(r.blob, r.filename));
        setSuccessMessage(`Processed ${results.length} image${results.length === 1 ? '' : 's'}.`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong while processing the image.';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    files.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });
    setFiles([]);
    setSelectedFileId(null);
    setError(null);
    setSuccessMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canProcess = useMemo(() => {
    if (files.length === 0) return false;
    if (activeOperation === 'removeBackground' || activeOperation === 'toSvg' || activeOperation === 'toVector') {
      return !!selectedFile;
    }
    return true;
  }, [files.length, activeOperation, selectedFile]);

  return (
    <div className="space-y-6">
      {/* Operation Selection */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Operation</label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(['convert', 'compress', 'removeBackground', 'toSvg', 'toVector'] as ImageOperationType[]).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => setActiveOperation(op)}
              disabled={isProcessing}
              className={[
                'rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition',
                activeOperation === op
                  ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                  : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent',
                isProcessing ? 'cursor-not-allowed opacity-60' : '',
              ].join(' ')}
            >
              {op === 'removeBackground' ? 'Remove BG' : op === 'toSvg' ? 'To SVG' : op === 'toVector' ? 'To Vector' : op}
            </button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Upload Images</label>
        <div className="mt-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-secondary"
          />
          <p className="mt-2 text-xs text-slate-400">Select one or more image files to process.</p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Uploaded Images</label>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <div
                key={file.id}
                className={[
                  'relative overflow-hidden rounded-2xl border p-3 transition',
                  selectedFileId === file.id
                    ? 'border-brand-accent bg-brand-accent/10'
                    : 'border-white/10 bg-slate-900/50',
                ].join(' ')}
              >
                {file.preview && (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="h-32 w-full object-cover rounded-xl"
                    onClick={() => setSelectedFileId(file.id)}
                  />
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-semibold text-white">{file.name}</p>
                    <p className="text-xs text-slate-400">
                      {file.width && file.height ? `${file.width}×${file.height}` : ''} • {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.id)}
                    className="ml-2 rounded-lg border border-rose-400/30 bg-rose-400/10 px-2 py-1 text-xs font-semibold text-rose-300 transition hover:bg-rose-400/20"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Operation Controls */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        {(activeOperation === 'removeBackground' || activeOperation === 'toSvg' || activeOperation === 'toVector') && files.length > 0 && (
          <div className="mb-4 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Select Image</label>
            <select
              value={selectedFileId || ''}
              onChange={(e) => setSelectedFileId(e.target.value || null)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
            >
              <option value="">Select an image</option>
              {files.map((file) => (
                <option key={file.id} value={file.id}>
                  {file.name} {file.width && file.height ? `(${file.width}×${file.height})` : ''}
                </option>
              ))}
            </select>
          </div>
        )}
        <OperationControls
          activeOperation={activeOperation}
          targetFormat={targetFormat}
          onFormatChange={setTargetFormat}
          compressOptions={compressOptions}
          onCompressOptionsChange={setCompressOptions}
          bgRemovalOptions={bgRemovalOptions}
          onBgRemovalOptionsChange={setBgRemovalOptions}
          vectorOptions={vectorOptions}
          onVectorOptionsChange={setVectorOptions}
          selectedFile={selectedFile}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleProcess}
          disabled={!canProcess || isProcessing}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/40 transition hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : `Process ${files.length > 1 ? `${files.length} images` : 'image'}`}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={isProcessing}
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear All
        </button>
      </div>

      {/* Messages */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {successMessage && <p className="text-sm text-emerald-400">{successMessage}</p>}
    </div>
  );
}

// Operation Controls Component
interface OperationControlsProps {
  activeOperation: ImageOperationType;
  targetFormat: ImageFormat;
  onFormatChange: (format: ImageFormat) => void;
  compressOptions: CompressOptions;
  onCompressOptionsChange: (options: CompressOptions) => void;
  bgRemovalOptions: BackgroundRemovalOptions;
  onBgRemovalOptionsChange: (options: BackgroundRemovalOptions) => void;
  vectorOptions: VectorOptions;
  onVectorOptionsChange: (options: VectorOptions) => void;
  selectedFile: ImageFileEntry | null;
}

function OperationControls({
  activeOperation,
  targetFormat,
  onFormatChange,
  compressOptions,
  onCompressOptionsChange,
  bgRemovalOptions,
  onBgRemovalOptionsChange,
  vectorOptions,
  onVectorOptionsChange,
  selectedFile,
}: OperationControlsProps) {
  if (activeOperation === 'convert') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Target Format</label>
          <select
            value={targetFormat}
            onChange={(e) => onFormatChange(e.target.value as ImageFormat)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WebP</option>
            <option value="svg">SVG</option>
            <option value="bmp">BMP</option>
            <option value="gif">GIF</option>
          </select>
        </div>
      </div>
    );
  }


  if (activeOperation === 'compress') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Quality: {compressOptions.quality}%</label>
          <input
            type="range"
            min="10"
            max="100"
            value={compressOptions.quality}
            onChange={(e) =>
              onCompressOptionsChange({ ...compressOptions, quality: parseInt(e.target.value, 10) })
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Output Format</label>
          <select
            value={compressOptions.format}
            onChange={(e) => onCompressOptionsChange({ ...compressOptions, format: e.target.value as ImageFormat })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          >
            <option value="jpg">JPG</option>
            <option value="webp">WebP</option>
            <option value="png">PNG</option>
          </select>
        </div>
      </div>
    );
  }


  if (activeOperation === 'removeBackground') {
    return (
      <div className="space-y-4">
        {selectedFile && (
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-2">
            <p className="mb-2 text-xs text-slate-400">Selected: {selectedFile.name}</p>
            {selectedFile.preview && (
              <img src={selectedFile.preview} alt="Preview" className="max-h-64 rounded-lg" />
            )}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Tolerance: {bgRemovalOptions.tolerance}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={bgRemovalOptions.tolerance}
            onChange={(e) =>
              onBgRemovalOptionsChange({ ...bgRemovalOptions, tolerance: parseInt(e.target.value, 10) })
            }
            className="w-full"
          />
          <p className="text-xs text-slate-400">
            Lower values remove only exact background colors. Higher values remove similar colors (may affect foreground).
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Sampling Method</label>
          <select
            value={bgRemovalOptions.sampleMethod}
            onChange={(e) =>
              onBgRemovalOptionsChange({
                ...bgRemovalOptions,
                sampleMethod: e.target.value as 'corners' | 'edges' | 'smart',
              })
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          >
            <option value="corners">Corners - Sample corner pixels only</option>
            <option value="edges">Edges - Sample edge pixels</option>
            <option value="smart">Smart - Automatic best results</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="edge-refinement"
            checked={bgRemovalOptions.edgeRefinement}
            onChange={(e) =>
              onBgRemovalOptionsChange({ ...bgRemovalOptions, edgeRefinement: e.target.checked })
            }
            className="h-5 w-5 rounded border-white/10 bg-slate-900/70 text-brand-primary focus:ring-brand-accent"
          />
          <label htmlFor="edge-refinement" className="text-sm font-semibold text-slate-300">
            Enable Edge Refinement (Better for fine details)
          </label>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
          <p className="text-xs text-amber-200">
            <strong>Note:</strong> Background removal works best with images that have a solid or uniform background color. 
            Complex backgrounds may require manual editing. The result will be saved as PNG with transparency.
          </p>
        </div>
      </div>
    );
  }

  if (activeOperation === 'toSvg') {
    return (
      <div className="space-y-4">
        {selectedFile && (
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-2">
            <p className="mb-2 text-xs text-slate-400">Selected: {selectedFile.name}</p>
            {selectedFile.preview && (
              <img src={selectedFile.preview} alt="Preview" className="max-h-64 rounded-lg" />
            )}
          </div>
        )}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3">
          <p className="text-xs text-blue-200">
            <strong>Info:</strong> SVG conversion embeds your raster image in an SVG wrapper, making it scalable without losing quality. 
            Perfect for logos, icons, and graphics that need to work at various sizes.
          </p>
        </div>
      </div>
    );
  }

  if (activeOperation === 'toVector') {
    return (
      <div className="space-y-4">
        {selectedFile && (
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-2">
            <p className="mb-2 text-xs text-slate-400">Selected: {selectedFile.name}</p>
            {selectedFile.preview && (
              <img src={selectedFile.preview} alt="Preview" className="max-h-64 rounded-lg" />
            )}
          </div>
        )}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Number of Colors: {vectorOptions.colors}</label>
          <input
            type="range"
            min="2"
            max="256"
            value={vectorOptions.colors}
            onChange={(e) =>
              onVectorOptionsChange({ ...vectorOptions, colors: parseInt(e.target.value, 10) })
            }
            className="w-full"
          />
          <p className="text-xs text-slate-400">
            Lower values (8-32) create a stylized, posterized look. Higher values (64-256) preserve more detail.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Smoothness: {vectorOptions.smoothness}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={vectorOptions.smoothness}
            onChange={(e) =>
              onVectorOptionsChange({ ...vectorOptions, smoothness: parseInt(e.target.value, 10) })
            }
            className="w-full"
          />
          <p className="text-xs text-slate-400">
            Higher smoothness creates cleaner, more simplified vectors. Lower values preserve more detail.
          </p>
        </div>
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3">
          <p className="text-xs text-blue-200">
            <strong>Info:</strong> Vector conversion creates a stylized, simplified version with reduced colors. 
            Perfect for creating scalable logos, icons, and stylized graphics from photographs.
          </p>
        </div>
      </div>
    );
  }

  return null;
}


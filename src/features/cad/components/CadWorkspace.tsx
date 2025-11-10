import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { parseDxfFile, parseDwgFile, parseSkpFile, renderDxfToCanvas, calculateDistance, convertCadFormat } from '../services/cadProcessing';
import { downloadBlob } from '../../../lib/download';
import type { CadFileEntry, CadOperationType, CadFileFormat, CadLayer, CadViewOptions, CadMeasurement } from '../types';
import * as THREE from 'three';

export function CadWorkspace() {
  const [files, setFiles] = useState<CadFileEntry[]>([]);
  const [activeOperation, setActiveOperation] = useState<CadOperationType>('view');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // View state
  const [entities, setEntities] = useState<Array<{
    type: string;
    layer: string;
    vertices?: Array<{ x: number; y: number }>;
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    center?: { x: number; y: number };
    radius?: number;
  }>>([]);
  const [layers, setLayers] = useState<CadLayer[]>([]);
  const [bounds, setBounds] = useState<{ minX: number; minY: number; maxX: number; maxY: number }>({
    minX: -100,
    minY: -100,
    maxX: 100,
    maxY: 100,
  });
  const [viewOptions, setViewOptions] = useState<CadViewOptions>({
    showLayers: true,
    showGrid: false,
    backgroundColor: '#070b1a',
    lineColor: '#22d3ee',
    zoom: 1,
  });
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [measurements, setMeasurements] = useState<CadMeasurement[]>([]);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measureStart, setMeasureStart] = useState<{ x: number; y: number } | null>(null);
  const [is3D, setIs3D] = useState(false);
  const [threeScene, setThreeScene] = useState<THREE.Scene | null>(null);
  const [threeCamera, setThreeCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [threeRenderer, setThreeRenderer] = useState<THREE.WebGLRenderer | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedFile = files.find((f) => f.id === selectedFileId) || files[0] || null;

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    const cadFiles: CadFileEntry[] = [];
    Array.from(newFiles).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'dxf' || ext === 'dwg' || ext === 'skp') {
        const id = nanoid();
        cadFiles.push({
          id,
          file,
          name: file.name,
          size: file.size,
          format: ext as CadFileFormat,
        });
      }
    });

    setFiles((prev) => [...prev, ...cadFiles]);
    if (cadFiles.length > 0 && !selectedFileId) {
      setSelectedFileId(cadFiles[0].id);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (selectedFileId === id) {
      setSelectedFileId(null);
      setEntities([]);
      setLayers([]);
    }
  };

  // Load and parse CAD file
  useEffect(() => {
    if (selectedFile && activeOperation === 'view') {
      setIsProcessing(true);
      setError(null);
      setPanOffset({ x: 0, y: 0 });
      setViewOptions((prev) => ({ ...prev, zoom: 1 }));

      if (selectedFile.format === 'dxf') {
        parseDxfFile(selectedFile.file)
          .then((result) => {
            setEntities(result.entities);
            setLayers(result.layers);
            setBounds(result.bounds);
            setIs3D(false);
            setIsProcessing(false);
          })
          .catch((err) => {
            setError(err instanceof Error ? err.message : 'Failed to parse DXF file');
            setIsProcessing(false);
          });
      } else if (selectedFile.format === 'dwg') {
        parseDwgFile(selectedFile.file)
          .then((result) => {
            setEntities(result.entities);
            setLayers(result.layers);
            setBounds(result.bounds);
            setIs3D(false);
            setIsProcessing(false);
          })
          .catch((err) => {
            setError(err instanceof Error ? err.message : 'Failed to parse DWG file');
            setIsProcessing(false);
          });
      } else if (selectedFile.format === 'skp') {
        setIsProcessing(false);
        setError(
          'SKP (SketchUp) files are proprietary binary format and require server-side conversion. ' +
          'To view SKP files in this browser-based viewer, please convert them to DXF or DWG format first using SketchUp, AutoCAD, or another CAD application. ' +
          'Alternatively, you can use SketchUp\'s web viewer or desktop application to view SKP files directly.',
        );
        setEntities([]);
        setLayers([]);
        setIs3D(false);
      }
    }
  }, [selectedFile, activeOperation]);

  // Render canvas
  useEffect(() => {
    if (canvasRef.current && entities.length > 0) {
      const canvas = canvasRef.current;
      const width = canvas.width;
      const height = canvas.height;

      renderDxfToCanvas(canvas, entities, layers, bounds, {
        backgroundColor: viewOptions.backgroundColor,
        lineColor: viewOptions.lineColor,
        zoom: viewOptions.zoom,
        offsetX: panOffset.x,
        offsetY: panOffset.y,
        showGrid: viewOptions.showGrid,
      });

      // Draw measurements
      if (measurements.length > 0) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = bounds.maxX - bounds.minX;
          const height = bounds.maxY - bounds.minY;
          const scaleX = (canvas.width * 0.9) / Math.max(width, 1);
          const scaleY = (canvas.height * 0.9) / Math.max(height, 1);
          const scale = Math.min(scaleX, scaleY) * viewOptions.zoom;

          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const centerDxfX = (bounds.minX + bounds.maxX) / 2;
          const centerDxfY = (bounds.minY + bounds.maxY) / 2;

          const transformX = (x: number) => centerX + (x - centerDxfX) * scale + panOffset.x;
          const transformY = (y: number) => centerY - (y - centerDxfY) * scale - panOffset.y;

          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);

          for (const measurement of measurements) {
            ctx.beginPath();
            ctx.moveTo(transformX(measurement.start.x), transformY(measurement.start.y));
            ctx.lineTo(transformX(measurement.end.x), transformY(measurement.end.y));
            ctx.stroke();

            // Draw distance label
            const midX = (measurement.start.x + measurement.end.x) / 2;
            const midY = (measurement.start.y + measurement.end.y) / 2;
            ctx.fillStyle = '#f97316';
            ctx.font = '12px sans-serif';
            ctx.fillText(
              `${measurement.distance.toFixed(2)} units`,
              transformX(midX) + 5,
              transformY(midY) - 5,
            );
          }

          ctx.setLineDash([]);
        }
      }
    }
  }, [entities, layers, bounds, viewOptions, measurements, panOffset]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !bounds) return;

    if (isPanning) {
      const rect = canvasRef.current.getBoundingClientRect();
      setPanStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      return;
    }

    if (isMeasuring) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const width = bounds.maxX - bounds.minX;
      const height = bounds.maxY - bounds.minY;
      const scaleX = (canvas.width * 0.9) / Math.max(width, 1);
      const scaleY = (canvas.height * 0.9) / Math.max(height, 1);
      const scale = Math.min(scaleX, scaleY) * viewOptions.zoom;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const centerDxfX = (bounds.minX + bounds.maxX) / 2;
      const centerDxfY = (bounds.minY + bounds.maxY) / 2;

      const dxfX = centerDxfX + (x - centerX - panOffset.x) / scale;
      const dxfY = centerDxfY - (y - centerY + panOffset.y) / scale; // Flip Y for pan offset

      if (!measureStart) {
        setMeasureStart({ x: dxfX, y: dxfY });
      } else {
        const distance = calculateDistance(measureStart, { x: dxfX, y: dxfY }, bounds, scale);
        setMeasurements((prev) => [
          ...prev,
          {
            start: measureStart,
            end: { x: dxfX, y: dxfY },
            distance,
          },
        ]);
        setMeasureStart(null);
        setIsMeasuring(false);
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPanning || !panStart || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setPanOffset((prev) => ({
      x: prev.x + (currentX - panStart.x),
      y: prev.y + (currentY - panStart.y),
    }));

    setPanStart({ x: currentX, y: currentY });
  };

  const handleCanvasMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
    }
  };

  const toggleLayer = (layerName: string) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.name === layerName ? { ...layer, visible: !layer.visible } : layer)),
    );
  };

  const handleExport = async (format: 'png' | 'svg') => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    if (format === 'png') {
      canvas.toBlob((blob) => {
        if (blob) {
          downloadBlob(blob, `${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'cad'}-export.png`);
          setSuccessMessage('Exported as PNG');
        }
      });
    } else {
      // SVG export would require converting canvas to SVG
      setError('SVG export not yet implemented');
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select a file to convert');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // For now, only DXF to DXF is supported
      // DWG and SKP conversion requires server-side processing
      const result = await convertCadFormat(selectedFile.file, selectedFile.format || 'dxf', 'dxf');
      downloadBlob(result, `${selectedFile.name.replace(/\.[^/.]+$/, '')}-converted.dxf`);
      setSuccessMessage('File converted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Operation Selection */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Operation</label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {(['view', 'convert'] as CadOperationType[]).map((op) => (
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
              {op === 'view' ? 'View CAD File' : 'Convert Format'}
            </button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Upload CAD Files</label>
        <div className="mt-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".dxf,.dwg,.skp"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-2xl border-2 border-dashed border-white/20 bg-slate-900/50 px-6 py-12 text-center transition hover:border-brand-accent/50 hover:bg-slate-900/70"
          >
            <p className="text-sm font-semibold text-slate-300">Click to upload or drag and drop</p>
            <p className="mt-2 text-xs text-slate-400">DXF, DWG, or SKP files</p>
          </button>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">{file.name}</span>
                  <span className="text-xs text-slate-400">
                    {file.format?.toUpperCase()} • {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.id)}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeOperation === 'view' && (
        <div className="space-y-4">
          {files.length > 0 && (
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Select CAD File</label>
              <select
                value={selectedFileId || ''}
                onChange={(e) => setSelectedFileId(e.target.value || null)}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
              >
                <option value="">Select a CAD file</option>
                {files.map((file) => (
                  <option key={file.id} value={file.id}>
                    {file.name} ({file.format?.toUpperCase() || 'Unknown'}) - {(file.size / 1024).toFixed(1)} KB
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedFile && (
            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            {/* Layer Panel */}
            {viewOptions.showLayers && layers.length > 0 && (
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Layers</h3>
              <div className="space-y-2 max-h-[800px] overflow-y-auto">
                {layers.map((layer) => (
                  <label key={layer.name} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={layer.visible}
                      onChange={() => toggleLayer(layer.name)}
                      className="h-4 w-4 rounded border-white/10 bg-slate-900/70 text-brand-primary focus:ring-brand-accent"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <div
                        className="h-4 w-4 rounded border border-white/20"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="text-sm text-slate-300">{layer.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">CAD Viewer</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsPanning(!isPanning)}
                  className={[
                    'rounded-full border px-3 py-1 text-xs font-semibold transition',
                    isPanning
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                      : 'border-white/10 bg-slate-900/70 text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent',
                  ].join(' ')}
                >
                  {isPanning ? 'Panning...' : 'Pan'}
                </button>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={viewOptions.showGrid}
                    onChange={(e) => setViewOptions((prev) => ({ ...prev, showGrid: e.target.checked }))}
                    className="h-4 w-4 rounded border-white/10 bg-slate-900/70 text-brand-primary focus:ring-brand-accent"
                  />
                  <span className="text-xs text-slate-300">Grid</span>
                </label>
                <button
                  type="button"
                  onClick={() => setViewOptions((prev) => ({ ...prev, zoom: Math.max(0.1, prev.zoom - 0.1) }))}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                >
                  −
                </button>
                <span className="text-sm text-slate-300">{(viewOptions.zoom * 100).toFixed(0)}%</span>
                <button
                  type="button"
                  onClick={() => setViewOptions((prev) => ({ ...prev, zoom: Math.min(5, prev.zoom + 0.1) }))}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-sm text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewOptions((prev) => ({ ...prev, zoom: 1 }));
                    setPanOffset({ x: 0, y: 0 });
                  }}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden min-h-[800px]">
              {is3D && threeContainerRef.current && threeRenderer ? (
                <div
                  ref={threeContainerRef}
                  className="w-full h-full"
                  style={{ minHeight: '800px' }}
                  onMouseDown={() => {
                    if (threeContainerRef.current) {
                      threeContainerRef.current.appendChild(threeRenderer.domElement);
                    }
                  }}
                >
                  <div className="flex h-full min-h-[800px] items-center justify-center p-8">
                    <div className="max-w-md rounded-2xl border border-brand-accent/30 bg-brand-accent/10 p-6 text-center">
                      <div className="mb-4 text-4xl">📐</div>
                      <h3 className="mb-2 text-lg font-semibold text-white">SKP File Format Not Supported</h3>
                      <p className="mb-4 text-sm text-slate-300">
                        SketchUp SKP files are proprietary binary format and cannot be viewed directly in this browser-based viewer.
                      </p>
                      <div className="space-y-2 text-left text-xs text-slate-400">
                        <p className="font-semibold text-slate-300">To view SKP files:</p>
                        <ul className="ml-4 list-disc space-y-1">
                          <li>Convert to DXF or DWG using SketchUp or AutoCAD</li>
                          <li>Use SketchUp's web viewer at viewer.sketchup.com</li>
                          <li>Open in SketchUp desktop application</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  width={1600}
                  height={1000}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  className={[
                    'w-full h-auto',
                    isPanning ? 'cursor-grab active:cursor-grabbing' : isMeasuring ? 'cursor-crosshair' : 'cursor-default',
                  ].join(' ')}
                />
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMeasuring(!isMeasuring)}
                className={[
                  'rounded-2xl border px-4 py-2 text-sm font-semibold transition',
                  isMeasuring
                    ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                    : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent',
                ].join(' ')}
              >
                {isMeasuring ? 'Cancel Measure' : 'Measure Distance'}
              </button>
              {measurements.length > 0 && (
                <button
                  type="button"
                  onClick={() => setMeasurements([])}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
                >
                  Clear Measurements
                </button>
              )}
              <button
                type="button"
                onClick={() => handleExport('png')}
                className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand-accent/50 hover:text-brand-accent"
              >
                Export PNG
              </button>
            </div>
          </div>
            </div>
          )}
        </div>
      )}

      {activeOperation === 'convert' && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Convert Format</h3>
          <p className="mb-4 text-sm text-slate-300">
            CAD format conversion (DWG to DXF, DXF to SKP, etc.) requires server-side processing. For now, only DXF
            files can be viewed directly in the browser. Please use desktop CAD applications for format conversion.
          </p>
          {selectedFile && (
            <button
              type="button"
              onClick={handleConvert}
              disabled={isProcessing || selectedFile.format !== 'dxf'}
              className="rounded-2xl border border-brand-accent bg-brand-accent/10 px-6 py-3 text-sm font-semibold text-brand-accent transition hover:bg-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Converting...' : 'Convert (DXF only)'}
            </button>
          )}
        </div>
      )}

      {/* Messages */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {successMessage && <p className="text-sm text-emerald-400">{successMessage}</p>}
    </div>
  );
}


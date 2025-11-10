import { useState, useMemo } from 'react';
import { generateQrCode, generateBatchQrCodes } from '../services/qrGeneration';
import { downloadBlob, downloadBatchAsZip } from '../../../lib/download';
import type { QrCodeType, QrCodeOptions, VCardData, WifiData, GeoData } from '../types';
import Papa from 'papaparse';

export function QrWorkspace() {
  const [qrType, setQrType] = useState<QrCodeType>('text');
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [vCardData, setVCardData] = useState<VCardData>({});
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false,
  });
  const [geoData, setGeoData] = useState<GeoData>({
    latitude: 0,
    longitude: 0,
  });
  const [options, setOptions] = useState<QrCodeOptions>({
    size: 300,
    margin: 4,
    errorCorrectionLevel: 'M',
    colorDark: '#000000',
    colorLight: '#FFFFFF',
    logoSize: 45, // Default to 15% of 300px
  });
  const [logoFile, setLogoFile] = useState<File | undefined>();
  const [qrResult, setQrResult] = useState<{ dataUrl: string; svg: string; filename: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [batchMode, setBatchMode] = useState(false);

  const canGenerate = useMemo(() => {
    if (batchMode) {
      return !!csvFile;
    }

    switch (qrType) {
      case 'text':
      case 'url':
        return qrType === 'text' ? !!textContent.trim() : !!urlContent.trim();
      case 'vcard':
        return !!(vCardData.firstName || vCardData.lastName || vCardData.email || vCardData.phone);
      case 'wifi':
        return !!wifiData.ssid;
      case 'geo':
        return geoData.latitude !== 0 || geoData.longitude !== 0;
      default:
        return false;
    }
  }, [batchMode, csvFile, qrType, textContent, urlContent, vCardData, wifiData, geoData]);

  const handleGenerate = async () => {
    setError(null);
    setSuccessMessage(null);
    setIsProcessing(true);

    try {
      if (batchMode && csvFile) {
        // Parse CSV
        const csvText = await csvFile.text();
        const parsed = Papa.parse<Record<string, string>>(csvText, {
          header: true,
          skipEmptyLines: true,
        });

        if (parsed.errors.length > 0) {
          throw new Error('CSV parsing failed. Please check your CSV format.');
        }

        const results = await generateBatchQrCodes(parsed.data, qrType, {
          ...options,
          logo: logoFile,
        });

        if (results.length > 5) {
          const zipFiles = results.map((r) => ({
            blob: dataUrlToBlob(r.dataUrl),
            filename: r.filename,
          }));
          await downloadBatchAsZip(zipFiles, `qrcodes-batch-${Date.now()}.zip`);
          setSuccessMessage(`Generated ${results.length} QR codes (bundled as ZIP).`);
        } else {
          results.forEach((r) => {
            downloadBlob(dataUrlToBlob(r.dataUrl), r.filename);
          });
          setSuccessMessage(`Generated ${results.length} QR codes.`);
        }
      } else {
        // Single QR code
        let content: string | VCardData | WifiData | GeoData;
        switch (qrType) {
          case 'text':
            content = textContent;
            break;
          case 'url':
            content = urlContent;
            break;
          case 'vcard':
            content = vCardData;
            break;
          case 'wifi':
            content = wifiData;
            break;
          case 'geo':
            content = geoData;
            break;
          default:
            throw new Error('Invalid QR code type');
        }

        const result = await generateQrCode(qrType, content, {
          ...options,
          logo: logoFile,
        });

        setQrResult(result);
        setSuccessMessage('QR code generated successfully!');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate QR code';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPng = () => {
    if (!qrResult) return;
    const blob = dataUrlToBlob(qrResult.dataUrl);
    downloadBlob(blob, qrResult.filename);
  };

  const handleDownloadSvg = () => {
    if (!qrResult) return;
    const blob = new Blob([qrResult.svg], { type: 'image/svg+xml' });
    downloadBlob(blob, qrResult.filename.replace('.png', '.svg'));
  };

  const handleClear = () => {
    setTextContent('');
    setUrlContent('');
    setVCardData({});
    setWifiData({
      ssid: '',
      password: '',
      security: 'WPA',
      hidden: false,
    });
    setGeoData({
      latitude: 0,
      longitude: 0,
    });
    setOptions({
      size: 300,
      margin: 4,
      errorCorrectionLevel: 'M',
      colorDark: '#000000',
      colorLight: '#FFFFFF',
      logoSize: 45,
    });
    setLogoFile(undefined);
    setQrResult(null);
    setError(null);
    setSuccessMessage(null);
    setCsvFile(null);
    setBatchMode(false);
  };

  const dataUrlToBlob = (dataUrl: string): Blob => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div className="space-y-6">
      {/* QR Type Selection */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">QR Code Type</label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {(['text', 'url', 'vcard', 'wifi', 'geo'] as QrCodeType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setQrType(type)}
              disabled={isProcessing}
              className={[
                'rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition',
                qrType === type
                  ? 'border-brand-accent bg-brand-accent/10 text-brand-accent'
                  : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-brand-accent/50 hover:text-brand-accent',
                isProcessing ? 'cursor-not-allowed opacity-60' : '',
              ].join(' ')}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Content Input */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <div className="space-y-4">
          {qrType === 'text' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Text Content</label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter text to encode..."
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
              />
            </div>
          )}

          {qrType === 'url' && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">URL</label>
              <input
                type="url"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/40"
              />
            </div>
          )}

          {qrType === 'vcard' && <VCardInputs data={vCardData} onChange={setVCardData} />}

          {qrType === 'wifi' && <WifiInputs data={wifiData} onChange={setWifiData} />}

          {qrType === 'geo' && <GeoInputs data={geoData} onChange={setGeoData} />}
        </div>
      </div>

      {/* Options */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Options</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Size (px)</label>
            <input
              type="number"
              min="100"
              max="1000"
              value={options.size}
              onChange={(e) => setOptions({ ...options, size: parseInt(e.target.value, 10) || 300 })}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Margin</label>
            <input
              type="number"
              min="0"
              max="10"
              value={options.margin}
              onChange={(e) => setOptions({ ...options, margin: parseInt(e.target.value, 10) || 4 })}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Error Correction</label>
            <select
              value={options.errorCorrectionLevel}
              onChange={(e) =>
                setOptions({ ...options, errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' })
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
            >
              <option value="L">L (Low ~7%)</option>
              <option value="M">M (Medium ~15%)</option>
              <option value="Q">Q (Quartile ~25%)</option>
              <option value="H">H (High ~30%)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Foreground Color</label>
            <input
              type="color"
              value={options.colorDark}
              onChange={(e) => setOptions({ ...options, colorDark: e.target.value })}
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/70"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Background Color</label>
            <input
              type="color"
              value={options.colorLight}
              onChange={(e) => setOptions({ ...options, colorLight: e.target.value })}
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/70"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Logo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setLogoFile(file);
                // Auto-adjust error correction to Q when logo is added
                if (file && options.errorCorrectionLevel !== 'H') {
                  setOptions({ ...options, errorCorrectionLevel: 'Q' });
                }
              }}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-secondary"
            />
            {logoFile && (
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Selected: {logoFile.name}</p>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2">
                  <p className="text-xs text-amber-200">
                    <strong>Tip:</strong> Error correction automatically set to Q for better scannability with logo. Logo size limited to 25% of QR code size. Transparent backgrounds are preserved - use PNG logos with transparency for best results.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Batch Mode */}
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="batch-mode"
            checked={batchMode}
            onChange={(e) => setBatchMode(e.target.checked)}
            className="h-5 w-5 rounded border-white/10 bg-slate-900/70 text-brand-primary focus:ring-brand-accent"
          />
          <label htmlFor="batch-mode" className="text-sm font-semibold text-slate-300">
            Batch Mode (CSV)
          </label>
        </div>
        {batchMode && (
          <div className="mt-4 space-y-2">
            <label className="text-xs font-semibold text-slate-300">CSV File</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-secondary"
            />
            <p className="text-xs text-slate-400">
              CSV should have a column matching your QR type (e.g., "content" for text/url, or vCard fields).
            </p>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate || isProcessing}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/40 transition hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? 'Generating...' : batchMode ? 'Generate Batch QR Codes' : 'Generate QR Code'}
        </button>
        {qrResult && !batchMode && (
          <>
            <button
              type="button"
              onClick={handleDownloadPng}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              Download PNG
            </button>
            <button
              type="button"
              onClick={handleDownloadSvg}
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              Download SVG
            </button>
          </>
        )}
        <button
          type="button"
          onClick={handleClear}
          disabled={isProcessing}
          className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear All
        </button>
      </div>

      {/* Error/Success Messages */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {successMessage && <p className="text-sm text-emerald-400">{successMessage}</p>}

      {/* QR Code Preview */}
      {qrResult && !batchMode && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Preview</h3>
          <div className="flex justify-center">
            <img src={qrResult.dataUrl} alt="Generated QR Code" className="rounded-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}

// VCard Input Component
function VCardInputs({ data, onChange }: { data: VCardData; onChange: (data: VCardData) => void }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">First Name</label>
          <input
            type="text"
            value={data.firstName || ''}
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Last Name</label>
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Organization</label>
          <input
            type="text"
            value={data.organization || ''}
            onChange={(e) => onChange({ ...data, organization: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Title</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Phone</label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Email</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">URL</label>
        <input
          type="url"
          value={data.url || ''}
          onChange={(e) => onChange({ ...data, url: e.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Address</label>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Street"
            value={data.address?.street || ''}
            onChange={(e) => onChange({ ...data, address: { ...data.address, street: e.target.value } })}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
          <input
            type="text"
            placeholder="City"
            value={data.address?.city || ''}
            onChange={(e) => onChange({ ...data, address: { ...data.address, city: e.target.value } })}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
          <input
            type="text"
            placeholder="State"
            value={data.address?.state || ''}
            onChange={(e) => onChange({ ...data, address: { ...data.address, state: e.target.value } })}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
          <input
            type="text"
            placeholder="ZIP"
            value={data.address?.zip || ''}
            onChange={(e) => onChange({ ...data, address: { ...data.address, zip: e.target.value } })}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
          <input
            type="text"
            placeholder="Country"
            value={data.address?.country || ''}
            onChange={(e) => onChange({ ...data, address: { ...data.address, country: e.target.value } })}
            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

// Wi-Fi Input Component
function WifiInputs({ data, onChange }: { data: WifiData; onChange: (data: WifiData) => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">SSID (Network Name)</label>
        <input
          type="text"
          value={data.ssid}
          onChange={(e) => onChange({ ...data, ssid: e.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Password</label>
        <input
          type="password"
          value={data.password}
          onChange={(e) => onChange({ ...data, password: e.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Security Type</label>
          <select
            value={data.security}
            onChange={(e) => onChange({ ...data, security: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </select>
        </div>
        <div className="flex items-center gap-3 pt-8">
          <input
            type="checkbox"
            id="hidden-network"
            checked={data.hidden || false}
            onChange={(e) => onChange({ ...data, hidden: e.target.checked })}
            className="h-5 w-5 rounded border-white/10 bg-slate-900/70 text-brand-primary focus:ring-brand-accent"
          />
          <label htmlFor="hidden-network" className="text-sm font-semibold text-slate-300">
            Hidden Network
          </label>
        </div>
      </div>
    </div>
  );
}

// Geo Input Component
function GeoInputs({ data, onChange }: { data: GeoData; onChange: (data: GeoData) => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Latitude</label>
        <input
          type="number"
          step="any"
          value={data.latitude}
          onChange={(e) => onChange({ ...data, latitude: parseFloat(e.target.value) || 0 })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">Longitude</label>
        <input
          type="number"
          step="any"
          value={data.longitude}
          onChange={(e) => onChange({ ...data, longitude: parseFloat(e.target.value) || 0 })}
          className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
        />
      </div>
    </div>
  );
}


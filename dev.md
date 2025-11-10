TrimToolsHub — Software System Design Document (SDD)
0) One-liner

A privacy-first web app for everyday file utilities: PDF tools, QR/vCard, barcodes, and lightweight CAD viewers. Client-side by default; optional microservices handle heavy/locked formats. Monetized with Google AdSense; tracked with Google Analytics 4 and Meta Pixel.

1) Goals & Non-Goals
Goals

Run entirely in the browser for core tools: fast, private, no uploads.

Provide PDF (merge/split/compress/convert/sign/annotate/OCR/form-fill), QR/vCard, Barcodes (single + batch), DXF 2D viewer with zoom/pan/layers and simple measurements.

Offer optional backends for heavyweight conversions: DWG→DXF/SVG/PNG, images→OCR PDF, and SKP→glTF (when user cannot export locally).

Integrate Google Analytics 4, Meta Pixel, and AdSense.

Ship a polished PWA (installable, offline for client-side tools).

Non-Goals

No server-side storage of user files (transient in memory or presigned upload if conversion service is used).

No account system in v1 (optional later if you want cloud history).

2) Personas / User Stories

Designer/PM: “I need a quick DXF view and to export a PNG for a slide.”

Office user: “Merge 5 PDFs, extract pages 3–8, compress under 2 MB, then e-sign.”

Marketer: “Generate 100 barcodes and 100 vCard QRs from CSV and lay them out on an A4 label sheet.”

Admin: “I want analytics on which tools are used most and to run A/B on a new CTA.”

Key user stories (acceptance criteria later):

View DXF, zoom/pan, toggle layers, measure distance, export PNG/SVG/JSON snapshot.

Merge PDFs (n files), split by ranges, extract pages, rotate, reorder.

Compress PDF with selectable quality targets.

Add image/text watermark and e-signature (draw/type/upload) to PDF; save new file.

Convert images (PNG/JPG) to single PDF or multipage PDF.

OCR images to searchable PDF (client-side with WASM).

Build QR codes (text/URL/Wi-Fi/vCard), style options, export PNG/SVG.

Create barcodes (CODE128, EAN-13, QR as barcode), single or CSV batch; output print-ready PDFs.

Optional: Upload DWG/SKP and get a converted viewable format through a stateless microservice.

3) Feature Matrix (v1 vs v1.1 vs v2)
Area	v1 (MVP)	v1.1	v2 (stretch)
PDF merge/split/extract/rotate	✅ client-only	reorder via drag	rearrange thumbnails, bookmarks
PDF compress	✅ (pdf-lib + canvas)	target size hint	multi-pass optimizer
PDF sign/watermark	✅	multiple signatures	certificate-based signing (PKI)
Image → PDF	✅	DPI control	batch folders
OCR	✅ Tesseract.js WASM	language packs	form OCR (structured)
QR/vCard	✅	logo-in-center, colors	dynamic QR shortlinks (needs backend)
Barcodes	✅ CODE128, EAN-13	Code39, UPC-A	GS1 AI composer
Batch QR/Barcode	✅ CSV import	XLSX import	REST API
DXF viewer 2D	✅	measure, layers	dimensioning & annotations
DWG viewer	🔶 via conversion svc	better fidelity	none
SketchUp viewer	🔶 via .DAE/.OBJ upload	server SKP→glTF	none
Ads/Analytics	✅	A/B testing	feature flags
PWA	✅	offline help	sync settings

Legend: ✅ client-side, 🔶 optional microservice

4) Architecture
4.1 Frontend (browser)

React + Vite (TS), Tailwind UI.

Core libs

PDF: pdf-lib, HTML canvas, tesseract.js (WASM OCR).

QR: qrcode (canvas/SVG), own vCard builder.

Barcodes: jsbarcode (SVG), optional bwip-js (WASM) for more symbologies.

DXF: dxf-parser (browser build) → custom canvas renderer (2D).

3D viewer: three.js for glTF/OBJ/DAE display.

Telemetry: GA4 via gtag.js; Meta Pixel; consent banner.

Ads: AdSense script with responsive ad slots.

4.2 Optional Microservices (stateless)

Use only when user requests heavy formats or server conversion.

/convert service (Node, Docker, Render/Fly):

DWG→DXF/SVG/PNG: shell to LibreDWG for old DWG; recommend user to provide DXF when unsupported. Slot for ODA Converter if licensed (not bundled).

SKP→glTF: requires SketchUp SDK (licensed) OR ask user to export .DAE/.OBJ locally; we’ll still keep a hook for future SKP support.

Image → OCR PDF (server path) if client fails or too big.

Works with presigned URLs (no persistent storage). Files auto-deleted after conversion.

4.3 Deployment

Frontend: Vercel.

Microservices: Render or Fly.io (ephemeral, 512MB–1GB RAM).

CDN: Cloudflare for domain trimtoolshub.com and caching.

No DB in v1. (Optional Redis for rate limiting if the converter is public.)

5) Security & Privacy

Default: all tools run client-side. No file upload unless user chooses a conversion tool that requires it.

If server used: files stored only in temp volume; deleted on completion or timeout; logs never contain file contents.

CSP headers:

default-src 'self' *.googletagmanager.com *.google-analytics.com *.doubleclick.net connect.facebook.net

Disallow frame-ancestors except self.

Consent banner for Ads/Analytics to be GDPR-ready.

6) Analytics & Ads

Google Analytics 4: page_view, tool_start, tool_success, tool_error, conversion_upload_requested, conversion_complete.

Meta Pixel: ViewContent on tool pages; custom events for conversions.

AdSense: auto ads + fixed responsive slots; exclude on “download” modals to avoid UX conflicts.

A/B testing: simple variant flags via query param ?variant=A|B and GA dimension.

7) Accessibility & i18n

WCAG 2.1 AA: focus states, keyboard navigation, labels.

i18n strings scaffold (English first; Urdu later).

RTL support for Urdu/Arabic UI and label generation.

8) Detailed Features
8.1 PDF Toolkit

Merge: input n files, order by drag; output single PDF.

Split/Extract: ranges 1-3,7,9-9.

Rotate: per page.

Compress: presets (High/Medium/Low). Estimate output size preview where possible.

Watermark: text (font/opacity/angle) or image.

Sign: draw/type/upload; location set by click; multiple signatures.

Images→PDF: sortable list; page size; margins; DPI.

OCR: Tesseract.js; selectable language packs; output searchable PDF.

Form Fill (basic): detect fields by heuristic, overlay text; save flattened.

8.2 QR / vCard

Types: Text/URL, Wi-Fi (WPA/WEP), vCard 3.0 (FN/ORG/TITLE/PHONE/EMAIL/URL/ADR), Geo.

Size, margin, ECC, optional center-logo (upload), foreground/background.

Export: PNG/SVG, batch via CSV.

8.3 Barcodes

Symbologies: CODE128, EAN-13, Code39 (v1.1), UPC-A (v1.1).

Options: height, text below, quiet zone, DPI for PNG.

Batch from CSV; A4/Avery label sheet generator → print-ready PDF.

8.4 CAD Viewers

DXF 2D Canvas:

Entities: LINE, LWPOLYLINE, POLYLINE, ARC, CIRCLE, ELLIPSE, SPLINE (approx).

Tools: zoom/pan, layer visibility, measure distance (two clicks), export PNG/SVG.

DWG:

Recommend user provide DXF for best fidelity.

If chosen: upload DWG → /convert → DXF/SVG back → render.

SketchUp:

Recommend user to export .dae or .obj from SketchUp (Free) → convert client-side to glTF (via three.js loaders).

Optional server skp→glTF hook if licensed later.

9) Data Model (client side)

No persistent DB. In-memory models:

type PdfJob = {
  id: string;
  files: File[];              // File handles
  ops: ('merge'|'split'|'rotate'|'compress'|'sign'|'watermark'|'ocr'|'img2pdf')[];
  ranges?: string;
  rotate?: { [pageIndex: number]: 0|90|180|270 };
  compressPreset?: 'high'|'medium'|'low';
  watermarks?: Watermark[];
  signatures?: Signature[];
};

type QrJob = {
  type: 'text'|'url'|'wifi'|'vcard'|'geo';
  payload: any;               // normalized per type
  options: { ecc:'L'|'M'|'Q'|'H'; size:number; margin:number; fg?:string; bg?:string; logo?:File };
};

type BarcodeJob = {
  symbology: 'CODE128'|'EAN13'|'CODE39'|'UPCA';
  value: string;
  options: { height:number; displayValue:boolean; margin:number; fontSize:number };
  batch?: { rows: { value:string }[] };
};

type DxfScene = {
  layers: Record<string,{ visible:boolean }>;
  entities: DxfEntity[];
  view: { zoom:number; offset:{x:number;y:number} };
};

10) Public API (only for optional converter)

All endpoints require short-lived signed tokens. No persistent storage.

POST /v1/convert/dwg-to-dxf
Body: { urlIn: string, urlOut: string, notifyUrl?: string }
Resp: { jobId: string, status: 'queued' }

POST /v1/convert/skp-to-gltf
Body: { urlIn, urlOut, notifyUrl? }
Resp: { jobId, status }

GET  /v1/jobs/:jobId
Resp: { jobId, status: 'queued'|'running'|'done'|'error', message?:string }


Note: DWG & SKP conversions depend on licensed tools if high fidelity is required. Without licenses, we expose the endpoint but disable it in production by default and ask users to export to DXF/DAE client-side.

11) UI Flows

Home: hero + cards for tools; analytics events fired on clicks.

Tool pages: persistent left sidebar: PDF, CAD, QR, Barcodes; main panel with tool; right panel (when applicable) for layers/measure settings.

Batch modals: CSV upload → preview table → generate → download.

Ads: one responsive slot above fold, one in footer on tool pages. Hide during download modals.

12) Tech Stack

React 18 + Vite + TypeScript

TailwindCSS + Radix UI primitives (optional)

Three.js (viewer), dxf-parser (browser build), jsbarcode, qrcode, pdf-lib, tesseract.js

PWA: vite-plugin-pwa

GA4, Meta Pixel, AdSense scripts via head manager

13) Env & Config

.env (Frontend)

VITE_GA_MEASUREMENT_ID=G-XXXXXXX
VITE_META_PIXEL_ID=1234567890
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXX
VITE_BACKEND_URL=https://api.trimtoolshub.com   # optional


Backend (if enabled)

PORT=8080
SIGNED_TOKEN_SECRET=...
S3_ACCESS_KEY=...
S3_SECRET_KEY=...
S3_BUCKET=temp-trimtoolshub

14) Testing Strategy
Unit

vCard builder: empty vs filled fields, newline handling.

Merge PDFs: create 1-page + 2-page docs → expect 3 pages.

QR: ECC levels honored; SVG/PNG export produces non-zero bytes.

Barcode: CODE128 render on SVG.

DXF parser: parse minimal line file; layer toggles.

OCR: small sample image → text contains expected phrase.

Integration (Playwright)

Upload N PDFs → merge → downloaded filename pattern and size > 0.

Split pages 2-4 from multi-page sample.

Compress preset lowers size vs original.

DXF sample opens, zoom works, measure between two points returns non-NaN.

Batch barcode CSV → print PDF has N labels.

Acceptance Criteria (per story)

See Section 2; each story must have a repeatable test and a Download button that triggers a file with sensible name and correct extension.

15) Performance & Reliability

Large PDFs processed in streaming/chunks where possible.

Web Workers: OCR & heavy PDF ops off main thread.

WASM assets preloaded; lazy-load tool bundles with code-splitting.

Converter service autoscale to zero; 10-minute idle teardown.

16) Roadmap

1.0: All client tools + GA/Pixel/Ads + PWA.

1.1: Batch XLSX, more barcodes, layer toggles & measure for DXF, logo-in-center QR.

1.2: Simple REST for batch jobs, experimental DWG/SKP conversion (off by default).

17) Open Questions (please confirm)

DWG/SKP: Is it acceptable in v1 to ask users to export DXF and DAE/OBJ themselves, while we keep server conversion as disabled by default?

Ads density: Do you want 1 or 2 ad slots on tool pages? We can keep only one for cleaner UX.

Branding: Use TrimKore palette and logo across the app?

Export formats: For CAD snapshots, do you want SVG export in addition to PNG (good for vector fidelity)?

18) Cursor Tasks (devreq.md)

Paste this as devreq.md for Cursor:

# Dev Requirements for Cursor — TrimToolsHub

## Setup
- Create Vite React TS app with Tailwind, PWA plugin.
- Add routes: / (home), /pdf, /cad, /qr, /barcodes.
- Install libs: pdf-lib, qrcode, jsbarcode, tesseract.js, three, dxf-parser, file-saver (optional), papaparse.
- Implement a shared Download utility (Blob → filename).
- Add GA4, Meta Pixel, AdSense via environment variables and guard with consent.

## Features (milestones)

### M1: Core Shell
- Header, nav, footer, consent banner (stores choice in localStorage).
- GA/Pixel init; AdSense slot component.

### M2: PDF Tools
- Merge, Split/Extract (ranges), Rotate.
- Compress with 3 presets.
- Image→PDF.
- Watermark (text/image), Sign (draw/type/upload).
- OCR (tesseract.js), language pack loader.
- Unit tests: vCard builder (placeholder), PDF merge 1+2=3.

### M3: QR / vCard
- Text/URL/Wi-Fi/vCard/Geo generator, PNG/SVG export, CSV batch.
- Unit tests: QR outputs >0 bytes; CSV batch count matches.

### M4: Barcodes
- CODE128, EAN-13; options (height, text, margin). Batch CSV. Label sheet PDF.
- Unit tests: SVG contains barcode children; PDF page count.

### M5: CAD
- DXF 2D viewer with zoom/pan, layers panel, basic measure tool. Export PNG/SVG.
- Optional: /convert API client (feature flag), UI instructing user for DXF/DAE in v1.

### M6: PWA & Polish
- Installable app, offline for client tools.
- 404 page, telemetry for errors, shareable URLs.

## Deliverables
- `src/features/*`, `src/components/*`, `src/lib/*`, `src/hooks/*`
- `SDD.md`, `devreq.md`
- Playwright tests in `e2e/`
- GitHub Actions: build + test + preview deploy

19) Example Test Cases (ready to run later)

Unit (Jest/Vitest)

vCard:

Input: { FN: "Imran Sohail", ORG: "TrimKore", EMAIL: "", ADR: "No 16\nStreet 5" }

Expect: lines start with BEGIN:VCARD; END:VCARD; no EMAIL line; ADR flattened with commas.

PDF merge:

Create two in-memory PDFs (1p and 2p); merge; expect 3 pages.

QR:

Generate vCard QR PNG; expect base64 length > 10k bytes.

Barcode:

Generate CODE128 SVG; expect <rect elements > 50.

E2E (Playwright)

Merge 3 small PDFs; verify download filename contains merged_ and page count = 6 (verify by reloading with pdf-lib headless).

Extract 2-3,5; verify page count = 3.

Compress medium preset reduces size at least 20% on sample.

DXF viewer loads sample.dxf; zoom in; turn off a layer; export PNG; PNG > 0 bytes.

That’s the full plan. If you confirm the open items (especially DWG/SKP handling and ad density), I’ll attach the initial project scaffold and a first pass of the PDF/QR/Barcode tools for Cursor to start coding.
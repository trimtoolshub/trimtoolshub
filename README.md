# TrimToolsHub

A privacy-first web application for everyday file utilities: PDF tools, QR/vCard, barcodes, and lightweight CAD viewers. Client-side by default; optional microservices handle heavy/locked formats.

## Features

### PDF Toolkit
- **Merge** - Combine multiple PDFs into a single file
- **Split** - Split a PDF into individual pages
- **Extract** - Extract specific pages using range expressions
- **Rotate** - Rotate individual pages (0°, 90°, 180°, 270°)
- **Compress** - Reduce file size with quality presets
- **Watermark** - Add text or image watermarks with opacity and angle controls
- **Sign** - Add text or image signatures to PDFs
- **OCR** - Make scanned PDFs searchable with Tesseract.js (multiple languages)
- **Image to PDF** - Convert images to PDF documents
- **PDF to Word** - Convert PDF documents to Word format

### QR & vCard
- Generate QR codes for text, URLs, Wi-Fi, vCard, and geo locations
- Batch generation from CSV
- Export as PNG or SVG

### Barcodes
- Generate CODE128 and EAN-13 barcodes
- Batch generation from CSV
- Print-ready label sheet PDFs

### CAD Viewers
- DXF 2D viewer with zoom/pan
- Layer visibility controls
- Distance measurement tools
- Export as PNG or SVG

## Tech Stack

- **React 18** + **Vite** + **TypeScript**
- **TailwindCSS** for styling
- **pdf-lib** for PDF processing
- **Tesseract.js** for OCR
- **docx** for Word document generation
- **qrcode** for QR code generation
- **jsbarcode** for barcode generation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=000000000000000
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
VITE_ADSENSE_SLOT_HOME_HERO=0000000000
VITE_ADSENSE_SLOT_PDF_TOP=0000000000
VITE_ADSENSE_SLOT_QR_TOP=0000000000
VITE_ADSENSE_SLOT_BARCODES_TOP=0000000000
VITE_ADSENSE_SLOT_CAD_TOP=0000000000
VITE_ADSENSE_SLOT_FOOTER=0000000000
```

## Privacy & Monetization

- All core tools run entirely in the browser - no file uploads required
- Optional consent banner for analytics and ads (GDPR-ready)
- Google Analytics 4 and Meta Pixel integration
- Google AdSense monetization with responsive ad slots

## License

Private project - All rights reserved

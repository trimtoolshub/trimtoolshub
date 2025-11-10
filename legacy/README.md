# Legacy JSX App Files

This folder contains the old JSX-based app that has been replaced by the TypeScript app.

**Status:** Not in use - kept for reference only

**Current App:** TypeScript app in `src/App.tsx` with routes:
- `/` - HomePage.tsx
- `/pdf` - PdfPage.tsx
- `/qr` - QrPage.tsx
- `/barcodes` - BarcodesPage.tsx
- `/cad` - CadPage.tsx

**Legacy Routes (not active):**
- `/tools` - AllTools.jsx
- `/blog` - Blog.jsx
- `/docs` - Docs.jsx
- `/terms` - Terms.jsx
- `/tools/:slug` - ToolPage.jsx

**Note:** The `src/tools/` directory is kept as it may be used in the future, but currently the TS app doesn't use these routes.


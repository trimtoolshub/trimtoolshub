Create a new Vite + React project named trimtoolshub.

Goals:
- Modular “Tools Hub” where each tool lives in /src/tools/<toolId>/ with its own component, SEO meta, and route.
- Responsive, mobile-first, dark theme.
- Zero backend for MVP (client-side tools). Add PHP later only if needed (for cPanel).
- SEO-ready: per-page <title> + <meta description>, sitemap.xml, robots.txt, JSON-LD SoftwareApplication schema.
- Google Analytics (GA4) and AdSense placeholders via .env toggles.
- Ads must be easy to disable per environment (VITE_ENABLE_ADS).
- Simple, clean UI: header with brand, search box, grid of tools, footer.
- Code-splitting by route.

Tasks:
1) Initialize Vite React app.
2) Add dependencies: react-router-dom, react-helmet-async, papaparse (for a data tool), dayjs.
3) Create .env.example with:
   VITE_SITE_URL=https://trimtoolshub.com
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
   VITE_ENABLE_ADS=true
4) App structure:
   /public/robots.txt (allow all, Sitemap: /sitemap.xml)
   /public/favicon.ico (placeholder)
   /scripts/generate-sitemap.mjs (Node script that reads tool routes and emits dist/sitemap.xml)
   /src/main.jsx (HelmetProvider + Router)
   /src/App.jsx (layout + routes)
   /src/components/{Header.jsx, Footer.jsx, Search.jsx, AdSlot.jsx (renders nothing if VITE_ENABLE_ADS=false)}
   /src/lib/seo.js (helpers to emit Helmet tags + JSON-LD)
   /src/tools/registryData.js (plain array of tool metadata: id, slug, name, shortDescription, keywords)
   /src/tools/registryComponents.js (map slug → lazy component import)
   /src/pages/{Home.jsx, AllTools.jsx, NotFound.jsx}
5) Routing:
   - / → Home (hero, featured tools)
   - /tools → AllTools (search + grid)
   - /tools/:slug → tool page
6) Styles: simple CSS in index.html or a single global.css; stick to system UI fonts.
7) Analytics:
   - If VITE_GA_MEASUREMENT_ID present, inject GA4 script on mount.
8) AdSense:
   - If VITE_ADSENSE_CLIENT present and VITE_ENABLE_ADS=true, add script and <AdSlot /> placeholders (header, after-hero, footer).
9) Build script: modify package.json so "build" runs "node scripts/generate-sitemap.mjs && vite build".
10) Output: fully running dev server.

Deliverables:
- All files created with content.
- Explain npm commands to run on WAMP: npm install, npm run dev.
Add three tools under /src/tools/:

A) JSON ↔ CSV Converter (slug: json-csv)
   - UI: two textareas, upload file, delimiter select (comma, semicolon, tab), header toggle, Convert, Download, Copy.
   - Logic: use papaparse for both directions.
   - SEO: title "JSON ↔ CSV Converter | Free Online Tool", meta description 150-160 chars, JSON-LD SoftwareApplication.

B) Epoch ↔ Date Converter (slug: epoch-date)
   - UI: input epoch (seconds/ms auto-detect), human date outputs, time zone select (local/UTC), Now button, Copy.
   - Use dayjs for parsing/formatting.
   - SEO: proper title + description + JSON-LD.

C) Text Diff & Merge (slug: text-diff)
   - UI: Left textarea, Right textarea, button to Diff, render inline diff (simple DOM-based highlighting), Copy merged.
   - SEO: proper title + description + JSON-LD.

Update:
- Add these tool entries to registryData.js with name, slug, description, keywords.
- Register components in registryComponents.js with lazy imports.
- Add featured cards for these three tools on Home.
- Add AdSlot placements on each tool page (top + bottom), but render nothing if VITE_ENABLE_ADS=false.
- Ensure pages are responsive.

Deliverables:
- New tool components at /src/tools/<slug>/index.jsx.
- Updated registryData.js and registryComponents.js.
- Route working at /tools/<slug>.
- Each tool page sets <Helmet> tags and JSON-LD via seo helpers.
Enhance SEO:

1) Create /src/lib/seo.js utilities:
   - buildTitle(base) → returns "<base> • TrimToolsHub"
   - Meta component with Helmet tags for title, description, canonical, og tags, twitter cards.
   - jsonLdSoftwareApp({name, description, url, category}) returning a <script type="application/ld+json">.

2) On Home, AllTools, and each tool page:
   - Unique title + meta description
   - Canonical URL = VITE_SITE_URL + current path
   - OG: title, description, url
   - Twitter summary_large_image
   - JSON-LD SoftwareApplication on tool pages.

3) Implement /scripts/generate-sitemap.mjs:
   - Import routes from registryData.js (tools) + static pages (/, /tools).
   - Base URL from process.env.VITE_SITE_URL or fallback.
   - Generate dist/sitemap.xml with <urlset> entries and lastmod = build time.

4) Confirm robots.txt in /public references /sitemap.xml.

5) Add <meta name="robots" content="index, follow"> on public pages.

Deliverables:
- Working SEO utilities and tags visible in page source.
- sitemap.xml generated during build.
- Home and tools pages each have tailored SEO content.
Wire GA4 and AdSense with env toggles:

1) In main layout (App), if VITE_GA_MEASUREMENT_ID is present, inject GA4 script tag:
   https://www.googletagmanager.com/gtag/js?id=<ID>
   and a window.dataLayer init + gtag('config', ID).
   Trigger on route changes as page_view events.

2) Create <AdSlot />:
   - If VITE_ENABLE_ADS !== "true" or no VITE_ADSENSE_CLIENT, return null.
   - Otherwise, insert async adsbygoogle.js script once (with the client id), and render an <ins class="adsbygoogle"> block.
   - Safe-guard to avoid duplicate script injection.

3) Add <AdSlot /> placeholders:
   - Header (small banner), after hero on Home, sidebar on AllTools, top/bottom on tool pages, and in Footer.

Note: Do NOT hardcode client ids; read from import.meta.env.
Create a docs page at /src/pages/Docs.jsx and link it in the header "Docs":
- WAMP dev:
  1) Install Node.js LTS on Windows. Ensure 'npm -v' works.
  2) In project folder: 'npm i' then 'npm run dev'.
  3) Access dev URL shown in terminal (e.g., http://localhost:5173).

- Build for production:
  1) Set .env from .env.example with your values.
  2) 'npm run build' (also generates dist/sitemap.xml).
  3) Output in /dist.

- cPanel deployment:
  1) In cPanel File Manager, upload contents of /dist into 'public_html' (or subfolder).
  2) Ensure SSL via cPanel AutoSSL or Cloudflare.
  3) If using subfolder, set canonical URLs accordingly (VITE_SITE_URL).

- Ads + Analytics:
  - Set VITE_GA_MEASUREMENT_ID and VITE_ADSENSE_CLIENT in .env before building.
  - To disable ads for dev, set VITE_ENABLE_ADS=false.

Add this page to routes (/docs) and to the header nav.
Add two more tools:

D) Markdown ↔ HTML (slug: md-html)
   - Two textareas, Markdown input → HTML output and reverse.
   - Use a lightweight MD parser (e.g., marked) for MD → HTML; for HTML → MD, do a best-effort plain text fallback.
   - SEO tags + JSON-LD.

E) Word Counter & Reading Time (slug: word-counter)
   - Textarea input; show counts: words, characters, sentences, paragraphs, avg reading time (wpm=200).
   - Copy button.
   - SEO tags + JSON-LD.

Update registry entries and ensure pages render with Ads (if enabled).
Polish UI/UX:
- Add a global Search in header that filters tool cards on /tools page (debounced).
- Keyboard nav: '/' focuses search, 'g h' goes Home, 'g t' goes All Tools.
- Add “Made by TrimKore Digital” footer link and contact mailto.
- Add a 404 NotFound page that links back to Home and All Tools.
- Lighthouse-friendly meta tags and alt text on icons.
- Ensure layout is fully responsive down to 320px width.

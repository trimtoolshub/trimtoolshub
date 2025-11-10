import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prerender } from 'vite-plugin-prerender'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/pdf', '/qr', '/barcodes', '/cad', '/images', '/dates', '/blog'],
      renderer: {
        renderAfterDocumentEvent: 'render-event',
        renderAfterTime: 500,
        maxConcurrentRoutes: 5,
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
  worker: {
    format: 'es',
  },
})

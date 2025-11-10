import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Note: Prerender removed - vite-plugin-prerender has compatibility issues
// Vercel handles static generation differently. For better indexability,
// consider using Vercel's ISR or SSR features in the future.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
  worker: {
    format: 'es',
  },
})

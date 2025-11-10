import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'helmet': ['react-helmet-async'],
          
          // Tool chunks by category
          'youtube-tools': [
            './src/tools/youtube-trend/YoutubeTrend.jsx',
            './src/tools/youtube-tag-extractor/YoutubeTagExtractor.jsx',
            './src/tools/youtube-tag-generator/YoutubeTagGenerator.jsx',
            './src/tools/youtube-hashtag-extractor/YoutubeHashtagExtractor.jsx',
            './src/tools/youtube-hashtag-generator/YoutubeHashtagGenerator.jsx',
            './src/tools/youtube-title-extractor/YoutubeTitleExtractor.jsx',
            './src/tools/youtube-title-generator/YoutubeTitleGenerator.jsx',
            './src/tools/youtube-description-extractor/YoutubeDescriptionExtractor.jsx',
            './src/tools/youtube-description-generator/YoutubeDescriptionGenerator.jsx'
          ],
          'developer-tools': [
            './src/tools/epoch-date/EpochDate.jsx',
            './src/tools/uuid-generator/UuidGenerator.jsx',
            './src/tools/jwt-decoder/JwtDecoder.jsx',
            './src/tools/password-generator/PasswordGenerator.jsx',
            './src/tools/url-encoder/UrlEncoder.jsx',
            './src/tools/hash-generator/HashGenerator.jsx'
          ],
          'text-tools': [
            './src/tools/article-rewriter/ArticleRewriter.jsx',
            './src/tools/text-diff/TextDiff.jsx',
            './src/tools/word-counter/WordCounter.jsx',
            './src/tools/md-html/MdHtml.jsx'
          ],
          'file-tools': [
            './src/tools/pdf-merger-splitter/PdfMergerSplitter.jsx',
            './src/tools/pdf-word-converter/PdfWordConverter.jsx',
            './src/tools/image-pdf-converter/ImagePdfConverter.jsx',
            './src/tools/text-speech-converter/TextSpeechConverter.jsx'
          ],
          'data-tools': [
            './src/tools/json-csv/JsonCsv.jsx',
            './src/tools/base64-encoder/Base64Encoder.jsx',
            './src/tools/csv-converter/CsvConverter.jsx'
          ],
          'seo-tools': [
            './src/tools/google-index-checker/GoogleIndexChecker.jsx',
            './src/tools/keyword-density-checker/KeywordDensityChecker.jsx'
          ],
          'design-tools': [
            './src/tools/gradient-generator/GradientGenerator.jsx',
            './src/tools/color-picker/ColorPicker.jsx'
          ]
        }
      }
    },
    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async']
  },
  // Server configuration for development
  server: {
    port: 3000,
    open: true
  }
})
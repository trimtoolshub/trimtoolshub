import { lazy } from 'react'

// Lazy load tool components for code splitting
// Create a placeholder component for tools not yet implemented
const PlaceholderTool = ({ toolName }) => (
  <div style={{ 
    maxWidth: '800px', 
    margin: '0 auto',
    backgroundColor: 'var(--bg-card)', 
    border: '1px solid var(--border)', 
    borderRadius: '1rem', 
    padding: '3rem',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
    <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
      {toolName}
    </h2>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
      This tool is currently under development and will be available soon.
    </p>
    <div style={{ 
      backgroundColor: 'var(--bg-tertiary)', 
      padding: '1.5rem', 
      borderRadius: '0.75rem',
      border: '1px solid var(--border)'
    }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Coming Soon Features:
      </h3>
      <ul style={{ 
        color: 'var(--text-secondary)', 
        textAlign: 'left',
        lineHeight: '1.6',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <li>Professional-grade functionality</li>
        <li>Real-time processing</li>
        <li>Export capabilities</li>
        <li>Advanced customization options</li>
      </ul>
    </div>
  </div>
)

export const toolComponents = {
  // AI Tools (Hidden for now)
  // 'ai-text-generator': lazy(() => import('./ai-text-generator/AiTextGenerator.jsx')),
  // 'ai-image-generator': lazy(() => import('./ai-image-generator/AiImageGenerator.jsx')),
  // 'ai-code-assistant': lazy(() => import('./ai-code-assistant/AiCodeAssistant.jsx')),
  // 'ai-translator': lazy(() => import('./ai-translator/AiTranslator.jsx')),
  // 'ai-chat-assistant': lazy(() => import('./ai-chat-assistant/AiChatAssistant.jsx')),
  // 'ai-sentiment-analyzer': lazy(() => import('./ai-sentiment-analyzer/AiSentimentAnalyzer.jsx')),

          // File & Document Tools
          'pdf-merger-splitter': lazy(() => import('./pdf-merger-splitter/PdfMergerSplitter.jsx')),
          'pdf-word-converter': lazy(() => import('./pdf-word-converter/PdfWordConverter.jsx')),
          'image-pdf-converter': lazy(() => import('./image-pdf-converter/ImagePdfConverter.jsx')),
          'text-speech-converter': lazy(() => import('./text-speech-converter/TextSpeechConverter.jsx')),
          'file-compressor': lazy(() => import('./file-compressor/FileCompressor.jsx')),
          'file-converter': lazy(() => import('./file-converter/FileConverter.jsx')),
          'document-viewer': lazy(() => import('./document-viewer/DocumentViewer.jsx')),
          'file-analyzer': lazy(() => import('./file-analyzer/FileAnalyzer.jsx')),

  // YouTube Tools
  'youtube-trend': lazy(() => import('./youtube-trend/YoutubeTrend.jsx')),
  'youtube-tag-extractor': lazy(() => import('./youtube-tag-extractor/YoutubeTagExtractor.jsx')),
  'youtube-tag-generator': lazy(() => import('./youtube-tag-generator/YoutubeTagGenerator.jsx')),
  'youtube-hashtag-extractor': lazy(() => import('./youtube-hashtag-extractor/YoutubeHashtagExtractor.jsx')),
  'youtube-hashtag-generator': lazy(() => import('./youtube-hashtag-generator/YoutubeHashtagGenerator.jsx')),
  'youtube-title-extractor': lazy(() => import('./youtube-title-extractor/YoutubeTitleExtractor.jsx')),
  'youtube-title-generator': lazy(() => import('./youtube-title-generator/YoutubeTitleGenerator.jsx')),
  'youtube-description-extractor': lazy(() => import('./youtube-description-extractor/YoutubeDescriptionExtractor.jsx')),
  'youtube-description-generator': lazy(() => import('./youtube-description-generator/YoutubeDescriptionGenerator.jsx')),
  'youtube-embed-generator': lazy(() => import('./youtube-embed-generator/YoutubeEmbedGenerator.jsx')),
  'youtube-channel-id': lazy(() => import('./youtube-channel-id/YoutubeChannelId.jsx')),
  'youtube-video-stats': lazy(() => import('./youtube-video-stats/YoutubeVideoStats.jsx')),
  'youtube-channel-stats': lazy(() => import('./youtube-channel-stats/YoutubeChannelStats.jsx')),
  'youtube-money-calculator': lazy(() => import('./youtube-money-calculator/YoutubeMoneyCalculator.jsx')),
  'youtube-region-checker': lazy(() => import('./youtube-region-checker/YoutubeRegionChecker.jsx')),
  'youtube-logo-downloader': lazy(() => import('./youtube-logo-downloader/YoutubeLogoDownloader.jsx')),
  'youtube-banner-downloader': lazy(() => import('./youtube-banner-downloader/YoutubeBannerDownloader.jsx')),
  'youtube-channel-search': lazy(() => import('./youtube-channel-search/YoutubeChannelSearch.jsx')),

  // Text Analysis Tools
  'article-rewriter': lazy(() => import('./article-rewriter/ArticleRewriter.jsx')),
  'url-rewriting-tool': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="URL Rewriting Tool" /> })),
  'backwards-text-generator': lazy(() => import('./backwards-text-generator/BackwardsTextGenerator.jsx')),
  'text-to-hashtags': lazy(() => import('./text-to-hashtags/TextToHashtags.jsx')),
  'text-diff': lazy(() => import('./text-diff/TextDiff.jsx')),
  'word-counter': lazy(() => import('./word-counter/WordCounter.jsx')),
          'text-formatter': lazy(() => import('./text-formatter/TextFormatter')),
  'md-html': lazy(() => import('./md-html/MdHtml.jsx')),

  // Website Tracking Tools
  'google-index-checker': lazy(() => import('./google-index-checker/GoogleIndexChecker.jsx')),
  'google-cache-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Google Cache Checker" /> })),
  'domain-age-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Domain Age Checker" /> })),
  'whois-domain-lookup': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Whois Domain Lookup" /> })),

  // Website Management Tools
  'keyword-density-checker': lazy(() => import('./keyword-density-checker/KeywordDensityChecker.jsx')),
  'robots-txt-generator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Robots.txt Generator" /> })),
  'domain-to-ip': lazy(() => import('./domain-to-ip/DomainToIp.jsx')),
  'http-status-checker': lazy(() => import('./http-status-checker/HttpStatusChecker.jsx')),
  'htaccess-redirect-generator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Htaccess Redirect Generator" /> })),
  'meta-tags-analyzer': lazy(() => import('./meta-tags-analyzer/MetaTagsAnalyzer.jsx')),
  'server-status-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Server Status Checker" /> })),
  'hosting-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Hosting Checker" /> })),
          'what-is-my-browser': lazy(() => import('./what-is-my-browser/WhatIsMyBrowser')),
  'what-is-my-user-agent': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="What Is My User Agent" /> })),
  'open-graph-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Open Graph Checker" /> })),
  'open-graph-generator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Open Graph Generator" /> })),
  'get-http-headers': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Get HTTP Headers" /> })),
  'twitter-card-generator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Twitter Card Generator" /> })),
  'what-is-my-screen-resolution': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="What Is My Screen Resolution" /> })),
  'screen-resolution-simulator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Screen Resolution Simulator" /> })),
  'page-size-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Page Size Checker" /> })),
  'url-opener': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="URL Opener" /> })),
  'credit-card-generator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Credit Card Generator" /> })),
  'credit-card-validator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Credit Card Validator" /> })),
  'wordpress-theme-detector': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="WordPress Theme Detector" /> })),
  'adsense-calculator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="AdSense Calculator" /> })),
  'keywords-suggestion-tool': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Keywords Suggestion Tool" /> })),
  'faq-schema-generator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="FAQ Schema Generator" /> })),
  'json-to-json-schema': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="JSON to JSON Schema" /> })),
  'dns-records-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="DNS Records Checker" /> })),

  // Data Conversion Tools
  'json-csv': lazy(() => import('./json-csv/JsonCsv.jsx')),
  'json-formatter': lazy(() => import('./json-formatter/JsonFormatter.jsx')),
  'csv-converter': lazy(() => import('./csv-converter/CsvConverter.jsx')),

          // Developer Tools
          'epoch-date': lazy(() => import('./epoch-date/EpochDate.jsx')),
          'uuid-generator': lazy(() => import('./uuid-generator/UuidGenerator.jsx')),
          'fake-data-generator': lazy(() => import('./fake-data-generator/FakeDataGenerator')),
          'http-header-parser': lazy(() => import('./http-header-parser/HttpHeaderParser.jsx')),
          'jwt-decoder': lazy(() => import('./jwt-decoder/JwtDecoder.jsx')),
          'color-palette-generator': lazy(() => import('./color-palette-generator/ColorPaletteGenerator.jsx')),
          'url-encoder': lazy(() => import('./url-encoder/UrlEncoder.jsx')),
          'hash-generator': lazy(() => import('./hash-generator/HashGenerator.jsx')),
          'qr-code-generator': lazy(() => import('./qr-code-generator/QrCodeGenerator.jsx')),

          // Data Security & Encoding Tools
          'password-generator': lazy(() => import('./password-generator/PasswordGenerator.jsx')),
          'html-entity-encoder': lazy(() => import('./html-entity-encoder/HtmlEntityEncoder.jsx')),

          // Content & Writing Tools
          'plagiarism-checker': lazy(() => import('./plagiarism-checker/PlagiarismChecker.jsx')),
          'grammar-checker': lazy(() => import('./grammar-checker/GrammarChecker.jsx')),
          'case-converter': lazy(() => import('./case-converter/CaseConverter')),
          'text-summarizer': lazy(() => import('./text-summarizer/TextSummarizer.jsx')),

          // Design & Color Tools
          'gradient-generator': lazy(() => import('./gradient-generator/GradientGenerator.jsx')),
          'contrast-checker': lazy(() => import('./contrast-checker/ContrastChecker.jsx')),
          'palette-extractor': lazy(() => import('./palette-extractor/PaletteExtractor.jsx')),
          'backlink-checker': lazy(() => import('./backlink-checker/BacklinkChecker.jsx')),
          'website-speed-test': lazy(() => import('./website-speed-test/WebsiteSpeedTest.jsx')),
          'qr-code-scanner': lazy(() => import('./qr-code-scanner/QrCodeScanner.jsx')),
          'password-strength-checker': lazy(() => import('./password-strength-checker/PasswordStrengthChecker.jsx')),
          'image-resizer': lazy(() => import('./image-resizer/ImageResizer.jsx')),
          'font-pairing': lazy(() => import('./font-pairing/FontPairing.jsx')),

          // Math & Science Tools
          'equation-formatter': lazy(() => import('./equation-formatter/EquationFormatter.jsx')),
          'unit-converter': lazy(() => import('./unit-converter/UnitConverter.jsx')),
          'random-number-generator': lazy(() => import('./random-number-generator/RandomNumberGenerator.jsx')),
          'matrix-calculator': lazy(() => import('./matrix-calculator/MatrixCalculator.jsx')),

          // Web & SEO Tools
          'meta-tag-generator': lazy(() => import('./meta-tag-generator/MetaTagGenerator')),
          'schema-markup-generator': lazy(() => import('./schema-markup-generator/SchemaMarkupGenerator.jsx')),
          'robots-sitemap-generator': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Robots.txt / Sitemap.xml Generator" /> })),
          'redirect-checker': lazy(() => Promise.resolve({ default: () => <PlaceholderTool toolName="Redirect Checker" /> }))
}

export const getToolComponent = (slug) => {
  return toolComponents[slug] || null
}

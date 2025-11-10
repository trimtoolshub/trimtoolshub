// Tools registry - metadata for all available tools
export const toolsRegistry = [
  // AI Tools (Removed)
  // {
  //   id: 'ai-text-generator',
  //   slug: 'ai-text-generator',
  //   name: 'AI Text Generator',
  //   shortDescription: 'Generate creative text content using open-source AI models',
  //   keywords: ['ai', 'text', 'generator', 'content', 'writing'],
  //   category: 'ai-tools',
  //   featured: true
  // },
  // {
  //   id: 'ai-image-generator',
  //   slug: 'ai-image-generator',
  //   name: 'AI Image Generator',
  //   shortDescription: 'Generate images from text descriptions using open-source AI',
  //   keywords: ['ai', 'image', 'generator', 'art', 'picture'],
  //   category: 'ai-tools',
  //   featured: true
  // },
  // {
  //   id: 'ai-code-assistant',
  //   slug: 'ai-code-assistant',
  //   name: 'AI Code Assistant',
  //   shortDescription: 'Get AI-powered code suggestions and explanations',
  //   keywords: ['ai', 'code', 'assistant', 'programming', 'help'],
  //   category: 'ai-tools',
  //   featured: true
  // },
  // {
  //   id: 'ai-translator',
  //   slug: 'ai-translator',
  //   name: 'AI Translator',
  //   shortDescription: 'Translate text between languages using AI',
  //   keywords: ['ai', 'translate', 'language', 'text', 'conversion'],
  //   category: 'ai-tools',
  //   featured: false
  // },
  // {
  //   id: 'ai-chat-assistant',
  //   slug: 'ai-chat-assistant',
  //   name: 'AI Chat Assistant',
  //   shortDescription: 'Chat with AI assistant for various tasks',
  //   keywords: ['ai', 'chat', 'assistant', 'conversation', 'help'],
  //   category: 'ai-tools',
  //   featured: false
  // },
  // {
  //   id: 'ai-sentiment-analyzer',
  //   slug: 'ai-sentiment-analyzer',
  //   name: 'AI Sentiment Analyzer',
  //   shortDescription: 'Analyze sentiment and emotions in text using AI',
  //   keywords: ['ai', 'sentiment', 'analyzer', 'emotion', 'text'],
  //   category: 'ai-tools',
  //   featured: false
  // },

  // File & Document Tools
  {
    id: 'pdf-merger-splitter',
    slug: 'pdf-merger-splitter',
    name: 'PDF Merger & Splitter',
    shortDescription: 'Merge multiple PDFs into one or split PDFs into separate pages',
    keywords: ['pdf', 'merge', 'split', 'combine', 'document'],
    category: 'file-document',
    featured: true
  },
  {
    id: 'pdf-word-converter',
    slug: 'pdf-word-converter',
    name: 'PDF to Word / Word to PDF',
    shortDescription: 'Convert PDF documents to Word format and vice versa',
    keywords: ['pdf', 'word', 'convert', 'document', 'office'],
    category: 'file-document',
    featured: true
  },
  {
    id: 'image-pdf-converter',
    slug: 'image-pdf-converter',
    name: 'Image to PDF Converter',
    shortDescription: 'Convert images (JPG, PNG, GIF) to PDF documents',
    keywords: ['image', 'pdf', 'convert', 'jpg', 'png', 'gif'],
    category: 'file-document',
    featured: false
  },
  {
    id: 'text-speech-converter',
    slug: 'text-speech-converter',
    name: 'Text to Speech',
    shortDescription: 'Convert text to natural-sounding speech audio',
    keywords: ['text', 'speech', 'audio', 'tts', 'voice'],
    category: 'file-document',
    featured: false
  },
  {
    id: 'file-compressor',
    slug: 'file-compressor',
    name: 'File Compressor',
    shortDescription: 'Compress files to reduce size while maintaining quality',
    keywords: ['file', 'compress', 'zip', 'reduce', 'size', 'optimize'],
    category: 'file-document',
    featured: true
  },
  {
    id: 'file-converter',
    slug: 'file-converter',
    name: 'Universal File Converter',
    shortDescription: 'Convert files between different formats instantly',
    keywords: ['file', 'convert', 'format', 'transform', 'universal'],
    category: 'file-document',
    featured: true
  },
  {
    id: 'document-viewer',
    slug: 'document-viewer',
    name: 'Document Viewer',
    shortDescription: 'View and analyze various file types with advanced features',
    keywords: ['document', 'viewer', 'file', 'view', 'analyze', 'preview'],
    category: 'file-document',
    featured: false
  },
  {
    id: 'file-analyzer',
    slug: 'file-analyzer',
    name: 'File Analyzer',
    shortDescription: 'Analyze files to get detailed information and metadata',
    keywords: ['file', 'analyze', 'metadata', 'information', 'details'],
    category: 'file-document',
    featured: false
  },

  // YouTube Tools
  {
    id: 'youtube-trend',
    slug: 'youtube-trend',
    name: 'YouTube Trend',
    shortDescription: 'Check trending videos and topics on YouTube',
    keywords: ['youtube', 'trending', 'videos', 'popular'],
    category: 'youtube',
    featured: true
  },
  {
    id: 'youtube-tag-extractor',
    slug: 'youtube-tag-extractor',
    name: 'YouTube Tag Extractor',
    shortDescription: 'Extract tags from YouTube videos',
    keywords: ['youtube', 'tags', 'extract', 'seo'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-tag-generator',
    slug: 'youtube-tag-generator',
    name: 'YouTube Tag Generator',
    shortDescription: 'Generate relevant tags for YouTube videos',
    keywords: ['youtube', 'tags', 'generator', 'seo'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-hashtag-extractor',
    slug: 'youtube-hashtag-extractor',
    name: 'YouTube Hashtag Extractor',
    shortDescription: 'Extract hashtags from YouTube videos',
    keywords: ['youtube', 'hashtags', 'extract'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-hashtag-generator',
    slug: 'youtube-hashtag-generator',
    name: 'YouTube Hashtag Generator',
    shortDescription: 'Generate trending hashtags for YouTube videos',
    keywords: ['youtube', 'hashtags', 'generator', 'trending'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-title-extractor',
    slug: 'youtube-title-extractor',
    name: 'YouTube Title Extractor',
    shortDescription: 'Extract titles from YouTube videos',
    keywords: ['youtube', 'title', 'extract'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-title-generator',
    slug: 'youtube-title-generator',
    name: 'YouTube Title Generator',
    shortDescription: 'Generate compelling titles for YouTube videos',
    keywords: ['youtube', 'title', 'generator', 'seo'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-description-extractor',
    slug: 'youtube-description-extractor',
    name: 'YouTube Description Extractor',
    shortDescription: 'Extract descriptions from YouTube videos',
    keywords: ['youtube', 'description', 'extract'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-description-generator',
    slug: 'youtube-description-generator',
    name: 'YouTube Description Generator',
    shortDescription: 'Generate SEO-optimized descriptions for YouTube videos',
    keywords: ['youtube', 'description', 'generator', 'seo'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-embed-generator',
    slug: 'youtube-embed-generator',
    name: 'YouTube Embed Code Generator',
    shortDescription: 'Generate embed codes for YouTube videos',
    keywords: ['youtube', 'embed', 'code', 'generator'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-channel-id',
    slug: 'youtube-channel-id',
    name: 'YouTube Channel ID',
    shortDescription: 'Find YouTube channel ID from channel URL',
    keywords: ['youtube', 'channel', 'id', 'url'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-video-stats',
    slug: 'youtube-video-stats',
    name: 'YouTube Video Statistics',
    shortDescription: 'Get detailed statistics for YouTube videos',
    keywords: ['youtube', 'video', 'statistics', 'analytics'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-channel-stats',
    slug: 'youtube-channel-stats',
    name: 'YouTube Channel Statistics',
    shortDescription: 'Get detailed statistics for YouTube channels',
    keywords: ['youtube', 'channel', 'statistics', 'analytics'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-money-calculator',
    slug: 'youtube-money-calculator',
    name: 'YouTube Money Calculator',
    shortDescription: 'Calculate potential earnings from YouTube videos',
    keywords: ['youtube', 'money', 'calculator', 'earnings'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-region-checker',
    slug: 'youtube-region-checker',
    name: 'YouTube Region Restriction Checker',
    shortDescription: 'Check if YouTube videos are restricted in specific regions',
    keywords: ['youtube', 'region', 'restriction', 'checker'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-logo-downloader',
    slug: 'youtube-logo-downloader',
    name: 'YouTube Channel Logo Downloader',
    shortDescription: 'Download YouTube channel logos',
    keywords: ['youtube', 'logo', 'downloader', 'channel'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-banner-downloader',
    slug: 'youtube-banner-downloader',
    name: 'YouTube Channel Banner Downloader',
    shortDescription: 'Download YouTube channel banners',
    keywords: ['youtube', 'banner', 'downloader', 'channel'],
    category: 'youtube',
    featured: false
  },
  {
    id: 'youtube-channel-search',
    slug: 'youtube-channel-search',
    name: 'YouTube Channel Search',
    shortDescription: 'Search for YouTube channels',
    keywords: ['youtube', 'channel', 'search'],
    category: 'youtube',
    featured: false
  },

  // Text Analysis Tools
  {
    id: 'article-rewriter',
    slug: 'article-rewriter',
    name: 'Article Rewriter',
    shortDescription: 'Rewrite articles while maintaining original meaning',
    keywords: ['article', 'rewriter', 'content', 'seo'],
    category: 'text-analysis',
    featured: true
  },
  {
    id: 'backlink-checker',
    slug: 'backlink-checker',
    name: 'Backlink Checker',
    shortDescription: 'Check backlinks for any website',
    keywords: ['backlink', 'checker', 'seo', 'website'],
    category: 'text-analysis',
    featured: false
  },
  {
    id: 'url-rewriting-tool',
    slug: 'url-rewriting-tool',
    name: 'URL Rewriting Tool',
    shortDescription: 'Rewrite URLs for better SEO',
    keywords: ['url', 'rewriting', 'seo', 'optimization'],
    category: 'text-analysis',
    featured: false
  },
  {
    id: 'backwards-text-generator',
    slug: 'backwards-text-generator',
    name: 'Backwards Text Generator',
    shortDescription: 'Generate backwards text for creative purposes',
    keywords: ['backwards', 'text', 'generator', 'reverse'],
    category: 'text-analysis',
    featured: false
  },
  {
    id: 'text-to-hashtags',
    slug: 'text-to-hashtags',
    name: 'Text to Hashtags',
    shortDescription: 'Convert text into relevant hashtags',
    keywords: ['text', 'hashtags', 'social media', 'converter'],
    category: 'text-analysis',
    featured: false
  },
  {
    id: 'text-diff',
    slug: 'text-diff',
    name: 'Text Compare',
    shortDescription: 'Compare and merge text with visual diff highlighting',
    keywords: ['diff', 'merge', 'compare', 'text', 'highlight'],
    category: 'text-analysis',
    featured: false
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter & Reading Time',
    shortDescription: 'Count words, characters, and estimate reading time',
    keywords: ['word', 'count', 'reading', 'time', 'characters'],
    category: 'text-analysis',
    featured: false
  },
  {
    id: 'text-formatter',
    slug: 'text-formatter',
    name: 'Text Formatter',
    shortDescription: 'Format and clean text with various options',
    keywords: ['text', 'format', 'clean', 'editor'],
    category: 'text-analysis',
    featured: false
  },
  {
    id: 'md-html',
    slug: 'md-html',
    name: 'Markdown ↔ HTML',
    shortDescription: 'Convert between Markdown and HTML formats',
    keywords: ['markdown', 'html', 'convert', 'md', 'web'],
    category: 'text-analysis',
    featured: false
  },

  // Website Tracking Tools
  {
    id: 'google-index-checker',
    slug: 'google-index-checker',
    name: 'Google Index Checker',
    shortDescription: 'Check if your website is indexed by Google',
    keywords: ['google', 'index', 'checker', 'seo'],
    category: 'website-tracking',
    featured: true
  },
  {
    id: 'google-cache-checker',
    slug: 'google-cache-checker',
    name: 'Google Cache Checker',
    shortDescription: 'Check Google cache for any website',
    keywords: ['google', 'cache', 'checker', 'website'],
    category: 'website-tracking',
    featured: false
  },
  {
    id: 'domain-age-checker',
    slug: 'domain-age-checker',
    name: 'Domain Age Checker',
    shortDescription: 'Check the age of any domain',
    keywords: ['domain', 'age', 'checker', 'website'],
    category: 'website-tracking',
    featured: false
  },
  {
    id: 'whois-domain-lookup',
    slug: 'whois-domain-lookup',
    name: 'Whois Domain Lookup',
    shortDescription: 'Lookup domain information using Whois',
    keywords: ['whois', 'domain', 'lookup', 'information'],
    category: 'website-tracking',
    featured: false
  },
  {
    id: 'redirect-checker',
    slug: 'redirect-checker',
    name: 'Redirect Checker',
    shortDescription: 'Check redirects for any URL',
    keywords: ['redirect', 'checker', 'url', 'seo'],
    category: 'website-tracking',
    featured: false
  },

  // Website Management Tools
  {
    id: 'keyword-density-checker',
    slug: 'keyword-density-checker',
    name: 'Keyword Density Checker',
    shortDescription: 'Check keyword density on any webpage',
    keywords: ['keyword', 'density', 'checker', 'seo'],
    category: 'website-management',
    featured: true
  },
  {
    id: 'robots-txt-generator',
    slug: 'robots-txt-generator',
    name: 'Robots.txt Generator',
    shortDescription: 'Generate robots.txt file for your website',
    keywords: ['robots', 'txt', 'generator', 'seo'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'domain-to-ip',
    slug: 'domain-to-ip',
    name: 'Domain to IP',
    shortDescription: 'Convert domain names to IP addresses',
    keywords: ['domain', 'ip', 'converter', 'dns'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'http-status-checker',
    slug: 'http-status-checker',
    name: 'HTTP Status Code Checker',
    shortDescription: 'Check HTTP status codes for any URL',
    keywords: ['http', 'status', 'code', 'checker'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'htaccess-redirect-generator',
    slug: 'htaccess-redirect-generator',
    name: 'Htaccess Redirect Generator',
    shortDescription: 'Generate .htaccess redirect rules',
    keywords: ['htaccess', 'redirect', 'generator', 'apache'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    shortDescription: 'Generate meta tags for your website',
    keywords: ['meta', 'tag', 'generator', 'seo'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'meta-tags-analyzer',
    slug: 'meta-tags-analyzer',
    name: 'Meta Tags Analyzer',
    shortDescription: 'Analyze meta tags of any website',
    keywords: ['meta', 'tags', 'analyzer', 'seo'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'server-status-checker',
    slug: 'server-status-checker',
    name: 'Server Status Checker',
    shortDescription: 'Check server status and response time',
    keywords: ['server', 'status', 'checker', 'uptime'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'hosting-checker',
    slug: 'hosting-checker',
    name: 'Hosting Checker',
    shortDescription: 'Check hosting provider for any website',
    keywords: ['hosting', 'checker', 'provider', 'website'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'what-is-my-browser',
    slug: 'what-is-my-browser',
    name: 'What Is My Browser',
    shortDescription: 'Check your browser information',
    keywords: ['browser', 'information', 'user agent'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'what-is-my-user-agent',
    slug: 'what-is-my-user-agent',
    name: 'What Is My User Agent',
    shortDescription: 'Check your user agent string',
    keywords: ['user agent', 'browser', 'information'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'open-graph-checker',
    slug: 'open-graph-checker',
    name: 'Open Graph Checker',
    shortDescription: 'Check Open Graph tags for any website',
    keywords: ['open graph', 'checker', 'social media', 'seo'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'open-graph-generator',
    slug: 'open-graph-generator',
    name: 'Open Graph Generator',
    shortDescription: 'Generate Open Graph tags for your website',
    keywords: ['open graph', 'generator', 'social media', 'seo'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'get-http-headers',
    slug: 'get-http-headers',
    name: 'Get HTTP Headers',
    shortDescription: 'Get HTTP headers for any URL',
    keywords: ['http', 'headers', 'request', 'response'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'twitter-card-generator',
    slug: 'twitter-card-generator',
    name: 'Twitter Card Generator',
    shortDescription: 'Generate Twitter Card meta tags',
    keywords: ['twitter', 'card', 'generator', 'social media'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'what-is-my-screen-resolution',
    slug: 'what-is-my-screen-resolution',
    name: 'What Is My Screen Resolution',
    shortDescription: 'Check your screen resolution',
    keywords: ['screen', 'resolution', 'display', 'monitor'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'screen-resolution-simulator',
    slug: 'screen-resolution-simulator',
    name: 'Screen Resolution Simulator',
    shortDescription: 'Simulate different screen resolutions',
    keywords: ['screen', 'resolution', 'simulator', 'responsive'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'page-size-checker',
    slug: 'page-size-checker',
    name: 'Page Size Checker',
    shortDescription: 'Check the size of any webpage',
    keywords: ['page', 'size', 'checker', 'performance'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'url-opener',
    slug: 'url-opener',
    name: 'URL Opener',
    shortDescription: 'Open multiple URLs at once',
    keywords: ['url', 'opener', 'multiple', 'links'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'credit-card-generator',
    slug: 'credit-card-generator',
    name: 'Credit Card Generator',
    shortDescription: 'Generate test credit card numbers',
    keywords: ['credit card', 'generator', 'test', 'numbers'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'credit-card-validator',
    slug: 'credit-card-validator',
    name: 'Credit Card Validator',
    shortDescription: 'Validate credit card numbers',
    keywords: ['credit card', 'validator', 'check', 'numbers'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'wordpress-theme-detector',
    slug: 'wordpress-theme-detector',
    name: 'WordPress Theme Detector',
    shortDescription: 'Detect WordPress themes used on websites',
    keywords: ['wordpress', 'theme', 'detector', 'website'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'adsense-calculator',
    slug: 'adsense-calculator',
    name: 'AdSense Calculator',
    shortDescription: 'Calculate potential AdSense earnings',
    keywords: ['adsense', 'calculator', 'earnings', 'revenue'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'keywords-suggestion-tool',
    slug: 'keywords-suggestion-tool',
    name: 'Keywords Suggestion Tool',
    shortDescription: 'Get keyword suggestions for SEO',
    keywords: ['keywords', 'suggestion', 'seo', 'research'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'faq-schema-generator',
    slug: 'faq-schema-generator',
    name: 'FAQ Schema Generator',
    shortDescription: 'Generate FAQ schema markup',
    keywords: ['faq', 'schema', 'generator', 'seo'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'json-to-json-schema',
    slug: 'json-to-json-schema',
    name: 'JSON to JSON Schema',
    shortDescription: 'Convert JSON to JSON Schema',
    keywords: ['json', 'schema', 'converter', 'validation'],
    category: 'website-management',
    featured: false
  },
  {
    id: 'dns-records-checker',
    slug: 'dns-records-checker',
    name: 'DNS Records Checker',
    shortDescription: 'Check DNS records for any domain',
    keywords: ['dns', 'records', 'checker', 'domain'],
    category: 'website-management',
    featured: false
  },

  // Data Conversion Tools
  {
    id: 'json-csv',
    slug: 'json-csv',
    name: 'JSON ↔ CSV Converter',
    shortDescription: 'Convert between JSON and CSV formats with customizable delimiters',
    keywords: ['json', 'csv', 'convert', 'data', 'delimiter'],
    category: 'data-conversion',
    featured: true
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter',
    shortDescription: 'Format, validate, and beautify JSON data',
    keywords: ['json', 'format', 'validate', 'beautify'],
    category: 'data-conversion',
    featured: false
  },
  {
    id: 'csv-converter',
    slug: 'csv-converter',
    name: 'CSV Converter',
    shortDescription: 'Convert CSV to JSON, XML, or other formats',
    keywords: ['csv', 'convert', 'json', 'xml', 'data'],
    category: 'data-conversion',
    featured: false
  },
  {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    shortDescription: 'Encode and decode Base64 strings',
    keywords: ['base64', 'encode', 'decode', 'string'],
    category: 'data-conversion',
    featured: false
  },

  // Developer Tools
  {
    id: 'epoch-date',
    slug: 'epoch-date',
    name: 'Epoch ↔ Date Converter',
    shortDescription: 'Convert between Unix timestamps and human-readable dates',
    keywords: ['epoch', 'timestamp', 'date', 'time', 'unix'],
    category: 'developer',
    featured: true
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID Generator',
    shortDescription: 'Generate unique identifiers (UUID v1, v4) for applications',
    keywords: ['uuid', 'guid', 'unique', 'identifier', 'generator'],
    category: 'developer',
    featured: true
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator / Scanner',
    shortDescription: 'Generate QR codes from text or scan QR codes from images',
    keywords: ['qr', 'code', 'generator', 'scanner', 'barcode'],
    category: 'developer',
    featured: true
  },
  {
    id: 'fake-data-generator',
    slug: 'fake-data-generator',
    name: 'Fake Data Generator',
    shortDescription: 'Generate realistic fake data (names, emails, addresses, JSON schemas)',
    keywords: ['fake', 'data', 'generator', 'test', 'mock', 'sample'],
    category: 'developer',
    featured: false
  },
  {
    id: 'http-header-parser',
    slug: 'http-header-parser',
    name: 'HTTP Header Parser',
    shortDescription: 'Parse and analyze HTTP headers from requests and responses',
    keywords: ['http', 'headers', 'parser', 'request', 'response'],
    category: 'developer',
    featured: false
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    shortDescription: 'Decode and validate JSON Web Tokens (JWT)',
    keywords: ['jwt', 'token', 'decode', 'json', 'web', 'security'],
    category: 'developer',
    featured: true
  },
  {
    id: 'color-picker',
    slug: 'color-picker',
    name: 'Color Picker',
    shortDescription: 'Pick colors and get hex, RGB, HSL values',
    keywords: ['color', 'picker', 'hex', 'rgb', 'hsl'],
    category: 'developer',
    featured: false
  },
  {
    id: 'url-encoder',
    slug: 'url-encoder',
    name: 'URL Encoder/Decoder',
    shortDescription: 'Encode and decode URLs for safe web transmission',
    keywords: ['url', 'encode', 'decode', 'web', 'safe'],
    category: 'developer',
    featured: false
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Hash Generator',
    shortDescription: 'Generate MD5, SHA-1, SHA-256 and other hash values',
    keywords: ['hash', 'md5', 'sha', 'cryptography', 'security'],
    category: 'developer',
    featured: false
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit Converter',
    shortDescription: 'Convert between length, weight, temperature, area, volume, time, speed, pressure, and energy units with high precision',
    keywords: ['unit', 'converter', 'length', 'weight', 'temperature', 'area', 'volume', 'time', 'speed', 'pressure', 'energy'],
    category: 'math-science',
    featured: true
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    shortDescription: 'Generate truly random numbers with customizable ranges, duplicates control, sorting, and statistical analysis',
    keywords: ['random', 'number', 'generator', 'dice', 'lottery', 'statistics', 'sampling', 'probability'],
    category: 'math-science',
    featured: true
  },
  {
    id: 'plagiarism-checker',
    slug: 'plagiarism-checker',
    name: 'Plagiarism Checker',
    shortDescription: 'Check your text for originality and plagiarism with detailed reports and improvement suggestions',
    keywords: ['plagiarism', 'checker', 'originality', 'text', 'analysis', 'academic', 'writing', 'content'],
    category: 'content-writing',
    featured: true
  },
  {
    id: 'grammar-checker',
    slug: 'grammar-checker',
    name: 'Grammar Checker',
    shortDescription: 'Check your text for grammar, spelling, and style issues with detailed suggestions and readability analysis',
    keywords: ['grammar', 'checker', 'spelling', 'style', 'writing', 'proofread', 'correction', 'readability'],
    category: 'content-writing',
    featured: true
  },
  {
    id: 'text-summarizer',
    slug: 'text-summarizer',
    name: 'Text Summarizer',
    shortDescription: 'Summarize long texts into concise, key point summaries with customizable length options',
    keywords: ['text', 'summarizer', 'summary', 'compress', 'extract', 'key points', 'ai', 'nlp'],
    category: 'content-writing',
    featured: true
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Password Generator',
    shortDescription: 'Create secure, customizable passwords with advanced options and strength analysis',
    keywords: ['password', 'generator', 'secure', 'random', 'cryptographic', 'security', 'strength', 'entropy'],
    category: 'data-security',
    featured: true
  },
  {
    id: 'color-palette-generator',
    slug: 'color-palette-generator',
    name: 'Color Palette Generator',
    shortDescription: 'Create beautiful color palettes using advanced color theory principles',
    keywords: ['color', 'palette', 'generator', 'design', 'harmony', 'scheme', 'rgb', 'hsl', 'hex'],
    category: 'design',
    featured: true
  },

  // Data Security & Encoding Tools
  {
    id: 'html-entity-encoder',
    slug: 'html-entity-encoder',
    name: 'HTML Entity Encoder/Decoder',
    shortDescription: 'Encode and decode HTML entities for web development',
    keywords: ['html', 'entity', 'encode', 'decode', 'web'],
    category: 'data-security',
    featured: false
  },

  // Content & Writing Tools
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    shortDescription: 'Convert text between UPPERCASE, lowercase, Title Case, and more',
    keywords: ['case', 'converter', 'uppercase', 'lowercase', 'title'],
    category: 'content-writing',
    featured: false
  },
  {
    id: 'text-summarizer',
    slug: 'text-summarizer',
    name: 'Text Summarizer',
    shortDescription: 'Summarize long texts using AI-powered algorithms',
    keywords: ['summarizer', 'summary', 'text', 'ai', 'shorten'],
    category: 'content-writing',
    featured: false
  },

  // Design & Color Tools
  {
    id: 'gradient-generator',
    slug: 'gradient-generator',
    name: 'Gradient Generator',
    shortDescription: 'Create beautiful CSS gradients with custom colors and directions',
    keywords: ['gradient', 'generator', 'css', 'color', 'design'],
    category: 'design-color',
    featured: true
  },
  {
    id: 'contrast-checker',
    slug: 'contrast-checker',
    name: 'Contrast Checker',
    shortDescription: 'Check color contrast ratios for accessibility compliance',
    keywords: ['contrast', 'checker', 'accessibility', 'wcag', 'color'],
    category: 'design-color',
    featured: true
  },
  {
    id: 'palette-extractor',
    slug: 'palette-extractor',
    name: 'Palette Extractor from Image',
    shortDescription: 'Extract color palettes from uploaded images',
    keywords: ['palette', 'extractor', 'image', 'color', 'design'],
    category: 'design-color',
    featured: false
  },
  {
    id: 'font-pairing',
    slug: 'font-pairing',
    name: 'Font Pairing Recommender',
    shortDescription: 'Get font pairing recommendations for better typography',
    keywords: ['font', 'pairing', 'typography', 'design', 'recommendation'],
    category: 'design-color',
    featured: false
  },

  // Math & Science Tools
  {
    id: 'equation-formatter',
    slug: 'equation-formatter',
    name: 'Equation Formatter',
    shortDescription: 'Convert between LaTeX, MathML, and mathematical notation',
    keywords: ['equation', 'latex', 'mathml', 'math', 'formatter'],
    category: 'math-science',
    featured: true
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit Converter',
    shortDescription: 'Convert between different units (length, weight, temperature, currency)',
    keywords: ['unit', 'converter', 'length', 'weight', 'temperature', 'currency'],
    category: 'math-science',
    featured: true
  },
  {
    id: 'random-number-generator',
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    shortDescription: 'Generate random numbers with custom ranges and distributions',
    keywords: ['random', 'number', 'generator', 'statistics', 'probability'],
    category: 'math-science',
    featured: false
  },
  {
    id: 'matrix-calculator',
    slug: 'matrix-calculator',
    name: 'Matrix Calculator',
    shortDescription: 'Perform matrix operations (addition, multiplication, determinant)',
    keywords: ['matrix', 'calculator', 'algebra', 'linear', 'math'],
    category: 'math-science',
    featured: false
  },

  // Web & SEO Tools
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    shortDescription: 'Generate SEO-optimized meta tags for your website',
    keywords: ['meta', 'tag', 'generator', 'seo', 'website'],
    category: 'web-seo',
    featured: true
  },
  {
    id: 'schema-markup-generator',
    slug: 'schema-markup-generator',
    name: 'Schema Markup Generator',
    shortDescription: 'Generate JSON-LD schema markup for local business, articles, etc.',
    keywords: ['schema', 'markup', 'json-ld', 'seo', 'structured', 'data'],
    category: 'web-seo',
    featured: true
  },
  {
    id: 'robots-sitemap-generator',
    slug: 'robots-sitemap-generator',
    name: 'Robots.txt / Sitemap.xml Generator',
    shortDescription: 'Generate robots.txt and sitemap.xml files for your website',
    keywords: ['robots', 'sitemap', 'generator', 'seo', 'crawler'],
    category: 'web-seo',
    featured: false
  },
  {
    id: 'redirect-checker',
    slug: 'redirect-checker',
    name: 'Redirect Checker',
    shortDescription: 'Check and analyze redirect chains for SEO optimization',
    keywords: ['redirect', 'checker', 'seo', '301', '302', 'chain'],
    category: 'web-seo',
    featured: false
  }
]

// Category definitions
export const toolCategories = [
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Essential tools for developers and programmers 🚀',
    icon: 'fas fa-code',
    color: '#667eea'
  },
  {
    id: 'math-science',
    name: 'Math & Science',
    description: 'Mathematical calculations and scientific computations 🧮',
    icon: 'fas fa-calculator',
    color: '#764ba2'
  },
  {
    id: 'content-writing',
    name: 'Content & Writing',
    description: 'Professional writing and content creation tools ✍️',
    icon: 'fas fa-pen-fancy',
    color: '#f093fb'
  },
  {
    id: 'design-color',
    name: 'Design & Colors',
    description: 'Create beautiful designs with color and typography tools 🎨',
    icon: 'fas fa-palette',
    color: '#f5576c'
  },
  {
    id: 'data-security',
    name: 'Security & Encoding',
    description: 'Secure your data with encoding, hashing, and encryption tools 🔒',
    icon: 'fas fa-shield-alt',
    color: '#4ecdc4'
  },
  {
    id: 'data-conversion',
    name: 'Data Conversion',
    description: 'Convert between different data formats and structures 🔄',
    icon: 'fas fa-exchange-alt',
    color: '#45b7d1'
  },
  {
    id: 'text-analysis',
    name: 'Text Analysis',
    description: 'A complete set of text tools is now at your fingertips 📝',
    icon: 'fas fa-file-alt',
    color: '#96ceb4'
  },
  {
    id: 'web-seo',
    name: 'Web & SEO',
    description: 'Optimize your website for search engines and performance 🔍',
    icon: 'fas fa-search',
    color: '#feca57'
  },
  {
    id: 'file-document',
    name: 'File & Documents',
    description: 'For people working with data, text, and documents 📄',
    icon: 'fas fa-file-pdf',
    color: '#ff9ff3'
  },
  {
    id: 'website-tracking',
    name: 'Analytics & Tracking',
    description: 'Measure, monitor, and track your website performance 📊',
    icon: 'fas fa-chart-line',
    color: '#54a0ff'
  },
  {
    id: 'website-management',
    name: 'Website Management',
    description: 'Tools to get more traffic and improve website performance 🌐',
    icon: 'fas fa-cogs',
    color: '#5f27cd'
  },
  {
    id: 'youtube',
    name: 'YouTube Tools',
    description: 'The powerful YouTube tools you need to grow your audience 📺',
    icon: 'fab fa-youtube',
    color: '#ff0000'
  }
]

export const getToolBySlug = (slug) => {
  return toolsRegistry.find(tool => tool.slug === slug)
}

export const getFeaturedTools = () => {
  return toolsRegistry.filter(tool => tool.featured)
}

export const getToolsByCategory = (category) => {
  return toolsRegistry.filter(tool => tool.category === category)
}

export const getCategoryById = (categoryId) => {
  return toolCategories.find(category => category.id === categoryId)
}

export const searchTools = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return toolsRegistry.filter(tool =>
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  )
}

export const getToolsByCategoryWithMeta = (categoryId) => {
  const category = getCategoryById(categoryId)
  const tools = getToolsByCategory(categoryId)
  return {
    category,
    tools
  }
}

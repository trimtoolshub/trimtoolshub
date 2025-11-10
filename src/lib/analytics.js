// Google Analytics Event Tracking Utilities
// Based on audit recommendations for tracking tool usage, conversions, and user behavior

export const trackToolUsed = (toolName, category, resultState = 'success') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tool_used', {
      tool_name: toolName,
      category: category,
      result_state: resultState
    })
  }
}

export const trackCopyResult = (toolName, category) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'copy_result', {
      tool_name: toolName,
      category: category
    })
  }
}

export const trackDownloadClicked = (toolName, category, fileType) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download_clicked', {
      tool_name: toolName,
      category: category,
      file_type: fileType
    })
  }
}

export const trackShareClicked = (toolName, category, platform) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share_clicked', {
      tool_name: toolName,
      category: category,
      platform: platform
    })
  }
}

export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle
    })
  }
}

export const trackSearchPerformed = (searchTerm, resultsCount) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    })
  }
}

export const trackError = (errorType, toolName, errorMessage) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: `${errorType}: ${errorMessage}`,
      tool_name: toolName,
      fatal: false
    })
  }
}

export const trackConversion = (conversionType, value, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      conversion_type: conversionType,
      value: value,
      currency: currency
    })
  }
}

// Helper function to get tool category from slug
export const getToolCategory = (slug) => {
  const categoryMap = {
    'qr-code-generator': 'utilities',
    'url-shortener': 'utilities',
    'password-generator': 'security',
    'hash-generator': 'security',
    'jwt-decoder': 'developer',
    'uuid-generator': 'developer',
    'base64-encoder': 'developer',
    'base64-decoder': 'developer',
    'color-palette-generator': 'design',
    'gradient-generator': 'design',
    'unit-converter': 'math',
    'random-number-generator': 'math',
    'matrix-calculator': 'math',
    'text-summarizer': 'text',
    'grammar-checker': 'text',
    'plagiarism-checker': 'text',
    'article-rewriter': 'text',
    'youtube-title-generator': 'youtube',
    'youtube-description-generator': 'youtube',
    'youtube-tag-generator': 'youtube',
    'youtube-hashtag-generator': 'youtube',
    'pdf-merger-splitter': 'file',
    'pdf-word-converter': 'file',
    'image-pdf-converter': 'file',
    'file-compressor': 'file',
    'file-converter': 'file',
    'meta-tag-generator': 'seo',
    'keyword-density-checker': 'seo',
    'backlink-checker': 'seo',
    'website-speed-test': 'seo',
    'qr-code-scanner': 'utilities',
    'password-strength-checker': 'security',
    'image-resizer': 'image'
  }
  
  return categoryMap[slug] || 'utilities'
}

// Auto-track tool usage when tools are loaded
export const autoTrackToolUsage = (toolSlug, toolName) => {
  const category = getToolCategory(toolSlug)
  trackToolUsed(toolName, category, 'success')
}

export default {
  trackToolUsed,
  trackCopyResult,
  trackDownloadClicked,
  trackShareClicked,
  trackPageView,
  trackSearchPerformed,
  trackError,
  trackConversion,
  getToolCategory,
  autoTrackToolUsage
}

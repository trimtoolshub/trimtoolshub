// API Configuration for AI Tools
// Get your free API keys from the respective services

export const API_KEYS = {
  // Hugging Face API Key (Free tier available)
  // Get your token from: https://huggingface.co/settings/tokens
  HUGGING_FACE: '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',
  
  // Alternative APIs (if you want to use different services)
  OPENAI: 'sk-your_openai_key_here',
  GOOGLE_TRANSLATE: 'your_google_translate_key_here',
  
  // LibreTranslate (Free and open source)
  LIBRETRANSLATE_URL: 'https://libretranslate.de/translate',
  
  // Unsplash (Free with attribution)
  UNSPLASH_ACCESS_KEY: 'your_unsplash_access_key_here'
}

// API Endpoints
export const API_ENDPOINTS = {
  HUGGING_FACE_BASE: 'https://api-inference.huggingface.co/models',
  LIBRETRANSLATE: 'https://libretranslate.de/translate',
  UNSPLASH: 'https://api.unsplash.com',
  PICSUM: 'https://picsum.photos'
}

// Model configurations
export const MODELS = {
  TEXT_GENERATION: 'microsoft/DialoGPT-medium',
  CODE_GENERATION: 'microsoft/CodeGPT-small-py',
  SENTIMENT_ANALYSIS: 'cardiffnlp/twitter-roberta-base-sentiment-latest',
  TRANSLATION: 'Helsinki-NLP/opus-mt-en-es' // Example model
}

// Rate limiting and retry configuration
export const API_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
  TIMEOUT: 10000, // milliseconds
  RATE_LIMIT_DELAY: 500 // milliseconds between requests
}

# AI Tools Setup Guide

This guide will help you set up the AI tools with real API connections.

## Required API Keys

### 1. Hugging Face API (Free)
- **Sign up**: Go to [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- **Create token**: Click "New token" and select "Read" permissions
- **Copy token**: Copy the token (starts with `hf_`)
- **Update config**: Replace `hf_your_token_here` in `src/config/apiKeys.js`

### 2. LibreTranslate API (Free)
- **No API key required**: LibreTranslate is free and open source
- **Endpoint**: Already configured to use `https://libretranslate.de/translate`

### 3. Unsplash API (Optional - for better images)
- **Sign up**: Go to [https://unsplash.com/developers](https://unsplash.com/developers)
- **Create app**: Create a new application
- **Get access key**: Copy your access key
- **Update config**: Replace `your_unsplash_access_key_here` in `src/config/apiKeys.js`

## Quick Setup Steps

1. **Get Hugging Face Token**:
   ```bash
   # Visit: https://huggingface.co/settings/tokens
   # Create a new token with "Read" permissions
   # Copy the token
   ```

2. **Update Configuration**:
   ```javascript
   // In src/config/apiKeys.js
   export const API_KEYS = {
     HUGGING_FACE: 'hf_your_actual_token_here', // Replace with your token
     // ... other keys
   }
   ```

3. **Test the Tools**:
   - Open any AI tool
   - Try generating content
   - Check browser console for any errors

## API Limits and Usage

### Hugging Face Free Tier
- **Rate limit**: 1000 requests per month
- **Concurrent requests**: 1 request at a time
- **Models**: Access to public models only

### LibreTranslate
- **Rate limit**: No strict limits (community service)
- **Languages**: 20+ languages supported
- **Usage**: Free for personal and commercial use

### Unsplash
- **Rate limit**: 50 requests per hour (free tier)
- **Usage**: Free with attribution required
- **Images**: High-quality stock photos

## Troubleshooting

### Common Issues

1. **"Failed to generate text" Error**:
   - Check if Hugging Face token is valid
   - Verify internet connection
   - Check browser console for detailed errors

2. **Rate Limit Exceeded**:
   - Wait a few minutes before trying again
   - Consider upgrading to paid tier for higher limits

3. **CORS Errors**:
   - Some APIs may have CORS restrictions
   - Tools include fallback mechanisms for offline use

### Fallback Mechanisms

All AI tools include fallback mechanisms:
- If API fails, tools use local generation
- Local generation provides basic functionality
- Users can still use tools even without API access

## Alternative APIs

If you want to use different services:

### OpenAI API
```javascript
// Replace in apiKeys.js
OPENAI: 'sk-your_openai_key_here'
```

### Google Translate API
```javascript
// Replace in apiKeys.js
GOOGLE_TRANSLATE: 'your_google_translate_key_here'
```

### Custom Models
You can use any Hugging Face model by updating the `MODELS` configuration:

```javascript
export const MODELS = {
  TEXT_GENERATION: 'your-preferred-model',
  CODE_GENERATION: 'your-code-model',
  SENTIMENT_ANALYSIS: 'your-sentiment-model'
}
```

## Security Notes

- Never commit API keys to public repositories
- Use environment variables in production
- Rotate keys regularly
- Monitor usage to prevent abuse

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify API keys are correct
3. Test with simple prompts first
4. Check API service status pages

## Cost Optimization

- Use free tiers when possible
- Implement caching for repeated requests
- Batch requests when possible
- Monitor usage to avoid overages

import { useState, useCallback, useRef } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const PaletteExtractor = () => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [extractedColors, setExtractedColors] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [extractionMethod, setExtractionMethod] = useState('dominant')
  const [colorCount, setColorCount] = useState(5)
  const fileInputRef = useRef(null)

  const extractionMethods = [
    { value: 'dominant', label: 'Dominant Colors', description: 'Extract the most prominent colors' },
    { value: 'vibrant', label: 'Vibrant Colors', description: 'Focus on bright and saturated colors' },
    { value: 'muted', label: 'Muted Colors', description: 'Extract softer, desaturated colors' },
    { value: 'light', label: 'Light Colors', description: 'Focus on lighter color tones' },
    { value: 'dark', label: 'Dark Colors', description: 'Focus on darker color tones' }
  ]

  const colorCounts = [3, 5, 8, 10, 12, 15]

  const extractColors = useCallback(async () => {
    if (!imageFile) {
      setError('Please select an image file first')
      return
    }

    setIsProcessing(true)
    setError('')
    setExtractedColors([])

    try {
      // Create a canvas to analyze the image
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data

        // Extract colors based on method
        let colors = []
        switch (extractionMethod) {
          case 'dominant':
            colors = extractDominantColors(pixels, colorCount)
            break
          case 'vibrant':
            colors = extractVibrantColors(pixels, colorCount)
            break
          case 'muted':
            colors = extractMutedColors(pixels, colorCount)
            break
          case 'light':
            colors = extractLightColors(pixels, colorCount)
            break
          case 'dark':
            colors = extractDarkColors(pixels, colorCount)
            break
          default:
            colors = extractDominantColors(pixels, colorCount)
        }

        setExtractedColors(colors)
        setIsProcessing(false)
      }

      img.onerror = () => {
        setError('Failed to load image. Please try a different file.')
        setIsProcessing(false)
      }

      img.src = imagePreview
    } catch (err) {
      setError('Error processing image: ' + err.message)
      setIsProcessing(false)
    }
  }, [imageFile, imagePreview, extractionMethod, colorCount])

  // Color extraction algorithms
  const extractDominantColors = (pixels, count) => {
    const colorMap = new Map()
    
    // Sample pixels (every 10th pixel for performance)
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      
      if (a < 128) continue // Skip transparent pixels
      
      // Quantize colors to reduce noise
      const quantizedR = Math.round(r / 32) * 32
      const quantizedG = Math.round(g / 32) * 32
      const quantizedB = Math.round(b / 32) * 32
      
      const colorKey = `${quantizedR},${quantizedG},${quantizedB}`
      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1)
    }
    
    // Sort by frequency and return top colors
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([color, frequency]) => {
        const [r, g, b] = color.split(',').map(Number)
        return {
          rgb: { r, g, b },
          hex: rgbToHex(r, g, b),
          hsl: rgbToHsl(r, g, b),
          frequency: frequency,
          percentage: ((frequency / (pixels.length / 40)) * 100).toFixed(1)
        }
      })
  }

  const extractVibrantColors = (pixels, count) => {
    const colors = []
    
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      
      if (a < 128) continue
      
      const hsl = rgbToHsl(r, g, b)
      
      // Filter for vibrant colors (high saturation, medium to high lightness)
      if (hsl.s > 0.5 && hsl.l > 0.2 && hsl.l < 0.8) {
        colors.push({
          rgb: { r, g, b },
          hex: rgbToHex(r, g, b),
          hsl: hsl,
          vibrancy: hsl.s * hsl.l
        })
      }
    }
    
    // Sort by vibrancy and return top colors
    return colors
      .sort((a, b) => b.vibrancy - a.vibrancy)
      .slice(0, count)
      .map(color => ({
        ...color,
        percentage: 'N/A'
      }))
  }

  const extractMutedColors = (pixels, count) => {
    const colors = []
    
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      
      if (a < 128) continue
      
      const hsl = rgbToHsl(r, g, b)
      
      // Filter for muted colors (low saturation)
      if (hsl.s < 0.3) {
        colors.push({
          rgb: { r, g, b },
          hex: rgbToHex(r, g, b),
          hsl: hsl,
          muteness: 1 - hsl.s
        })
      }
    }
    
    // Sort by muteness and return top colors
    return colors
      .sort((a, b) => b.muteness - a.muteness)
      .slice(0, count)
      .map(color => ({
        ...color,
        percentage: 'N/A'
      }))
  }

  const extractLightColors = (pixels, count) => {
    const colors = []
    
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      
      if (a < 128) continue
      
      const hsl = rgbToHsl(r, g, b)
      
      // Filter for light colors (high lightness)
      if (hsl.l > 0.6) {
        colors.push({
          rgb: { r, g, b },
          hex: rgbToHex(r, g, b),
          hsl: hsl,
          lightness: hsl.l
        })
      }
    }
    
    // Sort by lightness and return top colors
    return colors
      .sort((a, b) => b.lightness - a.lightness)
      .slice(0, count)
      .map(color => ({
        ...color,
        percentage: 'N/A'
      }))
  }

  const extractDarkColors = (pixels, count) => {
    const colors = []
    
    for (let i = 0; i < pixels.length; i += 40) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      
      if (a < 128) continue
      
      const hsl = rgbToHsl(r, g, b)
      
      // Filter for dark colors (low lightness)
      if (hsl.l < 0.4) {
        colors.push({
          rgb: { r, g, b },
          hex: rgbToHex(r, g, b),
          hsl: hsl,
          darkness: 1 - hsl.l
        })
      }
    }
    
    // Sort by darkness and return top colors
    return colors
      .sort((a, b) => b.darkness - a.darkness)
      .slice(0, count)
      .map(color => ({
        ...color,
        percentage: 'N/A'
      }))
  }

  // Utility functions
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100) / 100,
      l: Math.round(l * 100) / 100
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('Image file is too large. Please select a file smaller than 10MB.')
      return
    }

    setImageFile(file)
    setError('')
    setExtractedColors([])

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setImageFile(null)
    setImagePreview('')
    setExtractedColors([])
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const generateCSS = (colors) => {
    return colors.map(color => 
      `/* ${color.hex} */\nbackground-color: ${color.hex};\ncolor: ${color.hsl.l > 0.5 ? '#000000' : '#ffffff'};`
    ).join('\n\n')
  }

  const generatePalette = (colors) => {
    return colors.map(color => color.hex).join(', ')
  }

  return (
    <>
      <SEOHead
        title="Palette Extractor from Image - Extract Color Palettes Online"
        description="Extract color palettes from images online. Get dominant, vibrant, muted, light, or dark colors from any image. Perfect for designers and artists."
        canonical="/tools/palette-extractor"
        keywords={['palette', 'extractor', 'color', 'image', 'design', 'colors', 'hex', 'rgb', 'hsl']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Palette Extractor from Image',
          description: 'Extract color palettes from images',
          url: 'https://www.trimtoolshub.com/tools/palette-extractor',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'Web Browser'
        }}
      />

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-palette" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Palette Extractor from Image
        </h2>
        
        <div style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border)', 
          borderRadius: '0.75rem', 
          padding: '1.5rem',
          marginBottom: '2rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            Extract beautiful color palettes from any image with our Palette Extractor. Whether you're designing 
            websites, creating artwork, developing brand colors, or working on any visual project, our tool 
            analyzes images to identify the most important colors.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Palette Extractor offers multiple extraction methods including dominant colors, vibrant colors, 
            muted tones, light colors, and dark colors. Perfect for designers, artists, developers, marketers, 
            and anyone working with visual content and color schemes.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive color analysis including: <strong>Multiple Extraction Methods:</strong> 
            Choose from dominant, vibrant, muted, light, or dark color extraction. <strong>Color Formats:</strong> 
            Get colors in HEX, RGB, and HSL formats. <strong>Color Information:</strong> 
            View color codes, percentages, and visual representations. <strong>Export Options:</strong> 
            Copy color codes, generate CSS, or export palette data. <strong>Image Preview:</strong> 
            See your uploaded image alongside extracted colors. <strong>Customizable Count:</strong> 
            Choose how many colors to extract (3-15 colors).
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multiple extraction methods, color formats, color information, export options, 
            image preview, customizable count, and comprehensive documentation about color theory and 
            palette extraction techniques.
          </p>
        </div>
        
        <AdSlot slotId="palette-extractor-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Image Upload */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Upload Image</h3>
            <div style={{
              border: '2px dashed var(--border)',
              borderRadius: '0.5rem',
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-secondary)'
            }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                <FontAwesomeIcon icon="fas fa-upload" />
                Choose Image File
              </button>
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Supported formats: JPG, PNG, GIF, WebP (Max 10MB)
              </p>
            </div>
            
            {imagePreview && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border)'
                  }}
                />
                <button
                  onClick={clearImage}
                  style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '1rem auto 0'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-trash" />
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Extraction Settings */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Extraction Settings</h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              {extractionMethods.map((method) => (
                <button
                  key={method.value}
                  onClick={() => setExtractionMethod(method.value)}
                  style={{
                    padding: '1rem',
                    backgroundColor: extractionMethod === method.value ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: extractionMethod === method.value ? 'white' : 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ 
                    fontWeight: '600', 
                    marginBottom: '0.25rem',
                    fontSize: '1rem'
                  }}>
                    {method.label}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    opacity: 0.8
                  }}>
                    {method.description}
                  </div>
                </button>
              ))}
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: 'var(--text-primary)',
                fontWeight: '500'
              }}>
                Number of Colors:
              </label>
              <select
                value={colorCount}
                onChange={(e) => setColorCount(parseInt(e.target.value))}
                style={{
                  padding: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
              >
                {colorCounts.map(count => (
                  <option key={count} value={count}>{count} colors</option>
                ))}
              </select>
            </div>
          </div>

          {/* Extract Button */}
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={extractColors}
              disabled={isProcessing || !imageFile}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isProcessing || !imageFile ? 'var(--bg-tertiary)' : '#10b981',
                color: isProcessing || !imageFile ? 'var(--text-secondary)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: isProcessing || !imageFile ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem'
              }}
            >
              <FontAwesomeIcon icon={isProcessing ? "fas fa-spinner fa-spin" : "fas fa-magic"} />
              {isProcessing ? 'Extracting Colors...' : 'Extract Palette'}
            </button>
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
              {error}
            </div>
          )}

          {/* Extracted Colors */}
          {extractedColors.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-palette" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Extracted Colors
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => copyToClipboard(generatePalette(extractedColors))}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <FontAwesomeIcon icon="fas fa-copy" />
                    Copy Palette
                  </button>
                  <button
                    onClick={() => copyToClipboard(generateCSS(extractedColors))}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--accent)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    <FontAwesomeIcon icon="fas fa-code" />
                    Copy CSS
                  </button>
                </div>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {extractedColors.map((color, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '80px',
                        backgroundColor: color.hex,
                        borderRadius: '0.25rem',
                        marginBottom: '1rem',
                        border: '1px solid var(--border)'
                      }}
                    />
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{color.hex}</strong>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      HSL: {color.hsl.h}°, {Math.round(color.hsl.s * 100)}%, {Math.round(color.hsl.l * 100)}%
                    </div>
                    {color.percentage !== 'N/A' && (
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {color.percentage}% of image
                      </div>
                    )}
                    <button
                      onClick={() => copyToClipboard(color.hex)}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Copy HEX
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Color Theory Tips */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Color Theory Tips
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-balance-scale" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Color Harmony
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use complementary colors (opposite on color wheel) for high contrast.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-eye" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Accessibility
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Ensure sufficient contrast between text and background colors.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-palette" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Palette Balance
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Use 60-30-10 rule: 60% dominant, 30% secondary, 10% accent colors.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-heart" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Emotional Impact
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Warm colors evoke energy, cool colors create calmness.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="palette-extractor-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Color Palette Extraction & Design Theory
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does color palette extraction work?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Color palette extraction analyzes image pixels: <strong>Pixel Analysis:</strong> 
                Examines individual pixels to identify color values. <strong>Color Quantization:</strong> 
                Groups similar colors to reduce noise and identify dominant tones. <strong>Frequency Analysis:</strong> 
                Counts how often each color appears in the image. <strong>Algorithm Selection:</strong> 
                Different methods focus on different color characteristics. <strong>Color Space Conversion:</strong> 
                Converts between RGB, HSL, and other color spaces. <strong>Ranking & Selection:</strong> 
                Ranks colors by importance and selects the most representative ones.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the different extraction methods and when to use them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Extraction methods serve different purposes: <strong>Dominant Colors:</strong> 
                Best for understanding the overall color scheme and mood. <strong>Vibrant Colors:</strong> 
                Perfect for energetic designs, branding, and attention-grabbing elements. <strong>Muted Colors:</strong> 
                Ideal for sophisticated, professional, or calming designs. <strong>Light Colors:</strong> 
                Great for backgrounds, subtle accents, and clean designs. <strong>Dark Colors:</strong> 
                Excellent for text, borders, and creating depth and contrast.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I use extracted color palettes effectively in design?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Effective palette usage strategies: <strong>60-30-10 Rule:</strong> 
                Use 60% dominant color, 30% secondary, 10% accent. <strong>Color Hierarchy:</strong> 
                Establish visual hierarchy with color importance. <strong>Consistency:</strong> 
                Maintain consistent color usage across all design elements. <strong>Accessibility:</strong> 
                Ensure sufficient contrast for readability and usability. <strong>Brand Alignment:</strong> 
                Choose colors that align with brand personality and values. <strong>Testing:</strong> 
                Test color combinations across different devices and lighting conditions.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for color accessibility?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Color accessibility best practices: <strong>Contrast Ratios:</strong> 
                Maintain WCAG AA standards (4.5:1 for normal text, 3:1 for large text). <strong>Color Independence:</strong> 
                Don't rely solely on color to convey information. <strong>Testing Tools:</strong> 
                Use color contrast analyzers and accessibility testing tools. <strong>Multiple Indicators:</strong> 
                Combine color with icons, text, or patterns. <strong>User Testing:</strong> 
                Test with users who have color vision deficiencies. <strong>Documentation:</strong> 
                Document color choices and accessibility considerations.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I choose the right number of colors for my palette?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Color count selection guidelines: <strong>Simple Designs:</strong> 
                Use 3-5 colors for clean, minimal designs. <strong>Complex Projects:</strong> 
                Use 8-12 colors for detailed designs with multiple elements. <strong>Brand Guidelines:</strong> 
                Follow established brand color standards and guidelines. <strong>Content Type:</strong> 
                Consider the complexity of your content and design needs. <strong>User Experience:</strong> 
                Balance visual interest with usability and clarity. <strong>Consistency:</strong> 
                Maintain consistent color usage across all touchpoints.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common mistakes to avoid when working with color palettes?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common color palette mistakes: <strong>Too Many Colors:</strong> 
                Using too many colors creates visual chaos and inconsistency. <strong>Poor Contrast:</strong> 
                Insufficient contrast affects readability and accessibility. <strong>Inconsistent Usage:</strong> 
                Not maintaining consistent color application across designs. <strong>Ignoring Context:</strong> 
                Not considering cultural, emotional, or contextual color meanings. <strong>No Testing:</strong> 
                Not testing colors across different devices and lighting conditions. <strong>Trend Following:</strong> 
                Blindly following trends without considering brand appropriateness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaletteExtractor

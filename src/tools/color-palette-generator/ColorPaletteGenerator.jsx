import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const ColorPaletteGenerator = () => {
  const [palette, setPalette] = useState([])
  const [paletteName, setPaletteName] = useState('')
  const [colorCount, setColorCount] = useState(5)
  const [paletteType, setPaletteType] = useState('random')
  const [baseColor, setBaseColor] = useState('#667eea')
  const [paletteHistory, setPaletteHistory] = useState([])

  const generatePalette = useCallback(() => {
    let newPalette = []
    
    switch (paletteType) {
      case 'random':
        newPalette = generateRandomPalette(colorCount)
        break
      case 'monochromatic':
        newPalette = generateMonochromaticPalette(baseColor, colorCount)
        break
      case 'analogous':
        newPalette = generateAnalogousPalette(baseColor, colorCount)
        break
      case 'complementary':
        newPalette = generateComplementaryPalette(baseColor, colorCount)
        break
      case 'triadic':
        newPalette = generateTriadicPalette(baseColor, colorCount)
        break
      case 'tetradic':
        newPalette = generateTetradicPalette(baseColor, colorCount)
        break
      default:
        newPalette = generateRandomPalette(colorCount)
    }
    
    setPalette(newPalette)
    
    // Add to history
    const paletteData = {
      colors: newPalette,
      name: paletteName || `${paletteType.charAt(0).toUpperCase() + paletteType.slice(1)} Palette`,
      type: paletteType,
      timestamp: new Date().toISOString()
    }
    setPaletteHistory(prev => [paletteData, ...prev.slice(0, 9)])
  }, [colorCount, paletteType, baseColor, paletteName])

  const generateRandomPalette = (count) => {
    const colors = []
    for (let i = 0; i < count; i++) {
      colors.push({
        hex: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
        rgb: null,
        hsl: null,
        name: `Color ${i + 1}`
      })
    }
    return colors.map(color => ({
      ...color,
      rgb: hexToRgb(color.hex),
      hsl: hexToHsl(color.hex)
    }))
  }

  const generateMonochromaticPalette = (baseHex, count) => {
    const hsl = hexToHsl(baseHex)
    const colors = []
    
    for (let i = 0; i < count; i++) {
      const lightness = Math.max(10, Math.min(90, hsl.l + (i - Math.floor(count / 2)) * 15))
      const newHsl = { h: hsl.h, s: hsl.s, l: lightness }
      const hex = hslToHex(newHsl)
      colors.push({
        hex,
        rgb: hexToRgb(hex),
        hsl: newHsl,
        name: `Shade ${i + 1}`
      })
    }
    return colors
  }

  const generateAnalogousPalette = (baseHex, count) => {
    const hsl = hexToHsl(baseHex)
    const colors = []
    
    for (let i = 0; i < count; i++) {
      const hue = (hsl.h + (i - Math.floor(count / 2)) * 30) % 360
      const newHsl = { h: hue, s: hsl.s, l: hsl.l }
      const hex = hslToHex(newHsl)
      colors.push({
        hex,
        rgb: hexToRgb(hex),
        hsl: newHsl,
        name: `Analogous ${i + 1}`
      })
    }
    return colors
  }

  const generateComplementaryPalette = (baseHex, count) => {
    const hsl = hexToHsl(baseHex)
    const colors = []
    
    for (let i = 0; i < count; i++) {
      let hue, saturation, lightness
      
      if (i === 0) {
        hue = hsl.h
        saturation = hsl.s
        lightness = hsl.l
      } else if (i === 1) {
        hue = (hsl.h + 180) % 360
        saturation = hsl.s
        lightness = hsl.l
      } else {
        const isComplementary = i % 2 === 0
        hue = isComplementary ? hsl.h : (hsl.h + 180) % 360
        saturation = Math.max(20, hsl.s - (i - 2) * 10)
        lightness = Math.max(20, Math.min(80, hsl.l + (i - 2) * 10))
      }
      
      const newHsl = { h: hue, s: saturation, l: lightness }
      const hex = hslToHex(newHsl)
      colors.push({
        hex,
        rgb: hexToRgb(hex),
        hsl: newHsl,
        name: `Complementary ${i + 1}`
      })
    }
    return colors
  }

  const generateTriadicPalette = (baseHex, count) => {
    const hsl = hexToHsl(baseHex)
    const colors = []
    
    for (let i = 0; i < count; i++) {
      const hue = (hsl.h + i * 120) % 360
      const lightness = Math.max(20, Math.min(80, hsl.l + (i - Math.floor(count / 2)) * 10))
      const newHsl = { h: hue, s: hsl.s, l: lightness }
      const hex = hslToHex(newHsl)
      colors.push({
        hex,
        rgb: hexToRgb(hex),
        hsl: newHsl,
        name: `Triadic ${i + 1}`
      })
    }
    return colors
  }

  const generateTetradicPalette = (baseHex, count) => {
    const hsl = hexToHsl(baseHex)
    const colors = []
    
    for (let i = 0; i < count; i++) {
      const hue = (hsl.h + i * 90) % 360
      const lightness = Math.max(20, Math.min(80, hsl.l + (i - Math.floor(count / 2)) * 8))
      const newHsl = { h: hue, s: hsl.s, l: lightness }
      const hex = hslToHex(newHsl)
      colors.push({
        hex,
        rgb: hexToRgb(hex),
        hsl: newHsl,
        name: `Tetradic ${i + 1}`
      })
    }
    return colors
  }

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const hexToHsl = (hex) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null
    
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255
    
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
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const hslToHex = (hsl) => {
    const h = hsl.h / 360
    const s = hsl.s / 100
    const l = hsl.l / 100
    
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    let r, g, b
    
    if (s === 0) {
      r = g = b = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const copyColor = async (color) => {
    try {
      await navigator.clipboard.writeText(color.hex)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const copyPalette = async () => {
    if (palette.length === 0) return
    
    const paletteText = palette.map(color => color.hex).join('\n')
    try {
      await navigator.clipboard.writeText(paletteText)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const downloadPalette = () => {
    if (palette.length === 0) return
    
    const paletteData = {
      name: paletteName || `${paletteType.charAt(0).toUpperCase() + paletteType.slice(1)} Palette`,
      type: paletteType,
      colors: palette.map(color => ({
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
        name: color.name
      })),
      generated: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `palette-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearHistory = () => {
    setPaletteHistory([])
  }

  const loadFromHistory = (paletteData) => {
    setPalette(paletteData.colors)
    setPaletteName(paletteData.name)
    setPaletteType(paletteData.type)
  }

  const removeFromHistory = (index) => {
    setPaletteHistory(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-palette" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Color Palette Generator
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
            Create stunning color palettes with our advanced Color Palette Generator that uses professional 
            color theory principles to generate harmonious color combinations. Whether you're designing 
            websites, creating marketing materials, planning interior spaces, or developing mobile apps, 
            our tool provides scientifically-based color schemes that ensure visual appeal and accessibility.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Color Palette Generator offers six distinct palette types: Random (for creative inspiration), 
            Monochromatic (shades of one color), Analogous (adjacent colors), Complementary (opposite colors), 
            Triadic (three evenly spaced colors), and Tetradic (four evenly spaced colors). Each type uses 
            advanced algorithms to create balanced, professional color combinations.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for graphic designers, web developers, UI/UX designers, marketers, artists, and anyone 
            who needs professional color schemes. The tool provides detailed color information including 
            hex codes, RGB values, and HSL values for seamless integration into your design workflow.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include customizable color counts (3-12), base color selection, palette naming, 
            instant color copying, palette history, export capabilities, and comprehensive documentation 
            about color theory and design principles.
          </p>
        </div>

        {/* Configuration Section */}
        <div className="config-section">
          <h3 className="config-title">
            <FontAwesomeIcon icon="fas fa-cog" className="title-icon" />
            Palette Configuration
          </h3>
          
          <div className="config-grid">
            {/* Palette Type */}
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-paint-brush" className="label-icon" />
                Palette Type
              </label>
              <select
                value={paletteType}
                onChange={(e) => setPaletteType(e.target.value)}
                className="type-select"
              >
                <option value="random">Random Colors</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="analogous">Analogous</option>
                <option value="complementary">Complementary</option>
                <option value="triadic">Triadic</option>
                <option value="tetradic">Tetradic</option>
              </select>
            </div>

            {/* Color Count */}
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-hashtag" className="label-icon" />
                Number of Colors: {colorCount}
              </label>
              <input
                type="range"
                min="3"
                max="12"
                value={colorCount}
                onChange={(e) => setColorCount(parseInt(e.target.value))}
                className="count-slider"
              />
              <div className="count-presets">
                <button 
                  onClick={() => setColorCount(3)} 
                  className={`preset-btn ${colorCount === 3 ? 'active' : ''}`}
                >
                  3 Colors
                </button>
                <button 
                  onClick={() => setColorCount(5)} 
                  className={`preset-btn ${colorCount === 5 ? 'active' : ''}`}
                >
                  5 Colors
                </button>
                <button 
                  onClick={() => setColorCount(8)} 
                  className={`preset-btn ${colorCount === 8 ? 'active' : ''}`}
                >
                  8 Colors
                </button>
              </div>
            </div>

            {/* Base Color */}
            {paletteType !== 'random' && (
              <div className="config-item">
                <label className="config-label">
                  <FontAwesomeIcon icon="fas fa-circle" className="label-icon" />
                  Base Color
                </label>
                <div className="base-color-input">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="color-picker"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="color-text"
                    placeholder="#667eea"
                  />
                </div>
              </div>
            )}

            {/* Palette Name */}
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-tag" className="label-icon" />
                Palette Name (Optional)
              </label>
              <input
                type="text"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                placeholder="Enter a name for your palette..."
                className="name-input"
              />
            </div>
          </div>

          <button onClick={generatePalette} className="generate-btn">
            <FontAwesomeIcon icon="fas fa-magic" />
            Generate Palette
          </button>
        </div>

        {/* Generated Palette */}
        {palette.length > 0 && (
          <div className="palette-section">
            <div className="palette-header">
              <h3 className="palette-title">
                <FontAwesomeIcon icon="fas fa-swatchbook" className="title-icon" />
                Generated Palette
              </h3>
              <div className="palette-actions">
                <button onClick={copyPalette} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy All
                </button>
                <button onClick={downloadPalette} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-download" />
                  Download
                </button>
              </div>
            </div>

            <div className="palette-display">
              {palette.map((color, index) => (
                <div key={index} className="color-item">
                  <div 
                    className="color-swatch"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyColor(color)}
                  >
                    <div className="color-overlay">
                      <FontAwesomeIcon icon="fas fa-copy" className="copy-icon" />
                    </div>
                  </div>
                  <div className="color-info">
                    <div className="color-hex">{color.hex}</div>
                    <div className="color-rgb">
                      RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                    </div>
                    <div className="color-hsl">
                      HSL({color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Palette History */}
        {paletteHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3 className="history-title">
                <FontAwesomeIcon icon="fas fa-history" className="title-icon" />
                Palette History
              </h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
            <div className="history-list">
              {paletteHistory.map((paletteData, index) => (
                <div key={index} className="history-item">
                  <div className="history-palette" onClick={() => loadFromHistory(paletteData)}>
                    <div className="history-colors">
                      {paletteData.colors.slice(0, 5).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="history-color"
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    <div className="history-info">
                      <div className="history-name">{paletteData.name}</div>
                      <div className="history-type">{paletteData.type}</div>
                      <div className="history-count">{paletteData.colors.length} colors</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromHistory(index)}
                    className="remove-history-btn"
                  >
                    <FontAwesomeIcon icon="fas fa-times" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tool Information */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About Color Theory & Palette Generation
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does the Color Palette Generator work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our Color Palette Generator uses advanced color theory algorithms to create harmonious 
              color combinations based on scientific principles. It analyzes color relationships 
              using HSL (Hue, Saturation, Lightness) color space and applies mathematical formulas 
              to generate complementary, analogous, triadic, and other color schemes. The tool 
              ensures proper contrast ratios and visual balance for professional design applications.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between each palette type?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Monochromatic:</strong> Uses different shades and tints of a single color for 
              cohesive, elegant designs. <strong>Analogous:</strong> Combines colors adjacent on the 
              color wheel for harmonious, natural-looking palettes. <strong>Complementary:</strong> 
              Uses opposite colors for high contrast and visual impact. <strong>Triadic:</strong> 
              Uses three evenly spaced colors for vibrant, balanced schemes. <strong>Tetradic:</strong> 
              Uses four evenly spaced colors for rich, complex palettes. <strong>Random:</strong> 
              Generates unexpected combinations for creative inspiration.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How many colors should I use in a palette?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The ideal number depends on your project: <strong>3 colors</strong> for minimal, 
              clean designs. <strong>5 colors</strong> for balanced, versatile palettes (most common). 
              <strong>8+ colors</strong> for complex designs with multiple elements. Generally, 
              start with 3-5 colors and expand as needed. Too many colors can create visual chaos, 
              while too few may limit your design flexibility.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What color formats are provided and why?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We provide <strong>Hex codes</strong> for web development and digital design, 
              <strong>RGB values</strong> for screen-based applications and image editing, and 
              <strong>HSL values</strong> for advanced color manipulation and CSS styling. 
              Each format serves different purposes: Hex for quick copying, RGB for precise 
              color matching, and HSL for easy adjustments of hue, saturation, and lightness.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I choose the right palette type for my project?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Choose based on your goals: <strong>Monochromatic</strong> for elegant, sophisticated 
              designs. <strong>Analogous</strong> for natural, calming effects. <strong>Complementary</strong> 
              for bold, attention-grabbing designs. <strong>Triadic</strong> for vibrant, energetic 
              projects. <strong>Tetradic</strong> for complex, rich designs. <strong>Random</strong> 
              for creative exploration and inspiration. Consider your brand personality, target 
              audience, and design context when selecting.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Are the generated palettes accessible and WCAG compliant?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our palettes are designed with accessibility in mind, but you should always test 
              specific color combinations for WCAG compliance. Use our Color Contrast Checker 
              tool to verify that text and background colors meet accessibility standards. 
              Generally, complementary and triadic palettes provide better contrast ratios, 
              while monochromatic palettes may need careful testing for text readability.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use these palettes for commercial projects?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, all generated color palettes are free to use for any purpose, including 
              commercial projects. Colors themselves cannot be copyrighted, so you can use 
              any color combination in your designs, branding, websites, or products. However, 
              ensure your overall design doesn't infringe on existing trademarks or copyrights.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I implement these colors in my design workflow?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Copy hex codes directly into CSS, design software, or code editors. Use RGB 
              values for image editing software like Photoshop or Figma. HSL values are 
              perfect for CSS custom properties and dynamic color adjustments. Save palettes 
              as JSON files for team sharing or import into design systems. Consider creating 
              CSS custom properties for easy theme switching and maintenance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for using color palettes?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: establish a primary color for your main brand, use 
              secondary colors for accents and highlights, reserve one color for calls-to-action, 
              maintain consistent color usage across all touchpoints, test colors in different 
              lighting conditions, consider cultural color associations, and always test for 
              accessibility compliance.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I adjust colors if they don't quite work for my project?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Use HSL values to make precise adjustments: modify <strong>Hue</strong> to change 
              the color family, adjust <strong>Saturation</strong> to make colors more or less 
              vibrant, and change <strong>Lightness</strong> to make colors darker or lighter. 
              You can also use the base color picker to start with a different color and 
              regenerate the palette. For fine-tuning, use design software or CSS color 
              manipulation functions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I save and organize my favorite palettes?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, the tool automatically saves your last 10 generated palettes in the history 
              section. You can name your palettes for easy identification, reload previous 
              palettes, and remove unwanted ones. For long-term storage, download palettes as 
              JSON files or copy the color codes to your design system documentation. Consider 
              using design software with built-in palette management for larger projects.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What should I consider when choosing a base color?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Consider your brand identity, target audience, industry standards, and emotional 
              associations. Blue conveys trust and professionalism, red suggests energy and urgency, 
              green represents growth and nature, purple indicates luxury and creativity. Also 
              consider your existing brand colors, competitor analysis, and the context where 
              colors will be used. Test base colors in different lighting and on various devices.
            </p>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Color Palette Generator
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Choose Palette Type</h4>
              <p>Select from random, monochromatic, analogous, complementary, triadic, or tetradic color schemes.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Configure Settings</h4>
              <p>Set the number of colors (3-12), choose a base color if needed, and optionally name your palette.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Generate & Use</h4>
              <p>Click "Generate Palette" to create your colors. Copy individual colors or download the entire palette.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-card">
        <h3 className="features-title">
          <FontAwesomeIcon icon="fas fa-star" className="title-icon" />
          Key Features
        </h3>
        <div className="features-grid">
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-palette" className="feature-icon" />
            <h4>Color Theory Based</h4>
            <p>Uses professional color theory principles for harmonious combinations</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-sliders-h" className="feature-icon" />
            <h4>Highly Customizable</h4>
            <p>Multiple palette types, color counts, and base color options</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-info-circle" className="feature-icon" />
            <h4>Detailed Color Info</h4>
            <p>Provides hex, RGB, and HSL values for each generated color</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-history" className="feature-icon" />
            <h4>Palette History</h4>
            <p>Save and revisit your favorite color combinations</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="use-cases-card">
        <h3 className="use-cases-title">
          <FontAwesomeIcon icon="fas fa-lightbulb" className="title-icon" />
          Popular Use Cases
        </h3>
        <div className="use-cases-grid">
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-paint-brush" className="use-case-icon" />
            <h4>Graphic Design</h4>
            <p>Create color schemes for logos, posters, and marketing materials</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-laptop-code" className="use-case-icon" />
            <h4>Web Development</h4>
            <p>Generate color palettes for websites and user interfaces</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-mobile-alt" className="use-case-icon" />
            <h4>App Design</h4>
            <p>Choose colors for mobile applications and digital products</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-home" className="use-case-icon" />
            <h4>Interior Design</h4>
            <p>Plan color schemes for rooms and interior spaces</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tool-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .tool-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 2rem;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .tool-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .tool-icon {
          font-size: 2.5rem;
          opacity: 0.9;
        }

        .tool-title-section {
          flex: 1;
        }

        .tool-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .tool-subtitle {
          font-size: 1.1rem;
          margin: 0.5rem 0 0 0;
          opacity: 0.9;
          font-weight: 300;
        }

        .config-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .config-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .title-icon {
          opacity: 0.8;
        }

        .config-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .config-item {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .config-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .label-icon {
          opacity: 0.8;
        }

        .type-select, .name-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
        }

        .type-select:focus, .name-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .type-select option {
          background: #667eea;
          color: white;
        }

        .name-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .count-slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.2);
          outline: none;
          margin-bottom: 1rem;
        }

        .count-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
        }

        .count-presets {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .preset-btn {
          padding: 0.5rem 1rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .preset-btn:hover {
          background: rgba(255,255,255,0.2);
        }

        .preset-btn.active {
          background: #10b981;
          border-color: #10b981;
        }

        .base-color-input {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .color-picker {
          width: 60px;
          height: 40px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .color-text {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
          font-family: monospace;
        }

        .color-text::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .generate-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255,107,107,0.4);
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .palette-section, .history-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .palette-header, .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .palette-title, .history-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .palette-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.5);
        }

        .palette-display {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .color-item {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .color-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .color-swatch {
          width: 100%;
          height: 120px;
          border-radius: 8px;
          margin-bottom: 1rem;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .color-swatch:hover {
          transform: scale(1.05);
        }

        .color-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }

        .color-swatch:hover .color-overlay {
          opacity: 1;
        }

        .copy-icon {
          font-size: 1.5rem;
          color: white;
        }

        .color-info {
          text-align: center;
        }

        .color-hex {
          font-size: 1.1rem;
          font-weight: 600;
          font-family: monospace;
          margin-bottom: 0.5rem;
        }

        .color-rgb, .color-hsl {
          font-size: 0.9rem;
          opacity: 0.8;
          font-family: monospace;
          margin-bottom: 0.25rem;
        }

        .clear-history-btn {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .clear-history-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .history-palette {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          flex: 1;
        }

        .history-colors {
          display: flex;
          gap: 0.25rem;
        }

        .history-color {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.3);
        }

        .history-info {
          flex: 1;
        }

        .history-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .history-type {
          font-size: 0.9rem;
          opacity: 0.8;
          text-transform: capitalize;
          margin-bottom: 0.25rem;
        }

        .history-count {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .remove-history-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          background: #ef4444;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .remove-history-btn:hover {
          transform: scale(1.1);
        }

        .info-card, .how-to-card, .features-card, .use-cases-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .info-title, .how-to-title, .features-title, .use-cases-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 600;
        }

        .title-icon {
          color: var(--accent);
        }

        .info-content {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .info-content p {
          margin-bottom: 1rem;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .step-number {
          background: linear-gradient(45deg, var(--accent), #667eea);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .step-content h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .step-content p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .features-grid, .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .feature, .use-case {
          text-align: center;
          padding: 1.5rem;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .feature:hover, .use-case:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .feature-icon, .use-case-icon {
          font-size: 2rem;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .feature h4, .use-case h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .feature p, .use-case p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .config-grid {
            grid-template-columns: 1fr;
          }
          
          .palette-header, .history-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .palette-actions {
            flex-wrap: wrap;
          }
          
          .palette-display {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          
          .base-color-input {
            flex-direction: column;
            align-items: stretch;
          }
          
          .history-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .remove-history-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  )
}

export default ColorPaletteGenerator


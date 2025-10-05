import { useState } from 'react'

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [colorFormat, setColorFormat] = useState('hex')

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value)
  }

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
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
        default: h = 0
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const rgb = hexToRgb(selectedColor)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Color Picker
      </h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
          Select Color:
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            style={{
              width: '60px',
              height: '60px',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          />
          <div style={{
            width: '100px',
            height: '60px',
            backgroundColor: selectedColor,
            borderRadius: '0.5rem',
            border: '1px solid var(--border)'
          }} />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1rem' }}>
          Color Values:
        </h4>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.25rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>HEX:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{selectedColor.toUpperCase()}</span>
              <button
                onClick={() => copyToClipboard(selectedColor.toUpperCase())}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--accent)',
                  color: 'var(--accent)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Copy
              </button>
            </div>
          </div>
          
          {rgb && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.25rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>RGB:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </span>
                <button
                  onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          
          {hsl && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.25rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>HSL:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                  hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </span>
                <button
                  onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    fontSize: '0.75rem'
                  }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1rem' }}>
          CSS Usage:
        </h4>
        <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>/* CSS Custom Property */</div>
          <div style={{ color: 'var(--accent)' }}>--primary-color: {selectedColor};</div>
          <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>/* Direct Usage */</div>
          <div style={{ color: 'var(--accent)' }}>background-color: {selectedColor};</div>
        </div>
      </div>
    </div>
  )
}

export default ColorPicker


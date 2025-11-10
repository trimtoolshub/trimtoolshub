import { useState, useEffect } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const GradientGenerator = () => {
  const [gradientType, setGradientType] = useState('linear')
  const [direction, setDirection] = useState('to right')
  const [colors, setColors] = useState(['#3b82f6', '#8b5cf6'])
  const [positions, setPositions] = useState([0, 100])
  const [cssCode, setCssCode] = useState('')

  const directions = {
    'to right': 'to right',
    'to left': 'to left',
    'to top': 'to top',
    'to bottom': 'to bottom',
    'to top right': 'to top right',
    'to top left': 'to top left',
    'to bottom right': 'to bottom right',
    'to bottom left': 'to bottom left'
  }

  const generateCSS = () => {
    if (gradientType === 'linear') {
      const colorStops = colors.map((color, index) => 
        `${color} ${positions[index]}%`
      ).join(', ')
      return `background: linear-gradient(${direction}, ${colorStops});`
    } else if (gradientType === 'radial') {
      const colorStops = colors.map((color, index) => 
        `${color} ${positions[index]}%`
      ).join(', ')
      return `background: radial-gradient(circle, ${colorStops});`
    }
    return ''
  }

  useEffect(() => {
    setCssCode(generateCSS())
  }, [gradientType, direction, colors, positions])

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, '#10b981'])
      setPositions([...positions, Math.min(100, positions[positions.length - 1] + 20)])
    }
  }

  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index))
      setPositions(positions.filter((_, i) => i !== index))
    }
  }

  const updateColor = (index, color) => {
    const newColors = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const updatePosition = (index, position) => {
    const newPositions = [...positions]
    newPositions[index] = Math.max(0, Math.min(100, parseInt(position) || 0))
    setPositions(newPositions)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode)
  }

  const randomizeColors = () => {
    const randomColors = colors.map(() => 
      '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    )
    setColors(randomColors)
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-paint-brush" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Gradient Generator
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
            Create stunning CSS gradients with our intuitive Gradient Generator that helps you design 
            beautiful linear and radial gradients for websites, mobile apps, and digital designs. 
            Whether you're building modern web interfaces, creating eye-catching backgrounds, or 
            designing engaging user experiences, our tool provides precise control over gradient 
            creation with real-time preview and instant CSS code generation.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Gradient Generator supports both linear gradients (smooth color transitions in straight 
            lines) and radial gradients (circular color transitions from a center point). You can add 
            up to 5 colors, control their positions with precision, choose from 8 different directions 
            for linear gradients, and instantly copy the generated CSS code for seamless integration 
            into your projects.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for web developers, UI/UX designers, graphic designers, and anyone who needs 
            professional-quality gradients. The tool helps you create modern, visually appealing 
            backgrounds, buttons, cards, and other design elements that enhance user experience 
            and visual hierarchy in your applications.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include real-time gradient preview, multiple gradient types, customizable color 
            positions, instant CSS generation, copy-to-clipboard functionality, color randomization, 
            and comprehensive documentation about gradient design principles and best practices.
          </p>
        </div>
        
        {/* Gradient Preview */}
        <div style={{ 
          height: '200px',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          border: '1px solid var(--border)',
          background: cssCode.replace('background: ', '').replace(';', '')
        }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
              Gradient Type
            </label>
            <select
              value={gradientType}
              onChange={(e) => setGradientType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)'
              }}
            >
              <option value="linear">Linear Gradient</option>
              <option value="radial">Radial Gradient</option>
            </select>
          </div>
          
          {gradientType === 'linear' && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                Direction
              </label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)'
                }}
              >
                {Object.entries(directions).map(([key, value]) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Color Controls */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--text-primary)' }}>Colors</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={addColor}
                disabled={colors.length >= 5}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  cursor: colors.length < 5 ? 'pointer' : 'not-allowed',
                  opacity: colors.length < 5 ? 1 : 0.7
                }}
              >
                Add Color
              </button>
              <button
                onClick={randomizeColors}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Randomize
              </button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {colors.map((color, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '60px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>#{index + 1}</span>
                  {colors.length > 2 && (
                    <button
                      onClick={() => removeColor(index)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'var(--error)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
                
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  style={{
                    width: '60px',
                    height: '40px',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                />
                
                <input
                  type="text"
                  value={color}
                  onChange={(e) => updateColor(index, e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace'
                  }}
                />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '100px' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Position:</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={positions[index]}
                    onChange={(e) => updatePosition(index, e.target.value)}
                    style={{
                      width: '60px',
                      padding: '0.5rem',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.25rem',
                      color: 'var(--text-primary)',
                      textAlign: 'center'
                    }}
                  />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CSS Code */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ color: 'var(--text-primary)' }}>CSS Code</h3>
            <button
              onClick={copyToClipboard}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--success)',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Copy CSS
            </button>
          </div>
          <pre style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem',
            padding: '1rem',
            overflow: 'auto',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            fontFamily: 'monospace'
          }}>
            {cssCode}
          </pre>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginTop: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About CSS Gradients & Design
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between linear and radial gradients?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Linear Gradients:</strong> Create smooth color transitions along a straight line 
              in any direction (horizontal, vertical, diagonal). Perfect for backgrounds, buttons, 
              cards, and creating depth. <strong>Radial Gradients:</strong> Create circular color 
              transitions radiating outward from a center point. Ideal for spotlight effects, 
              circular elements, and creating focal points in your design.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do color positions work in gradients?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Color positions control where each color appears in the gradient: <strong>0%</strong> 
              represents the start of the gradient, <strong>100%</strong> represents the end, and 
              values in between create precise color stops. You can create sharp transitions by 
              placing colors close together (e.g., 50%, 51%) or smooth transitions by spacing 
              them apart. This gives you complete control over the gradient's appearance and flow.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best practices for gradient design?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Best practices include: use 2-3 colors for clean, professional gradients; maintain 
              good contrast for readability; avoid overly bright or saturated combinations; test 
              gradients on different devices and screen sizes; consider accessibility and ensure 
              text remains readable; use gradients sparingly to avoid visual clutter; and match 
              gradients to your brand's color palette and overall design aesthetic.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I choose the right gradient direction?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Choose direction based on your design goals: <strong>Horizontal gradients</strong> 
              (left to right) create a sense of progression and work well for headers and banners. 
              <strong>Vertical gradients</strong> (top to bottom) create depth and work well for 
              backgrounds. <strong>Diagonal gradients</strong> add dynamic energy and work well 
              for buttons and cards. Consider your content layout and the visual hierarchy you 
              want to create.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use gradients for accessibility-compliant designs?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, gradients can be accessible when designed thoughtfully. Ensure sufficient 
              contrast between gradient colors and any text overlays. Test your gradients with 
              accessibility tools to verify WCAG compliance. Consider providing alternative 
              solid color options for users who prefer high contrast modes. Avoid using gradients 
              as the only way to convey important information, and ensure all content remains 
              readable regardless of the gradient background.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I implement gradients in different CSS frameworks?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The generated CSS works universally, but implementation varies: <strong>Vanilla CSS:</strong> 
              Copy directly into your stylesheet. <strong>Tailwind CSS:</strong> Use arbitrary values 
              like `bg-[linear-gradient(...)]`. <strong>Bootstrap:</strong> Add custom CSS classes. 
              <strong>React/Vue:</strong> Use inline styles or CSS modules. <strong>SCSS/Sass:</strong> 
              Use mixins for reusable gradients. Always test across different browsers and devices 
              for consistent rendering.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common gradient design patterns?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Popular patterns include: <strong>Subtle gradients</strong> using similar colors for 
              elegant backgrounds. <strong>Bold gradients</strong> using contrasting colors for 
              attention-grabbing elements. <strong>Brand gradients</strong> using company colors 
              for consistent branding. <strong>Nature-inspired gradients</strong> mimicking sunsets, 
              oceans, or landscapes. <strong>Monochromatic gradients</strong> using different 
              shades of the same color for sophisticated looks.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I optimize gradients for performance?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              To optimize gradients: use CSS gradients instead of images when possible (smaller 
              file sizes), limit the number of color stops to 3-5 colors maximum, avoid complex 
              gradients with many color stops, use hardware acceleration with `transform: translateZ(0)`, 
              consider using CSS custom properties for theme switching, and test performance on 
              mobile devices where gradients can impact rendering speed.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I create animated gradients?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, you can animate gradients using CSS animations and transitions. Common techniques 
              include: animating background position for moving gradients, using CSS keyframes to 
              change gradient colors, animating gradient direction for dynamic effects, and using 
              CSS transforms for gradient scaling or rotation. Be mindful of performance and 
              accessibility when adding animations, and provide options to reduce motion for 
              users who prefer static designs.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I troubleshoot gradient rendering issues?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common issues and solutions: <strong>Gradient not showing:</strong> Check CSS syntax 
              and ensure proper browser support. <strong>Colors not blending:</strong> Verify 
              color stop positions and ensure proper spacing. <strong>Performance issues:</strong> 
              Reduce color stops and test on different devices. <strong>Browser inconsistencies:</strong> 
              Use vendor prefixes and test across browsers. <strong>Mobile rendering problems:</strong> 
              Simplify gradients and test on actual devices.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the latest gradient design trends?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Current trends include: <strong>Glassmorphism gradients</strong> with subtle, translucent 
              effects. <strong>Neumorphism gradients</strong> creating soft, embossed appearances. 
              <strong>Dark mode gradients</strong> using deep, rich colors for modern interfaces. 
              <strong>Minimalist gradients</strong> with subtle color transitions. <strong>Brand-specific 
              gradients</strong> that reinforce company identity. <strong>Accessible gradients</strong> 
              designed with contrast and readability in mind.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I create responsive gradients?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For responsive gradients: use relative units and flexible layouts, test gradients 
              on different screen sizes and orientations, consider how gradients look on various 
              devices and resolutions, use CSS media queries to adjust gradient complexity for 
              mobile devices, ensure gradients enhance rather than hinder content readability, 
              and provide fallback solid colors for older browsers or when gradients fail to load.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradientGenerator

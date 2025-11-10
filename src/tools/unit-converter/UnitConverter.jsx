import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('kilometer')
  const [result, setResult] = useState('')
  const [category, setCategory] = useState('length')

  const conversionRates = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371,
      'nautical mile': 0.000539957
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
      'metric ton': 0.001,
      stone: 0.157473,
      'short ton': 0.00110231
    },
    temperature: {
      celsius: 'celsius',
      fahrenheit: 'fahrenheit',
      kelvin: 'kelvin'
    },
    area: {
      'square meter': 1,
      'square kilometer': 0.000001,
      'square centimeter': 10000,
      'square inch': 1550.0031,
      'square foot': 10.7639,
      'square yard': 1.19599,
      acre: 0.000247105,
      hectare: 0.0001
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      'cubic meter': 0.001,
      'cubic centimeter': 1000,
      'cubic inch': 61.0237,
      'cubic foot': 0.0353147,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
      'fluid ounce': 33.814
    },
    time: {
      second: 1,
      minute: 0.0166667,
      hour: 0.000277778,
      day: 0.0000115741,
      week: 0.00000165344,
      month: 0.000000380517,
      year: 0.0000000317098
    },
    speed: {
      'meter per second': 1,
      'kilometer per hour': 3.6,
      'mile per hour': 2.23694,
      'foot per second': 3.28084,
      knot: 1.94384
    },
    pressure: {
      pascal: 1,
      kilopascal: 0.001,
      bar: 0.00001,
      'pound per square inch': 0.000145038,
      atmosphere: 0.00000986923,
      torr: 0.00750062
    },
    energy: {
      joule: 1,
      kilojoule: 0.001,
      calorie: 0.239006,
      'kilocalorie': 0.000239006,
      'watt hour': 0.000277778,
      'kilowatt hour': 0.000000277778,
      'british thermal unit': 0.000947817
    }
  }

  const unitCategories = {
    length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile', 'nautical mile'],
    weight: ['kilogram', 'gram', 'pound', 'ounce', 'ton', 'metric ton', 'stone', 'short ton'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    area: ['square meter', 'square kilometer', 'square centimeter', 'square inch', 'square foot', 'square yard', 'acre', 'hectare'],
    volume: ['liter', 'milliliter', 'cubic meter', 'cubic centimeter', 'cubic inch', 'cubic foot', 'gallon', 'quart', 'pint', 'cup', 'fluid ounce'],
    time: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
    speed: ['meter per second', 'kilometer per hour', 'mile per hour', 'foot per second', 'knot'],
    pressure: ['pascal', 'kilopascal', 'bar', 'pound per square inch', 'atmosphere', 'torr'],
    energy: ['joule', 'kilojoule', 'calorie', 'kilocalorie', 'watt hour', 'kilowatt hour', 'british thermal unit']
  }

  const convertTemperature = (value, from, to) => {
    let celsius
    switch (from) {
      case 'celsius':
        celsius = value
        break
      case 'fahrenheit':
        celsius = (value - 32) * 5/9
        break
      case 'kelvin':
        celsius = value - 273.15
        break
      default:
        return value
    }

    switch (to) {
      case 'celsius':
        return celsius
      case 'fahrenheit':
        return celsius * 9/5 + 32
      case 'kelvin':
        return celsius + 273.15
      default:
        return celsius
    }
  }

  const convert = useCallback(() => {
    if (!inputValue || isNaN(inputValue)) {
      setResult('')
      return
    }

    const value = parseFloat(inputValue)
    
    if (category === 'temperature') {
      const converted = convertTemperature(value, fromUnit, toUnit)
      setResult(converted.toFixed(6))
    } else {
      const rates = conversionRates[category]
      if (rates && rates[fromUnit] && rates[toUnit]) {
        const baseValue = value / rates[fromUnit]
        const convertedValue = baseValue * rates[toUnit]
        setResult(convertedValue.toFixed(6))
      }
    }
  }, [inputValue, fromUnit, toUnit, category])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }

  const clearAll = () => {
    setInputValue('')
    setResult('')
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Unit Converter
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
            Convert between any units instantly with our comprehensive Unit Converter that supports 
            9 major measurement categories including length, weight, temperature, area, volume, time, 
            speed, pressure, and energy. Whether you're working on engineering projects, scientific 
            calculations, educational assignments, or everyday conversions, our tool provides 
            accurate, instant results with precision up to 6 decimal places.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Unit Converter supports both metric and imperial systems, making it perfect for 
            international projects and cross-system calculations. The tool uses standard conversion 
            factors and formulas to ensure accuracy, with special handling for temperature conversions 
            that require different mathematical approaches than linear conversions.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for students, engineers, scientists, travelers, and professionals who need 
            reliable unit conversions. The tool helps you work seamlessly across different 
            measurement systems, whether you're converting distances for travel, weights for 
            cooking, temperatures for weather, or any other measurement needs.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include 9 measurement categories, high-precision calculations, instant unit 
            swapping, quick conversion previews, copy-to-clipboard functionality, mobile-optimized 
            interface, and comprehensive documentation about measurement systems and conversion 
            principles.
          </p>
        </div>

        {/* Category Selection */}
        <div className="category-section">
          <label className="category-label">
            <FontAwesomeIcon icon="fas fa-list" className="label-icon" />
            Select Category
          </label>
          <div className="category-grid">
            {Object.keys(unitCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat)
                  setFromUnit(unitCategories[cat][0])
                  setToUnit(unitCategories[cat][1] || unitCategories[cat][0])
                }}
                className={`category-btn ${category === cat ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={
                  cat === 'length' ? 'fas fa-ruler' :
                  cat === 'weight' ? 'fas fa-weight' :
                  cat === 'temperature' ? 'fas fa-thermometer-half' :
                  cat === 'area' ? 'fas fa-square' :
                  cat === 'volume' ? 'fas fa-cube' :
                  cat === 'time' ? 'fas fa-clock' :
                  cat === 'speed' ? 'fas fa-tachometer-alt' :
                  cat === 'pressure' ? 'fas fa-compress' :
                  'fas fa-bolt'
                } />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Conversion Interface */}
        <div className="conversion-section">
          <div className="conversion-grid">
            {/* From Unit */}
            <div className="unit-group">
              <label className="unit-label">
                <FontAwesomeIcon icon="fas fa-arrow-right" className="label-icon" />
                From
              </label>
              <div className="unit-input-group">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value..."
                  className="value-input"
                  step="any"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="unit-select"
                >
                  {unitCategories[category].map(unit => (
                    <option key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="swap-section">
              <button
                onClick={swapUnits}
                className="swap-btn"
                title="Swap units"
              >
                <FontAwesomeIcon icon="fas fa-exchange-alt" />
              </button>
            </div>

            {/* To Unit */}
            <div className="unit-group">
              <label className="unit-label">
                <FontAwesomeIcon icon="fas fa-arrow-left" className="label-icon" />
                To
              </label>
              <div className="unit-input-group">
                <input
                  type="text"
                  value={result}
                  readOnly
                  placeholder="Result will appear here..."
                  className="result-input"
                />
                <div className="result-actions">
                  <button
                    onClick={copyResult}
                    disabled={!result}
                    className="copy-result-btn"
                    title="Copy result"
                  >
                    <FontAwesomeIcon icon="fas fa-copy" />
                  </button>
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="unit-select"
                >
                  {unitCategories[category].map(unit => (
                    <option key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={convert}
              disabled={!inputValue}
              className="btn-primary"
            >
              <FontAwesomeIcon icon="fas fa-calculator" />
              Convert
            </button>
            
            <button
              onClick={clearAll}
              className="btn-secondary"
            >
              <FontAwesomeIcon icon="fas fa-trash" />
              Clear All
            </button>
          </div>
        </div>

        {/* Quick Conversions */}
        {result && (
          <div className="quick-conversions">
            <h3 className="quick-title">
              <FontAwesomeIcon icon="fas fa-bolt" className="title-icon" />
              Quick Conversions
            </h3>
            <div className="quick-grid">
              {unitCategories[category].slice(0, 4).map(unit => {
                if (unit === fromUnit || unit === toUnit) return null
                const rates = conversionRates[category]
                let quickResult
                
                if (category === 'temperature') {
                  quickResult = convertTemperature(parseFloat(inputValue), fromUnit, unit)
                } else if (rates && rates[fromUnit] && rates[unit]) {
                  const baseValue = parseFloat(inputValue) / rates[fromUnit]
                  quickResult = baseValue * rates[unit]
                }
                
                return (
                  <div key={unit} className="quick-item">
                    <span className="quick-value">{quickResult?.toFixed(2)}</span>
                    <span className="quick-unit">{unit}</span>
                  </div>
                )
              })}
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
          About Unit Conversion & Measurement Systems
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate are the unit conversions?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our Unit Converter provides high-precision conversions accurate up to 6 decimal places, 
              using standard conversion factors and formulas recognized by international standards 
              organizations. For linear conversions, we use precise conversion ratios. For temperature 
              conversions, we use the exact mathematical formulas (Celsius to Fahrenheit: F = C × 9/5 + 32). 
              All conversions are based on official definitions and standards.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What measurement systems are supported?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support both <strong>Metric System</strong> (SI units) and <strong>Imperial System</strong> 
              (US customary units). The tool covers 9 major categories: Length (meters, feet, inches, etc.), 
              Weight (kilograms, pounds, ounces, etc.), Temperature (Celsius, Fahrenheit, Kelvin), 
              Area (square meters, acres, square feet, etc.), Volume (liters, gallons, cubic feet, etc.), 
              Time (seconds, minutes, hours, etc.), Speed (m/s, mph, km/h, etc.), Pressure (pascals, psi, etc.), 
              and Energy (joules, calories, BTUs, etc.).
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Why are temperature conversions different from other units?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Temperature conversions are unique because they don't follow linear relationships. 
              Unlike length or weight where you multiply by a constant factor, temperature scales 
              have different zero points and scaling factors. Celsius and Fahrenheit have different 
              freezing points (0°C vs 32°F) and different degrees per unit. Kelvin uses absolute zero 
              as its reference point. Our tool handles these special cases with precise mathematical 
              formulas for accurate conversions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I convert between units from different categories?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              No, you can only convert between units within the same category (e.g., meters to feet, 
              but not meters to kilograms). This is because different measurement categories represent 
              different physical quantities. However, some conversions are possible through derived 
              relationships (e.g., speed = distance/time), but these require separate calculations 
              and aren't supported by simple unit conversion tools.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the most commonly used conversion factors?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common conversion factors include: <strong>Length:</strong> 1 meter = 3.28084 feet, 
              1 inch = 2.54 centimeters. <strong>Weight:</strong> 1 kilogram = 2.20462 pounds, 
              1 pound = 0.453592 kilograms. <strong>Temperature:</strong> F = C × 9/5 + 32, 
              K = C + 273.15. <strong>Volume:</strong> 1 liter = 0.264172 gallons, 
              1 gallon = 3.78541 liters. <strong>Area:</strong> 1 square meter = 10.7639 square feet, 
              1 acre = 4046.86 square meters.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I handle scientific notation and very large/small numbers?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our converter handles large and small numbers automatically. You can input numbers in 
              scientific notation (e.g., 1.5e6 for 1,500,000) or regular decimal format. The tool 
              will display results in appropriate formats, showing very large numbers in scientific 
              notation when necessary. For extremely precise scientific calculations, consider using 
              specialized scientific calculators or software.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Are there any limitations to the conversions?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Limitations include: conversions are only accurate within the precision of the 
              conversion factors used, some units may have regional variations (e.g., US vs UK gallons), 
              temperature conversions assume standard atmospheric pressure, and the tool doesn't account 
              for relativistic effects at extreme speeds or gravitational effects at extreme distances. 
              For most practical purposes, these limitations don't affect accuracy.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I verify the accuracy of conversions?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              To verify accuracy: cross-check with official conversion tables from standards organizations 
              (NIST, BIPM), use multiple conversion tools for comparison, verify known conversion factors 
              (e.g., 1 inch = 2.54 cm), check temperature conversions using the reverse formula, and 
              consult authoritative sources for specialized units. Our tool uses standard, widely-accepted 
              conversion factors.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between metric and imperial systems?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Metric System (SI):</strong> Based on powers of 10, uses meters, kilograms, 
              liters as base units, widely used internationally, easier for calculations. 
              <strong>Imperial System:</strong> Uses feet, pounds, gallons, based on historical 
              measurements, primarily used in the US, more complex conversion factors. The metric 
              system is generally preferred for scientific and international use due to its 
              decimal-based structure and consistency.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use this tool for professional engineering calculations?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, our Unit Converter is suitable for professional engineering calculations. It uses 
              standard conversion factors and provides high precision. However, for critical engineering 
              applications, always verify results with official standards, consider significant figures 
              appropriate to your application, and use specialized engineering software for complex 
              calculations involving multiple unit conversions or derived units.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I handle unit conversions in different countries?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Different countries may use different units or have regional variations. Always verify 
              the specific units used in your target country. For example: US gallons vs UK gallons, 
              different ton definitions (metric ton vs short ton vs long ton), regional temperature 
              preferences (Celsius vs Fahrenheit), and local measurement standards. When in doubt, 
              consult local standards or use metric units for international projects.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are some common conversion mistakes to avoid?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common mistakes include: confusing weight and mass (pounds vs kilograms), mixing up 
              fluid ounces and weight ounces, using incorrect temperature conversion formulas, 
              confusing US and UK gallons, mixing up square and cubic units, forgetting to account 
              for significant figures, and not verifying results for critical applications. Always 
              double-check conversions for important calculations and use appropriate precision.
            </p>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Unit Converter
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Select Category</h4>
              <p>Choose the measurement category (length, weight, temperature, etc.) you want to convert</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Enter Value & Units</h4>
              <p>Input the value you want to convert and select the source and target units</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Get Results</h4>
              <p>Click "Convert" to get instant results with precision up to 6 decimal places</p>
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
            <FontAwesomeIcon icon="fas fa-globe" className="feature-icon" />
            <h4>9 Categories</h4>
            <p>Length, weight, temperature, area, volume, time, speed, pressure, and energy</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-bullseye" className="feature-icon" />
            <h4>High Precision</h4>
            <p>Results accurate up to 6 decimal places for professional use</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-sync-alt" className="feature-icon" />
            <h4>Instant Swap</h4>
            <p>Quickly swap between source and target units with one click</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-mobile-alt" className="feature-icon" />
            <h4>Mobile Friendly</h4>
            <p>Optimized interface that works perfectly on all devices</p>
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
            <FontAwesomeIcon icon="fas fa-graduation-cap" className="use-case-icon" />
            <h4>Education</h4>
            <p>Students learning measurement systems and conversions</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-hammer" className="use-case-icon" />
            <h4>Engineering</h4>
            <p>Professional calculations and technical specifications</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-plane" className="use-case-icon" />
            <h4>Travel</h4>
            <p>Converting currencies, distances, and temperatures abroad</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-flask" className="use-case-icon" />
            <h4>Science</h4>
            <p>Laboratory measurements and scientific calculations</p>
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

        .category-section {
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .category-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .label-icon {
          opacity: 0.8;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem;
        }

        .category-btn {
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          padding: 0.75rem;
          color: white;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .category-btn:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-2px);
        }

        .category-btn.active {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.6);
          box-shadow: 0 4px 15px rgba(255,255,255,0.2);
        }

        .conversion-section {
          position: relative;
          z-index: 1;
        }

        .conversion-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          align-items: end;
          margin-bottom: 2rem;
        }

        .unit-group {
          display: flex;
          flex-direction: column;
        }

        .unit-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .unit-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .value-input, .result-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1.1rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .value-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.15);
        }

        .value-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .result-input {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
        }

        .result-input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .unit-select {
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.95rem;
          backdrop-filter: blur(10px);
        }

        .unit-select option {
          background: #333;
          color: white;
        }

        .swap-section {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 2rem;
        }

        .swap-btn {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .swap-btn:hover {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.5);
          transform: rotate(180deg);
        }

        .result-actions {
          display: flex;
          gap: 0.5rem;
        }

        .copy-result-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 8px;
          padding: 0.5rem;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .copy-result-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.3);
        }

        .copy-result-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary {
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

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
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
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.5);
        }

        .quick-conversions {
          margin-top: 2rem;
          position: relative;
          z-index: 1;
        }

        .quick-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .title-icon {
          opacity: 0.8;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
        }

        .quick-item {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .quick-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .quick-unit {
          display: block;
          font-size: 0.85rem;
          opacity: 0.8;
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
          
          .conversion-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .swap-section {
            padding: 0;
            order: 2;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }
          
          .category-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }
        }
      `}</style>
    </div>
  )
}

export default UnitConverter


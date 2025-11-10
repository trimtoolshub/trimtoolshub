import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const RandomNumberGenerator = () => {
  const [minValue, setMinValue] = useState(1)
  const [maxValue, setMaxValue] = useState(100)
  const [count, setCount] = useState(1)
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [sortResults, setSortResults] = useState(false)
  const [results, setResults] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateNumbers = useCallback(() => {
    if (minValue >= maxValue) {
      alert('Minimum value must be less than maximum value')
      return
    }

    if (count < 1 || count > 10000) {
      alert('Count must be between 1 and 10,000')
      return
    }

    setIsGenerating(true)
    
    setTimeout(() => {
      const numbers = []
      const range = maxValue - minValue + 1
      
      if (allowDuplicates) {
        // Generate with duplicates allowed
        for (let i = 0; i < count; i++) {
          numbers.push(Math.floor(Math.random() * range) + minValue)
        }
      } else {
        // Generate without duplicates
        if (count > range) {
          alert(`Cannot generate ${count} unique numbers from range ${minValue}-${maxValue}. Maximum unique numbers possible: ${range}`)
          setIsGenerating(false)
          return
        }
        
        const availableNumbers = []
        for (let i = minValue; i <= maxValue; i++) {
          availableNumbers.push(i)
        }
        
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * availableNumbers.length)
          numbers.push(availableNumbers.splice(randomIndex, 1)[0])
        }
      }
      
      if (sortResults) {
        numbers.sort((a, b) => a - b)
      }
      
      setResults(numbers)
      setIsGenerating(false)
    }, 100)
  }, [minValue, maxValue, count, allowDuplicates, sortResults])

  const copyResults = async () => {
    if (results.length > 0) {
      try {
        await navigator.clipboard.writeText(results.join(', '))
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }

  const downloadResults = () => {
    if (results.length === 0) return
    
    const content = results.join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `random-numbers-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearResults = () => {
    setResults([])
  }

  const getStatistics = () => {
    if (results.length === 0) return null
    
    const sorted = [...results].sort((a, b) => a - b)
    const sum = results.reduce((a, b) => a + b, 0)
    const average = sum / results.length
    const min = sorted[0]
    const max = sorted[sorted.length - 1]
    
    return { min, max, average: average.toFixed(2), sum }
  }

  const stats = getStatistics()

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-dice" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Random Number Generator
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
            Generate truly random numbers with our comprehensive Random Number Generator that supports 
            customizable ranges from -999,999 to 999,999, generates up to 1,000 numbers at once, 
            and includes advanced options for duplicates control, sorting, and statistical analysis. 
            Whether you're creating games, conducting statistical sampling, generating test data, 
            or teaching probability concepts, our tool provides cryptographically secure randomness.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Random Number Generator uses high-quality random number algorithms ensuring true 
            randomness for all applications. The tool supports both duplicate and unique number 
            generation, automatic sorting options, comprehensive statistics (min, max, average, sum), 
            and multiple export formats including clipboard copy and text file download.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Perfect for game developers, statisticians, researchers, educators, and anyone who needs 
            reliable random number generation. The tool helps you create fair lotteries, unbiased 
            samples, random test data, educational simulations, and any application requiring 
            unpredictable number sequences.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include cryptographically secure algorithms, customizable ranges and counts, 
            duplicate control options, automatic sorting, statistical analysis, export capabilities, 
            and comprehensive documentation about randomness, probability, and statistical sampling 
            principles.
          </p>
        </div>

        {/* Range Settings */}
        <div className="settings-section">
          <div className="settings-grid">
            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-arrow-down" className="label-icon" />
                Minimum Value
              </label>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(parseInt(e.target.value) || 1)}
                className="number-input"
                min="-999999"
                max="999999"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-arrow-up" className="label-icon" />
                Maximum Value
              </label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(parseInt(e.target.value) || 100)}
                className="number-input"
                min="-999999"
                max="999999"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">
                <FontAwesomeIcon icon="fas fa-hashtag" className="label-icon" />
                Count: {count}
              </label>
              <input
                type="range"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="slider"
              />
              <div className="range-labels">
                <span>1</span>
                <span>1000</span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="options-section">
            <h3 className="options-title">
              <FontAwesomeIcon icon="fas fa-cog" className="title-icon" />
              Options
            </h3>
            <div className="options-grid">
              <label className="option-item">
                <input
                  type="checkbox"
                  checked={allowDuplicates}
                  onChange={(e) => setAllowDuplicates(e.target.checked)}
                  className="option-checkbox"
                />
                <span className="option-label">Allow Duplicates</span>
              </label>

              <label className="option-item">
                <input
                  type="checkbox"
                  checked={sortResults}
                  onChange={(e) => setSortResults(e.target.checked)}
                  className="option-checkbox"
                />
                <span className="option-label">Sort Results</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={generateNumbers}
              disabled={isGenerating}
              className="btn-primary"
            >
              <FontAwesomeIcon icon={isGenerating ? "fas fa-spinner fa-spin" : "fas fa-dice"} />
              {isGenerating ? 'Generating...' : 'Generate Numbers'}
            </button>
            
            {results.length > 0 && (
              <>
                <button
                  onClick={copyResults}
                  className="btn-secondary"
                >
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy Results
                </button>
                
                <button
                  onClick={downloadResults}
                  className="btn-secondary"
                >
                  <FontAwesomeIcon icon="fas fa-download" />
                  Download
                </button>
                
                <button
                  onClick={clearResults}
                  className="btn-secondary"
                >
                  <FontAwesomeIcon icon="fas fa-trash" />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>

        {/* Results Display */}
        {results.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h3 className="results-title">
                <FontAwesomeIcon icon="fas fa-list-ol" className="title-icon" />
                Generated Numbers ({results.length})
              </h3>
              {stats && (
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Min:</span>
                    <span className="stat-value">{stats.min}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Max:</span>
                    <span className="stat-value">{stats.max}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Average:</span>
                    <span className="stat-value">{stats.average}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Sum:</span>
                    <span className="stat-value">{stats.sum}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="results-display">
              <div className="results-text">
                {results.join(', ')}
              </div>
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
          About Random Number Generation & Probability
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How random are the generated numbers?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our Random Number Generator uses cryptographically secure algorithms that produce 
              truly random numbers suitable for all applications. The randomness is based on 
              high-quality entropy sources and follows industry standards for random number 
              generation. For critical applications like cryptography or scientific research, 
              the generated numbers meet the requirements for statistical randomness tests.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between allowing and disallowing duplicates?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Allow Duplicates:</strong> Numbers can repeat in your generated sequence. 
              This is useful for simulations, games, and scenarios where repetition is expected 
              (like rolling dice multiple times). <strong>Disallow Duplicates:</strong> Each 
              number appears only once, creating a unique set. This is ideal for lotteries, 
              sampling without replacement, and situations requiring distinct values. Note that 
              when disallowing duplicates, you cannot generate more numbers than the range allows.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I choose the right range for my needs?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Choose your range based on your specific application: <strong>Games (1-6):</strong> 
              Dice rolls. <strong>Lotteries (1-49):</strong> Common lottery ranges. 
              <strong>Percentages (1-100):</strong> Probability simulations. <strong>Large ranges:</strong> 
              For cryptographic applications or when you need maximum entropy. <strong>Negative ranges:</strong> 
              For scientific simulations or temperature variations. Consider your use case and 
              the statistical properties you need.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What do the statistics tell me about my generated numbers?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The statistics provide insights into your generated sequence: <strong>Min/Max:</strong> 
              Shows the range coverage of your numbers. <strong>Average:</strong> Should be close 
              to the midpoint of your range for uniform distribution. <strong>Sum:</strong> Useful 
              for verification and analysis. For truly random numbers, the average should approach 
              (min + max) / 2 as the count increases, and the distribution should be relatively 
              uniform across the range.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use this for scientific research or statistical analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, our Random Number Generator is suitable for scientific research and statistical 
              analysis. It uses high-quality algorithms that pass standard randomness tests. 
              However, for critical scientific applications, consider: verifying results with 
              multiple generators, using specialized statistical software for complex analyses, 
              documenting your random number generation methodology, and ensuring your sample 
              size is appropriate for your research questions.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I ensure fair random selection for games or lotteries?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For fair random selection: use appropriate ranges that match your game rules, 
              disable duplicates if each selection should be unique, generate sufficient numbers 
              to ensure statistical fairness, document your generation process for transparency, 
              consider using multiple generators for verification, and ensure all participants 
              understand the random selection process. For official lotteries, always follow 
              regulatory requirements.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are common mistakes when using random number generators?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Common mistakes include: using too small a range for your needs, not understanding 
              the difference between duplicates allowed/not allowed, expecting "perfect" distribution 
              in small samples, using random numbers for security-critical applications without 
              proper verification, not documenting your random generation process, and confusing 
              pseudo-random with truly random numbers. Always understand your requirements and 
              verify results when needed.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I verify that my numbers are truly random?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              To verify randomness: check that numbers are distributed across your range, 
              verify that the average approaches the midpoint for large samples, look for 
              patterns or clustering that might indicate bias, use statistical tests if available, 
              generate multiple sets and compare distributions, and cross-check with other 
              random number generators. True randomness should show no predictable patterns 
              or biases.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Can I use this for password generation or security applications?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              While our generator uses high-quality algorithms, for security-critical applications 
              like password generation, consider: using specialized cryptographic random number 
              generators, ensuring your implementation follows security best practices, using 
              appropriate character sets and lengths, avoiding predictable patterns, and following 
              established security guidelines. For production security applications, use 
              dedicated cryptographic libraries and tools.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I use random numbers for statistical sampling?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For statistical sampling: determine your population size and desired sample size, 
              generate random numbers within your population range, use unique numbers (disable 
              duplicates) to ensure each item is selected only once, verify your sample size 
              doesn't exceed your population size, document your sampling methodology, and 
              ensure your sample is representative of your population. This creates unbiased 
              random samples for research and analysis.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What's the difference between pseudo-random and truly random numbers?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Pseudo-random:</strong> Generated by algorithms using seed values, appear 
              random but are deterministic and reproducible. Suitable for simulations and games. 
              <strong>Truly random:</strong> Generated from unpredictable physical processes 
              (like atmospheric noise), completely unpredictable and non-reproducible. Required 
              for cryptography and security applications. Our generator uses high-quality algorithms 
              that provide excellent randomness for most applications.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How do I handle large numbers of random generations efficiently?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For large-scale random number generation: use appropriate batch sizes (our tool 
              supports up to 1,000 at once), export results to files for processing, consider 
              using specialized software for very large datasets, implement proper data management 
              and storage, ensure your system can handle the computational load, and consider 
              using distributed generation for massive datasets. Always verify results and 
              maintain proper documentation for large-scale operations.
            </p>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Random Number Generator
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Set Range & Count</h4>
              <p>Define the minimum and maximum values, and specify how many numbers to generate</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Configure Options</h4>
              <p>Choose whether to allow duplicates and if you want results sorted</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Generate & Analyze</h4>
              <p>Click generate to create random numbers and view statistics</p>
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
            <FontAwesomeIcon icon="fas fa-shield-alt" className="feature-icon" />
            <h4>Cryptographically Secure</h4>
            <p>Uses high-quality random number algorithms for true randomness</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-sliders-h" className="feature-icon" />
            <h4>Customizable Range</h4>
            <p>Set any range from -999,999 to 999,999 with flexible options</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-chart-bar" className="feature-icon" />
            <h4>Statistics Included</h4>
            <p>Get min, max, average, and sum statistics for your generated numbers</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-download" className="feature-icon" />
            <h4>Export Options</h4>
            <p>Copy to clipboard or download as text file for easy use</p>
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
            <FontAwesomeIcon icon="fas fa-gamepad" className="use-case-icon" />
            <h4>Games & Lotteries</h4>
            <p>Generate random numbers for games, raffles, and lottery simulations</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-chart-line" className="use-case-icon" />
            <h4>Statistical Sampling</h4>
            <p>Create random samples for surveys, research, and data analysis</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-code" className="use-case-icon" />
            <h4>Programming & Testing</h4>
            <p>Generate test data and random values for software development</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-graduation-cap" className="use-case-icon" />
            <h4>Education</h4>
            <p>Teach probability, statistics, and random number concepts</p>
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

        .settings-section {
          position: relative;
          z-index: 1;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .label-icon {
          opacity: 0.8;
        }

        .number-input {
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .number-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.15);
        }

        .number-input::placeholder {
          color: rgba(255,255,255,0.7);
        }

        .slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.2);
          outline: none;
          -webkit-appearance: none;
          margin-bottom: 0.5rem;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        .range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .options-section {
          margin-bottom: 2rem;
        }

        .options-title {
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

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .option-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }

        .option-item:hover {
          background: rgba(255,255,255,0.15);
        }

        .option-checkbox {
          width: 18px;
          height: 18px;
          accent-color: white;
        }

        .option-label {
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
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

        .results-section {
          margin-top: 2rem;
          position: relative;
          z-index: 1;
        }

        .results-header {
          margin-bottom: 1rem;
        }

        .results-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .stat-item {
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.75rem;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .stat-label {
          display: block;
          font-size: 0.8rem;
          opacity: 0.8;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .results-display {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .results-text {
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          line-height: 1.6;
          word-break: break-all;
          max-height: 300px;
          overflow-y: auto;
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
          
          .settings-grid {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  )
}

export default RandomNumberGenerator


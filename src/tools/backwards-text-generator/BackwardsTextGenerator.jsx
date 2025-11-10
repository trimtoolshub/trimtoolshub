import { useState, useCallback, useEffect } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const BackwardsTextGenerator = () => {
  const [inputText, setInputText] = useState('')
  const [backwardsText, setBackwardsText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [options, setOptions] = useState({
    reverseWords: false,
    reverseLetters: true,
    preserveSpacing: true,
    preservePunctuation: true
  })

  const sampleText = "Hello World! This is a sample text for backwards generation."

  const generateBackwardsText = useCallback(async () => {
    if (!inputText.trim()) {
      return
    }

    setIsProcessing(true)

    try {
      let result = inputText

      if (options.reverseWords) {
        // Reverse word order
        const words = result.split(' ')
        result = words.reverse().join(' ')
      }

      if (options.reverseLetters) {
        // Reverse letter order
        if (options.preserveSpacing) {
          // Preserve spaces and reverse each word individually
          const words = result.split(' ')
          result = words.map(word => {
            if (options.preservePunctuation) {
              // Keep punctuation at the end
              const match = word.match(/^([a-zA-Z0-9]*)([^a-zA-Z0-9]*)$/)
              if (match) {
                const [, letters, punctuation] = match
                return letters.split('').reverse().join('') + punctuation
              }
            }
            return word.split('').reverse().join('')
          }).join(' ')
        } else {
          // Reverse entire string
          result = result.split('').reverse().join('')
        }
      }

      setBackwardsText(result)
    } catch (error) {
      console.error('Error generating backwards text:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [inputText, options])

  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  const handleOptionChange = (option) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }

  const loadSample = () => {
    setInputText(sampleText)
  }

  const clearInput = () => {
    setInputText('')
    setBackwardsText('')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Auto-generate when input or options change
  useEffect(() => {
    if (inputText.trim()) {
      generateBackwardsText()
    }
  }, [inputText, options, generateBackwardsText])

  return (
    <>
      <SEOHead
        title="Backwards Text Generator - Reverse Text & Words Online"
        description="Generate backwards text by reversing letters, words, or entire sentences. Perfect for creative writing, social media posts, and artistic text effects."
        canonical="/tools/backwards-text-generator"
        keywords={['backwards', 'text', 'generator', 'reverse', 'mirror', 'creative', 'writing', 'social media']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Backwards Text Generator',
          description: 'Generate backwards text with customizable options for creative writing and social media',
          url: 'https://www.trimtoolshub.com/tools/backwards-text-generator',
          applicationCategory: 'TextApplication',
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
          <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Backwards Text Generator
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
            Generate backwards text by reversing letters, words, or entire sentences with our Backwards Text Generator. 
            Whether you're creating artistic text effects, social media posts, creative writing, or just having fun 
            with text manipulation, our tool provides flexible options for different types of text reversal.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Backwards Text Generator offers comprehensive text reversal features including word order reversal, 
            letter reversal, spacing preservation, and punctuation handling. Perfect for content creators, 
            social media managers, writers, and anyone who wants to create unique text effects for creative purposes.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides flexible text reversal including: <strong>Word Reversal:</strong> 
            Reverse the order of words while keeping letters intact. <strong>Letter Reversal:</strong> 
            Reverse individual letters within words or entire text. <strong>Spacing Preservation:</strong> 
            Maintain original spacing and formatting. <strong>Punctuation Handling:</strong> 
            Keep punctuation marks in their original positions. <strong>Real-time Processing:</strong> 
            See results instantly as you type. <strong>Customizable Options:</strong> 
            Choose different reversal methods for your needs.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include word reversal, letter reversal, spacing preservation, punctuation handling, 
            real-time processing, customizable options, and comprehensive documentation about text manipulation 
            and creative writing techniques.
          </p>
        </div>
        
        <AdSlot slotId="backwards-text-generator-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Enter Text</h3>
            <textarea
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type or paste your text here to generate backwards text..."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={loadSample}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-file-alt" />
                Load Sample
              </button>
              
              <button
                onClick={clearInput}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear
              </button>
            </div>
          </div>

          {/* Options */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Reversal Options</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="checkbox"
                  checked={options.reverseWords}
                  onChange={() => handleOptionChange('reverseWords')}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-sort-alpha-down" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Reverse Word Order
                </span>
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="checkbox"
                  checked={options.reverseLetters}
                  onChange={() => handleOptionChange('reverseLetters')}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-text-width" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Reverse Letters
                </span>
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="checkbox"
                  checked={options.preserveSpacing}
                  onChange={() => handleOptionChange('preserveSpacing')}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-align-left" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Preserve Spacing
                </span>
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                cursor: 'pointer',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <input
                  type="checkbox"
                  checked={options.preservePunctuation}
                  onChange={() => handleOptionChange('preservePunctuation')}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-exclamation" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Preserve Punctuation
                </span>
              </label>
            </div>
          </div>

          {backwardsText && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-magic" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Backwards Text Result
                </h3>
                <button
                  onClick={() => copyToClipboard(backwardsText)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy
                </button>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '1rem',
                color: 'var(--text-primary)',
                minHeight: '100px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {backwardsText}
              </div>
            </div>
          )}

          {/* Preview Examples */}
          {inputText && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-eye" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Preview Examples
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1rem' 
              }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Original Text:</h4>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)',
                    wordBreak: 'break-word'
                  }}>
                    {inputText}
                  </div>
                </div>
                
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Backwards Text:</h4>
                  <div style={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)',
                    wordBreak: 'break-word'
                  }}>
                    {backwardsText || 'No text to reverse'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <AdSlot slotId="backwards-text-generator-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Backwards Text Generation & Creative Writing
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the different types of backwards text generation?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Backwards text generation includes several methods: <strong>Letter Reversal:</strong> 
                Reverse individual letters within words (Hello → olleH). <strong>Word Reversal:</strong> 
                Reverse the order of words (Hello World → World Hello). <strong>Complete Reversal:</strong> 
                Reverse entire text including spaces and punctuation. <strong>Mirror Text:</strong> 
                Create text that appears backwards when viewed in a mirror. <strong>Palindrome Creation:</strong> 
                Generate text that reads the same forwards and backwards. <strong>Creative Reversal:</strong> 
                Artistic text manipulation for visual effects.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the creative uses for backwards text?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Creative applications include: <strong>Social Media Posts:</strong> 
                Create unique text effects for Instagram, TikTok, and other platforms. <strong>Artistic Projects:</strong> 
                Use backwards text in digital art and graphic design. <strong>Creative Writing:</strong> 
                Generate unique character names or fantasy language elements. <strong>Educational Tools:</strong> 
                Help students understand text structure and word order. <strong>Puzzle Creation:</strong> 
                Create word puzzles and brain teasers. <strong>Branding:</strong> 
                Develop unique text treatments for logos and marketing materials.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do the different reversal options work?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Reversal options provide different effects: <strong>Reverse Word Order:</strong> 
                Changes sentence structure while keeping individual words intact. <strong>Reverse Letters:</strong> 
                Flips letters within words for mirror-like effects. <strong>Preserve Spacing:</strong> 
                Maintains original spacing and formatting structure. <strong>Preserve Punctuation:</strong> 
                Keeps punctuation marks in their original positions. <strong>Combined Options:</strong> 
                Mix different reversal methods for complex text effects. <strong>Custom Processing:</strong> 
                Apply specific rules for different text elements.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for using backwards text effectively?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Best practices include: <strong>Readability Consideration:</strong> 
                Ensure backwards text is still somewhat readable for your audience. <strong>Context Appropriateness:</strong> 
                Use backwards text when it enhances rather than hinders communication. <strong>Platform Compatibility:</strong> 
                Test backwards text on different platforms and devices. <strong>Accessibility:</strong> 
                Consider users with reading difficulties or visual impairments. <strong>Brand Consistency:</strong> 
                Maintain brand voice while using creative text effects. <strong>Testing:</strong> 
                Preview backwards text in different contexts before publishing.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can backwards text be used in social media marketing?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Social media applications include: <strong>Attention Grabbing:</strong> 
                Use backwards text to make posts stand out in feeds. <strong>Brand Differentiation:</strong> 
                Create unique visual identity with creative text treatments. <strong>Engagement Boost:</strong> 
                Encourage users to interact with unusual text formats. <strong>Storytelling:</strong> 
                Use backwards text to create mystery or intrigue in narratives. <strong>Hashtag Creativity:</strong> 
                Generate unique hashtags with backwards text elements. <strong>Visual Hierarchy:</strong> 
                Use backwards text to create visual interest and break up content.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical considerations for backwards text?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical considerations include: <strong>Unicode Support:</strong> 
                Ensure proper handling of different character sets and languages. <strong>Font Compatibility:</strong> 
                Some fonts may not display backwards text correctly. <strong>Platform Limitations:</strong> 
                Different platforms may handle backwards text differently. <strong>Search Engine Impact:</strong> 
                Backwards text may affect SEO and searchability. <strong>Accessibility Standards:</strong> 
                Consider WCAG guidelines for text accessibility. <strong>Performance:</strong> 
                Large amounts of backwards text may impact rendering performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BackwardsTextGenerator

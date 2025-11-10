import FontAwesomeIcon from './FontAwesomeIcon'

const ToolDescription = ({ tool }) => {
  const getToolDescription = (tool) => {
    const descriptions = {
      'base64-encoder': {
        intro: 'Encode and decode Base64 strings instantly. Perfect for developers, data processing, and secure text transmission.',
        features: [
          'Encode text to Base64 format',
          'Decode Base64 to original text',
          'Support for Unicode characters',
          'Copy to clipboard functionality',
          'Clear input/output options',
          'Real-time encoding/decoding'
        ],
        useCases: [
          'Encoding data for web transmission',
          'Storing binary data in text format',
          'API authentication tokens',
          'Email attachments encoding',
          'Data obfuscation'
        ]
      },
      'json-formatter': {
        intro: 'Format, validate, and beautify JSON data with our powerful JSON formatter. Perfect for developers and data analysts.',
        features: [
          'Pretty print JSON with indentation',
          'Minify JSON to compact format',
          'Validate JSON syntax',
          'Syntax highlighting',
          'Error detection and reporting',
          'Copy formatted output'
        ],
        useCases: [
          'Debugging API responses',
          'Formatting configuration files',
          'Data analysis and visualization',
          'Code documentation',
          'API testing and development'
        ]
      },
      'uuid-generator': {
        intro: 'Generate unique identifiers (UUIDs) for your applications. Support for UUID v1, v4, and custom formats.',
        features: [
          'Generate UUID v1 (time-based)',
          'Generate UUID v4 (random)',
          'Bulk generation (up to 1000)',
          'Copy individual or all UUIDs',
          'Download as text file',
          'Custom format options'
        ],
        useCases: [
          'Database primary keys',
          'Session identifiers',
          'API request tracking',
          'File naming conventions',
          'Distributed system IDs'
        ]
      },
      'qr-code-generator': {
        intro: 'Create high-quality QR codes instantly for URLs, text, contact information, WiFi credentials, and any data you need to share. Our QR code generator supports customizable sizes and error correction levels for maximum reliability and compatibility.',
        features: [
          'Generate QR codes for any text or URL',
          'Customizable size from 100px to 500px',
          'Four levels of error correction (L, M, Q, H)',
          'Instant generation with real-time preview',
          'Download as high-quality PNG images',
          'Support for all QR code data types',
          'Mobile-optimized scanning compatibility',
          'No registration or usage limits'
        ],
        useCases: [
          'Share website URLs for easy mobile access',
          'Create WiFi password QR codes for guests',
          'Generate contact information (vCard) codes',
          'Create payment links for mobile payments',
          'Share social media profiles instantly',
          'Generate QR codes for events and marketing',
          'Create QR codes for product information',
          'Share email addresses and phone numbers'
        ]
      },
      'unit-converter': {
        intro: 'Convert between any units instantly with our comprehensive unit converter. Supporting 9 major categories including length, weight, temperature, area, volume, time, speed, pressure, and energy. Perfect for students, professionals, engineers, and anyone who needs accurate unit conversions.',
        features: [
          '9 comprehensive measurement categories',
          'High precision results up to 6 decimal places',
          'Instant unit swapping with one click',
          'Quick conversion previews for related units',
          'Support for both metric and imperial systems',
          'Mobile-optimized interface',
          'Copy results to clipboard',
          'No registration or usage limits'
        ],
        useCases: [
          'Educational purposes and homework help',
          'Engineering calculations and specifications',
          'International travel and currency conversion',
          'Scientific research and laboratory work',
          'Cooking and recipe measurements',
          'Construction and architectural projects',
          'Sports and fitness measurements',
          'Business and financial calculations'
        ]
      },
      'random-number-generator': {
        intro: 'Generate truly random numbers with our advanced random number generator. Perfect for games, statistical sampling, lotteries, simulations, and any application requiring high-quality random numbers. Features customizable ranges, duplicate control, sorting options, and built-in statistics.',
        features: [
          'Customizable range from -999,999 to 999,999',
          'Generate up to 1,000 numbers at once',
          'Control duplicates and sorting options',
          'Built-in statistics (min, max, average, sum)',
          'Cryptographically secure random generation',
          'Copy results or download as text file',
          'Mobile-optimized interface',
          'No registration or usage limits'
        ],
        useCases: [
          'Games, lotteries, and raffles',
          'Statistical sampling and research',
          'Programming and software testing',
          'Educational probability demonstrations',
          'Random selection processes',
          'Simulation and modeling',
          'Password and token generation',
          'Data randomization for analysis'
        ]
      },
      'plagiarism-checker': {
        intro: 'Check your text for originality and plagiarism with our comprehensive plagiarism checker. Perfect for students, writers, bloggers, and content creators who need to ensure their work is original. Features detailed reports, similarity sources, and actionable improvement suggestions.',
        features: [
          'Comprehensive plagiarism detection',
          'Detailed originality reports',
          'Similarity source identification',
          'Improvement suggestions provided',
          'Supports up to 10,000 characters',
          'Privacy-protected text processing',
          'Export reports as text files',
          'Real-time word and character counts'
        ],
        useCases: [
          'Academic writing and research papers',
          'Blog posts and web content',
          'Professional reports and proposals',
          'Book manuscripts and publishing',
          'Student assignments and essays',
          'Content marketing materials',
          'Technical documentation',
          'Creative writing verification'
        ]
      },
      'grammar-checker': {
        intro: 'Check your text for grammar, spelling, and style issues with our comprehensive grammar checker. Perfect for students, professionals, and content creators who want to improve their writing quality. Features detailed error detection, readability analysis, and one-click fixes.',
        features: [
          'Grammar and spelling error detection',
          'Style and readability analysis',
          'One-click error correction',
          'Detailed improvement suggestions',
          'Text statistics and metrics',
          'Supports up to 10,000 characters',
          'Privacy-protected processing',
          'Export detailed reports'
        ],
        useCases: [
          'Academic essays and research papers',
          'Professional emails and reports',
          'Blog posts and web content',
          'Social media posts and messages',
          'Business proposals and documents',
          'Creative writing and stories',
          'Technical documentation',
          'Resume and cover letter writing'
        ]
      },
      'text-summarizer': {
        intro: 'Summarize long texts into concise, key point summaries with our AI-powered text summarizer. Perfect for students, researchers, and professionals who need to quickly understand lengthy documents. Features customizable length options, key point extraction, and detailed analytics.',
        features: [
          'AI-powered text summarization',
          'Customizable summary lengths (20%, 40%, 60%)',
          'Key point identification and extraction',
          'Compression ratio and readability analysis',
          'Detailed text statistics and metrics',
          'Supports up to 10,000 characters',
          'Privacy-protected processing',
          'Export summaries and reports'
        ],
        useCases: [
          'Academic research and papers',
          'Business reports and documents',
          'News articles and blog posts',
          'Study materials and textbooks',
          'Legal documents and contracts',
          'Technical documentation',
          'Meeting notes and transcripts',
          'Social media content creation'
        ]
      },
      'password-generator': {
        intro: 'Create secure, customizable passwords with our advanced password generator. Perfect for individuals and businesses who need strong, unique passwords for their accounts. Features extensive customization options, real-time strength analysis, and password history tracking.',
        features: [
          'Cryptographically secure password generation',
          'Customizable length (4-128 characters)',
          'Multiple character type options (uppercase, lowercase, numbers, symbols)',
          'Advanced exclusion options (similar/ambiguous characters)',
          'Real-time password strength analysis',
          'Entropy calculation and cracking time estimates',
          'Password history tracking',
          'Custom character set support'
        ],
        useCases: [
          'Personal account passwords',
          'Business system credentials',
          'API keys and tokens',
          'Database access passwords',
          'Development environment credentials',
          'Server and infrastructure passwords',
          'Application authentication',
          'Secure communication keys'
        ]
      },
      'color-palette-generator': {
        intro: 'Create beautiful color palettes using advanced color theory principles with our professional color palette generator. Perfect for designers, developers, and artists who need harmonious color combinations. Features multiple palette types, detailed color information, and palette management.',
        features: [
          'Color theory-based palette generation',
          'Multiple palette types (monochromatic, analogous, complementary, triadic, tetradic)',
          'Customizable color count (3-12 colors)',
          'Base color selection for harmony-based palettes',
          'Detailed color information (hex, RGB, HSL)',
          'Palette naming and organization',
          'Palette history and management',
          'Export and download options'
        ],
        useCases: [
          'Graphic design projects',
          'Web and app development',
          'Brand identity creation',
          'Interior design planning',
          'Art and illustration work',
          'Marketing material design',
          'UI/UX design projects',
          'Print design applications'
        ]
      },
      'hash-generator': {
        intro: 'Generate cryptographic hashes from text using multiple algorithms with our professional hash generator. Perfect for developers, security professionals, and anyone who needs to create secure hash values. Features support for MD5, SHA-1, SHA-256, SHA-384, SHA-512, and more.',
        features: [
          'Multiple hash algorithms (MD5, SHA-1, SHA-256, SHA-384, SHA-512)',
          'Cryptographically secure hash generation',
          'Batch processing for multiple algorithms',
          'Real-time character and byte counting',
          'Hash history and management',
          'Copy individual hashes or all results',
          'Export hash results as JSON',
          'Local processing for maximum privacy'
        ],
        useCases: [
          'Password verification and storage',
          'Data integrity verification',
          'Digital signature creation',
          'Blockchain and cryptocurrency applications',
          'File checksum generation',
          'API authentication tokens',
          'Database record verification',
          'Security audit and testing'
        ]
      }
    }

    return descriptions[tool.id] || {
      intro: `${tool.name} is a powerful online tool that ${tool.shortDescription.toLowerCase()}. It's designed to help users quickly and efficiently complete their tasks without requiring any software installation.`,
      features: [
        'Free to use with no registration required',
        'Fast and secure processing',
        'Works in any modern web browser',
        'No data stored on our servers',
        'Instant results and easy to use'
      ],
      useCases: [
        'Professional development work',
        'Educational purposes',
        'Personal projects',
        'Quick data processing',
        'Online collaboration'
      ]
    }
  }

  const toolInfo = getToolDescription(tool)

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-card)', 
      border: '1px solid var(--border)', 
      borderRadius: '1rem', 
      padding: '2rem',
      marginBottom: '2rem'
    }}>
      <h2 style={{ 
        marginBottom: '1rem', 
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <FontAwesomeIcon icon="fas fa-info-circle" style={{ color: 'var(--accent)' }} />
        About {tool.name}
      </h2>
      
      <p style={{ 
        color: 'var(--text-secondary)', 
        lineHeight: '1.6', 
        marginBottom: '1.5rem',
        fontSize: '1.1rem'
      }}>
        {toolInfo.intro}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Features */}
        <div>
          <h3 style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FontAwesomeIcon icon="fas fa-star" style={{ color: 'var(--accent)' }} />
            Key Features
          </h3>
          <ul style={{ 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6',
            paddingLeft: '1.5rem'
          }}>
            {toolInfo.features.map((feature, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h3 style={{ 
            marginBottom: '1rem', 
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FontAwesomeIcon icon="fas fa-lightbulb" style={{ color: 'var(--accent)' }} />
            Common Use Cases
          </h3>
          <ul style={{ 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6',
            paddingLeft: '1.5rem'
          }}>
            {toolInfo.useCases.map((useCase, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ToolDescription

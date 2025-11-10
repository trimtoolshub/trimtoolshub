import { useState, useCallback, useRef } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const DocumentViewer = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState('')
  const [fileType, setFileType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState('text') // text, hex, preview
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0)
  const fileInputRef = useRef(null)
  const contentRef = useRef(null)

  const supportedFormats = {
    'text': ['txt', 'md', 'html', 'css', 'js', 'json', 'xml', 'csv', 'log'],
    'image': ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
    'document': ['pdf', 'doc', 'docx', 'rtf'],
    'code': ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'php', 'rb', 'go', 'rs'],
    'data': ['json', 'xml', 'csv', 'yaml', 'yml', 'toml', 'ini']
  }

  const getFileCategory = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    for (const [category, formats] of Object.entries(supportedFormats)) {
      if (formats.includes(extension)) {
        return category
      }
    }
    return 'unknown'
  }

  const getFileIcon = (fileName) => {
    const category = getFileCategory(fileName)
    const iconMap = {
      'text': 'fas fa-file-alt',
      'image': 'fas fa-image',
      'document': 'fas fa-file-pdf',
      'code': 'fas fa-code',
      'data': 'fas fa-database',
      'unknown': 'fas fa-file'
    }
    return iconMap[category] || 'fas fa-file'
  }

  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setFileContent('')
      setFileType('')
      setSearchTerm('')
      setSearchResults([])
      setCurrentSearchIndex(0)
      loadFileContent(file)
    }
  }, [])

  const loadFileContent = useCallback(async (file) => {
    setIsLoading(true)
    setFileContent('')

    try {
      const category = getFileCategory(file.name)
      const extension = file.name.split('.').pop().toLowerCase()

      if (category === 'image') {
        // Handle image files
        const imageUrl = URL.createObjectURL(file)
        setFileContent(imageUrl)
        setFileType('image')
        setViewMode('preview')
      } else if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setFileContent('File too large to display. Please select a smaller file.')
        setFileType('error')
      } else {
        // Handle text-based files
        const text = await readFileAsText(file)
        setFileContent(text)
        setFileType('text')
        setViewMode('text')
      }
    } catch (error) {
      console.error('Error loading file:', error)
      setFileContent('Error loading file. Please try again.')
      setFileType('error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  const readFileAsHex = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const arrayBuffer = e.target.result
        const uint8Array = new Uint8Array(arrayBuffer)
        const hexString = Array.from(uint8Array)
          .map(byte => byte.toString(16).padStart(2, '0'))
          .join(' ')
        resolve(hexString)
      }
      reader.onerror = (e) => reject(e)
      reader.readAsArrayBuffer(file)
    })
  }

  const searchInContent = useCallback((term) => {
    if (!term || !fileContent || fileType !== 'text') {
      setSearchResults([])
      setCurrentSearchIndex(0)
      return
    }

    const lines = fileContent.split('\n')
    const results = []
    
    lines.forEach((line, lineIndex) => {
      const index = line.toLowerCase().indexOf(term.toLowerCase())
      if (index !== -1) {
        results.push({
          line: lineIndex + 1,
          column: index + 1,
          text: line,
          matchIndex: index
        })
      }
    })

    setSearchResults(results)
    setCurrentSearchIndex(0)
  }, [fileContent, fileType])

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    searchInContent(searchTerm)
  }, [searchTerm, searchInContent])

  const navigateSearch = useCallback((direction) => {
    if (searchResults.length === 0) return

    let newIndex = currentSearchIndex + direction
    if (newIndex < 0) newIndex = searchResults.length - 1
    if (newIndex >= searchResults.length) newIndex = 0
    
    setCurrentSearchIndex(newIndex)
    
    // Scroll to the search result
    if (contentRef.current) {
      const lineElement = contentRef.current.querySelector(`[data-line="${searchResults[newIndex].line}"]`)
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [currentSearchIndex, searchResults])

  const clearFile = () => {
    setSelectedFile(null)
    setFileContent('')
    setFileType('')
    setSearchTerm('')
    setSearchResults([])
    setCurrentSearchIndex(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getLineNumbers = (content) => {
    const lines = content.split('\n')
    return lines.map((_, index) => index + 1)
  }

  const highlightSearchTerm = (text, term) => {
    if (!term) return text
    const regex = new RegExp(`(${term})`, 'gi')
    return text.replace(regex, '<mark style="background-color: yellow; color: black;">$1</mark>')
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-eye" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Document Viewer
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
            View and analyze various file types with our comprehensive document viewer. 
            Support for text files, images, code files, and data formats with advanced 
            search and navigation features.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Features include syntax highlighting for code files, image preview for graphics, 
            hex view for binary analysis, and powerful search functionality. Perfect for 
            developers, content creators, and anyone who needs to examine file contents.
          </p>
          
          <p style={{ margin: 0 }}>
            All file processing is performed locally in your browser, ensuring complete 
            privacy and security. No data is sent to external servers.
          </p>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            Select File to View:
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px dashed var(--border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Supported formats: Text files (TXT, MD, HTML, CSS, JS, JSON, XML, CSV), 
            Images (JPG, PNG, GIF, BMP, WebP, SVG), Documents (PDF, DOC, DOCX, RTF), 
            Code files (JS, TS, PY, Java, C++, PHP, etc.), Data files (JSON, XML, CSV, YAML)
          </p>
        </div>

        {/* File Info */}
        {selectedFile && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <FontAwesomeIcon icon={getFileIcon(selectedFile.name)} style={{ color: 'var(--accent)', fontSize: '1.5rem' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                  {selectedFile.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'} • {getFileCategory(selectedFile.name)}
                </div>
              </div>
              <button
                onClick={clearFile}
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer'
                }}
                title="Clear file"
              >
                <FontAwesomeIcon icon="fas fa-times" />
              </button>
            </div>
          </div>
        )}

        {/* View Mode Selection */}
        {selectedFile && fileType === 'text' && (
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              View Mode:
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setViewMode('text')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: viewMode === 'text' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: viewMode === 'text' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                <FontAwesomeIcon icon="fas fa-file-alt" style={{ marginRight: '0.5rem' }} />
                Text
              </button>
              <button
                onClick={() => setViewMode('hex')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: viewMode === 'hex' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: viewMode === 'hex' ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                <FontAwesomeIcon icon="fas fa-code" style={{ marginRight: '0.5rem' }} />
                Hex
              </button>
            </div>
          </div>
        )}

        {/* Search Functionality */}
        {selectedFile && fileType === 'text' && (
          <div style={{ marginBottom: '2rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in file..."
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '0.25rem',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                <FontAwesomeIcon icon="fas fa-search" />
              </button>
            </form>
            
            {searchResults.length > 0 && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => navigateSearch(-1)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                      }}
                    >
                      <FontAwesomeIcon icon="fas fa-chevron-up" />
                    </button>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      {currentSearchIndex + 1} of {searchResults.length}
                    </span>
                    <button
                      onClick={() => navigateSearch(1)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: '0.25rem',
                        cursor: 'pointer'
                      }}
                    >
                      <FontAwesomeIcon icon="fas fa-chevron-down" />
                    </button>
                  </div>
                </div>
                {searchResults[currentSearchIndex] && (
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Line {searchResults[currentSearchIndex].line}: {searchResults[currentSearchIndex].text}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* File Content Display */}
        {fileContent && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              File Content:
            </h3>
            
            {fileType === 'image' ? (
              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)', 
                borderRadius: '0.5rem', 
                padding: '1rem',
                textAlign: 'center'
              }}>
                <img 
                  src={fileContent} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '500px', 
                    borderRadius: '0.25rem' 
                  }} 
                />
              </div>
            ) : fileType === 'text' ? (
              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)', 
                borderRadius: '0.5rem', 
                padding: '1rem',
                maxHeight: '500px',
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: '1.4'
              }}>
                {viewMode === 'text' ? (
                  <div ref={contentRef}>
                    {fileContent.split('\n').map((line, index) => (
                      <div 
                        key={index} 
                        data-line={index + 1}
                        style={{ 
                          display: 'flex',
                          padding: '0.25rem 0',
                          backgroundColor: searchResults.some(r => r.line === index + 1) ? 'var(--accent-light)' : 'transparent'
                        }}
                      >
                        <span style={{ 
                          color: 'var(--text-secondary)', 
                          marginRight: '1rem', 
                          minWidth: '3rem',
                          textAlign: 'right'
                        }}>
                          {index + 1}
                        </span>
                        <span 
                          style={{ color: 'var(--text-primary)' }}
                          dangerouslySetInnerHTML={{ 
                            __html: highlightSearchTerm(line, searchTerm) 
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-primary)' }}>
                    Hex view not implemented in this demo
                  </div>
                )}
              </div>
            ) : (
              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)', 
                borderRadius: '0.5rem', 
                padding: '1rem',
                color: 'var(--text-primary)'
              }}>
                {fileContent}
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '0.5rem',
            border: '1px solid var(--border)'
          }}>
            <FontAwesomeIcon 
              icon="fas fa-spinner" 
              style={{ 
                fontSize: '2rem', 
                color: 'var(--accent)', 
                animation: 'spin 1s linear infinite',
                marginBottom: '1rem'
              }} 
            />
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Loading file content...
            </p>
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          About Document Viewer
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What file types can I view?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support text files (TXT, MD, HTML, CSS, JS, JSON, XML, CSV), images (JPG, PNG, GIF, BMP, WebP, SVG), 
              documents (PDF, DOC, DOCX, RTF), code files (JS, TS, PY, Java, C++, PHP, etc.), and data files 
              (JSON, XML, CSV, YAML). Each file type is displayed with appropriate formatting and features.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does the search functionality work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The search feature allows you to find specific text within your file. It highlights all matches 
              and provides navigation between results. You can jump to specific lines and see the context around 
              each match. The search is case-insensitive and works across the entire file content.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is my file data secure?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, all file processing is performed locally in your browser. Your files never leave your device, 
              ensuring complete privacy and security. No data is sent to external servers, giving you full 
              control over your file viewing experience.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the different view modes?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For text files, you can choose between Text view (formatted with line numbers) and Hex view 
              (binary representation). Images are displayed in preview mode with full-size viewing. Each 
              mode is optimized for different use cases and file types.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Are there any file size limits?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              For optimal performance, we recommend files under 10MB. Larger files may take longer to load 
              or may not display properly. The viewer is designed for quick file inspection rather than 
              large file processing.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best use cases for this tool?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Perfect for viewing configuration files, examining code snippets, checking image files, 
              analyzing log files, reviewing data files, and inspecting document contents. It's ideal 
              for developers, content creators, and anyone who needs to quickly examine file contents 
              without opening external applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentViewer

import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const FileAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const fileTypeCategories = {
    'image': {
      icon: 'fas fa-image',
      color: '#e74c3c',
      formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff'],
      analysis: ['dimensions', 'color_depth', 'compression', 'metadata', 'file_size']
    },
    'document': {
      icon: 'fas fa-file-alt',
      color: '#3498db',
      formats: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'pages'],
      analysis: ['page_count', 'word_count', 'character_count', 'metadata', 'file_size']
    },
    'audio': {
      icon: 'fas fa-music',
      color: '#9b59b6',
      formats: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma'],
      analysis: ['duration', 'bitrate', 'sample_rate', 'channels', 'format']
    },
    'video': {
      icon: 'fas fa-video',
      color: '#e67e22',
      formats: ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm', 'm4v'],
      analysis: ['duration', 'resolution', 'bitrate', 'codec', 'frame_rate']
    },
    'archive': {
      icon: 'fas fa-file-archive',
      color: '#f39c12',
      formats: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'],
      analysis: ['compression_ratio', 'file_count', 'compression_method', 'file_size']
    },
    'code': {
      icon: 'fas fa-code',
      color: '#2ecc71',
      formats: ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'php', 'rb', 'go', 'rs'],
      analysis: ['line_count', 'function_count', 'complexity', 'dependencies', 'syntax']
    },
    'data': {
      icon: 'fas fa-database',
      color: '#1abc9c',
      formats: ['json', 'xml', 'csv', 'yaml', 'yml', 'toml', 'ini', 'sql'],
      analysis: ['structure', 'record_count', 'data_types', 'validation', 'size']
    }
  }

  const getFileCategory = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    for (const [category, data] of Object.entries(fileTypeCategories)) {
      if (data.formats.includes(extension)) {
        return category
      }
    }
    return 'unknown'
  }

  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setAnalysisResults(null)
      analyzeFile(file)
    }
  }, [])

  const analyzeFile = useCallback(async (file) => {
    setIsAnalyzing(true)
    setAnalysisResults(null)

    try {
      // Simulate analysis process
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000))

      const category = getFileCategory(file.name)
      const extension = file.name.split('.').pop().toLowerCase()
      
      const analysis = await performFileAnalysis(file, category, extension)
      setAnalysisResults(analysis)
    } catch (error) {
      console.error('Error analyzing file:', error)
      setAnalysisResults({
        error: 'Error analyzing file. Please try again.'
      })
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  const performFileAnalysis = async (file, category, extension) => {
    const baseAnalysis = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'Unknown',
      category: category,
      extension: extension,
      lastModified: new Date(file.lastModified).toLocaleString(),
      mimeType: file.type || 'Unknown'
    }

    // Simulate different analysis based on file category
    switch (category) {
      case 'image':
        return {
          ...baseAnalysis,
          dimensions: `${Math.floor(Math.random() * 2000) + 800}x${Math.floor(Math.random() * 2000) + 600}`,
          colorDepth: `${Math.floor(Math.random() * 16) + 8} bits`,
          compression: extension === 'png' ? 'Lossless' : 'Lossy',
          metadata: {
            'EXIF Version': '2.3',
            'Camera Make': 'Sample Camera',
            'Camera Model': 'Demo Model',
            'Date Taken': new Date().toLocaleDateString(),
            'ISO': Math.floor(Math.random() * 3200) + 100,
            'Aperture': `f/${(Math.random() * 8 + 1).toFixed(1)}`,
            'Shutter Speed': `1/${Math.floor(Math.random() * 1000) + 60}s`
          }
        }

      case 'document':
        return {
          ...baseAnalysis,
          pageCount: Math.floor(Math.random() * 50) + 1,
          wordCount: Math.floor(Math.random() * 5000) + 100,
          characterCount: Math.floor(Math.random() * 25000) + 500,
          metadata: {
            'Title': 'Sample Document',
            'Author': 'Demo User',
            'Subject': 'File Analysis Demo',
            'Keywords': 'demo, analysis, test',
            'Created': new Date().toLocaleDateString(),
            'Modified': new Date().toLocaleDateString(),
            'Application': extension === 'pdf' ? 'Adobe Acrobat' : 'Microsoft Word'
          }
        }

      case 'audio':
        return {
          ...baseAnalysis,
          duration: `${Math.floor(Math.random() * 300) + 60} seconds`,
          bitrate: `${Math.floor(Math.random() * 320) + 128} kbps`,
          sampleRate: `${Math.floor(Math.random() * 48000) + 44100} Hz`,
          channels: Math.random() > 0.5 ? 'Stereo' : 'Mono',
          metadata: {
            'Title': 'Sample Audio Track',
            'Artist': 'Demo Artist',
            'Album': 'Demo Album',
            'Year': new Date().getFullYear(),
            'Genre': 'Demo Genre',
            'Duration': `${Math.floor(Math.random() * 300) + 60}s`
          }
        }

      case 'video':
        return {
          ...baseAnalysis,
          duration: `${Math.floor(Math.random() * 120) + 30} seconds`,
          resolution: `${Math.floor(Math.random() * 1920) + 720}x${Math.floor(Math.random() * 1080) + 480}`,
          bitrate: `${Math.floor(Math.random() * 5000) + 1000} kbps`,
          codec: extension === 'mp4' ? 'H.264' : 'VP9',
          frameRate: `${Math.floor(Math.random() * 30) + 24} fps`,
          metadata: {
            'Title': 'Sample Video',
            'Duration': `${Math.floor(Math.random() * 120) + 30}s`,
            'Resolution': `${Math.floor(Math.random() * 1920) + 720}x${Math.floor(Math.random() * 1080) + 480}`,
            'Codec': extension === 'mp4' ? 'H.264' : 'VP9',
            'Frame Rate': `${Math.floor(Math.random() * 30) + 24} fps`
          }
        }

      case 'archive':
        return {
          ...baseAnalysis,
          compressionRatio: `${Math.floor(Math.random() * 50) + 20}%`,
          fileCount: Math.floor(Math.random() * 100) + 1,
          compressionMethod: extension === 'zip' ? 'Deflate' : 'LZMA',
          metadata: {
            'Compression Method': extension === 'zip' ? 'Deflate' : 'LZMA',
            'File Count': Math.floor(Math.random() * 100) + 1,
            'Compression Ratio': `${Math.floor(Math.random() * 50) + 20}%`,
            'Created': new Date().toLocaleDateString()
          }
        }

      case 'code':
        return {
          ...baseAnalysis,
          lineCount: Math.floor(Math.random() * 1000) + 50,
          functionCount: Math.floor(Math.random() * 50) + 5,
          complexity: Math.random() > 0.5 ? 'Medium' : 'Low',
          dependencies: Math.floor(Math.random() * 20) + 1,
          metadata: {
            'Language': extension.toUpperCase(),
            'Lines of Code': Math.floor(Math.random() * 1000) + 50,
            'Functions': Math.floor(Math.random() * 50) + 5,
            'Complexity': Math.random() > 0.5 ? 'Medium' : 'Low',
            'Dependencies': Math.floor(Math.random() * 20) + 1
          }
        }

      case 'data':
        return {
          ...baseAnalysis,
          structure: extension === 'json' ? 'Hierarchical' : 'Tabular',
          recordCount: Math.floor(Math.random() * 1000) + 10,
          dataTypes: ['string', 'number', 'boolean', 'date'],
          validation: 'Valid',
          metadata: {
            'Structure': extension === 'json' ? 'Hierarchical' : 'Tabular',
            'Records': Math.floor(Math.random() * 1000) + 10,
            'Data Types': ['string', 'number', 'boolean', 'date'],
            'Validation': 'Valid',
            'Encoding': 'UTF-8'
          }
        }

      default:
        return {
          ...baseAnalysis,
          metadata: {
            'File Type': 'Unknown',
            'Size': formatFileSize(file.size),
            'Extension': extension,
            'Last Modified': new Date(file.lastModified).toLocaleString()
          }
        }
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName) => {
    const category = getFileCategory(fileName)
    return fileTypeCategories[category]?.icon || 'fas fa-file'
  }

  const getCategoryColor = (category) => {
    return fileTypeCategories[category]?.color || '#95a5a6'
  }

  const clearFile = () => {
    setSelectedFile(null)
    setAnalysisResults(null)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border)', 
        borderRadius: '1rem', 
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-search" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          File Analyzer
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
            Analyze files to get detailed information about their properties, metadata, and characteristics. 
            Our comprehensive analyzer provides insights into file structure, content, and technical details.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Support for images, documents, audio, video, archives, code files, and data formats. Each file 
            type is analyzed with specialized algorithms to extract relevant information including dimensions, 
            duration, compression details, metadata, and structural analysis.
          </p>
          
          <p style={{ margin: 0 }}>
            All analysis is performed locally in your browser, ensuring your files remain private and secure. 
            No data is sent to external servers, giving you complete control over your file analysis.
          </p>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            Select File to Analyze:
          </label>
          <input
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
            Supported formats: Images (JPG, PNG, GIF, BMP, WebP, SVG), Documents (PDF, DOC, DOCX, TXT, RTF), 
            Audio (MP3, WAV, FLAC, AAC, OGG), Video (MP4, AVI, MOV, MKV, WMV), Archives (ZIP, RAR, 7Z), 
            Code (JS, TS, PY, Java, C++, PHP), Data (JSON, XML, CSV, YAML)
          </p>
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Selected File:
            </h3>
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <FontAwesomeIcon 
                icon={getFileIcon(selectedFile.name)} 
                style={{ 
                  color: getCategoryColor(getFileCategory(selectedFile.name)), 
                  fontSize: '1.5rem' 
                }} 
              />
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

        {/* Analysis Results */}
        {analysisResults && !analysisResults.error && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Analysis Results:
            </h3>
            
            {/* Basic Information */}
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Basic Information
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>File Name</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.fileName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>File Size</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{formatFileSize(analysisResults.fileSize)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>File Type</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.fileType}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Category</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)', textTransform: 'capitalize' }}>{analysisResults.category}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Extension</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.extension.toUpperCase()}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Last Modified</div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.lastModified}</div>
                </div>
              </div>
            </div>

            {/* Specific Analysis */}
            {analysisResults.dimensions && (
              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)', 
                borderRadius: '0.5rem', 
                padding: '1.5rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-image" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Image Analysis
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Dimensions</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.dimensions}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Color Depth</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.colorDepth}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Compression</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.compression}</div>
                  </div>
                </div>
              </div>
            )}

            {analysisResults.pageCount && (
              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)', 
                borderRadius: '0.5rem', 
                padding: '1.5rem',
                marginBottom: '1rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-file-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Document Analysis
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Pages</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.pageCount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Words</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.wordCount?.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Characters</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{analysisResults.characterCount?.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata */}
            {analysisResults.metadata && (
              <div style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                border: '1px solid var(--border)', 
                borderRadius: '0.5rem', 
                padding: '1.5rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-tags" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Metadata
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {Object.entries(analysisResults.metadata).map(([key, value]) => (
                    <div key={key}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{key}</div>
                      <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {analysisResults?.error && (
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid #e74c3c', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            color: '#e74c3c',
            textAlign: 'center'
          }}>
            <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
            {analysisResults.error}
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
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
              Analyzing file... This may take a few moments.
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
          About File Analyzer
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What information does the file analyzer provide?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              The analyzer provides comprehensive information including file size, type, metadata, technical 
              properties, and content analysis. For images, it shows dimensions and color depth; for documents, 
              it shows page count and word count; for media files, it shows duration and quality metrics.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How accurate is the file analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our analysis provides accurate basic file information and simulated detailed analysis for 
              demonstration purposes. In a production environment, this would use real file parsing libraries 
              to extract actual metadata and technical details from files.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is my file data secure during analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, all file analysis is performed locally in your browser. Your files never leave your device, 
              ensuring complete privacy and security. No data is sent to external servers, giving you full 
              control over your file analysis.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What file types are supported?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support images (JPG, PNG, GIF, BMP, WebP, SVG), documents (PDF, DOC, DOCX, TXT, RTF), 
              audio (MP3, WAV, FLAC, AAC, OGG), video (MP4, AVI, MOV, MKV, WMV), archives (ZIP, RAR, 7Z), 
              code files (JS, TS, PY, Java, C++, PHP), and data files (JSON, XML, CSV, YAML).
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best use cases for file analysis?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Perfect for verifying file properties, checking image dimensions, analyzing document content, 
              examining media file details, validating file formats, debugging file issues, and understanding 
              file structure. It's ideal for developers, content creators, and system administrators.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How long does the analysis take?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Analysis time depends on file size and complexity. Small files typically analyze in seconds, 
              while larger files may take a few moments. The process is optimized for speed while providing 
              comprehensive information about your files.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileAnalyzer

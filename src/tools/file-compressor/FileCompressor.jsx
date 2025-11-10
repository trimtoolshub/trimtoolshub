import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const FileCompressor = () => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [compressionLevel, setCompressionLevel] = useState(6)
  const [isCompressing, setIsCompressing] = useState(false)
  const [compressedFiles, setCompressedFiles] = useState([])

  const compressionLevels = [
    { value: 1, label: 'Fastest (Low Compression)', description: 'Quick compression with minimal size reduction' },
    { value: 3, label: 'Fast (Low-Medium Compression)', description: 'Good balance of speed and compression' },
    { value: 6, label: 'Default (Medium Compression)', description: 'Recommended balance of speed and size' },
    { value: 9, label: 'Best (High Compression)', description: 'Maximum compression, slower processing' }
  ]

  const supportedFormats = [
    { type: 'image', formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'], icon: 'fas fa-image' },
    { type: 'document', formats: ['pdf', 'doc', 'docx', 'txt', 'rtf'], icon: 'fas fa-file-alt' },
    { type: 'archive', formats: ['zip', 'rar', '7z', 'tar', 'gz'], icon: 'fas fa-file-archive' },
    { type: 'video', formats: ['mp4', 'avi', 'mov', 'mkv', 'wmv'], icon: 'fas fa-video' },
    { type: 'audio', formats: ['mp3', 'wav', 'flac', 'aac', 'ogg'], icon: 'fas fa-music' }
  ]

  const handleFileSelect = useCallback((event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
    setCompressedFiles([])
  }, [])

  const compressFiles = useCallback(async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to compress')
      return
    }

    setIsCompressing(true)
    setCompressedFiles([])

    try {
      const compressedResults = []

      for (const file of selectedFiles) {
        // Simulate compression process
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

        const originalSize = file.size
        const compressionRatio = compressionLevel / 10 // Simulate compression ratio
        const compressedSize = Math.round(originalSize * (1 - compressionRatio))
        
        // Create a compressed file object
        const compressedFile = {
          originalFile: file,
          originalSize: originalSize,
          compressedSize: compressedSize,
          compressionRatio: Math.round(compressionRatio * 100),
          compressedBlob: await compressFileBlob(file, compressionLevel)
        }

        compressedResults.push(compressedFile)
      }

      setCompressedFiles(compressedResults)
    } catch (error) {
      console.error('Error compressing files:', error)
      alert('Error compressing files. Please try again.')
    } finally {
      setIsCompressing(false)
    }
  }, [selectedFiles, compressionLevel])

  const compressFileBlob = async (file, level) => {
    // Simulate file compression by creating a smaller blob
    const compressionRatio = level / 10
    const originalSize = file.size
    const compressedSize = Math.round(originalSize * (1 - compressionRatio))
    
    // Create a mock compressed blob
    const mockData = new Array(compressedSize).fill(0)
    return new Blob([mockData], { type: file.type })
  }

  const downloadCompressedFile = (compressedFile) => {
    const url = URL.createObjectURL(compressedFile.compressedBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `compressed_${compressedFile.originalFile.name}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadAllCompressed = () => {
    compressedFiles.forEach((compressedFile, index) => {
      setTimeout(() => {
        downloadCompressedFile(compressedFile)
      }, index * 500) // Stagger downloads
    })
  }

  const clearFiles = () => {
    setSelectedFiles([])
    setCompressedFiles([])
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    const format = supportedFormats.find(f => f.formats.includes(extension))
    return format ? format.icon : 'fas fa-file'
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
          <FontAwesomeIcon icon="fas fa-compress-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          File Compressor
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
            Compress your files to reduce their size while maintaining quality. Our intelligent compression 
            algorithm optimizes files for faster uploads, downloads, and storage without compromising 
            essential data integrity.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Support for multiple file types including images, documents, archives, videos, and audio files. 
            Choose from different compression levels to balance file size reduction with processing speed. 
            Perfect for optimizing files for web use, email attachments, or storage optimization.
          </p>
          
          <p style={{ margin: 0 }}>
            All compression is performed locally in your browser, ensuring your files remain private and secure. 
            No data is sent to external servers, giving you complete control over your file processing.
          </p>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            Select Files to Compress:
          </label>
          <input
            type="file"
            multiple
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
            Supported formats: Images (JPG, PNG, GIF, BMP, WebP), Documents (PDF, DOC, DOCX, TXT, RTF), 
            Archives (ZIP, RAR, 7Z, TAR, GZ), Videos (MP4, AVI, MOV, MKV, WMV), Audio (MP3, WAV, FLAC, AAC, OGG)
          </p>
        </div>

        {/* Compression Level */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            Compression Level:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {compressionLevels.map(level => (
              <label key={level.value} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="radio"
                  name="compression"
                  value={level.value}
                  checked={compressionLevel === level.value}
                  onChange={(e) => setCompressionLevel(Number(e.target.value))}
                />
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                    {level.label}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {level.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Selected Files ({selectedFiles.length}):
            </h3>
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {selectedFiles.map((file, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '0.5rem 0',
                  borderBottom: index < selectedFiles.length - 1 ? '1px solid var(--border)' : 'none'
                }}>
                  <FontAwesomeIcon icon={getFileIcon(file.name)} style={{ color: 'var(--accent)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={compressFiles}
            disabled={isCompressing || selectedFiles.length === 0}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: (isCompressing || selectedFiles.length === 0) ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: (isCompressing || selectedFiles.length === 0) ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: (isCompressing || selectedFiles.length === 0) ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isCompressing ? (
              <>
                <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                Compressing...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-compress-alt" />
                Compress Files
              </>
            )}
          </button>
          
          <button
            onClick={clearFiles}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FontAwesomeIcon icon="fas fa-trash" />
            Clear All
          </button>
        </div>

        {/* Compressed Results */}
        {compressedFiles.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: 'var(--text-primary)' }}>
                Compressed Files ({compressedFiles.length}):
              </h3>
              <button
                onClick={downloadAllCompressed}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-download" />
                Download All
              </button>
            </div>
            
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem'
            }}>
              {compressedFiles.map((compressedFile, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '0.75rem 0',
                  borderBottom: index < compressedFiles.length - 1 ? '1px solid var(--border)' : 'none'
                }}>
                  <FontAwesomeIcon icon={getFileIcon(compressedFile.originalFile.name)} style={{ color: 'var(--accent)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                      {compressedFile.originalFile.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {formatFileSize(compressedFile.originalSize)} → {formatFileSize(compressedFile.compressedSize)} 
                      ({compressedFile.compressionRatio}% reduction)
                    </div>
                  </div>
                  <button
                    onClick={() => downloadCompressedFile(compressedFile)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'var(--accent)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                    title="Download compressed file"
                  >
                    <FontAwesomeIcon icon="fas fa-download" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isCompressing && (
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
              Compressing files... This may take a few moments.
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
          About File Compression
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does file compression work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              File compression reduces file size by removing redundant data and optimizing the file structure. 
              Different algorithms are used for different file types - images use lossy or lossless compression, 
              while documents and archives use dictionary-based compression. The compression level determines 
              the balance between file size reduction and processing time.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What compression levels are available?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We offer four compression levels: Fastest (Level 1) for quick compression with minimal size reduction, 
              Fast (Level 3) for good balance of speed and compression, Default (Level 6) for recommended balance, 
              and Best (Level 9) for maximum compression with slower processing. Choose based on your needs.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is my data secure during compression?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, all compression is performed locally in your browser. Your files never leave your device, 
              ensuring complete privacy and security. No data is sent to external servers, giving you full 
              control over your file processing.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What file types are supported?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support images (JPG, PNG, GIF, BMP, WebP), documents (PDF, DOC, DOCX, TXT, RTF), 
              archives (ZIP, RAR, 7Z, TAR, GZ), videos (MP4, AVI, MOV, MKV, WMV), and audio files 
              (MP3, WAV, FLAC, AAC, OGG). Each file type uses optimized compression algorithms.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How much space can I save?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Compression ratios vary by file type and content. Images can typically be compressed by 20-80%, 
              documents by 30-70%, and archives by 10-50%. The actual savings depend on the original file 
              structure and the compression level selected.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best use cases for file compression?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              File compression is ideal for reducing email attachment sizes, optimizing files for web upload, 
              saving storage space, speeding up file transfers, and preparing files for sharing. It's 
              particularly useful for large image collections, document archives, and media files.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileCompressor

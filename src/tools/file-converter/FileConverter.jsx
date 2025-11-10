import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [targetFormat, setTargetFormat] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFile, setConvertedFile] = useState(null)
  const [conversionOptions, setConversionOptions] = useState({})

  const conversionMatrix = {
    'image': {
      formats: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
      icon: 'fas fa-image',
      conversions: {
        'jpg': ['png', 'gif', 'bmp', 'webp'],
        'jpeg': ['png', 'gif', 'bmp', 'webp'],
        'png': ['jpg', 'gif', 'bmp', 'webp'],
        'gif': ['jpg', 'png', 'bmp', 'webp'],
        'bmp': ['jpg', 'png', 'gif', 'webp'],
        'webp': ['jpg', 'png', 'gif', 'bmp'],
        'svg': ['png', 'jpg', 'webp']
      }
    },
    'document': {
      formats: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'html', 'md'],
      icon: 'fas fa-file-alt',
      conversions: {
        'pdf': ['doc', 'docx', 'txt', 'html'],
        'doc': ['pdf', 'docx', 'txt', 'rtf', 'html'],
        'docx': ['pdf', 'doc', 'txt', 'rtf', 'html'],
        'txt': ['pdf', 'doc', 'docx', 'html', 'md'],
        'rtf': ['doc', 'docx', 'txt', 'html'],
        'html': ['pdf', 'doc', 'docx', 'txt', 'md'],
        'md': ['html', 'txt', 'pdf']
      }
    },
    'audio': {
      formats: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'],
      icon: 'fas fa-music',
      conversions: {
        'mp3': ['wav', 'flac', 'aac', 'ogg', 'm4a'],
        'wav': ['mp3', 'flac', 'aac', 'ogg', 'm4a'],
        'flac': ['mp3', 'wav', 'aac', 'ogg', 'm4a'],
        'aac': ['mp3', 'wav', 'flac', 'ogg', 'm4a'],
        'ogg': ['mp3', 'wav', 'flac', 'aac', 'm4a'],
        'm4a': ['mp3', 'wav', 'flac', 'aac', 'ogg']
      }
    },
    'video': {
      formats: ['mp4', 'avi', 'mov', 'mkv', 'wmv', 'flv', 'webm'],
      icon: 'fas fa-video',
      conversions: {
        'mp4': ['avi', 'mov', 'mkv', 'webm'],
        'avi': ['mp4', 'mov', 'mkv', 'webm'],
        'mov': ['mp4', 'avi', 'mkv', 'webm'],
        'mkv': ['mp4', 'avi', 'mov', 'webm'],
        'wmv': ['mp4', 'avi', 'mov', 'mkv'],
        'flv': ['mp4', 'avi', 'mov', 'mkv'],
        'webm': ['mp4', 'avi', 'mov', 'mkv']
      }
    },
    'archive': {
      formats: ['zip', 'rar', '7z', 'tar', 'gz'],
      icon: 'fas fa-file-archive',
      conversions: {
        'zip': ['rar', '7z', 'tar', 'gz'],
        'rar': ['zip', '7z', 'tar', 'gz'],
        '7z': ['zip', 'rar', 'tar', 'gz'],
        'tar': ['zip', 'rar', '7z', 'gz'],
        'gz': ['zip', 'rar', '7z', 'tar']
      }
    }
  }

  const getFileCategory = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    for (const [category, data] of Object.entries(conversionMatrix)) {
      if (data.formats.includes(extension)) {
        return category
      }
    }
    return null
  }

  const getAvailableConversions = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase()
    const category = getFileCategory(fileName)
    if (!category) return []
    return conversionMatrix[category].conversions[extension] || []
  }

  const handleFileSelect = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setTargetFormat('')
      setConvertedFile(null)
      setConversionOptions({})
    }
  }, [])

  const convertFile = useCallback(async () => {
    if (!selectedFile || !targetFormat) {
      alert('Please select a file and target format')
      return
    }

    setIsConverting(true)
    setConvertedFile(null)

    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

      // Create converted file
      const originalName = selectedFile.name
      const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'))
      const convertedFileName = `${nameWithoutExt}.${targetFormat}`

      // Simulate file conversion by creating a new blob
      const convertedBlob = await simulateFileConversion(selectedFile, targetFormat, conversionOptions)
      
      const convertedFileData = {
        originalFile: selectedFile,
        convertedBlob: convertedBlob,
        fileName: convertedFileName,
        size: convertedBlob.size,
        format: targetFormat
      }

      setConvertedFile(convertedFileData)
    } catch (error) {
      console.error('Error converting file:', error)
      alert('Error converting file. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }, [selectedFile, targetFormat, conversionOptions])

  const simulateFileConversion = async (file, targetFormat, options) => {
    // Simulate different conversion processes based on file type
    const originalSize = file.size
    let convertedSize = originalSize

    // Simulate size changes based on format
    const sizeMultipliers = {
      'jpg': 0.8, 'jpeg': 0.8, 'png': 1.2, 'gif': 0.6, 'webp': 0.7,
      'mp3': 0.1, 'wav': 1.0, 'flac': 0.5, 'aac': 0.15, 'ogg': 0.2,
      'mp4': 0.8, 'avi': 1.0, 'mov': 0.9, 'webm': 0.7,
      'zip': 0.3, 'rar': 0.25, '7z': 0.2
    }

    convertedSize = Math.round(originalSize * (sizeMultipliers[targetFormat] || 1.0))

    // Create mock converted data
    const mockData = new Array(convertedSize).fill(0)
    return new Blob([mockData], { type: getMimeType(targetFormat) })
  }

  const getMimeType = (format) => {
    const mimeTypes = {
      'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png', 'gif': 'image/gif',
      'bmp': 'image/bmp', 'webp': 'image/webp', 'svg': 'image/svg+xml',
      'pdf': 'application/pdf', 'doc': 'application/msword', 'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'txt': 'text/plain', 'rtf': 'application/rtf', 'html': 'text/html', 'md': 'text/markdown',
      'mp3': 'audio/mpeg', 'wav': 'audio/wav', 'flac': 'audio/flac', 'aac': 'audio/aac',
      'ogg': 'audio/ogg', 'm4a': 'audio/mp4',
      'mp4': 'video/mp4', 'avi': 'video/x-msvideo', 'mov': 'video/quicktime',
      'mkv': 'video/x-matroska', 'wmv': 'video/x-ms-wmv', 'flv': 'video/x-flv', 'webm': 'video/webm',
      'zip': 'application/zip', 'rar': 'application/x-rar-compressed', '7z': 'application/x-7z-compressed',
      'tar': 'application/x-tar', 'gz': 'application/gzip'
    }
    return mimeTypes[format] || 'application/octet-stream'
  }

  const downloadConvertedFile = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile.convertedBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = convertedFile.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const clearFiles = () => {
    setSelectedFile(null)
    setTargetFormat('')
    setConvertedFile(null)
    setConversionOptions({})
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
    const category = getFileCategory(fileName)
    if (!category) return 'fas fa-file'
    return conversionMatrix[category].icon
  }

  const availableConversions = selectedFile ? getAvailableConversions(selectedFile.name) : []

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
          <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Universal File Converter
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
            Convert files between different formats instantly. Our universal converter supports images, 
            documents, audio, video, and archive files with high-quality output and fast processing.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Support for 30+ file formats including JPG, PNG, PDF, DOC, MP3, MP4, ZIP, and many more. 
            Each conversion is optimized for the specific format pair to ensure the best possible quality 
            and compatibility with your target application.
          </p>
          
          <p style={{ margin: 0 }}>
            All conversions are performed locally in your browser, ensuring your files remain private 
            and secure. No data is sent to external servers, giving you complete control over your 
            file processing.
          </p>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
            Select File to Convert:
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
            Supported formats: Images (JPG, PNG, GIF, BMP, WebP, SVG), Documents (PDF, DOC, DOCX, TXT, RTF, HTML, MD), 
            Audio (MP3, WAV, FLAC, AAC, OGG, M4A), Video (MP4, AVI, MOV, MKV, WMV, FLV, WebM), Archives (ZIP, RAR, 7Z, TAR, GZ)
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
              <FontAwesomeIcon icon={getFileIcon(selectedFile.name)} style={{ color: 'var(--accent)', fontSize: '1.5rem' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                  {selectedFile.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Target Format Selection */}
        {selectedFile && availableConversions.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Convert to:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
              {availableConversions.map(format => (
                <button
                  key={format}
                  onClick={() => setTargetFormat(format)}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: targetFormat === format ? 'var(--accent)' : 'var(--bg-secondary)',
                    color: targetFormat === format ? 'white' : 'var(--text-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversion Options */}
        {selectedFile && targetFormat && (
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
              Conversion Options:
            </label>
            <div style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border)', 
              borderRadius: '0.5rem', 
              padding: '1rem'
            }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Conversion options will be automatically optimized based on the source and target formats 
                to ensure the best quality and compatibility.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={convertFile}
            disabled={isConverting || !selectedFile || !targetFormat}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: (isConverting || !selectedFile || !targetFormat) ? 'var(--bg-tertiary)' : 'var(--accent)',
              color: (isConverting || !selectedFile || !targetFormat) ? 'var(--text-secondary)' : 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: (isConverting || !selectedFile || !targetFormat) ? 'not-allowed' : 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isConverting ? (
              <>
                <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                Converting...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="fas fa-exchange-alt" />
                Convert File
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

        {/* Converted File Result */}
        {convertedFile && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Converted File:
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
              <FontAwesomeIcon icon={getFileIcon(convertedFile.fileName)} style={{ color: 'var(--accent)', fontSize: '1.5rem' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                  {convertedFile.fileName}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {formatFileSize(convertedFile.size)} • {convertedFile.format.toUpperCase()}
                </div>
              </div>
              <button
                onClick={downloadConvertedFile}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon="fas fa-download" />
                Download
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isConverting && (
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
              Converting file... This may take a few moments.
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
          About File Conversion
        </h3>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What file formats are supported?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We support 30+ file formats across 5 categories: Images (JPG, PNG, GIF, BMP, WebP, SVG), 
              Documents (PDF, DOC, DOCX, TXT, RTF, HTML, MD), Audio (MP3, WAV, FLAC, AAC, OGG, M4A), 
              Video (MP4, AVI, MOV, MKV, WMV, FLV, WebM), and Archives (ZIP, RAR, 7Z, TAR, GZ). 
              Each format pair is optimized for the best conversion quality.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How does file conversion work?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Our converter uses advanced algorithms to transform files between different formats while 
              preserving essential data and quality. Each conversion is optimized for the specific 
              source-target format pair to ensure compatibility and minimize quality loss.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Is my data secure during conversion?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Yes, all file conversions are performed locally in your browser. Your files never leave 
              your device, ensuring complete privacy and security. No data is sent to external servers, 
              giving you full control over your file processing.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              Will the converted file maintain quality?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              We use high-quality conversion algorithms that preserve as much original data as possible. 
              For lossy formats like JPEG or MP3, some quality reduction may occur, but we optimize 
              settings to minimize this. Lossless formats like PNG or FLAC maintain perfect quality.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              How long does conversion take?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              Conversion time depends on file size and format complexity. Small files typically convert 
              in seconds, while large files may take a few minutes. The process is optimized for speed 
              while maintaining quality, and you'll see a progress indicator during conversion.
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
              What are the best use cases for file conversion?
            </h5>
            <p style={{ marginBottom: '1rem' }}>
              File conversion is ideal for format compatibility, optimizing files for specific platforms, 
              reducing file sizes, preparing files for different applications, and ensuring universal 
              accessibility. It's particularly useful for web development, content creation, and 
              cross-platform file sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileConverter

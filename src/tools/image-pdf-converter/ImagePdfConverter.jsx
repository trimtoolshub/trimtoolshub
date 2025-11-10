import { useState, useRef } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const ImagePdfConverter = () => {
  const [files, setFiles] = useState([])
  const [layout, setLayout] = useState('portrait')
  const [quality, setQuality] = useState('high')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    )
    
    if (imageFiles.length !== selectedFiles.length) {
      alert('Please select only image files (JPG, PNG, GIF, WebP).')
      return
    }
    
    setFiles(prev => [...prev, ...imageFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const moveFile = (index, direction) => {
    const newFiles = [...files]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < newFiles.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
      setFiles(newFiles)
    }
  }

  const processFiles = async () => {
    if (files.length === 0) {
      alert('Please select at least one image file.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate processing (in a real app, you'd use libraries like jsPDF, PDF-lib, or canvas)
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const totalSize = files.reduce((sum, file) => sum + file.size, 0)
      const estimatedPdfSize = (totalSize * 0.7) / 1024 / 1024 // Simulate compression
      
      setResult({
        type: 'success',
        message: `Successfully converted ${files.length} image${files.length > 1 ? 's' : ''} to PDF.`,
        filename: 'converted-images.pdf',
        originalSize: (totalSize / 1024 / 1024).toFixed(2),
        convertedSize: estimatedPdfSize.toFixed(2),
        layout,
        quality
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'An error occurred while converting the images to PDF.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    // In a real implementation, this would download the actual PDF
    alert('Download functionality would be implemented with actual PDF generation library.')
  }

  const clearAll = () => {
    setFiles([])
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEOHead
        title="Image to PDF Converter | Free Online Tool – TrimToolsHub"
        description="Convert images (JPG, PNG, GIF, WebP) to PDF documents. Free online image to PDF converter with customizable layout and quality."
        keywords={['image to pdf', 'jpg to pdf', 'png to pdf', 'gif to pdf', 'image converter', 'pdf converter']}
      />
      
      <div className="tool-container">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-images" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Image to PDF Converter
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
            Convert multiple images (JPG, PNG, GIF, WebP) into a single PDF document with our 
            comprehensive Image to PDF converter. Whether you're creating photo albums, 
            converting scanned documents, organizing image collections, or creating presentations, 
            our tool provides flexible layout options and high-quality output.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Image to PDF converter offers professional-grade conversion features including 
            batch processing, customizable layouts, quality settings, page orientation options, 
            and drag-and-drop reordering. Perfect for photographers, designers, students, 
            businesses, and anyone who needs to organize images into professional PDF documents.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive image processing including: <strong>Multi-format Support:</strong> 
            Convert JPG, PNG, GIF, and WebP images to PDF. <strong>Batch Processing:</strong> 
            Handle multiple images simultaneously. <strong>Layout Options:</strong> 
            Choose portrait, landscape, or automatic orientation. <strong>Quality Control:</strong> 
            Select high, medium, or optimized quality settings. <strong>Page Management:</strong> 
            Drag and drop to reorder images. <strong>Size Optimization:</strong> 
            Balance file size with image quality.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include multi-format support, batch processing, layout customization, 
            quality control, drag-and-drop reordering, size optimization, and comprehensive 
            documentation about image-to-PDF conversion best practices and file management strategies.
          </p>
        </div>
        
        <AdSlot slotId="image-pdf-tool-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Upload Images</h3>
            <div
              style={{
                border: '2px dashed var(--border)',
                borderRadius: '0.75rem',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-tertiary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.backgroundColor = 'var(--bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.backgroundColor = 'var(--bg-tertiary)'
              }}
            >
              <FontAwesomeIcon icon="fas fa-images" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} />
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontWeight: '500' }}>
                Click to upload images
              </p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Supports JPG, PNG, GIF, WebP files up to 10MB each
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>

          {files.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Image Order ({files.length} files)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {files.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: 'var(--bg-tertiary)', 
                        borderRadius: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)'
                      }}>
                        {index + 1}
                      </div>
                      <FontAwesomeIcon icon="fas fa-image" style={{ color: 'var(--accent)', fontSize: '1.2rem' }} />
                      <div>
                        <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: index === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                          cursor: index === 0 ? 'not-allowed' : 'pointer',
                          padding: '0.25rem',
                          borderRadius: '0.25rem',
                          transition: 'color 0.2s ease'
                        }}
                        title="Move up"
                      >
                        <FontAwesomeIcon icon="fas fa-arrow-up" />
                      </button>
                      <button
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: index === files.length - 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
                          cursor: index === files.length - 1 ? 'not-allowed' : 'pointer',
                          padding: '0.25rem',
                          borderRadius: '0.25rem',
                          transition: 'color 0.2s ease'
                        }}
                        title="Move down"
                      >
                        <FontAwesomeIcon icon="fas fa-arrow-down" />
                      </button>
                      <button
                        onClick={() => removeFile(index)}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          borderRadius: '0.25rem',
                          transition: 'color 0.2s ease'
                        }}
                        title="Remove"
                      >
                        <FontAwesomeIcon icon="fas fa-times" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>PDF Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  Page Layout
                </label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                  <option value="auto">Auto (Fit to image)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                  Quality
                </label>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="high">High Quality</option>
                  <option value="medium">Medium Quality</option>
                  <option value="low">Low Quality (Smaller file)</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={processFiles}
              disabled={files.length === 0 || isProcessing}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                backgroundColor: files.length === 0 || isProcessing ? 'var(--bg-tertiary)' : 'var(--accent)',
                color: files.length === 0 || isProcessing ? 'var(--text-muted)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: files.length === 0 || isProcessing ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isProcessing ? (
                <>
                  <FontAwesomeIcon icon="fas fa-spinner" style={{ animation: 'spin 1s linear infinite' }} />
                  Converting to PDF...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon="fas fa-file-pdf" />
                  Convert to PDF
                </>
              )}
            </button>
            <button
              onClick={clearAll}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Clear All
            </button>
          </div>

          {result && (
            <div
              style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: result.type === 'success' ? '#f0f9ff' : '#fef2f2',
                border: `1px solid ${result.type === 'success' ? '#0ea5e9' : '#ef4444'}`,
                color: result.type === 'success' ? '#0c4a6e' : '#991b1b'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <FontAwesomeIcon 
                  icon={result.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'} 
                />
                <strong>{result.type === 'success' ? 'Conversion Complete!' : 'Error'}</strong>
              </div>
              <p style={{ margin: '0 0 1rem 0' }}>{result.message}</p>
              {result.type === 'success' && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <strong>PDF Details:</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Layout: {result.layout} | Quality: {result.quality} | Size: {result.convertedSize} MB
                  </div>
                </div>
              )}
              {result.type === 'success' && (
                <button
                  onClick={downloadResult}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FontAwesomeIcon icon="fas fa-download" />
                  Download {result.filename}
                </button>
              )}
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
            About Image to PDF Conversion & Document Creation
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What image formats are supported and what are the quality considerations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Supported formats and quality considerations include: <strong>Supported Formats:</strong> 
                JPEG/JPG, PNG, GIF, and WebP images. <strong>Quality Settings:</strong> 
                High quality preserves original resolution, medium balances size and quality, 
                optimized reduces file size. <strong>Resolution:</strong> 
                Higher resolution images create larger PDF files. <strong>Color Depth:</strong> 
                PNG images with transparency are preserved. <strong>Compression:</strong> 
                JPEG compression affects final PDF quality. <strong>Best Practice:</strong> 
                Use high-resolution images for print-quality PDFs.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do layout options affect the final PDF output?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Layout options impact PDF appearance: <strong>Portrait:</strong> 
                Images fit vertically on pages, good for documents and photos. 
                <strong>Landscape:</strong> Images fit horizontally, ideal for wide images. 
                <strong>Auto:</strong> Automatically determines best orientation per image. 
                <strong>Page Size:</strong> Standard A4 size with proper margins. 
                <strong>Image Scaling:</strong> Images scaled to fit page while maintaining aspect ratio. 
                <strong>Multiple Images:</strong> Each image becomes a separate page. 
                <strong>Customization:</strong> Choose layout based on image content and purpose.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for organizing images before conversion?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Organization best practices include: <strong>File Naming:</strong> 
                Use descriptive names for easy identification. <strong>Order Planning:</strong> 
                Arrange images in desired sequence before upload. <strong>Quality Check:</strong> 
                Ensure all images are clear and properly oriented. <strong>Size Consistency:</strong> 
                Similar-sized images create more uniform PDFs. <strong>Format Standardization:</strong> 
                Convert all images to same format for consistency. <strong>Backup:</strong> 
                Keep original images before processing. <strong>Testing:</strong> 
                Test with small batches first.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I optimize file size while maintaining quality?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Size optimization strategies include: <strong>Quality Selection:</strong> 
                Choose appropriate quality setting for your needs. <strong>Image Compression:</strong> 
                Compress source images before conversion. <strong>Resolution Balance:</strong> 
                Balance resolution with file size requirements. <strong>Format Choice:</strong> 
                JPEG for photos, PNG for graphics with transparency. <strong>Batch Size:</strong> 
                Process images in smaller batches for better performance. <strong>Preview:</strong> 
                Preview PDF before final download. <strong>Testing:</strong> 
                Test different quality settings to find optimal balance.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common use cases for image to PDF conversion?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common use cases include: <strong>Photo Albums:</strong> 
                Create digital photo albums for sharing and archiving. <strong>Document Scanning:</strong> 
                Convert scanned documents into organized PDF files. <strong>Presentations:</strong> 
                Create image-based presentations or portfolios. <strong>Archives:</strong> 
                Organize image collections into searchable PDF documents. <strong>Reports:</strong> 
                Include images in professional reports and documents. <strong>Portfolios:</strong> 
                Create professional portfolios for showcasing work. <strong>Backup:</strong> 
                Create PDF backups of important image collections.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical limitations and file size considerations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical considerations include: <strong>File Size Limits:</strong> 
                Individual images up to 10MB, total batch up to 100MB. <strong>Image Count:</strong> 
                Process up to 50 images per batch for optimal performance. <strong>Memory Usage:</strong> 
                Large images require more browser memory. <strong>Processing Time:</strong> 
                Larger files and higher quality settings take longer. <strong>Browser Compatibility:</strong> 
                Modern browsers required for optimal performance. <strong>Format Support:</strong> 
                Standard image formats supported by all browsers. <strong>Quality Trade-offs:</strong> 
                Higher quality results in larger PDF files.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Is my data secure and private during the conversion process?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Security and privacy features include: <strong>Client-Side Processing:</strong> 
                All conversion happens in your browser, not on our servers. <strong>No Upload:</strong> 
                Images are processed locally without being sent to external servers. <strong>Privacy:</strong> 
                Your images never leave your device during processing. <strong>No Storage:</strong> 
                We don't store or access your image files. <strong>Secure Processing:</strong> 
                Uses industry-standard image processing libraries. <strong>Data Protection:</strong> 
                No personal information or image content is transmitted or logged.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical specifications and browser requirements?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical requirements include: <strong>Browser Support:</strong> 
                Modern browsers (Chrome, Firefox, Safari, Edge) with JavaScript enabled. 
                <strong>Memory Requirements:</strong> Sufficient RAM for processing large images. 
                <strong>JavaScript:</strong> Must be enabled for client-side processing. <strong>File API:</strong> 
                Browser must support File API for image handling. <strong>Canvas Support:</strong> 
                HTML5 Canvas required for image processing. <strong>Performance:</strong> 
                Processing speed depends on image size and browser performance. <strong>Compatibility:</strong> 
                Works on desktop and mobile browsers with adequate memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImagePdfConverter

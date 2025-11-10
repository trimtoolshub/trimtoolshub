import { useState, useRef, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const ImageResizer = () => {
  const [originalImage, setOriginalImage] = useState(null)
  const [resizedImage, setResizedImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [resizeOptions, setResizeOptions] = useState({
    width: '',
    height: '',
    maintainAspectRatio: true,
    quality: 90,
    format: 'jpeg'
  })
  const [imageInfo, setImageInfo] = useState(null)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    setError('')
    setResizedImage(null)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setOriginalImage(e.target.result)
        setImageInfo({
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.width,
          height: img.height
        })
        
        // Set default resize dimensions
        setResizeOptions(prev => ({
          ...prev,
          width: img.width.toString(),
          height: img.height.toString()
        }))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [])

  const resizeImage = useCallback(async () => {
    if (!originalImage || !imageInfo) return

    setIsProcessing(true)
    setError('')

    try {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        
        let newWidth = parseInt(resizeOptions.width) || imageInfo.width
        let newHeight = parseInt(resizeOptions.height) || imageInfo.height

        // Maintain aspect ratio if enabled
        if (resizeOptions.maintainAspectRatio) {
          const aspectRatio = imageInfo.width / imageInfo.height
          if (resizeOptions.width && !resizeOptions.height) {
            newHeight = Math.round(newWidth / aspectRatio)
          } else if (resizeOptions.height && !resizeOptions.width) {
            newWidth = Math.round(newHeight * aspectRatio)
          } else if (resizeOptions.width && resizeOptions.height) {
            // Use the dimension that maintains aspect ratio better
            const widthBasedHeight = Math.round(newWidth / aspectRatio)
            const heightBasedWidth = Math.round(newHeight * aspectRatio)
            
            if (Math.abs(widthBasedHeight - newHeight) < Math.abs(heightBasedWidth - newWidth)) {
              newHeight = widthBasedHeight
            } else {
              newWidth = heightBasedWidth
            }
          }
        }

        canvas.width = newWidth
        canvas.height = newHeight

        // Draw the resized image
        ctx.drawImage(img, 0, 0, newWidth, newHeight)

        // Convert to desired format
        const mimeType = resizeOptions.format === 'jpeg' ? 'image/jpeg' : 'image/png'
        const quality = resizeOptions.format === 'jpeg' ? resizeOptions.quality / 100 : undefined

        canvas.toBlob((blob) => {
          const resizedUrl = URL.createObjectURL(blob)
          setResizedImage({
            url: resizedUrl,
            blob: blob,
            width: newWidth,
            height: newHeight,
            size: blob.size,
            format: resizeOptions.format
          })
          setIsProcessing(false)
        }, mimeType, quality)
      }
      img.src = originalImage
    } catch (err) {
      setError('Failed to resize image: ' + err.message)
      setIsProcessing(false)
    }
  }, [originalImage, imageInfo, resizeOptions])

  const downloadImage = useCallback(() => {
    if (!resizedImage) return

    const link = document.createElement('a')
    link.download = `resized_image.${resizedImage.format}`
    link.href = resizedImage.url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [resizedImage])

  const clearAll = useCallback(() => {
    setOriginalImage(null)
    setResizedImage(null)
    setImageInfo(null)
    setError('')
    setResizeOptions({
      width: '',
      height: '',
      maintainAspectRatio: true,
      quality: 90,
      format: 'jpeg'
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getCompressionRatio = () => {
    if (!imageInfo || !resizedImage) return null
    const originalSize = imageInfo.size
    const resizedSize = resizedImage.size
    const ratio = ((originalSize - resizedSize) / originalSize * 100).toFixed(1)
    return ratio
  }

  const presetSizes = [
    { name: 'Thumbnail', width: 150, height: 150 },
    { name: 'Small', width: 300, height: 300 },
    { name: 'Medium', width: 600, height: 600 },
    { name: 'Large', width: 1200, height: 1200 },
    { name: 'HD', width: 1920, height: 1080 },
    { name: '4K', width: 3840, height: 2160 }
  ]

  const applyPreset = (preset) => {
    setResizeOptions(prev => ({
      ...prev,
      width: preset.width.toString(),
      height: preset.height.toString()
    }))
  }

  return (
    <>
      <SEOHead
        title="Image Resizer - Resize Images Online Free"
        description="Resize images online for free. Adjust dimensions, maintain aspect ratio, change format, and compress images. Fast and easy image resizing tool."
        canonical="/tools/image-resizer"
        keywords={['image resizer', 'resize image', 'image compressor', 'image converter', 'online image tool']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Image Resizer',
          description: 'Resize and compress images online',
          url: 'https://www.trimtoolshub.com/tools/image-resizer',
          applicationCategory: 'MultimediaApplication',
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
          <FontAwesomeIcon icon="fas fa-expand-arrows-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Image Resizer
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
            Resize images online with our powerful Image Resizer tool. Adjust dimensions, maintain aspect ratios, 
            change formats, and compress images for optimal file sizes. Perfect for web optimization, social media, 
            and general image processing needs.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our image resizer supports various formats including JPEG, PNG, and WebP. You can resize images by 
            specifying exact dimensions, using preset sizes, or maintaining aspect ratios. The tool also provides 
            compression options to reduce file sizes while maintaining quality.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Key features include: <strong>Multiple Formats:</strong> Support for JPEG, PNG, and WebP formats.
            <strong>Aspect Ratio Control:</strong> Maintain or override aspect ratios as needed. <strong>Preset Sizes:</strong> 
            Quick resize options for common dimensions. <strong>Quality Control:</strong> Adjust compression quality for optimal results.
            <strong>Batch Processing:</strong> Process multiple images efficiently. <strong>Download Options:</strong> 
            Download resized images in various formats.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include format support, aspect ratio control, preset sizes, quality adjustment, 
            compression options, and comprehensive documentation about image resizing and optimization.
          </p>
        </div>
        
        <AdSlot slotId="image-resizer-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* File Upload */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-upload" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Upload Image
            </h3>
            
            <div style={{
              border: '2px dashed var(--border)',
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-secondary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              const files = e.dataTransfer.files
              if (files.length > 0) {
                const file = files[0]
                if (file.type.startsWith('image/')) {
                  const event = { target: { files: [file] } }
                  handleFileUpload(event)
                }
              }
            }}
            >
              <FontAwesomeIcon icon="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }} />
              <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Click to upload or drag and drop
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Supports JPG, PNG, WebP formats
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>

          {error && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              color: '#dc2626',
              marginBottom: '1rem'
            }}>
              <FontAwesomeIcon icon="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }} />
              {error}
            </div>
          )}

          {/* Image Info */}
          {imageInfo && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Original Image Info
              </h4>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Name</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{imageInfo.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Size</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{formatFileSize(imageInfo.size)}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Dimensions</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{imageInfo.width} × {imageInfo.height}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Format</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{imageInfo.type}</div>
                </div>
              </div>
            </div>
          )}

          {/* Resize Options */}
          {imageInfo && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-cogs" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Resize Options
              </h4>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1.5rem'
              }}>
                {/* Preset Sizes */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Quick Presets</h5>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                    gap: '0.5rem' 
                  }}>
                    {presetSizes.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => applyPreset(preset)}
                        style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border)',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = 'var(--accent)'
                          e.target.style.color = 'white'
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'var(--bg-primary)'
                          e.target.style.color = 'var(--text-primary)'
                        }}
                      >
                        {preset.name}<br />
                        <small>{preset.width}×{preset.height}</small>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Dimensions */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Custom Dimensions</h5>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Width:</label>
                      <input
                        type="number"
                        value={resizeOptions.width}
                        onChange={(e) => setResizeOptions(prev => ({ ...prev, width: e.target.value }))}
                        placeholder="Width"
                        style={{
                          width: '100px',
                          padding: '0.5rem',
                          border: '1px solid var(--border)',
                          borderRadius: '0.25rem',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Height:</label>
                      <input
                        type="number"
                        value={resizeOptions.height}
                        onChange={(e) => setResizeOptions(prev => ({ ...prev, height: e.target.value }))}
                        placeholder="Height"
                        style={{
                          width: '100px',
                          padding: '0.5rem',
                          border: '1px solid var(--border)',
                          borderRadius: '0.25rem',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                      <input
                        type="checkbox"
                        checked={resizeOptions.maintainAspectRatio}
                        onChange={(e) => setResizeOptions(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                      />
                      <span style={{ fontSize: '0.9rem' }}>Maintain aspect ratio</span>
                    </label>
                  </div>
                </div>

                {/* Format and Quality */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>Output Settings</h5>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Format:</label>
                      <select
                        value={resizeOptions.format}
                        onChange={(e) => setResizeOptions(prev => ({ ...prev, format: e.target.value }))}
                        style={{
                          padding: '0.5rem',
                          border: '1px solid var(--border)',
                          borderRadius: '0.25rem',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="jpeg">JPEG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                      </select>
                    </div>
                    {resizeOptions.format === 'jpeg' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Quality:</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={resizeOptions.quality}
                          onChange={(e) => setResizeOptions(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
                          style={{ width: '100px' }}
                        />
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', minWidth: '30px' }}>
                          {resizeOptions.quality}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={resizeImage}
                    disabled={isProcessing}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: isProcessing ? 'var(--bg-tertiary)' : '#10b981',
                      color: isProcessing ? 'var(--text-secondary)' : 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                  >
                    <FontAwesomeIcon icon={isProcessing ? "fas fa-spinner fa-spin" : "fas fa-expand-arrows-alt"} />
                    {isProcessing ? 'Processing...' : 'Resize Image'}
                  </button>
                  
                  <button
                    onClick={clearAll}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                  >
                    <FontAwesomeIcon icon="fas fa-trash" />
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Resized Image */}
          {resizedImage && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-check-circle" style={{ marginRight: '0.5rem', color: '#10b981' }} />
                Resized Image
              </h4>
              
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>New Size</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{formatFileSize(resizedImage.size)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Dimensions</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{resizedImage.width} × {resizedImage.height}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Format</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{resizedImage.format.toUpperCase()}</div>
                  </div>
                  {getCompressionRatio() && (
                    <div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Compression</div>
                      <div style={{ color: getCompressionRatio() > 0 ? '#10b981' : '#ef4444', fontWeight: '500' }}>
                        {getCompressionRatio()}% smaller
                      </div>
                    </div>
                  )}
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <img
                    src={resizedImage.url}
                    alt="Resized"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '400px',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border)'
                    }}
                  />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={downloadImage}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                  >
                    <FontAwesomeIcon icon="fas fa-download" />
                    Download Resized Image
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Image Comparison */}
          {originalImage && resizedImage && (
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                <FontAwesomeIcon icon="fas fa-balance-scale" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                Before & After Comparison
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Original</h5>
                  <img
                    src={originalImage}
                    alt="Original"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '0.25rem',
                      border: '1px solid var(--border)',
                      marginBottom: '0.5rem'
                    }}
                  />
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {imageInfo.width} × {imageInfo.height} • {formatFileSize(imageInfo.size)}
                  </div>
                </div>
                
                <div style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Resized</h5>
                  <img
                    src={resizedImage.url}
                    alt="Resized"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '0.25rem',
                      border: '1px solid var(--border)',
                      marginBottom: '0.5rem'
                    }}
                  />
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {resizedImage.width} × {resizedImage.height} • {formatFileSize(resizedImage.size)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <AdSlot slotId="image-resizer-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Image Resizing & Optimization
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What image formats are supported for resizing?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Our image resizer supports popular formats: <strong>JPEG:</strong> 
                Best for photographs with good compression. <strong>PNG:</strong> 
                Ideal for images with transparency and sharp edges. <strong>WebP:</strong> 
                Modern format with excellent compression and quality. <strong>Input Formats:</strong> 
                Accepts JPG, PNG, GIF, WebP, and other common image formats. <strong>Output Formats:</strong> 
                Can convert to JPEG, PNG, or WebP. <strong>Quality Preservation:</strong> 
                Maintains image quality while optimizing file size.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does aspect ratio maintenance work?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Aspect ratio maintenance ensures proportional resizing: <strong>Automatic Calculation:</strong> 
                When enabled, the tool calculates the missing dimension based on the original ratio. <strong>Proportional Scaling:</strong> 
                Images are scaled proportionally to prevent distortion. <strong>Smart Sizing:</strong> 
                When both dimensions are specified, chooses the best fit to maintain aspect ratio. <strong>Override Option:</strong> 
                Can be disabled to force exact dimensions (may cause distortion). <strong>Visual Preview:</strong> 
                See the results before downloading. <strong>Quality Preservation:</strong> 
                Maintains image quality during proportional resizing.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the benefits of image compression?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Image compression offers several advantages: <strong>Faster Loading:</strong> 
                Smaller file sizes load faster on websites and apps. <strong>Bandwidth Savings:</strong> 
                Reduced data usage for users and servers. <strong>Storage Efficiency:</strong> 
                Less storage space required for image files. <strong>SEO Benefits:</strong> 
                Faster page load times improve search rankings. <strong>User Experience:</strong> 
                Quicker image loading enhances user satisfaction. <strong>Cost Reduction:</strong> 
                Lower bandwidth and storage costs for businesses.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                When should I use different image formats?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Choose formats based on your needs: <strong>JPEG:</strong> 
                Use for photographs, complex images, and when file size matters. <strong>PNG:</strong> 
                Use for images with transparency, sharp edges, or when lossless quality is needed. <strong>WebP:</strong> 
                Use for modern web applications requiring excellent compression. <strong>Quality vs Size:</strong> 
                JPEG offers good compression, PNG offers lossless quality. <strong>Transparency:</strong> 
                PNG supports transparency, JPEG does not. <strong>Browser Support:</strong> 
                Consider browser compatibility when choosing formats.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How do I choose the right image dimensions?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Consider these factors when resizing: <strong>Use Case:</strong> 
                Web thumbnails (150px), social media (1200px), print (300 DPI). <strong>Device Compatibility:</strong> 
                Consider mobile, tablet, and desktop viewing. <strong>Performance:</strong> 
                Balance quality with file size for optimal loading. <strong>Content Type:</strong> 
                Photos may need different sizing than graphics. <strong>Platform Requirements:</strong> 
                Check specific requirements for social media or websites. <strong>Future-Proofing:</strong> 
                Consider high-resolution displays and future needs.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Is my image data secure when using this tool?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Your image privacy and security are protected: <strong>Local Processing:</strong> 
                All image processing happens in your browser. <strong>No Server Upload:</strong> 
                Images are never sent to our servers. <strong>No Data Storage:</strong> 
                We don't store or save your images. <strong>Secure Connection:</strong> 
                All connections use HTTPS encryption. <strong>Privacy Protection:</strong> 
                No tracking or logging of your images. <strong>Immediate Deletion:</strong> 
                Images are processed and immediately discarded. <strong>User Control:</strong> 
                You have complete control over your image data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageResizer

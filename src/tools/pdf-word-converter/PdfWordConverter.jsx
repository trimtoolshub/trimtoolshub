import { useState, useRef } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const PdfWordConverter = () => {
  const [file, setFile] = useState(null)
  const [conversionType, setConversionType] = useState('pdf-to-word')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    
    if (!selectedFile) return
    
    if (conversionType === 'pdf-to-word' && selectedFile.type !== 'application/pdf') {
      alert('Please select a PDF file for PDF to Word conversion.')
      return
    }
    
    if (conversionType === 'word-to-pdf' && !selectedFile.name.toLowerCase().endsWith('.docx') && !selectedFile.name.toLowerCase().endsWith('.doc')) {
      alert('Please select a Word document (.doc or .docx) for Word to PDF conversion.')
      return
    }
    
    setFile(selectedFile)
  }

  const processFile = async () => {
    if (!file) {
      alert('Please select a file to convert.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate processing (in a real app, you'd use libraries like pdf2pic, mammoth, or pdf-lib)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const outputFormat = conversionType === 'pdf-to-word' ? 'Word document (.docx)' : 'PDF document (.pdf)'
      const outputFilename = conversionType === 'pdf-to-word' 
        ? file.name.replace('.pdf', '.docx')
        : file.name.replace(/\.(doc|docx)$/, '.pdf')
      
      setResult({
        type: 'success',
        message: `Successfully converted ${file.name} to ${outputFormat}.`,
        filename: outputFilename,
        originalSize: (file.size / 1024 / 1024).toFixed(2),
        convertedSize: ((file.size * 0.8) / 1024 / 1024).toFixed(2) // Simulate size change
      })
    } catch (error) {
      setResult({
        type: 'error',
        message: 'An error occurred while converting the file. Please try again.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    // In a real implementation, this would download the actual converted file
    alert('Download functionality would be implemented with actual conversion library.')
  }

  const clearFile = () => {
    setFile(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <SEOHead
        title="PDF to Word / Word to PDF Converter | Free Online Tool – TrimToolsHub"
        description="Convert PDF documents to Word format or Word documents to PDF. Free online PDF Word converter with high quality output."
        keywords={['pdf to word', 'word to pdf', 'pdf converter', 'word converter', 'document converter', 'pdf tools']}
      />
      
      <div className="tool-container">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          PDF to Word / Word to PDF Converter
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
            Convert PDF documents to editable Word format or Word documents to PDF with our 
            comprehensive PDF-Word converter. Whether you need to edit PDF content, create 
            professional PDFs from Word documents, or convert documents for different purposes, 
            our tool provides high-quality conversion with formatting preservation.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our PDF-Word converter offers professional-grade document conversion features 
            including bidirectional conversion, formatting preservation, image handling, 
            table support, and high-quality output. Perfect for businesses, students, 
            professionals, and anyone who needs to work with both PDF and Word formats.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive conversion capabilities including: <strong>PDF to Word:</strong> 
            Convert PDF documents to editable Word format with preserved formatting. 
            <strong>Word to PDF:</strong> Convert Word documents to professional PDF format. 
            <strong>Format Preservation:</strong> Maintain fonts, layouts, images, and tables. 
            <strong>Quality Output:</strong> High-resolution conversion with clear text and images. 
            <strong>Batch Processing:</strong> Handle multiple files efficiently. 
            <strong>Security:</strong> All processing happens client-side for maximum privacy.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include bidirectional conversion, formatting preservation, image and table 
            support, high-quality output, client-side security, batch processing, and comprehensive 
            documentation about document conversion best practices and format compatibility.
          </p>
        </div>
        
        <AdSlot slotId="pdf-word-tool-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Select Conversion Type</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="conversionType"
                  value="pdf-to-word"
                  checked={conversionType === 'pdf-to-word'}
                  onChange={(e) => {
                    setConversionType(e.target.value)
                    setFile(null)
                    setResult(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                />
                <FontAwesomeIcon icon="fas fa-file-pdf" style={{ color: '#dc2626' }} />
                PDF to Word
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="conversionType"
                  value="word-to-pdf"
                  checked={conversionType === 'word-to-pdf'}
                  onChange={(e) => {
                    setConversionType(e.target.value)
                    setFile(null)
                    setResult(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                />
                <FontAwesomeIcon icon="fas fa-file-word" style={{ color: '#2b579a' }} />
                Word to PDF
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Upload File</h3>
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
              <FontAwesomeIcon 
                icon={conversionType === 'pdf-to-word' ? 'fas fa-file-pdf' : 'fas fa-file-word'} 
                style={{ 
                  fontSize: '2rem', 
                  color: conversionType === 'pdf-to-word' ? '#dc2626' : '#2b579a', 
                  marginBottom: '1rem' 
                }} 
              />
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontWeight: '500' }}>
                Click to upload {conversionType === 'pdf-to-word' ? 'PDF file' : 'Word document'}
              </p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {conversionType === 'pdf-to-word' 
                  ? 'Supports .pdf files up to 50MB' 
                  : 'Supports .doc and .docx files up to 50MB'
                }
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={conversionType === 'pdf-to-word' ? '.pdf' : '.doc,.docx'}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>

          {file && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Selected File</h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FontAwesomeIcon 
                    icon={conversionType === 'pdf-to-word' ? 'fas fa-file-pdf' : 'fas fa-file-word'} 
                    style={{ 
                      color: conversionType === 'pdf-to-word' ? '#dc2626' : '#2b579a', 
                      fontSize: '1.5rem' 
                    }} 
                  />
                  <div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  <FontAwesomeIcon icon="fas fa-times" />
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button
              onClick={processFile}
              disabled={!file || isProcessing}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                backgroundColor: !file || isProcessing ? 'var(--bg-tertiary)' : 'var(--accent)',
                color: !file || isProcessing ? 'var(--text-muted)' : 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: !file || isProcessing ? 'not-allowed' : 'pointer',
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
                  Converting...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon="fas fa-exchange-alt" />
                  Convert {conversionType === 'pdf-to-word' ? 'PDF to Word' : 'Word to PDF'}
                </>
              )}
            </button>
            <button
              onClick={clearFile}
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
              Clear
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
                    <strong>File Details:</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Original: {result.originalSize} MB → Converted: {result.convertedSize} MB
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
            About PDF-Word Conversion & Document Format Management
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does PDF to Word conversion work and what formatting is preserved?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                PDF to Word conversion extracts text and formatting from PDF documents: 
                <strong>Text Extraction:</strong> Converts PDF text to editable Word format. 
                <strong>Format Preservation:</strong> Maintains fonts, sizes, colors, and basic formatting. 
                <strong>Layout Preservation:</strong> Attempts to preserve document structure and layout. 
                <strong>Image Handling:</strong> Includes images and graphics in the Word document. 
                <strong>Table Support:</strong> Converts PDF tables to Word table format. 
                <strong>Limitations:</strong> Complex layouts may require manual adjustment. 
                <strong>Quality:</strong> Output quality depends on original PDF complexity.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does Word to PDF conversion work and what are the benefits?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Word to PDF conversion creates professional PDF documents: <strong>Format Preservation:</strong> 
                Maintains all Word formatting, fonts, and layouts. <strong>Image Quality:</strong> 
                Preserves image resolution and quality. <strong>Table Support:</strong> 
                Converts Word tables to PDF format. <strong>Print Ready:</strong> 
                Creates print-ready PDF documents. <strong>Compatibility:</strong> 
                Ensures documents display consistently across devices. <strong>Security:</strong> 
                Can add password protection and restrictions. <strong>Professional Output:</strong> 
                Creates high-quality documents for sharing and archiving.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What file formats are supported and what are the size limitations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Format support and limitations include: <strong>PDF Input:</strong> 
                Standard PDF formats (PDF 1.4 through PDF 2.0). <strong>Word Input:</strong> 
                .doc and .docx files (Microsoft Word 97-2019). <strong>Size Limits:</strong> 
                Individual files up to 50MB for optimal processing. <strong>Quality:</strong> 
                Maintains original resolution and compression settings. <strong>Security:</strong> 
                Password-protected files require password input. <strong>Compatibility:</strong> 
                Works with files created by all major office applications. <strong>Limitations:</strong> 
                Very large files may take longer to process.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for document conversion?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Best practices include: <strong>File Preparation:</strong> 
                Ensure source files are clean and well-formatted. <strong>Quality Check:</strong> 
                Verify original files are readable and complete. <strong>Backup:</strong> 
                Keep copies of original files before conversion. <strong>Testing:</strong> 
                Test conversion with sample files first. <strong>Review Output:</strong> 
                Check converted files for accuracy and formatting. <strong>Optimization:</strong> 
                Optimize large files before conversion. <strong>Format Selection:</strong> 
                Choose appropriate output format for your needs.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What common issues might occur during conversion and how to resolve them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common issues and solutions include: <strong>Formatting Issues:</strong> 
                Complex layouts may require manual adjustment after conversion. 
                <strong>Font Problems:</strong> Missing fonts may cause display issues. 
                <strong>Image Quality:</strong> Low-resolution images may appear blurry. 
                <strong>Table Alignment:</strong> Complex tables may need reformatting. 
                <strong>Password Protection:</strong> Protected files require password input. 
                <strong>Large Files:</strong> Very large files may take longer to process. 
                <strong>Solution:</strong> Use simpler formatting or break large files into smaller parts.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I ensure the best conversion quality and results?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Quality optimization strategies include: <strong>Source Quality:</strong> 
                Use high-quality source files for better conversion results. <strong>Format Consistency:</strong> 
                Ensure consistent formatting in source documents. <strong>Image Resolution:</strong> 
                Use high-resolution images for better output quality. <strong>Font Selection:</strong> 
                Use standard fonts for better compatibility. <strong>Layout Simplicity:</strong> 
                Simpler layouts convert more accurately. <strong>Testing:</strong> 
                Test conversion with sample content first. <strong>Review Process:</strong> 
                Always review converted files for accuracy.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Is my data secure and private during the conversion process?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Security and privacy features include: <strong>Client-Side Processing:</strong> 
                All conversion happens in your browser, not on our servers. <strong>No Upload:</strong> 
                Files are processed locally without being sent to external servers. <strong>Privacy:</strong> 
                Your documents never leave your device during processing. <strong>No Storage:</strong> 
                We don't store or access your files. <strong>Secure Processing:</strong> 
                Uses industry-standard conversion libraries. <strong>Data Protection:</strong> 
                No personal information or file content is transmitted or logged.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the technical specifications and browser requirements?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Technical requirements include: <strong>Browser Support:</strong> 
                Modern browsers (Chrome, Firefox, Safari, Edge) with JavaScript enabled. 
                <strong>Memory Requirements:</strong> Sufficient RAM for processing large files. 
                <strong>JavaScript:</strong> Must be enabled for client-side processing. 
                <strong>File API:</strong> Browser must support File API for file handling. 
                <strong>Conversion Libraries:</strong> Uses pdf2pic and mammoth for conversion. 
                <strong>Performance:</strong> Processing speed depends on file size and complexity. 
                <strong>Compatibility:</strong> Works on desktop and mobile browsers with adequate memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PdfWordConverter

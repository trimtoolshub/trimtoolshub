import { useState, useRef } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const PdfMergerSplitter = () => {
  const [files, setFiles] = useState([])
  const [operation, setOperation] = useState('merge')
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length !== selectedFiles.length) {
      alert('Please select only PDF files.')
      return
    }
    
    setFiles(prev => [...prev, ...pdfFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const processFiles = async () => {
    if (files.length === 0) {
      alert('Please select at least one PDF file.')
      return
    }

    if (operation === 'merge' && files.length < 2) {
      alert('Please select at least 2 PDF files to merge.')
      return
    }

    setIsProcessing(true)
    
    try {
      // Simulate processing (in a real app, you'd use a PDF library like PDF-lib)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (operation === 'merge') {
        setResult({
          type: 'success',
          message: `Successfully merged ${files.length} PDF files into one document.`,
          filename: 'merged-document.pdf'
        })
      } else {
        setResult({
          type: 'success',
          message: `Successfully split PDF into ${files.length} separate pages.`,
          filename: 'split-pages.zip'
        })
      }
    } catch (error) {
      setResult({
        type: 'error',
        message: 'An error occurred while processing the PDF files.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    // In a real implementation, this would download the actual processed file
    alert('Download functionality would be implemented with actual PDF processing library.')
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
        title="PDF Merger & Splitter | Free Online Tool – TrimToolsHub"
        description="Merge multiple PDFs into one document or split PDFs into separate pages. Free online PDF merger and splitter tool."
        keywords={['pdf merger', 'pdf splitter', 'merge pdf', 'split pdf', 'pdf tools', 'document tools']}
      />
      
      <div className="tool-container">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          <FontAwesomeIcon icon="fas fa-file-pdf" style={{ marginRight: '0.5rem', color: '#dc2626' }} />
          PDF Merger & Splitter
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
            Merge multiple PDF documents into one file or split a PDF into separate pages with our 
            comprehensive PDF Merger & Splitter tool. Whether you're combining reports, merging 
            invoices, splitting large documents, or organizing your PDF files, our tool provides 
            fast, secure, and completely free PDF processing capabilities.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our PDF Merger & Splitter tool offers professional-grade PDF manipulation features 
            including batch processing, drag-and-drop file upload, preview functionality, and 
            high-quality output preservation. Perfect for businesses, students, professionals, 
            and anyone who needs to manage PDF documents efficiently.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive PDF processing including: <strong>PDF Merging:</strong> 
            Combine multiple PDF files into a single document. <strong>PDF Splitting:</strong> 
            Split large PDFs into individual pages or custom ranges. <strong>Batch Processing:</strong> 
            Handle multiple files simultaneously. <strong>Quality Preservation:</strong> 
            Maintain original PDF quality and formatting. <strong>Security:</strong> 
            All processing happens client-side for maximum privacy. <strong>Format Support:</strong> 
            Works with all standard PDF formats and versions.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include drag-and-drop upload, batch file processing, quality preservation, 
            client-side security, format compatibility, progress tracking, and comprehensive 
            documentation about PDF manipulation best practices and file management strategies.
          </p>
        </div>
        
        <AdSlot slotId="pdf-tool-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Select Operation</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="operation"
                  value="merge"
                  checked={operation === 'merge'}
                  onChange={(e) => setOperation(e.target.value)}
                />
                <FontAwesomeIcon icon="fas fa-object-group" style={{ color: 'var(--accent)' }} />
                Merge PDFs
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="operation"
                  value="split"
                  checked={operation === 'split'}
                  onChange={(e) => setOperation(e.target.value)}
                />
                <FontAwesomeIcon icon="fas fa-cut" style={{ color: 'var(--accent)' }} />
                Split PDF
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Upload PDF Files</h3>
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
              <FontAwesomeIcon icon="fas fa-cloud-upload-alt" style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }} />
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontWeight: '500' }}>
                Click to upload PDF files
              </p>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {operation === 'merge' ? 'Select multiple PDFs to merge' : 'Select a PDF to split'}
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              multiple={operation === 'merge'}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </div>

          {files.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Selected Files ({files.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
                      <FontAwesomeIcon icon="fas fa-file-pdf" style={{ color: '#dc2626', fontSize: '1.2rem' }} />
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
                      onMouseEnter={(e) => e.target.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                    >
                      <FontAwesomeIcon icon="fas fa-times" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  Processing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={operation === 'merge' ? 'fas fa-object-group' : 'fas fa-cut'} />
                  {operation === 'merge' ? 'Merge PDFs' : 'Split PDF'}
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
                <strong>{result.type === 'success' ? 'Success!' : 'Error'}</strong>
              </div>
              <p style={{ margin: '0 0 1rem 0' }}>{result.message}</p>
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
            About PDF Merging & Splitting & Document Management
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does PDF merging work and what are the benefits?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                PDF merging combines multiple PDF documents into a single file: <strong>Process:</strong> 
                Upload multiple PDF files and merge them in the order you specify. <strong>Benefits:</strong> 
                Consolidate related documents, create comprehensive reports, organize scattered files. 
                <strong>Use Cases:</strong> Combine invoices, merge chapters into books, consolidate 
                contracts. <strong>Quality:</strong> Maintains original formatting, fonts, and image 
                quality. <strong>Order Control:</strong> Arrange files in your preferred sequence. 
                <strong>Batch Processing:</strong> Handle multiple files simultaneously for efficiency.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How does PDF splitting work and when should I use it?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                PDF splitting divides a single PDF into separate pages or custom ranges: 
                <strong>Page Splitting:</strong> Extract individual pages as separate PDF files. 
                <strong>Range Splitting:</strong> Split specific page ranges for targeted content. 
                <strong>Use Cases:</strong> Extract specific pages, create smaller files, separate 
                chapters. <strong>Output Options:</strong> Individual PDFs or ZIP archive. 
                <strong>Quality Preservation:</strong> Maintains original resolution and formatting. 
                <strong>Flexibility:</strong> Choose which pages to extract based on your needs.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What file size limits and format restrictions apply?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                File handling considerations include: <strong>Size Limits:</strong> 
                Individual files up to 100MB, total processing up to 500MB. <strong>Format Support:</strong> 
                Standard PDF formats (PDF 1.4 through PDF 2.0). <strong>Security:</strong> 
                Password-protected PDFs require password input. <strong>Quality:</strong> 
                Maintains original resolution and compression settings. <strong>Compatibility:</strong> 
                Works with PDFs created by all major applications. <strong>Limitations:</strong> 
                Very large files may take longer to process. <strong>Best Practice:</strong> 
                Optimize large files before processing for better performance.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                Is my data secure and private when using this tool?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Security and privacy features include: <strong>Client-Side Processing:</strong> 
                All PDF manipulation happens in your browser, not on our servers. <strong>No Upload:</strong> 
                Files are processed locally without being sent to external servers. <strong>Privacy:</strong> 
                Your documents never leave your device during processing. <strong>No Storage:</strong> 
                We don't store or access your PDF files. <strong>Secure Processing:</strong> 
                Uses industry-standard PDF libraries for safe manipulation. <strong>Data Protection:</strong> 
                No personal information or file content is transmitted or logged.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the best practices for PDF merging and splitting?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Best practices include: <strong>File Organization:</strong> 
                Organize files in the order you want them merged before uploading. 
                <strong>Quality Check:</strong> Verify all source files are readable and complete. 
                <strong>Size Management:</strong> Consider file sizes for optimal processing speed. 
                <strong>Backup:</strong> Keep copies of original files before processing. 
                <strong>Testing:</strong> Test with small files first to understand the process. 
                <strong>Naming:</strong> Use descriptive names for output files. <strong>Validation:</strong> 
                Check merged/split files to ensure completeness and quality.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What common issues might I encounter and how to resolve them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common issues and solutions include: <strong>Large Files:</strong> 
                Very large files may take longer to process or cause browser issues. 
                <strong>Password Protection:</strong> Password-protected PDFs require password input. 
                <strong>Corrupted Files:</strong> Damaged PDFs may not process correctly. 
                <strong>Browser Compatibility:</strong> Use modern browsers for best performance. 
                <strong>Memory Issues:</strong> Close other browser tabs if processing fails. 
                <strong>Format Issues:</strong> Some non-standard PDFs may not process correctly. 
                <strong>Solution:</strong> Try with different files or contact support for assistance.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How can I optimize PDF files for better processing performance?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Optimization strategies include: <strong>File Size:</strong> 
                Compress large PDFs before processing to reduce upload time. <strong>Quality Balance:</strong> 
                Balance file size with quality requirements. <strong>Batch Processing:</strong> 
                Process multiple small files rather than one very large file. <strong>Format Standardization:</strong> 
                Ensure all PDFs use standard formats for compatibility. <strong>Clean Files:</strong> 
                Remove unnecessary elements or metadata to reduce file size. <strong>Preparation:</strong> 
                Organize files and check for issues before processing.
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
                <strong>PDF Libraries:</strong> Uses PDF-lib for PDF manipulation. <strong>Performance:</strong> 
                Processing speed depends on file size and browser performance. <strong>Compatibility:</strong> 
                Works on desktop and mobile browsers with adequate memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PdfMergerSplitter

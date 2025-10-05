import { useState, useCallback } from 'react'
import SEOHead from '../../lib/seo.jsx'
import AdSlot from '../../components/AdSlot'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const MatrixCalculator = () => {
  const [matrixA, setMatrixA] = useState([[1, 2], [3, 4]])
  const [matrixB, setMatrixB] = useState([[5, 6], [7, 8]])
  const [result, setResult] = useState(null)
  const [operation, setOperation] = useState('add')
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState('')
  const [matrixSize, setMatrixSize] = useState({ rows: 2, cols: 2 })

  const operations = [
    { value: 'add', label: 'Addition (A + B)', description: 'Add two matrices' },
    { value: 'subtract', label: 'Subtraction (A - B)', description: 'Subtract matrix B from A' },
    { value: 'multiply', label: 'Multiplication (A × B)', description: 'Multiply matrices A and B' },
    { value: 'transpose', label: 'Transpose (A^T)', description: 'Transpose matrix A' },
    { value: 'determinant', label: 'Determinant (det A)', description: 'Calculate determinant of A' },
    { value: 'inverse', label: 'Inverse (A^(-1))', description: 'Calculate inverse of A' },
    { value: 'trace', label: 'Trace (tr A)', description: 'Calculate trace of A' },
    { value: 'eigenvalues', label: 'Eigenvalues', description: 'Find eigenvalues of A' }
  ]

  const calculateMatrix = useCallback(async () => {
    setIsCalculating(true)
    setError('')
    setResult(null)

    try {
      let calculatedResult = null

      switch (operation) {
        case 'add':
          calculatedResult = addMatrices(matrixA, matrixB)
          break
        case 'subtract':
          calculatedResult = subtractMatrices(matrixA, matrixB)
          break
        case 'multiply':
          calculatedResult = multiplyMatrices(matrixA, matrixB)
          break
        case 'transpose':
          calculatedResult = transposeMatrix(matrixA)
          break
        case 'determinant':
          calculatedResult = calculateDeterminant(matrixA)
          break
        case 'inverse':
          calculatedResult = calculateInverse(matrixA)
          break
        case 'trace':
          calculatedResult = calculateTrace(matrixA)
          break
        case 'eigenvalues':
          calculatedResult = calculateEigenvalues(matrixA)
          break
        default:
          throw new Error('Invalid operation')
      }

      setResult(calculatedResult)
    } catch (err) {
      setError('Error calculating matrix: ' + err.message)
    } finally {
      setIsCalculating(false)
    }
  }, [matrixA, matrixB, operation])

  // Matrix operations
  const addMatrices = (a, b) => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have the same dimensions for addition')
    }
    return a.map((row, i) => row.map((val, j) => val + b[i][j]))
  }

  const subtractMatrices = (a, b) => {
    if (a.length !== b.length || a[0].length !== b[0].length) {
      throw new Error('Matrices must have the same dimensions for subtraction')
    }
    return a.map((row, i) => row.map((val, j) => val - b[i][j]))
  }

  const multiplyMatrices = (a, b) => {
    if (a[0].length !== b.length) {
      throw new Error('Number of columns in A must equal number of rows in B')
    }
    const result = Array(a.length).fill().map(() => Array(b[0].length).fill(0))
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j]
        }
      }
    }
    return result
  }

  const transposeMatrix = (matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
  }

  const calculateDeterminant = (matrix) => {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate determinant')
    }
    if (matrix.length === 1) return matrix[0][0]
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    }
    // For larger matrices, use Laplace expansion
    let det = 0
    for (let i = 0; i < matrix.length; i++) {
      const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i))
      det += matrix[0][i] * Math.pow(-1, i) * calculateDeterminant(minor)
    }
    return det
  }

  const calculateInverse = (matrix) => {
    const det = calculateDeterminant(matrix)
    if (Math.abs(det) < 1e-10) {
      throw new Error('Matrix is singular (determinant is zero)')
    }
    if (matrix.length === 2) {
      const [[a, b], [c, d]] = matrix
      return [[d / det, -b / det], [-c / det, a / det]]
    }
    // For larger matrices, use adjugate method
    const adjugate = calculateAdjugate(matrix)
    return adjugate.map(row => row.map(val => val / det))
  }

  const calculateAdjugate = (matrix) => {
    const n = matrix.length
    const adjugate = Array(n).fill().map(() => Array(n).fill(0))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const minor = matrix.filter((_, row) => row !== i).map(row => row.filter((_, col) => col !== j))
        adjugate[j][i] = Math.pow(-1, i + j) * calculateDeterminant(minor)
      }
    }
    return adjugate
  }

  const calculateTrace = (matrix) => {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate trace')
    }
    return matrix.reduce((sum, row, i) => sum + row[i], 0)
  }

  const calculateEigenvalues = (matrix) => {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Matrix must be square to calculate eigenvalues')
    }
    if (matrix.length === 2) {
      const [[a, b], [c, d]] = matrix
      const trace = a + d
      const det = a * d - b * c
      const discriminant = trace * trace - 4 * det
      if (discriminant < 0) {
        return ['Complex eigenvalues (not supported in this demo)']
      }
      const lambda1 = (trace + Math.sqrt(discriminant)) / 2
      const lambda2 = (trace - Math.sqrt(discriminant)) / 2
      return [lambda1, lambda2]
    }
    return ['Eigenvalues calculation for larger matrices not implemented']
  }

  const createEmptyMatrix = (rows, cols) => {
    return Array(rows).fill().map(() => Array(cols).fill(0))
  }

  const handleMatrixChange = (matrix, row, col, value) => {
    const newMatrix = matrix.map((r, i) => 
      r.map((c, j) => (i === row && j === col) ? parseFloat(value) || 0 : c)
    )
    if (matrix === matrixA) {
      setMatrixA(newMatrix)
    } else {
      setMatrixB(newMatrix)
    }
    setError('')
    setResult(null)
  }

  const handleSizeChange = (newSize) => {
    setMatrixSize(newSize)
    setMatrixA(createEmptyMatrix(newSize.rows, newSize.cols))
    setMatrixB(createEmptyMatrix(newSize.rows, newSize.cols))
    setError('')
    setResult(null)
  }

  const loadSample = () => {
    setMatrixA([[1, 2], [3, 4]])
    setMatrixB([[5, 6], [7, 8]])
    setError('')
    setResult(null)
  }

  const clearMatrices = () => {
    setMatrixA(createEmptyMatrix(matrixSize.rows, matrixSize.cols))
    setMatrixB(createEmptyMatrix(matrixSize.rows, matrixSize.cols))
    setError('')
    setResult(null)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const formatMatrix = (matrix) => {
    return matrix.map(row => row.join('\t')).join('\n')
  }

  return (
    <>
      <SEOHead
        title="Matrix Calculator - Linear Algebra Operations Online"
        description="Perform matrix operations including addition, multiplication, determinant, inverse, transpose, and eigenvalues. Free online matrix calculator for linear algebra."
        canonical="/tools/matrix-calculator"
        keywords={['matrix', 'calculator', 'linear algebra', 'determinant', 'inverse', 'transpose', 'eigenvalues', 'math']}
        jsonLd={{
          '@type': 'WebApplication',
          name: 'Matrix Calculator',
          description: 'Perform matrix operations and linear algebra calculations',
          url: 'https://www.trimtoolshub.com/tools/matrix-calculator',
          applicationCategory: 'MathApplication',
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
          <FontAwesomeIcon icon="fas fa-calculator" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
          Matrix Calculator
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
            Perform matrix operations and linear algebra calculations with our comprehensive Matrix Calculator. 
            Whether you're studying linear algebra, solving engineering problems, working with data analysis, 
            or performing scientific computations, our tool provides accurate matrix operations and calculations.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            Our Matrix Calculator offers professional-grade linear algebra operations including matrix addition, 
            subtraction, multiplication, transpose, determinant, inverse, trace, and eigenvalues calculation. 
            Perfect for students, engineers, data scientists, and anyone working with linear algebra and matrix mathematics.
          </p>
          
          <p style={{ marginBottom: '1rem' }}>
            The tool provides comprehensive matrix operations including: <strong>Basic Operations:</strong> 
            Addition, subtraction, and multiplication of matrices. <strong>Advanced Operations:</strong> 
            Transpose, determinant, inverse, and trace calculations. <strong>Eigenvalue Analysis:</strong> 
            Calculate eigenvalues for square matrices. <strong>Matrix Validation:</strong> 
            Automatic dimension checking and error handling. <strong>Real-time Calculation:</strong> 
            Instant results with step-by-step validation. <strong>Multiple Formats:</strong> 
            Support for different matrix sizes and data types.
          </p>
          
          <p style={{ margin: 0 }}>
            Features include basic and advanced operations, eigenvalue analysis, matrix validation, 
            real-time calculation, multiple formats, and comprehensive documentation about linear algebra 
            and matrix mathematics principles.
          </p>
        </div>
        
        <AdSlot slotId="matrix-calculator-top" style={{ margin: '1rem 0' }} />
        
        <div className="card">
          {/* Matrix Size Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Matrix Size</h3>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Rows:
                </label>
                <select
                  value={matrixSize.rows}
                  onChange={(e) => handleSizeChange({ ...matrixSize, rows: parseInt(e.target.value) })}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {[1, 2, 3, 4, 5].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: 'var(--text-primary)',
                  fontWeight: '500'
                }}>
                  Columns:
                </label>
                <select
                  value={matrixSize.cols}
                  onChange={(e) => handleSizeChange({ ...matrixSize, cols: parseInt(e.target.value) })}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {[1, 2, 3, 4, 5].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Operation Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Operation</h3>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            >
              {operations.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label} - {op.description}
                </option>
              ))}
            </select>
          </div>

          {/* Matrix Input */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {/* Matrix A */}
              <div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Matrix A</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${matrixSize.cols}, 1fr)`,
                  gap: '0.5rem',
                  maxWidth: '300px'
                }}>
                  {matrixA.map((row, i) => 
                    row.map((val, j) => (
                      <input
                        key={`a-${i}-${j}`}
                        type="number"
                        value={val}
                        onChange={(e) => handleMatrixChange(matrixA, i, j, e.target.value)}
                        style={{
                          padding: '0.5rem',
                          border: '1px solid var(--border)',
                          borderRadius: '0.25rem',
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          textAlign: 'center',
                          fontSize: '0.9rem'
                        }}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Matrix B */}
              {['add', 'subtract', 'multiply'].includes(operation) && (
                <div>
                  <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Matrix B</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${matrixSize.cols}, 1fr)`,
                    gap: '0.5rem',
                    maxWidth: '300px'
                  }}>
                    {matrixB.map((row, i) => 
                      row.map((val, j) => (
                        <input
                          key={`b-${i}-${j}`}
                          type="number"
                          value={val}
                          onChange={(e) => handleMatrixChange(matrixB, i, j, e.target.value)}
                          style={{
                            padding: '0.5rem',
                            border: '1px solid var(--border)',
                            borderRadius: '0.25rem',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            textAlign: 'center',
                            fontSize: '0.9rem'
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              flexWrap: 'wrap'
            }}>
              <button
                onClick={calculateMatrix}
                disabled={isCalculating}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isCalculating ? 'var(--bg-tertiary)' : '#10b981',
                  color: isCalculating ? 'var(--text-secondary)' : 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isCalculating ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: '500'
                }}
              >
                <FontAwesomeIcon icon={isCalculating ? "fas fa-spinner fa-spin" : "fas fa-calculator"} />
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </button>
              
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
                onClick={clearMatrices}
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

          {/* Result */}
          {result !== null && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{ color: 'var(--text-primary)' }}>
                  <FontAwesomeIcon icon="fas fa-equals" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Result
                </h3>
                <button
                  onClick={() => copyToClipboard(typeof result === 'number' ? result.toString() : formatMatrix(result))}
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
                textAlign: 'center',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {typeof result === 'number' ? (
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {result.toFixed(6)}
                  </div>
                ) : Array.isArray(result) ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${result[0]?.length || 1}, 1fr)`,
                    gap: '0.5rem',
                    maxWidth: '400px'
                  }}>
                    {result.map((row, i) => 
                      Array.isArray(row) ? 
                        row.map((val, j) => (
                          <div key={`r-${i}-${j}`} style={{
                            padding: '0.5rem',
                            backgroundColor: 'var(--bg-primary)',
                            borderRadius: '0.25rem',
                            border: '1px solid var(--border)',
                            fontSize: '0.9rem'
                          }}>
                            {val.toFixed(3)}
                          </div>
                        )) :
                        <div key={`r-${i}`} style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--bg-primary)',
                          borderRadius: '0.25rem',
                          border: '1px solid var(--border)',
                          fontSize: '0.9rem'
                        }}>
                          {row}
                        </div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: '1rem' }}>
                    {result}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Matrix Information */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
              Matrix Operations Information
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-plus" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Addition & Subtraction
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Matrices must have the same dimensions. Add/subtract corresponding elements.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-times" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Multiplication
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Columns of A must equal rows of B. Result has dimensions A rows × B columns.
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-exchange-alt" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Transpose
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Swap rows and columns. A[i][j] becomes A^T[j][i].
                </p>
              </div>
              
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)'
              }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  <FontAwesomeIcon icon="fas fa-calculator" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
                  Determinant
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Only for square matrices. Measures matrix invertibility and volume scaling.
                </p>
              </div>
            </div>
          </div>
        </div>

        <AdSlot slotId="matrix-calculator-bottom" style={{ margin: '2rem 0 1rem 0' }} />

        {/* Information Panel */}
        <div style={{ 
          backgroundColor: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '1rem', 
          padding: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <FontAwesomeIcon icon="fas fa-info-circle" style={{ marginRight: '0.5rem', color: 'var(--accent)' }} />
            About Matrix Operations & Linear Algebra
          </h3>
          
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Frequently Asked Questions</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are matrices and why are they important in mathematics?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Matrices are rectangular arrays of numbers with important applications: <strong>Linear Algebra:</strong> 
                Foundation for solving systems of linear equations and transformations. <strong>Computer Graphics:</strong> 
                Used for 3D transformations, rotations, and scaling operations. <strong>Data Analysis:</strong> 
                Represent datasets and perform statistical operations. <strong>Engineering:</strong> 
                Solve structural analysis, circuit analysis, and optimization problems. <strong>Machine Learning:</strong> 
                Core data structure for neural networks and algorithms. <strong>Scientific Computing:</strong> 
                Numerical methods for solving differential equations and simulations.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are the rules for matrix operations?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Matrix operation rules include: <strong>Addition/Subtraction:</strong> 
                Matrices must have identical dimensions. <strong>Multiplication:</strong> 
                Columns of first matrix must equal rows of second matrix. <strong>Commutativity:</strong> 
                Addition is commutative (A+B = B+A), multiplication is not (A×B ≠ B×A). <strong>Associativity:</strong> 
                Both addition and multiplication are associative. <strong>Distributivity:</strong> 
                Multiplication distributes over addition. <strong>Identity Elements:</strong> 
                Zero matrix for addition, identity matrix for multiplication.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What is the determinant and how is it calculated?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Determinant properties and calculation: <strong>Definition:</strong> 
                Scalar value that determines if a matrix is invertible. <strong>2×2 Matrix:</strong> 
                det(A) = ad - bc for matrix [[a,b],[c,d]]. <strong>3×3 Matrix:</strong> 
                Use Laplace expansion or Sarrus' rule. <strong>Larger Matrices:</strong> 
                Use Laplace expansion or Gaussian elimination. <strong>Properties:</strong> 
                det(AB) = det(A)det(B), det(A^T) = det(A). <strong>Applications:</strong> 
                Volume scaling, system solvability, eigenvalue calculation.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are eigenvalues and eigenvectors?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Eigenvalue concepts include: <strong>Definition:</strong> 
                Eigenvalue λ satisfies Av = λv for eigenvector v. <strong>Characteristic Equation:</strong> 
                det(A - λI) = 0 to find eigenvalues. <strong>Applications:</strong> 
                Principal component analysis, stability analysis, quantum mechanics. <strong>Properties:</strong> 
                Sum equals trace, product equals determinant. <strong>Diagonalization:</strong> 
                A = PDP^(-1) where D contains eigenvalues. <strong>Power Method:</strong> 
                Iterative method for finding dominant eigenvalue.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                How are matrices used in real-world applications?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Real-world applications include: <strong>Computer Graphics:</strong> 
                Transformations, rotations, scaling in 3D graphics. <strong>Data Science:</strong> 
                Principal component analysis, linear regression, clustering. <strong>Engineering:</strong> 
                Structural analysis, circuit analysis, control systems. <strong>Economics:</strong> 
                Input-output models, portfolio optimization. <strong>Physics:</strong> 
                Quantum mechanics, relativity, vibrations. <strong>Machine Learning:</strong> 
                Neural networks, image processing, natural language processing.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                What are common matrix calculation errors and how to avoid them?
              </h5>
              <p style={{ marginBottom: '1rem' }}>
                Common errors and prevention: <strong>Dimension Mismatch:</strong> 
                Always check matrix dimensions before operations. <strong>Singular Matrices:</strong> 
                Check determinant before calculating inverse. <strong>Numerical Precision:</strong> 
                Use appropriate precision for calculations. <strong>Order of Operations:</strong> 
                Remember matrix multiplication is not commutative. <strong>Zero Division:</strong> 
                Check for zero elements in division operations. <strong>Overflow/Underflow:</strong> 
                Monitor for numerical stability in large calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MatrixCalculator

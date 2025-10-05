import { useState, useCallback } from 'react'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const FakeDataGenerator = () => {
  const [generatedData, setGeneratedData] = useState('')
  const [dataType, setDataType] = useState('person')
  const [quantity, setQuantity] = useState(5)
  const [format, setFormat] = useState('json')
  const [includeFields, setIncludeFields] = useState({
    name: true,
    email: true,
    phone: true,
    address: true,
    company: true,
    job: true,
    age: true,
    birthday: true
  })
  const [generationHistory, setGenerationHistory] = useState([])

  const dataTypes = [
    { id: 'person', name: 'Person', description: 'Personal information', icon: 'fas fa-user' },
    { id: 'company', name: 'Company', description: 'Business information', icon: 'fas fa-building' },
    { id: 'product', name: 'Product', description: 'Product details', icon: 'fas fa-box' },
    { id: 'address', name: 'Address', description: 'Location data', icon: 'fas fa-map-marker-alt' },
    { id: 'credit-card', name: 'Credit Card', description: 'Payment information', icon: 'fas fa-credit-card' },
    { id: 'lorem', name: 'Lorem Ipsum', description: 'Random text content', icon: 'fas fa-paragraph' },
    { id: 'uuid', name: 'UUID', description: 'Unique identifiers', icon: 'fas fa-fingerprint' },
    { id: 'password', name: 'Password', description: 'Secure passwords', icon: 'fas fa-lock' },
    { id: 'date', name: 'Date', description: 'Random dates', icon: 'fas fa-calendar' },
    { id: 'number', name: 'Number', description: 'Random numbers', icon: 'fas fa-calculator' },
    { id: 'email', name: 'Email', description: 'Email addresses', icon: 'fas fa-envelope' },
    { id: 'url', name: 'URL', description: 'Web addresses', icon: 'fas fa-link' }
  ]

  const formats = [
    { id: 'json', name: 'JSON', description: 'JavaScript Object Notation', icon: 'fas fa-code' },
    { id: 'csv', name: 'CSV', description: 'Comma Separated Values', icon: 'fas fa-file-csv' },
    { id: 'xml', name: 'XML', description: 'Extensible Markup Language', icon: 'fas fa-file-code' },
    { id: 'yaml', name: 'YAML', description: 'YAML Ain\'t Markup Language', icon: 'fas fa-file-alt' },
    { id: 'sql', name: 'SQL', description: 'Structured Query Language', icon: 'fas fa-database' },
    { id: 'text', name: 'Text', description: 'Plain text format', icon: 'fas fa-file-text' }
  ]

  const firstNames = [
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna',
    'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle'
  ]

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
    'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
  ]

  const companies = [
    'TechCorp', 'InnovateLab', 'DataFlow', 'CloudSync', 'NextGen', 'FutureSoft',
    'DigitalEdge', 'SmartSolutions', 'CyberCore', 'QuantumTech', 'AlphaBeta', 'GammaDelta',
    'EpsilonZeta', 'ThetaLambda', 'SigmaOmega', 'PrimeTech', 'EliteSoft', 'ProData',
    'MegaCorp', 'SuperSoft', 'UltraTech', 'HyperData', 'MetaSoft', 'NanoTech'
  ]

  const jobTitles = [
    'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer',
    'Marketing Specialist', 'Sales Representative', 'HR Manager', 'Financial Analyst',
    'Project Manager', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer',
    'Full Stack Developer', 'QA Engineer', 'Business Analyst', 'Content Writer',
    'Graphic Designer', 'System Administrator', 'Database Administrator', 'Security Analyst'
  ]

  const domains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com',
    'business.org', 'tech.net', 'startup.io', 'enterprise.com', 'corp.net'
  ]

  const generateRandomData = useCallback((type, count) => {
    const results = []
    
    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'person':
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
          const age = Math.floor(Math.random() * 50) + 18
          const birthday = new Date(2000 - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
          const company = companies[Math.floor(Math.random() * companies.length)]
          const job = jobTitles[Math.floor(Math.random() * jobTitles.length)]
          const domain = domains[Math.floor(Math.random() * domains.length)]
          
          results.push({
            id: i + 1,
            name: `${firstName} ${lastName}`,
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
            phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            age,
            birthday: birthday.toISOString().split('T')[0],
            company,
            job,
            address: `${Math.floor(Math.random() * 9999) + 1} ${['Main', 'Oak', 'Pine', 'Cedar', 'Elm', 'Maple'][Math.floor(Math.random() * 6)]} St, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'][Math.floor(Math.random() * 6)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ', 'PA'][Math.floor(Math.random() * 6)]} ${Math.floor(Math.random() * 90000) + 10000}`
          })
          break

        case 'company':
          const companyName = companies[Math.floor(Math.random() * companies.length)]
          const foundedYear = Math.floor(Math.random() * 30) + 1990
          const employees = Math.floor(Math.random() * 1000) + 10
          
          results.push({
            id: i + 1,
            name: companyName,
            founded: foundedYear,
            employees,
            revenue: `$${(Math.floor(Math.random() * 100) + 1)}M`,
            industry: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education'][Math.floor(Math.random() * 6)],
            website: `https://www.${companyName.toLowerCase()}.com`,
            email: `contact@${companyName.toLowerCase()}.com`,
            phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            address: `${Math.floor(Math.random() * 9999) + 1} ${['Business', 'Corporate', 'Enterprise', 'Professional', 'Executive', 'Commerce'][Math.floor(Math.random() * 6)]} Blvd, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'][Math.floor(Math.random() * 6)]}, ${['NY', 'CA', 'IL', 'TX', 'AZ', 'PA'][Math.floor(Math.random() * 6)]} ${Math.floor(Math.random() * 90000) + 10000}`
          })
          break

        case 'product':
          const productNames = ['ProMax', 'UltraTech', 'SmartCore', 'ElitePro', 'PrimeMax', 'SuperTech', 'MegaPro', 'HyperCore']
          const productName = productNames[Math.floor(Math.random() * productNames.length)]
          const category = ['Electronics', 'Software', 'Hardware', 'Accessories', 'Gadgets', 'Tools'][Math.floor(Math.random() * 6)]
          const price = Math.floor(Math.random() * 1000) + 10
          
          results.push({
            id: i + 1,
            name: productName,
            category,
            price: `$${price}`,
            sku: `SKU-${Math.floor(Math.random() * 900000) + 100000}`,
            description: `High-quality ${category.toLowerCase()} product with advanced features`,
            brand: companies[Math.floor(Math.random() * companies.length)],
            inStock: Math.random() > 0.3,
            rating: (Math.random() * 2 + 3).toFixed(1),
            reviews: Math.floor(Math.random() * 1000) + 1
          })
          break

        case 'address':
          const streetNames = ['Main', 'Oak', 'Pine', 'Cedar', 'Elm', 'Maple', 'First', 'Second', 'Third', 'Fourth']
          const streetTypes = ['St', 'Ave', 'Blvd', 'Rd', 'Dr', 'Ln', 'Way', 'Ct']
          const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
          const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA']
          
          results.push({
            id: i + 1,
            street: `${Math.floor(Math.random() * 9999) + 1} ${streetNames[Math.floor(Math.random() * streetNames.length)]} ${streetTypes[Math.floor(Math.random() * streetTypes.length)]}`,
            city: cities[Math.floor(Math.random() * cities.length)],
            state: states[Math.floor(Math.random() * states.length)],
            zipCode: Math.floor(Math.random() * 90000) + 10000,
            country: 'United States',
            coordinates: {
              latitude: (Math.random() * 180 - 90).toFixed(6),
              longitude: (Math.random() * 360 - 180).toFixed(6)
            }
          })
          break

        case 'credit-card':
          const cardTypes = ['Visa', 'Mastercard', 'American Express', 'Discover']
          const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)]
          const cardNumber = generateCreditCardNumber(cardType)
          
          results.push({
            id: i + 1,
            type: cardType,
            number: cardNumber,
            cvv: Math.floor(Math.random() * 900) + 100,
            expiryMonth: Math.floor(Math.random() * 12) + 1,
            expiryYear: new Date().getFullYear() + Math.floor(Math.random() * 10) + 1,
            holderName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
          })
          break

        case 'lorem':
          const loremWords = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua']
          const wordCount = Math.floor(Math.random() * 20) + 5
          const words = []
          
          for (let j = 0; j < wordCount; j++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
          }
          
          results.push({
            id: i + 1,
            text: words.join(' ').charAt(0).toUpperCase() + words.join(' ').slice(1) + '.',
            wordCount: wordCount
          })
          break

        case 'uuid':
          results.push({
            id: i + 1,
            uuid: generateUUID()
          })
          break

        case 'password':
          const length = Math.floor(Math.random() * 10) + 8
          results.push({
            id: i + 1,
            password: generatePassword(length),
            length
          })
          break

        case 'date':
          const startDate = new Date(2020, 0, 1)
          const endDate = new Date()
          const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))
          
          results.push({
            id: i + 1,
            date: randomDate.toISOString().split('T')[0],
            timestamp: randomDate.getTime(),
            formatted: randomDate.toLocaleDateString()
          })
          break

        case 'number':
          const min = Math.floor(Math.random() * 100)
          const max = min + Math.floor(Math.random() * 1000) + 100
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
          
          results.push({
            id: i + 1,
            number: randomNum,
            min,
            max,
            type: 'integer'
          })
          break

        case 'email':
          const firstName2 = firstNames[Math.floor(Math.random() * firstNames.length)]
          const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)]
          const domain2 = domains[Math.floor(Math.random() * domains.length)]
          
          results.push({
            id: i + 1,
            email: `${firstName2.toLowerCase()}.${lastName2.toLowerCase()}@${domain2}`,
            username: `${firstName2.toLowerCase()}.${lastName2.toLowerCase()}`,
            domain: domain2
          })
          break

        case 'url':
          const protocols = ['https://', 'http://']
          const subdomains = ['www', 'api', 'blog', 'shop', 'app', 'admin']
          const domains3 = ['example.com', 'test.org', 'demo.net', 'sample.io', 'mock.co']
          const paths = ['', '/page', '/article', '/product', '/user', '/dashboard']
          
          results.push({
            id: i + 1,
            url: `${protocols[Math.floor(Math.random() * protocols.length)]}${subdomains[Math.floor(Math.random() * subdomains.length)]}.${domains3[Math.floor(Math.random() * domains3.length)]}${paths[Math.floor(Math.random() * paths.length)]}`,
            protocol: protocols[Math.floor(Math.random() * protocols.length)].replace('://', ''),
            domain: domains3[Math.floor(Math.random() * domains3.length)],
            subdomain: subdomains[Math.floor(Math.random() * subdomains.length)]
          })
          break

        default:
          results.push({ id: i + 1, data: 'Unknown data type' })
      }
    }
    
    return results
  }, [])

  const generateCreditCardNumber = (type) => {
    const prefixes = {
      'Visa': ['4'],
      'Mastercard': ['5'],
      'American Express': ['34', '37'],
      'Discover': ['6']
    }
    
    const prefix = prefixes[type][Math.floor(Math.random() * prefixes[type].length)]
    let number = prefix
    
    for (let i = prefix.length; i < 15; i++) {
      number += Math.floor(Math.random() * 10)
    }
    
    return number
  }

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const generatePassword = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
  }

  const formatData = (data, formatType) => {
    switch (formatType) {
      case 'json':
        return JSON.stringify(data, null, 2)
      
      case 'csv':
        if (data.length === 0) return ''
        const headers = Object.keys(data[0]).join(',')
        const rows = data.map(item => Object.values(item).join(','))
        return [headers, ...rows].join('\n')
      
      case 'xml':
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n'
        data.forEach(item => {
          xml += '  <item>\n'
          Object.entries(item).forEach(([key, value]) => {
            xml += `    <${key}>${value}</${key}>\n`
          })
          xml += '  </item>\n'
        })
        xml += '</data>'
        return xml
      
      case 'yaml':
        let yaml = ''
        data.forEach((item, index) => {
          yaml += `item_${index + 1}:\n`
          Object.entries(item).forEach(([key, value]) => {
            yaml += `  ${key}: ${value}\n`
          })
          yaml += '\n'
        })
        return yaml
      
      case 'sql':
        if (data.length === 0) return ''
        const tableName = dataType
        const columns = Object.keys(data[0])
        let sql = `CREATE TABLE ${tableName} (\n`
        sql += columns.map(col => `  ${col} VARCHAR(255)`).join(',\n')
        sql += '\n);\n\n'
        
        data.forEach(item => {
          const values = Object.values(item).map(val => `'${val}'`).join(', ')
          sql += `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values});\n`
        })
        return sql
      
      case 'text':
        return data.map(item => Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n')).join('\n\n')
      
      default:
        return JSON.stringify(data, null, 2)
    }
  }

  const handleGenerate = useCallback(() => {
    const data = generateRandomData(dataType, quantity)
    const formatted = formatData(data, format)
    setGeneratedData(formatted)

    // Add to history
    const historyItem = {
      dataType,
      quantity,
      format: format,
      timestamp: new Date().toISOString(),
      preview: formatted.substring(0, 100) + '...'
    }
    setGenerationHistory(prev => [historyItem, ...prev.slice(0, 9)])
  }, [dataType, quantity, format, generateRandomData])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setGeneratedData('')
  }

  const clearHistory = () => {
    setGenerationHistory([])
  }

  const loadFromHistory = (historyItem) => {
    setDataType(historyItem.dataType)
    setQuantity(historyItem.quantity)
    setFormat(historyItem.format)
  }

  const removeFromHistory = (index) => {
    setGenerationHistory(prev => prev.filter((_, i) => i !== index))
  }

  const downloadData = () => {
    const blob = new Blob([generatedData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fake-data-${dataType}-${new Date().toISOString().split('T')[0]}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="tool-container">
      {/* Main Tool Interface */}
      <div className="tool-card">
        <div className="tool-header">
          <div className="tool-icon">
            <FontAwesomeIcon icon="fas fa-database" />
          </div>
          <div className="tool-title-section">
            <h2 className="tool-title">Fake Data Generator</h2>
            <p className="tool-subtitle">Generate realistic fake data for testing and development 🎲</p>
          </div>
        </div>

        {/* Configuration Section */}
        <div className="config-section">
          <div className="config-row">
            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-list" className="label-icon" />
                Data Type
              </label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="config-select"
              >
                {dataTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} - {type.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-hashtag" className="label-icon" />
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                min="1"
                max="100"
                className="config-input"
              />
            </div>

            <div className="config-item">
              <label className="config-label">
                <FontAwesomeIcon icon="fas fa-file-code" className="label-icon" />
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="config-select"
              >
                {formats.map(fmt => (
                  <option key={fmt.id} value={fmt.id}>
                    {fmt.name} - {fmt.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button onClick={handleGenerate} className="generate-btn">
            <FontAwesomeIcon icon="fas fa-magic" />
            Generate Data
          </button>
        </div>

        {/* Output Section */}
        {generatedData && (
          <div className="output-section">
            <div className="output-header">
              <h3 className="output-title">
                <FontAwesomeIcon icon="fas fa-check-circle" className="title-icon" />
                Generated Data
              </h3>
              <div className="output-actions">
                <button onClick={() => copyToClipboard(generatedData)} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-copy" />
                  Copy Data
                </button>
                <button onClick={downloadData} className="btn-secondary">
                  <FontAwesomeIcon icon="fas fa-download" />
                  Download
                </button>
              </div>
            </div>
            <div className="output-display">
              <pre className="output-text">{generatedData}</pre>
            </div>
          </div>
        )}

        {/* Generation History */}
        {generationHistory.length > 0 && (
          <div className="history-section">
            <div className="history-header">
              <h3 className="history-title">
                <FontAwesomeIcon icon="fas fa-history" className="title-icon" />
                Generation History
              </h3>
              <button onClick={clearHistory} className="clear-history-btn">
                <FontAwesomeIcon icon="fas fa-trash" />
                Clear History
              </button>
            </div>
            <div className="history-list">
              {generationHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-content" onClick={() => loadFromHistory(item)}>
                    <div className="history-info">
                      <span className="history-type">
                        {dataTypes.find(t => t.id === item.dataType)?.name}
                      </span>
                      <span className="history-quantity">{item.quantity} items</span>
                      <span className="history-format">{item.format.toUpperCase()}</span>
                    </div>
                    <div className="history-preview">{item.preview}</div>
                    <div className="history-time">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromHistory(index)}
                    className="remove-history-btn"
                  >
                    <FontAwesomeIcon icon="fas fa-times" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={clearAll} className="btn-secondary">
            <FontAwesomeIcon icon="fas fa-trash" />
            Clear All
          </button>
        </div>
      </div>

      {/* Tool Information */}
      <div className="info-card">
        <h3 className="info-title">
          <FontAwesomeIcon icon="fas fa-info-circle" className="title-icon" />
          About Fake Data Generator
        </h3>
        <div className="info-content">
          <p>
            Our Fake Data Generator is a powerful tool for developers, testers, and content creators 
            who need realistic sample data. Generate up to 100 items of various data types including 
            personal information, company details, products, addresses, and more.
          </p>
          <p>
            Perfect for testing applications, creating mock APIs, populating databases, or generating 
            sample content. All data is generated locally in your browser with no external dependencies 
            or data transmission, ensuring complete privacy and security.
          </p>
          <p>
            The tool supports multiple output formats including JSON, CSV, XML, YAML, SQL, and plain text, 
            making it easy to integrate the generated data into your projects regardless of your tech stack.
          </p>
        </div>
      </div>

      {/* How to Use */}
      <div className="how-to-card">
        <h3 className="how-to-title">
          <FontAwesomeIcon icon="fas fa-play-circle" className="title-icon" />
          How to Use Fake Data Generator
        </h3>
        <div className="steps-list">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Select Data Type</h4>
              <p>Choose from 12 different data types including person, company, product, address, and more.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Configure Settings</h4>
              <p>Set the quantity (1-100 items) and choose your preferred output format.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Generate & Use</h4>
              <p>Click "Generate Data" to create your fake data. Copy or download the results.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-card">
        <h3 className="features-title">
          <FontAwesomeIcon icon="fas fa-star" className="title-icon" />
          Key Features
        </h3>
        <div className="features-grid">
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-database" className="feature-icon" />
            <h4>12 Data Types</h4>
            <p>Person, company, product, address, credit card, UUID, password, and more</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-file-code" className="feature-icon" />
            <h4>6 Output Formats</h4>
            <p>JSON, CSV, XML, YAML, SQL, and plain text formats</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-shield-alt" className="feature-icon" />
            <h4>Privacy First</h4>
            <p>All data generated locally in your browser, no external requests</p>
          </div>
          <div className="feature">
            <FontAwesomeIcon icon="fas fa-download" className="feature-icon" />
            <h4>Download Support</h4>
            <p>Download generated data as files for easy integration</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="use-cases-card">
        <h3 className="use-cases-title">
          <FontAwesomeIcon icon="fas fa-lightbulb" className="title-icon" />
          Popular Use Cases
        </h3>
        <div className="use-cases-grid">
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-code" className="use-case-icon" />
            <h4>Development Testing</h4>
            <p>Generate test data for applications, APIs, and databases</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-chart-bar" className="use-case-icon" />
            <h4>Data Analysis</h4>
            <p>Create sample datasets for analysis and visualization</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-file-alt" className="use-case-icon" />
            <h4>Content Creation</h4>
            <p>Generate realistic content for demos and presentations</p>
          </div>
          <div className="use-case">
            <FontAwesomeIcon icon="fas fa-database" className="use-case-icon" />
            <h4>Database Seeding</h4>
            <p>Populate databases with realistic test data</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tool-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .tool-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 2rem;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .tool-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .tool-icon {
          font-size: 2.5rem;
          opacity: 0.9;
        }

        .tool-title-section {
          flex: 1;
        }

        .tool-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .tool-subtitle {
          font-size: 1.1rem;
          margin: 0.5rem 0 0 0;
          opacity: 0.9;
          font-weight: 300;
        }

        .config-section, .output-section, .history-section {
          position: relative;
          z-index: 1;
          margin-bottom: 2rem;
        }

        .config-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .config-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .config-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .label-icon {
          opacity: 0.8;
        }

        .config-select, .config-input {
          padding: 0.75rem;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          color: white;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .config-select:focus, .config-input:focus {
          outline: none;
          border-color: rgba(255,255,255,0.5);
        }

        .config-select option {
          background: #333;
          color: white;
        }

        .generate-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255,107,107,0.4);
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,107,0.6);
        }

        .output-title, .history-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .title-icon {
          opacity: 0.8;
        }

        .output-header, .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .output-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.3);
          border-color: rgba(255,255,255,0.5);
        }

        .output-display {
          background: rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          max-height: 400px;
          overflow-y: auto;
        }

        .output-text {
          color: white;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .clear-history-btn {
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .clear-history-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 1rem;
          backdrop-filter: blur(10px);
        }

        .history-content {
          flex: 1;
          cursor: pointer;
        }

        .history-info {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .history-type {
          font-weight: 600;
        }

        .history-quantity, .history-format {
          opacity: 0.8;
        }

        .history-preview {
          font-size: 0.8rem;
          opacity: 0.7;
          margin-bottom: 0.25rem;
        }

        .history-time {
          font-size: 0.8rem;
          opacity: 0.6;
        }

        .remove-history-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          background: #ef4444;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .remove-history-btn:hover {
          transform: scale(1.1);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .info-card, .how-to-card, .features-card, .use-cases-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        .info-title, .how-to-title, .features-title, .use-cases-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 600;
        }

        .title-icon {
          color: var(--accent);
        }

        .info-content {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .info-content p {
          margin-bottom: 1rem;
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .step {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .step-number {
          background: linear-gradient(45deg, var(--accent), #667eea);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .step-content h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .step-content p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .features-grid, .use-cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .feature, .use-case {
          text-align: center;
          padding: 1.5rem;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .feature:hover, .use-case:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .feature-icon, .use-case-icon {
          font-size: 2rem;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .feature h4, .use-case h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .feature p, .use-case p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .tool-container {
            padding: 1rem;
          }
          
          .config-row {
            grid-template-columns: 1fr;
          }
          
          .output-header, .history-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .output-actions {
            flex-wrap: wrap;
          }
          
          .history-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .remove-history-btn {
            align-self: flex-end;
          }
          
          .history-info {
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  )
}

export default FakeDataGenerator

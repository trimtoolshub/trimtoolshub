import { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getToolBySlug } from '../tools/registryData.js'
import { getToolComponent } from '../tools/registryComponents.jsx'
import SEO from '../components/SEO'
import AdSlot from '../components/AdSlot'
import FAQ from '../components/FAQ'
import RelatedTools from '../components/RelatedTools'
import ToolDescription from '../components/ToolDescription'

const ToolPage = () => {
  const { slug } = useParams()
  const tool = getToolBySlug(slug)
  const ToolComponent = getToolComponent(slug)

  if (!tool) {
    return (
      <>
        <SEO 
          title="Tool Not Found | TrimToolsHub"
          description="The tool you're looking for doesn't exist on TrimToolsHub."
          canonical="/tools/not-found"
        />
        <div className="container" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h1>Tool Not Found</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            The tool you're looking for doesn't exist.
          </p>
          <Link 
            to="/tools"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem'
            }}
          >
            Browse All Tools
          </Link>
        </div>
      </>
    )
  }

  // Generate FAQ data based on tool type
  const generateFAQs = (tool) => {
    const baseFAQs = [
      {
        question: `What is ${tool.name}?`,
        answer: `${tool.name} is a free online tool that ${tool.shortDescription.toLowerCase()}. It's designed to help users quickly and efficiently complete their tasks without requiring any software installation.`
      },
      {
        question: `How do I use ${tool.name}?`,
        answer: `Simply enter your input data in the provided field, adjust any settings or options as needed, and click the process button. The tool will instantly generate your results, which you can then copy or download.`
      },
      {
        question: `Is ${tool.name} free to use?`,
        answer: `Yes, ${tool.name} is completely free to use. There are no hidden fees, registration requirements, or usage limits. You can use it as many times as you need.`
      },
      {
        question: `Is my data secure when using ${tool.name}?`,
        answer: `Yes, your data is processed locally in your browser and is not stored on our servers. We prioritize user privacy and data security in all our tools.`
      }
    ]

    // Add category-specific FAQs
    if (tool.category === 'developer') {
      baseFAQs.push({
        question: `Can I integrate ${tool.name} into my application?`,
        answer: `While this is a web-based tool, you can use the same algorithms and methods in your own applications. Check the tool's implementation for reference.`
      })
    }

    if (tool.category === 'youtube') {
      baseFAQs.push({
        question: `Does this tool work with private YouTube videos?`,
        answer: `No, this tool only works with public YouTube videos. Private or unlisted videos cannot be accessed through our tools.`
      })
    }

    return baseFAQs
  }

  const faqs = generateFAQs(tool)

  const structuredData = {
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.shortDescription,
    url: `https://www.trimtoolshub.com/tools/${tool.slug}`,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Free to use',
      'No registration required',
      'Instant processing',
      'Secure and private',
      'Works in any browser'
    ]
  }

  return (
    <>
      <SEO 
        title={`${tool.name} – Free Online Tool | TrimToolsHub`}
        description={tool.shortDescription}
        canonical={`/tools/${tool.slug}`}
        structuredData={structuredData}
        keywords={tool.keywords}
        toolName={tool.name}
      />
      
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <nav style={{ marginBottom: '1rem' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Home
            </Link>
            {' > '}
            <Link to="/tools" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Tools
            </Link>
            {' > '}
            <span style={{ color: 'var(--text-primary)' }}>{tool.name}</span>
          </nav>
          
          <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            {tool.name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            {tool.shortDescription}
          </p>
        </div>

        <AdSlot slotId="1234567891" style={{ margin: '1rem 0', maxWidth: '728px' }} />

        {/* Tool Description */}
        <ToolDescription tool={tool} />

        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '0.75rem', padding: '2rem', marginBottom: '2rem' }}>
          <Suspense fallback={
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              Loading tool...
            </div>
          }>
            {ToolComponent ? <ToolComponent /> : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                  This tool is coming soon!
                </p>
              </div>
            )}
          </Suspense>
        </div>

        <AdSlot slotId="1234567892" style={{ margin: '1rem 0', maxWidth: '728px' }} />

        {/* FAQ Section */}
        <FAQ faqs={faqs} />

        {/* Related Tools */}
        <RelatedTools currentToolId={tool.id} currentCategory={tool.category} />
      </div>
    </>
  )
}

export default ToolPage

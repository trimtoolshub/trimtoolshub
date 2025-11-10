import { Helmet } from 'react-helmet-async'

const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogImage = '/favicon.ico',
  ogType = 'website',
  structuredData = null,
  keywords = [],
  toolName = null,
  toolCategory = null,
  toolSlug = null,
  faqs = null,
  breadcrumbs = null
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.trimtoolshub.com'
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  // Generate enhanced title for tool pages
  const enhancedTitle = toolName 
    ? `${toolName} | Free Online Tool – TrimToolsHub`
    : title

  // Generate enhanced description for tool pages
  const enhancedDescription = toolName
    ? `Use ${toolName} online for free. ${description} No registration required. Fast, secure, and easy to use.`
    : description

  // Auto-generate SoftwareApplication structured data for tool pages
  const generateToolStructuredData = () => {
    if (!toolName || !toolSlug) return null
    
    const categoryMap = {
      'text': 'TextApplication',
      'file': 'FileApplication', 
      'design': 'DesignApplication',
      'seo': 'SEOApplication',
      'youtube': 'VideoApplication',
      'developer': 'DeveloperApplication',
      'math': 'MathApplication',
      'security': 'SecurityApplication',
      'image': 'ImageApplication'
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": toolName,
      "applicationCategory": categoryMap[toolCategory] || "WebApplication",
      "operatingSystem": "Web",
      "url": `${siteUrl}/tools/${toolSlug}`,
      "description": enhancedDescription,
      "offers": { 
        "@type": "Offer", 
        "price": "0", 
        "priceCurrency": "USD" 
      },
      "provider": {
        "@type": "Organization",
        "name": "TrimToolsHub",
        "url": siteUrl
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "150"
      }
    }
  }

  // Generate FAQPage structured data
  const generateFAQStructuredData = () => {
    if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  }

  // Generate BreadcrumbList structured data
  const generateBreadcrumbStructuredData = () => {
    if (!breadcrumbs || !Array.isArray(breadcrumbs) || breadcrumbs.length === 0) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`
      }))
    }
  }

  // Combine all structured data
  const allStructuredData = [
    structuredData || generateToolStructuredData(),
    generateFAQStructuredData(),
    generateBreadcrumbStructuredData()
  ].filter(Boolean)

  // Use provided structured data or auto-generate for tools
  const finalStructuredData = allStructuredData.length > 0 ? allStructuredData : null

  return (
    <Helmet>
      <title>{enhancedTitle}</title>
      <meta name="description" content={enhancedDescription} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={enhancedTitle} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="TrimToolsHub" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={enhancedTitle} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="TrimToolsHub" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data */}
      {finalStructuredData && (
        <>
          {Array.isArray(finalStructuredData) ? (
            finalStructuredData.map((schema, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(schema)}
              </script>
            ))
          ) : (
            <script type="application/ld+json">
              {JSON.stringify(finalStructuredData)}
            </script>
          )}
        </>
      )}
    </Helmet>
  )
}

export default SEO

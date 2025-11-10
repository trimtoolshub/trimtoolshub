import { Helmet } from 'react-helmet-async'

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://trimtoolshub.com'

export const generatePageTitle = (title, siteName = 'TrimToolsHub') => {
  if (!title) return siteName
  return `${title} | ${siteName}`
}

export const generateMetaDescription = (description, defaultDesc = 'Free online tools for developers, designers, and content creators. Text processing, data conversion, and utility tools.') => {
  return description || defaultDesc
}

export const generateCanonicalUrl = (path = '') => {
  return `${siteUrl}${path}`
}

export const generateJsonLd = (data) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TrimToolsHub',
    description: 'Free online tools for developers, designers, and content creators',
    url: siteUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'TrimToolsHub'
    }
  }

  return { ...baseSchema, ...data }
}

export const SEOHead = ({ 
  title, 
  description, 
  canonical, 
  jsonLd,
  keywords = [],
  ogImage = `${siteUrl}/og-image.jpg`
}) => {
  const pageTitle = generatePageTitle(title)
  const metaDescription = generateMetaDescription(description)
  const canonicalUrl = canonical ? generateCanonicalUrl(canonical) : generateCanonicalUrl()
  const jsonLdData = jsonLd ? generateJsonLd(jsonLd) : generateJsonLd()

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TrimToolsHub" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>
    </Helmet>
  )
}

export default SEOHead

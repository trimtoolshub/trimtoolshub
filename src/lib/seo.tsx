import { Helmet } from 'react-helmet-async';

const siteUrl = import.meta.env.VITE_SITE_URL || 'https://trimtoolshub.com';

export const generatePageTitle = (title: string, siteName = 'TrimToolsHub'): string => {
  if (!title) return siteName;
  return `${title} | ${siteName}`;
};

export const generateMetaDescription = (
  description: string,
  defaultDesc = 'Free online PDF tools, QR code generator, and CAD/SketchUp viewer and converter. Merge, split, compress PDFs. Generate QR codes. View DXF and SKP files. Convert between DWG, DXF, and SKP formats. All tools run in your browser with complete privacy.'
): string => {
  return description || defaultDesc;
};

export const generateCanonicalUrl = (path = ''): string => {
  return `${siteUrl}${path}`;
};

export const generateJsonLd = (data?: Record<string, unknown>): Record<string, unknown> => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TrimToolsHub',
    description: 'Free online PDF tools, QR code generator, and CAD/SketchUp viewer and converter. All tools run in your browser with complete privacy.',
    url: siteUrl,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'TrimToolsHub',
    },
  };

  return { ...baseSchema, ...data };
};

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  jsonLd?: Record<string, unknown>;
  keywords?: string[];
  ogImage?: string;
}

export const SEOHead = ({
  title,
  description,
  canonical,
  jsonLd,
  keywords = [],
  ogImage = `${siteUrl}/og-image.jpg`,
}: SEOHeadProps) => {
  const pageTitle = generatePageTitle(title);
  const metaDescription = generateMetaDescription(description);
  const canonicalUrl = canonical ? generateCanonicalUrl(canonical) : generateCanonicalUrl();
  const jsonLdData = jsonLd ? generateJsonLd(jsonLd) : generateJsonLd();

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
      <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
    </Helmet>
  );
};

export default SEOHead;


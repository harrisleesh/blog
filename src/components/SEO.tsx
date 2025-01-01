import Head from 'next/head'
import { siteConfig } from '@/config/seo'

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title, 
  description, 
  image, 
  url,
  type = 'website'
}: SEOProps) {
  const seoTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title
  const seoDescription = description || siteConfig.description
  const seoImage = image || `${siteConfig.url}/og-image.png`
  const seoUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  return (
    <Head>
      {/* 기본 메타태그 */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="author" content={siteConfig.author} />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={siteConfig.title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteConfig.social.twitter} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Head>
  )
} 
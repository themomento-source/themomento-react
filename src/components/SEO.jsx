import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website', 
  author, 
  publishedTime, 
  modifiedTime,
  tags = [],
  structuredData = null
}) => {
  // Clean description - remove HTML tags and limit length
  const cleanDescription = description
    ?.replace(/<[^>]+>/g, '')
    .slice(0, 160)
    .trim();

  // Ensure image has full URL
  const fullImageUrl = image?.startsWith('http') 
    ? image 
    : image 
      ? `${window.location.origin}${image}`
      : `${window.location.origin}/default-social-image.jpg`;

  // Current URL
  const currentUrl = url || window.location.href;

  // Default structured data for blog posts
  const defaultStructuredData = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": cleanDescription,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": author || "The Momento"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Momento",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "headline": title,
    "description": cleanDescription,
    "image": fullImageUrl
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet prioritizeSeoTags>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={cleanDescription} />
      <meta name="author" content={author || "The Momento"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="The Momento" />
      <meta property="og:locale" content="en_US" />
      
      {type === 'article' && (
        <>
          <meta property="article:author" content={author || "The Momento"} />
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@themomento" />
      <meta name="twitter:creator" content="@themomento" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1f2937" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>

      {/* Additional Open Graph Tags for Better Social Sharing */}
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* Facebook App ID (if you have one) */}
      {/* <meta property="fb:app_id" content="your-facebook-app-id" /> */}
      
      {/* Additional Twitter Tags */}
      <meta name="twitter:domain" content={window.location.hostname} />
      
      {/* Pinterest Rich Pins */}
      <meta name="pinterest-rich-pin" content="true" />
    </Helmet>
  );
};

export default SEO;
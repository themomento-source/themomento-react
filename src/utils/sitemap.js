// Sitemap utility for SEO
export const generateSitemap = (baseUrl, routes = []) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/bloglisting</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/photolisting</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  ${routes.map(route => `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq || 'weekly'}</changefreq>
    <priority>${route.priority || 0.7}</priority>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

// Generate robots.txt content
export const generateRobotsTxt = (baseUrl) => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow important pages
Allow: /blog/
Allow: /photo/
Allow: /about/
Allow: /contact/

# Crawl delay (optional)
Crawl-delay: 1`;
};
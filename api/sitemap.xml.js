export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Set Content-Type
  res.setHeader('Content-Type', 'application/xml');
  
  // Add Cache-Control header
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  
  // Send response with status and XML content
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>https://calgaryacademicexcellence.com</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- College Admissions Calculator - High Priority -->
  <url>
    <loc>https://calgaryacademicexcellence.com/college-admissions-calculator</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  
  <!-- GPA Calculator - High Priority Tool -->
  <url>
    <loc>https://calgaryacademicexcellence.com/gpa-calculator</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- About & Info Pages -->
  <url>
    <loc>https://calgaryacademicexcellence.com/about</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.com/resources</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  
  <!-- Blog -->
  <url>
    <loc>https://calgaryacademicexcellence.com/blog</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- LEGAL PAGES - REQUIRED FOR ADSENSE -->
  <url>
    <loc>https://calgaryacademicexcellence.com/privacy-policy</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.com/terms-of-service</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.com/contact-us</loc>
    <lastmod>2025-12-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
</urlset>`);
}

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
    <loc>https://calgaryacademicexcellence.vercel.app</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- College Admissions Calculator - High Priority -->
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/college-admissions-calculator</loc>
    <lastmod>2025-12-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  
  <!-- GPA Calculator - High Priority Tool -->
  <url>
	<loc>https://calgaryacademicexcellence.vercel.app/gpa-calculator</loc>
	<lastmod>2025-12-29</lastmod>
	<changefreq>monthly</changefreq>
	<priority>0.9</priority>
  </url>
  
  <!-- About & Info Pages -->
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/about</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/resources</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  
  <!-- Blog -->
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/blog</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- CRITICAL: Legal Pages for AdSense -->
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/privacy-policy</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/contact</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/terms-of-service</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Add individual blog posts here as you create them -->
  <!-- Example:
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/blog/how-to-prepare-for-digital-sat</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  -->
</urlset>`);
}

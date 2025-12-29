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
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
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
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/blog</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/college-predictor</loc>
    <lastmod>2024-12-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`);
}
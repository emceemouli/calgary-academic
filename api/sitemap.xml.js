export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app</loc>
    <lastmod>2024-03-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/about</loc>
    <lastmod>2024-03-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/resources</loc>
    <lastmod>2024-03-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://calgaryacademicexcellence.vercel.app/blog</loc>
    <lastmod>2024-03-13</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`);
  res.end();
}
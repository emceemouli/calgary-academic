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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Main Pages -->
  <url>
    <loc>https://calgaryacademicexcellence.com</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/" />
  </url>
  
  <!-- Elite ChanceMe Calculator - NEW STAR PAGE (Priority boosted to 0.95) -->
  <url>
    <loc>https://calgaryacademicexcellence.com/elite-chance-me</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/elite-chance-me" />
  </url>
  
  <!-- College Admissions Calculator - High Priority -->
  <url>
    <loc>https://calgaryacademicexcellence.com/college-admissions-calculator</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.92</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
  </url>
  
  <!-- GPA Calculator - High Priority Tool -->
  <url>
    <loc>https://calgaryacademicexcellence.com/gpa-calculator</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/gpa-calculator" />
  </url>
  
  <!-- Graduate Admissions Calculator - NEW PAGE ADDED -->
  <url>
    <loc>https://calgaryacademicexcellence.com/graduate-admissions-calculator</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.88</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/graduate-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/graduate-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/graduate-admissions-calculator" />
  </url>
  
  <!-- Blog -->
  <url>
    <loc>https://calgaryacademicexcellence.com/blog</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  
  <!-- About & Info Pages -->
  <url>
    <loc>https://calgaryacademicexcellence.com/resources</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.82</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.com/about</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.com/contact-us</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.72</priority>
  </url>
  
  <!-- LEGAL PAGES - REQUIRED FOR ADSENSE -->
  <url>
    <loc>https://calgaryacademicexcellence.com/privacy-policy</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.com/terms-of-service</loc>
    <lastmod>2026-01-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
</urlset>`);
}

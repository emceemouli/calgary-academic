export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Set Content-Type for XML
  res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
  
  // Add Cache-Control header (24 hours)
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  
  // Current date for lastmod
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Send response with status and enhanced XML content
  res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- ========================================
       HOMEPAGE - TOP PRIORITY
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <!-- International alternate pages -->
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/" />
  </url>
  
  <!-- ========================================
       ELITE CHANCEME CALCULATOR - NEW STAR PAGE
       Priority: 0.95 (Highest after homepage)
       Target: Harvard, MIT, Stanford, Ivy League admissions
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/elite-chance-me</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <!-- International alternate pages - Critical for global reach -->
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/elite-chance-me" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/elite-chance-me" />
  </url>
  
  <!-- ========================================
       COLLEGE ADMISSIONS CALCULATOR
       Priority: 0.92 (Main undergraduate tool)
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/college-admissions-calculator</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.92</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/college-admissions-calculator" />
  </url>
  
  <!-- ========================================
       GPA CALCULATOR - HIGH VALUE TOOL
       Priority: 0.9 (Critical for international students)
       Target: CBSE to GPA, percentage to GPA, IB to GPA
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/gpa-calculator</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="en-gb" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="en-in" href="https://calgaryacademicexcellence.com/gpa-calculator" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/gpa-calculator" />
  </url>
  
  <!-- ========================================
       GRADUATE ADMISSIONS CALCULATOR
       Priority: 0.88 (Master's & PhD programs)
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/graduate-admissions-calculator</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.88</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="https://calgaryacademicexcellence.com/graduate-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="en-ca" href="https://calgaryacademicexcellence.com/graduate-admissions-calculator" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://calgaryacademicexcellence.com/graduate-admissions-calculator" />
  </url>
  
  <!-- ========================================
       BLOG - HIGH UPDATE FREQUENCY
       Priority: 0.85 (Content marketing hub)
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  
  <!-- ========================================
       RESOURCES PAGE
       Priority: 0.82 (SAT/ACT prep resources)
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/resources</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.82</priority>
  </url>
  
  <!-- ========================================
       ABOUT PAGE
       Priority: 0.75
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>
  
  <!-- ========================================
       CONTACT PAGE
       Priority: 0.72
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/contact-us</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.72</priority>
  </url>
  
  <!-- ========================================
       LEGAL PAGES - REQUIRED FOR ADSENSE
       Priority: 0.5 (Required but low traffic)
       ======================================== -->
  <url>
    <loc>https://calgaryacademicexcellence.com/privacy-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://calgaryacademicexcellence.com/terms-of-service</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
</urlset>`);
}

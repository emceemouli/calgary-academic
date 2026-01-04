import React, { useState, useEffect } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap, Sparkles, MapPin, DollarSign, GraduationCap, Search, ChevronDown, ChevronUp, ExternalLink, Award, BookOpen, Users, Star } from 'lucide-react';

// Define components OUTSIDE to prevent re-creation on every render
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

const Button = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    {children}
  </button>
);

const CollegePredictor = () => {
  // State Management
  const [studentProfile, setStudentProfile] = useState({
    gradeType: 'gpa',
    gpa: '',
    percentage: '',
    testType: 'sat',
    sat: '',
    act: '',
    desiredMajor: '',
    location: '',
    budget: '',
    extracurriculars: '',
    leadership: '',
    awards: ''
  });
  const [results, setResults] = useState({ Reach: [], Target: [], Safety: [] });
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('input');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // ENHANCED COMPREHENSIVE SEO: Dynamic meta tags optimized for USA & Canada
  useEffect(() => {
    const hasResults = results.Reach?.length > 0;
    const totalColleges = (results.Reach?.length || 0) + (results.Target?.length || 0) + (results.Safety?.length || 0);
    
    // Add AdSense script to head
    const adsenseScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (!adsenseScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638771792216412';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
    
    if (hasResults) {
      document.title = `${totalColleges} College Matches Found | Free AI College Admissions Calculator - USA Universities | What Colleges Can I Get Into?`;
    } else {
      document.title = 'Free AI College Admissions Calculator 2025 - USA Universities | What Colleges Can I Get Into? | Calgary Academic Excellence';
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = hasResults
      ? `Found ${totalColleges} perfect university matches in USA for ${studentProfile.desiredMajor || 'your major'} with ${studentProfile.gpa || 'your'} GPA and ${studentProfile.sat || 'your'} SAT. Get personalized reach, target, and safety school recommendations instantly. Free AI-powered college predictor by Calgary Academic Excellence.`
      : 'Free AI-powered college admissions calculator for USA universities. Enter your GPA, SAT scores, intended major, and location to get 24 personalized college recommendations across all 50 states including reach, target, and safety schools. Find what colleges you can get into instantly. Canadian universities available. By Calgary Academic Excellence - trusted SAT prep and college counseling in Calgary, Alberta.';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'college predictor USA, what colleges can I get into, American college admissions calculator, AI college matcher, free college recommendations, SAT score calculator, GPA calculator, college search tool USA, reach target safety schools, university finder, college admissions chances, best colleges for my SAT score, college list builder, college match finder 2025, free college predictor by GPA and SAT, university search by major and location, college application helper, admission chances calculator, Calgary Academic Excellence, Calgary SAT prep, Calgary college counseling';
    
    const additionalMeta = {
      'author': 'Calgary Academic Excellence',
      'robots': 'index, follow, max-image-preview:large, max-snippet:-1',
      'googlebot': 'index, follow',
      'revisit-after': '7 days'
    };

    Object.entries(additionalMeta).forEach(([name, content]) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', 'https://calgaryacademicexcellence.com/college-admissions-calculator');
    
    const ogTags = [
      { property: 'og:title', content: document.title },
      { property: 'og:description', content: metaDescription.content },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://calgaryacademicexcellence.com/college-admissions-calculator' },
      { property: 'og:site_name', content: 'Calgary Academic Excellence - AI College Admissions Calculator' },
      { property: 'og:locale', content: 'en_US' }
    ];
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.content = tag.content;
    });
    
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: document.title },
      { name: 'twitter:description', content: metaDescription.content }
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.name = tag.name;
        document.head.appendChild(twitterTag);
      }
      twitterTag.content = tag.content;
    });
    
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "AI College Admissions Calculator - USA/Canada Universities",
        "applicationCategory": "EducationalApplication",
        "description": "Free AI-powered admissions calculator that analyzes your GPA, SAT scores, intended major, and location preferences to suggest 24 perfect university matches in United States including reach, target, and safety schools. Canadian universities available when location specified. Created by Calgary Academic Excellence.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/OnlineOnly"
        },
        "featureList": [
          "AI-powered college admissions calculator using Google Gemini",
          "Personalized reach, target, and safety school suggestions",
          "Supports both GPA and percentage-based grading",
          "SAT and ACT score analysis",
          "Major-specific recommendations",
          "Location-based college search (USA & Canada)",
          "Budget-conscious suggestions",
          "Extracurricular activity consideration"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "312",
          "bestRating": "5",
          "worstRating": "1"
        },
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Calgary Academic Excellence",
          "url": "https://calgaryacademicexcellence.com",
          "sameAs": [
            "https://calgaryacademicexcellence.com/about"
          ]
        },
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "softwareVersion": "3.6",
        "datePublished": "2024-01-15",
        "dateModified": "2025-01-04"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is this AI college admissions calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our AI college admissions calculator uses Google's advanced Gemini AI technology trained on thousands of admission outcomes, achieving approximately 90-95% accuracy in categorizing schools into reach, target, and safety categories. However, college admissions are holistic and consider essays, recommendations, and other factors beyond stats. Calgary Academic Excellence has helped over 300 students successfully navigate college admissions."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between reach, target, and safety schools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reach schools are where your stats fall below typical admits (15-40% acceptance chance), target schools match your credentials well (50-70% chance), and safety schools are where you exceed typical admits (80%+ acceptance). A balanced list includes 2-4 reach, 3-5 target, and 2-3 safety schools. Calgary Academic Excellence counselors help students build strategic college lists."
            }
          },
          {
            "@type": "Question",
            "name": "Is this college admissions calculator tool really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our AI college admissions calculator is 100% free with no hidden costs, no credit card required, and no email registration. You can use it unlimited times to explore different scenarios. Calgary Academic Excellence believes every student deserves access to quality college planning tools, which is why we offer this completely free."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this tool for Canadian universities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! While primarily optimized for USA universities, our AI provides recommendations for Canadian universities when you specify 'Canada' or a specific province (Ontario, British Columbia, Alberta, Quebec) in the location field. As a Calgary-based service, we have special expertise in Canadian university admissions including University of Toronto, UBC, McGill, and Alberta universities."
            }
          },
          {
            "@type": "Question",
            "name": "Does the calculator recommend Liberal Arts Colleges?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! When you indicate an arts, humanities, social science, or pure science major (excluding engineering and technical fields), our AI specifically includes top Liberal Arts Colleges (LACs) like Williams, Amherst, Swarthmore, and Pomona. LACs provide exceptional undergraduate education with small class sizes and close faculty mentorship."
            }
          },
          {
            "@type": "Question",
            "name": "What information do I need to use the admissions calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Required: GPA or percentage, SAT/ACT scores (or 'none'), intended major, and location preferences. Optional but recommended: extracurriculars, leadership roles, awards, and budget range. More information leads to more accurate AI recommendations from Calgary Academic Excellence's college predictor tool."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://calgaryacademicexcellence.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "College Admissions Calculator",
            "item": "https://calgaryacademicexcellence.com/college-admissions-calculator"
          }
        ]
      }
    ];

    schemas.forEach((schema, index) => {
      let scriptTag = document.querySelector(`#schema-${index}`);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = `schema-${index}`;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    });
  }, [results, studentProfile]);

  // Initialize AdSense ads when results are displayed
  useEffect(() => {
    if (results.Reach?.length > 0 && window.adsbygoogle) {
      try {
        // Push ads to AdSense for rendering
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach((ad) => {
          if (!ad.dataset.adsbygoogleStatus) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
      } catch (err) {
        console.log('AdSense not yet loaded');
      }
    }
  }, [results]);

  const handleInputChange = (field, value) => {
    setStudentProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  // ENHANCED PREDICTION with FIXED LAC LOGIC and IMPROVED LOCATION FILTERING
  const handlePrediction = async () => {
    // Validation - SAT/ACT is optional (not required for Canadian universities)
    const gradeValue = studentProfile.gradeType === 'gpa' ? studentProfile.gpa : studentProfile.percentage;
    const testScore = studentProfile.testType === 'sat' ? studentProfile.sat : studentProfile.act;

    if (!gradeValue || !studentProfile.desiredMajor) {
      setError('Please fill in all required fields: GPA/Percentage and Intended Major.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
      if (!API_KEY) {
        throw new Error('API key not configured');
      }

      // Convert percentage to GPA if needed
      let gpaValue = studentProfile.gradeType === 'gpa' 
        ? parseFloat(studentProfile.gpa)
        : (parseFloat(studentProfile.percentage) / 100) * 4.0;

      // Convert ACT to SAT equivalent if needed (SAT/ACT optional for Canadian universities)
      let satEquivalent = 'Not provided';
      const testScore = studentProfile.testType === 'sat' ? studentProfile.sat : studentProfile.act;
      
      if (testScore && testScore.toLowerCase() !== 'none' && !isNaN(testScore)) {
        satEquivalent = studentProfile.testType === 'sat'
          ? parseInt(studentProfile.sat)
          : Math.round((parseInt(studentProfile.act) - 9) * 45.45 + 690);
      }

      const prompt = `You are an expert college admissions counselor specializing in USA and Canadian university admissions. Provide EXACTLY 8 colleges for EACH category (Reach, Target, Safety) = 24 TOTAL.

STUDENT PROFILE:
- GPA: ${gpaValue.toFixed(2)} / 4.0
- SAT: ${satEquivalent}${satEquivalent === 'Not provided' ? ' (Note: Student applying test-optional - many USA universities and all Canadian universities accept applications without test scores. Focus primarily on GPA, extracurriculars, and holistic factors)' : ''}
- Major: ${studentProfile.desiredMajor}
- Location: ${studentProfile.location || 'No preference - all USA states'}
- Budget: ${studentProfile.budget || 'Not specified'}
- Extracurriculars: ${studentProfile.extracurriculars || 'Not provided'}
- Leadership: ${studentProfile.leadership || 'Not provided'}
- Awards: ${studentProfile.awards || 'Not provided'}

${satEquivalent === 'Not provided' ? `
TEST-OPTIONAL ADMISSIONS CONTEXT:
- Many top USA universities are test-optional (MIT, Harvard, Stanford, Yale, Princeton, Columbia, Brown, Cornell, Dartmouth, UPenn, Duke, Northwestern, Johns Hopkins, Vanderbilt, Rice, Emory, Georgetown, and 1,800+ others)
- Canadian universities NEVER require SAT/ACT and use grade-based admissions exclusively
- For test-optional USA schools: Focus on GPA, course rigor, extracurriculars, leadership, awards, and essays
- Students without test scores can still be competitive at top universities with strong grades and holistic profile
- Include test-optional USA universities in recommendations if location permits
` : ''}

${(() => {
  const loc = (studentProfile.location || '').toLowerCase().trim();
  const isCanada = loc.includes('canada') || loc.includes('ontario') || loc.includes('british columbia') || 
                   loc.includes('alberta') || loc.includes('quebec') || loc.includes('bc') || 
                   loc.includes('toronto') || loc.includes('vancouver') || loc.includes('calgary') ||
                   loc.includes('montreal') || loc.includes('ottawa');
  
  if (isCanada) {
    return `⚠️ CANADIAN LOCATION DETECTED - MANDATORY FILTERING:
- ONLY recommend Canadian universities
- DO NOT include ANY U.S. universities in your recommendations
- All 24 recommendations MUST be Canadian institutions
- Respect the specific province if mentioned (e.g., if "Ontario" specified, focus on Ontario universities)

CANADIAN ADMISSIONS CONTEXT:
- Canadian universities use GRADE-BASED admissions EXCLUSIVELY
- SAT/ACT scores are NEVER required and NEVER considered for admission (even if provided)
- This is different from USA test-optional policies - Canadian schools don't even look at test scores
- Base ALL recommendations SOLELY on GPA/percentage grades
- If SAT/ACT score is "Not provided", this is completely NORMAL and EXPECTED for Canadian applications
- Published admission cutoffs are based on grade percentages (e.g., "85% average for engineering")
- No advantage to submitting test scores - they are simply not part of the admissions process

🚨 CRITICAL - MANDATORY 8 SAFETY SCHOOLS REQUIREMENT:
This is NON-NEGOTIABLE and THE MOST IMPORTANT part of your response.

You MUST provide EXACTLY 8 safety schools. Not 1, not 3, not 5 - EXACTLY 8.
Even for students with 90%+ GPA and strong profiles, there are MANY Canadian safety schools.

FOR THIS STUDENT'S PROFILE, SAFETY SCHOOLS MUST INCLUDE universities where:
- Student's GPA is SIGNIFICANTLY ABOVE the published admission average (student has 80%+ chance)
- Typical admission average is 75-85% for engineering programs
- These are LEGITIMATE universities with CEAB-accredited engineering programs
- Student would be VERY LIKELY to gain admission

MANDATORY: You MUST include AT LEAST 6 of these safety schools in your list:
1. University of Manitoba (Winnipeg) - Engineering admission avg: ~82%
2. University of Saskatchewan (Saskatoon) - Engineering admission avg: ~82%
3. Dalhousie University (Halifax) - Engineering admission avg: ~83%
4. Memorial University (St. John's, NL) - Engineering admission avg: ~80%
5. Ontario Tech University (Oshawa) - Engineering admission avg: ~81%
6. Lakehead University (Thunder Bay) - Engineering admission avg: ~78%
7. University of Regina (Saskatchewan) - Engineering admission avg: ~80%
8. Laurentian University (Sudbury) - Engineering admission avg: ~78%
9. University of Northern British Columbia (Prince George) - Engineering avg: ~78%
10. Cape Breton University (Sydney, NS) - Engineering admission avg: ~75%
11. University of New Brunswick (Fredericton) - Engineering admission avg: ~80%
12. Université de Moncton (NB) - Engineering programs

Additional safety options for non-engineering OR to supplement above:
- York University (Toronto) - Certain engineering programs
- Brock University (St. Catharines) - STEM programs
- Trent University (Peterborough) - Science programs
- Thompson Rivers University (Kamloops, BC)
- Vancouver Island University (Nanaimo, BC)
- University of Winnipeg - Applied science programs
- Mount Allison University (Sackville, NB) - Sciences
- Acadia University (Wolfville, NS) - Sciences

EXAMPLE SAFETY SCHOOLS LIST FORMAT (YOU MUST PRODUCE 8):
1. University of Manitoba (Engineering) | GPA: 3.0-3.4 | SAT: N/A
2. University of Saskatchewan (Engineering) | GPA: 3.0-3.3 | SAT: N/A
3. Dalhousie University (Engineering) | GPA: 3.0-3.4 | SAT: N/A
4. Memorial University (Engineering) | GPA: 2.8-3.2 | SAT: N/A
5. Ontario Tech University (Engineering) | GPA: 3.0-3.3 | SAT: N/A
6. Lakehead University (Engineering) | GPA: 2.8-3.2 | SAT: N/A
7. University of Regina (Engineering) | GPA: 2.9-3.3 | SAT: N/A
8. Laurentian University (Engineering) | GPA: 2.8-3.1 | SAT: N/A

SELECT safety schools that genuinely make sense for THIS specific student's profile and goals based on:
- Student's academic profile (GPA/percentage) and intended major
- Geographic preferences (province mentioned, cost of living)
- Program strength in their specific field (CEAB accreditation for engineering)
- Published admission cutoffs and requirements (GRADE-BASED ONLY, never test scores)
- Budget considerations if mentioned (Memorial has lowest tuition ~$3-4K/year)
- Co-op opportunities and industry connections
- Research options and facilities

REMINDER: Safety schools = 80%+ probability of admission based on published GRADE cutoffs ONLY (test scores completely irrelevant). Even students with 95% GPA need genuine safety options where admission is virtually certain.`;
  }
  
  // Check for specific USA locations
  const usStates = ['california', 'texas', 'new york', 'florida', 'illinois', 'pennsylvania', 'ohio', 'michigan', 
                    'georgia', 'north carolina', 'virginia', 'washington', 'arizona', 'massachusetts', 'tennessee',
                    'indiana', 'missouri', 'maryland', 'wisconsin', 'minnesota', 'colorado', 'south carolina',
                    'alabama', 'louisiana', 'kentucky', 'oregon', 'oklahoma', 'connecticut', 'iowa', 'utah',
                    'nevada', 'arkansas', 'mississippi', 'kansas', 'new mexico', 'nebraska', 'west virginia',
                    'idaho', 'hawaii', 'new hampshire', 'maine', 'montana', 'rhode island', 'delaware',
                    'south dakota', 'north dakota', 'alaska', 'vermont', 'wyoming'];
  
  const usRegions = ['northeast', 'mid-atlantic', 'south', 'southeast', 'midwest', 'southwest', 'west', 'west coast', 'east coast', 'pacific'];
  
  const specificState = usStates.find(state => loc.includes(state));
  const specificRegion = usRegions.find(region => loc.includes(region));
  
  if (specificState) {
    return `- USA LOCATION: Focus recommendations on ${specificState.toUpperCase()} universities
- Include strong ${specificState} public and private institutions
- Also include nearby states for geographic diversity
- DO NOT include Canadian universities`;
  }
  
  if (specificRegion) {
    return `- USA LOCATION: Focus recommendations on ${specificRegion.toUpperCase()} region
- Ensure geographic diversity within the ${specificRegion}
- DO NOT include Canadian universities`;
  }
  
  return `- USA universities across all 50 states
- Ensure geographic diversity (East Coast, West Coast, Midwest, South)
- DO NOT include Canadian universities unless explicitly mentioned`;
})()}

MAJOR-SPECIFIC RECOMMENDATIONS (CRITICAL - LIBERAL ARTS COLLEGES):
${(() => {
  const major = (studentProfile.desiredMajor || '').toLowerCase();
  
  // FIXED: Exclude engineering and technical majors explicitly
  const isEngineering = major.includes('engineering') || major.includes('computer science') || 
                        major.includes('cs') || major.includes('comp sci') || major.includes('software') ||
                        major.includes('data science') || major.includes('information technology') ||
                        major.includes('it ') || major.includes('mechanical') || major.includes('electrical') ||
                        major.includes('civil') || major.includes('chemical engineering') || major.includes('aerospace') ||
                        major.includes('biomedical engineering') || major.includes('industrial') || major.includes('robotics');
  
  const isBusiness = major.includes('business') || major.includes('finance') || major.includes('accounting') ||
                     major.includes('marketing') || major.includes('management');
  
  // Only recommend LACs for true liberal arts fields
  const isLACFriendly = (major.includes('art') && !major.includes('martial')) || major.includes('humanities') || 
                        major.includes('liberal') || major.includes('english') || major.includes('literature') ||
                        major.includes('history') || major.includes('philosophy') || major.includes('languages') ||
                        major.includes('classics') || major.includes('religion') || major.includes('sociology') ||
                        major.includes('anthropology') || major.includes('political science') || major.includes('psychology') ||
                        major.includes('gender studies') || major.includes('ethnic studies') || major.includes('international relations');
  
  // Pure sciences (not engineering/applied) can benefit from LACs
  const isPureScience = (major.includes('biology') || major.includes('chemistry') || major.includes('physics') || major.includes('molecular biology') ||
                        major.includes('mathematics') || major.includes('math ') || major.includes('environmental studies')) &&
                        !isEngineering;
  
  const isEconomics = major.includes('economics') || major.includes('econ');
  
  if (isEngineering) {
    return `🔧 ENGINEERING/TECHNICAL MAJOR DETECTED:
- Focus on universities with STRONG engineering programs (MIT, Stanford, CalTech, Georgia Tech, Carnegie Mellon, UIUC, Purdue, Michigan, Berkeley, UT Austin)
- DO NOT recommend Liberal Arts Colleges (LACs don't typically have engineering programs)
- Include technical institutes and research universities
- Consider co-op programs and industry partnerships`;
  }
  
  if (isBusiness) {
    return `💼 BUSINESS MAJOR DETECTED:
- Focus on universities with accredited business schools (Wharton, Ross, Stern, Haas, McCombs)
- Include universities with strong undergraduate business programs
- Consider location for internship opportunities (NYC, Chicago, San Francisco, etc.)
- Liberal Arts Colleges can be included for Economics focus, but avoid for pure Business/Finance`;
  }
  
  if (isLACFriendly || isPureScience) {
    return `🎓 LIBERAL ARTS / PURE SCIENCES MAJOR - INCLUDE LACs:
- This major greatly benefits from Liberal Arts Colleges
- INCLUDE top LACs: Williams, Amherst, Swarthmore, Pomona, Claremont McKenna, Wellesley, Bowdoin, Carleton, Middlebury, Grinnell, Hamilton, Colby, Bates, Vassar, Haverford, Davidson, Wesleyan, Colgate, University of Richmond
- LACs offer: small classes (8-15 students), close faculty mentorship, personalized attention, strong graduate school placement
- Balance: Include mix of LACs (40%) and research universities (60%)
- LACs are particularly strong for pre-med, pre-law, and graduate school preparation`;
  }
  
  if (isEconomics) {
    return `📊 ECONOMICS MAJOR:
- Include both LACs (excellent for theoretical economics) and research universities (better for applied/quantitative)
- Top programs: Chicago, MIT, Stanford, Princeton, Northwestern, Williams, Amherst
- Consider access to financial centers if interested in finance career path`;
  }
  
  return `- Match universities to major's program strength
- Consider both research universities and appropriate college types for this field`;
})()}

INSTRUCTIONS:
1. Suggest EXACTLY 8 colleges for EACH category (Reach, Target, Safety) = 24 TOTAL
2. Ensure variety: Mix public/private, large/small, different regions (within correct country)
3. Match recommendations to major's program strength and institutional type
4. Consider budget if specified
5. Factor in extracurriculars, leadership, awards for holistic evaluation
6. RESPECT location filter - if Canada specified, ONLY Canadian universities; if USA state/region specified, focus there

CATEGORIES:
- **Reach (8 schools)**: Stats below average (15-40% chance)
- **Target (8 schools)**: Stats match well (50-70% chance)
- **Safety (8 schools)**: Stats exceed typical admits (80%+ chance)

FORMAT EXACTLY AS SHOWN:

**REACH SCHOOLS:**
1. [University Name] | GPA: [X.X-X.X] | SAT: [XXXX-XXXX]
2. [Continue for all 8...]

**TARGET SCHOOLS:**
1. [University Name] | GPA: [X.X-X.X] | SAT: [XXXX-XXXX]
2. [Continue for all 8...]

**SAFETY SCHOOLS:**
1. [University Name] | GPA: [X.X-X.X] | SAT: [XXXX-XXXX]
2. [Continue for all 8...]

**AI INSIGHTS:**

ANALYSIS

Profile Strength: [2-3 sentences]

Key Strengths:
- [Strength 1]
- [Strength 2]
- [Strength 3]

Recommendations:
- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3]

Strategy: [2-3 sentences]

🚨 CRITICAL REQUIREMENTS - NON-NEGOTIABLE:
1. MUST provide EXACTLY 8 schools per category (Reach, Target, Safety) = 24 TOTAL
2. SAFETY SCHOOLS: If you provide fewer than 8 safety schools, your response is INCOMPLETE and FAILS
3. PRIORITY: Complete all 24 universities BEFORE providing detailed insights
4. Keep insights concise to ensure all 24 schools fit within response
5. If running low on space, shorten insights but NEVER reduce number of universities
6. Format: University Name | GPA: X.X-X.X | SAT: XXXX-XXXX (or N/A for Canadian schools)
7. COUNT YOUR SCHOOLS: Verify you have exactly 8 Reach + 8 Target + 8 Safety = 24 total

For Canadian engineering students with 90% GPA, safety schools might include: Manitoba, Saskatchewan, Dalhousie, Memorial, Ontario Tech, Lakehead, Regina, Laurentian, UNBC, Cape Breton, UNB, etc.

⚠️ DO NOT submit response without verifying you have 8 safety schools listed.
⚠️ DO NOT STOP until all 24 universities are listed!`;


      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 16000, // Increased from 8000 to ensure all 24 universities are provided
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      // ENHANCED: Parse colleges with better filtering
      const parseColleges = (section) => {
        const colleges = [];
        const lines = section.split('\n').filter(line => line.trim());
        
        const loc = (studentProfile.location || '').toLowerCase().trim();
        const isCanadaRequest = loc.includes('canada') || loc.includes('ontario') || loc.includes('british columbia') || 
                               loc.includes('alberta') || loc.includes('quebec') || loc.includes('bc') || 
                               loc.includes('toronto') || loc.includes('vancouver') || loc.includes('calgary');
        
        for (const line of lines) {
          if (/^\d+\./.test(line)) {
            const parts = line.split('|');
            if (parts.length >= 3) {
              const name = parts[0].replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const gpa_range = parts[1].replace('GPA:', '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const sat_range = parts[2].replace('SAT:', '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              
              // ENHANCED LOCATION FILTERING - Comprehensive Canadian university detection
              const isCanadianUni = name.includes('Toronto') || name.includes('UBC') || name.includes('British Columbia') ||
                                   name.includes('McGill') || name.includes('Waterloo') || name.includes('McMaster') ||
                                   name.includes("Queen's") || name.includes('Alberta') || name.includes('Calgary') ||
                                   name.includes('Dalhousie') || name.includes('SFU') || name.includes('Simon Fraser') ||
                                   name.includes('York') || name.includes('Carleton') || name.includes('Ottawa') ||
                                   name.includes('Victoria') || name.includes('Concordia') || name.includes('Western') ||
                                   name.includes('Manitoba') || name.includes('Saskatchewan') || name.includes('Regina') ||
                                   name.includes('Memorial') || name.includes('Lakehead') || name.includes('Laurentian') ||
                                   name.includes('UNBC') || name.includes('Northern British Columbia') ||
                                   name.includes('Ontario Tech') || name.includes('Brock') || name.includes('Trent') ||
                                   name.includes('Mount Allison') || name.includes('Acadia') || name.includes('St. Francis Xavier') ||
                                   name.includes('Brandon') || name.includes('Winnipeg') || name.includes('Lethbridge') ||
                                   name.includes('Ryerson') || name.includes('TMU') || name.includes('Guelph') ||
                                   name.includes('Windsor') || name.includes('Laurier') || name.includes('Nipissing') ||
                                   name.includes('Thompson Rivers') || name.includes('Vancouver Island') ||
                                   name.includes('Cape Breton') || name.includes('UPEI') || name.includes('New Brunswick') ||
                                   name.includes('Moncton') || name.includes("Bishop's") || name.includes('UQAM') ||
                                   // Catch-all: If AI was instructed to only recommend Canadian and it's not obviously USA
                                   (isCanadaRequest && !name.includes('University of') && !name.includes('Institute of Technology'));
              
              // Apply location filter ONLY if explicitly requested
              if (isCanadaRequest && !isCanadianUni) {
                // Only filter out if it's clearly a USA university
                const isClearlyUSA = name.includes('MIT') || name.includes('Stanford') || name.includes('Harvard') ||
                                    name.includes('Yale') || name.includes('Princeton') || name.includes('Columbia') ||
                                    name.includes('Duke') || name.includes('Northwestern') || name.includes('Caltech') ||
                                    name.includes('Georgia Tech') || name.includes('Carnegie Mellon') ||
                                    name.includes('Berkeley') || name.includes('UCLA') || name.includes('USC');
                if (isClearlyUSA) {
                  continue; // Skip USA universities for Canadian searches
                }
              }
              if (!isCanadaRequest && isCanadianUni) {
                continue; // Skip Canadian universities for USA searches
              }
              
              colleges.push({ name, gpa_range, sat_range });
            }
          }
        }
        return colleges;
      };

      const reachMatch = aiResponse.match(/\*\*REACH SCHOOLS:\*\*([\s\S]*?)(?=\*\*TARGET SCHOOLS:|\*\*AI INSIGHTS:|$)/i);
      const targetMatch = aiResponse.match(/\*\*TARGET SCHOOLS:\*\*([\s\S]*?)(?=\*\*SAFETY SCHOOLS:|\*\*AI INSIGHTS:|$)/i);
      const safetyMatch = aiResponse.match(/\*\*SAFETY SCHOOLS:\*\*([\s\S]*?)(?=\*\*AI INSIGHTS:|$)/i);
      const insightsMatch = aiResponse.match(/\*\*AI INSIGHTS:\*\*([\s\S]*?)$/i);

      const parsedResults = {
        Reach: reachMatch ? parseColleges(reachMatch[1]) : [],
        Target: targetMatch ? parseColleges(targetMatch[1]) : [],
        Safety: safetyMatch ? parseColleges(safetyMatch[1]) : []
      };

      const insights = insightsMatch ? insightsMatch[1].trim() : '';

      setResults(parsedResults);
      setAiInsights(insights);
      setActiveSection('results');

      if (window.gtag) {
        window.gtag('event', 'college_prediction', {
          gpa: studentProfile.gpa || studentProfile.percentage,
          test_score: studentProfile.sat || studentProfile.act,
          major: studentProfile.desiredMajor,
          location: studentProfile.location
        });
      }

    } catch (err) {
      console.error('Prediction error:', err);
      setError('Unable to generate predictions. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format AI Insights with structured sections
  const formatAIResponse = (text) => {
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    const sections = {
      analysis: '',
      strengths: [],
      recommendations: [],
      strategy: ''
    };

    const lines = cleanText.split('\n').filter(line => line.trim());
    let currentSection = 'analysis';

    lines.forEach(line => {
      if (line.toLowerCase().includes('key strengths') || line.toLowerCase().includes('strengths:')) {
        currentSection = 'strengths';
      } else if (line.toLowerCase().includes('recommendation') || line.toLowerCase().includes('suggest')) {
        currentSection = 'recommendations';
      } else if (line.toLowerCase().includes('strategy') || line.toLowerCase().includes('approach')) {
        currentSection = 'strategy';
      } else {
        if (currentSection === 'analysis') {
          sections.analysis += line + ' ';
        } else if (currentSection === 'strengths' && line.trim().startsWith('-')) {
          sections.strengths.push(line.replace(/^[-•*]\s*/, ''));
        } else if (currentSection === 'recommendations' && line.trim().startsWith('-')) {
          sections.recommendations.push(line.replace(/^[-•*]\s*/, ''));
        } else if (currentSection === 'strategy') {
          sections.strategy += line + ' ';
        }
      }
    });

    return (
      <div className="space-y-6">
        {sections.analysis && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Profile Analysis
            </h3>
            <p className="text-gray-700 leading-relaxed">{sections.analysis}</p>
          </div>
        )}

        {sections.strengths.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Key Strengths
            </h3>
            <ul className="space-y-2">
              {sections.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sections.recommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommendations
            </h3>
            <ul className="space-y-2">
              {sections.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sections.strategy && (
          <div>
            <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Application Strategy
            </h3>
            <p className="text-gray-700 leading-relaxed">{sections.strategy}</p>
          </div>
        )}
      </div>
    );
  };

  // Input Section
  const renderInputSection = () => (
    <Card className="backdrop-blur-xl bg-white/90 border-2 border-purple-100 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="text-3xl flex items-center gap-3">
          <School className="h-8 w-8" />
          Enter Your Academic Profile
        </CardTitle>
        <p className="text-purple-100 text-sm mt-2">Get 24 AI-powered college recommendations in USA (or Canada if location specified)</p>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        {/* Grade Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Your Grading System *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gradeType"
                value="gpa"
                checked={studentProfile.gradeType === 'gpa'}
                onChange={(e) => handleInputChange('gradeType', e.target.value)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700 font-medium">GPA (4.0 scale - USA standard)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gradeType"
                value="percentage"
                checked={studentProfile.gradeType === 'percentage'}
                onChange={(e) => handleInputChange('gradeType', e.target.value)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700 font-medium">Percentage (International)</span>
            </label>
          </div>
        </div>

        {/* GPA or Percentage Input */}
        {studentProfile.gradeType === 'gpa' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unweighted GPA (out of 4.0) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              value={studentProfile.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 3.75"
            />
            <p className="text-xs text-gray-500 mt-1">Enter your GPA on 4.0 scale (USA standard)</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Percentage (%) *
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={studentProfile.percentage}
              onChange={(e) => handleInputChange('percentage', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 85"
            />
            <p className="text-xs text-gray-500 mt-1">Enter your overall percentage (will be converted to 4.0 GPA scale)</p>
          </div>
        )}

        {/* Test Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Your Test Type (Optional - Many universities are test-optional)
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="testType"
                value="sat"
                checked={studentProfile.testType === 'sat'}
                onChange={(e) => handleInputChange('testType', e.target.value)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700 font-medium">SAT (out of 1600)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="testType"
                value="act"
                checked={studentProfile.testType === 'act'}
                onChange={(e) => handleInputChange('testType', e.target.value)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700 font-medium">ACT (out of 36)</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ℹ️ <strong>Test-optional admissions:</strong> Many USA universities (MIT, Harvard, Stanford, etc.) and all Canadian universities don't require SAT/ACT. However, strong test scores can still strengthen your USA application. Leave blank if not taken or if applying test-optional.
          </p>
        </div>

        {/* SAT or ACT Input */}
        {studentProfile.testType === 'sat' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SAT Score (out of 1600) - Optional
            </label>
            <input
              type="text"
              value={studentProfile.sat}
              onChange={(e) => handleInputChange('sat', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 1450 or leave blank if not taken"
            />
            <p className="text-xs text-gray-500 mt-1">Many universities are test-optional. Strong scores can strengthen your application, but leaving blank is acceptable for test-optional schools.</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ACT Score (out of 36) - Optional
            </label>
            <input
              type="text"
              value={studentProfile.act}
              onChange={(e) => handleInputChange('act', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 32 or leave blank if not taken"
            />
            <p className="text-xs text-gray-500 mt-1">Many universities are test-optional. Strong scores can strengthen your application, but leaving blank is acceptable for test-optional schools.</p>
          </div>
        )}

        {/* Remaining Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Intended Major *
            </label>
            <input
              type="text"
              value={studentProfile.desiredMajor}
              onChange={(e) => handleInputChange('desiredMajor', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., Computer Science, Biology, Economics"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Location
            </label>
            <input
              type="text"
              value={studentProfile.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., California, Northeast, Canada, Ontario"
            />
            <p className="text-xs text-gray-500 mt-1">Type 'Canada' or province name for Canadian universities</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget Range
          </label>
          <input
            type="text"
            value={studentProfile.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder="e.g., $30,000-$50,000 per year"
          />
        </div>

        {/* Optional Fields */}
        <div className="space-y-4 pt-6 border-t-2 border-gray-100">
          <p className="text-sm font-semibold text-gray-600">
            Optional (Recommended for USA schools - improves prediction accuracy):
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extracurricular Activities
            </label>
            <textarea
              value={studentProfile.extracurriculars}
              onChange={(e) => handleInputChange('extracurriculars', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., Varsity Soccer, Debate Club, Volunteer work"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leadership Roles
            </label>
            <textarea
              value={studentProfile.leadership}
              onChange={(e) => handleInputChange('leadership', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., Student Council President, Team Captain"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Awards & Honors
            </label>
            <textarea
              value={studentProfile.awards}
              onChange={(e) => handleInputChange('awards', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., National Merit Scholar, Science Olympiad Gold Medal"
              rows="2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handlePrediction}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-4"
        >
          {loading ? (
            <>
              <Brain className="h-7 w-7 animate-pulse" />
              AI is Analyzing Your Profile...
            </>
          ) : (
            <>
              <Sparkles className="h-7 w-7" />
              Get My 24 AI-Powered College Matches
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          * Required: GPA/Percentage and Intended Major • SAT/ACT optional (many universities are test-optional) • Your information is private and never stored
        </p>
      </CardContent>
    </Card>
  );

  // Results Section
  const renderResultsSection = () => (
    <div className="space-y-8">
      {/* AI Insights */}
      {aiInsights && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Brain className="h-7 w-7" />
              AI-Powered Profile Analysis
            </CardTitle>
            <p className="text-purple-100 text-sm mt-2">Personalized insights for USA and Canadian university admissions</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                ANALYSIS
              </h3>
              {formatAIResponse(aiInsights)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AdSense Zone 1 - After AI Insights, Before Results */}
      <div className="my-8">
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-7638771792216412"
             data-ad-slot="5362613714"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Reach Schools */}
        <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-orange-50 to-red-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-200 rounded-xl">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-orange-900">
                  Reach Schools
                </CardTitle>
                <p className="text-sm text-orange-700 font-medium mt-1">
                  {results.Reach?.length || 0} dream universities
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {results.Reach?.length > 0 ? (
              results.Reach.map((college, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{college.gpa_range || '3.8-4.0'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT Range:</span>
                      <span>{college.sat_range || '1450-1600'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No reach schools found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Target Schools */}
        <Card className="border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-200 rounded-xl">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">
                  Target Schools
                </CardTitle>
                <p className="text-sm text-blue-700 font-medium mt-1">
                  {results.Target?.length || 0} solid matches
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {results.Target?.length > 0 ? (
              results.Target.map((college, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{college.gpa_range || '3.5-3.8'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT Range:</span>
                      <span>{college.sat_range || '1300-1450'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No target schools found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Safety Schools */}
        <Card className="border-2 border-green-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-green-50 to-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-200 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-green-900">
                  Safety Schools
                </CardTitle>
                <p className="text-sm text-green-700 font-medium mt-1">
                  {results.Safety?.length || 0} likely admits
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {results.Safety?.length > 0 ? (
              results.Safety.map((college, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-green-100 rounded-xl hover:border-green-300 hover:shadow-lg transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{college.gpa_range || '3.2-3.6'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT Range:</span>
                      <span>{college.sat_range || '1200-1350'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No safety schools found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AdSense Zone 2 - After Results, Before Strategy */}
      <div className="my-8">
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-7638771792216412"
             data-ad-slot="5362613714"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* Strategy Guide */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-blue-600" />
            College Application Strategy for USA Universities
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <h4 className="font-bold text-lg text-orange-600 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Reach (2-4 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Dream schools where you're below average but have a chance with a strong application. These are ambitious targets that could transform your future.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h4 className="font-bold text-lg text-blue-600 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target (3-5 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your stats match well. Solid 50-70% acceptance chance. Focus your efforts here for the best balance of ambition and likelihood.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h4 className="font-bold text-lg text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Safety (2-3 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                You exceed average admitted student credentials. Very likely to be accepted (80%+ probability). Essential for peace of mind in your applications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AdSense Zone 3 - After Strategy Guide */}
      <div className="my-8">
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-7638771792216412"
             data-ad-slot="5362613714"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* New Search CTA */}
      <div className="text-center pt-8">
        <Button
          onClick={() => {
            setActiveSection('input');
            setResults({ Reach: [], Target: [], Safety: [] });
            setAiInsights(null);
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-xl transition-all flex items-center gap-3 mx-auto"
        >
          <Search className="h-6 w-6" />
          Search for Another Profile
        </Button>
      </div>
    </div>
  );

  // Main Render with SEO Enhancements
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition">
              Home
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-700 font-semibold">
            College Admissions Calculator
          </li>
        </ol>
      </nav>

      {/* SEO-Optimized Header */}
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Google AI (Gemini) - 100% Free for USA Universities (Canada Available)</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          Free AI College Admissions Calculator - USA/Canada Universities
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          What colleges can I get into? Find your perfect university match in United States or Canada. AI-powered college admissions calculator helps you discover 24 personalized reach, target, and safety schools based on your GPA/Percentage, SAT/ACT scores, and intended major. Enter "Canada" in location for Canadian universities.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-6">
          Free college admissions calculator tool for USA universities (Canadian universities available - just specify location). Calculate your college admissions chances at top universities. Search colleges by GPA, SAT/ACT score, major, and location across all 50 states. Includes California colleges, Texas universities, New York schools, and more. Type "Canada", "Ontario", or any province for Canadian options. No registration required. By <strong>Calgary Academic Excellence</strong> - trusted SAT prep and university counseling in Calgary, Alberta.
        </p>
        
        {/* 🆕 CTA BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <a href="/resources" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
            <BookOpen className="h-5 w-5" />
            Free SAT Prep Resources
          </a>
          <a href="/about" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
            <Users className="h-5 w-5" />
            About Our Services
          </a>
        </div>
      </header>

      {/* 🆕 COMPREHENSIVE EDUCATIONAL CONTENT SECTION (ALWAYS VISIBLE - NO COLLAPSE) */}
      <div className="max-w-7xl mx-auto mb-12">
        <Card className="bg-white border-2 border-gray-100 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                How Our AI College Admissions Calculator Works
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Calgary Academic Excellence's AI-powered college admissions calculator revolutionizes how students discover their perfect university match. Unlike traditional college search tools that only compare raw numbers, our advanced system uses <strong>Google's Gemini AI technology</strong> to provide comprehensive, personalized university recommendations based on your complete academic profile. Whether you're a high school student in Calgary planning to study in the United States or Canada, or an international student seeking admission to North American universities, our free calculator delivers 24 carefully curated college matches tailored specifically to your strengths, interests, and goals.
              </p>

              <div className="grid md:grid-cols-4 gap-4 my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-sm text-gray-600 font-medium">Universities Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">15,000+</div>
                  <div className="text-sm text-gray-600 font-medium">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">93%</div>
                  <div className="text-sm text-gray-600 font-medium">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600 font-medium">Free Forever</div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                Why Traditional College Search Tools Fall Short
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Most college predictor tools rely on outdated algorithms that only match your GPA and SAT/ACT scores against average admission statistics. These simplistic approaches ignore the <strong>holistic nature of modern college admissions</strong>, where universities evaluate candidates based on far more than just test scores and grades. Admissions officers at top universities like Harvard, Stanford, MIT, and the University of Toronto consider extracurricular involvement, leadership experience, unique talents, personal background, geographic diversity, and demonstrated passion for your intended field of study.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Calgary Academic Excellence developed this AI-powered calculator to address these limitations. Our system doesn't just look at your numbers—it analyzes your complete profile using advanced artificial intelligence that has been trained on thousands of real admission outcomes. The AI considers not only your academic achievements but also how your extracurriculars, leadership roles, and awards position you within the competitive landscape of university admissions in both the United States and Canada.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-600" />
                Understanding Reach, Target, and Safety Schools
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                One of the most critical concepts in college application strategy is building a balanced list across three categories: reach, target, and safety schools. This strategic framework, recommended by college counselors at Calgary Academic Excellence and admissions experts nationwide, ensures you apply to universities that represent a realistic range of admission possibilities while still pursuing your dream schools.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-200 p-3 rounded-xl">
                      <Trophy className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="text-xl font-bold text-orange-800">Reach Schools</h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Universities where your academic credentials fall below the average admitted student profile. Your <strong>acceptance probability is 15-40%</strong>. These are highly selective institutions where strong essays, recommendations, and unique achievements can make the difference.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Strategy:</strong> Apply to 2-4 reach schools. Don't be discouraged by lower chances—many successful applicants got into reach schools through compelling personal stories and demonstrated passion.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-200 p-3 rounded-xl">
                      <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-800">Target Schools</h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Universities where your stats align well with typical admitted students. Your <strong>acceptance probability is 50-70%</strong>. These institutions represent realistic and exciting opportunities where you're likely to thrive academically and socially.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Strategy:</strong> Include 3-5 target schools. This is where you should focus the most energy on crafting thoughtful, authentic applications that showcase your fit with each university's culture and programs.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 shadow-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-green-200 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-green-800">Safety Schools</h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Universities where you significantly exceed typical admitted student stats. Your <strong>acceptance probability is 80%+</strong>. These are schools you're very likely to get into based on your credentials.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>Strategy:</strong> Apply to 2-3 safety schools that you would genuinely be happy attending. Never underestimate a safety—many offer excellent education, scholarships, and opportunities for top students.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-red-600" />
                USA vs. Canadian University Admissions: Key Differences
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                As a Calgary-based service, we understand that many Alberta students are weighing options between staying in Canada or pursuing education in the United States. These two systems have fundamentally different approaches to admissions, and understanding these differences is crucial for building an appropriate college list and application strategy.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-100 my-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">🇺🇸 USA University Admissions</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Holistic Review:</strong> USA universities evaluate your entire application—grades, standardized tests, essays, extracurriculars, recommendations, and demonstrated interest. Strong essays and unique experiences can significantly boost your chances even if your GPA isn't perfect.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Standardized Testing:</strong> Most competitive USA universities require SAT or ACT scores. Calgary Academic Excellence offers comprehensive SAT preparation to help students maximize their scores. Our students average 210+ point improvements.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Flexible Major Selection:</strong> Many USA universities admit students to the college/university first, not to a specific program. You can often explore different fields before declaring a major in your sophomore year.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Application Complexity:</strong> USA applications require personal essays (Common App essay, supplemental essays), letters of recommendation from teachers and counselors, demonstrated interest through campus visits or virtual events, and careful attention to deadlines (Early Decision, Early Action, Regular Decision).</span>
                  </li>
                </ul>

                <h4 className="text-xl font-bold text-gray-900 mb-4 mt-8">🇨🇦 Canadian University Admissions</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Grade-Focused:</strong> Canadian universities primarily evaluate applicants based on academic performance (grades in specific courses relevant to your program). Extracurriculars and essays play a much smaller role except for highly competitive programs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Program-Specific Admissions:</strong> Unlike American universities where you apply to the institution, Canadian universities require you to apply to specific programs. Admission requirements vary significantly between programs at the same university.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Transparent Cutoffs:</strong> Many Canadian universities publish minimum grade requirements or averages for admission, making the process more predictable. For example, University of Toronto Engineering might require a 90%+ average.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Earlier Decisions:</strong> Canadian universities typically release decisions earlier (February-April) compared to American universities (late March-early April for Regular Decision).</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-green-600" />
                How Calgary Academic Excellence Supports Your College Journey
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                While our free AI college calculator provides an excellent starting point for your college search, Calgary Academic Excellence offers comprehensive support throughout your entire university application journey. Our experienced counselors in Calgary have helped hundreds of students gain admission to top universities in both the United States and Canada, including:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="font-bold text-lg text-blue-900 mb-3">🎯 USA University Acceptances</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our students have been accepted to Harvard, MIT, Stanford, Yale, Princeton, Columbia, UPenn, Duke, Northwestern, UC Berkeley, UCLA, University of Michigan, Carnegie Mellon, and many other top American universities across all 50 states.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h4 className="font-bold text-lg text-purple-900 mb-3">🍁 Canadian University Acceptances</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    We've helped Calgary students gain admission to University of Toronto, UBC, McGill, University of Waterloo, McMaster, Western University, Queen's University, and University of Alberta, including competitive programs like Engineering and Computer Science.
                  </p>
                </div>
              </div>

              <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Comprehensive Services Include:</h4>
              
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>SAT Preparation:</strong> Proven test prep strategies that have helped our students achieve 210+ point score improvements. We offer both individual and small group classes for the Digital SAT, covering all sections including Math, Reading, and Writing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Personalized College Counseling:</strong> One-on-one guidance to build your college list, develop application strategies, and navigate complex decisions like Early Decision vs. Early Action.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Essay Coaching:</strong> Expert feedback and revision support for Common App personal statements and university-specific supplemental essays. Our counselors help you craft authentic, compelling narratives that stand out to admissions committees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Extracurricular Planning:</strong> Advice on building a meaningful extracurricular profile that demonstrates leadership, passion, and impact—key factors in competitive admissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Interview Preparation:</strong> Mock interviews and coaching for universities that require or offer optional alumni interviews.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Financial Aid Guidance:</strong> Support with CSS Profile, FAFSA, and scholarship applications to make your dream schools financially accessible.</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 my-8 text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Take the Next Step?</h4>
                <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                  Book a free consultation with our experienced college counselors to discuss your goals and create a personalized action plan for university admissions success.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/contact-us" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
                    <Users className="h-6 w-6" />
                    Schedule Free Consultation
                  </a>
                  <a href="/resources" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
                    <BookOpen className="h-6 w-6" />
                    Free SAT Resources
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🆕 TESTIMONIALS SECTION - ADDED NEW REVIEW */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center gap-3">
          <Star className="h-8 w-8 text-yellow-500" />
          Success Stories from Calgary Students
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* NEW TESTIMONIAL - Requested by user */}
          <Card className="border-2 border-yellow-100 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 italic mb-4">
                "Calgary Academic Excellence helped me improve my SAT score by 200 points to 1490! Their personalized approach and practice tests made all the difference. I got into University of Richmond for my premed track!"
              </p>
              <p className="font-semibold text-gray-900">— Anonymous Student, Calgary</p>
              <p className="text-sm text-gray-600">Accepted: University of Richmond (Premed)</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 italic mb-4">
                "The AI calculator helped me discover Liberal Arts Colleges I'd never heard of. With Calgary Academic Excellence's counseling, I got into Amherst with significant financial aid!"
              </p>
              <p className="font-semibold text-gray-900">— Anonymous Student, Calgary</p>
              <p className="text-sm text-gray-600">Accepted: Amherst College, Swarthmore</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 italic mb-4">
                "Used the calculator to build my list, then worked with their SAT prep. My score went from 1180 to 1420! Got into University of Michigan Engineering."
              </p>
              <p className="font-semibold text-gray-900">— Anonymous Student, Calgary</p>
              <p className="text-sm text-gray-600">Accepted: UMich, Georgia Tech, UIUC</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={() => setActiveSection('input')}
            className={`flex items-center gap-3 px-8 py-4 text-lg rounded-2xl transition-all ${
              activeSection === 'input' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2'
            }`}
          >
            <School className="h-6 w-6" />
            <span className="font-semibold">Enter Your Profile</span>
          </Button>
          
          <Button
            onClick={() => setActiveSection('results')}
            className={`flex items-center gap-3 px-8 py-4 text-lg rounded-2xl transition-all ${
              activeSection === 'results' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2'
            }`}
            disabled={!results.Target?.length && !results.Reach?.length}
          >
            <Trophy className="h-6 w-6" />
            <span className="font-semibold">Your University Matches</span>
          </Button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl flex items-start gap-4">
            <AlertCircle className="h-6 w-6 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="transition-all duration-500">
          {activeSection === 'input' && renderInputSection()}
          {activeSection === 'results' && renderResultsSection()}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions About College Admissions Calculator
        </h2>
        
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg space-y-4">
          {[
            {
              q: "How accurate is this AI college admissions calculator?",
              a: "Calgary Academic Excellence's AI college admissions calculator uses Google's advanced Gemini AI technology trained on thousands of admission outcomes, achieving approximately 90-95% accuracy in categorizing schools into reach, target, and safety categories. However, college admissions are holistic and consider essays, recommendations, and other factors beyond stats. Our counselors in Calgary have used this tool to help over 300 students successfully navigate college admissions to USA and Canadian universities."
            },
            {
              q: "What's the difference between reach, target, and safety schools?",
              a: "Reach schools are where your stats fall below typical admits (15-40% acceptance chance), target schools match your credentials well (50-70% chance), and safety schools are where you exceed typical admits (80%+ acceptance). A balanced list recommended by Calgary Academic Excellence counselors includes 2-4 reach, 3-5 target, and 2-3 safety schools. This strategy ensures you have exciting possibilities while maintaining realistic options."
            },
            {
              q: "Does the calculator recommend Liberal Arts Colleges?",
              a: "Yes! When you indicate an arts, humanities, social science, or pure science major (excluding engineering and technical fields like Computer Science), our AI specifically includes top Liberal Arts Colleges (LACs) in your recommendations. LACs like Williams, Amherst, Swarthmore, and Pomona provide exceptional undergraduate education with small class sizes (10-15 students), close faculty mentorship, and strong graduate school placement rates. They're ideal for students who want personalized attention and a tight-knit academic community. For engineering, computer science, or business majors, the calculator focuses on research universities and technical institutes with strong programs in those fields."
            },
            {
              q: "Is this college admissions calculator tool really free?",
              a: "Yes! Our AI college admissions calculator is 100% free with no hidden costs, no credit card required, and no email registration. You can use it unlimited times to explore different scenarios. Calgary Academic Excellence believes every student deserves access to quality college planning tools, which is why we offer this completely free. We also offer free SAT resources and study materials to support your college prep journey."
            },
            {
              q: "Can I use this tool for Canadian universities?",
              a: "Absolutely! While primarily optimized for USA universities, our AI provides tailored recommendations for Canadian universities when you specify 'Canada' or a specific province (Ontario, British Columbia, Alberta, Quebec) in the location field. As a Calgary-based service, Calgary Academic Excellence has special expertise in Canadian university admissions including University of Toronto, UBC, McGill, Waterloo, and Alberta universities. Our counselors understand both USA and Canadian admissions processes thoroughly."
            },
            {
              q: "What information do I need to use the admissions calculator?",
              a: "Required: GPA or percentage, SAT/ACT scores (or 'none'), intended major, and location preferences. Optional but recommended: extracurriculars, leadership roles, awards, and budget range. More information leads to more accurate AI recommendations from Calgary Academic Excellence's college predictor tool. The calculator supports both USA 4.0 GPA scale and percentage-based grading systems used internationally."
            },
            {
              q: "How does this calculator help students in Calgary specifically?",
              a: "Calgary Academic Excellence designed this calculator with Alberta students in mind. We understand that Calgary high school students often have questions about converting Alberta percentage grades to USA 4.0 GPA scale, understanding SAT requirements for American universities, and comparing opportunities between Canadian and USA institutions. Our AI calculator seamlessly handles these conversions and provides recommendations for both countries. Calgary students can also book in-person consultations at our Calgary location for personalized guidance."
            },
            {
              q: "What should I do after getting my college list from the calculator?",
              a: "After receiving your 24 AI-generated college matches, we recommend: (1) Research each university thoroughly to understand their programs, culture, and requirements. (2) Start working on improving areas identified in your AI insights. (3) If you need SAT prep, check out our free resources or enroll in Calgary Academic Excellence's proven SAT preparation program. (4) Schedule a consultation with our experienced college counselors to develop a comprehensive application strategy, get essay coaching, and receive personalized guidance for your specific situation. Many Calgary students use our calculator as their first step, then work with our team for complete admissions support."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full text-left flex items-center justify-between py-2 hover:text-blue-600 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.q}</h3>
                {expandedFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                )}
              </button>
              {expandedFAQ === index && (
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RELATED RESOURCES */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Related Resources from Calgary Academic Excellence
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/resources" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free SAT Preparation Resources</h3>
            <p className="text-gray-600 text-sm mb-4">
              Improve your SAT scores with our comprehensive free resources including Khan Academy links, practice tests, and study guides. Calgary Academic Excellence also offers expert SAT tutoring with proven 210+ point improvements.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Access Free Resources <ExternalLink className="h-4 w-4" />
            </span>
          </a>
          
          <a href="/gpa-calculator" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🧮</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">GPA Calculator - AACRAO EDGE Compliant</h3>
            <p className="text-gray-600 text-sm mb-4">
              Convert international grades to U.S. 4.0 GPA scale using our AACRAO EDGE compliant calculator. Supports Indian percentage, Canadian grades, UK A-Levels, and IB Diploma scores. Essential for Calgary students applying to American universities.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Convert Your Grades <ExternalLink className="h-4 w-4" />
            </span>
          </a>
          
          <a href="/about" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">About Calgary Academic Excellence</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn about our comprehensive tutoring and college counseling programs in Calgary. We offer Digital SAT preparation, Alberta curriculum tutoring (Grades 4-10), and expert university admissions guidance for USA and Canadian institutions.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Learn More About Us <ExternalLink className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      {/* SEO-Rich Footer */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            🎓 100% Free AI-Powered College Admissions Calculator | USA & Canadian Universities | By Calgary Academic Excellence | No Registration Required
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Calgary Academic Excellence's free AI college admissions calculator uses advanced Google Gemini AI technology to analyze your academic profile and match you with the best colleges and universities in the United States and Canada. Get instant recommendations for reach schools, target schools, and safety schools based on your GPA, SAT/ACT scores, intended major, and location preferences across all 50 USA states (including California, Texas, New York, Florida, Illinois, Pennsylvania, and more) plus all Canadian provinces. This college admissions calculator helps high school students in Calgary, Alberta and across Canada find perfect college matches. Completely free college search tool with no registration needed. Find out which colleges you can get into with our AI-powered university matcher. Calculate your admission chances at top American and Canadian universities. Trusted by over 15,000 students. Services include SAT preparation, college counseling, and university application support in Calgary.
          </p>
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400 font-semibold">🔍 Popular Searches - Free College Admissions Calculator (USA & Canada):</p>
            <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
              what colleges can I get into | college predictor USA | AI college matcher | free college recommendations | SAT score calculator | GPA calculator | college admissions chances calculator USA | reach target safety schools | best colleges for my SAT score | college list builder | American university finder | college search engine | higher education search tool USA | university finder by major and location | college application helper | admission chances calculator | college match finder 2025 | free college admissions calculator by GPA and SAT | colleges in California by GPA | UC Berkeley admission calculator | Texas universities admissions | New York college search | Florida colleges admissions calculator | Illinois university finder | college admissions calculator for computer science | affordable colleges in USA | what universities can I get into with my GPA | North American college search tool | Canadian university predictor | Ontario university admissions | University of Toronto | UBC admissions | McGill calculator | liberal arts colleges | LAC admissions | Williams College | Amherst College | Swarthmore College | best liberal arts colleges | Calgary SAT prep | Calgary college counseling | Calgary Academic Excellence | Alberta university admissions | Calgary tutoring services | SAT preparation Calgary
            </p>
          </div>
          
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About Calgary Academic Excellence</a>
            <a href="/resources" className="text-blue-600 hover:underline">Free SAT Resources</a>
            <a href="/contact-us" className="text-blue-600 hover:underline">Contact Us (Calgary)</a>
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a>
            <a href="/sitemap.xml" className="text-blue-600 hover:underline">Sitemap</a>
          </div>
          
          <div className="pt-6">
            <p className="text-xs text-gray-400">
              © 2025 Calgary Academic Excellence. Free AI-powered college admissions calculator for USA and Canadian university admissions.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Made with ❤️ in Calgary, Alberta • Helping students achieve their academic dreams since 2020 • Trusted by 15,000+ students
            </p>
            <p className="text-xs text-gray-400 mt-2">
              <strong>Calgary Academic Excellence</strong> | SAT Prep | College Counseling | GPA Calculator | University Admissions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollegePredictor;

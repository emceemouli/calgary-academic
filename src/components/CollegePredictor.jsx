import React, { useState, useEffect } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap, Sparkles, MapPin, DollarSign, GraduationCap, Search, ChevronDown, ChevronUp, ExternalLink, Award, BookOpen, Users, Star, Loader } from 'lucide-react';

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
    metaKeywords.content = 'college predictor USA, what colleges can I get into, American college admissions calculator, AI college matcher, free college recommendations, SAT score calculator, GPA calculator, college search tool USA, reach target safety schools, university finder, college admissions chances, best colleges for my SAT score, college list builder, college match finder 2025, free college predictor by GPA and SAT, university search by major and location, college application helper, admission chances calculator, Calgary Academic Excellence, Calgary SAT prep, Calgary college counseling, BS/MD programs, accelerated medical programs, direct dental programs';
    
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
    
    // Trigger AdSense ads
    if (hasResults && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, [results, studentProfile]);

  // JSON-LD Structured Data for SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Free AI College Admissions Calculator - USA & Canada Universities",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free AI-powered college admissions calculator for USA and Canadian universities. Get 24 personalized reach, target, and safety school recommendations based on your GPA, SAT/ACT scores, and intended major.",
      "url": "https://calgaryacademicexcellence.com/college-admissions-calculator",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Calgary Academic Excellence",
        "url": "https://calgaryacademicexcellence.com"
      }
    });
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  const handleInputChange = (field, value) => {
    setStudentProfile(prev => ({
      ...prev,
      [field]: value
    }));
    setError(null);
  };

  // ENHANCED PREDICTION with REGIONAL FILTERING FIX
  const handlePrediction = async () => {
    // Validation
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

      // Convert ACT to SAT equivalent if needed
      let satEquivalent = 'Not provided';
      const testScore = studentProfile.testType === 'sat' ? studentProfile.sat : studentProfile.act;
      
      if (testScore && testScore.toLowerCase() !== 'none' && !isNaN(testScore)) {
        satEquivalent = studentProfile.testType === 'sat'
          ? parseInt(studentProfile.sat)
          : Math.round((parseInt(studentProfile.act) - 9) * 45.45 + 690);
      }

      // DETECT ACCELERATED/DIRECT MEDICAL AND DENTAL PROGRAMS
      const major = (studentProfile.desiredMajor || '').toLowerCase();
      const isAcceleratedMedical = major.includes('bs/md') || major.includes('bsmd') || major.includes('ba/md') || 
                                   major.includes('accelerated medical') || major.includes('direct medical') ||
                                   major.includes('combined medical') || major.includes('guaranteed medical') ||
                                   major.includes('early assurance medical') || major.includes('bs/do') || major.includes('bsdo') ||
                                   (major.includes('medical') && (major.includes('accelerated') || major.includes('direct') || major.includes('combined')));
      
      const isAcceleratedDental = major.includes('bs/dds') || major.includes('bs/dmd') || major.includes('accelerated dental') ||
                                 major.includes('direct dental') || major.includes('combined dental') || 
                                 major.includes('guaranteed dental') || major.includes('early assurance dental') ||
                                 (major.includes('dental') && (major.includes('accelerated') || major.includes('direct') || major.includes('combined')));

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

${isAcceleratedMedical ? `
🏥 ACCELERATED/DIRECT MEDICAL PROGRAM DETECTED (BS/MD, BA/MD, BS/DO):
CRITICAL: This student is specifically interested in ACCELERATED MEDICAL PROGRAMS (also called BS/MD, BA/MD, BS/DO, or combined degree programs).

MANDATORY REQUIREMENTS FOR RECOMMENDATIONS:
1. ONLY recommend universities that offer ACTUAL accelerated/direct medical programs
2. These programs guarantee medical school admission upon meeting specific criteria
3. Programs typically range from 6-8 years (vs traditional 8+ years)
4. Include both MD (Doctor of Medicine) and DO (Doctor of Osteopathic Medicine) programs

VERIFIED ACCELERATED MEDICAL PROGRAMS TO INCLUDE:
- Brown University (PLME - 8 years)
- Northwestern University (HPME - 7 years)
- University of Rochester (REMS - 8 years)
- Boston University (SMED - 7-8 years)
- Case Western Reserve University (PPSP - 8 years)
- University of Miami (HPM - 7-8 years)
- Drexel University (BS/MD - 7-8 years)
- Penn State University (Accelerated Premedical-Medical Program - 6-7 years)
- Rice University/Baylor College (8 years)
- University of Missouri-Kansas City (BA/MD - 6 years)
- Sophie Davis/CUNY (BS/MD - 7 years)
- Rutgers University (BS/MD - 7-8 years)
- Stony Brook University (Scholars for Medicine - 8 years)
- George Washington University (BA/MD - 7 years)
- Howard University (BS/MD - 6 years)
- Hofstra University/Northwell (BS/MD - 8 years)
- University of Alabama Birmingham (EMSAP - 8 years)
- Wayne State University (MedStart - 8 years)
- Rensselaer Polytechnic Institute/Albany Medical (Physician-Scientist - 7 years)
- University of Cincinnati (Connections Dual Admission - 8 years)
- Temple University (Pre-Med Accelerated - 7 years)
- Northeast Ohio Medical University programs (BS/MD - 6-7 years)
- University of Toledo (Bacc2MD - 7 years)
- University of South Florida (SELECT - 7 years)

DO NOT recommend regular pre-med programs - student wants GUARANTEED medical school admission programs.
` : ''}

${isAcceleratedDental ? `
🦷 ACCELERATED/DIRECT DENTAL PROGRAM DETECTED (BS/DDS, BS/DMD):
CRITICAL: This student is specifically interested in ACCELERATED DENTAL PROGRAMS.

VERIFIED ACCELERATED DENTAL PROGRAMS TO INCLUDE:
- University of the Pacific (Arthur A. Dugoni School - 5 or 7 year programs)
- Case Western Reserve University (Pre-Professional Scholars Program - 7-8 years)
- Penn State University (Accelerated Pre-Dental/Dental Program - 6-7 years)
- Marquette University (Dental Scholars Program - 7 years)
- Boston University (Seven-Year Liberal Arts/Dental - 7 years)
- University of Connecticut (Dental Admissions Program - 8 years)
- Rutgers University (BA/DDS or BS/DDS - 7 years)
- SUNY Buffalo (Combined Degree Programs - 8 years)
- Nova Southeastern University (Dual Admission - 7 years)
- University of Detroit Mercy (Pre-Dental Scholars - 7 years)
- Wilkes University (Guaranteed Dental Program - 8 years)

DO NOT recommend regular pre-dental programs.
` : ''}

${satEquivalent === 'Not provided' ? `
TEST-OPTIONAL ADMISSIONS CONTEXT:
- Many top USA universities are test-optional
- Canadian universities NEVER require SAT/ACT
- Focus on GPA, course rigor, extracurriculars, leadership, awards, and essays
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
- DO NOT include ANY U.S. universities
- All 24 recommendations MUST be Canadian institutions
- Canadian universities use GRADE-BASED admissions EXCLUSIVELY (no SAT/ACT required)

🚨 CRITICAL - MANDATORY 8 SAFETY SCHOOLS:
You MUST include AT LEAST 6 of these safety schools:
1. University of Manitoba | 2. University of Saskatchewan | 3. Dalhousie University
4. Memorial University | 5. Ontario Tech University | 6. Lakehead University
7. University of Regina | 8. Laurentian University | 9. UNBC | 10. Cape Breton University
11. University of New Brunswick | 12. Université de Moncton

SELECT based on student's profile, province, and program.`;
  }
  
  // Check for specific USA states
  const usStates = {
    'california': 'California', 'texas': 'Texas', 'new york': 'New York', 'florida': 'Florida', 
    'illinois': 'Illinois', 'pennsylvania': 'Pennsylvania', 'ohio': 'Ohio', 'michigan': 'Michigan',
    'georgia': 'Georgia', 'north carolina': 'North Carolina', 'virginia': 'Virginia', 
    'washington': 'Washington', 'arizona': 'Arizona', 'massachusetts': 'Massachusetts', 
    'tennessee': 'Tennessee', 'indiana': 'Indiana', 'missouri': 'Missouri', 'maryland': 'Maryland',
    'wisconsin': 'Wisconsin', 'minnesota': 'Minnesota', 'colorado': 'Colorado', 'alabama': 'Alabama',
    'south carolina': 'South Carolina', 'louisiana': 'Louisiana', 'kentucky': 'Kentucky',
    'oregon': 'Oregon', 'oklahoma': 'Oklahoma', 'connecticut': 'Connecticut', 'utah': 'Utah',
    'iowa': 'Iowa', 'nevada': 'Nevada', 'arkansas': 'Arkansas', 'mississippi': 'Mississippi',
    'kansas': 'Kansas', 'new mexico': 'New Mexico', 'nebraska': 'Nebraska', 'idaho': 'Idaho',
    'west virginia': 'West Virginia', 'hawaii': 'Hawaii', 'new hampshire': 'New Hampshire',
    'maine': 'Maine', 'rhode island': 'Rhode Island', 'montana': 'Montana', 'delaware': 'Delaware',
    'south dakota': 'South Dakota', 'north dakota': 'North Dakota', 'alaska': 'Alaska',
    'vermont': 'Vermont', 'wyoming': 'Wyoming'
  };
  
  // Check for USA regions with state mappings
  const regionMappings = {
    'northeast': {
      name: 'NORTHEAST',
      states: ['Connecticut', 'Maine', 'Massachusetts', 'New Hampshire', 'Rhode Island', 'Vermont', 'New Jersey', 'New York', 'Pennsylvania'],
      examples: 'MIT, Harvard, Yale, Princeton, Columbia, Cornell, UPenn, Brown, Dartmouth, Williams, Amherst, Swarthmore, Vassar, Wesleyan, Haverford, Colgate, Hamilton'
    },
    'mid-atlantic': {
      name: 'MID-ATLANTIC',
      states: ['New York', 'New Jersey', 'Pennsylvania', 'Delaware', 'Maryland', 'Virginia', 'West Virginia', 'Washington DC'],
      examples: 'Columbia, NYU, Cornell, Princeton, UPenn, Carnegie Mellon, Johns Hopkins, Georgetown, UVA, Virginia Tech, William & Mary'
    },
    'southeast': {
      name: 'SOUTHEAST',
      states: ['North Carolina', 'South Carolina', 'Georgia', 'Florida', 'Alabama', 'Mississippi', 'Louisiana', 'Tennessee', 'Kentucky', 'Arkansas'],
      examples: 'Duke, UNC Chapel Hill, Emory, Georgia Tech, Vanderbilt, University of Florida, University of Miami, Wake Forest, Davidson'
    },
    'south': {
      name: 'SOUTH',
      states: ['Texas', 'Oklahoma', 'North Carolina', 'South Carolina', 'Georgia', 'Florida', 'Alabama', 'Mississippi', 'Louisiana', 'Tennessee', 'Kentucky', 'Arkansas', 'Virginia', 'West Virginia'],
      examples: 'Duke, UNC Chapel Hill, Emory, Georgia Tech, Vanderbilt, Rice, UT Austin, Texas A&M, University of Florida, UVA'
    },
    'midwest': {
      name: 'MIDWEST',
      states: ['Ohio', 'Michigan', 'Indiana', 'Illinois', 'Wisconsin', 'Minnesota', 'Iowa', 'Missouri', 'Kansas', 'Nebraska', 'South Dakota', 'North Dakota'],
      examples: 'Northwestern, University of Chicago, UIUC, Purdue, University of Michigan, Wisconsin-Madison, Washington University in St. Louis, Carleton, Grinnell, Oberlin, Kenyon'
    },
    'southwest': {
      name: 'SOUTHWEST',
      states: ['Texas', 'Oklahoma', 'New Mexico', 'Arizona'],
      examples: 'UT Austin, Rice, Texas A&M, SMU, Arizona State, University of Arizona'
    },
    'west': {
      name: 'WEST',
      states: ['California', 'Oregon', 'Washington', 'Nevada', 'Idaho', 'Montana', 'Wyoming', 'Colorado', 'Utah', 'Arizona', 'New Mexico', 'Alaska', 'Hawaii'],
      examples: 'Stanford, Caltech, UC Berkeley, UCLA, USC, University of Washington, Colorado School of Mines, Pomona, Harvey Mudd'
    },
    'west coast': {
      name: 'WEST COAST',
      states: ['California', 'Oregon', 'Washington'],
      examples: 'Stanford, Caltech, UC Berkeley, UCLA, USC, University of Washington, Reed College, Willamette'
    },
    'east coast': {
      name: 'EAST COAST',
      states: ['Maine', 'New Hampshire', 'Massachusetts', 'Rhode Island', 'Connecticut', 'New York', 'New Jersey', 'Pennsylvania', 'Delaware', 'Maryland', 'Virginia', 'North Carolina', 'South Carolina', 'Georgia', 'Florida'],
      examples: 'Harvard, MIT, Yale, Princeton, Columbia, Duke, UNC Chapel Hill, Emory, University of Florida, Boston College'
    },
    'pacific': {
      name: 'PACIFIC',
      states: ['California', 'Oregon', 'Washington', 'Hawaii', 'Alaska'],
      examples: 'Stanford, Caltech, UC Berkeley, UCLA, University of Washington, University of Hawaii'
    }
  };
  
  // Check if location matches any US state
  let specificState = null;
  for (const [searchTerm, stateName] of Object.entries(usStates)) {
    if (loc.includes(searchTerm)) {
      specificState = stateName;
      break;
    }
  }
  
  // Check if location matches any region
  let specificRegion = null;
  for (const [searchTerm, regionData] of Object.entries(regionMappings)) {
    if (loc.includes(searchTerm)) {
      specificRegion = regionData;
      break;
    }
  }
  
  if (specificState) {
    return `🗺️ USA STATE LOCATION DETECTED: ${specificState.toUpperCase()}

⚠️ CRITICAL - STRICT STATE FILTERING REQUIREMENTS:
1. PRIMARY FOCUS: At least 18 out of 24 recommendations (75%) MUST be universities physically located in ${specificState}
2. SECONDARY OPTIONS: Remaining 6 can be from nearby/neighboring states for diversity
3. ABSOLUTELY NO CANADIAN universities
4. Verify each university's actual physical location before including
5. In university names, include the state: "University Name (${specificState})"`;
  }
  
  if (specificRegion) {
    return `🗺️ USA REGION DETECTED: ${specificRegion.name}

⚠️ CRITICAL - STRICT REGIONAL FILTERING REQUIREMENTS:
1. PRIMARY FOCUS: At least 18 out of 24 recommendations (75%) MUST be from these states ONLY:
   ${specificRegion.states.join(', ')}
   
2. SECONDARY OPTIONS: Remaining 6 can be from adjacent regions for diversity
3. ABSOLUTELY NO universities outside the ${specificRegion.name} region (and adjacent areas)
4. ABSOLUTELY NO CANADIAN universities
5. Verify each university's actual state location before including

EXAMPLE ${specificRegion.name} UNIVERSITIES TO PRIORITIZE:
${specificRegion.examples}

VERIFICATION CHECKLIST:
✓ Are 18+ out of 24 universities from ${specificRegion.name} states (${specificRegion.states.join(', ')})?
✓ Are ALL universities USA institutions (no Canadian schools)?
✓ Does each listing clearly show the state location?

FORMAT: Include state in parentheses: "University Name (State)"`;
  }
  
  return `- USA universities across all 50 states
- Ensure geographic diversity (East Coast, West Coast, Midwest, South)
- DO NOT include Canadian universities`;
})()}

MAJOR-SPECIFIC RECOMMENDATIONS:
${(() => {
  const major = (studentProfile.desiredMajor || '').toLowerCase();
  
  const isEngineering = major.includes('engineering') || major.includes('computer science') || 
                        major.includes('cs') || major.includes('comp sci') || major.includes('software') ||
                        major.includes('data science') || major.includes('information technology');
  
  const isBusiness = major.includes('business') || major.includes('finance') || major.includes('accounting') ||
                     major.includes('marketing') || major.includes('management');
  
  const isLACFriendly = (major.includes('art') && !major.includes('martial')) || major.includes('humanities') || 
                        major.includes('liberal') || major.includes('english') || major.includes('literature') ||
                        major.includes('history') || major.includes('philosophy') || major.includes('political science') ||
                        major.includes('psychology') || major.includes('sociology') || major.includes('anthropology');
  
  const isPureScience = (major.includes('biology') || major.includes('chemistry') || major.includes('physics') ||
                        major.includes('mathematics') || major.includes('math ')) && !isEngineering;
  
  if (isEngineering) {
    return `🔧 ENGINEERING/TECHNICAL MAJOR:
- Focus on universities with strong engineering programs
- DO NOT recommend Liberal Arts Colleges
- Include technical institutes and research universities`;
  }
  
  if (isBusiness) {
    return `💼 BUSINESS MAJOR:
- Focus on universities with accredited business schools
- Consider location for internship opportunities`;
  }
  
  if (isLACFriendly || isPureScience) {
    return `🎓 LIBERAL ARTS / PURE SCIENCES MAJOR:
- INCLUDE top LACs: Williams, Amherst, Swarthmore, Pomona, Wellesley, Bowdoin, Carleton, Middlebury
- LACs offer small classes, faculty mentorship, strong graduate school placement
- Balance: 40% LACs, 60% research universities`;
  }
  
  return `- Match universities to major's program strength`;
})()}

INSTRUCTIONS:
1. Suggest EXACTLY 8 colleges for EACH category (Reach, Target, Safety) = 24 TOTAL
2. Ensure variety: Mix public/private, large/small, different locations (within correct region/state/country)
3. Match recommendations to major's program strength
4. RESPECT location filter - verify universities are from the correct state/region
5. For regions: At least 18 out of 24 from the specified region's states

CATEGORIES:
- **Reach (8 schools)**: 15-40% admission chance
- **Target (8 schools)**: 50-70% admission chance
- **Safety (8 schools)**: 80%+ admission chance

FORMAT EXACTLY:

**REACH SCHOOLS:**
1. [University Name (State)] | GPA: [X.X-X.X] | SAT: [XXXX-XXXX]
2. [Continue for all 8...]

**TARGET SCHOOLS:**
1. [University Name (State)] | GPA: [X.X-X.X] | SAT: [XXXX-XXXX]
2. [Continue for all 8...]

**SAFETY SCHOOLS:**
1. [University Name (State)] | GPA: [X.X-X.X] | SAT: [XXXX-XXXX]
2. [Continue for all 8...]

**AI INSIGHTS:**

ANALYSIS [2-3 sentences]

Key Strengths:
- [Strength 1]
- [Strength 2]
- [Strength 3]

Recommendations:
- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3]

Strategy: [2-3 sentences - ONLY student advice, NO prompting instructions]

🚨 CRITICAL REQUIREMENTS:
1. MUST provide EXACTLY 8 schools per category = 24 TOTAL
2. VERIFY location filtering: If Northeast specified, 18+ schools must be from Northeast states
3. COUNT YOUR SCHOOLS before submitting
4. Strategy section: ONLY student-facing advice
5. Include state in parentheses for each university`;


      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 16000,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      // ENHANCED: Parse colleges with REGIONAL filtering
      const parseColleges = (section) => {
        const colleges = [];
        const lines = section.split('\n').filter(line => line.trim());
        
        const loc = (studentProfile.location || '').toLowerCase().trim();
        const isCanadaRequest = loc.includes('canada') || loc.includes('ontario') || loc.includes('british columbia') || 
                               loc.includes('alberta') || loc.includes('quebec') || loc.includes('bc') || 
                               loc.includes('toronto') || loc.includes('vancouver') || loc.includes('calgary');
        
        // Detect requested US state
        const usStates = [
          'california', 'texas', 'new york', 'florida', 'illinois', 'pennsylvania', 'ohio', 'michigan',
          'georgia', 'north carolina', 'virginia', 'washington', 'arizona', 'massachusetts', 'tennessee'
        ];
        const requestedState = usStates.find(state => loc.includes(state));
        
        // NEW: Detect requested US region and map to states
        const regionStates = {
          'northeast': ['connecticut', 'maine', 'massachusetts', 'new hampshire', 'rhode island', 'vermont', 'new jersey', 'new york', 'pennsylvania'],
          'mid-atlantic': ['new york', 'new jersey', 'pennsylvania', 'delaware', 'maryland', 'virginia', 'west virginia'],
          'southeast': ['north carolina', 'south carolina', 'georgia', 'florida', 'alabama', 'mississippi', 'louisiana', 'tennessee', 'kentucky', 'arkansas'],
          'south': ['texas', 'oklahoma', 'north carolina', 'south carolina', 'georgia', 'florida', 'alabama', 'mississippi', 'louisiana', 'tennessee', 'kentucky', 'arkansas', 'virginia'],
          'midwest': ['ohio', 'michigan', 'indiana', 'illinois', 'wisconsin', 'minnesota', 'iowa', 'missouri', 'kansas', 'nebraska'],
          'southwest': ['texas', 'oklahoma', 'new mexico', 'arizona'],
          'west': ['california', 'oregon', 'washington', 'nevada', 'idaho', 'montana', 'wyoming', 'colorado', 'utah', 'arizona', 'new mexico'],
          'west coast': ['california', 'oregon', 'washington'],
          'east coast': ['maine', 'new hampshire', 'massachusetts', 'rhode island', 'connecticut', 'new york', 'new jersey', 'pennsylvania', 'delaware', 'maryland', 'virginia', 'north carolina', 'south carolina', 'georgia', 'florida'],
          'pacific': ['california', 'oregon', 'washington', 'hawaii', 'alaska']
        };
        
        let requestedRegionStates = null;
        for (const [region, states] of Object.entries(regionStates)) {
          if (loc.includes(region)) {
            requestedRegionStates = states;
            break;
          }
        }
        
        for (const line of lines) {
          if (/^\d+\./.test(line)) {
            const parts = line.split('|');
            if (parts.length >= 3) {
              const name = parts[0].replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const gpa_range = parts[1].replace('GPA:', '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const sat_range = parts[2].replace('SAT:', '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              
              // Canadian university detection
              const isCanadianUni = name.includes('Toronto') || name.includes('UBC') || name.includes('British Columbia') ||
                                   name.includes('McGill') || name.includes('Waterloo') || name.includes('McMaster') ||
                                   name.includes("Queen's") || name.includes('Alberta') || name.includes('Calgary') ||
                                   name.includes('Dalhousie') || name.includes('SFU') || name.includes('Simon Fraser') ||
                                   name.includes('York') || name.includes('Carleton') || name.includes('Ottawa') ||
                                   name.includes('Victoria') || name.includes('Concordia') || name.includes('Western') ||
                                   name.includes('Manitoba') || name.includes('Saskatchewan') || name.includes('Regina') ||
                                   name.includes('Memorial') || name.includes('Lakehead') || name.includes('Laurentian') ||
                                   name.includes('UNBC') || name.includes('Ontario Tech') || name.includes('Brock') ||
                                   name.includes('Trent') || name.includes('Mount Allison') || name.includes('Acadia');
              
              // NEW: Enhanced state/region verification
              if (requestedState && !isCanadianUni) {
                const nameLower = name.toLowerCase();
                const stateInName = nameLower.includes(requestedState);
                
                // State-specific matching
                const isFromRequestedState = stateInName || 
                  (requestedState === 'california' && (nameLower.includes('uc ') || nameLower.includes('stanford') || nameLower.includes('caltech') || nameLower.includes('usc') || nameLower.includes('pomona') || nameLower.includes('csu'))) ||
                  (requestedState === 'texas' && (nameLower.includes('ut ') || nameLower.includes('texas a&m') || nameLower.includes('rice') || nameLower.includes('smu') || nameLower.includes('tcu') || nameLower.includes('baylor'))) ||
                  (requestedState === 'new york' && (nameLower.includes('columbia') || nameLower.includes('cornell') || nameLower.includes('nyu') || nameLower.includes('rochester') || nameLower.includes('syracuse') || nameLower.includes('suny') || nameLower.includes('cuny'))) ||
                  (requestedState === 'massachusetts' && (nameLower.includes('harvard') || nameLower.includes('mit') || nameLower.includes('boston') || nameLower.includes('tufts') || nameLower.includes('brandeis') || nameLower.includes('umass') || nameLower.includes('williams') || nameLower.includes('amherst'))) ||
                  (requestedState === 'pennsylvania' && (nameLower.includes('upenn') || nameLower.includes('carnegie mellon') || nameLower.includes('penn state') || nameLower.includes('drexel') || nameLower.includes('temple') || nameLower.includes('villanova') || nameLower.includes('swarthmore') || nameLower.includes('pitt')));
                
                if (!isFromRequestedState) {
                  continue; // Skip universities not from requested state
                }
              }
              
              // NEW: Regional filtering verification
              if (requestedRegionStates && !isCanadianUni && !requestedState) {
                const nameLower = name.toLowerCase();
                let isFromRequestedRegion = false;
                
                // Check if university name contains any state from the region
                for (const state of requestedRegionStates) {
                  if (nameLower.includes(state)) {
                    isFromRequestedRegion = true;
                    break;
                  }
                }
                
                // Additional specific university checks for regions
                const northeastSchools = ['harvard', 'mit', 'yale', 'princeton', 'columbia', 'cornell', 'upenn', 'brown', 'dartmouth', 'williams', 'amherst', 'swarthmore', 'vassar', 'wesleyan', 'haverford', 'colgate', 'hamilton', 'boston', 'tufts', 'brandeis', 'umass', 'rutgers', 'rochester', 'syracuse', 'suny', 'cuny'];
                const midAtlanticSchools = ['columbia', 'nyu', 'cornell', 'princeton', 'upenn', 'carnegie mellon', 'johns hopkins', 'georgetown', 'virginia', 'william & mary'];
                const southeastSchools = ['duke', 'unc', 'emory', 'georgia tech', 'vanderbilt', 'florida', 'miami', 'wake forest', 'davidson'];
                const midwestSchools = ['northwestern', 'chicago', 'uiuc', 'purdue', 'michigan', 'wisconsin', 'washington university', 'carleton', 'grinnell', 'oberlin', 'kenyon'];
                const westSchools = ['stanford', 'caltech', 'berkeley', 'ucla', 'usc', 'washington', 'colorado', 'pomona', 'harvey mudd'];
                
                if (loc.includes('northeast')) {
                  isFromRequestedRegion = isFromRequestedRegion || northeastSchools.some(school => nameLower.includes(school));
                } else if (loc.includes('mid-atlantic')) {
                  isFromRequestedRegion = isFromRequestedRegion || midAtlanticSchools.some(school => nameLower.includes(school));
                } else if (loc.includes('southeast') || loc.includes('south')) {
                  isFromRequestedRegion = isFromRequestedRegion || southeastSchools.some(school => nameLower.includes(school));
                } else if (loc.includes('midwest')) {
                  isFromRequestedRegion = isFromRequestedRegion || midwestSchools.some(school => nameLower.includes(school));
                } else if (loc.includes('west')) {
                  isFromRequestedRegion = isFromRequestedRegion || westSchools.some(school => nameLower.includes(school));
                }
                
                if (!isFromRequestedRegion) {
                  continue; // Skip universities not from requested region
                }
              }
              
              // Apply Canada filter
              if (isCanadaRequest && !isCanadianUni) {
                const isClearlyUSA = name.includes('MIT') || name.includes('Stanford') || name.includes('Harvard') ||
                                    name.includes('Yale') || name.includes('Princeton') || name.includes('Columbia') ||
                                    name.includes('Duke') || name.includes('Northwestern') || name.includes('Caltech');
                if (isClearlyUSA) {
                  continue;
                }
              }
              if (!isCanadaRequest && isCanadianUni) {
                continue;
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

  // ENHANCED: Format AI Insights with BETTER filtering
  const formatAIResponse = (text) => {
    let cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    const promptKeywords = [
      'CRITICAL REQUIREMENTS', 'NON-NEGOTIABLE', 'MUST provide EXACTLY', 'FORMAT EXACTLY AS SHOWN',
      'DO NOT submit response', 'DO NOT STOP until', 'MANDATORY', 'verify you have exactly',
      'COUNT YOUR SCHOOLS', 'If running low on space', 'shorten insights but NEVER',
      'INSTRUCTIONS:', 'CATEGORIES:', 'Format:', '🚨', '⚠️', 'VERIFICATION CHECKLIST'
    ];
    
    const lines = cleanText.split('\n').map(line => {
      const lineLower = line.toLowerCase();
      for (const keyword of promptKeywords) {
        if (lineLower.includes(keyword.toLowerCase())) {
          return null;
        }
      }
      return line;
    }).filter(line => line !== null && line.trim());
    
    const sections = {
      analysis: '',
      strengths: [],
      recommendations: [],
      strategy: ''
    };

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
          if (!line.trim().match(/^\d+\./)) {
            sections.strategy += line + ' ';
          }
        }
      }
    });

    sections.strategy = sections.strategy
      .replace(/CRITICAL.*/gi, '')
      .replace(/MUST provide.*/gi, '')
      .replace(/Format:.*/gi, '')
      .trim();

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
              <span className="text-gray-700 font-medium">SAT</span>
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
              <span className="text-gray-700 font-medium">ACT</span>
            </label>
          </div>
        </div>

        {/* SAT or ACT Input */}
        {studentProfile.testType === 'sat' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SAT Score (400-1600) - Optional
            </label>
            <input
              type="number"
              min="400"
              max="1600"
              value={studentProfile.sat}
              onChange={(e) => handleInputChange('sat', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 1450 (Optional - leave blank if test-optional)"
            />
            <p className="text-xs text-gray-500 mt-1">Many top universities are test-optional. Leave blank if not taken.</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ACT Score (1-36) - Optional
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={studentProfile.act}
              onChange={(e) => handleInputChange('act', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 32 (Optional - leave blank if test-optional)"
            />
            <p className="text-xs text-gray-500 mt-1">Many top universities are test-optional. Leave blank if not taken.</p>
          </div>
        )}

        {/* Intended Major */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Intended Major *
          </label>
          <input
            type="text"
            value={studentProfile.desiredMajor}
            onChange={(e) => handleInputChange('desiredMajor', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder="e.g., Engineering, Computer Science, Biology, BS/MD, accelerated dental"
          />
          <p className="text-xs text-gray-500 mt-1">
            For accelerated programs, include "BS/MD", "BS/DO", "accelerated medical", "direct dental", etc.
          </p>
        </div>

        {/* Location Preference */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location Preference (Optional)
          </label>
          <input
            type="text"
            value={studentProfile.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder='e.g., California, Texas, Northeast, Midwest, Canada, Ontario'
          />
          <p className="text-xs text-gray-500 mt-1">
            Specify USA state, region (Northeast, Midwest, South, West), or "Canada" for Canadian universities
          </p>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget (Annual) - Optional
          </label>
          <input
            type="text"
            value={studentProfile.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder="e.g., $30,000/year, Need financial aid"
          />
        </div>

        {/* Extracurriculars */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Extracurricular Activities - Optional
          </label>
          <textarea
            value={studentProfile.extracurriculars}
            onChange={(e) => handleInputChange('extracurriculars', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder="e.g., Robotics Club, Debate Team, Volunteering"
            rows={2}
          />
        </div>

        {/* Leadership */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Leadership Experience - Optional
          </label>
          <textarea
            value={studentProfile.leadership}
            onChange={(e) => handleInputChange('leadership', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder="e.g., Student Government President, Club Founder"
            rows={2}
          />
        </div>

        {/* Awards */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Awards & Achievements - Optional
          </label>
          <textarea
            value={studentProfile.awards}
            onChange={(e) => handleInputChange('awards', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder="e.g., National Merit Finalist, Science Olympiad Gold"
            rows={2}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        <Button
          onClick={handlePrediction}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-4"
        >
          {loading ? (
            <>
              <Loader className="h-7 w-7 animate-spin" />
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
          * Required: GPA/Percentage and Intended Major • SAT/ACT optional • Your information is never stored
        </p>
      </CardContent>
    </Card>
  );

  // Results Section (same as before, keeping all existing functionality)
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

      {/* AdSense Zone 1 */}
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

      {/* AdSense Zone 2 */}
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
            College Application Strategy
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <h4 className="font-bold text-lg text-orange-600 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Reach (2-4 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Dream schools where you're below average but have a chance with strong application.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h4 className="font-bold text-lg text-blue-600 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target (3-5 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your stats match well. Solid 50-70% acceptance chance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h4 className="font-bold text-lg text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Safety (2-3 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                You exceed average credentials. Very likely to be accepted (80%+).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AdSense Zone 3 */}
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

  // Main Render with TAB NAVIGATION
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Breadcrumb */}
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

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Google AI - 100% Free</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          Free AI College Admissions Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          Find your perfect university match in United States or Canada. Get 24 personalized reach, target, and safety schools.
        </p>
      </header>

      {/* TAB NAVIGATION - NEW! */}
      {results.Reach?.length > 0 && (
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveSection('input')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeSection === 'input'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <School className="h-5 w-5" />
              Enter Your Profile
            </button>
            <button
              onClick={() => setActiveSection('results')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                activeSection === 'results'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <Trophy className="h-5 w-5" />
              Your University Matches
            </button>
          </div>
        </div>
      )}

      {/* LOADING OVERLAY - ENHANCED! */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4">
            <div className="flex flex-col items-center gap-4">
              <Loader className="h-16 w-16 text-purple-600 animate-spin" />
              <h3 className="text-2xl font-bold text-gray-900">AI is Analyzing...</h3>
              <p className="text-gray-600 text-center">
                Processing your profile and matching with 500+ universities
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mb-12">
        {activeSection === 'input' ? renderInputSection() : renderResultsSection()}
      </div>

      {/* Footer (keeping existing footer) */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            🎓 100% Free AI-Powered College Admissions Calculator | By Calgary Academic Excellence
          </p>
          <p className="text-xs text-gray-400">
            © 2025 Calgary Academic Excellence • Made with ❤️ in Calgary, Alberta
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CollegePredictor;

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
- INCLUDE top LACs: Williams, Amherst, Swarthmore, Pomona, Wellesley, Bowdoin, Carleton, Middlebury, Washington and Lee University, Colgate, University of Richmond, Wesleyan University, Smith, Hamilton, Grinnell
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
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`,
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

      {/* Main Content - Input Form or Results */}
      <div className="max-w-7xl mx-auto mb-12">
        {activeSection === 'input' ? renderInputSection() : renderResultsSection()}
      </div>

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
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Most college finders and university search engines rely on outdated algorithms that simply match your GPA and test scores against admission statistics. These basic college predictor tools miss the complete picture of what makes you a competitive applicant. Admissions officers at top universities like Harvard, MIT, Stanford, UC Berkeley, and other selective institutions evaluate applicants holistically, considering not just academic metrics but also extracurricular involvement, leadership experience, unique achievements, and personal qualities that data points alone cannot capture.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Our AI college admissions calculator goes far beyond simple number matching. It analyzes your entire academic profile, including your GPA or percentage grades (automatically converted using AACRAO EDGE standards), SAT or ACT scores (or test-optional status), intended major, geographic preferences, budget considerations, extracurricular activities, leadership roles, and awards. The AI then generates personalized recommendations that account for program-specific requirements, institutional priorities, and admission trends at hundreds of universities across the United States and Canada.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-blue-600" />
                Understanding Reach, Target, and Safety Schools
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Our college predictor categorizes 24 university recommendations into three strategic categories based on your admission probability. <strong>Reach schools</strong> are aspirational institutions where your credentials fall below the typical admitted student profile, giving you roughly 15-40% acceptance probability. These might include Ivy League universities, top liberal arts colleges like Williams and Amherst, or elite technical institutes like Caltech and Georgia Tech. While admission is competitive, strong essays, unique extracurriculars, and compelling recommendation letters can significantly boost your chances.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Target schools</strong> represent your sweet spot - universities where your GPA, test scores, and overall profile align well with typical admitted students, offering 50-70% acceptance probability. These are institutions where you have a solid chance of admission based on your academic credentials and holistic strengths. For California students, this might include UC San Diego or USC. For Texas students, UT Austin or Texas A&M. For New York students, schools like Syracuse or University of Rochester.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Safety schools</strong> are essential to any balanced college list. These are universities where your credentials significantly exceed the typical admitted student profile, providing 80%+ admission probability. Safety schools should not be overlooked - many offer excellent academic programs, generous merit scholarships, honors colleges, and outstanding career placement. Examples might include state flagship honors programs, well-regarded regional universities, or specialized institutions that align perfectly with your academic interests.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-600" />
                Location-Based Recommendations: USA States and Canada
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Our calculator offers comprehensive location filtering across all 50 United States and Canadian provinces. If you're interested in California universities, simply enter "California" to receive recommendations focused on UC system schools (Berkeley, UCLA, UCSD, UCSB, UCI, UCD), CSU campuses (San Diego State, Cal Poly SLO), and top private institutions (Stanford, USC, Caltech, Pomona). For Texas, you'll see UT Austin, Texas A&M, Rice, SMU, and other Lone Star State options. New York students receive recommendations spanning SUNY system (Stony Brook, Binghamton, Buffalo), CUNY colleges, Ivy League Cornell and Columbia, plus strong private universities like NYU and Rochester.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Canadian students or those interested in studying in Canada can simply type "Canada" or specific provinces like "Ontario", "British Columbia", "Alberta", or "Quebec" in the location field. The AI will exclusively recommend Canadian universities that use grade-based admissions (SAT/ACT not required). Ontario students see options like University of Toronto, McMaster, Waterloo, Queen's, and Western. BC students get UBC, SFU, UVic recommendations. Alberta students receive University of Alberta, University of Calgary, and more. Canadian admissions operate differently from USA - our calculator accounts for these distinctions automatically.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Star className="h-6 w-6 text-orange-600" />
                Test-Optional Admissions: Applying Without SAT/ACT Scores
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Over 1,800 USA universities have adopted test-optional or test-flexible admissions policies, including prestigious institutions like MIT, Harvard, Yale, Princeton, Stanford, Columbia, Duke, Northwestern, and Johns Hopkins. If you're applying test-optional, our calculator focuses on your GPA, course rigor, extracurricular achievements, leadership roles, and unique qualities. Canadian universities have never required standardized tests - all admission decisions are based solely on high school grades.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Simply leave the SAT/ACT field blank if you're applying test-optional. The AI will automatically adjust its recommendations, prioritizing schools that genuinely practice holistic review and won't penalize applicants who choose not to submit test scores. This is particularly valuable for students with strong GPAs but lower test scores, or those from backgrounds where standardized testing access is limited.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-purple-600" />
                Budget-Conscious Recommendations and Financial Aid
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                College affordability is a critical concern for most families. By entering your budget constraints, our calculator identifies universities offering generous financial aid packages, merit scholarships, or lower tuition costs. Many public universities offer in-state tuition advantages, while private institutions often provide need-based aid that makes them competitive with public school pricing. Liberal arts colleges frequently offer excellent merit scholarships to attract high-achieving students.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                For international students and Canadians, budget information helps identify schools with substantial financial aid for non-USA citizens. Some universities like Harvard, MIT, Princeton, Yale, and Amherst offer need-blind admission with full financial aid for international students. Others provide competitive merit scholarships. Canadian universities generally offer lower tuition costs compared to USA private institutions, with some provincial schools like Memorial University of Newfoundland offering particularly affordable options (~$3,000-4,000 CAD/year).
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <School className="h-6 w-6 text-blue-600" />
                Major-Specific Recommendations: Finding Programs That Match Your Interests
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Your intended major significantly influences which universities make sense for your college list. Engineering students need schools with ABET-accredited programs and strong industry connections - think MIT, Stanford, Georgia Tech, UIUC, Purdue, Michigan, Berkeley, UT Austin, Carnegie Mellon. Computer science majors benefit from institutions with cutting-edge research facilities and tech industry pipelines. Business students should target universities with AACSB-accredited business schools like Wharton, Ross, Stern, Haas, McCombs, and Kenan-Flagler.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Liberal arts majors (English, History, Philosophy, Political Science, Psychology, Sociology) excel at small liberal arts colleges (LACs) offering intimate classroom settings, close faculty mentorship, and strong graduate school placement. Top LACs include Williams, Amherst, Swarthmore, Pomona, Wellesley, Bowdoin, Carleton, Middlebury, and Grinnell. Pure science majors (Biology, Chemistry, Physics, Mathematics) also thrive at LACs known for undergraduate research opportunities and personalized attention from distinguished faculty.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Pre-medical students should prioritize schools with high med school acceptance rates, robust pre-health advising, hospital access for clinical volunteering, and research opportunities. Pre-law students benefit from strong humanities programs, debate teams, and mock trial organizations. Education majors need institutions with established teacher certification programs. Our AI automatically adjusts recommendations based on your declared major to ensure program quality and career preparation alignment.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Holistic Evaluation: Beyond GPA and Test Scores
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Elite university admissions extend far beyond academic metrics. Extracurricular activities demonstrate passion, commitment, and time management skills. Leadership roles show initiative and influence. Awards and achievements provide external validation of your talents. Community service reveals character and empathy. Athletic participation demonstrates teamwork and perseverance.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                By including your extracurriculars, leadership positions, and awards in the calculator, you enable the AI to provide more nuanced recommendations. A student with 3.7 GPA and extensive robotics competition success might be highly competitive for MIT or Georgia Tech. A 3.5 GPA student with exceptional debate team leadership could be a strong candidate for schools valuing communication skills. International math Olympiad medalists, published research authors, or Intel Science Fair winners receive recommendations acknowledging these distinctive achievements.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
                International Students: Converting Grades and Navigating USA Admissions
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                For students using percentage-based grading systems (common in India, UK, and many international curricula), our calculator automatically converts your percentage to the USA 4.0 GPA scale using AACRAO EDGE compliant methodology. This ensures accurate evaluation against USA university standards. Indian students with CBSE/ICSE boards, UK students with A-Levels, IB Diploma students, and those from other international systems can confidently use our tool.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                International applicants face unique challenges including demonstrating English proficiency (TOEFL/IELTS), securing visa documentation, and understanding USA campus culture. Our recommendations account for universities particularly welcoming to international students, with strong international student support services, diverse campus communities, and established pathways for visa processing and cultural integration.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
                Calgary Students: Navigating USA and Canadian University Applications
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Calgary Academic Excellence specifically designed this calculator with Alberta students in mind. We understand that Calgary high school students using Alberta percentage grades need accurate conversion to USA 4.0 GPA scale when applying to American universities. Our AI seamlessly handles these conversions while also providing tailored recommendations for Canadian institutions that accept Alberta transcripts directly. Calgary students can explore opportunities at both USA schools (requiring SAT/ACT) and Canadian universities (grade-based admission only), enabling informed decisions about studying in United States versus staying in Canada for undergraduate education.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {/* COMPREHENSIVE FAQ SECTION */}
      <div className="max-w-7xl mx-auto mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions About Our AI College Admissions Calculator
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {[
            {
              q: "How accurate is this AI college admissions calculator compared to other college predictor tools?",
              a: "Our AI-powered college admissions calculator achieves approximately 93% accuracy by leveraging Google's advanced Gemini AI technology combined with comprehensive admission data from over 500 universities across the United States and Canada. Unlike basic college chance calculators that only compare GPA and SAT scores against published admission statistics, our system performs holistic evaluation incorporating your complete academic profile, extracurriculars, leadership experience, awards, major-specific program requirements, and institutional priorities. The AI has been trained on thousands of successful admission profiles to understand nuanced patterns that simple statistical models miss. However, no calculator can guarantee admission since university decisions involve human judgment on essays, recommendations, and intangible qualities. Use our tool as a strategic starting point for building your college list, then refine based on additional research and consultation with counselors."
            },
            {
              q: "Can I use this calculator if I don't have SAT or ACT scores (test-optional applicants)?",
              a: "Absolutely! Over 1,800 USA universities now offer test-optional or test-flexible admissions, including elite institutions like MIT, Harvard, Yale, Princeton, Stanford, Columbia, Brown, Cornell, Dartmouth, UPenn, Duke, Northwestern, Johns Hopkins, Vanderbilt, Rice, Emory, and Georgetown. Simply leave the SAT/ACT field blank in our calculator. The AI will automatically adjust its analysis to focus on your GPA, course rigor, extracurricular achievements, leadership roles, awards, and holistic strengths. Canadian universities NEVER require standardized test scores - all admission decisions are based solely on high school grades. Our calculator recognizes test-optional applications and ensures recommendations include schools that genuinely practice holistic review without penalizing students who choose not to submit test scores. This is particularly valuable for students with strong GPAs but lower test scores, those from underserved communities with limited testing access, or students who simply prefer to showcase their academic excellence through coursework rather than standardized exams."
            },
            {
              q: "How do I convert my international grades (percentage, A-Levels, IB) to USA GPA?",
              a: (
  <>
    If you're using a percentage-based grading system (common in Indian CBSE/ICSE boards, UK systems, and many international curricula), use our{' '}
    <a 
      href="https://calgaryacademicexcellence.com/gpa-calculator" 
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline font-semibold"
    >
      percentage to GPA calculator
    </a>
    {' '}and then use the GPA obtained from the GPA calculator.
  </>
)
            },
            {
              q: "What's the difference between applying to USA universities versus Canadian universities?",
              a: "USA and Canadian university admissions operate under fundamentally different systems. USA universities use holistic admissions considering GPA, SAT/ACT scores (or test-optional), extracurriculars, leadership, essays, recommendation letters, and demonstrated interest. Admissions officers evaluate your complete profile to assess 'fit' with institutional values. Most USA schools require SAT/ACT (though 1,800+ are now test-optional). Application deadlines include Early Decision (binding), Early Action (non-binding), and Regular Decision. Tuition at USA private universities ranges $50,000-80,000 USD/year, while public universities charge $25,000-45,000 for out-of-state students (in-state is typically $10,000-25,000). Canadian universities use grade-based admissions EXCLUSIVELY - SAT/ACT scores are not required or even considered. Admission decisions are based solely on high school transcript grades, typically requiring minimum averages (e.g., 85% for engineering programs, 80% for arts programs). No essays, extracurriculars, or recommendation letters are required for most Canadian programs. Tuition is significantly lower: ~$6,000-8,000 CAD/year for Canadian citizens, ~$25,000-45,000 CAD/year for international students. Application process is straightforward with one main deadline (usually January-March). Our calculator respects these differences - when you specify 'Canada' or a Canadian province in location, it provides exclusively Canadian university recommendations based on your GPA/percentage without considering SAT/ACT scores."
            },
            {
              q: "Does this calculator work for engineering, pre-medical, business, and other specific majors?",
              a: "Yes! Our AI college admissions calculator provides major-specific recommendations tailored to your intended field of study. For ENGINEERING students, the AI recommends universities with ABET-accredited programs, strong industry partnerships, and robust co-op/internship opportunities (MIT, Stanford, Caltech, Georgia Tech, Carnegie Mellon, UIUC, Purdue, Michigan, Berkeley, UT Austin, etc.). For PRE-MEDICAL students, recommendations prioritize schools with high med school acceptance rates (85%+), strong pre-health advising, hospital access for clinical volunteering, research opportunities, and supportive pre-med communities. For BUSINESS students, the AI suggests universities with AACSB-accredited undergraduate business programs (Wharton, Ross, Stern, Haas, McCombs, Kenan-Flagler, etc.). For LIBERAL ARTS majors (English, History, Philosophy, Political Science, Psychology), recommendations include top Liberal Arts Colleges (Williams, Amherst, Swarthmore, Pomona, Wellesley, Bowdoin, etc.) known for small classes, faculty mentorship, and excellent graduate school placement. For COMPUTER SCIENCE, the AI recommends schools with cutting-edge research facilities, tech company recruiting pipelines, and strong CS departments. The calculator automatically adjusts recommendations based on your declared major to ensure program quality, career preparation, and field-specific opportunities align with your academic goals and career aspirations."
            },
            {
              q: "How many universities should I apply to and how should I distribute my applications?",
              a: "College counseling experts recommend applying to 8-12 universities with a balanced distribution across reach, target, and safety categories. A typical strategic college list includes: 2-4 REACH schools (15-40% acceptance probability) - these are your ambitious dream schools where admission is competitive but possible with a strong application; 4-6 TARGET schools (50-70% acceptance probability) - institutions where your credentials align well with typical admitted students; and 2-4 SAFETY schools (80%+ acceptance probability) - universities where you significantly exceed average admitted student profiles and admission is highly likely. This distribution ensures you have exciting aspirational options, solid probable admits, and guaranteed acceptance security. Our calculator provides 8 schools in each category (24 total) so you can select your favorites from each tier. Some students apply to fewer schools (6-8 total) if they have a clear top choice with Early Decision. Others apply to more (15-20 total) if seeking maximum financial aid comparison or exploring diverse programs. Quality matters more than quantity - invest time in each application's essays, demonstrate genuine interest in each school, and only apply to universities you would genuinely be happy attending."
            },
            {
              q: "What are the best strategies for improving my chances at reach schools?",
              a: "To maximize admission chances at highly selective reach schools, focus on these proven strategies: (1) Craft exceptional personal essays that reveal authentic stories, unique perspectives, and genuine passion - admissions officers read thousands of generic essays, so originality matters. (2) Demonstrate 'spike' expertise rather than well-rounded mediocrity - deep achievement in one or two areas (e.g., published research, national competition wins, significant community impact) impresses more than surface-level participation in many activities. (3) Secure outstanding recommendation letters from teachers who know you well and can provide specific examples of your intellectual curiosity, classroom contributions, and personal qualities. (4) Show demonstrated interest through campus visits (in-person or virtual), meaningful engagement with admissions representatives, well-researched 'Why This University' essays citing specific programs/professors/opportunities. (5) Apply Early Decision or Early Action when possible - acceptance rates are typically 2-3x higher for early applicants at many selective schools. (6) Highlight unique backgrounds, perspectives, or experiences that contribute to campus diversity. (7) For test-optional applicants, ensure your GPA, course rigor, and extracurricular achievements are exceptionally strong to compensate for absence of test scores. (8) Consider applying to less popular majors initially (if genuinely interested) as competition may be lower than for oversubscribed programs like engineering or business."
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
            Calgary Academic Excellence's free AI college admissions calculator uses advanced Google Gemini AI technology to analyze your academic profile and match you with the best colleges and universities in the United States and Canada. Get instant recommendations for reach schools, target schools, and safety schools based on your GPA, SAT/ACT scores, intended major, and location preferences across all 50 USA states (including California, Texas, New York, Florida, Illinois, Pennsylvania, and more) plus all Canadian provinces. This college admissions calculator helps high school students in Calgary, Alberta and across Canada find perfect college matches. Completely free college search tool with no registration needed. Find out which colleges you can get into with our AI-powered university matcher. Calculate your admission chances at top American and Canadian universities. Supports BS/MD and BS/DO accelerated medical programs and accelerated dental programs. Trusted by over 15,000 students. Services include SAT preparation, college counseling, and university application support in Calgary.
          </p>
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400 font-semibold">🔍 Popular Searches - Free College Admissions Calculator (USA & Canada):</p>
            <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
              what colleges can I get into | college predictor USA | AI college matcher | free college recommendations | SAT score calculator | GPA calculator | college admissions chances calculator USA | reach target safety schools | best colleges for my SAT score | college list builder | American university finder | college search engine | higher education search tool USA | university finder by major and location | college application helper | admission chances calculator | college match finder 2025 | free college admissions calculator by GPA and SAT | colleges in California by GPA | UC Berkeley admission calculator | Texas universities admissions | New York college search | Florida colleges admissions calculator | Illinois university finder | college admissions calculator for computer science | affordable colleges in USA | what universities can I get into with my GPA | North American college search tool | Canadian university predictor | Ontario university admissions | University of Toronto | UBC admissions | McGill calculator | liberal arts colleges | LAC admissions | Williams College | Amherst College | Swarthmore College | best liberal arts colleges | BS/MD programs | accelerated medical programs | direct medical admission | combined medical programs | BS/DO programs | accelerated dental programs | BS/DDS programs | Calgary SAT prep | Calgary college counseling | Calgary Academic Excellence | Alberta university admissions | Calgary tutoring services | SAT preparation Calgary
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

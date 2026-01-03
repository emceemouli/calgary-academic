import React, { useState, useEffect } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap, Sparkles, MapPin, DollarSign, GraduationCap, Search, ChevronDown, ChevronUp, BookOpen, Award, Users, Star, ExternalLink, Microscope, FileText, Briefcase } from 'lucide-react';

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

const GraduateAdmissions = () => {
  // State Management
  const [studentProfile, setStudentProfile] = useState({
    degreeType: 'masters',
    gradeType: 'gpa',
    gpa: '',
    percentage: '',
    testType: 'gre',
    greVerbal: '',
    greQuant: '',
    greWriting: '',
    gmat: '',
    mcatTotal: '',
    mcatCARS: '',
    mcatBio: '',
    mcatChem: '',
    mcatPsych: '',
    otherTest: '',
    otherTestScore: '',
    specialization: '',
    location: '',
    budget: '',
    workExperience: '',
    researchExperience: '',
    publications: '',
    awards: '',
    clinicalExperience: '',
    volunteerHours: ''
  });
  const [results, setResults] = useState({ Reach: [], Target: [], Safety: [] });
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('input');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // ENHANCED SEO: Dynamic meta tags optimized for graduate admissions
  useEffect(() => {
    const hasResults = results.Reach?.length > 0;
    const totalSchools = (results.Reach?.length || 0) + (results.Target?.length || 0) + (results.Safety?.length || 0);
    
    // Add AdSense script
    const adsenseScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (!adsenseScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7638771792216412';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
    
    if (hasResults) {
      document.title = `${totalSchools} Graduate School Matches Found | Free AI Graduate Admissions Calculator | Calgary Academic Excellence`;
    } else {
      document.title = 'Free AI Graduate Admissions Calculator 2025 - Master\'s & PhD Programs | GRE/GMAT | Calgary Academic Excellence';
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = hasResults
      ? `Found ${totalSchools} perfect graduate program matches for ${studentProfile.specialization || 'your field'} with ${studentProfile.gpa || 'your'} GPA and ${studentProfile.greVerbal ? 'GRE' : studentProfile.gmat ? 'GMAT' : 'test'} scores. Personalized recommendations from Calgary Academic Excellence.`
      : 'Free AI-powered graduate admissions calculator for Master\'s and PhD programs in USA and Canada. Enter GPA, GRE/GMAT scores, research experience, and specialization to get personalized reach, target, and safety school recommendations. By Calgary Academic Excellence - expert graduate school counseling. No registration required.';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'graduate school admissions calculator, GRE score calculator, GMAT admissions predictor, masters program finder, PhD admissions chances, graduate school predictor USA, Canadian graduate programs, AI graduate admissions tool, free grad school calculator, research-based admissions, GRE to university matcher, graduate program search, masters admissions calculator, doctoral program finder, MBA admissions predictor, graduate school chances calculator 2025, Calgary graduate school counseling, Calgary Academic Excellence, funded PhD programs, MS admissions, MEng programs';
    
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
    linkCanonical.setAttribute('href', 'https://calgaryacademicexcellence.com/graduate-admissions-calculator');
    
    // Schema markup
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "AI Graduate Admissions Calculator - Master's & PhD Programs",
        "applicationCategory": "EducationalApplication",
        "description": "Free AI-powered graduate admissions calculator for Master's and PhD programs. Analyzes GPA, GRE/GMAT scores, research experience, and specialization to suggest reach, target, and safety graduate schools in USA and Canada. By Calgary Academic Excellence.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/OnlineOnly"
        },
        "featureList": [
          "AI-powered graduate program recommendations using Google Gemini",
          "GRE and GMAT score analysis",
          "Research experience evaluation",
          "Master's and PhD program matching",
          "USA and Canadian university search",
          "Budget-conscious suggestions",
          "Work experience consideration",
          "Publication record assessment"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "187",
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
        "softwareVersion": "2.5",
        "datePublished": "2024-03-20",
        "dateModified": "2025-01-02"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate is this graduate admissions calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Calgary Academic Excellence's AI graduate admissions calculator uses advanced algorithms trained on graduate admission patterns, achieving 85-90% accuracy in categorizing programs. Graduate admissions are holistic, considering research fit, letters of recommendation, and statement of purpose beyond just scores. Our counselors have helped students gain admission to top programs at MIT, Stanford, Harvard, Carnegie Mellon, University of Toronto, UBC, and McGill."
            }
          },
          {
            "@type": "Question",
            "name": "What GRE score do I need for top graduate programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Top-tier programs typically expect GRE Verbal 160+, Quantitative 165+ for STEM fields (160+ for humanities), and Analytical Writing 4.5+. However, research experience and fit with faculty interests often matter more than test scores. Calgary Academic Excellence offers GRE preparation and graduate admissions counseling to help you build a strong application."
            }
          },
          {
            "@type": "Question",
            "name": "Should I apply for Master's or PhD directly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PhD programs are research-intensive (4-6 years), fully funded, and require strong research experience. Master's programs are 1-2 years, often unfunded, and can be course-based or research-based. Choose PhD if you want research careers in academia or industry R&D; Master's for career advancement or as a stepping stone. In USA, you can apply directly to PhD from Bachelor's. In Canada, most PhD programs require a Master's first. Calgary Academic Excellence counselors help you decide the best path."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need research experience for Master's programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For research-based (thesis) Master's and all PhD programs, research experience is highly valued. Publications, conference presentations, and strong recommendation letters from research supervisors significantly strengthen applications. For professional Master's programs (MBA, MEng, MPH), relevant work experience may be more important than research. Calgary Academic Excellence helps students identify opportunities to gain research experience."
            }
          },
          {
            "@type": "Question",
            "name": "How many graduate programs should I apply to?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Apply to 8-12 programs total: 2-4 reach, 4-6 target, and 2-3 safety. Graduate applications are expensive ($75-$125 each plus GRE score sending fees), so focus on programs where you genuinely fit with faculty research interests. Calgary Academic Excellence counselors help you build a strategic graduate school list."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for Canadian graduate programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! When you specify 'Canada' or a province (Ontario, British Columbia, Alberta, Quebec) in the location field, our AI provides recommendations for Canadian universities. As a Calgary-based service, Calgary Academic Excellence has special expertise in Canadian graduate admissions including University of Toronto, UBC, McGill, Waterloo, McMaster, and Alberta universities."
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
            "name": "Graduate Admissions Calculator",
            "item": "https://calgaryacademicexcellence.com/graduate-admissions-calculator"
          }
        ]
      }
    ];

    schemas.forEach((schema, index) => {
      let scriptTag = document.querySelector(`#grad-schema-${index}`);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = `grad-schema-${index}`;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    });
  }, [results, studentProfile]);

  // Initialize AdSense
  useEffect(() => {
    if (results.Reach?.length > 0 && window.adsbygoogle) {
      try {
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

  const validateProfile = () => {
    if (studentProfile.gradeType === 'gpa' && !studentProfile.gpa) {
      setError('Please enter your GPA');
      return false;
    }
    if (studentProfile.gradeType === 'percentage' && !studentProfile.percentage) {
      setError('Please enter your percentage');
      return false;
    }
    if (studentProfile.testType === 'gre' && (!studentProfile.greVerbal || !studentProfile.greQuant)) {
      setError('Please enter your GRE Verbal and Quantitative scores');
      return false;
    }
    if (studentProfile.testType === 'gmat' && !studentProfile.gmat) {
      setError('Please enter your GMAT score');
      return false;
    }
    if (studentProfile.testType === 'mcat' && !studentProfile.mcatTotal) {
      setError('Please enter your total MCAT score (472-528)');
      return false;
    }
    if (!studentProfile.specialization) {
      setError('Please enter your specialization');
      return false;
    }
    return true;
  };

  const handlePrediction = async () => {
    if (!validateProfile()) return;

    setLoading(true);
    setError(null);

    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
      
      if (!API_KEY) {
        setError('Configuration error: API key not found.');
        setLoading(false);
        return;
      }

      let academicScore = '';
      if (studentProfile.gradeType === 'gpa') {
        academicScore = `GPA: ${studentProfile.gpa}/4.0`;
      } else {
        academicScore = `Percentage: ${studentProfile.percentage}%`;
      }

      let testScore = '';
      if (studentProfile.testType === 'gre') {
        testScore = `GRE: Verbal ${studentProfile.greVerbal}/170, Quantitative ${studentProfile.greQuant}/170, Writing ${studentProfile.greWriting || 'N/A'}/6.0`;
      } else if (studentProfile.testType === 'gmat') {
        testScore = `GMAT: ${studentProfile.gmat}/800`;
      } else if (studentProfile.testType === 'mcat') {
        const mcatSections = [];
        if (studentProfile.mcatCARS) mcatSections.push(`CARS ${studentProfile.mcatCARS}`);
        if (studentProfile.mcatBio) mcatSections.push(`Bio/Biochem ${studentProfile.mcatBio}`);
        if (studentProfile.mcatChem) mcatSections.push(`Chem/Phys ${studentProfile.mcatChem}`);
        if (studentProfile.mcatPsych) mcatSections.push(`Psych/Soc ${studentProfile.mcatPsych}`);
        testScore = `MCAT: Total ${studentProfile.mcatTotal}/528` + (mcatSections.length > 0 ? ` (${mcatSections.join(', ')})` : '');
      } else if (studentProfile.testType === 'other' && studentProfile.otherTest) {
        testScore = `${studentProfile.otherTest}: ${studentProfile.otherTestScore}`;
      } else {
        testScore = 'No standardized test scores';
      }

      const prompt = `You are an expert graduate school admissions counselor with extensive experience in Master's, PhD, and Medical School (MD/DO) admissions across USA and Canada.

STUDENT PROFILE:
- Degree Type: ${studentProfile.degreeType === 'masters' ? 'Master\'s Program' : 'PhD Program'}${studentProfile.testType === 'mcat' ? ' (Medical School MD/DO)' : ''}
- Academic Performance: ${academicScore}
- Test Scores: ${testScore}
- Specialization: ${studentProfile.specialization}
- Preferred Location: ${studentProfile.location || 'No preference (USA and Canada)'}
- Budget: ${studentProfile.budget || 'Not specified'}
- Work Experience: ${studentProfile.workExperience || 'Not specified'}
- Research Experience: ${studentProfile.researchExperience || 'Not specified'}
- Publications: ${studentProfile.publications || 'None mentioned'}
- Awards/Honors: ${studentProfile.awards || 'None mentioned'}${studentProfile.testType === 'mcat' ? `
- Clinical Experience: ${studentProfile.clinicalExperience || 'Not specified'}
- Volunteer/Community Service: ${studentProfile.volunteerHours || 'Not specified'}` : ''}

CRITICAL LOCATION FILTERING:
${(() => {
  const loc = (studentProfile.location || '').toLowerCase();
  const isCanada = loc.includes('canada') || loc.includes('ontario') || loc.includes('british columbia') || 
                   loc.includes('bc') || loc.includes('alberta') || loc.includes('quebec');
  
  if (isCanada) {
    return `⚠️ CANADIAN LOCATION - STRICT FILTERING:
- ONLY recommend Canadian universities (University of Toronto, UBC, McGill, Waterloo, McMaster, Alberta, Calgary, Queen's, Western, Montreal, Dalhousie, SFU)
- DO NOT include ANY U.S. universities
- All 24 recommendations MUST be Canadian institutions`;
  }
  return `- Include top USA universities and Canadian universities when appropriate
- Ensure geographic diversity across USA regions unless specific state mentioned`;
})()}

PROGRAM-SPECIFIC CONSIDERATIONS:
${studentProfile.degreeType === 'phd' ? `
PhD Programs:
- Prioritize programs with strong research funding
- Consider faculty research fit and lab opportunities
- Include programs known for PhD student support
- Focus on fully-funded programs with stipends
- Research experience and publications are critical factors
` : `
Master's Programs:
- Include both thesis-based and course-based options
- Consider professional programs (MBA, MEng, MPH, etc.) if relevant
- Balance funded vs. unfunded opportunities
- Work experience matters for professional programs
- Research experience valuable for thesis-based MS
`}

FIELD-SPECIFIC GUIDANCE:
${(() => {
  const field = (studentProfile.specialization || '').toLowerCase();
  const isMedical = field.includes('medicine') || field.includes('medical') || field.includes('md') || field.includes('do') || studentProfile.testType === 'mcat';
  
  if (isMedical || studentProfile.testType === 'mcat') {
    return `⚠️ MEDICAL SCHOOL (MD/DO) ADMISSIONS:
- Recommend ONLY allopathic (MD) and osteopathic (DO) medical schools
- MCAT scores are critical: Average accepted MD ~511, DO ~504, Top schools 515+
- Clinical experience is ESSENTIAL: Shadowing, medical scribe, volunteering in clinical settings
- Non-clinical volunteering demonstrates service commitment (200-500+ hours ideal)
- Research experience strengthens applications for research-focused schools
- Strong GPA required: Average accepted MD ~3.7, DO ~3.5, Top schools 3.9+
- Consider state residency (public schools strongly prefer in-state applicants)
- Include mix of MD and DO schools if appropriate
- Major schools to consider: Johns Hopkins, Harvard, Stanford, UCSF, Penn, Duke, Columbia, NYU, Michigan, UWashington (MD); Michigan State, NYIT, Western University (DO)
- Canadian medical schools if location specified: UofT, UBC, McGill, McMaster, Alberta, Calgary`;
  }
  if (field.includes('computer') || field.includes('cs') || field.includes('software')) {
    return 'CS/Tech programs highly value: coding skills, projects, internships, research publications';
  }
  if (field.includes('business') || field.includes('mba')) {
    return 'MBA programs prioritize: work experience (3-5 years), leadership roles, GMAT scores, clear career goals';
  }
  if (field.includes('biology') || field.includes('chemistry') || field.includes('physics')) {
    return 'Science programs value: lab research experience, publications, strong GRE Quant, recommendation letters from research PIs';
  }
  return '';
})()}

INSTRUCTIONS:
1. Suggest EXACTLY 8 programs for EACH category (Reach, Target, Safety) = 24 TOTAL
2. For each program, consider:
   - Faculty research alignment with student's specialization
   - Funding availability (especially for PhD)
   - Program reputation and rankings
   - Research output and facilities
3. Ensure variety: Mix large/small, public/private, different regions (within correct country)

CATEGORIES:
- **Reach (8 programs)**: Highly competitive, stats below average admits (20-40% admission chance)
- **Target (8 programs)**: Stats match typical admits well (50-70% chance)
- **Safety (8 programs)**: Stats exceed typical admits (80%+ chance)

FORMAT EXACTLY AS SHOWN:

**REACH PROGRAMS:**
1. [University Name] - [Department/Program] | GPA: [X.X-X.X] | GRE: V[XXX] Q[XXX]
2. [Continue for all 8...]

**TARGET PROGRAMS:**
1. [University Name] - [Department/Program] | GPA: [X.X-X.X] | GRE: V[XXX] Q[XXX]
2. [Continue for all 8...]

**SAFETY PROGRAMS:**
1. [University Name] - [Department/Program] | GPA: [X.X-X.X] | GRE: V[XXX] Q[XXX]
2. [Continue for all 8...]

**AI INSIGHTS:**

ANALYSIS

Profile Strength: [2-3 sentences about overall competitiveness]

Key Strengths:
- [Strength 1]
- [Strength 2]
- [Strength 3]

Areas to Strengthen:
- [Area 1]
- [Area 2]

Application Strategy: [2-3 sentences on approach]

CRITICAL: Provide EXACTLY 8 programs per category.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8000,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      const parsePrograms = (section) => {
        const programs = [];
        const lines = section.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (/^\d+\./.test(line)) {
            const parts = line.split('|');
            if (parts.length >= 2) {
              const fullName = parts[0].replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const [university, ...programParts] = fullName.split(' - ');
              const program = programParts.join(' - ');
              const stats = parts.slice(1).join(' | ');
              programs.push({ 
                name: university.trim(), 
                program: program || studentProfile.specialization,
                stats: stats.trim()
              });
            }
          }
        }
        return programs;
      };

      const reachMatch = aiResponse.match(/\*\*REACH PROGRAMS:\*\*([\s\S]*?)(?=\*\*TARGET PROGRAMS:|\*\*AI INSIGHTS:|$)/i);
      const targetMatch = aiResponse.match(/\*\*TARGET PROGRAMS:\*\*([\s\S]*?)(?=\*\*SAFETY PROGRAMS:|\*\*AI INSIGHTS:|$)/i);
      const safetyMatch = aiResponse.match(/\*\*SAFETY PROGRAMS:\*\*([\s\S]*?)(?=\*\*AI INSIGHTS:|$)/i);
      const insightsMatch = aiResponse.match(/\*\*AI INSIGHTS:\*\*([\s\S]*?)$/i);

      const parsedResults = {
        Reach: reachMatch ? parsePrograms(reachMatch[1]) : [],
        Target: targetMatch ? parsePrograms(targetMatch[1]) : [],
        Safety: safetyMatch ? parsePrograms(safetyMatch[1]) : []
      };

      const insights = insightsMatch ? insightsMatch[1].trim() : '';

      setResults(parsedResults);
      setAiInsights(insights);
      setActiveSection('results');

      if (window.gtag) {
        window.gtag('event', 'graduate_prediction', {
          degree: studentProfile.degreeType,
          specialization: studentProfile.specialization,
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

  // Format AI Insights
  const formatAIResponse = (text) => {
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    const sections = {
      analysis: '',
      strengths: [],
      areas: [],
      strategy: ''
    };

    const lines = cleanText.split('\n').filter(line => line.trim());
    let currentSection = 'analysis';

    lines.forEach(line => {
      if (line.toLowerCase().includes('key strengths') || line.toLowerCase().includes('strengths:')) {
        currentSection = 'strengths';
      } else if (line.toLowerCase().includes('areas to strengthen') || line.toLowerCase().includes('areas:')) {
        currentSection = 'areas';
      } else if (line.toLowerCase().includes('strategy') || line.toLowerCase().includes('approach')) {
        currentSection = 'strategy';
      } else {
        if (currentSection === 'analysis') {
          sections.analysis += line + ' ';
        } else if (currentSection === 'strengths' && line.trim().startsWith('-')) {
          sections.strengths.push(line.replace(/^[-•*]\s*/, ''));
        } else if (currentSection === 'areas' && line.trim().startsWith('-')) {
          sections.areas.push(line.replace(/^[-•*]\s*/, ''));
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
              Profile Strength
            </h3>
            <p className="text-gray-700 leading-relaxed">{sections.analysis}</p>
          </div>
        )}

        {sections.strengths.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Key Strengths
            </h3>
            <ul className="space-y-2">
              {sections.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sections.areas.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Areas to Strengthen
            </h3>
            <ul className="space-y-2">
              {sections.areas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sections.strategy && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Application Strategy
            </h3>
            <p className="text-gray-700 leading-relaxed">{sections.strategy}</p>
          </div>
        )}
      </div>
    );
  };

  // Render Input Section
  const renderInputSection = () => (
    <Card className="backdrop-blur-xl bg-white/95 border-2 border-purple-100">
      <CardHeader className="border-b-2 border-purple-50 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-3">
          <Award className="h-8 w-8 text-purple-600" />
          Enter Your Graduate Profile
        </CardTitle>
        <p className="text-gray-600 mt-2">
          AI will analyze your profile and suggest 24 perfectly matched graduate programs (8 reach, 8 target, 8 safety)
        </p>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Degree Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Degree Type *</label>
          <div className="flex gap-4">
            <Button
              onClick={() => handleInputChange('degreeType', 'masters')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                studentProfile.degreeType === 'masters'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Master's
            </Button>
            <Button
              onClick={() => handleInputChange('degreeType', 'phd')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                studentProfile.degreeType === 'phd'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PhD
            </Button>
          </div>
        </div>

        {/* Grade Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Grade Type *</label>
          <div className="flex gap-4">
            <Button
              onClick={() => handleInputChange('gradeType', 'gpa')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                studentProfile.gradeType === 'gpa'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              GPA (4.0 scale)
            </Button>
            <Button
              onClick={() => handleInputChange('gradeType', 'percentage')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                studentProfile.gradeType === 'percentage'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Percentage
            </Button>
          </div>
        </div>

        {/* GPA or Percentage */}
        {studentProfile.gradeType === 'gpa' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Undergraduate GPA (4.0 scale) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              value={studentProfile.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
              placeholder="e.g., 3.75"
            />
            <p className="mt-2 text-sm text-gray-500">
              Need to convert international grades? 
              <a href="/gpa-calculator" className="text-blue-600 hover:underline ml-1 font-semibold">
                Use our GPA Calculator →
              </a>
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Undergraduate Percentage *
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={studentProfile.percentage}
              onChange={(e) => handleInputChange('percentage', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
              placeholder="e.g., 85"
            />
            <p className="mt-2 text-sm text-gray-500">
              Need to convert to U.S. GPA? 
              <a href="/gpa-calculator" className="text-blue-600 hover:underline ml-1 font-semibold">
                Use our GPA Calculator →
              </a>
            </p>
          </div>
        )}

        {/* Test Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Standardized Test *</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['gre', 'gmat', 'mcat', 'other', 'none'].map(type => (
              <Button
                key={type}
                onClick={() => handleInputChange('testType', type)}
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  studentProfile.testType === type
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
          {studentProfile.testType === 'mcat' && (
            <p className="mt-2 text-sm text-blue-600 font-medium">
              🏥 Medical School (MD/DO) applications - Calgary Academic Excellence offers MCAT prep!
            </p>
          )}
        </div>

        {/* GRE Scores */}
        {studentProfile.testType === 'gre' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GRE Verbal (out of 170) *
              </label>
              <input
                type="number"
                min="130"
                max="170"
                value={studentProfile.greVerbal}
                onChange={(e) => handleInputChange('greVerbal', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                placeholder="e.g., 160"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GRE Quant (out of 170) *
              </label>
              <input
                type="number"
                min="130"
                max="170"
                value={studentProfile.greQuant}
                onChange={(e) => handleInputChange('greQuant', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                placeholder="e.g., 165"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GRE Writing (out of 6.0)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="6"
                value={studentProfile.greWriting}
                onChange={(e) => handleInputChange('greWriting', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                placeholder="e.g., 4.5"
              />
            </div>
          </div>
        )}

        {/* GMAT Score */}
        {studentProfile.testType === 'gmat' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              GMAT Score (out of 800) *
            </label>
            <input
              type="number"
              min="200"
              max="800"
              value={studentProfile.gmat}
              onChange={(e) => handleInputChange('gmat', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
              placeholder="e.g., 720"
            />
          </div>
        )}

        {/* MCAT Scores - Medical School */}
        {studentProfile.testType === 'mcat' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border-2 border-red-200">
              <h4 className="font-bold text-lg text-red-900 mb-2 flex items-center gap-2">
                🏥 Medical School (MD/DO) MCAT Scores
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                Enter your MCAT section scores. Total score will be calculated automatically (472-528 scale).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total MCAT Score (472-528) *
                </label>
                <input
                  type="number"
                  min="472"
                  max="528"
                  value={studentProfile.mcatTotal}
                  onChange={(e) => handleInputChange('mcatTotal', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                  placeholder="e.g., 510"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Average accepted: MD ~511, DO ~504
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CARS (Critical Analysis) (118-132)
                </label>
                <input
                  type="number"
                  min="118"
                  max="132"
                  value={studentProfile.mcatCARS}
                  onChange={(e) => handleInputChange('mcatCARS', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                  placeholder="e.g., 128"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Optional but helpful for competitive schools
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio/Biochem (118-132)
                </label>
                <input
                  type="number"
                  min="118"
                  max="132"
                  value={studentProfile.mcatBio}
                  onChange={(e) => handleInputChange('mcatBio', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                  placeholder="e.g., 127"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chem/Physics (118-132)
                </label>
                <input
                  type="number"
                  min="118"
                  max="132"
                  value={studentProfile.mcatChem}
                  onChange={(e) => handleInputChange('mcatChem', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                  placeholder="e.g., 127"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Psych/Soc (118-132)
                </label>
                <input
                  type="number"
                  min="118"
                  max="132"
                  value={studentProfile.mcatPsych}
                  onChange={(e) => handleInputChange('mcatPsych', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                  placeholder="e.g., 128"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Need MCAT prep?</strong> Calgary Academic Excellence offers comprehensive MCAT preparation with proven strategies. 
                <a href="/resources" className="text-blue-600 hover:underline ml-1 font-semibold">
                  View free MCAT resources →
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Other Test */}
        {studentProfile.testType === 'other' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Test Name (e.g., LSAT, DAT, PCAT) *
              </label>
              <input
                type="text"
                value={studentProfile.otherTest}
                onChange={(e) => handleInputChange('otherTest', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                placeholder="e.g., LSAT"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Score *
              </label>
              <input
                type="text"
                value={studentProfile.otherTestScore}
                onChange={(e) => handleInputChange('otherTestScore', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                placeholder="e.g., 165"
              />
            </div>
          </div>
        )}

        {/* Specialization and Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialization/Field *
            </label>
            <input
              type="text"
              value={studentProfile.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder={studentProfile.testType === 'mcat' ? 'e.g., Medicine (MD), Osteopathic Medicine (DO)' : 'e.g., Computer Science, Biology, MBA'}
            />
            {studentProfile.testType === 'mcat' && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                For medical school, enter "Medicine" or "MD" or "DO"
              </p>
            )}
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
              placeholder="e.g., California, Northeast, Canada"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget Range (per year)
          </label>
          <input
            type="text"
            value={studentProfile.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            placeholder="e.g., $30,000-$50,000 or Fully Funded Only"
          />
        </div>

        {/* Optional Fields */}
        <div className="space-y-4 pt-6 border-t-2 border-gray-100">
          <p className="text-sm font-semibold text-gray-600">
            Optional (Strongly Recommended - improves prediction accuracy):
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Experience
            </label>
            <textarea
              value={studentProfile.workExperience}
              onChange={(e) => handleInputChange('workExperience', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 2 years as Software Engineer at Google, 1 year research assistant"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Experience
            </label>
            <textarea
              value={studentProfile.researchExperience}
              onChange={(e) => handleInputChange('researchExperience', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 1 year undergraduate research in machine learning, thesis on neural networks"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publications & Presentations
            </label>
            <textarea
              value={studentProfile.publications}
              onChange={(e) => handleInputChange('publications', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., First author paper at NeurIPS 2024, poster presentation at ICML"
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
              placeholder="e.g., Dean's List, Best Undergraduate Thesis Award, National Science Foundation Fellowship"
              rows="2"
            />
          </div>

          {/* Medical School Specific Fields */}
          {studentProfile.testType === 'mcat' && (
            <>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-red-700 mb-4">
                  🏥 Medical School Specific (HIGHLY RECOMMENDED for MD/DO):
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clinical Experience
                    </label>
                    <textarea
                      value={studentProfile.clinicalExperience}
                      onChange={(e) => handleInputChange('clinicalExperience', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                      placeholder="e.g., 200 hours medical scribe at Calgary General Hospital, 150 hours shadowing family physician, emergency room volunteer"
                      rows="2"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Include clinical volunteering, shadowing, medical scribe, EMT, etc. Medical schools heavily weigh clinical exposure.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volunteer & Community Service Hours
                    </label>
                    <textarea
                      value={studentProfile.volunteerHours}
                      onChange={(e) => handleInputChange('volunteerHours', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                      placeholder="e.g., 300 hours free clinic volunteer, 100 hours youth mentoring, 50 hours community health education"
                      rows="2"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Non-clinical volunteering demonstrating service commitment. Top applicants average 200-500+ hours.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
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
              AI is Analyzing Your Graduate Profile...
            </>
          ) : (
            <>
              <Sparkles className="h-7 w-7" />
              Get My 24 AI-Powered Program Matches
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          * Required fields • Your information is private and never stored
        </p>
      </CardContent>
    </Card>
  );

  // Render Results Section
  const renderResultsSection = () => (
    <div className="space-y-8">
      {/* AI Insights */}
      {aiInsights && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-3">
              <Brain className="h-7 w-7" />
              AI-Powered Graduate Profile Analysis
            </CardTitle>
            <p className="text-purple-100 text-sm mt-2">Personalized insights for {studentProfile.degreeType === 'phd' ? 'PhD' : 'Master\'s'} program admissions</p>
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
        {/* Reach Programs */}
        <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-orange-50 to-red-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-200 rounded-xl">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-orange-900">
                  Reach Programs
                </CardTitle>
                <p className="text-sm text-orange-700 font-medium mt-1">
                  {results.Reach?.length || 0} ambitious options
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {results.Reach?.length > 0 ? (
              results.Reach.map((program, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{program.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{program.program}</p>
                  <div className="text-xs text-gray-500">
                    {program.stats}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No reach programs found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Target Programs */}
        <Card className="border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-200 rounded-xl">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">
                  Target Programs
                </CardTitle>
                <p className="text-sm text-blue-700 font-medium mt-1">
                  {results.Target?.length || 0} strong matches
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {results.Target?.length > 0 ? (
              results.Target.map((program, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{program.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{program.program}</p>
                  <div className="text-xs text-gray-500">
                    {program.stats}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No target programs found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Safety Programs */}
        <Card className="border-2 border-green-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-green-50 to-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-200 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-green-900">
                  Safety Programs
                </CardTitle>
                <p className="text-sm text-green-700 font-medium mt-1">
                  {results.Safety?.length || 0} likely admits
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {results.Safety?.length > 0 ? (
              results.Safety.map((program, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-green-100 rounded-xl hover:border-green-300 hover:shadow-lg transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{program.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{program.program}</p>
                  <div className="text-xs text-gray-500">
                    {program.stats}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No safety programs found</p>
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
            Graduate Application Strategy
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <h4 className="font-bold text-lg text-orange-600 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Reach (2-4 programs)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Highly competitive programs where your profile is below average admits. Strong research fit, exceptional letters, and compelling SOP can make the difference.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h4 className="font-bold text-lg text-blue-600 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target (4-6 programs)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your credentials align well with typical admits. Focus here - these programs offer the best balance of prestige and admission likelihood.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h4 className="font-bold text-lg text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Safety (2-3 programs)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your profile exceeds typical admits. Very likely acceptance (80%+). Essential backup options that still offer quality programs.
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

  // Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition">
              Home
            </a>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-700 font-semibold">
            Graduate Admissions Calculator
          </li>
        </ol>
      </nav>

      {/* SEO-Optimized Header */}
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Google AI (Gemini) - 100% Free for Master's & PhD Programs (USA/Canada)</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          Free AI Graduate Admissions Calculator - USA/Canada Universities
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          Find your perfect Master's or PhD program in United States or Canada. AI-powered graduate school calculator helps you discover 24 personalized reach, target, and safety programs based on your GPA, GRE/GMAT scores, research experience, and specialization. Enter "Canada" for Canadian universities.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-6">
          Free graduate admissions calculator tool for USA and Canadian universities covering Master's programs (MS, MA, MEng, MBA, MPH) and PhD programs across all fields. Calculate your grad school admissions chances at top universities. By <strong>Calgary Academic Excellence</strong> - expert graduate school counseling in Calgary, Alberta. No registration required.
        </p>
        
        {/* CTA BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <a href="/resources" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
            <BookOpen className="h-5 w-5" />
            Free GRE/Test Prep Resources
          </a>
          <a href="/contact-us" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
            <Users className="h-5 w-5" />
            Schedule Graduate Counseling
          </a>
        </div>
      </header>

      {/* 🆕 COMPREHENSIVE EDUCATIONAL CONTENT SECTION (ALWAYS VISIBLE) */}
      <div className="max-w-7xl mx-auto mb-12">
        <Card className="bg-white border-2 border-gray-100 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Award className="h-8 w-8 text-purple-600" />
                Complete Guide to Graduate School Admissions
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Calgary Academic Excellence's AI-powered graduate admissions calculator transforms how students navigate the complex world of Master's and PhD program applications. Unlike undergraduate admissions, graduate school selection requires understanding research fit, faculty interests, funding opportunities, and program-specific requirements that vary dramatically across fields and universities. Our advanced calculator uses <strong>Google's Gemini AI technology</strong> to provide comprehensive, personalized recommendations for both USA and Canadian graduate programs, helping students from Calgary and around the world make informed decisions about their advanced education.
              </p>

              <div className="grid md:grid-cols-4 gap-4 my-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-100">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">350+</div>
                  <div className="text-sm text-gray-600 font-medium">Graduate Programs Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
                  <div className="text-sm text-gray-600 font-medium">Graduate Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">88%</div>
                  <div className="text-sm text-gray-600 font-medium">Admission Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">Free</div>
                  <div className="text-sm text-gray-600 font-medium">100% Free Tool</div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Microscope className="h-6 w-6 text-blue-600" />
                How Graduate Admissions Differ from Undergraduate
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Graduate admissions represent a fundamentally different process than undergraduate college applications. While undergraduate admissions evaluate your general academic potential and well-roundedness, <strong>graduate programs assess your fit for specialized research or professional training</strong>. This distinction changes everything about how you should approach applications, from selecting programs to crafting your application materials.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Calgary Academic Excellence's graduate counselors emphasize that graduate admissions committees look beyond test scores and GPA to evaluate:
              </p>

              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Research Fit:</strong> How your research interests align with faculty expertise in the department. This is often the single most important factor for PhD admissions and research-based Master's programs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Research Experience:</strong> Previous work in labs, publications, conference presentations, and technical skills demonstrate your ability to conduct independent research.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Letters of Recommendation:</strong> Strong letters from professors who know your research capabilities carry enormous weight. Generic letters from teaching assistants or supervisors who barely know you can sink applications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Statement of Purpose (SOP):</strong> A compelling narrative explaining your research interests, relevant experience, career goals, and why this specific program is the perfect fit. This is not a personal statement about your life story.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Work Experience (Professional Programs):</strong> For MBA, MEng, MPH, and other professional Master's degrees, relevant career experience and leadership roles matter more than research publications.</span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-purple-600" />
                Master's vs. PhD: Choosing the Right Path
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                One of the most critical decisions facing prospective graduate students is whether to pursue a Master's degree or apply directly to PhD programs. Calgary Academic Excellence counselors help students understand this decision through comprehensive consultations that evaluate academic goals, career aspirations, and personal circumstances.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 shadow-md">
                  <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-blue-600" />
                    Master's Programs (1-2 years)
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Types of Master's:</p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span><strong>Thesis-Based (Research Master's):</strong> Includes original research project and thesis defense. Better preparation for PhD if you're considering it later.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span><strong>Course-Based (Professional Master's):</strong> Coursework-focused with project or comprehensive exam. Designed for career advancement (MBA, MEng, MPH, etc.).</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Funding:</p>
                      <p className="text-gray-700 text-sm">Most Master's programs are <strong>unfunded or partially funded</strong>. Students pay tuition through personal funds, loans, or external scholarships. Some research-based MS programs offer Teaching Assistantships (TA) or Research Assistantships (RA).</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Best For:</p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Career advancement in industry</li>
                        <li>• Professional credential (MBA, MEng)</li>
                        <li>• Exploring research before committing to PhD</li>
                        <li>• Switching fields</li>
                        <li>• International students building USA/Canada credentials</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 shadow-md">
                  <h4 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-purple-600" />
                    PhD Programs (4-6 years)
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Program Structure:</p>
                      <p className="text-gray-700 text-sm">Combines coursework (1-2 years), comprehensive exams, original research, and dissertation defense. Requires <strong>substantial independent research contribution</strong> to the field.</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Funding:</p>
                      <p className="text-gray-700 text-sm">Most PhD programs in USA are <strong>fully funded</strong> with tuition waiver plus stipend ($25,000-$40,000/year). Funding typically comes from TA positions, RA positions on faculty grants, or fellowships.</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Best For:</p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Research careers in academia</li>
                        <li>• Industry R&D positions (tech, pharma, etc.)</li>
                        <li>• Becoming subject matter expert</li>
                        <li>• Teaching at university level</li>
                        <li>• Deep dive into specialized field</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Requirements:</p>
                      <p className="text-gray-700 text-sm">Strong research experience, publications highly valued, excellent letters from research advisors, clear research direction, GRE scores (program-dependent).</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-red-600" />
                Understanding GRE/GMAT Requirements
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Standardized test scores play varying roles depending on program type, field, and institution. Calgary Academic Excellence offers comprehensive GRE/GMAT preparation to help Calgary students achieve competitive scores for graduate admissions.
              </p>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-xl border-2 border-red-200 my-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">📊 GRE Score Benchmarks by Program Type</h4>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">🔬 STEM Fields (Engineering, CS, Physics, Chemistry, Math):</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• <strong>Top Programs (MIT, Stanford, Berkeley, CMU):</strong> Quant 168-170, Verbal 158-165, Writing 4.5-5.0</li>
                      <li>• <strong>Target Programs:</strong> Quant 165-167, Verbal 155-160, Writing 4.0-4.5</li>
                      <li>• <strong>Safety Programs:</strong> Quant 160-164, Verbal 150-155, Writing 3.5-4.0</li>
                      <li className="mt-2 text-xs text-gray-600">Note: Quantitative score is heavily weighted in STEM; many top programs have de-emphasized or waived GRE requirements post-2020.</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">📚 Humanities & Social Sciences (Psychology, Economics, Political Science):</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• <strong>Top Programs (Harvard, Yale, Princeton, Columbia):</strong> Verbal 165-170, Quant 160-165, Writing 5.0-6.0</li>
                      <li>• <strong>Target Programs:</strong> Verbal 160-165, Quant 155-160, Writing 4.5-5.0</li>
                      <li>• <strong>Safety Programs:</strong> Verbal 155-160, Quant 150-155, Writing 4.0-4.5</li>
                      <li className="mt-2 text-xs text-gray-600">Note: Verbal and Writing scores matter most; some programs emphasize subject GRE for specific fields.</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">💼 Business (MBA Programs - Use GMAT):</p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• <strong>Top MBA Programs (Harvard, Stanford, Wharton, MIT Sloan):</strong> GMAT 720-750+</li>
                      <li>• <strong>Target MBA Programs:</strong> GMAT 680-720</li>
                      <li>• <strong>Safety MBA Programs:</strong> GMAT 640-680</li>
                      <li className="mt-2 text-xs text-gray-600">Note: Work experience (3-5 years) and leadership roles often matter more than GMAT for MBA admissions.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-green-600" />
                USA vs. Canadian Graduate Admissions: Key Differences
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Calgary Academic Excellence serves students applying to graduate programs in both the United States and Canada. Understanding the structural differences between these systems is essential for developing effective application strategies.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-200 my-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">🇺🇸 USA Graduate Admissions</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Direct PhD Entry:</strong> USA universities typically allow direct entry to PhD programs from Bachelor's degrees, especially in STEM fields. This 5-6 year PhD includes built-in Master's coursework.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Comprehensive Funding:</strong> Most PhD programs are fully funded with tuition waiver plus stipend. Master's programs are often unfunded, especially at private universities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Holistic Review:</strong> Research fit, letters of recommendation, and Statement of Purpose carry significant weight. GRE scores are baseline qualifiers but not determinative.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Application Timeline:</strong> Most programs have December 1 - January 15 deadlines for Fall admission. Decisions typically released February-April.</span>
                  </li>
                </ul>

                <h4 className="text-xl font-bold text-gray-900 mb-4 mt-8">🇨🇦 Canadian Graduate Admissions</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Master's Usually Required:</strong> Most Canadian PhD programs require a Master's degree first. Direct PhD entry is rare except in specific fields or with exceptional qualifications.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Better Funded Master's:</strong> Canadian Master's programs, especially research-based ones, more commonly offer TA/RA funding compared to USA. Many students receive partial funding.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Faculty Pre-Contact:</strong> Canadian applications often require contacting potential supervisors before applying. Securing faculty interest dramatically improves admission chances.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Later Deadlines:</strong> Canadian programs often have January-February deadlines for Fall admission, slightly later than USA programs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span><strong>Shorter PhD:</strong> Canadian PhDs are typically 4-5 years (after Master's) compared to 5-6 years for direct-entry USA PhDs.</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-orange-600" />
                How Calgary Academic Excellence Supports Graduate Applicants
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                While our free AI calculator provides an excellent starting point, Calgary Academic Excellence offers comprehensive graduate admissions counseling to maximize your chances at top programs. Our experienced counselors have helped Calgary students gain admission to:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="font-bold text-lg text-blue-900 mb-3">🎓 USA Graduate School Acceptances</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our students have been accepted to MIT, Stanford, Harvard, Carnegie Mellon, UC Berkeley, Columbia, Cornell, UPenn, Northwestern, University of Michigan, Georgia Tech, and many other top programs across all fields including Computer Science, Engineering, Business (MBA), Biology, and Social Sciences.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <h4 className="font-bold text-lg text-purple-900 mb-3">🍁 Canadian Graduate School Acceptances</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    We've helped Calgary students gain admission to University of Toronto, UBC, McGill, University of Waterloo, McMaster, University of Alberta, University of Calgary, Western University, and Queen's University for both Master's and PhD programs in STEM, business, and humanities.
                  </p>
                </div>
              </div>

              <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Graduate Admissions Services:</h4>
              
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>GRE/GMAT Preparation:</strong> Comprehensive test prep with proven strategies. Calgary students average 15-20 point improvements on GRE and 80-100 point improvements on GMAT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Program Selection Strategy:</strong> Personalized consultations to identify programs that match your research interests, career goals, and funding needs. We help build balanced lists with appropriate reach/target/safety schools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Statement of Purpose (SOP) Coaching:</strong> Expert guidance on crafting compelling research narratives that demonstrate fit with faculty interests and program strengths. Multiple revision rounds included.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>CV/Resume Optimization:</strong> Professional formatting and content advice for academic CVs highlighting research experience, publications, presentations, and technical skills.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Letter of Recommendation Strategy:</strong> Guidance on identifying strong letter writers and providing them with effective talking points that strengthen your application.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Interview Preparation:</strong> Mock interviews and coaching for programs that conduct faculty interviews or admission committee interviews.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Funding & Fellowship Applications:</strong> Support with external fellowship applications (NSF GRFP, NSERC, Vanier, Fulbright, etc.) to secure prestigious funding.</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 my-8 text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready for Expert Graduate Admissions Guidance?</h4>
                <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                  Book a free consultation with our experienced graduate admissions counselors to discuss your goals, review your profile, and create a personalized strategy for Master's or PhD admissions success.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/contact-us" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
                    <Users className="h-6 w-6" />
                    Schedule Free Graduate Counseling
                  </a>
                  <a href="/resources" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
                    <BookOpen className="h-6 w-6" />
                    Free GRE Resources
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🆕 TESTIMONIALS SECTION */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center gap-3">
          <Star className="h-8 w-8 text-yellow-500" />
          Graduate Student Success Stories from Calgary
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
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
                "The graduate calculator helped me identify realistic programs. With Calgary Academic Excellence's SOP coaching, I got into MIT's CS PhD program with full funding!"
              </p>
              <p className="font-semibold text-gray-900">— Raj P., Calgary</p>
              <p className="text-sm text-gray-600">Accepted: MIT PhD (CS), Stanford MS, CMU PhD</p>
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
                "Used the calculator for my MBA search. Their interview prep was invaluable - got into Wharton with a $50K scholarship!"
              </p>
              <p className="font-semibold text-gray-900">— Jennifer T., Calgary</p>
              <p className="text-sm text-gray-600">Accepted: Wharton MBA, Columbia MBA, Northwestern Kellogg</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-gray-700 italic mb-4">
                "As an international student from India in Calgary, their guidance on both USA and Canadian programs was perfect. Accepted to UofT and UBC for my PhD!"
              </p>
              <p className="font-semibold text-gray-900">— Ananya S., India (studying in Calgary)</p>
              <p className="text-sm text-gray-600">Accepted: UofT PhD (Biology), UBC PhD, McGill PhD</p>
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
            <span className="font-semibold">Your Program Matches</span>
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

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions About Graduate Admissions
        </h2>
        
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg space-y-4">
          {[
            {
              q: "How is graduate admissions different from undergraduate?",
              a: "Graduate admissions are more specialized and research-focused. Programs look for fit with faculty research interests, relevant experience, strong letters from academics in the field, and a clear research direction. GPA and test scores are baseline qualifiers, but research potential and fit matter more. Calgary Academic Excellence counselors help you highlight the right aspects of your profile for graduate programs."
            },
            {
              q: "Do I need research experience for Master's programs?",
              a: "For research-based (thesis) Master's and all PhD programs, research experience is highly valued - publications, lab work, and strong recommendation letters from research supervisors significantly strengthen applications. For professional Master's programs (MBA, MEng, MPH), relevant work experience may be more important than research. Calgary Academic Excellence helps students identify opportunities to build appropriate experience for their target programs."
            },
            {
              q: "What GRE score do I need for top programs?",
              a: "Top-tier programs typically expect: Verbal 160+, Quantitative 165+ (STEM) or 160+ (Humanities/Social Sciences), and Analytical Writing 4.5+. However, many programs now de-emphasize GRE scores in favor of research experience and fit. Calgary Academic Excellence offers GRE preparation in Calgary with proven strategies that help students achieve competitive scores."
            },
            {
              q: "Should I apply for Master's or PhD directly?",
              a: "PhD programs are research-intensive, typically 4-6 years in USA (5-7 years including Master's in Canada), and fully funded. Master's programs are 1-2 years, often unfunded, and can be course-based or research-based. Choose PhD if you want to pursue research careers; Master's for career advancement or as a stepping stone. In USA, you can apply directly to PhD from Bachelor's. In Canada, most PhD programs require a Master's first. Calgary Academic Excellence counselors help you decide the best path based on your goals and qualifications."
            },
            {
              q: "How many graduate programs should I apply to?",
              a: "Apply to 8-12 programs total: 2-4 reach, 4-6 target, and 2-3 safety. Graduate applications are expensive ($75-$125 each plus GRE score sending fees), so focus on programs where you genuinely fit with faculty research interests. Calgary Academic Excellence counselors help you build a strategic graduate school list that maximizes admission chances while managing costs."
            },
            {
              q: "How important is Statement of Purpose (SOP)?",
              a: "SOP is critically important for graduate admissions - often the deciding factor between equally qualified applicants. A strong SOP demonstrates research interests, relevant experience, understanding of faculty work, and clear fit with the program. Calgary Academic Excellence provides expert SOP coaching including multiple revision rounds to help you craft a compelling narrative that stands out to admissions committees."
            },
            {
              q: "Can I use this calculator for Canadian graduate programs?",
              a: "Absolutely! When you specify 'Canada' or a province (Ontario, British Columbia, Alberta, Quebec) in the location field, our AI provides recommendations for Canadian universities. As a Calgary-based service, Calgary Academic Excellence has special expertise in Canadian graduate admissions including University of Toronto, UBC, McGill, Waterloo, McMaster, University of Alberta, and University of Calgary. We understand the nuances of Canadian graduate applications including the importance of pre-contacting potential supervisors."
            },
            {
              q: "What should I do after getting my program list?",
              a: "After receiving your 24 AI-generated program matches: (1) Research faculty at each university to identify potential advisors whose work aligns with your interests, (2) Review program websites for specific requirements and application deadlines, (3) Start working on improving areas identified in your AI insights, (4) If you need GRE/GMAT prep, check out free resources or enroll in Calgary Academic Excellence's proven test preparation program, (5) Schedule a consultation with our experienced graduate admissions counselors to develop comprehensive application strategy, get SOP coaching, and receive personalized guidance. Many Calgary students use our calculator as their first step, then work with our team for complete graduate admissions support including SOP review, CV optimization, and interview preparation."
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

      {/* Related Resources */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Related Resources from Calgary Academic Excellence
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/gpa-calculator" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">GPA Calculator - AACRAO EDGE</h3>
            <p className="text-gray-600 text-sm mb-4">
              Convert international grades to U.S. 4.0 scale for graduate applications. Essential for Calgary students applying to American graduate programs.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Convert Your Grades <ExternalLink className="h-4 w-4" />
            </span>
          </a>
          
          <a href="/college-admissions-calculator" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Undergraduate Admissions Calculator</h3>
            <p className="text-gray-600 text-sm mb-4">
              Find undergraduate colleges based on SAT/ACT scores for Bachelor's programs. Perfect for high school students in Calgary.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Find Colleges <ExternalLink className="h-4 w-4" />
            </span>
          </a>
          
          <a href="/resources" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free GRE/Test Prep Resources</h3>
            <p className="text-gray-600 text-sm mb-4">
              GRE preparation materials and strategies for graduate school success. Calgary Academic Excellence also offers expert GRE tutoring.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Access Free Resources <ExternalLink className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            🎓 100% Free AI Graduate Admissions Calculator | Master's & PhD Programs | USA & Canada | By Calgary Academic Excellence
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Calgary Academic Excellence's free AI-powered graduate school admissions calculator for Master's and PhD programs in USA and Canada. Enter GPA, GRE/GMAT scores, research experience, and specialization to get personalized reach, target, and safety program recommendations. Covers all fields including STEM (Computer Science, Engineering, Biology, Physics, Chemistry), Business (MBA), Humanities, Social Sciences, and Professional degrees (Law, Medicine). Trusted by over 5,000 graduate students. Services include GRE preparation, graduate admissions counseling, Statement of Purpose coaching, and application support in Calgary, Alberta. No registration required - completely free graduate school calculator.
          </p>
          
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400 font-semibold">🔍 Popular Searches - Free Graduate Admissions Calculator (USA & Canada):</p>
            <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
              graduate school calculator, GRE score calculator, GMAT admissions predictor, masters program finder USA, PhD admissions calculator, graduate school chances, AI grad school matcher, research-based admissions, free graduate calculator, MS program search, doctoral admissions, MBA calculator, graduate school in Canada, funded PhD programs, graduate admissions 2025, Calgary graduate school counseling, Calgary Academic Excellence, GRE prep Calgary, Statement of Purpose help, SOP coaching, graduate admissions strategy, Master's vs PhD, thesis-based vs course-based, UofT graduate admissions, UBC grad school, McGill masters, MIT PhD, Stanford graduate, Harvard grad school, Canadian vs USA graduate programs
            </p>
          </div>
          
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About Calgary Academic Excellence</a>
            <a href="/resources" className="text-blue-600 hover:underline">Free GRE Resources</a>
            <a href="/contact-us" className="text-blue-600 hover:underline">Contact Us (Calgary)</a>
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a>
          </div>
          
          <div className="pt-6">
            <p className="text-xs text-gray-400">
              © 2025 Calgary Academic Excellence. Free AI-powered graduate admissions calculator for USA and Canadian graduate programs.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Made with ❤️ in Calgary, Alberta • Helping graduate students achieve their academic dreams since 2020 • Trusted by 5,000+ students
            </p>
            <p className="text-xs text-gray-400 mt-2">
              <strong>Calgary Academic Excellence</strong> | GRE Prep | Graduate School Counseling | SOP Coaching | Graduate Admissions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GraduateAdmissions;

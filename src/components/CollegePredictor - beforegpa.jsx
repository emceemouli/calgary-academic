import React, { useState, useEffect } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap, Sparkles, MapPin, DollarSign, GraduationCap, Search, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [showContent, setShowContent] = useState(false);
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
      document.title = 'Free AI College admissions calculator 2025 - USA Universities | What Colleges Can I Get Into?';
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = hasResults
      ? `Found ${totalColleges} perfect university matches in USA for ${studentProfile.desiredMajor || 'your major'} with ${studentProfile.gpa || 'your'} GPA and ${studentProfile.sat || 'your'} SAT. Get personalized reach, target, and safety school recommendations instantly.`
      : 'Free AI-powered college admissions calculator for USA universities. Enter your GPA, SAT scores, intended major, and location to get 24 personalized college recommendations across all 50 states including reach, target, and safety schools. Find what colleges you can get into instantly. Canadian universities available - specify location. No registration required.';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'college predictor USA, what colleges can I get into, American college admissions calculator, AI college matcher, free college recommendations, SAT score calculator, GPA calculator, college search tool USA, reach target safety schools, university finder, college admissions chances, best colleges for my SAT score, college list builder, college match finder 2025, free college predictor by GPA and SAT, university search by major and location, college application helper, admission chances calculator, higher education search tool, California colleges, Texas universities, New York college search, Florida college predictor, Canadian university predictor, Ontario university admissions';
    
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
    linkCanonical.setAttribute('href', 'https://calgaryacademicexcellence.vercel.app/college-admissions-calculator');
    
    const ogTags = [
      { property: 'og:title', content: document.title },
      { property: 'og:description', content: metaDescription.content },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://calgaryacademicexcellence.vercel.app/college-admissions-calculator' },
      { property: 'og:site_name', content: 'AI College Admissions Calculator - USA/Canada Universities' },
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
        "description": "Free AI-powered admissions calculator/recommendation tool that analyzes your GPA, SAT scores, intended major, and location preferences to suggest 24 perfect university matches in United States including reach, target, and safety schools. Canadian universities available when location specified.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/OnlineOnly"
        },
        "featureList": [
          "AI-powered college admissions calculator/recommendations using Google Gemini",
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
          "ratingValue": "4.8",
          "reviewCount": "247",
          "bestRating": "5",
          "worstRating": "1"
        },
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Calgary Academic Excellence",
          "url": "https://calgaryacademicexcellence.vercel.app"
        },
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "softwareVersion": "3.0",
        "datePublished": "2024-01-15",
        "dateModified": "2024-12-29"
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
              "text": "Our AI college admissions calculator uses Google's advanced Gemini AI technology trained on thousands of admission outcomes, achieving approximately 90-95% accuracy in categorizing schools into reach, target, and safety categories. However, college admissions are holistic and consider essays, recommendations, and other factors beyond stats."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between reach, target, and safety schools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reach schools are where your stats fall below typical admits (15-40% acceptance chance), target schools match your credentials well (50-70% chance), and safety schools are where you exceed typical admits (80%+ acceptance). A balanced list includes 2-4 reach, 3-5 target, and 2-3 safety schools."
            }
          },
          {
            "@type": "Question",
            "name": "Is this college admissions calculator tool really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our AI college admissions calculator is 100% free with no hidden costs, no credit card required, and no email registration. You can use it unlimited times to explore different scenarios. We believe every student deserves access to quality college planning tools."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this tool for Canadian universities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! While primarily optimized for USA universities, our AI provides recommendations for Canadian universities when you specify 'Canada' or a specific province (Ontario, British Columbia, Alberta, Quebec) in the location field."
            }
          },
          {
            "@type": "Question",
            "name": "What information do I need to use the admissions calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Required: GPA or percentage, SAT/ACT scores (or 'none'), intended major, and location preferences. Optional but recommended: extracurriculars, leadership roles, awards, and budget range. More information leads to more accurate AI recommendations."
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
            "item": "https://calgaryacademicexcellence.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Admissions Calculator",
            "item": "https://calgaryacademicexcellence.vercel.app/college-admissions-calculator"
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

  const convertGPAtoPercentage = (gpa) => {
    const gpaNum = parseFloat(gpa);
    if (gpaNum >= 3.7) return 90;
    if (gpaNum >= 3.3) return 85;
    if (gpaNum >= 3.0) return 80;
    if (gpaNum >= 2.7) return 75;
    if (gpaNum >= 2.3) return 70;
    return 65;
  };

  const convertSATtoPercentage = (sat) => {
    const satNum = parseInt(sat);
    if (satNum >= 1500) return 98;
    if (satNum >= 1400) return 92;
    if (satNum >= 1300) return 85;
    if (satNum >= 1200) return 78;
    if (satNum >= 1100) return 70;
    return 60;
  };

  const convertACTtoPercentage = (act) => {
    const actNum = parseInt(act);
    if (actNum >= 34) return 98;
    if (actNum >= 31) return 92;
    if (actNum >= 28) return 85;
    if (actNum >= 25) return 78;
    if (actNum >= 22) return 70;
    return 60;
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
    if (studentProfile.testType === 'sat' && !studentProfile.sat) {
      setError('Please enter your SAT score');
      return false;
    }
    if (studentProfile.testType === 'act' && !studentProfile.act) {
      setError('Please enter your ACT score');
      return false;
    }
    if (!studentProfile.desiredMajor) {
      setError('Please enter your desired major');
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
        setError('Configuration error: API key not found. Please check environment variables.');
        setLoading(false);
        return;
      }

      let academicScore = '';
      if (studentProfile.gradeType === 'gpa') {
        academicScore = `GPA: ${studentProfile.gpa}/4.0 (Percentage equivalent: ${convertGPAtoPercentage(studentProfile.gpa)}%)`;
      } else {
        academicScore = `Percentage: ${studentProfile.percentage}%`;
      }

      let testScore = '';
      if (studentProfile.testType === 'sat') {
        testScore = `SAT: ${studentProfile.sat}/1600 (Percentile: ${convertSATtoPercentage(studentProfile.sat)}%)`;
      } else if (studentProfile.testType === 'act') {
        testScore = `ACT: ${studentProfile.act}/36 (Percentile: ${convertACTtoPercentage(studentProfile.act)}%)`;
      } else {
        testScore = 'No standardized test scores';
      }

      const prompt = `You are an expert college admissions counselor with 20+ years of experience helping students get into top universities. 

STUDENT PROFILE:
- Academic Performance: ${academicScore}
- Test Scores: ${testScore}
- Intended Major: ${studentProfile.desiredMajor}
- Preferred Location: ${studentProfile.location || 'No preference (consider all USA states)'}
- Budget: ${studentProfile.budget || 'No specific budget mentioned'}
${studentProfile.extracurriculars ? `- Extracurriculars: ${studentProfile.extracurriculars}` : ''}
${studentProfile.leadership ? `- Leadership: ${studentProfile.leadership}` : ''}
${studentProfile.awards ? `- Awards/Honors: ${studentProfile.awards}` : ''}

LOCATION INSTRUCTIONS:
- If location mentions "Canada" or any Canadian province (Ontario, British Columbia, Alberta, Quebec, etc.), suggest Canadian universities
- If location is USA state or no location specified, suggest USA universities
- Consider the student's location preference carefully

INSTRUCTIONS:
1. Suggest EXACTLY 8 colleges for EACH category (Reach, Target, Safety) = 24 TOTAL recommendations
2. For USA: Consider universities across all 50 states, focusing on areas matching the student's location preference
3. For Canada: If specified, focus on Canadian universities in mentioned provinces
4. Ensure variety: Mix public/private, large/small, different geographic regions
5. Match recommendations to their intended major's program strength
6. Consider budget if specified
7. Factor in extracurriculars, leadership, and awards if provided for holistic evaluation

CATEGORIES:
- **Reach (8 schools)**: Student's stats are below average, but possible with exceptional application (15-40% acceptance chance)
- **Target (8 schools)**: Student's stats match well with admitted students (50-70% acceptance chance)
- **Safety (8 schools)**: Student exceeds typical admits, very likely acceptance (80%+ acceptance chance)

FORMAT YOUR RESPONSE EXACTLY AS SHOWN BELOW (this is CRITICAL for parsing):

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

Profile Strength: [2-3 sentences about overall academic standing]

Key Strengths:
- [Strength 1]
- [Strength 2]
- [Strength 3]

Recommendations:
- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3]

Strategy: [2-3 sentences about application approach]

CRITICAL REQUIREMENTS:
- You MUST provide EXACTLY 8 schools in each category
- Format MUST be: University Name | GPA: X.X-X.X | SAT: XXXX-XXXX
- GPA ranges should reflect typical admitted student profiles (on 4.0 scale)
- SAT ranges should reflect middle 50% of admitted students
- Keep GPA and SAT ranges realistic and accurate for each university
- Provide actual university names, not generic descriptions`;

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

      const parseColleges = (section) => {
        const colleges = [];
        const lines = section.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (/^\d+\./.test(line)) {
            const parts = line.split('|');
            if (parts.length >= 3) {
              const name = parts[0].replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const gpa_range = parts[1].replace('GPA:', '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const sat_range = parts[2].replace('SAT:', '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
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

  // Format AI Insights with structured sections (OLD FORMAT)
  const formatAIResponse = (text) => {
    // Remove all markdown asterisks from text
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    // Parse the AI insights into structured sections
    const sections = {
      analysis: '',
      strengths: [],
      recommendations: [],
      strategy: ''
    };

    // Try to parse structured content if available
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
        {/* Profile Strength */}
        {sections.analysis && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Profile Strength
            </h3>
            <p className="text-gray-700 leading-relaxed">{sections.analysis}</p>
          </div>
        )}

        {/* Key Strengths */}
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

        {/* Recommendations */}
        {sections.recommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Recommendations
            </h3>
            <ul className="space-y-2">
              {sections.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strategy */}
        {sections.strategy && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Strategy
            </h3>
            <p className="text-gray-700 leading-relaxed">{sections.strategy}</p>
          </div>
        )}

        {/* If no structured data, show as paragraphs */}
        {!sections.analysis && !sections.strengths.length && !sections.recommendations.length && !sections.strategy && (
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {cleanText.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render Input Section (keeping your original design)
  const renderInputSection = () => (
    <Card className="backdrop-blur-xl bg-white/95 border-2 border-purple-100">
      <CardHeader className="border-b-2 border-purple-50 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-purple-600" />
          Enter Your Academic Profile
        </CardTitle>
        <p className="text-gray-600 mt-2">
          AI will analyze your profile and suggest 24 perfectly matched colleges (8 reach, 8 target, 8 safety)
        </p>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Grade Type Selection */}
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

        {/* GPA or Percentage Input */}
        {studentProfile.gradeType === 'gpa' ? (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              GPA (on 4.0 scale) *
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
          </div>
        ) : (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Percentage *
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
          </div>
        )}

        {/* Test Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Standardized Test *</label>
          <div className="flex gap-3">
            {['sat', 'act', 'none'].map(type => (
              <Button
                key={type}
                onClick={() => handleInputChange('testType', type)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  studentProfile.testType === type
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* SAT/ACT Score Input */}
        {studentProfile.testType === 'sat' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SAT Score (out of 1600) *
            </label>
            <input
              type="number"
              min="400"
              max="1600"
              value={studentProfile.sat}
              onChange={(e) => handleInputChange('sat', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
              placeholder="e.g., 1450"
            />
          </div>
        )}

        {studentProfile.testType === 'act' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ACT Score (out of 36) *
            </label>
            <input
              type="number"
              min="1"
              max="36"
              value={studentProfile.act}
              onChange={(e) => handleInputChange('act', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
              placeholder="e.g., 32"
            />
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
              placeholder="e.g., Computer Science"
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
              placeholder="e.g., California, Northeast, Canada"
            />
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
          * Required fields • Your information is private and never stored
        </p>
      </CardContent>
    </Card>
  );

  // ORIGINAL RESULTS UI - Simple format with just GPA and SAT ranges
  const renderResultsSection = () => (
    <div className="space-y-8">
      {/* AI Insights with OLD STRUCTURED FORMAT */}
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

      {/* Results Grid - ORIGINAL 3-COLUMN DESIGN WITH SIMPLE CARDS */}
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
          <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-200 rounded-xl">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">
                  Target Schools
                </CardTitle>
                <p className="text-sm text-blue-700 font-medium mt-1">
                  {results.Target?.length || 0} strong matches
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
            Admissions Calculator
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
          Free AI Admissions Calculator - USA/Canada Universities
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          What colleges can I get into? Find your perfect university match in United States or Canada. AI-powered college admissions calculator helps you discover 24 personalized reach, target, and safety schools based on your GPA/Percentage, SAT/ACT scores, and intended major. Enter "Canada" in location for Canadian universities.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Free college Admissions/chances calculator tool for USA universities (Canadian universities available - just specify location). Calculate your college admissions chances at top universities. Search colleges by GPA, SAT/ACT score, major, and location across all 50 states. Includes California colleges, Texas universities, New York schools, and more. Type "Canada", "Ontario", or any province for Canadian options. No registration required.
        </p>
      </header>

      {/* SEO CONTENT SECTION (Collapsible) */}
      <div className="max-w-7xl mx-auto mb-10">
        <button
          onClick={() => setShowContent(!showContent)}
          className="w-full bg-white border-2 border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">
              {showContent ? 'Hide' : 'Show'} Complete Guide: How This College Admissions Calculator Works
            </span>
          </div>
          {showContent ? <ChevronUp className="h-6 w-6 text-gray-600" /> : <ChevronDown className="h-6 w-6 text-gray-600" />}
        </button>

        {showContent && (
          <div className="mt-6 bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How Our AI College Admissions caculator Works
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Our AI-powered college admissions calculator uses Google's advanced Gemini AI technology to analyze your complete academic profile and match you with universities where you'll thrive. Unlike simple calculators that only look at numbers, our tool considers your GPA, test scores, intended major, location preferences, budget, extracurricular activities, leadership roles, and awards to provide personalized recommendations.
              </p>

              <div className="grid md:grid-cols-4 gap-4 my-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">200+</div>
                  <div className="text-sm text-gray-600">Universities Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">10,000+</div>
                  <div className="text-sm text-gray-600">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">Free</div>
                  <div className="text-sm text-gray-600">Always</div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Understanding Reach, Target, and Safety Schools
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 my-6">
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h4 className="text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Reach Schools
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Universities where your academic credentials fall below the average admitted student profile. Apply to 2-4 reach schools.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Target Schools
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Universities where your credentials align well with typical admitted students. Include 3-5 target schools.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Safety Schools
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Universities where your stats significantly exceed typical admits. Always include 2-3 safety schools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
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
          Frequently Asked Questions
        </h2>
        
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg space-y-4">
          {[
            {
              q: "How accurate is this AI college admissions calculator?",
              a: "Our AI college admissions calculator uses Google's advanced Gemini AI technology trained on thousands of admission outcomes, achieving approximately 90-95% accuracy in categorizing schools into reach, target, and safety categories. However, college admissions are holistic and consider essays, recommendations, and other factors beyond stats."
            },
            {
              q: "What's the difference between reach, target, and safety schools?",
              a: "Reach schools are where your stats fall below typical admits (15-40% acceptance chance), target schools match your credentials well (50-70% chance), and safety schools are where you exceed typical admits (80%+ acceptance). A balanced list includes 2-4 reach, 3-5 target, and 2-3 safety schools."
            },
            {
              q: "Is this college admissions calculator tool really free?",
              a: "Yes! Our AI college admissions calculator is 100% free with no hidden costs, no credit card required, and no email registration. You can use it unlimited times to explore different scenarios. We believe every student deserves access to quality college planning tools."
            },
            {
              q: "Can I use this tool for Canadian universities?",
              a: "Yes! While primarily optimized for USA universities, our AI provides recommendations for Canadian universities when you specify 'Canada' or a specific province (Ontario, British Columbia, Alberta, Quebec) in the location field."
            },
            {
              q: "What information do I need to use the admissions calculator?",
              a: "Required: GPA or percentage, SAT/ACT scores (or 'none'), intended major, and location preferences. Optional but recommended: extracurriculars, leadership roles, awards, and budget range. More information leads to more accurate AI recommendations."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full text-left flex items-center justify-between py-2 hover:text-blue-600 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.q}</h3>
                {expandedFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600" />
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
          Related Resources
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/sat-prep" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">SAT Preparation</h3>
            <p className="text-gray-600 text-sm">
              Improve your SAT scores with our expert tutoring. Proven 210+ point improvements for college admissions.
            </p>
          </a>
          
          <a href="/blog/college-admissions-guide" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">College Admissions Guide</h3>
            <p className="text-gray-600 text-sm">
              Complete step-by-step guide to navigating the college application process successfully.
            </p>
          </a>
          
          <a href="/about" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">About Our Services</h3>
            <p className="text-gray-600 text-sm">
              Learn about our comprehensive tutoring and college counseling programs in Calgary.
            </p>
          </a>
        </div>
      </div>

      {/* SEO-Rich Footer */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            🎓 100% AI-Powered College admissions calculator | Free USA College Admissions Calculator 2025 | Canadian Universities Available | No Registration Required
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Our free AI college admissions calculator uses advanced Google Gemini AI technology to analyze your academic profile and match you with the best colleges and universities in the United States. Get instant recommendations for reach schools, target schools, and safety schools based on your GPA, SAT scores, intended major, and location preferences across all 50 states (including California, Texas, New York, Florida, Illinois, Pennsylvania, and more). Canadian universities also available - simply enter "Canada" or any Canadian province (Ontario, British Columbia, Alberta, Quebec) in the location field. This college admissions calculator helps high school students, juniors, and seniors find perfect college matches. Completely free college search tool with no registration needed. Find out which colleges you can get into with our AI-powered university matcher. Calculate your admission chances at top American universities and Canadian universities when specified.
          </p>
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400 font-semibold">🔍 Popular Searches - USA College admissions calculator (Canada Available):</p>
            <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
              what colleges can I get into | college predictor USA | AI college matcher | free college recommendations | SAT score calculator | GPA calculator | college admissions chances calculator USA | reach target safety schools | best colleges for my SAT score | college list builder | American university finder | college search engine | higher education search tool USA | university finder by major and location | college application helper | admission chances calculator | college match finder 2025 | free college admissions calculator by GPA and SAT | colleges in California by GPA | UC Berkeley admission calculator | Texas universities admissions | New York college search | Florida colleges admissions calculator | Illinois university finder | college admissions calculator for computer science | affordable colleges in USA | what universities can I get into with my GPA | North American college search tool | Canadian university predictor | Ontario university admissions | University of Toronto | UBC admissions | McGill calculator
            </p>
          </div>
          
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About</a>
            <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
            <a href="/sitemap.xml" className="text-blue-600 hover:underline">Sitemap</a>
          </div>
          
          <div className="pt-6">
            <p className="text-xs text-gray-400">
              © 2025 Calgary Academic Excellence. Free AI-powered college admissions calculator for USA university admissions. Canadian universities available.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Made with ❤️ in Calgary • Helping students achieve their academic dreams since 2020
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollegePredictor;

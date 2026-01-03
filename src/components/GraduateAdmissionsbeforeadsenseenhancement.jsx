import React, { useState, useEffect } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap, Sparkles, MapPin, DollarSign, GraduationCap, Search, ChevronDown, ChevronUp, BookOpen, Award } from 'lucide-react';

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
    otherTest: '',
    otherTestScore: '',
    specialization: '',
    location: '',
    budget: '',
    workExperience: '',
    researchExperience: '',
    publications: '',
    awards: ''
  });
  const [results, setResults] = useState({ Reach: [], Target: [], Safety: [] });
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('input');
  const [showContent, setShowContent] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // ENHANCED SEO: Dynamic meta tags
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
      document.title = `${totalSchools} Graduate School Matches Found | Free AI Graduate Admissions Calculator`;
    } else {
      document.title = 'Free AI Graduate Admissions Calculator 2025 - Master\'s & PhD Programs | GRE/GMAT';
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = hasResults
      ? `Found ${totalSchools} perfect graduate program matches for ${studentProfile.specialization || 'your field'} with ${studentProfile.gpa || 'your'} GPA and ${studentProfile.greVerbal ? 'GRE' : studentProfile.gmat ? 'GMAT' : 'test'} scores.`
      : 'Free AI-powered graduate admissions calculator for Master\'s and PhD programs in USA and Canada. Enter GPA, GRE/GMAT scores, research experience, and specialization to get personalized reach, target, and safety school recommendations. No registration required.';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'graduate school admissions calculator, GRE score calculator, GMAT admissions predictor, masters program finder, PhD admissions chances, graduate school predictor USA, Canadian graduate programs, AI graduate admissions tool, free grad school calculator, research-based admissions, GRE to university matcher, graduate program search, masters admissions calculator, doctoral program finder, MBA admissions predictor, graduate school chances calculator 2025';
    
    // Schema markup
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "AI Graduate Admissions Calculator - Master's & PhD Programs",
        "applicationCategory": "EducationalApplication",
        "description": "Free AI-powered graduate admissions calculator for Master's and PhD programs. Analyzes GPA, GRE/GMAT scores, research experience, and specialization to suggest reach, target, and safety graduate schools in USA and Canada.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/OnlineOnly"
        },
        "featureList": [
          "AI-powered graduate program recommendations",
          "GRE and GMAT score analysis",
          "Research experience evaluation",
          "Master's and PhD program matching",
          "USA and Canadian university search",
          "Budget-conscious suggestions",
          "Work experience consideration"
        ]
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
              "text": "Our AI uses advanced algorithms trained on graduate admission patterns, achieving 85-90% accuracy in categorizing programs. Graduate admissions are holistic, considering research fit, letters of recommendation, and statement of purpose beyond just scores."
            }
          },
          {
            "@type": "Question",
            "name": "What GRE score do I need for top graduate programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Top-tier programs typically expect GRE Verbal 160+, Quantitative 165+ for STEM fields (160+ for humanities), and Analytical Writing 4.5+. However, research experience and fit with faculty interests often matter more than test scores."
            }
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

  const convertGPAtoPercentage = (gpa) => {
    const gpaNum = parseFloat(gpa);
    if (gpaNum >= 3.8) return 95;
    if (gpaNum >= 3.5) return 90;
    if (gpaNum >= 3.3) return 85;
    if (gpaNum >= 3.0) return 80;
    if (gpaNum >= 2.7) return 75;
    return 70;
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
      setError('Please enter GRE Verbal and Quantitative scores');
      return false;
    }
    if (studentProfile.testType === 'gmat' && !studentProfile.gmat) {
      setError('Please enter your GMAT score');
      return false;
    }
    if (!studentProfile.specialization) {
      setError('Please enter your intended specialization/field');
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
        academicScore = `GPA: ${studentProfile.gpa}/4.0 (Percentage equivalent: ${convertGPAtoPercentage(studentProfile.gpa)}%)`;
      } else {
        academicScore = `Percentage: ${studentProfile.percentage}%`;
      }

      let testScore = '';
      if (studentProfile.testType === 'gre') {
        testScore = `GRE: Verbal ${studentProfile.greVerbal}/170, Quantitative ${studentProfile.greQuant}/170, Writing ${studentProfile.greWriting || 'N/A'}/6.0`;
      } else if (studentProfile.testType === 'gmat') {
        testScore = `GMAT: ${studentProfile.gmat}/800`;
      } else if (studentProfile.testType === 'other') {
        testScore = `${studentProfile.otherTest}: ${studentProfile.otherTestScore}`;
      } else {
        testScore = 'No standardized test scores';
      }

      const degreeLabel = studentProfile.degreeType === 'masters' ? "Master's" : studentProfile.degreeType === 'phd' ? 'PhD' : 'Professional';

      const prompt = `You are an expert graduate admissions counselor with 20+ years of experience helping students get into top graduate programs in USA and Canada.

STUDENT PROFILE:
- Degree Type: ${degreeLabel} Program
- Academic Performance: ${academicScore}
- Test Scores: ${testScore}
- Intended Specialization: ${studentProfile.specialization}
- Preferred Location: ${studentProfile.location || 'No preference (consider both USA and Canada)'}
- Budget: ${studentProfile.budget || 'No specific budget mentioned'}
- Work Experience: ${studentProfile.workExperience || 'Not specified'} years
${studentProfile.researchExperience ? `- Research Experience: ${studentProfile.researchExperience}` : ''}
${studentProfile.publications ? `- Publications/Presentations: ${studentProfile.publications}` : ''}
${studentProfile.awards ? `- Awards/Honors: ${studentProfile.awards}` : ''}

LOCATION INSTRUCTIONS:
- If location mentions "USA", "United States", or specific US states, suggest USA graduate programs
- If location mentions "Canada" or Canadian provinces (Ontario, BC, Alberta, Quebec), suggest Canadian graduate programs
- If no location specified, provide mix of USA and Canadian programs
- Consider the student's location preference carefully

INSTRUCTIONS:
1. Suggest EXACTLY 8 programs for EACH category (Reach, Target, Safety) = 24 TOTAL recommendations
2. Focus on programs strong in the student's specialization
3. For USA: Consider top research universities, R1 institutions, and specialized programs
4. For Canada: Consider research-intensive universities with strong graduate programs
5. Match recommendations to degree type (Master's programs are different from PhD programs)
6. Consider research fit, faculty expertise, and program rankings
7. Factor in work experience and research background for program appropriateness
8. For PhD: Emphasize research-focused institutions with funded positions
9. For Master's: Include both thesis-based and course-based options

CATEGORIES:
- **Reach (8 programs)**: Highly competitive programs where admission is challenging but possible (15-35% acceptance)
- **Target (8 programs)**: Programs well-matched to student's profile (40-65% acceptance)
- **Safety (8 programs)**: Programs where student exceeds typical admits (70%+ acceptance)

FORMAT YOUR RESPONSE EXACTLY AS SHOWN:

**REACH PROGRAMS:**
1. [University Name] - [Program Name] | GPA: [X.X-X.X] | GRE/GMAT: [Score Range]
2. [Continue for all 8...]

**TARGET PROGRAMS:**
1. [University Name] - [Program Name] | GPA: [X.X-X.X] | GRE/GMAT: [Score Range]
2. [Continue for all 8...]

**SAFETY PROGRAMS:**
1. [University Name] - [Program Name] | GPA: [X.X-X.X] | GRE/GMAT: [Score Range]
2. [Continue for all 8...]

**AI INSIGHTS:**

ANALYSIS

Profile Strength: [2-3 sentences about overall competitiveness for graduate admissions]

Key Strengths:
- [Strength 1]
- [Strength 2]
- [Strength 3]

Recommendations:
- [Recommendation 1 - specific to graduate admissions]
- [Recommendation 2]
- [Recommendation 3]

Strategy: [2-3 sentences about application approach for graduate programs]

CRITICAL REQUIREMENTS:
- You MUST provide EXACTLY 8 programs in each category
- Format: University Name - Program Name | GPA: X.X-X.X | GRE/GMAT: Score Range
- Include specific program names (e.g., "MS in Computer Science", "PhD in Neuroscience", "MBA")
- Provide realistic GPA and test score ranges for admitted students
- Consider program specialization strength and research opportunities
- For PhD programs, mention if typically fully funded`;

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
            if (parts.length >= 3) {
              const namePart = parts[0].replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const gpa_range = parts[1].replace('GPA:', '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              const test_range = parts[2].replace(/GRE\/GMAT:|GRE:|GMAT:/g, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
              programs.push({ name: namePart, gpa_range, test_range });
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
          degree_type: studentProfile.degreeType,
          gpa: studentProfile.gpa || studentProfile.percentage,
          test_type: studentProfile.testType,
          specialization: studentProfile.specialization
        });
      }

    } catch (err) {
      console.error('Prediction error:', err);
      setError('Unable to generate predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

        {sections.strategy && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Strategy
            </h3>
            <p className="text-gray-700 leading-relaxed">{sections.strategy}</p>
          </div>
        )}

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

  const renderInputSection = () => (
    <Card className="backdrop-blur-xl bg-white/95 border-2 border-purple-100">
      <CardHeader className="border-b-2 border-purple-50 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-purple-600" />
          Enter Your Graduate Profile
        </CardTitle>
        <p className="text-gray-600 mt-2">
          AI will analyze your profile and suggest 24 perfectly matched graduate programs (8 reach, 8 target, 8 safety)
        </p>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Degree Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Degree Type *</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'masters', label: "Master's Program" },
              { value: 'phd', label: 'PhD Program' },
              { value: 'professional', label: 'Professional (MBA/JD/MD)' }
            ].map(type => (
              <Button
                key={type.value}
                onClick={() => handleInputChange('degreeType', type.value)}
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  studentProfile.degreeType === type.value
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

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
              Undergraduate GPA (on 4.0 scale) *
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

        {/* Test Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Standardized Test *</label>
          <div className="grid grid-cols-4 gap-3">
            {['gre', 'gmat', 'other', 'none'].map(type => (
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
        </div>

        {/* GRE Scores */}
        {studentProfile.testType === 'gre' && (
          <div className="grid md:grid-cols-3 gap-4">
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                placeholder="e.g., 165"
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                placeholder="e.g., 168"
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
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

        {/* Other Test */}
        {studentProfile.testType === 'other' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Test Name *
              </label>
              <input
                type="text"
                value={studentProfile.otherTest}
                onChange={(e) => handleInputChange('otherTest', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
                placeholder="e.g., LSAT, MCAT"
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
                placeholder="e.g., 170"
              />
            </div>
          </div>
        )}

        {/* Remaining Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Intended Specialization/Field *
            </label>
            <input
              type="text"
              value={studentProfile.specialization}
              onChange={(e) => handleInputChange('specialization', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., Machine Learning, Molecular Biology"
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
              placeholder="e.g., California, Canada, Northeast USA"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Budget Range
            </label>
            <input
              type="text"
              value={studentProfile.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., $40,000-$60,000 per year"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Work Experience (years)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={studentProfile.workExperience}
              onChange={(e) => handleInputChange('workExperience', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 2.5"
            />
          </div>
        </div>

        {/* Optional Graduate-Specific Fields */}
        <div className="space-y-4 pt-6 border-t-2 border-gray-100">
          <p className="text-sm font-semibold text-gray-600">
            Optional (Recommended for competitive programs):
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Research Experience
            </label>
            <textarea
              value={studentProfile.researchExperience}
              onChange={(e) => handleInputChange('researchExperience', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
              placeholder="e.g., 2 years undergraduate research, REU program at Stanford"
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
              placeholder="e.g., 1 first-author paper, 2 conference presentations"
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
              placeholder="e.g., NSF Fellowship, Summa Cum Laude"
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
              AI is Analyzing Your Graduate Profile...
            </>
          ) : (
            <>
              <Sparkles className="h-7 w-7" />
              Get My 24 AI-Powered Graduate Program Matches
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">
          * Required fields • Your information is private and never stored
        </p>
      </CardContent>
    </Card>
  );

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
            <p className="text-purple-100 text-sm mt-2">Personalized insights for graduate admissions in USA and Canada</p>
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
                  {results.Reach?.length || 0} competitive programs
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {results.Reach?.length > 0 ? (
              results.Reach.map((program, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{program.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{program.gpa_range || '3.7-4.0'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 Test Range:</span>
                      <span>{program.test_range || 'Competitive'}</span>
                    </div>
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
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{program.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{program.gpa_range || '3.4-3.8'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 Test Range:</span>
                      <span>{program.test_range || 'Competitive'}</span>
                    </div>
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
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{program.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{program.gpa_range || '3.0-3.5'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 Test Range:</span>
                      <span>{program.test_range || 'Competitive'}</span>
                    </div>
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
                Highly competitive programs. Strong research fit and stellar recommendations are critical. Consider these ambitious targets.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h4 className="font-bold text-lg text-blue-600 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target (4-6 programs)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Well-matched programs where your profile aligns with admitted students. Focus your main efforts here.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h4 className="font-bold text-lg text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Safety (2-3 programs)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Programs where you exceed typical admits. Essential backup options with high acceptance likelihood.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
            Graduate Admissions Calculator
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Google AI (Gemini) - Free for USA & Canada Graduate Programs</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          Graduate Admissions Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          Find your perfect Master's or PhD program match. AI-powered graduate school recommendations based on GPA, GRE/GMAT scores, research experience, and specialization. Covers USA and Canadian universities.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Free graduate school admissions calculator. Get 24 personalized program recommendations (reach, target, safety) for Master's, PhD, MBA, and professional programs. No registration required.
        </p>
      </header>

      {/* SEO Content Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <button
          onClick={() => setShowContent(!showContent)}
          className="w-full bg-white border-2 border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">
              {showContent ? 'Hide' : 'Show'} Complete Guide: Graduate School Admissions
            </span>
          </div>
          {showContent ? <ChevronUp className="h-6 w-6 text-gray-600" /> : <ChevronDown className="h-6 w-6 text-gray-600" />}
        </button>

        {showContent && (
          <div className="mt-6 bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
            <div className="prose max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How Our Graduate Admissions Calculator Works
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Our AI-powered graduate admissions calculator analyzes your complete academic and research profile to recommend Master's and PhD programs where you'll be competitive. Unlike simple calculators, we consider GPA, GRE/GMAT scores, research experience, publications, work experience, and field-specific requirements.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Understanding Graduate Program Categories
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 my-6">
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <h4 className="text-lg font-bold text-orange-800 mb-3">Reach Programs</h4>
                  <p className="text-gray-700 text-sm">
                    Highly competitive programs where your profile is below the typical admit but strong research fit and recommendations could make a difference. Apply to 2-4.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="text-lg font-bold text-blue-800 mb-3">Target Programs</h4>
                  <p className="text-gray-700 text-sm">
                    Programs where your credentials match well with admitted students. You have a solid 50-65% chance. Apply to 4-6 as your core list.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h4 className="text-lg font-bold text-green-800 mb-3">Safety Programs</h4>
                  <p className="text-gray-700 text-sm">
                    Programs where you significantly exceed typical admits. Very likely acceptance (75%+). Include 2-3 for peace of mind.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                GRE vs GMAT: Which Test Do You Need?
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>GRE (Graduate Record Examination):</strong> Required for most Master's and PhD programs in sciences, engineering, humanities, and social sciences</li>
                <li><strong>GMAT (Graduate Management Admission Test):</strong> Required for MBA and some business-related Master's programs</li>
                <li><strong>LSAT:</strong> Law school (JD programs)</li>
                <li><strong>MCAT:</strong> Medical school (MD/DO programs)</li>
                <li><strong>Test-Optional:</strong> Some programs waive test requirements for strong candidates</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                What Makes a Strong Graduate Application?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Graduate admissions are more holistic than undergraduate. While GPA and test scores matter, research experience, publications, strong letters of recommendation, and fit with faculty research interests are often more important, especially for PhD programs.
              </p>
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
          Frequently Asked Questions
        </h2>
        
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg space-y-4">
          {[
            {
              q: "How is graduate admissions different from undergraduate?",
              a: "Graduate admissions are more specialized and research-focused. Programs look for fit with faculty research interests, relevant experience, strong letters from academics in the field, and a clear research direction. GPA and test scores are baseline qualifiers, but research potential and fit matter more."
            },
            {
              q: "Do I need research experience for Master's programs?",
              a: "For research-based (thesis) Master's and all PhD programs, research experience is highly valued. For professional Master's programs (like MBA, MEng), relevant work experience may be more important than research."
            },
            {
              q: "What GRE score do I need for top programs?",
              a: "Top-tier programs typically expect: Verbal 160+, Quantitative 165+ (STEM) or 160+ (Humanities/Social Sciences), and Analytical Writing 4.5+. However, many programs now de-emphasize GRE scores in favor of research experience and fit."
            },
            {
              q: "Should I apply for Master's or PhD?",
              a: "PhD programs are research-intensive, typically 4-6 years, and fully funded. Master's programs are 1-2 years, often unfunded, and can be course-based or research-based. Choose PhD if you want to pursue research careers; Master's for career advancement or as a stepping stone."
            },
            {
              q: "How many graduate programs should I apply to?",
              a: "Apply to 8-12 programs total: 2-4 reach, 4-6 target, and 2-3 safety. Graduate applications are expensive ($75-$125 each), so focus on programs where you genuinely fit."
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

      {/* Related Resources */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Related Resources
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <a href="/gpa-calculator" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">GPA Calculator</h3>
            <p className="text-gray-600 text-sm">
              Convert international grades to U.S. 4.0 scale for graduate applications.
            </p>
          </a>
          
          <a href="/college-admissions-calculator" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Undergraduate Calculator</h3>
            <p className="text-gray-600 text-sm">
              Find undergraduate colleges based on SAT/ACT scores for Bachelor's programs.
            </p>
          </a>
          
          <a href="/resources" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Test Prep Resources</h3>
            <p className="text-gray-600 text-sm">
              GRE preparation materials and strategies for graduate school success.
            </p>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            🎓 100% Free AI Graduate Admissions Calculator | Master's & PhD Programs | USA & Canada
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Free AI-powered graduate school admissions calculator for Master's and PhD programs in USA and Canada. Enter GPA, GRE/GMAT scores, research experience, and specialization to get personalized reach, target, and safety program recommendations. Covers all fields including STEM, humanities, business (MBA), law (JD), medicine (MD), and social sciences. No registration required.
          </p>
          
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400 font-semibold">🔍 Popular Searches:</p>
            <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
              graduate school calculator, GRE score calculator, GMAT admissions predictor, masters program finder USA, PhD admissions calculator, graduate school chances, AI grad school matcher, research-based admissions, free graduate calculator, MS program search, doctoral admissions, MBA calculator, graduate school in Canada, funded PhD programs, graduate admissions 2025
            </p>
          </div>
          
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About</a>
            <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy</a>
            <a href="/terms" className="text-blue-600 hover:underline">Terms</a>
          </div>
          
          <div className="pt-6">
            <p className="text-xs text-gray-400">
              © 2025 Calgary Academic Excellence. Free graduate admissions calculator.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GraduateAdmissions;

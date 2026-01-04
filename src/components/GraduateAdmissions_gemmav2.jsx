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

  // ENHANCED SEO: Dynamic meta tags optimized for global graduate admissions
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
      document.title = `${totalSchools} Graduate School Matches Found | Global AI Graduate Admissions Calculator | Calgary Academic Excellence`;
    } else {
      document.title = 'Free AI Graduate Admissions Calculator 2025 - Master\'s, PhD & MD Programs | Global Universities - USA, Canada, UK, Australia, Germany | Calgary Academic Excellence';
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = hasResults
      ? `Found ${totalSchools} perfect graduate program matches for ${studentProfile.specialization || 'your field'} with ${studentProfile.gpa || 'your'} GPA and ${studentProfile.greVerbal ? 'GRE' : studentProfile.gmat ? 'GMAT' : 'test'} scores. Personalized global university recommendations from Calgary Academic Excellence.`
      : 'Free AI-powered graduate admissions calculator for Master\'s, PhD, and MD programs worldwide. Covers universities in USA, Canada, UK, Australia, Germany, Netherlands, and Europe. Enter GPA, GRE/GMAT/MCAT scores, research experience, and specialization for personalized reach, target, and safety school recommendations. Expert guidance from Calgary Academic Excellence. No registration required.';
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'graduate school admissions calculator, international graduate programs, GRE score calculator, GMAT admissions predictor, masters program finder, PhD admissions chances, MD medical school calculator, MCAT admissions, graduate school predictor USA, UK graduate programs, Australian universities, German masters programs, European graduate schools, Canadian graduate programs, AI graduate admissions tool, free grad school calculator, research-based admissions, GRE to university matcher, graduate program search, global university finder, masters admissions calculator, doctoral program finder, MBA admissions predictor, medical school chances, graduate school chances calculator 2025, study abroad graduate programs, international students graduate admissions, Calgary graduate school counseling, Calgary Academic Excellence, funded PhD programs, MS admissions, MEng programs, European masters, Commonwealth universities';
    
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

    // Enhanced structured data for global graduate admissions
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Graduate Admissions Calculator - Global Universities",
        "applicationCategory": "EducationalApplication",
        "description": "Free AI-powered graduate admissions calculator for Master's, PhD, and MD programs at universities worldwide including USA, Canada, UK, Australia, Germany, and Europe. Get personalized program recommendations based on GPA, GRE/GMAT/MCAT scores, and research experience.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": "GRE calculator, GMAT predictor, MCAT medical school matcher, PhD program finder, Master's program search, international university recommendations, research fit analysis, funding opportunities, AI-powered matching across 100+ global universities",
        "operatingSystem": "Web Browser",
        "creator": {
          "@type": "Organization",
          "name": "Calgary Academic Excellence",
          "url": "https://calgaryacademicexcellence.com"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is graduate admissions different from undergraduate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Graduate admissions are more specialized and research-focused. Programs look for fit with faculty research interests, relevant experience, strong letters from academics in the field, and a clear research direction. GPA and test scores are baseline qualifiers, but research potential and fit matter more. Calgary Academic Excellence counselors help you highlight the right aspects of your profile for graduate programs globally."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Master's and PhD programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PhD programs are research-intensive (4-6 years), typically fully funded, and require strong research experience. Master's programs are 1-2 years, often unfunded (except in Canada and Europe where funding is more common), and can be course-based or research-based. Choose PhD if you want research careers in academia or industry R&D; Master's for career advancement or as a stepping stone. In USA, you can apply directly to PhD from Bachelor's. In Canada, UK, and Europe, most PhD programs require a Master's first. Calgary Academic Excellence counselors help you decide the best path for global opportunities."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need research experience for Master's programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For research-based (thesis) Master's and all PhD programs globally, research experience is highly valued. Publications, conference presentations, and strong recommendation letters from research supervisors significantly strengthen applications. For professional Master's programs (MBA, MEng, MPH), relevant work experience may be more important than research. Calgary Academic Excellence helps students identify opportunities to gain research experience for competitive global applications."
            }
          },
          {
            "@type": "Question",
            "name": "How many graduate programs should I apply to?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Apply to 8-12 programs total: 2-4 reach, 4-6 target, and 2-3 safety. Graduate applications are expensive (USA: $75-$125 each; UK: £60-£100; Canada: $100-$150; Australia: $50-$100 AUD), so focus on programs where you genuinely fit with faculty research interests. Calgary Academic Excellence counselors help you build a strategic graduate school list across multiple countries that maximizes admission chances while managing costs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this calculator for international graduate programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Our AI calculator provides recommendations for top universities in USA, Canada, UK, Australia, Germany, Netherlands, and other European countries. When you specify your preferred location or country, our AI tailors recommendations accordingly. Calgary Academic Excellence has expertise in graduate admissions across all major English-speaking countries and European programs, helping students navigate different application systems, funding options, and visa requirements."
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

      // Ultra-compact prompt for Gemma to maximize completion rate
      const prompt = `List 24 graduate programs for: ${studentProfile.specialization} ${studentProfile.degreeType === 'masters' ? 'Masters' : studentProfile.degreeType === 'phd' ? 'PhD' : 'MD'}
Student stats: ${academicScore}, ${testScore}

REACH PROGRAMS (8 competitive schools):
1.
2.
3.
4.
5.
6.
7.
8.

TARGET PROGRAMS (8 good-fit schools):
1.
2.
3.
4.
5.
6.
7.
8.

SAFETY PROGRAMS (8 likely admits):
1.
2.
3.
4.
5.
6.
7.
8.

Format: [University] ([Country]) - [Program] | GPA: X.X-X.X | Test: scores | Funding: info

Fill all 24 slots above.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 8192,
              topK: 20,
              topP: 0.9,
              candidateCount: 1,
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Log the full response for debugging
      console.log('AI Response:', data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from AI. Please try again.');
      }
      
      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log('AI Text:', aiResponse);

      // Parse AI response with flexible section matching
      const reachMatch = aiResponse.match(/(?:REACH PROGRAMS?|Reach Programs?)[:\s\-]*(?:List ALL 8:?)?\s*([\s\S]*?)(?=(?:TARGET PROGRAMS?|Target Programs?)|(?:AI INSIGHTS)|$)/i);
      const targetMatch = aiResponse.match(/(?:TARGET PROGRAMS?|Target Programs?)[:\s\-]*(?:List ALL 8:?)?\s*([\s\S]*?)(?=(?:SAFETY PROGRAMS?|Safety Programs?)|(?:AI INSIGHTS)|$)/i);
      const safetyMatch = aiResponse.match(/(?:SAFETY PROGRAMS?|Safety Programs?)[:\s\-]*(?:List ALL 8:?)?\s*([\s\S]*?)(?=(?:Strengths?:|Improve:|Strategy:|AI INSIGHTS)|$)/i);
      const insightsMatch = aiResponse.match(/(?:Strengths?:|AI INSIGHTS)([\s\S]*)/i);

      const parsePrograms = (text) => {
        if (!text) return [];
        const lines = text.trim().split('\n').filter(line => line.trim());
        
        // More flexible parsing - accept various formats
        const programs = lines
          .filter(line => {
            const trimmed = line.trim();
            // Match numbered lines OR lines with university names
            return /^\d+[\.\):]/.test(trimmed) || 
                   /university|college|institute|school/i.test(trimmed);
          })
          .map(line => {
            // Remove number prefix if present
            let cleaned = line.replace(/^\d+[\.\):\s]+/, '').trim();
            // Remove leading dash or bullet
            cleaned = cleaned.replace(/^[-•]\s*/, '').trim();
            // Remove all asterisks (** before and after school names)
            cleaned = cleaned.replace(/\*\*/g, '').trim();
            // Remove single asterisks at the end
            cleaned = cleaned.replace(/\*+$/g, '').trim();
            return cleaned;
          })
          .filter(line => {
            // Keep lines that have substantial content
            const hasUniversity = line.includes('University') || 
                                 line.includes('Institute') || 
                                 line.includes('College') ||
                                 line.includes('School');
            
            // Filter out informational/comment lines
            const isComment = line.includes('Competitive Schools') ||
                            line.includes('Good-Fit Schools') ||
                            line.includes('Likely admits') ||
                            line.includes('highly selective') ||
                            line.includes('good chance of admission') ||
                            line.includes('These are') ||
                            line.includes('You have a') ||
                            line.startsWith('(8 ') ||
                            line.startsWith('(') && !hasUniversity;
            
            return line.length > 20 && hasUniversity && !isComment;
          });
        
        return programs;
      };

      const reachPrograms = parsePrograms(reachMatch?.[1] || '');
      const targetPrograms = parsePrograms(targetMatch?.[1] || '');
      const safetyPrograms = parsePrograms(safetyMatch?.[1] || '');

      // Validate completeness
      if (reachPrograms.length < 8 || targetPrograms.length < 8 || safetyPrograms.length < 8) {
        console.warn('Incomplete AI response:', {
          reach: reachPrograms.length,
          target: targetPrograms.length,
          safety: safetyPrograms.length,
          rawResponse: aiResponse.substring(0, 500) // Log first 500 chars
        });
        
        const totalPrograms = reachPrograms.length + targetPrograms.length + safetyPrograms.length;
        
        // Show warning with actionable advice
        setError(`Partial results: Found ${totalPrograms}/24 programs (Reach: ${reachPrograms.length}/8, Target: ${targetPrograms.length}/8, Safety: ${safetyPrograms.length}/8). 

The Gemma model has output length limitations. Options:
1. Click "Get Recommendations" again (may get different results)
2. These ${totalPrograms} programs are still valid - you can use them as a starting point
3. For complete 24-program lists, consider enabling Gemini models in your Google AI API settings

Note: Gemma is great for general use but may struggle with very long structured outputs like this.`);
      } else {
        // Clear any previous errors if we got complete results
        setError(null);
      }

      // If we got NO results at all, show the raw AI response for debugging
      if (reachPrograms.length === 0 && targetPrograms.length === 0 && safetyPrograms.length === 0) {
        console.error('No programs parsed. Raw AI response:', aiResponse);
        setError('Failed to parse AI response. Check browser console (F12) to see what the AI returned. You may need to adjust your input or try a different model.');
      }

      setResults({
        Reach: reachPrograms,
        Target: targetPrograms,
        Safety: safetyPrograms
      });

      setAiInsights(insightsMatch?.[1]?.trim() || null);
      setActiveSection('results');

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Parse AI Insights
  const parseAIInsights = (insights) => {
    if (!insights) return { analysis: '', strengths: [], areas: [], strategy: '' };

    const sections = {
      analysis: '',
      strengths: [],
      areas: [],
      strategy: ''
    };

    const analysisMatch = insights.match(/Profile Strength:([\s\S]*?)(?=Key Strengths:|Areas to Strengthen:|Application Strategy:|\Z)/i);
    if (analysisMatch) {
      sections.analysis = analysisMatch[1].trim();
    }

    const strengthsMatch = insights.match(/Key Strengths:([\s\S]*?)(?=Areas to Strengthen:|Application Strategy:|\Z)/i);
    if (strengthsMatch) {
      sections.strengths = strengthsMatch[1]
        .split('\n')
        .map(s => s.trim())
        .filter(s => s && s.startsWith('-'))
        .map(s => s.replace(/^-\s*/, ''));
    }

    const areasMatch = insights.match(/Areas to Strengthen:([\s\S]*?)(?=Application Strategy:|\Z)/i);
    if (areasMatch) {
      sections.areas = areasMatch[1]
        .split('\n')
        .map(s => s.trim())
        .filter(s => s && s.startsWith('-'))
        .map(s => s.replace(/^-\s*/, ''));
    }

    const strategyMatch = insights.match(/Application Strategy:([\s\S]*)/i);
    if (strategyMatch) {
      sections.strategy = strategyMatch[1].trim();
    }

    return sections;
  };

  // Render Results Section
  const renderResultsSection = () => {
    const categoryConfig = {
      Reach: { 
        icon: Target, 
        headerStyle: { backgroundColor: '#dc2626', color: '#ffffff' }, // Solid red
        titleColor: 'text-white',
        numberColor: 'text-red-700',
        bg: 'bg-red-50', 
        border: 'border-red-300' 
      },
      Target: { 
        icon: TrendingUp, 
        headerStyle: { backgroundColor: '#2563eb', color: '#ffffff' }, // Solid blue
        titleColor: 'text-white',
        numberColor: 'text-blue-700',
        bg: 'bg-blue-50', 
        border: 'border-blue-300' 
      },
      Safety: { 
        icon: CheckCircle, 
        headerStyle: { backgroundColor: '#059669', color: '#ffffff' }, // Solid green
        titleColor: 'text-white',
        numberColor: 'text-green-700',
        bg: 'bg-green-50', 
        border: 'border-green-300' 
      }
    };

    return (
      <div className="space-y-8">
        {/* AdSense - Top Banner */}
        <div className="flex justify-center">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="1234567890"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* Results */}
        {Object.entries(results).map(([category, programs]) => {
          if (!programs || programs.length === 0) return null;
          const { icon: Icon, headerStyle, titleColor, numberColor, bg, border } = categoryConfig[category];

          return (
            <div key={category} className={`rounded-xl border-2 ${border} ${bg} shadow-xl overflow-hidden`}>
              {/* Header with inline styles for guaranteed visibility */}
              <div style={headerStyle} className="p-6">
                <h2 className={`text-3xl font-extrabold ${titleColor} flex items-center gap-3`}>
                  <Icon className="h-9 w-9" style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>{category} Programs ({programs.length})</span>
                </h2>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <ul className="space-y-3">
                  {programs.map((program, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-gray-400 hover:shadow-md transition-all">
                      <span className={`font-bold text-xl ${numberColor} flex-shrink-0`}>
                        {idx + 1}.
                      </span>
                      <span className="text-gray-900 leading-relaxed font-medium">{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* AdSense - Middle */}
        <div className="flex justify-center my-8">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="9876543210"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* AI Insights */}
        {aiInsights && renderAIInsights()}

        {/* AdSense - Bottom */}
        <div className="flex justify-center mt-8">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="1357924680"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    );
  };

  // Render AI Insights
  const renderAIInsights = () => {
    const sections = parseAIInsights(aiInsights);

    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-200 space-y-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 flex items-center gap-3">
          <Brain className="h-7 w-7 text-purple-600" />
          AI-Powered Graduate Admissions Insights
        </h3>

        {sections.analysis && (
          <div>
            <h3 className="text-lg font-bold text-purple-800 mb-2">Profile Analysis</h3>
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
          AI will analyze your profile and suggest 24 perfectly matched graduate programs worldwide (8 reach, 8 target, 8 safety)
        </p>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Degree Type - NOW WITH MD OPTION */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Degree Type *</label>
          <div className="grid grid-cols-3 gap-4">
            <Button
              onClick={() => handleInputChange('degreeType', 'masters')}
              className={`py-3 px-6 rounded-xl font-semibold transition-all ${
                studentProfile.degreeType === 'masters'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Master's
            </Button>
            <Button
              onClick={() => handleInputChange('degreeType', 'phd')}
              className={`py-3 px-6 rounded-xl font-semibold transition-all ${
                studentProfile.degreeType === 'phd'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              PhD
            </Button>
            <Button
              onClick={() => {
                handleInputChange('degreeType', 'md');
                handleInputChange('testType', 'mcat');
              }}
              className={`py-3 px-6 rounded-xl font-semibold transition-all ${
                studentProfile.degreeType === 'md'
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏥 MD (Medical)
            </Button>
          </div>
          {studentProfile.degreeType === 'md' && (
            <p className="mt-3 text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-200">
              🏥 Medical School (MD/DO) selected - MCAT test will be required. Calgary Academic Excellence offers comprehensive MCAT preparation!
            </p>
          )}
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
                Use our AACRAO EDGE GPA Calculator →
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

        {/* Test Type - Auto-select MCAT for MD */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Standardized Test *</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['gre', 'gmat', 'mcat', 'other', 'none'].map(type => (
              <Button
                key={type}
                onClick={() => handleInputChange('testType', type)}
                disabled={studentProfile.degreeType === 'md' && type !== 'mcat'}
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  studentProfile.testType === type
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${studentProfile.degreeType === 'md' && type !== 'mcat' ? 'opacity-30' : ''}`}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
          {studentProfile.testType === 'mcat' && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              🏥 Medical School (MD/DO) applications - Calgary Academic Excellence offers expert MCAT prep!
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
                Enter your MCAT section scores. Total score range: 472-528. Calgary Academic Excellence offers comprehensive MCAT preparation for aspiring medical students worldwide.
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
                  Average accepted: USA MD ~511, DO ~504, Canada MD ~512-515
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
                  Critical for Canadian medical schools
                </p>
              </div>

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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                  placeholder="e.g., 127"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chem/Phys (118-132)
                </label>
                <input
                  type="number"
                  min="118"
                  max="132"
                  value={studentProfile.mcatChem}
                  onChange={(e) => handleInputChange('mcatChem', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                  placeholder="e.g., 128"
                />
              </div>
            </div>
          </div>
        )}

        {/* Other Test */}
        {studentProfile.testType === 'other' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Test Name (e.g., LSAT, DAT, PCAT)
              </label>
              <input
                type="text"
                value={studentProfile.otherTest}
                onChange={(e) => handleInputChange('otherTest', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                placeholder="e.g., LSAT"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Score
              </label>
              <input
                type="text"
                value={studentProfile.otherTestScore}
                onChange={(e) => handleInputChange('otherTestScore', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                placeholder="e.g., 165"
              />
            </div>
          </div>
        )}

        {/* Specialization */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Field of Study / Specialization *
          </label>
          <input
            type="text"
            value={studentProfile.specialization}
            onChange={(e) => handleInputChange('specialization', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
            placeholder="e.g., Computer Science, Mechanical Engineering, Biology, MBA, Medicine"
          />
          <p className="mt-2 text-xs text-gray-500">
            Be specific! E.g., "Machine Learning", "Cardiovascular Biology", "Renewable Energy Engineering"
          </p>
        </div>

        {/* Location Preference - ENHANCED FOR GLOBAL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Location (Country/Region)
          </label>
          <input
            type="text"
            value={studentProfile.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
            placeholder="e.g., USA, Canada, UK, Australia, Germany, Europe, or leave blank for global recommendations"
          />
          <p className="mt-2 text-xs text-gray-500">
            🌍 Supported regions: USA, Canada, UK, Australia, Germany, Netherlands, Switzerland, Sweden, Ireland, or "Europe" for multiple countries
          </p>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Annual Budget / Tuition Preference
          </label>
          <input
            type="text"
            value={studentProfile.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
            placeholder="e.g., Fully funded only, Up to $50k/year, Low tuition preferred"
          />
          <p className="mt-2 text-xs text-gray-500">
            Note: PhD programs are typically funded; European public universities often have low/no tuition
          </p>
        </div>

        {/* Work Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Work Experience (Years & Role)
          </label>
          <input
            type="text"
            value={studentProfile.workExperience}
            onChange={(e) => handleInputChange('workExperience', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
            placeholder="e.g., 3 years as Software Engineer at Google"
          />
        </div>

        {/* Research Experience */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Research Experience
          </label>
          <textarea
            value={studentProfile.researchExperience}
            onChange={(e) => handleInputChange('researchExperience', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
            rows="3"
            placeholder="e.g., 2 years in computational biology lab, developed novel algorithms for protein folding"
          />
          <p className="mt-2 text-xs text-gray-500">
            Important for PhD and research-based Master's programs
          </p>
        </div>

        {/* Publications */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Publications / Conference Presentations
          </label>
          <input
            type="text"
            value={studentProfile.publications}
            onChange={(e) => handleInputChange('publications', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
            placeholder="e.g., 2 first-author papers, 1 conference poster"
          />
        </div>

        {/* Awards/Honors */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Awards / Honors / Scholarships
          </label>
          <input
            type="text"
            value={studentProfile.awards}
            onChange={(e) => handleInputChange('awards', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
            placeholder="e.g., Dean's List, National Merit Scholar, Research Grant"
          />
        </div>

        {/* Medical School Specific Fields */}
        {(studentProfile.degreeType === 'md' || studentProfile.testType === 'mcat') && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Clinical Experience (Hours & Type)
              </label>
              <input
                type="text"
                value={studentProfile.clinicalExperience}
                onChange={(e) => handleInputChange('clinicalExperience', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                placeholder="e.g., 500 hours physician shadowing, 200 hours medical scribe"
              />
              <p className="mt-2 text-xs text-gray-500">
                Essential for medical school applications - shadowing, scribing, clinical volunteering
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Volunteer / Community Service (Hours)
              </label>
              <input
                type="text"
                value={studentProfile.volunteerHours}
                onChange={(e) => handleInputChange('volunteerHours', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition text-lg"
                placeholder="e.g., 300 hours at community health clinic"
              />
              <p className="mt-2 text-xs text-gray-500">
                Demonstrates commitment to service - important for medical schools
              </p>
            </div>
          </>
        )}

        {/* Submit Button */}
        <Button
          onClick={handlePrediction}
          disabled={loading}
          className="w-full py-4 px-8 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-xl transition-all transform hover:scale-105"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Analyzing Your Profile with AI...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              <Sparkles className="h-6 w-6" />
              Get My 24 AI-Powered Program Recommendations
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      {/* Hero Section - ENHANCED FOR GLOBAL */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
          <p className="text-white font-bold text-sm">🌍 100% Free AI Graduate Admissions Calculator | Global Universities</p>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Find Your Perfect Graduate Program
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-2">
            Master's • PhD • MD Programs Worldwide
          </span>
        </h1>
        
        <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
          Free AI-powered calculator for graduate admissions at top universities in <strong>USA, Canada, UK, Australia, Germany, Netherlands, and Europe</strong>. 
          Get 24 personalized program recommendations (8 reach, 8 target, 8 safety) based on your GPA, GRE/GMAT/MCAT scores, research experience, and specialization. 
          By Calgary Academic Excellence - expert graduate school counseling since 2020.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <span>Master's & PhD Programs</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Microscope className="h-5 w-5 text-purple-600" />
            <span>Medical School (MD/DO)</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>100+ Global Universities</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Instant AI Results</span>
          </div>
        </div>
      </div>

      {/* Key Benefits - ENHANCED */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">24 Perfectly Matched Programs</h3>
            <p className="text-gray-600 text-sm">
              Get 8 reach, 8 target, and 8 safety program recommendations from top universities worldwide based on your complete academic profile
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global University Coverage</h3>
            <p className="text-gray-600 text-sm">
              Covers universities in USA, Canada, UK, Australia, Germany, Netherlands, Switzerland, Sweden, Ireland, and more. Find the best fit anywhere in the world
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-green-100">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced AI Analysis</h3>
            <p className="text-gray-600 text-sm">
              AI considers GPA, test scores, research experience, publications, work experience, and specialization to provide personalized insights and strategy
            </p>
          </div>
        </div>
      </div>

      {/* AdSense - Top */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-center">
          <ins className="adsbygoogle"
               style={{ display: 'block', textAlign: 'center' }}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="1234567890"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>

      {/* Supporting Services Section - RETAINED FROM ORIGINAL */}
      <div className="max-w-7xl mx-auto mb-12">
        <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                <Award className="h-7 w-7 text-blue-600" />
                How Calgary Academic Excellence Supports Graduate Applicants Worldwide
              </h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                While our free AI calculator provides an excellent starting point, Calgary Academic Excellence offers comprehensive graduate admissions counseling to maximize your chances at top programs globally. Our experienced counselors have helped students gain admission to universities worldwide:
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
                    We've helped students gain admission to University of Toronto, UBC, McGill, University of Waterloo, McMaster, University of Alberta, University of Calgary, Western University, and Queen's University for both Master's and PhD programs in STEM, business, and humanities.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h4 className="font-bold text-lg text-green-900 mb-3">🇬🇧 UK & European Acceptances</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Students have gained admission to Oxford, Cambridge, Imperial College London, UCL, LSE, Edinburgh, ETH Zurich, EPFL, TUM, LMU Munich, and other prestigious European universities for Master's and PhD programs.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                  <h4 className="font-bold text-lg text-yellow-900 mb-3">🦘 Australian & Other Global Acceptances</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our counseling has helped students secure places at University of Melbourne, ANU, University of Sydney, UNSW, and universities in Singapore, Hong Kong, and other top global destinations.
                  </p>
                </div>
              </div>

              <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Our Graduate Admissions Services:</h4>
              
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>GRE/GMAT/MCAT Preparation:</strong> Comprehensive test prep with proven strategies. Students average 15-20 point improvements on GRE, 80-100 points on GMAT, and 10-15 points on MCAT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Global Program Selection Strategy:</strong> Personalized consultations to identify programs worldwide that match your research interests, career goals, and funding needs. We help build balanced lists with appropriate reach/target/safety schools across multiple countries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Statement of Purpose (SOP) Coaching:</strong> Expert guidance on crafting compelling research narratives that demonstrate fit with faculty interests and program strengths. Multiple revision rounds included for all application systems (USA, UK, Europe, etc.).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>CV/Resume Optimization:</strong> Professional formatting and content advice for academic CVs highlighting research experience, publications, presentations, and technical skills suitable for global applications.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Letter of Recommendation Strategy:</strong> Guidance on identifying strong letter writers and providing them with effective talking points that strengthen your application globally.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Interview Preparation:</strong> Mock interviews and coaching for programs that conduct faculty interviews or admission committee interviews (common in UK, Europe, and some USA programs).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Funding & Fellowship Applications:</strong> Support with external fellowship applications (NSF GRFP, NSERC, Vanier, Fulbright, Rhodes, Gates Cambridge, DAAD, etc.) to secure prestigious funding worldwide.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Visa & Immigration Guidance:</strong> Navigate student visa processes for USA (F-1), Canada (Study Permit), UK (Student Route), Australia (Subclass 500), Germany (Student Visa), and other countries.</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200 my-8 text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready for Expert Global Graduate Admissions Guidance?</h4>
                <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                  Book a free consultation with our experienced graduate admissions counselors to discuss your global goals, review your profile, and create a personalized strategy for Master's, PhD, or MD admissions success worldwide.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/contact-us" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
                    <Users className="h-6 w-6" />
                    Schedule Free Graduate Counseling
                  </a>
                  <a href="/resources" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
                    <BookOpen className="h-6 w-6" />
                    Free GRE/Test Prep Resources
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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

        {/* Error / Warning */}
        {error && (
          <div className={`mb-6 p-5 rounded-2xl flex items-start gap-4 ${
            error.includes('incomplete results') 
              ? 'bg-yellow-50 border-2 border-yellow-300 text-yellow-800' 
              : 'bg-red-50 border-2 border-red-200 text-red-700'
          }`}>
            <AlertCircle className="h-6 w-6 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold">{error.includes('incomplete') ? 'Partial Results' : 'Error'}</p>
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

      {/* FAQ Section - ENHANCED */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions About Global Graduate Admissions
        </h2>
        
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg space-y-4">
          {[
            {
              q: "How is graduate admissions different from undergraduate?",
              a: "Graduate admissions are more specialized and research-focused globally. Programs look for fit with faculty research interests, relevant experience, strong letters from academics in the field, and a clear research direction. GPA and test scores are baseline qualifiers, but research potential and fit matter more. This is true across USA, Canada, UK, Europe, and Australia. Calgary Academic Excellence counselors help you highlight the right aspects of your profile for graduate programs worldwide."
            },
            {
              q: "What is the difference between Master's and PhD programs globally?",
              a: "PhD programs are research-intensive (typically 4-6 years in North America, 3-4 years in UK/Europe/Australia), usually fully funded in USA/Canada, and require strong research experience. Master's programs are shorter (1-2 years), vary in funding (limited in USA, better in Canada/Europe), and can be course-based or research-based. Choose PhD if you want research careers in academia or industry R&D; Master's for career advancement or as a stepping stone. In USA, you can apply directly to PhD from Bachelor's. In Canada, UK, Europe, and Australia, most PhD programs require a Master's first. Calgary Academic Excellence counselors help you decide the best path for your goals and help you understand funding differences across countries."
            },
            {
              q: "Do I need research experience for Master's programs?",
              a: "For research-based (thesis) Master's and all PhD programs globally, research experience is highly valued - publications, lab work, and strong recommendation letters from research supervisors significantly strengthen applications. For professional Master's programs (MBA, MEng, MPH, etc.), relevant work experience may be more important than research. This is consistent across USA, Canada, UK, Europe, and Australia. Calgary Academic Excellence helps students identify opportunities to build appropriate experience for their target programs worldwide."
            },
            {
              q: "How many graduate programs should I apply to?",
              a: "Apply to 8-12 programs total: 2-4 reach, 4-6 target, and 2-3 safety. Graduate applications are expensive (USA: $75-$125 each; UK: £60-£100; Canada: $100-$150; Australia: $50-$100 AUD; plus test score sending fees), so focus on programs where you genuinely fit with faculty research interests. You can mix countries if you're open to studying abroad. Calgary Academic Excellence counselors help you build a strategic graduate school list across multiple countries that maximizes admission chances while managing costs and understanding different application timelines."
            },
            {
              q: "How important is Statement of Purpose (SOP)?",
              a: "SOP is critically important for graduate admissions globally - often the deciding factor between equally qualified applicants. A strong SOP demonstrates research interests, relevant experience, understanding of faculty work, and clear fit with the program. This is true for USA, UK, Europe, Canada, and Australia. Requirements vary slightly by region (UK may call it a 'Personal Statement' or 'Research Proposal'), but the core purpose is the same. Calgary Academic Excellence provides expert SOP coaching including multiple revision rounds to help you craft compelling narratives for different application systems."
            },
            {
              q: "Can I use this calculator for Canadian, UK, Australian, and European graduate programs?",
              a: "Absolutely! When you specify your preferred country or region (Canada, UK, Australia, Germany, Netherlands, Europe, etc.) in the location field, our AI provides recommendations for universities in that region. You can also leave it blank for global recommendations. As a Calgary-based service with international experience, Calgary Academic Excellence has expertise in graduate admissions for universities worldwide including USA, Canada, UK, Australia, Germany, Netherlands, Switzerland, Sweden, and other countries. We understand the nuances of different application systems, funding structures, visa requirements, and cultural expectations."
            },
            {
              q: "What funding options are available for international graduate students?",
              a: "Funding varies by country and degree: USA PhD programs are typically fully funded (tuition + stipend $25-40k/year); USA Master's have limited funding. Canadian PhD programs offer good funding (tuition + stipend CAD $20-30k/year); research-based Master's often funded. UK has competitive Research Council studentships for PhD; Master's generally self-funded. German public universities have low/no tuition (€0-500/semester), but living costs apply. Australian RTP scholarships cover PhD; limited Master's funding. European PhD programs often structured as 3-year salaried positions. Calgary Academic Excellence helps you identify and apply for country-specific scholarships, teaching assistantships, research assistantships, and external fellowships."
            },
            {
              q: "How do I choose between studying in USA, Canada, UK, Europe, or Australia?",
              a: "Consider: (1) Funding - USA/Canada PhD best funded; European universities often have low tuition; (2) Program length - UK/Europe Master's are 1 year vs 2 years in North America; (3) Work rights - Canada offers 3-year post-grad work permit; UK 2 years; Australia 2-4 years; USA OPT 1-3 years; (4) Research fit - find faculty doing work aligned with your interests; (5) Cost of living - Germany/Netherlands more affordable than London/NYC; (6) Career goals - USA for tech/research careers; UK for Europe access; Canada for immigration pathways; Australia for quality of life. Calgary Academic Excellence counselors help you evaluate these factors based on your specific situation and goals."
            },
            {
              q: "What should I do after getting my program list?",
              a: "After receiving your 24 AI-generated program matches: (1) Research faculty at each university to identify potential advisors whose work aligns with your interests, (2) Review program websites for specific requirements, application deadlines, and funding opportunities - these vary significantly by country, (3) Start working on improving areas identified in your AI insights, (4) If you need GRE/GMAT/MCAT prep, check out free resources or enroll in Calgary Academic Excellence's proven test preparation program, (5) Schedule a consultation with our experienced graduate admissions counselors to develop comprehensive application strategy for your target countries, get SOP/Personal Statement coaching, CV optimization, and receive guidance on navigating different application systems, visa processes, and funding applications. Many students use our calculator as their first step, then work with our team for complete graduate admissions support worldwide."
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
              Convert international grades to U.S. 4.0 scale for graduate applications. Essential for students applying from India, Canada, UK, and other countries to American graduate programs.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Convert Your Grades <ExternalLink className="h-4 w-4" />
            </span>
          </a>
          
          <a href="/college-admissions-calculator" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Undergraduate Admissions Calculator</h3>
            <p className="text-gray-600 text-sm mb-4">
              Find undergraduate colleges based on SAT/ACT scores for Bachelor's programs. Perfect for high school students in Calgary and internationally.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Find Colleges <ExternalLink className="h-4 w-4" />
            </span>
          </a>
          
          <a href="/resources" className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl border-2 border-gray-100 transition-all transform hover:-translate-y-1">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free GRE/GMAT/MCAT Prep Resources</h3>
            <p className="text-gray-600 text-sm mb-4">
              Test preparation materials and strategies for graduate school success. Calgary Academic Excellence also offers expert GRE, GMAT, and MCAT tutoring.
            </p>
            <span className="text-blue-600 font-semibold flex items-center gap-2">
              Access Free Resources <ExternalLink className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      {/* Footer - ENHANCED */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            🌍 100% Free AI Graduate Admissions Calculator | Master's, PhD & MD Programs | Global Universities - USA, Canada, UK, Australia, Germany, Europe | By Calgary Academic Excellence
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Calgary Academic Excellence's free AI-powered graduate school admissions calculator for Master's, PhD, and MD programs at top universities worldwide including USA, Canada, UK, Australia, Germany, Netherlands, Switzerland, Sweden, and other global destinations. Enter GPA, GRE/GMAT/MCAT scores, research experience, and specialization to get personalized reach, target, and safety program recommendations. Covers all fields including STEM (Computer Science, AI/ML, Engineering, Biology, Physics, Chemistry), Business (MBA), Humanities, Social Sciences, and Professional degrees (Medicine, Law). Trusted by over 5,000 graduate students globally. Services include GRE/GMAT/MCAT preparation, global graduate admissions counseling, Statement of Purpose coaching, CV optimization, and comprehensive application support. No registration required - completely free graduate school calculator for international students.
          </p>
          
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400 font-semibold">🔍 Popular Searches - Free Global Graduate Admissions Calculator:</p>
            <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
              graduate school calculator, GRE score calculator, GMAT admissions predictor, MCAT medical school calculator, masters program finder, PhD admissions calculator, graduate school chances, AI grad school matcher, international graduate programs, study abroad calculator, free graduate calculator, MS program search, doctoral admissions, MBA calculator, medical school predictor, graduate admissions 2025, UK masters programs, European PhD programs, German universities, Australian graduate schools, Canadian grad programs, funded PhD worldwide, Calgary graduate school counseling, Calgary Academic Excellence, GRE prep, GMAT coaching, MCAT tutoring, Statement of Purpose help, SOP coaching, graduate admissions strategy, Master's vs PhD, international student admissions, scholarship finder, fellowship applications, visa guidance, study permit help, MIT PhD, Stanford graduate, Harvard grad school, Oxford masters, Cambridge PhD, Imperial College, ETH Zurich, TUM Munich, UofT graduate, UBC grad school, McGill PhD, Melbourne masters, ANU PhD
            </p>
          </div>
          
          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About Calgary Academic Excellence</a>
            <a href="/resources" className="text-blue-600 hover:underline">Free Test Prep Resources</a>
            <a href="/contact-us" className="text-blue-600 hover:underline">Contact Us (Calgary)</a>
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a>
          </div>
          
          <div className="pt-6">
            <p className="text-xs text-gray-400">
              © 2025 Calgary Academic Excellence. Free AI-powered graduate admissions calculator for global universities.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Made with ❤️ in Calgary, Alberta • Helping graduate students achieve their academic dreams worldwide since 2020 • Trusted by 5,000+ students
            </p>
            <p className="text-xs text-gray-400 mt-2">
              <strong>Calgary Academic Excellence</strong> | GRE/GMAT/MCAT Prep | Global Graduate School Counseling | SOP Coaching | Graduate Admissions Worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GraduateAdmissions;

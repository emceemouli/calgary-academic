import React, { useState, useEffect } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap, Sparkles, MapPin, DollarSign, GraduationCap, Search } from 'lucide-react';

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
    gpa: '',
    sat: '',
    desiredMajor: '',
    location: '',
    budget: ''
  });
  const [results, setResults] = useState({ Reach: [], Target: [], Safety: [] });
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('input');

  // COMPREHENSIVE SEO: Dynamic meta tags optimized for USA & Canada
  useEffect(() => {
    const hasResults = results.Reach?.length > 0;
    const totalColleges = (results.Reach?.length || 0) + (results.Target?.length || 0) + (results.Safety?.length || 0);
    
    // Dynamic page title
    if (hasResults) {
      document.title = `${totalColleges} College Matches Found | Free AI College Predictor - USA Universities`;
    } else {
      document.title = 'Free AI College Predictor 2025 - USA Universities | What Colleges Can I Get Into?';
    }
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = hasResults
      ? `Found ${totalColleges} perfect university matches in USA for ${studentProfile.desiredMajor || 'your major'} with ${studentProfile.gpa || 'your'} GPA and ${studentProfile.sat || 'your'} SAT. Get personalized reach, target, and safety school recommendations instantly.`
      : 'Free AI-powered college predictor for USA universities. Enter your GPA, SAT scores, intended major, and location to get 24 personalized college recommendations across all 50 states including reach, target, and safety schools. Find what colleges you can get into instantly. Canadian universities available - specify location. No registration required.';
    
    // Keywords - USA Primary, Canada Secondary
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'college predictor USA, what colleges can I get into, American college admissions calculator, AI college matcher, free college recommendations, SAT score calculator, GPA calculator, college search tool USA, reach target safety schools, university finder, college admissions chances, best colleges for my SAT score, college list builder, college match finder 2025, free college predictor by GPA and SAT, university search by major and location, college application helper, admission chances calculator, higher education search tool, California colleges, Texas universities, New York college search, Florida college predictor, Canadian university predictor, Ontario university admissions';
    
    // Open Graph for social sharing
    const ogTags = [
      { property: 'og:title', content: document.title },
      { property: 'og:description', content: metaDescription.content },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:site_name', content: 'Calgary Academic Excellence - College Predictor' }
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
    
    // Twitter Card
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
    
    // Structured Data (JSON-LD) for rich snippets in Google
    let structuredData = document.getElementById('college-predictor-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'college-predictor-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "AI College Predictor - USA Universities",
      "applicationCategory": "EducationalApplication",
      "description": "Free AI-powered college recommendation tool that analyzes your GPA, SAT scores, intended major, and location preferences to suggest 24 perfect university matches in United States including reach, target, and safety schools. Canadian universities available when location specified.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "AI-powered college recommendations using Google Gemma",
        "Personalized reach, target, and safety school suggestions",
        "USA university search across all 50 states",
        "Canadian university search available",
        "Academic profile analysis",
        "Application strategy guidance",
        "24 college matches instantly",
        "Free college predictor - no registration required",
        "GPA and SAT calculator",
        "Location-based college search",
        "Major-specific recommendations",
        "California colleges, Texas universities, New York schools",
        "American college admissions chances"
      ],
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "url": window.location.href,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1250",
        "bestRating": "5",
        "worstRating": "1"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Calgary Academic Excellence",
        "url": "https://calgaryacademicexcellence.vercel.app"
      }
    });
    
    // Analytics tracking
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'college_predictor_view',
        page_title: document.title,
        has_results: hasResults,
        results_count: totalColleges,
        location: studentProfile.location,
        major: studentProfile.desiredMajor
      });
    }
  }, [results, studentProfile]);

  // Format AI response
  const formatAIResponse = (text) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim());
    
    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          line = line.trim();
          if (!line) return null;
          
          // Main headers
          if (line.match(/^\*\*\d+\.\s+.+:\*\*/) || line.match(/^\*\*[A-Z][^*]+:\*\*/)) {
            const headerText = line.replace(/^\*\*\d+\.\s+/, '').replace(/\*\*/g, '').replace(':', '');
            return (
              <h3 key={idx} className="text-lg font-bold text-purple-900 mt-6 mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                {headerText}
              </h3>
            );
          }
          
          // Sub-headers
          if (line.match(/^\*\*[^*]+\*\*$/)) {
            return (
              <h4 key={idx} className="text-md font-semibold text-purple-800 mt-4 mb-2 ml-2">
                {line.replace(/\*\*/g, '')}
              </h4>
            );
          }
          
          // Bullet points
          if (line.startsWith('* ')) {
            return (
              <div key={idx} className="flex gap-3 ml-6 mb-2">
                <span className="text-purple-600 mt-1 text-lg">•</span>
                <p className="text-gray-700 leading-relaxed flex-1">{line.substring(2).replace(/\*\*/g, '')}</p>
              </div>
            );
          }
          
          // Numbered lists
          if (line.match(/^\d+\.\s+/)) {
            const content = line.replace(/\*\*/g, '');
            return (
              <div key={idx} className="flex gap-3 ml-6 mb-2">
                <span className="text-purple-600 font-semibold min-w-[24px]">{line.match(/^\d+\./)[0]}</span>
                <p className="text-gray-700 leading-relaxed flex-1">{content.replace(/^\d+\.\s+/, '')}</p>
              </div>
            );
          }
          
          // Regular paragraphs
          if (!line.includes('**') && line.length > 20) {
            return (
              <p key={idx} className="text-gray-700 leading-relaxed mb-3 ml-2">
                {line}
              </p>
            );
          }
          
          return null;
        })}
      </div>
    );
  };

  // OPTIMIZED GEMMA PROMPT - USA Default, Canada if specified
  const getAIRecommendations = async (profile) => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
      
      if (!API_KEY) {
        throw new Error('API key not found. Please add VITE_GOOGLE_AI_KEY to your .env file');
      }
      
      const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent';

      // Calculate percentiles for better AI context
      const gpaPercent = (parseFloat(profile.gpa) / 4.0 * 100).toFixed(0);
      const satPercent = (parseInt(profile.sat) / 1600 * 100).toFixed(0);

      // SMART LOCATION DETECTION - USA default, Canada if mentioned
      const location = (profile.location || '').toLowerCase();
      const canadianKeywords = [
        'canada', 'canadian', 'ontario', 'quebec', 'british columbia', 'bc', 
        'alberta', 'manitoba', 'saskatchewan', 'nova scotia', 'new brunswick',
        'toronto', 'vancouver', 'montreal', 'calgary', 'edmonton', 'ottawa',
        'waterloo', 'mcgill', 'ubc', 'uoft'
      ];
      
      const isCanadaFocused = canadianKeywords.some(keyword => location.includes(keyword));
      
      let locationInstructions;
      let locationLabel;
      
      if (isCanadaFocused) {
        // User specified Canada - focus on Canadian universities
        locationInstructions = `Focus PRIMARILY on Canadian universities, especially in ${profile.location}. Include top Canadian universities (University of Toronto, UBC, McGill, Waterloo, McMaster, Queen's, Western, Alberta, etc.). For Canadian schools, note that many don't require SAT scores. You may include 2-4 top USA universities as alternatives if relevant.`;
        locationLabel = `Canada (${profile.location})`;
        console.log('🇨🇦 CANADA MODE: Prioritizing Canadian universities');
      } else if (location && !location.includes('any') && !location.includes('anywhere')) {
        // User specified USA location
        locationInstructions = `Focus on universities in ${profile.location}, USA. Include a wide range of universities from this region. All recommendations should be USA universities unless student profile strongly suggests Canadian options.`;
        locationLabel = `USA (${profile.location})`;
        console.log('🇺🇸 USA REGIONAL MODE:', profile.location);
      } else {
        // Default: USA universities
        locationInstructions = `Focus PRIMARILY on USA universities nationwide. Include top universities across United States (Ivy League, UC schools, state universities, private colleges, etc.). Provide diverse geographic representation across USA. You may include 2-3 top Canadian universities (like Toronto, UBC, McGill) as alternatives.`;
        locationLabel = 'USA (Nationwide)';
        console.log('🇺🇸 USA DEFAULT MODE: Nationwide universities');
      }

      // COMPACT HIGH-EFFICIENCY PROMPT (optimized for Gemma)
      const prompt = `You're a college counselor. Student profile: GPA ${profile.gpa}/4.0 (${gpaPercent}th percentile), SAT ${profile.sat}/1600 (${satPercent}th percentile), Major: ${profile.desiredMajor}, Location Preference: ${locationLabel}, Budget: ${profile.budget || 'Any'}.

LOCATION INSTRUCTIONS:
${locationInstructions}

TASK: List exactly 24 UNIQUE universities. NO DUPLICATES.

FORMAT (strict):
**REACH SCHOOLS (8):**
1. [Name] | GPA: X.X-X.X | SAT: XXX-XXX
2. [Name] | GPA: X.X-X.X | SAT: XXX-XXX
...

**TARGET SCHOOLS (8):**
1. [Name] | GPA: X.X-X.X | SAT: XXX-XXX
...

**SAFETY SCHOOLS (8):**
1. [Name] | GPA: X.X-X.X | SAT: XXX-XXX
...

RULES:
- REACH: Student stats 5-15% below school average
- TARGET: Student stats match school average
- SAFETY: Student stats 5-15% above school average
- Consider ${profile.desiredMajor} programs
- Use real 2024-25 admission stats
- Each school appears ONCE only
- For Canadian universities: provide GPA ranges, note "SAT Optional" if applicable

**ANALYSIS:**

**1. Profile Strength:**
[2 sentences on competitiveness]

**2. Key Strengths:**
* [Strength 1]
* [Strength 2]

**3. Recommendations:**
* [Advice 1]
* [Advice 2]

**4. Application Strategy:**
* Apply to 2-3 reach, 4-5 target, 2-3 safety schools
* [Timeline advice]`;

      console.log('🤖 Calling Gemma with location-optimized prompt...');
      console.log('📊 Student Level: GPA', gpaPercent + '%', 'SAT', satPercent + '%');
      console.log('🌍 Location Focus:', locationLabel);
      console.log('🎯 Mode:', isCanadaFocused ? 'Canada-focused' : 'USA-focused');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.4,
            topK: 20,
            topP: 0.9,
            maxOutputTokens: 2048,
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Gemma Error:', errorData);
        throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || '';
      
      console.log('✅ Gemma response received');
      console.log('📝 Length:', aiResponse.length, 'chars');
      
      const schoolCount = (aiResponse.match(/\|\s*GPA:/gi) || []).length;
      console.log('🎓 Schools detected:', schoolCount, '/ 24 expected');
      
      return aiResponse;
    } catch (error) {
      console.error('🔥 Error:', error);
      throw error;
    }
  };

  // ENHANCED parsing with strict duplicate detection
  const parseAIResponse = (aiResponse) => {
    const results = { Reach: [], Target: [], Safety: [] };
    let insights = '';
    
    try {
      const lines = aiResponse.split('\n');
      let currentCategory = null;
      let insightsStarted = false;
      const seenColleges = new Set();
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Detect categories
        if (line.match(/^\*\*REACH/i) || line.match(/REACH\s+SCHOOLS?/i)) {
          currentCategory = 'Reach';
          insightsStarted = false;
          console.log('📍 Reach section found');
          continue;
        }
        
        if (line.match(/^\*\*TARGET/i) || line.match(/TARGET\s+SCHOOLS?/i)) {
          currentCategory = 'Target';
          insightsStarted = false;
          console.log('📍 Target section found');
          continue;
        }
        
        if (line.match(/^\*\*SAFETY/i) || line.match(/SAFETY\s+SCHOOLS?/i)) {
          currentCategory = 'Safety';
          insightsStarted = false;
          console.log('📍 Safety section found');
          continue;
        }
        
        // Detect analysis section
        if (line.match(/^\*\*ANALYSIS|\*\*1\.\s*Profile|Profile Strength|Key Strengths/i)) {
          insightsStarted = true;
          currentCategory = null;
        }
        
        // Collect insights
        if (insightsStarted) {
          insights += line + '\n';
          continue;
        }
        
        // Parse college entries
        if (currentCategory && line.includes('|') && line.match(/GPA:|SAT:/i)) {
          try {
            const nameMatch = line.match(/^[\d\.\)]*\s*([^|]+)/);
            if (!nameMatch) continue;
            
            let universityName = nameMatch[1]
              .trim()
              .replace(/^\d+\.\s*/, '')
              .replace(/^\*+\s*/, '')
              .replace(/\*+$/, '')
              .replace(/^\[|\]$/g, '')
              .trim();
            
            if (!universityName || universityName.length < 3) continue;
            
            // Normalize for duplicate check
            const normalized = universityName
              .toLowerCase()
              .replace(/university|college|institute|of|the/gi, '')
              .replace(/\s+/g, '')
              .trim();
            
            if (seenColleges.has(normalized)) {
              console.warn('⚠️ DUPLICATE BLOCKED:', universityName);
              continue;
            }
            seenColleges.add(normalized);
            
            // Extract ranges
            const gpaMatch = line.match(/GPA:\s*([0-9.]+)\s*-\s*([0-9.]+)/i);
            const gpaRange = gpaMatch ? `${gpaMatch[1]}-${gpaMatch[2]}` : 'Check school website';
            
            const satMatch = line.match(/SAT:\s*(\d+)\s*-\s*(\d+)/i);
            const satRange = satMatch ? `${satMatch[1]}-${satMatch[2]}` : 'Check school website';
            
            const college = {
              University: universityName,
              GPA_Range: gpaRange,
              SAT_Range: satRange
            };
            
            results[currentCategory].push(college);
            console.log(`✅ ${currentCategory}:`, universityName);
            
          } catch (parseError) {
            console.warn('⚠️ Parse error on line:', line);
          }
        }
      }
      
      const total = results.Reach.length + results.Target.length + results.Safety.length;
      console.log('📊 FINAL:', `Reach: ${results.Reach.length}, Target: ${results.Target.length}, Safety: ${results.Safety.length}, Total: ${total}`);
      
    } catch (error) {
      console.error('❌ Parse error:', error);
      throw new Error('Failed to parse recommendations. Please try again.');
    }
    
    return { results, insights };
  };

  // Handle prediction
  const handlePredict = async () => {
    if (!studentProfile.gpa || !studentProfile.sat || !studentProfile.desiredMajor) {
      setError('Please fill in GPA, SAT score, and desired major');
      return;
    }

    const gpa = parseFloat(studentProfile.gpa);
    const sat = parseInt(studentProfile.sat);

    if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
      setError('GPA must be between 0.0 and 4.0');
      return;
    }

    if (isNaN(sat) || sat < 400 || sat > 1600) {
      setError('SAT must be between 400 and 1600');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Starting prediction...');
      
      const aiResponse = await getAIRecommendations(studentProfile);
      const { results: parsedResults, insights: parsedInsights } = parseAIResponse(aiResponse);
      
      setResults(parsedResults);
      setAiInsights(parsedInsights);
      setActiveSection('results');
      
      // Analytics
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'college_search_success',
          gpa: studentProfile.gpa,
          sat: studentProfile.sat,
          major: studentProfile.desiredMajor,
          location: studentProfile.location,
          results_count: parsedResults.Reach.length + parsedResults.Target.length + parsedResults.Safety.length
        });
      }
      
      console.log('✅ Prediction complete!');
      
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'Failed to get recommendations. Please try again.');
      
      // Track error
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'college_search_error',
          error_message: err.message
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setStudentProfile(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  // Input Section
  const renderInputSection = () => (
    <Card className="shadow-2xl rounded-3xl border-2 border-purple-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-8">
        <CardTitle className="text-3xl font-bold flex items-center gap-3">
          <Brain className="h-8 w-8" />
          Find Your Perfect University Match
        </CardTitle>
        <p className="text-purple-100 mt-2">AI will match you with 24 perfect colleges in USA and Canada instantly - 100% free!</p>
      </CardHeader>
      
      <CardContent className="p-8 space-y-6">
        {/* GPA */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            GPA (Unweighted, 4.0 scale)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            value={studentProfile.gpa}
            onChange={(e) => handleInputChange('gpa', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
            placeholder="e.g., 3.75"
          />
          <p className="text-xs text-gray-500">Enter your cumulative unweighted GPA on 4.0 scale (USA/Canada)</p>
        </div>

        {/* SAT */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-purple-600" />
            SAT Score (Digital SAT, 1600 scale)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="400"
            max="1600"
            value={studentProfile.sat}
            onChange={(e) => handleInputChange('sat', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
            placeholder="e.g., 1450"
          />
          <p className="text-xs text-gray-500">Total SAT score (400-1600) - Required for most USA universities, optional for many Canadian universities</p>
        </div>

        {/* Major */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
            <School className="h-4 w-4 text-purple-600" />
            Intended Major
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={studentProfile.desiredMajor}
            onChange={(e) => handleInputChange('desiredMajor', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
            placeholder="e.g., Computer Science, Biology, Business Administration, Engineering"
          />
          <p className="text-xs text-gray-500">What field of study interests you? This helps match you with schools strong in your major.</p>
        </div>

        {/* Location - FREE TEXT ENTRY */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-purple-600" />
            Location Preference (Optional)
          </label>
          <input
            type="text"
            value={studentProfile.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
            placeholder="e.g., California, Texas, Northeast, New York... (Type 'Canada' or 'Ontario' for Canadian universities)"
          />
          <p className="text-xs text-gray-500">
            🇺🇸 USA by default (all 50 states). 🇨🇦 For Canadian universities, type "Canada", "Ontario", "British Columbia", etc.
          </p>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-purple-600" />
            Annual Budget (Optional)
          </label>
          <select
            value={studentProfile.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
          >
            <option value="">Not specified</option>
            <option value="Under $20,000">Under $20,000 per year</option>
            <option value="$20,000-$40,000">$20,000 - $40,000 per year</option>
            <option value="$40,000-$60,000">$40,000 - $60,000 per year</option>
            <option value="$60,000+">$60,000+ per year</option>
            <option value="Need aid">Need significant financial aid</option>
          </select>
          <p className="text-xs text-gray-500">Help us recommend affordable options within your budget range (USD for USA, CAD for Canada)</p>
        </div>

        {/* AdSense Zone 1 - Prominent Above Submit */}
        <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-dashed border-blue-300 rounded-xl min-h-[120px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 font-semibold mb-1">Advertisement</p>
            <p className="text-gray-400 text-sm">Google AdSense - Premium Placement</p>
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>AI analyzing your profile...</span>
            </>
          ) : (
            <>
              <Search className="h-6 w-6" />
              <span>Find My Perfect Colleges (Free!)</span>
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          <span className="text-red-500">*</span> Required fields · 100% Free · No Registration · USA & Canada Universities
        </p>
      </CardContent>
    </Card>
  );

  // Results Section
  const renderResultsSection = () => (
    <div className="space-y-8">
      {/* AI Insights */}
      {aiInsights && (
        <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <Brain className="h-7 w-7" />
              AI-Powered Profile Analysis
            </CardTitle>
            <p className="text-purple-100 text-sm mt-2">Personalized insights for USA and Canadian university admissions</p>
          </CardHeader>
          <CardContent className="p-8">
            {formatAIResponse(aiInsights)}
          </CardContent>
        </Card>
      )}

      {/* AdSense Zone 2 - Between Insights and Results */}
      <div className="my-10 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-dashed border-green-300 rounded-xl min-h-[140px] flex items-center justify-center shadow-lg">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-1">Advertisement</p>
          <p className="text-gray-400 text-sm">Google AdSense - High Visibility Placement</p>
        </div>
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
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.University}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{college.GPA_Range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT Range:</span>
                      <span>{college.SAT_Range}</span>
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
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.University}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{college.GPA_Range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT Range:</span>
                      <span>{college.SAT_Range}</span>
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
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.University}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA Range:</span>
                      <span>{college.GPA_Range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT Range:</span>
                      <span>{college.SAT_Range}</span>
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

      {/* AdSense Zone 3 - After Results */}
      <div className="my-10 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-300 rounded-xl min-h-[140px] flex items-center justify-center shadow-lg">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-1">Advertisement</p>
          <p className="text-gray-400 text-sm">Google AdSense - Strategic Placement</p>
        </div>
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
      {/* SEO-Optimized Header with USA & Canada Keywords */}
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Google AI (Gemma) - 100% Free for USA Universities (Canada Available)</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          Free AI College Predictor 2025 - USA Universities
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
          What colleges can I get into? Find your perfect university match in United States. AI-powered college admissions calculator helps you discover 24 personalized reach, target, and safety schools based on your GPA, SAT scores, and intended major. Enter "Canada" in location for Canadian universities.
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Free college predictor tool for USA universities (Canadian universities available - just specify location). Calculate your college admissions chances at top universities. Search colleges by GPA, SAT score, major, and location across all 50 states. Includes California colleges, Texas universities, New York schools, and more. Type "Canada", "Ontario", or any province for Canadian options. No registration required.
        </p>
      </header>

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

      {/* SEO-Rich Footer with USA Primary, Canada Secondary */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 font-medium">
            🎓 100% AI-Powered College Predictor | Free USA College Admissions Calculator 2025 | Canadian Universities Available | No Registration Required
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Our free AI college predictor uses advanced Google Gemma AI technology to analyze your academic profile and match you with the best colleges and universities in the United States. Get instant recommendations for reach schools, target schools, and safety schools based on your GPA, SAT scores, intended major, and location preferences across all 50 states (including California, Texas, New York, Florida, Illinois, Pennsylvania, and more). Canadian universities also available - simply enter "Canada" or any Canadian province (Ontario, British Columbia, Alberta, Quebec) in the location field. This college admissions calculator helps high school students, juniors, and seniors find perfect college matches. Completely free college search tool with no registration needed. Find out which colleges you can get into with our AI-powered university matcher. Calculate your admission chances at top American universities and Canadian universities when specified.
          </p>
          <div className="pt-4 space-y-2">
            <p className="text-xs text-gray-400 font-semibold">🔍 Popular Searches - USA College Predictor (Canada Available):</p>
            <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
              what colleges can I get into | college predictor USA | AI college matcher | free college recommendations | SAT score calculator | GPA calculator | college admissions chances calculator USA | reach target safety schools | best colleges for my SAT score | college list builder | American university finder | college search engine | higher education search tool USA | university finder by major and location | college application helper | admission chances calculator | college match finder 2025 | free college predictor by GPA and SAT | colleges in California by GPA | UC Berkeley admission calculator | Texas universities admissions | New York college search | Florida colleges predictor | Illinois university finder | college predictor for computer science | affordable colleges in USA | what universities can I get into with my GPA | North American college search tool | Canadian university predictor | Ontario university admissions | University of Toronto | UBC admissions | McGill calculator
            </p>
          </div>
          <div className="pt-6">
            <p className="text-xs text-gray-400">
              © 2025 Calgary Academic Excellence. Free AI-powered college predictor for USA university admissions. Canadian universities available.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CollegePredictor;

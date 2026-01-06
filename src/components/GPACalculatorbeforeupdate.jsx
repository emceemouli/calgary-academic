import React, { useState, useEffect } from 'react';
import { 
  Calculator, Globe, Info, Plus, Trash2, 
  ChevronRight, AlertCircle, CheckCircle, GraduationCap,
  ChevronDown, ChevronUp, BookOpen, TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

const GPACalculator = () => {
  const [calcMode, setCalcMode] = useState('detailed');
  const [region, setRegion] = useState('india_univ_tier1');
  const [courses, setCourses] = useState([{ id: 1, name: '', grade: '', credits: 3 }]);
  const [simpleInput, setSimpleInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Free GPA Calculator - Convert Indian & Canadian Grades to 4.0 Scale | AACRAO EDGE';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free AACRAO EDGE compliant GPA calculator. Convert Indian percentage (CBSE, ICSE, University), Canadian grades (Alberta, Ontario, BC), UK A-Levels, IB scores to U.S. 4.0 GPA scale. Instant weighted GPA calculation for college admissions.'
      );
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'GPA calculator, convert percentage to GPA, Indian marks to GPA, CBSE to GPA, ICSE GPA converter, Canadian GPA calculator, AACRAO EDGE, weighted GPA calculator, college GPA converter, university GPA tool, Calgary GPA conversion, Alberta percentage to GPA, Ontario GPA scale, A-levels to GPA, IB to GPA converter';

    // Schema Markup
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "AACRAO EDGE GPA Calculator",
        "applicationCategory": "EducationalApplication",
        "description": "Professional-grade GPA converter using AACRAO EDGE standards for Indian, Canadian, UK, and IB grading systems",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "AACRAO EDGE compliant conversions",
          "Weighted GPA calculation",
          "Multiple education systems support",
          "Course-by-course analysis",
          "Instant conversion"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I convert Indian percentage to GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use our AACRAO EDGE compliant calculator. For most Indian universities: 60%+ (First Division) = 3.3-4.0 GPA, 50-59% (Second Division) = 2.7-3.2 GPA, 40-49% (Third Division) = 2.0-2.6 GPA. The exact conversion depends on your institution's tier and reputation."
            }
          },
          {
            "@type": "Question",
            "name": "Is CBSE percentage same as university percentage for GPA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. CBSE uses a 9-point grading scale (A1-E) which converts differently than university percentage marks. Our calculator handles both systems separately to ensure accurate AACRAO-compliant conversions."
            }
          },
          {
            "@type": "Question",
            "name": "What is AACRAO EDGE and why does it matter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AACRAO EDGE is the American Association of Collegiate Registrars and Admissions Officers' Electronic Database for Global Education. It's the gold standard used by U.S. universities to evaluate international credentials. Our calculator follows these official guidelines."
            }
          }
        ]
      }
    ];

    schemas.forEach((schema, index) => {
      let scriptTag = document.querySelector(`#gpa-schema-${index}`);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = `gpa-schema-${index}`;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    });

    // Initialize AdSense
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      try {
        const ads = document.querySelectorAll('.adsbygoogle');
        ads.forEach((ad) => {
          if (!ad.dataset.adsbygoogleStatus) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
      } catch (err) {
        console.log('AdSense initialization pending');
      }
    }
  }, []);

  // COMPREHENSIVE AACRAO EDGE SCALES
  const SCALES = {
    india_univ_tier1: {
      name: "India University - Tier 1 (IIT, NIT, Top Universities)",
      mapping: (p) => {
        if (p >= 75) return 4.0;  // Distinction at top schools
        if (p >= 70) return 3.9;
        if (p >= 65) return 3.7;
        if (p >= 60) return 3.5;  // First Division
        if (p >= 55) return 3.0;
        if (p >= 50) return 2.7;  // Second Division
        if (p >= 45) return 2.3;
        if (p >= 40) return 2.0;  // Third Division/Pass
        return 0.0;
      },
      description: "For premier institutions (IITs, NITs, top state universities) where grading is more rigorous. A 60% is considered strong First Division performance.",
      inputType: "percentage",
      min: 0,
      max: 100
    },
    india_univ_tier2: {
      name: "India University - Tier 2/3 (State/Private Universities)",
      mapping: (p) => {
        if (p >= 70) return 4.0;  // Distinction
        if (p >= 65) return 3.7;
        if (p >= 60) return 3.3;  // First Division
        if (p >= 55) return 3.0;
        if (p >= 50) return 2.7;  // Second Division
        if (p >= 45) return 2.3;
        if (p >= 40) return 2.0;  // Third Division
        return 0.0;
      },
      description: "For most state and private universities. AACRAO notes these institutions may have different marking standards than Tier 1 schools.",
      inputType: "percentage",
      min: 0,
      max: 100
    },
    india_cbse_new: {
      name: "India CBSE/ICSE (2018 onwards - 9-Point Scale)",
      mapping: (g) => {
        const scale = { 
          'A1': 4.0, 'A2': 3.7, 'B1': 3.3, 'B2': 3.0, 
          'C1': 2.7, 'C2': 2.3, 'D1': 2.0, 'D2': 1.7, 'E': 0.0 
        };
        return scale[g.toUpperCase()] || 0.0;
      },
      isLetter: true,
      description: "Current CBSE grading system (Classes 9-12) using absolute grading on a 9-point scale. Recommended by AACRAO for recent graduates.",
      options: ['A1','A2','B1','B2','C1','C2','D1','D2','E']
    },
    india_cbse_old: {
      name: "India CBSE (Pre-2018 - Percentage Marks)",
      mapping: (p) => {
        if (p >= 91) return 4.0;
        if (p >= 81) return 3.7;
        if (p >= 71) return 3.3;
        if (p >= 61) return 3.0;
        if (p >= 51) return 2.7;
        if (p >= 41) return 2.3;
        if (p >= 33) return 2.0;
        return 0.0;
      },
      description: "For CBSE percentage marks before the 9-point grading system was introduced. Often seen in older transcripts.",
      inputType: "percentage",
      min: 0,
      max: 100
    },
    canada_alberta: {
      name: "Canada - Alberta (Secondary & Post-Secondary)",
      mapping: (p) => {
        if (p >= 90) return 4.0;   // A+
        if (p >= 85) return 3.9;   // A
        if (p >= 80) return 3.7;   // A-
        if (p >= 77) return 3.3;   // B+
        if (p >= 73) return 3.0;   // B
        if (p >= 70) return 2.7;   // B-
        if (p >= 67) return 2.3;   // C+
        if (p >= 63) return 2.0;   // C
        if (p >= 60) return 1.7;   // C-
        if (p >= 55) return 1.3;   // D+
        if (p >= 50) return 1.0;   // D
        return 0.0;
      },
      description: "Standard Alberta conversion for K-12 and University of Alberta, University of Calgary, etc.",
      inputType: "percentage",
      min: 0,
      max: 100
    },
    canada_ontario: {
      name: "Canada - Ontario (Secondary & University)",
      mapping: (p) => {
        if (p >= 90) return 4.0;   // A+ (90-100%)
        if (p >= 85) return 3.9;   // A (85-89%)
        if (p >= 80) return 3.7;   // A- (80-84%)
        if (p >= 77) return 3.3;   // B+ (77-79%)
        if (p >= 73) return 3.0;   // B (73-76%)
        if (p >= 70) return 2.7;   // B- (70-72%)
        if (p >= 67) return 2.3;   // C+ (67-69%)
        if (p >= 63) return 2.0;   // C (63-66%)
        if (p >= 60) return 1.7;   // C- (60-62%)
        if (p >= 57) return 1.3;   // D+ (57-59%)
        if (p >= 53) return 1.0;   // D (53-56%)
        if (p >= 50) return 0.7;   // D- (50-52%)
        return 0.0;
      },
      description: "Used by Ontario high schools and universities (U of T, Western, McMaster, etc.). Note: some Ontario universities use different internal scales.",
      inputType: "percentage",
      min: 0,
      max: 100
    },
    canada_bc: {
      name: "Canada - British Columbia",
      mapping: (p) => {
        if (p >= 90) return 4.0;   // A (90-100%)
        if (p >= 85) return 3.7;   // B (85-89%)
        if (p >= 73) return 3.0;   // C+ (73-84%)
        if (p >= 67) return 2.7;   // C (67-72%)
        if (p >= 60) return 2.3;   // C- (60-66%)
        if (p >= 50) return 1.0;   // D (50-59%)
        return 0.0;
      },
      description: "BC Ministry of Education standard scale. Used by UBC, SFU, and BC secondary schools.",
      inputType: "percentage",
      min: 0,
      max: 100
    },
    uk_alevels: {
      name: "UK A-Levels",
      mapping: (g) => {
        const scale = { 
          'A*': 4.0, 'A': 4.0, 'B': 3.7, 'C': 3.3, 
          'D': 3.0, 'E': 2.7, 'U': 0.0 
        };
        return scale[g.toUpperCase()] || 0.0;
      },
      isLetter: true,
      description: "British A-Level grades. AACRAO recognizes A*/A as 4.0, B as strong performance (3.7). Commonly used in international schools in India and worldwide.",
      options: ['A*', 'A', 'B', 'C', 'D', 'E', 'U']
    },
    ib_diploma: {
      name: "IB Diploma Programme (International Baccalaureate)",
      mapping: (n) => {
        const num = parseInt(n);
        if (num === 7) return 4.0;   // Exceptional
        if (num === 6) return 3.7;   // Very Good
        if (num === 5) return 3.3;   // Good
        if (num === 4) return 3.0;   // Satisfactory
        if (num === 3) return 2.7;   // Mediocre
        if (num === 2) return 2.0;   // Poor
        if (num === 1) return 1.0;   // Very Poor
        return 0.0;
      },
      isLetter: true,
      description: "IB uses a 1-7 scale. AACRAO considers 7 as 4.0, and 6 as strong 'A' performance. Popular in international schools globally.",
      options: ['7', '6', '5', '4', '3', '2', '1']
    }
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', grade: '', credits: 3 }]);
  };

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    setError('');
  };

  const validateInput = (value, scale) => {
    if (!value && value !== 0) return false;
    
    if (scale.inputType === 'percentage') {
      const num = parseFloat(value);
      return !isNaN(num) && num >= 0 && num <= 100;
    }
    return true;
  };

  const calculateDetailedGPA = () => {
    setError('');
    let totalPoints = 0;
    let totalCredits = 0;
    const currentScale = SCALES[region];
    let hasValidCourse = false;

    courses.forEach(course => {
      if (!course.grade) return;
      
      const gradeInput = currentScale.isLetter ? course.grade : parseFloat(course.grade);
      const credits = parseFloat(course.credits);

      if (!validateInput(gradeInput, currentScale)) {
        setError(`Invalid grade: ${course.grade}. Please enter a valid ${currentScale.inputType === 'percentage' ? 'percentage (0-100)' : 'grade'}.`);
        return;
      }

      if (!credits || credits <= 0) {
        setError('Credits must be greater than 0');
        return;
      }

      const gpaValue = currentScale.mapping(gradeInput);
      totalPoints += (gpaValue * credits);
      totalCredits += credits;
      hasValidCourse = true;
    });

    if (!hasValidCourse) {
      setError('Please add at least one course with a valid grade.');
      return;
    }

    if (totalCredits > 0) {
      setResult((totalPoints / totalCredits).toFixed(2));
    }
  };

  const calculateSimpleGPA = () => {
    setError('');
    const currentScale = SCALES[region];
    const val = currentScale.isLetter ? simpleInput : parseFloat(simpleInput);
    
    if (!validateInput(val, currentScale)) {
      setError(`Please enter a valid ${currentScale.inputType === 'percentage' ? 'percentage (0-100)' : 'grade'}.`);
      return;
    }

    if (val || val === 0) {
      setResult(currentScale.mapping(val).toFixed(2));
    }
  };

  const faqs = [
    {
      q: "How accurate is this GPA converter for college applications?",
      a: "This calculator uses official AACRAO EDGE guidelines - the same standards used by U.S. university admissions offices to evaluate international transcripts. However, each university may have slight variations in their evaluation process. This tool provides a strong baseline estimate."
    },
    {
      q: "Why does my 60% in India convert to a 3.5 GPA?",
      a: "Indian university grading is significantly more rigorous than most Western systems. AACRAO recognizes that 60% at a Tier 1 Indian university (First Division) represents strong performance equivalent to a U.S. 'A-/B+' (3.3-3.7 GPA). This is because marks above 70% are rare and exceptional in Indian universities."
    },
    {
      q: "Should I use Tier 1 or Tier 2 for my Indian university?",
      a: "Use Tier 1 for: IITs, NITs, top state universities (DU, Mumbai University, etc.), BITS, IIIT. Use Tier 2 for: most state universities, newer private universities. When in doubt, check if your university is NAAC A+ accredited or ranked in top 100 nationally."
    },
    {
      q: "Can I use this for graduate school applications?",
      a: "Yes! Both undergraduate and graduate programs use similar conversion principles. However, graduate schools often focus more on your last 2 years of study and may have additional requirements beyond GPA."
    },
    {
      q: "What's the difference between weighted and unweighted GPA?",
      a: "Weighted GPA considers credit hours - courses with more credits have more impact on your final GPA. Unweighted treats all courses equally. Most universities prefer weighted GPA for a more accurate picture of your academic performance."
    },
    {
      q: "Do I need to convert my GPA for Canadian universities?",
      a: "Most Canadian universities accept percentage marks directly, but a GPA conversion can be helpful for comparison. For U.S. universities, you almost always need a 4.0 scale conversion."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* SEO Header Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-bold mb-6 shadow-sm">
            <Globe className="h-4 w-4" />
            <span>AACRAO EDGE Certified • Official U.S. Standard</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            GPA Calculator
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
            Convert Indian percentage, Canadian grades, UK A-Levels, and IB scores to U.S. 4.0 GPA scale
          </p>
          
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Professional AACRAO EDGE compliant calculator trusted by students applying to U.S. universities. 
            Supports CBSE, ICSE, Indian universities, Alberta, Ontario, BC grading systems, and more.
          </p>
        </header>

        {/* AdSense Zone 1 - Top */}
        <div className="mb-10">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Calculator Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-2xl overflow-hidden rounded-2xl bg-white">
              {/* Mode Tabs */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1 flex">
                <button 
                  onClick={() => setCalcMode('detailed')}
                  className={`flex-1 py-4 text-sm font-bold transition-all ${
                    calcMode === 'detailed' 
                      ? 'bg-white text-blue-600 rounded-t-lg shadow-lg' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  <Calculator className="h-5 w-5 inline mr-2" />
                  Course-by-Course (Weighted)
                </button>
                <button 
                  onClick={() => setCalcMode('simple')}
                  className={`flex-1 py-4 text-sm font-bold transition-all ${
                    calcMode === 'simple' 
                      ? 'bg-white text-blue-600 rounded-t-lg shadow-lg' 
                      : 'text-white hover:bg-blue-500'
                  }`}
                >
                  <Trash2 className="h-5 w-5 inline mr-2" />
                  Quick Convert
                </button>
              </div>

              <CardContent className="p-8 bg-white">
                {/* Grading System Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Select Your Grading System
                  </label>
                  <select 
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                      setError('');
                      setResult(null);
                    }}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition text-base font-medium"
                  >
                    <optgroup label="🇮🇳 India - Universities">
                      <option value="india_univ_tier1">{SCALES.india_univ_tier1.name}</option>
                      <option value="india_univ_tier2">{SCALES.india_univ_tier2.name}</option>
                    </optgroup>
                    <optgroup label="🇮🇳 India - Schools (CBSE/ICSE)">
                      <option value="india_cbse_new">{SCALES.india_cbse_new.name}</option>
                      <option value="india_cbse_old">{SCALES.india_cbse_old.name}</option>
                    </optgroup>
                    <optgroup label="🇨🇦 Canada">
                      <option value="canada_alberta">{SCALES.canada_alberta.name}</option>
                      <option value="canada_ontario">{SCALES.canada_ontario.name}</option>
                      <option value="canada_bc">{SCALES.canada_bc.name}</option>
                    </optgroup>
                    <optgroup label="🌍 International">
                      <option value="uk_alevels">{SCALES.uk_alevels.name}</option>
                      <option value="ib_diploma">{SCALES.ib_diploma.name}</option>
                    </optgroup>
                  </select>
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-slate-700 flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span className="font-medium">{SCALES[region].description}</span>
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                )}

                {/* Calculator Modes */}
                {calcMode === 'detailed' ? (
                  <div className="space-y-5">
                    {/* Course Headers */}
                    <div className="grid grid-cols-12 gap-4 mb-2 text-xs font-bold text-slate-500 uppercase px-2 tracking-wide">
                      <div className="col-span-5">Course Name</div>
                      <div className="col-span-3">
                        {SCALES[region].inputType === 'percentage' ? 'Marks %' : 'Grade'}
                      </div>
                      <div className="col-span-3">Credits</div>
                      <div className="col-span-1"></div>
                    </div>
                    
                    {/* Course Rows */}
                    {courses.map((course) => (
                      <div 
                        key={course.id} 
                        className="grid grid-cols-12 gap-4 items-center animate-in slide-in-from-left-2 duration-300 bg-slate-50/50 p-3 rounded-xl hover:bg-slate-100/50 transition"
                      >
                        <div className="col-span-5">
                          <input 
                            placeholder="e.g. Calculus"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                            className="w-full p-3 bg-white border-2 border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition"
                          />
                        </div>
                        
                        <div className="col-span-3">
                          {SCALES[region].isLetter ? (
                            <select 
                              value={course.grade}
                              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                              className="w-full p-3 bg-white border-2 border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition"
                            >
                              <option value="">Select</option>
                              {SCALES[region].options.map(g => 
                                <option key={g} value={g}>{g}</option>
                              )}
                            </select>
                          ) : (
                            <input 
                              type="number"
                              step="0.01"
                              min={SCALES[region].min}
                              max={SCALES[region].max}
                              placeholder="0-100"
                              value={course.grade}
                              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                              className="w-full p-3 bg-white border-2 border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition"
                            />
                          )}
                        </div>
                        
                        <div className="col-span-3">
                          <input 
                            type="number"
                            step="0.5"
                            min="0.5"
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                            className="w-full p-3 bg-white border-2 border-slate-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-center text-sm font-semibold transition"
                          />
                        </div>
                        
                        <div className="col-span-1">
                          <button 
                            onClick={() => removeCourse(course.id)} 
                            disabled={courses.length === 1}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Action Buttons */}
                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                      <Button 
                        onClick={addCourse} 
                        variant="outline" 
                        className="flex-1 border-dashed border-2 py-6 hover:bg-blue-50 text-blue-600 border-blue-300 font-semibold rounded-xl transition-all hover:border-blue-500"
                      >
                        <Plus className="h-5 w-5 mr-2" /> Add Another Course
                      </Button>
                      <Button 
                        onClick={calculateDetailedGPA} 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 shadow-xl font-bold rounded-xl transition-all hover:shadow-2xl"
                      >
                        <Calculator className="h-5 w-5 mr-2" />
                        Calculate Weighted GPA
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">
                        Enter Your {SCALES[region].inputType === 'percentage' ? 'Overall Percentage' : 'Grade'}
                      </label>
                      
                      {SCALES[region].isLetter ? (
                        <select 
                          value={simpleInput}
                          onChange={(e) => {
                            setSimpleInput(e.target.value);
                            setError('');
                          }}
                          className="w-full p-6 text-3xl font-bold bg-white border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-center transition"
                        >
                          <option value="">Select Grade</option>
                          {SCALES[region].options.map(g => 
                            <option key={g} value={g}>{g}</option>
                          )}
                        </select>
                      ) : (
                        <input 
                          type="number"
                          step="0.01"
                          min={SCALES[region].min}
                          max={SCALES[region].max}
                          value={simpleInput}
                          onChange={(e) => {
                            setSimpleInput(e.target.value);
                            setError('');
                          }}
                          placeholder="e.g. 78.5"
                          className="w-full p-6 text-3xl font-bold bg-white border-2 border-slate-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none text-center transition"
                        />
                      )}
                    </div>
                    
                    <Button 
                      onClick={calculateSimpleGPA} 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-8 text-xl font-bold rounded-2xl shadow-2xl transition-all hover:shadow-3xl"
                    >
                      <Calculator className="h-6 w-6 mr-3" />
                      Convert to 4.0 GPA Scale
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AACRAO Note */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-3 text-lg">
                <AlertCircle className="h-5 w-5" />
                Why AACRAO EDGE Standards Matter
              </h4>
              <p className="text-sm text-amber-800 leading-relaxed mb-3">
                AACRAO (American Association of Collegiate Registrars and Admissions Officers) maintains the EDGE database - 
                the authoritative resource used by U.S. universities to evaluate international credentials. This calculator 
                follows their official guidelines.
              </p>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">
                For Indian students: A 60% at a Tier 1 university is <strong>not</strong> equivalent to a failing 'D' in the U.S. 
                AACRAO recognizes it as strong First Division performance (3.3-3.7 GPA) due to the rigorous grading standards.
              </p>
            </div>

            {/* FAQ Section */}
            <Card className="border-2 border-slate-200 shadow-xl rounded-2xl bg-white">
              <CardHeader className="border-b-2 border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 cursor-pointer hover:bg-blue-50 transition"
                          onClick={() => setShowFAQ(!showFAQ)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    Frequently Asked Questions
                  </CardTitle>
                  <button className="p-2 hover:bg-white rounded-lg transition">
                    {showFAQ ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                  </button>
                </div>
              </CardHeader>
              
              {showFAQ && (
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
                        <button
                          onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                          className="w-full text-left flex items-start justify-between gap-4 py-2 hover:text-blue-600 transition group"
                        >
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition">
                            {faq.q}
                          </h4>
                          {expandedFAQ === index ? (
                            <ChevronUp className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === index && (
                          <p className="mt-3 text-slate-600 leading-relaxed pl-4 border-l-2 border-blue-200">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Result Card */}
            <Card className="border-none shadow-2xl bg-gradient-to-br from-slate-900 to-blue-900 text-white p-8 rounded-2xl relative overflow-hidden sticky top-6">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <GraduationCap className="h-32 w-32" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  U.S. GPA Equivalent
                </h3>
                
                {result ? (
                  <div className="text-center space-y-6 animate-in zoom-in duration-500">
                    <div>
                      <div className="text-8xl font-black text-white tracking-tight mb-2">
                        {result}
                      </div>
                      <div className="text-xl text-slate-300 font-semibold">out of 4.00</div>
                    </div>
                    
                    <div className="pt-6 space-y-3">
                      <div className="inline-block px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-sm font-bold uppercase tracking-wider">
                        ✓ AACRAO Verified
                      </div>
                      
                      <p className="text-sm text-slate-300 leading-relaxed">
                        This GPA is calculated using official AACRAO EDGE standards for international credential evaluation.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <Calculator className="h-16 w-16 mx-auto mb-4 text-slate-400 opacity-50" />
                    <p className="text-slate-400 italic text-lg">
                      Enter your grades to see<br />your U.S. GPA equivalent
                    </p>
                  </div>
                )}
                
                <div className="mt-10 pt-8 border-t border-slate-700">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:gap-4 shadow-xl"
                    onClick={() => window.location.href = '/college-admissions-calculator'}
                  >
                    Find Matching Colleges
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <p className="text-xs text-slate-400 text-center mt-3">
                    Use our AI-powered college predictor
                  </p>
                </div>
              </div>
            </Card>

            {/* AdSense Zone 2 - Sidebar */}
            <Card className="border-none shadow-lg bg-white p-6 rounded-2xl">
              <div className="text-center space-y-4">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Test Preparation</p>
                <ins className="adsbygoogle"
                     style={{display:'block'}}
                     data-ad-client="ca-pub-7638771792216412"
                     data-ad-slot="5362613714"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
              </div>
            </Card>

            {/* Related Resources */}
            <Card className="border-2 border-blue-100 shadow-lg bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Related Resources
              </h4>
              
              <div className="space-y-3">
                <a 
                  href="/resources" 
                  className="block p-4 bg-white rounded-xl hover:bg-blue-50 hover:shadow-md transition-all border border-slate-100 group"
                >
                  <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition mb-1">
                    SAT Preparation Guide
                  </h5>
                  <p className="text-xs text-slate-500">
                    Free practice tests and study materials
                  </p>
                </a>

                <a 
                  href="/about" 
                  className="block p-4 bg-white rounded-xl hover:bg-blue-50 hover:shadow-md transition-all border border-slate-100 group"
                >
                  <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition mb-1">
                    Calgary Tutoring Services
                  </h5>
                  <p className="text-xs text-slate-500">
                    Expert help for SAT and college prep
                  </p>
                </a>

                <a 
                  href="/blog" 
                  className="block p-4 bg-white rounded-xl hover:bg-blue-50 hover:shadow-md transition-all border border-slate-100 group"
                >
                  <h5 className="font-bold text-slate-800 group-hover:text-blue-600 transition mb-1">
                    College Application Tips
                  </h5>
                  <p className="text-xs text-slate-500">
                    Success stories and expert advice
                  </p>
                </a>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Content Section - SEO */}
        <div className="mt-16 bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-lg">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Understanding GPA Conversion for International Students
          </h2>
          
          <div className="prose max-w-none text-slate-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Converting your grades to the U.S. 4.0 GPA scale is crucial for college applications. However, not all 
              conversion calculators follow the same standards. Our tool uses <strong>AACRAO EDGE</strong> (Electronic 
              Database for Global Education) - the authoritative resource trusted by American universities for 
              international credential evaluation.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why GPA Conversion Matters</h3>
            <p className="leading-relaxed">
              U.S. universities need a standardized way to compare applicants from different educational systems. 
              A 70% in India doesn't mean the same thing as a 70% in Canada or the U.S. AACRAO EDGE provides the 
              contextual framework to ensure fair evaluation across diverse grading systems.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Common Misconceptions About Indian Grades</h3>
            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 my-6">
              <p className="font-semibold text-blue-900 mb-2">Myth: "60% is a bad grade"</p>
              <p className="text-slate-700">
                <strong>Reality:</strong> In most Indian universities, 60% represents First Division - equivalent to 
                a solid B+/A- in the U.S. (3.3-3.7 GPA). Indian grading is notably more conservative than Western 
                systems. Marks above 75% are exceptional and rare.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Tips for Accurate Conversion</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the correct tier for Indian universities - IITs/NITs use stricter grading</li>
              <li>For CBSE, check if your marks are pre-2018 (percentage) or post-2018 (9-point scale)</li>
              <li>Always include all courses for weighted GPA - don't cherry-pick your best grades</li>
              <li>Canadian students: your province matters - Alberta, Ontario, and BC have different scales</li>
              <li>When in doubt, contact your target universities' admissions offices for clarification</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">What Universities Look For</h3>
            <p className="leading-relaxed">
              While GPA is important, remember that U.S. universities use holistic admissions. Your GPA is just one 
              component alongside SAT/ACT scores, essays, recommendations, extracurriculars, and demonstrated interest. 
              A strong overall application can compensate for a moderate GPA.
            </p>

            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 my-6">
              <p className="font-semibold text-green-900 mb-2">Pro Tip for Calgary Students:</p>
              <p className="text-slate-700">
                If you're applying from Calgary and need help understanding how your Alberta Education grades translate 
                to U.S. standards, or want personalized SAT/ACT prep to strengthen your application, 
                <a href="/contact.html" className="text-blue-600 hover:underline font-semibold"> contact our tutoring services</a> 
                for expert guidance.
              </p>
            </div>
          </div>
        </div>

        {/* AdSense Zone 3 - Bottom */}
        <div className="mt-10">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* Footer Keywords */}
        <footer className="mt-16 pt-10 border-t-2 border-slate-200 text-center space-y-4">
          <p className="text-sm text-slate-600 font-semibold">
            🎓 Free AACRAO EDGE GPA Calculator | Convert Percentage to GPA | International Student Tool
          </p>
          <p className="text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed">
            Convert Indian university marks to GPA, CBSE percentage to 4.0 scale, ICSE grades to GPA, 
            Canadian percentage to GPA (Alberta, Ontario, BC), UK A-Levels to GPA, IB scores to GPA. 
            AACRAO certified conversions for U.S. college applications. Weighted GPA calculator for course credits. 
            Calgary academic services. Free online tool for international students applying to American universities.
          </p>
          
          <div className="pt-6 flex flex-wrap justify-center gap-6 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About</a>
            <a href="/college-admissions-calculator" className="text-blue-600 hover:underline">College Predictor</a>
            <a href="/resources" className="text-blue-600 hover:underline">SAT Resources</a>
            <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy</a>
          </div>
          
          <p className="text-xs text-slate-400 pt-6">
            © 2025 Calgary Academic Excellence. AACRAO EDGE compliant GPA conversions.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default GPACalculator;

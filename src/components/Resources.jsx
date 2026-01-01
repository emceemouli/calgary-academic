import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  BookOpen, Brain, Download, Calculator, GraduationCap, 
  Calendar, CheckCircle, Target, Book, ExternalLink, Award,
  TrendingUp, Zap, Globe, Video, FileText, Users, ChevronDown, ChevronUp
} from 'lucide-react';

// SEO Effect Hook with Enhanced Meta Tags
const useSEO = () => {
  useEffect(() => {
    document.title = 'Free Digital SAT Resources 2025 - Khan Academy, Study Materials & Practice Tests | Calgary';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Access the best free Digital SAT resources including Khan Academy official prep, College Board practice tests, study plans, and expert materials. Proven 210+ point improvements. Complete SAT preparation guide for Calgary students.'
      );
    }

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = 'free SAT resources, Khan Academy SAT, Digital SAT prep, SAT practice tests, College Board SAT, SAT study plan, SAT materials Calgary, free SAT prep 2025, best SAT resources, SAT math practice, SAT reading practice, official SAT resources';

    // Schema Markup
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Free Digital SAT Resources & Study Materials",
        "description": "Comprehensive collection of free SAT preparation resources including Khan Academy, College Board materials, practice tests, and study plans",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Calgary Academic Excellence"
        }
      }
    ];

    schemas.forEach((schema, index) => {
      let scriptTag = document.querySelector(`#resources-schema-${index}`);
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = `resources-schema-${index}`;
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
};

// Resource Card Component
const ResourceCard = ({ resource, icon: Icon, isPremium = false }) => (
  <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-100 h-full flex flex-col">
    <CardHeader className={`${isPremium ? 'bg-gradient-to-r from-purple-50 to-blue-50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 ${isPremium ? 'bg-purple-100' : 'bg-blue-100'} rounded-xl`}>
            <Icon className={`h-6 w-6 ${isPremium ? 'text-purple-600' : 'text-blue-600'}`} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">{resource.title}</CardTitle>
            {isPremium && <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full font-semibold">OFFICIAL</span>}
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-6 flex-grow flex flex-col justify-between">
      <div>
        <p className="text-gray-700 mb-4 leading-relaxed">{resource.description}</p>
        <div className="space-y-2 mb-4">
          {resource.features?.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => window.open(resource.link, '_blank')}
        className={`w-full ${isPremium ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white flex items-center justify-center gap-2`}
      >
        <ExternalLink className="h-4 w-4" />
        {resource.buttonText || 'Access Resource'}
      </Button>
    </CardContent>
  </Card>
);

// Weekly Schedule Component (from original)
const WeeklySchedule = ({ week, content }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
      <Calendar className="h-5 w-5 mr-2 text-blue-600" />
      Week {week} Schedule
    </h3>
    <div className="grid gap-4">
      {Object.entries(content).map(([day, activities]) => (
        <div key={day} className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200">
          <h4 className="font-medium text-gray-900 mb-2">{day}</h4>
          <ul className="space-y-2">
            {activities.map((activity, index) => (
              <li key={index} className="text-gray-700 flex items-start group">
                <CheckCircle className="h-5 w-5 mr-2 mt-1 text-green-500 flex-shrink-0 group-hover:text-green-600 transition-colors duration-200" />
                <span className="group-hover:text-gray-900 transition-colors duration-200">{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-600">
        * Adjust this schedule based on your personal commitments and learning pace. Each day includes approximately 2-3 hours of study time.
      </p>
    </div>
  </div>
);

// Score Tracker Component (from original)
const ScoreTracker = () => {
  const [scores, setScores] = useState({ initial: '', target: '' });
  const [progress, setProgress] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScores(prev => ({ ...prev, [name]: value }));
  };

  const calculateProgress = () => {
    if (!scores.initial || !scores.target) {
      alert("Please enter both scores");
      return;
    }

    const initial = parseInt(scores.initial);
    const target = parseInt(scores.target);

    if (initial < 400 || initial > 1600 || target < 400 || target > 1600) {
      alert("SAT scores must be between 400 and 1600");
      return;
    }

    if (target <= initial) {
      alert("Target score must be higher than initial score");
      return;
    }

    const improvement = target - initial;
    const percentage = ((improvement / initial) * 100).toFixed(1);
    
    setProgress({ pointsNeeded: improvement, percentage: percentage });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-2 border-purple-100">
      <h3 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-purple-600" />
        Score Progress Tracker
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Initial Practice Test Score</label>
          <input 
            type="number" 
            name="initial"
            value={scores.initial}
            onChange={handleInputChange}
            className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition" 
            placeholder="Enter your score (400-1600)" 
            min="400"
            max="1600"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Target Score</label>
          <input 
            type="number" 
            name="target"
            value={scores.target}
            onChange={handleInputChange}
            className="border-2 border-gray-200 rounded-xl p-3 w-full focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition" 
            placeholder="Enter target score (400-1600)" 
            min="400"
            max="1600"
          />
        </div>
        <Button 
          onClick={calculateProgress}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
        >
          Calculate Progress
        </Button>

        {progress && (
          <div className="mt-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3 text-lg">Your Goal:</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Points Needed</p>
                <p className="text-3xl font-bold text-purple-600">{progress.pointsNeeded}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Improvement</p>
                <p className="text-3xl font-bold text-blue-600">{progress.percentage}%</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Our students typically achieve 150-200 point improvements through our comprehensive program.
            </p>
            {progress.pointsNeeded > 200 && (
              <p className="mt-3 text-sm text-amber-700 font-medium bg-amber-50 p-3 rounded-lg">
                ⚠️ For improvements over 200 points, we recommend our intensive preparation program with additional practice sessions.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Resources = () => {
  useSEO();
  
  const [activeSection, setActiveSection] = useState('official');
  const [selectedWeek, setSelectedWeek] = useState('week1');

  // Official & Best Free Resources
  const officialResources = [
    {
      title: "Khan Academy SAT Prep",
      description: "Official SAT practice partner offering personalized study plans, full-length practice tests, and thousands of practice questions. 100% free and created in partnership with College Board.",
      features: [
        "Official College Board partnership",
        "Personalized practice recommendations",
        "8 full-length practice tests",
        "Unlimited skill practice",
        "Progress tracking & analytics",
        "Video lessons for every topic"
      ],
      link: "https://www.khanacademy.org/digital-sat/start",
      buttonText: "Start Free Practice",
      icon: Award
    },
    {
      title: "College Board Official Practice",
      description: "The creators of the SAT provide official practice tests, sample questions, and study tools. Get the most accurate practice experience directly from the source.",
      features: [
        "8 official practice tests",
        "Official question bank",
        "Score reports & analysis",
        "Test-day strategies",
        "Digital SAT Bluebook app",
        "Free daily practice app"
      ],
      link: "https://satsuite.collegeboard.org/digital/digital-practice-preparation",
      buttonText: "Access College Board",
      icon: GraduationCap
    },
    {
      title: "Official Digital SAT Bluebook",
      description: "Download the official testing application to experience the actual Digital SAT format. Practice in the same environment you'll use on test day.",
      features: [
        "Actual test interface",
        "Built-in calculator & tools",
        "Timed practice sections",
        "Offline capability",
        "Score estimates",
        "Full-length exams"
      ],
      link: "https://bluebook.app.collegeboard.org/",
      buttonText: "Download Bluebook",
      icon: Brain
    }
  ];

  // Additional Free Resources
  const freeResources = [
    {
      title: "Desmos Calculator Practice",
      description: "Master the official SAT calculator. Practice using Desmos Graphing Calculator - the same calculator available during the Digital SAT Math sections.",
      features: [
        "Official SAT calculator",
        "Graphing capabilities",
        "Practice worksheets",
        "Tutorial videos"
      ],
      link: "https://www.desmos.com/calculator",
      buttonText: "Practice Calculator"
    },
    {
      title: "1600.io Free Resources",
      description: "High-quality free SAT prep materials including video walkthroughs of official practice tests and strategy guides from SAT experts.",
      features: [
        "Video explanations",
        "Strategy guides",
        "Practice problems",
        "Expert tips"
      ],
      link: "https://www.1600.io/p/free-digital-sat-resources",
      buttonText: "Access 1600.io"
    },
    {
      title: "Magoosh SAT Blog",
      description: "Comprehensive study guides, tips, strategies, and practice questions. One of the most comprehensive free SAT resources available online.",
      features: [
        "Study strategies",
        "Practice questions",
        "Video lessons",
        "Study schedules"
      ],
      link: "https://magoosh.com/sat/",
      buttonText: "Visit Magoosh"
    },
    {
      title: "PrepScholar SAT Blog",
      description: "In-depth guides covering every SAT topic, test-taking strategies, and comprehensive study plans from SAT perfect scorers.",
      features: [
        "Complete topic guides",
        "Strategy articles",
        "Score improvement tips",
        "Study plans"
      ],
      link: "https://blog.prepscholar.com/sat",
      buttonText: "Read Guides"
    }
  ];

  // PDF Resources from original code
  const pdfResources = [
    {
      title: "Digital SAT Overview & Structure",
      description: "Complete breakdown of the Digital SAT format and scoring",
      topics: ["Test Format", "Scoring System", "Section Breakdown", "Calgary Preparation"],
      downloadLink: "/resources/pdfs/digital-sat-overview.pdf"
    },
    {
      title: "8-Week Digital SAT Study Plan",
      description: "Comprehensive study plan aligned with College Board guidelines",
      topics: ["Weekly Schedule", "Practice Tests", "Score Tracking"],
      downloadLink: "/resources/pdfs/study-plan.pdf"
    },
    {
      title: "Digital SAT Math Fundamentals",
      description: "Essential mathematical concepts and practice problems",
      topics: ["Algebra", "Geometry", "Problem Solving", "Calculator Skills"],
      downloadLink: "/resources/pdfs/SATSuiteQuestionBankAlgebra-Results.pdf"
    },
    {
      title: "Reading & Writing Guide",
      description: "Comprehensive strategies for verbal sections",
      topics: ["Reading Comprehension", "Writing & Language", "Vocabulary"],
      downloadLink: "/resources/pdfs/verbal-guide.pdf"
    },
    {
      title: "Practice Test Materials",
      description: "Full-length practice tests and section-specific drills",
      topics: ["Full Tests", "Section Practice", "Timed Drills", "Performance Analytics"],
      downloadLink: "/resources/pdfs/sat-practice-test-1-digital.pdf"
    },
    {
      title: "Essential Test-Taking Strategies",
      description: "Expert techniques for maximizing your Digital SAT score",
      topics: ["Time Management", "Question Approach", "Stress Management", "Digital Tools"],
      downloadLink: "/resources/pdfs/test-strategies.pdf"
    }
  ];

  // Weekly schedules from original code
  const weeklySchedules = {
    week1: {
      "Monday": ["Take initial Digital SAT practice test", "Create study plan calendar"],
      "Tuesday": ["Review test format in detail", "Learn Digital SAT question types"],
      "Wednesday": ["Analyze practice test results", "Identify weak areas"],
      "Thursday": ["Math foundations: Algebra basics", "Reading: Main idea practice"],
      "Friday": ["Writing conventions review", "Practice math problem solving"],
      "Weekend": ["Review week 1 materials", "Complete homework assignments"]
    },
    week2: {
      "Monday": ["Advanced algebra concepts", "Reading strategies practice"],
      "Tuesday": ["Grammar rules deep dive", "Vocabulary building"],
      "Wednesday": ["Geometry foundations", "Evidence analysis practice"],
      "Thursday": ["Problem solving strategies", "Practice test sections"],
      "Friday": ["Mini practice test", "Review answers in detail"],
      "Weekend": ["Full-length practice test", "Error analysis"]
    },
    week3: {
      "Monday": ["Advanced math concepts", "Complex reading passages"],
      "Tuesday": ["Data interpretation", "Vocabulary in context"],
      "Wednesday": ["Writing style & expression", "Math word problems"],
      "Thursday": ["Reading paired passages", "Advanced math practice"],
      "Friday": ["Timed section practice", "Review strategies"],
      "Weekend": ["Mock test simulation", "Comprehensive review"]
    },
    week4: {
      "Monday": ["Statistics & probability", "Author's purpose practice"],
      "Tuesday": ["Advanced geometry", "Writing revision skills"],
      "Wednesday": ["Graph & chart analysis", "Reading inference questions"],
      "Thursday": ["Math formula review", "Grammar rules practice"],
      "Friday": ["Full practice test", "Score analysis"],
      "Weekend": ["Review weak areas", "Strategy refinement"]
    }
  };

  // Navigation items
  const navigationItems = [
    { id: 'official', label: 'Official Resources', icon: <Award className="h-5 w-5" /> },
    { id: 'free', label: 'Free Study Tools', icon: <Globe className="h-5 w-5" /> },
    { id: 'study-plan', label: 'Study Plan', icon: <Calendar className="h-5 w-5" /> },
    { id: 'downloads', label: 'PDF Downloads', icon: <Download className="h-5 w-5" /> },
    { id: 'gpa', label: 'GPA Calculator', icon: <Calculator className="h-5 w-5" />, external: true, path: '/gpa-calculator' }
  ];

  return (
    <div className="min-h-screen bg-gray-50" itemScope itemType="https://schema.org/EducationalOrganization">
      {/* Hero Section */}
      <header className="relative h-[300px] pt-16" role="banner">
        <img
          src="/images/Teen-Area-12-23-Hero.jpg"
          alt="Digital SAT Resources Hero"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4 w-fit">
            <Zap className="h-4 w-4" />
            <span>100% Free Resources • Khan Academy Official Partner</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" itemProp="name">
            Free Digital SAT Resources & Study Materials
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-3xl leading-relaxed" itemProp="description">
            Access the best free SAT prep resources including Khan Academy official practice, College Board materials, comprehensive study plans, and expert strategies. Everything you need for SAT success.
          </p>
        </div>
      </header>

      {/* AdSense Zone 1 - Top */}
      <div className="container mx-auto px-4 py-6 max-w-[1200px]">
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-7638771792216412"
             data-ad-slot="5362613714"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8 max-w-[1200px]" itemProp="mainContentOfPage">
        {/* Navigation Buttons */}
        <nav className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-gray-200" aria-label="Resource sections">
          {navigationItems.map(item => (
            <Button 
              key={item.id} 
              variant={activeSection === item.id ? 'default' : 'outline'} 
              onClick={() => {
                if (item.external) {
                  window.location.href = item.path;
                } else {
                  setActiveSection(item.id);
                }
              }}
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={`flex items-center gap-2 px-4 py-2 text-base rounded-xl ${
                activeSection === item.id 
                  ? 'text-white bg-blue-600 shadow-lg' 
                  : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {item.icon}<span>{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Official Resources Section */}
        {activeSection === 'official' && (
          <section className="space-y-6" aria-label="Official SAT Resources">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Award className="h-6 w-6 text-blue-600" />
                Official SAT Resources - Start Here!
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These are the official resources directly from College Board and their partners. They provide the most accurate practice experience and are completely free.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officialResources.map((resource, index) => (
                <ResourceCard 
                  key={index} 
                  resource={resource} 
                  icon={resource.icon}
                  isPremium={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Free Resources Section */}
        {activeSection === 'free' && (
          <section className="space-y-6" aria-label="Free SAT Study Tools">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-200 mb-8">
              <h2 className="text-2xl font-bold text-green-900 mb-3 flex items-center gap-2">
                <Globe className="h-6 w-6 text-green-600" />
                Additional Free SAT Study Tools
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Supplement your official practice with these high-quality free resources from SAT experts and educators.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {freeResources.map((resource, index) => (
                <ResourceCard 
                  key={index} 
                  resource={resource} 
                  icon={BookOpen}
                />
              ))}
            </div>

            {/* Score Tracker */}
            <div className="mt-8">
              <ScoreTracker />
            </div>
          </section>
        )}

        {/* Study Plan Section */}
        {activeSection === 'study-plan' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
              <h2 className="text-2xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-purple-600" />
                8-Week Digital SAT Study Plan
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Follow this comprehensive week-by-week study schedule to maximize your SAT score improvement.
              </p>
            </div>

            <div className="flex gap-4 mb-4 flex-wrap">
              {Object.keys(weeklySchedules).map((week) => (
                <Button
                  key={week}
                  variant={selectedWeek === week ? 'default' : 'outline'}
                  onClick={() => setSelectedWeek(week)}
                  className="text-sm"
                >
                  Week {week.replace('week', '')}
                </Button>
              ))}
            </div>
            
            <WeeklySchedule 
              week={selectedWeek.replace('week', '')} 
              content={weeklySchedules[selectedWeek]} 
            />

            <div className="mt-8">
              <ScoreTracker />
            </div>
          </section>
        )}

        {/* Downloads Section */}
        {activeSection === 'downloads' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl border-2 border-orange-200 mb-8">
              <h2 className="text-2xl font-bold text-orange-900 mb-3 flex items-center gap-2">
                <Download className="h-6 w-6 text-orange-600" />
                Downloadable SAT Study Materials
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Download our comprehensive PDF study guides, practice tests, and strategy documents for offline study.
              </p>
            </div>

            {pdfResources.map((resource, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-white border-b border-gray-100">
                  <CardTitle className="text-xl sm:text-2xl text-blue-900 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    <span>{resource.title}</span>
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{resource.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.topics.map((topic, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-full text-sm font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => window.open(resource.downloadLink, '_blank')}
                    >
                      <Download className="h-5 w-5" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}

        {/* AdSense Zone 2 - Middle */}
        <div className="my-10">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Complete Guide to Free SAT Resources
          </h2>
          
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              Preparing for the Digital SAT doesn't have to be expensive. With the right free resources, you can achieve excellent scores without spending hundreds or thousands of dollars on prep courses. This comprehensive guide brings together the best free SAT resources available in 2025.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why These Free Resources Are Excellent</h3>
            <p className="leading-relaxed">
              Khan Academy's partnership with College Board makes it the gold standard for free SAT prep. Their personalized learning system adapts to your skill level and provides unlimited practice. Combined with official College Board materials and supplementary resources like 1600.io and Magoosh, you have everything needed for comprehensive preparation.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Use These Resources Effectively</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Start with an official practice test to establish your baseline score</li>
              <li>Create a Khan Academy account and link it to College Board for personalized recommendations</li>
              <li>Follow the 8-week study plan, dedicating 2-3 hours daily to focused practice</li>
              <li>Take full-length practice tests every 2-3 weeks to track progress</li>
              <li>Use supplementary resources like 1600.io for detailed explanations of difficult problems</li>
              <li>Practice with the Desmos calculator to become comfortable with the digital testing tools</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Makes Calgary Academic Excellence Different</h3>
            <p className="leading-relaxed">
              While these free resources are excellent, personalized guidance can accelerate your progress. Our Calgary-based SAT prep program combines these free resources with expert instruction, accountability, and strategies refined over years of helping students achieve 210+ point improvements. We teach you how to maximize these free tools while providing the structure and motivation that self-study often lacks.
            </p>

            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 my-6">
              <p className="font-semibold text-green-900 mb-2">Ready to Take Your Prep to the Next Level?</p>
              <p className="text-gray-700">
                Contact Calgary Academic Excellence for personalized SAT tutoring that complements these free resources. 
                <a href="/contact" className="text-blue-600 hover:underline font-semibold ml-1">Schedule a free consultation →</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* AdSense Zone 3 - Bottom */}
      <div className="container mx-auto px-4 py-6 max-w-[1200px]">
        <ins className="adsbygoogle"
             style={{display:'block'}}
             data-ad-client="ca-pub-7638771792216412"
             data-ad-slot="5362613714"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            🎓 Free SAT Resources 2025 | Khan Academy Official | College Board Practice Tests
          </p>
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Access the best free Digital SAT resources including Khan Academy official prep (College Board partner), official practice tests, study plans, and expert materials. All resources are 100% free and updated for the 2025 Digital SAT format.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm mt-6">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/about" className="text-blue-600 hover:underline">About</a>
            <a href="/college-admissions-calculator" className="text-blue-600 hover:underline">College Predictor</a>
            <a href="/gpa-calculator" className="text-blue-600 hover:underline">GPA Calculator</a>
            <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
          </div>
          <p className="text-gray-600 text-center mt-6" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Calgary</span>, <span itemProp="addressRegion">Alberta</span>
          </p>
          <p className="text-gray-600 text-center">
            © {new Date().getFullYear()} Calgary Academic Excellence. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Resources;

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  BookOpen, Brain, Download, Calculator, GraduationCap, 
  Calendar, CheckCircle, Target, Book 
} from 'lucide-react';

// SEO Effect Hook
const useSEO = () => {
  useEffect(() => {
    document.title = 'Digital SAT Resources & Study Materials | Calgary Academic Excellence';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Access comprehensive Digital SAT study materials with proven 210+ point improvements. Expert-curated content with proven study plans for SAT preparation in Calgary.'
      );
    }
  }, []);
};
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
const ScoreTracker = () => {
  const [scores, setScores] = useState({
    initial: '',
    target: '',
  });
  const [progress, setProgress] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScores(prev => ({
      ...prev,
      [name]: value
    }));
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
    
    setProgress({
      pointsNeeded: improvement,
      percentage: percentage
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">Score Progress Tracker</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Initial Practice Test Score</label>
          <input 
            type="number" 
            name="initial"
            value={scores.initial}
            onChange={handleInputChange}
            className="border rounded p-2 w-full" 
            placeholder="Enter your score (400-1600)" 
            min="400"
            max="1600"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Target Score</label>
          <input 
            type="number" 
            name="target"
            value={scores.target}
            onChange={handleInputChange}
            className="border rounded p-2 w-full" 
            placeholder="Enter target score (400-1600)" 
            min="400"
            max="1600"
          />
        </div>
        <Button 
          onClick={calculateProgress}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Calculate Progress
        </Button>

        {progress && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Your Goal:</h4>
            <p className="text-gray-700">Points needed: <span className="font-bold text-blue-600">{progress.pointsNeeded}</span></p>
            <p className="text-gray-700">Score improvement: <span className="font-bold text-blue-600">{progress.percentage}%</span></p>
            <p className="mt-2 text-sm text-gray-600">
              Our students typically achieve 150-200 point improvements through our comprehensive program.
            </p>
            {progress.pointsNeeded > 200 && (
              <p className="mt-2 text-sm text-amber-600 font-medium">
                For improvements over 200 points, we recommend our intensive preparation program with additional practice sessions.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const Resources = () => {
  // Use SEO hook
  useSEO();
  
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedWeek, setSelectedWeek] = useState('week1');

  // ✅ UPDATED: Added GPA Calculator to navigation
  const navigationItems = [
    { id: 'overview', label: 'SAT Overview', icon: <Book className="h-5 w-5" /> },
    { id: 'studyPlan', label: 'Study Plan', icon: <Calendar className="h-5 w-5" /> },
    { id: 'math', label: 'Mathematics', icon: <Calculator className="h-5 w-5" /> },
    { id: 'verbal', label: 'Reading & Writing', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'practice', label: 'Practice Tests', icon: <Brain className="h-5 w-5" /> },
    { id: 'strategies', label: 'Test Strategies', icon: <Target className="h-5 w-5" /> },
    { id: 'gpa', label: 'GPA Calculator', icon: <Calculator className="h-5 w-5" />, external: true, path: '/gpa-calculator' }
  ];

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
  const educationalContent = {
    overview: [{
      title: "Digital SAT Overview & Structure",
      description: "Complete breakdown of the Digital SAT format and scoring",
      topics: ["Test Format", "Scoring System", "Section Breakdown", "Calgary Preparation"],
      previewContent: [
        "*Test Structure:*",
        "• Adaptive testing format with Calgary-specific preparation strategies",
        "• 2 hours and 14 minutes total duration",
        "• Reading and Writing: 54 questions in 64 minutes",
        "• Math: 44 questions in 70 minutes",
        "",
        "*Scoring Details:*",
        "• Score range: 400-1600",
        "• Reading/Writing: 200-800 points",
        "• Math: 200-800 points",
        "• Our students achieve 210+ point improvements",
        "",
        "*Key Features:*",
        "• Shorter test duration",
        "• Faster score reporting",
        "• Built-in calculator for Math",
        "• Digital tools and references",
        "• Calgary-specific preparation techniques"
      ],
      downloadLink: "/resources/pdfs/digital-sat-overview.pdf"
    }],
    studyPlan: [{
      title: "8-Week Digital SAT Study Plan",
      description: "Comprehensive study plan aligned with College Board guidelines",
      topics: ["Weekly Schedule", "Practice Tests", "Score Tracking"],
      previewContent: [
        "*Phase 1: Foundation Building*",
        "Initial assessment and core concept review",
        "",
        "*Phase 2: Skill Development*",
        "• Focused practice on each section",
        "• Weekly mini-tests",
        "• Detailed analysis of mistakes",
        "",
        "*Phase 3: Practice & Review*",
        "• Full-length practice tests",
        "• Timed section practice",
        "• Strategy refinement"
      ],
      downloadLink: "/resources/pdfs/study-plan.pdf",
      additionalContent: (
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Weekly Schedule</h3>
            <div className="space-y-4">
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
            </div>
          </div>
          <ScoreTracker />
        </div>
      )
    }],
    math: [{
      title: "Digital SAT Math Fundamentals",
      description: "Essential mathematical concepts and practice problems",
      topics: ["Algebra", "Geometry", "Problem Solving", "Calculator Skills"],
      previewContent: [
        "*Core Math Topics:*",
        "• Linear equations and inequalities",
        "• Quadratic expressions and equations",
        "• Word problems and applications",
        "• Geometry and trigonometry",
        "",
        "*Calculator Section:*",
        "• Built-in Desmos calculator features",
        "• Graphing capabilities",
        "• Statistical analysis tools",
        "",
        "*Practice Strategies:*",
        "• Time management techniques",
        "• Calculator vs. non-calculator approaches",
        "• Error analysis methods",
        "• Common pitfall avoidance"
      ],
      downloadLink: "/resources/pdfs/SATSuiteQuestionBankAlgebra-Results.pdf"
    }],
    verbal: [{
      title: "Reading & Writing Guide",
      description: "Comprehensive strategies for verbal sections",
      topics: ["Reading Comprehension", "Writing & Language", "Vocabulary"],
      previewContent: [
        "*Reading Strategies:*",
        "• Main idea identification",
        "• Evidence analysis",
        "• Author's purpose",
        "• Inference questions",
        "",
        "*Writing Focus:*",
        "• Grammar fundamentals",
        "• Expression of ideas",
        "• Style and tone",
        "• Revision skills",
        "",
        "*Digital Format Tips:*",
        "• Screen reading techniques",
        "• Split screen navigation",
        "• Highlighting and annotation tools"
      ],
      downloadLink: "/resources/pdfs/verbal-guide.pdf"
    }],
    practice: [{
      title: "Practice Test Materials",
      description: "Full-length practice tests and section-specific drills",
      topics: ["Full Tests", "Section Practice", "Timed Drills", "Performance Analytics"],
      previewContent: [
        "*Available Materials:*",
        "• 4 full-length digital practice tests",
        "• Section-specific question banks",
        "• Detailed answer explanations",
        "• Performance tracking tools",
        "",
        "*Practice Tips:*",
        "• Simulate test conditions",
        "• Time management strategies",
        "• Review techniques",
        "• Error analysis methods",
        "",
        "*Digital Testing Features:*",
        "• Online testing interface",
        "• Timer and progress tracking",
        "• Built-in calculator practice",
        "• Score reporting system"
      ],
      downloadLink: "/resources/pdfs/sat-practice-test-1-digital.pdf"
    }],
    strategies: [{
      title: "Essential Test-Taking Strategies",
      description: "Expert techniques for maximizing your Digital SAT score",
      topics: ["Time Management", "Question Approach", "Stress Management", "Digital Tools"],
      previewContent: [
        "*General Strategies:*",
        "• Answer every question (no penalty for wrong answers)",
        "• Use process of elimination effectively",
        "• Manage your pace with the built-in timer",
        "",
        "*Section-Specific Approaches:*",
        "• Reading: Preview questions first",
        "• Writing: Focus on grammar rules",
        "• Math: Utilize the embedded calculator effectively",
        "",
        "*Test Day Preparation:*",
        "• Practice with digital format",
        "• Familiarize with tools and interface",
        "• Review technical requirements",
        "",
        "*Mental Preparation:*",
        "• Stress management techniques",
        "• Time management strategies",
        "• Focus and concentration tips"
      ],
      downloadLink: "/resources/pdfs/test-strategies.pdf"
    }]
  };
  return (
    <div className="min-h-screen bg-gray-50" itemScope itemType="https://schema.org/EducationalOrganization">
      {/* Hero Section */}
      <header className="relative h-[250px] pt-16" role="banner">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" itemProp="name">
            Digital SAT Study Resources
          </h1>
          <p className="text-lg md:text-xl text-white mb-6 max-w-xl" itemProp="description">
            Access comprehensive study materials, practice tests, and expert guides.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8 max-w-[1200px]" itemProp="mainContentOfPage">
        {/* Navigation Buttons */}
        {/* ✅ UPDATED: Modified onClick to handle external links */}
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
              className={`flex items-center gap-2 px-4 py-2 text-base ${
                activeSection === item.id 
                  ? 'text-white bg-blue-600' 
                  : 'text-gray-900 hover:text-blue-600'
              }`}
            >
              {item.icon}<span>{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Content Cards */}
        <section className="space-y-8" aria-label="Educational Resources">
          {educationalContent[activeSection].map((resource, index) => (
            <article 
              key={index} 
              className="overflow-hidden"
              itemScope 
              itemType="https://schema.org/LearningResource"
            >
              <Card>
                <CardHeader className="bg-white border-b border-gray-100">
                  <CardTitle className="text-xl sm:text-2xl text-blue-900 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    <span itemProp="name">{resource.title}</span>
                  </CardTitle>
                  <p className="text-gray-600 mt-2" itemProp="description">{resource.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.topics.map((topic, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-full text-sm font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg text-gray-900" itemProp="text">
                    {resource.previewContent.map((line, i) => (
                      <p key={i} className="mb-3 last:mb-0">
                        {line.startsWith('*') ? (
                          <strong className="text-blue-900">
                            {line.replace(/\*/g, '')}
                          </strong>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4">
                    <Button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700">
                      Start Learning
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        window.open(resource.downloadLink, '_blank');
                      }}
                    >
                      <Download className="h-5 w-5" />
                      Download PDF
                    </Button>
                  </div>
                  {resource.additionalContent}
                </CardContent>
              </Card>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-center" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Calgary</span>, 
            <span itemProp="addressRegion">Alberta</span>
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

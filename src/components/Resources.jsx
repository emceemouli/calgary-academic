import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  BookOpen, Brain, Download, Calculator, GraduationCap, 
  Calendar, CheckCircle, Target, Book, Video, Wrench,
  ExternalLink, Award, TrendingUp, Clock
} from 'lucide-react';

// SEO Effect Hook
const useSEO = () => {
  useEffect(() => {
    document.title = 'Free Digital SAT Resources 2025 - Study Materials & Practice Tests';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free Digital SAT study resources 2025. Khan Academy, College Board Bluebook, practice tests, video lessons, and study guides. Everything you need to ace the SAT.'
      );
    }
  }, []);
};

// Study Time Tracker Component
const StudyTimeTracker = () => {
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [studyGoal, setStudyGoal] = useState(10);
  const [daysStudied, setDaysStudied] = useState(0);

  const progress = (weeklyHours / studyGoal) * 100;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Clock className="h-6 w-6 text-purple-600" />
          Weekly Study Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Study Hours This Week</span>
              <span className="text-sm font-bold text-purple-600">{weeklyHours} / {studyGoal} hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Studied
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weekly Goal
              </label>
              <input
                type="number"
                min="1"
                value={studyGoal}
                onChange={(e) => setStudyGoal(parseInt(e.target.value) || 10)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Days Studied This Week: {daysStudied}/7
            </label>
            <input
              type="range"
              min="0"
              max="7"
              value={daysStudied}
              onChange={(e) => setDaysStudied(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {progress >= 100 && (
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-800 font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Excellent! You've hit your weekly goal! 🎉
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Score Tracker Component
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
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          Score Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Initial Practice Test Score</label>
            <input 
              type="number" 
              name="initial"
              value={scores.initial}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              placeholder="Enter your score (400-1600)" 
              min="400"
              max="1600"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Target Score</label>
            <input 
              type="number" 
              name="target"
              value={scores.target}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              placeholder="Enter target score (400-1600)" 
              min="400"
              max="1600"
            />
          </div>
          <Button 
            onClick={calculateProgress}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
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
      </CardContent>
    </Card>
  );
};

const Resources = () => {
  useSEO();
  
  const [activeSection, setActiveSection] = useState('official');

  // Define navigation items
  const navigationItems = [
    { id: 'official', label: 'Official Resources', icon: <Award className="h-5 w-5" /> },
    { id: 'video', label: 'Video Lessons', icon: <Video className="h-5 w-5" /> },
    { id: 'tools', label: 'Study Tools', icon: <Wrench className="h-5 w-5" /> },
    { id: 'studyPlan', label: '8-Week Plan', icon: <Calendar className="h-5 w-5" /> },
    { id: 'downloads', label: 'Downloads', icon: <Download className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - NO YELLOW HIGHLIGHTS */}
      <header className="relative min-h-[350px] pt-16 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free Digital SAT Resources 2025
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Everything you need to ace the Digital SAT - completely free. Khan Academy + Bluebook is all you need!
          </p>
          
          {/* Stats Grid - CLEAN, NO HIGHLIGHTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/90">Free Resources</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">1000+</div>
              <div className="text-sm text-white/90">Practice Questions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">8</div>
              <div className="text-sm text-white/90">Week Study Plan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-1">210+</div>
              <div className="text-sm text-white/90">Avg. Improvement</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* FIXED NAVIGATION: Visible tabs with proper contrast */}
        <nav className="flex flex-wrap justify-center gap-3 mb-12 pb-6 border-b-2 border-gray-200" aria-label="Resource sections">
          {navigationItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 px-6 py-3 text-base font-bold rounded-xl transition-all duration-200 ${
                activeSection === item.id 
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-900 border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 shadow-sm'
              }`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* AdSense Zone 1 - Top */}
        <div className="mb-10">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* SECTION: Official Resources */}
        {activeSection === 'official' && (
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Official Free Resources</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Start here! These are the OFFICIAL, completely FREE resources from College Board and Khan Academy. This is all you truly need to achieve an excellent score.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Khan Academy - NO YELLOW HIGHLIGHTS */}
              <Card className="border-2 border-green-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50 relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Recommended
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <GraduationCap className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">Khan Academy Digital SAT</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">Official FREE Personalized Practice</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The BEST free resource for Digital SAT prep. Created in partnership with College Board, offering personalized practice based on your PSAT scores or diagnostic results.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2 ml-7">
                        <li className="text-gray-700">• Unlimited FREE practice questions</li>
                        <li className="text-gray-700">• Personalized study plan based on your weaknesses</li>
                        <li className="text-gray-700">• Official questions from College Board</li>
                        <li className="text-gray-700">• Detailed explanations for every answer</li>
                        <li className="text-gray-700">• Tracks your progress over time</li>
                      </ul>
                    </div>
                  </div>

                  <a 
                    href="https://www.khanacademy.org/test-prep/digital-sat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full justify-center"
                  >
                    Start Free Practice
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardContent>
              </Card>

              {/* College Board Bluebook */}
              <Card className="border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-blue-50 to-sky-50 relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Recommended
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Book className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">College Board Bluebook App</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">Official Digital SAT Testing Platform</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The OFFICIAL app where you'll take the actual Digital SAT. Practice with the exact same interface, tools, and format you'll see on test day.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2 ml-7">
                        <li className="text-gray-700">• Exact test-day interface and experience</li>
                        <li className="text-gray-700">• Built-in Desmos calculator for Math section</li>
                        <li className="text-gray-700">• Full-length official practice tests</li>
                        <li className="text-gray-700">• Works on desktop, laptop, and tablets</li>
                        <li className="text-gray-700">• Highlighting and annotation tools</li>
                      </ul>
                    </div>
                  </div>

                  <a 
                    href="https://bluebook.collegeboard.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full justify-center"
                  >
                    Download Bluebook
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Why These Two Are Enough */}
            <Card className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                  Why Khan Academy + Bluebook Is All You Need
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">✅ Official Content</h4>
                    <p>Made by College Board - the exact organization that creates the SAT. No guesswork!</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">✅ Completely Free</h4>
                    <p>$0 cost. No subscriptions, no hidden fees. Just quality, official practice materials.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">✅ Personalized Learning</h4>
                    <p>Khan Academy adapts to YOUR weaknesses, focusing your study time where you need it most.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">✅ Proven Results</h4>
                    <p>Students using Khan Academy for 20+ hours see average improvements of 115 points.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* SECTION: Video Lessons */}
        {activeSection === 'video' && (
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Free Video Lessons</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Learn from expert instructors with thousands of free video lessons covering every Digital SAT topic.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Khan Academy Videos */}
              <Card className="border-2 border-red-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-red-50 to-pink-50 relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Recommended
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-red-100 p-3 rounded-xl">
                      <Video className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">Khan Academy SAT Videos</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">FREE Comprehensive Video Lessons</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Thousands of free video lessons covering every topic on the Digital SAT. Clear explanations from expert instructors.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2 ml-7">
                        <li className="text-gray-700">• Organized by topic and difficulty</li>
                        <li className="text-gray-700">• Step-by-step problem solving</li>
                        <li className="text-gray-700">• Math, Reading, and Writing coverage</li>
                        <li className="text-gray-700">• Practice exercises after each video</li>
                        <li className="text-gray-700">• 100% free, no subscription needed</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                      <p className="text-sm text-purple-900">
                        <span className="font-bold">💡 Best For:</span> Visual learners who benefit from watching concepts explained step-by-step.
                      </p>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                      <p className="text-sm text-amber-900">
                        <span className="font-bold">⚡ Pro Tip:</span> Watch videos at 1.5x speed to save time. Pause and work through problems yourself before seeing the solution.
                      </p>
                    </div>
                  </div>

                  <a 
                    href="https://www.youtube.com/@KhanAcademyNewSAT/videos" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors w-full justify-center"
                  >
                    Watch Free Videos
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardContent>
              </Card>

              {/* Scalar Learning */}
              <Card className="border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-orange-50 to-yellow-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <Video className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">Scalar Learning (YouTube)</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">Expert SAT Strategy Videos</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    High-quality YouTube channel with Digital SAT strategies, tips, and walkthroughs. Excellent for learning test-taking techniques.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2 ml-7">
                        <li className="text-gray-700">• Digital SAT-specific strategies</li>
                        <li className="text-gray-700">• Practice test walkthroughs</li>
                        <li className="text-gray-700">• Time management techniques</li>
                        <li className="text-gray-700">• Common mistake analysis</li>
                        <li className="text-gray-700">• Regular updates for 2025 Digital SAT</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                      <p className="text-sm text-purple-900">
                        <span className="font-bold">💡 Best For:</span> Students who want expert strategies and tips beyond just content review.
                      </p>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                      <p className="text-sm text-amber-900">
                        <span className="font-bold">⚡ Pro Tip:</span> Subscribe and watch their "Common Mistakes" series to avoid losing easy points.
                      </p>
                    </div>
                  </div>

                  <a 
                    href="https://www.youtube.com/@ScalarLearning" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors w-full justify-center"
                  >
                    Watch on YouTube
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* SECTION: Study Tools - THIS SECTION NOW WORKS */}
        {activeSection === 'tools' && (
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Free Study Tools</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Track your progress and stay organized with these free study tools designed for SAT prep.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <StudyTimeTracker />
              <ScoreTracker />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Desmos Calculator */}
              <Card className="border-2 border-indigo-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-indigo-50 to-purple-50 relative">
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Recommended
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-indigo-100 p-3 rounded-xl">
                      <Calculator className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">Desmos Calculator</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">Official SAT Calculator</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The EXACT calculator built into the Digital SAT Math section. Practice with it before test day to maximize your efficiency.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2 ml-7">
                        <li className="text-gray-700">• Built into Bluebook (no need to download separately)</li>
                        <li className="text-gray-700">• Graphing calculator capabilities</li>
                        <li className="text-gray-700">• Can handle complex equations</li>
                        <li className="text-gray-700">• Familiar if you've used Desmos before</li>
                        <li className="text-gray-700">• Practice online at desmos.com</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                      <p className="text-sm text-purple-900">
                        <span className="font-bold">💡 Best For:</span> Getting comfortable with the built-in calculator before test day.
                      </p>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                      <p className="text-sm text-amber-900">
                        <span className="font-bold">⚡ Pro Tip:</span> Practice typing equations quickly. Speed matters on test day!
                      </p>
                    </div>
                  </div>

                  <a 
                    href="https://www.desmos.com/calculator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors w-full justify-center"
                  >
                    Practice with Desmos
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardContent>
              </Card>

              {/* Quizlet */}
              <Card className="border-2 border-teal-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-teal-50 to-cyan-50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-teal-100 p-3 rounded-xl">
                      <Brain className="h-8 w-8 text-teal-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">Quizlet SAT Flashcards</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">Free Vocabulary & Concepts</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Free flashcard sets for SAT vocabulary, grammar rules, and math formulas. Study on-the-go with the mobile app.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2 ml-7">
                        <li className="text-gray-700">• Thousands of pre-made SAT flashcard sets</li>
                        <li className="text-gray-700">• Create your own custom flashcards</li>
                        <li className="text-gray-700">• Multiple study modes (flashcards, learn, test)</li>
                        <li className="text-gray-700">• Mobile app for studying anywhere</li>
                        <li className="text-gray-700">• Spaced repetition for better retention</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                      <p className="text-sm text-purple-900">
                        <span className="font-bold">💡 Best For:</span> Memorizing vocabulary and formulas during downtime.
                      </p>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                      <p className="text-sm text-amber-900">
                        <span className="font-bold">⚡ Pro Tip:</span> Study 10-15 flashcards daily instead of cramming 100 at once.
                      </p>
                    </div>
                  </div>

                  <a 
                    href="https://quizlet.com/subject/sat/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors w-full justify-center"
                  >
                    Browse SAT Flashcards
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* SECTION: 8-Week Study Plan */}
        {activeSection === 'studyPlan' && (
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Comprehensive 8-Week Study Plan</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                A complete, structured 8-week plan covering BOTH Math AND Reading & Writing sections. Follow this plan using Khan Academy and Bluebook.
              </p>
            </div>

            {/* Week Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[1,2,3,4,5,6,7,8].map(week => (
                <button
                  key={week}
                  onClick={() => {
                    const element = document.getElementById(`week-${week}`);
                    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    week === 8
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  }`}
                >
                  Week {week}
                </button>
              ))}
            </div>

            {/* Study Success Tips */}
            <Card className="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-blue-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Study Plan Success Tips:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Block out specific study times</strong> in your calendar - treat them like appointments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Take full practice tests on weekends</strong> under timed, quiet conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Review EVERY mistake</strong> thoroughly - don't just look at your score</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Adjust the schedule</strong> based on your commitments and energy levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Stay consistent</strong> - even 1 hour beats 7 hours once a week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-1">•</span>
                    <span><strong>Use Bluebook app</strong> for all practice tests to match test-day conditions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 8-Week Plan */}
            <div className="space-y-8">
              {/* Week 1 */}
              <Card id="week-1" className="border-2 border-blue-200 scroll-mt-20">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 1: Foundation & Diagnostic
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Take full Bluebook diagnostic test (timed)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Score and record baseline scores</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review Math mistakes from diagnostic</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Identify weak Math topics</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review Reading & Writing mistakes</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Identify weak R&W topics</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Algebra basics practice</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 20 Algebra problems</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Grammar fundamentals</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 20 Grammar problems</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Light review of week's material</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Rest well before Sunday practice test</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 2 */}
              <Card id="week-2" className="border-2 border-blue-200 scroll-mt-20">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 2: Core Skills Development
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Advanced Algebra</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 25 problems on linear equations</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Reading Comprehension strategies</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice 3 reading passages</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Problem Solving & Data Analysis</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Focus on word problems and percentages</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Writing & Language - expression of ideas</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice 20 Writing questions</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Mixed practice: 20 Math + 20 R&W questions</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review all mistakes thoroughly</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Full practice test on Bluebook (timed)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Analyze mistakes and update weak topic list</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 3 */}
              <Card id="week-3" className="border-2 border-blue-200 scroll-mt-20">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 3: Advanced Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Geometry & Trigonometry basics</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 25 geometry problems</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Reading - Evidence & Analysis</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice paired passages (3 sets)</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Advanced Math (quadratics, functions)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 30 advanced math problems</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Writing - Standard English Conventions</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Focus on punctuation and sentence structure</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Timed section practice: Math (35 minutes)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Timed section practice: R&W (32 minutes)</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Full practice test on Bluebook</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Compare scores to previous weeks - track progress</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 4 */}
              <Card id="week-4" className="border-2 border-blue-200 scroll-mt-20">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 4: Mid-Program Review & Mastery
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review all weak Math topics from Weeks 1-3</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Redo 20 previously missed Math problems</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review all weak R&W topics from Weeks 1-3</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Redo 20 previously missed R&W problems</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Statistics & Data interpretation</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Focus on charts, graphs, and tables</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Vocabulary in context</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice 25 vocabulary questions</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Mixed review: 40 questions total (Math + R&W)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review test-taking strategies</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Full practice test on Bluebook</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Detailed score analysis - should see improvement!</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 5 */}
              <Card id="week-5" className="border-2 border-blue-200 scroll-mt-20">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 5: Advanced Strategies & Speed
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Speed drills: 30 Math problems in 30 minutes</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Focus on mental math strategies</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Speed drills: 30 R&W problems in 30 minutes</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice skimming and scanning techniques</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Complex problem-solving</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Focus on multi-step word problems</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Khan Academy: Advanced reading strategies</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice literature and historical passages</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Full timed section practice (both Math & R&W)</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Analyze time management and pacing</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Full practice test on Bluebook</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Track improvement and update strategy</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 6 */}
              <Card id="week-6" className="border-2 border-blue-200 scroll-mt-20">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 6: Weak Area Intensive
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Identify your #1 weakest Math topic</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 40 problems in that topic</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Identify your #1 weakest R&W topic</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 40 problems in that topic</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Identify your #2 weakest Math topic</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 40 problems in that topic</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Identify your #2 weakest R&W topic</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Complete 40 problems in that topic</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Mixed practice: Previously weak topics only</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>50 total questions (25 Math, 25 R&W)</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Full practice test on Bluebook</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>See if weak areas have improved</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 7 */}
              <Card id="week-7" className="border-2 border-blue-200 scroll-mt-20">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100">
                  <CardTitle className="text-2xl text-blue-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 7: Final Review & Polish
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review all Math formulas and rules</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Create a formula cheat sheet</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review all R&W grammar rules</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Create a grammar rules cheat sheet</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review test-taking strategies for Math</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice calculator efficiency</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review test-taking strategies for R&W</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Practice time management techniques</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Light practice: 20 Math + 20 R&W</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review cheat sheets and notes</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY)</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Full practice test on Bluebook</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Final score check - you should be near target!</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Week 8 - FINAL WEEK */}
              <Card id="week-8" className="border-2 border-green-400 scroll-mt-20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">
                  <CardTitle className="text-2xl text-green-900 flex items-center gap-3">
                    <Calendar className="h-6 w-6" />
                    Week 8: Final Preparations & Light Review
                  </CardTitle>
                  <p className="text-green-700 font-medium mt-2">🎯 Test Week - Keep it Light!</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Monday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review final practice test mistakes</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Note any last-minute stress areas</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Tuesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Light practice: 20 easy/medium questions total</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Review test-taking strategies</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Wednesday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Final formula and grammar rules review</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Organize test-day materials and ID</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Thursday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>NO STUDYING - Rest your brain</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Light exercise, good meal, early bedtime</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50 transition-colors duration-200 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Friday</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>OPTIONAL: Quick 15-minute formula review if desired</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>Relax, hydrate, prepare test-day snacks</span></li>
                      </ul>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4 bg-amber-50 p-3 rounded">
                      <h4 className="font-bold text-gray-900 mb-2">Weekend (Saturday - TEST DAY) 🎯</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li className="flex items-start gap-2"><Award className="h-5 w-5 mt-1 text-amber-500 flex-shrink-0" /><span><strong>Healthy breakfast, arrive early, trust your preparation</strong></span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 mt-1 text-green-500 flex-shrink-0" /><span>You've got this! 👊</span></li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Comparison Table */}
            <Card className="mt-12 bg-white border-2 border-gray-200">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                <CardTitle className="text-2xl text-gray-900">8-Week Plan vs 4-Week Intensive: Which is Right for You?</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="border border-gray-300 p-4 text-left font-bold text-gray-900">Feature</th>
                        <th className="border border-gray-300 p-4 text-center font-bold text-blue-900">8-Week Plan</th>
                        <th className="border border-gray-300 p-4 text-center font-bold text-purple-900">4-Week Intensive</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-4 font-medium text-gray-900">Study Time/Day</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">1.5-2 hours</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">3-4 hours</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-4 font-medium text-gray-900">Practice Tests</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">4 full tests</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">2-3 full tests</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-4 font-medium text-gray-900">Content Coverage</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">Comprehensive - all topics in depth</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">Focused - prioritize weak areas</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-4 font-medium text-gray-900">Best For</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">Most students - balanced approach</td>
                        <td className="border border-gray-300 p-4 text-center text-gray-700">Last-minute prep or review</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-4 font-medium text-gray-900">Expected Improvement</td>
                        <td className="border border-gray-300 p-4 text-center text-green-700 font-bold">200-300 points</td>
                        <td className="border border-gray-300 p-4 text-center text-purple-700 font-bold">100-150 points</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-blue-900 font-semibold">
                    ✅ <strong>Recommendation:</strong> If you have 8 weeks, use the full plan for maximum improvement. If you only have 4 weeks, follow weeks 1, 3, 5, and 7 from the 8-week plan for an intensive review.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* SECTION: Downloads */}
        {activeSection === 'downloads' && (
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Free Study Guides & Downloads</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Download printable study guides, formula sheets, and quick reference materials.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {/* Math Formula Sheet */}
              <Card className="border-2 border-blue-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Math Formula Sheet</h3>
                  <p className="text-sm text-gray-600 mb-4">All essential SAT math formulas</p>
                  <a 
                    href="/resources/pdfs/Digital-SAT-Math-Cheat-Sheet.pdf" 
                    download
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download PDF
                  </a>
                </CardContent>
              </Card>

              {/* Grammar Rules Guide */}
              <Card className="border-2 border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Grammar Rules Guide</h3>
                  <p className="text-sm text-gray-600 mb-4">Complete grammar reference</p>
                  <a 
                    href="/resources/pdfs/sat-grammar-rules-guide.pdf" 
                    download
                    className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download PDF
                  </a>
                </CardContent>
              </Card>

              {/* Reading Strategies */}
              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Book className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Reading Strategies</h3>
                  <p className="text-sm text-gray-600 mb-4">Improve techniques for reading passages</p>
                  <a 
                    href="/resources/pdfs/sat-reading-strategies.pdf" 
                    download
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download PDF
                  </a>
                </CardContent>
              </Card>

              {/* Test-Taking Tips */}
              <Card className="border-2 border-orange-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Test-Taking Tips</h3>
                  <p className="text-sm text-gray-600 mb-4">Time management and strategies</p>
                  <a 
                    href="/resources/pdfs/sat-test-taking-tips.pdf" 
                    download
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download PDF
                  </a>
                </CardContent>
              </Card>

              {/* Digital SAT Overview */}
              <Card className="border-2 border-indigo-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Digital SAT Overview</h3>
                  <p className="text-sm text-gray-600 mb-4">Complete basic guide to new format</p>
                  <a 
                    href="/resources/pdfs/digital-sat-overview.pdf" 
                    download
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download PDF
                  </a>
                </CardContent>
              </Card>

              {/* Study Plan Template */}
              <Card className="border-2 border-teal-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Study Plan Template</h3>
                  <p className="text-sm text-gray-600 mb-4">Customizable 8-week plan</p>
                  <a 
                    href="/resources/pdfs/sat-study-plan-template.pdf" 
                    download
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download PDF
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Need Extra Help Section */}
            <Card className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none">
              <CardContent className="p-10 text-center">
                <h3 className="text-3xl font-bold mb-4">Need Extra Help?</h3>
                <p className="text-xl mb-6 text-blue-100">
                  Our expert tutors in Calgary provide personalized SAT prep with proven 210+ point average improvements.
                </p>
                <a 
                  href="/contact-us" 
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
                >
                  Schedule Free Consultation
                </a>
              </CardContent>
            </Card>
          </section>
        )}

        {/* AdSense Zone 2 - Middle */}
        <div className="my-12">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* Related Resources Footer */}
        <Card className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Resources</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/gpa-calculator" className="block p-6 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-gray-100">
                <Calculator className="h-10 w-10 text-blue-600 mb-4" />
                <h4 className="font-bold text-lg text-gray-900 mb-2">GPA Calculator</h4>
                <p className="text-gray-600 text-sm">Convert international grades to U.S. 4.0 scale</p>
              </a>
              
              <a href="/college-admissions-calculator" className="block p-6 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-gray-100">
                <GraduationCap className="h-10 w-10 text-green-600 mb-4" />
                <h4 className="font-bold text-lg text-gray-900 mb-2">College Admissions Calculator</h4>
                <p className="text-gray-600 text-sm">Find colleges that match your SAT score and GPA</p>
              </a>
              
              <a href="/about" className="block p-6 bg-white rounded-xl hover:shadow-lg transition-all border-2 border-gray-100">
                <Award className="h-10 w-10 text-purple-600 mb-4" />
                <h4 className="font-bold text-lg text-gray-900 mb-2">About Our Services</h4>
                <p className="text-gray-600 text-sm">Learn about our Calgary tutoring services</p>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* AdSense Zone 3 - Bottom */}
        <div className="mt-12">
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-7638771792216412"
               data-ad-slot="5362613714"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </main>
    </div>
  );
};

export default Resources;

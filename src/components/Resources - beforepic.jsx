import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  BookOpen, 
  FileText, 
  Brain,
  Download,
  Calculator,
  GraduationCap,
  CheckCircle
} from 'lucide-react';

const Resources = () => {
  const [activeSection, setActiveSection] = useState('math');

  // SEO optimization
  useEffect(() => {
    document.title = 'Free Digital SAT Resources & Study Materials | Calgary Academic Excellence';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Access free Digital SAT practice materials, study guides, and sample questions. ' +
        'Expert-curated content for comprehensive SAT preparation in Calgary.'
      );
    }
  }, []);

  const navigationItems = [
    { id: 'math', label: 'Mathematics', icon: <Calculator className="h-5 w-5" /> },
    { id: 'verbal', label: 'Reading & Writing', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'practice', label: 'Practice Tests', icon: <Brain className="h-5 w-5" /> }
  ];

  const educationalContent = {
    math: [
      {
        title: "Digital SAT Math Fundamentals",
        description: "Essential mathematical concepts and practice problems for Digital SAT success",
        topics: ["Algebra", "Geometry", "Problem Solving"],
        previewContent: [
          "Sample Problem: Linear Equations",
          "A company's profit P (in dollars) is given by P = 200x - 1500, where x is the number of units sold.",
          "Question: How many units must be sold to break even (P = 0)?",
          "Solution:",
          "1. Set P = 0",
          "2. Solve: 0 = 200x - 1500",
          "3. Result: x = 7.5, therefore 8 units needed"
        ]
      }
    ],
    verbal: [
      {
        title: "Reading Comprehension Guide",
        description: "Master the Digital SAT reading section with proven strategies",
        topics: ["Main Ideas", "Evidence Analysis", "Critical Reading"],
        previewContent: [
          "Key Strategy: Active Reading",
          "1. Preview passage structure",
          "2. Read first and last paragraphs",
          "3. Identify topic sentences",
          "4. Mark key evidence"
        ]
      }
    ],
    practice: [
      {
        title: "Full Practice Test",
        description: "Complete Digital SAT practice exam with detailed solutions",
        topics: ["Math", "Reading", "Writing"],
        previewContent: [
          "Test Overview:",
          "• 54 Math questions",
          "• 27 Reading questions",
          "• 27 Writing questions",
          "• 2 hours 14 minutes total time"
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Hero Section */}
{/* Hero Section - Adjusted spacing to account for fixed navigation */}
<div className="bg-gradient-to-r from-blue-900 to-blue-800 pt-24 pb-12"> {/* Changed py-12 to pt-24 pb-12 */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
      Digital SAT Study Resources
    </h1>
    <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
      Access our comprehensive collection of study materials, practice tests, and guides
      to help you excel on the Digital SAT.
    </p>
  </div>
</div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-gray-200">
          {navigationItems.map(item => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'outline'}
              onClick={() => setActiveSection(item.id)}
              className="flex items-center gap-2 px-4 py-2 text-base"
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Content Grid with Improved Readability */}
        <div className="space-y-8">
          {educationalContent[activeSection].map((resource, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100">
                <CardTitle className="text-xl sm:text-2xl text-blue-900 flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  {resource.title}
                </CardTitle>
                <p className="text-gray-600 mt-2 text-base sm:text-lg">
                  {resource.description}
                </p>
              </CardHeader>

              <CardContent className="pt-6">
                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {resource.topics.map((topic, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-full
                               text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Content Preview */}
                <div className="bg-gray-50 p-6 rounded-lg text-gray-800">
                  {resource.previewContent.map((line, i) => (
                    <p key={i} className="mb-3 last:mb-0 text-base sm:text-lg leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  <Button 
                    className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Start Learning
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Study Tips Section */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-blue-900">
              Study Tips & Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base sm:text-lg">
                    Start with diagnostic tests to identify your strengths and areas for improvement
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base sm:text-lg">
                    Practice regularly with official-style questions to build familiarity
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base sm:text-lg">
                    Review incorrect answers thoroughly to understand your mistakes
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base sm:text-lg">
                    Time yourself during practice to develop proper pacing
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base sm:text-lg">
                    Take regular breaks to maintain focus and productivity
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-base sm:text-lg">
                    Focus on understanding concepts rather than memorizing
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
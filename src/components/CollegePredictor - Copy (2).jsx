import React, { useState, useEffect } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import * as XLSX from 'xlsx';

const CollegePredictor = () => {
  // State Management
  const [collegeData, setCollegeData] = useState([]);
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

  // Load Excel Data
  useEffect(() => {
    const loadCollegeData = async () => {
      try {
        const response = await fetch('/excel/collegerankings.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const excelData = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(excelData, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setCollegeData(jsonData);
      } catch (error) {
        console.error("Error loading college data:", error);
        setError("Failed to load college data. Please refresh the page.");
      }
    };
    loadCollegeData();
  }, []);

  // Calculate match score
  const calculateMatch = (profile, university) => {
    let totalScore = 0;
    let weights = { gpa: 0.35, sat: 0.35, program: 0.15, success: 0.15 };

    // GPA Match
    if (university.GPA_Range) {
      const [minGPA, maxGPA] = university.GPA_Range.split('-').map(Number);
      const studentGPA = parseFloat(profile.gpa);
      if (studentGPA >= maxGPA) {
        totalScore += weights.gpa * 1.0;
      } else if (studentGPA >= minGPA) {
        totalScore += weights.gpa * 0.7;
      } else if (studentGPA >= minGPA - 0.3) {
        totalScore += weights.gpa * 0.4;
      }
    }

    // SAT Match
    if (university.SAT_Range) {
      const [minSAT, maxSAT] = university.SAT_Range.split('-').map(Number);
      const studentSAT = parseInt(profile.sat);
      if (studentSAT >= maxSAT) {
        totalScore += weights.sat * 1.0;
      } else if (studentSAT >= minSAT) {
        totalScore += weights.sat * 0.7;
      } else if (studentSAT >= minSAT - 100) {
        totalScore += weights.sat * 0.4;
      }
    }

    // Program Match
    if (university.Program_Strengths && profile.desiredMajor) {
      const programs = university.Program_Strengths.toLowerCase();
      const major = profile.desiredMajor.toLowerCase();
      if (programs.includes(major)) {
        totalScore += weights.program;
      }
    }

    // Success Metrics
    const gradRate = university.Graduation_Rate || 0;
    const empRate = university.Employment_Rate || 0;
    const successScore = (gradRate * 0.6 + empRate * 0.4) / 100;
    totalScore += weights.success * successScore;

    return {
      overall: Math.min(totalScore, 1.0),
      gpa: weights.gpa,
      sat: weights.sat,
      program: weights.program
    };
  };

  // AI Integration with Google Gemini - UPDATED WITH CORRECT API FORMAT
  const getAIInsights = async (categorizedResults, profile) => {
    try {
      // Your Google AI Studio API key
      const API_KEY = 'AIzaSyBIskHL7K9p5-bf7xv-8lOu8Zj1WF-MCI8';
      const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent';

      const prompt = `As a college admissions counselor, analyze this student profile and college matches:

Student Profile:
- GPA: ${profile.gpa}
- SAT: ${profile.sat}
- Desired Major: ${profile.desiredMajor}
- Location Preference: ${profile.location || 'No preference'}
- Budget: ${profile.budget || 'Not specified'}

College Matches:
Safety Schools (${categorizedResults.Safety.length}): ${categorizedResults.Safety.map(c => c.University).join(', ')}
Target Schools (${categorizedResults.Target.length}): ${categorizedResults.Target.map(c => c.University).join(', ')}
Reach Schools (${categorizedResults.Reach.length}): ${categorizedResults.Reach.map(c => c.University).join(', ')}

Provide a comprehensive analysis with:
1. Overall Assessment (2-3 sentences about their college readiness)
2. Specific strengths and areas for improvement
3. Strategic recommendations for applications (which schools to prioritize, when to apply)
4. Action items to strengthen their profile
5. Estimated admission probability for each category

Keep the response concise but insightful, under 400 words.`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('AI request failed');
      }
      
      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'Analysis unavailable';
      
      return aiResponse;
    } catch (error) {
      console.error('AI Error:', error);
      return 'AI analysis temporarily unavailable. Using traditional matching algorithm.';
    }
  };

  // Process predictions
  const handlePredict = async () => {
    if (!studentProfile.gpa || !studentProfile.sat) {
      setError("Please enter your GPA and SAT score.");
      return;
    }

    if (!collegeData.length) {
      setError("College data not loaded. Please refresh.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const processedResults = { Reach: [], Target: [], Safety: [] };
      const matches = collegeData.map(university => {
        const matchScore = calculateMatch(studentProfile, university);
        return { ...university, matchScore: matchScore.overall };
      });

      matches.sort((a, b) => b.matchScore - a.matchScore);

      matches.forEach((college) => {
        if (college.matchScore >= 0.75) {
          processedResults.Safety.push(college);
        } else if (college.matchScore >= 0.55) {
          processedResults.Target.push(college);
        } else if (college.matchScore >= 0.35) {
          processedResults.Reach.push(college);
        }
      });

      // Limit to top 8 per category
      Object.keys(processedResults).forEach(category => {
        processedResults[category] = processedResults[category].slice(0, 8);
      });

      setResults(processedResults);

      // Get AI insights
      const insights = await getAIInsights(processedResults, studentProfile);
      setAiInsights(insights);

      setActiveSection('results');
    } catch (error) {
      console.error("Error:", error);
      setError("Error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Input Section
  const renderInputSection = () => (
    <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <CardTitle className="text-2xl flex items-center gap-3">
          <School className="h-7 w-7" />
          Enter Your Academic Profile
        </CardTitle>
        <p className="text-blue-100 mt-2">Powered by AI for accurate predictions</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Academic Credentials */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Academic Credentials
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA (on 4.0 scale) *
              </label>
              <input
                type="number"
                placeholder="e.g., 3.85"
                value={studentProfile.gpa}
                onChange={(e) => setStudentProfile(prev => ({
                  ...prev,
                  gpa: e.target.value
                }))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
                max="4.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SAT Score (out of 1600) *
              </label>
              <input
                type="number"
                placeholder="e.g., 1450"
                value={studentProfile.sat}
                onChange={(e) => setStudentProfile(prev => ({
                  ...prev,
                  sat: e.target.value
                }))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="10"
                min="400"
                max="1600"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Preferences & Interests
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intended Major *
              </label>
              <input
                type="text"
                placeholder="e.g., Computer Science, Business"
                value={studentProfile.desiredMajor}
                onChange={(e) => setStudentProfile(prev => ({
                  ...prev,
                  desiredMajor: e.target.value
                }))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Location (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., California, Northeast"
                value={studentProfile.location}
                onChange={(e) => setStudentProfile(prev => ({
                  ...prev,
                  location: e.target.value
                }))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range (Optional)
              </label>
              <select
                value={studentProfile.budget}
                onChange={(e) => setStudentProfile(prev => ({
                  ...prev,
                  budget: e.target.value
                }))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select budget</option>
                <option value="under30k">Under $30k/year</option>
                <option value="30k-50k">$30k - $50k/year</option>
                <option value="50k-70k">$50k - $70k/year</option>
                <option value="over70k">Over $70k/year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handlePredict}
            disabled={loading}
            className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Analyzing with AI...
              </>
            ) : (
              <>
                <Brain className="h-5 w-5 mr-3" />
                Get AI-Powered Predictions
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Results Section with AI Insights
  const renderResultsSection = () => (
    <div className="space-y-8">
      {/* AI Insights Banner */}
      {aiInsights && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-purple-900">
              <Brain className="h-6 w-6 text-purple-600" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {aiInsights}
            </div>
          </CardContent>
        </Card>
      )}

      {/* College Categories */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Reach Schools */}
        <Card className="border-2 border-orange-200 hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <Zap className="h-5 w-5 text-orange-600" />
              Reach Schools ({results.Reach?.length || 0})
            </CardTitle>
            <p className="text-sm text-orange-700">Ambitious but achievable</p>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {results.Reach?.map((college, idx) => (
              <div key={idx} className="p-4 bg-white border border-orange-100 rounded-lg hover:border-orange-300 transition-colors">
                <h4 className="font-semibold text-gray-900">{college.University}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>📊 GPA: {college.GPA_Range}</p>
                  <p>📝 SAT: {college.SAT_Range}</p>
                  <p className="text-orange-600 font-medium">
                    Match: {(college.matchScore * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Target Schools */}
        <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Target className="h-5 w-5 text-blue-600" />
              Target Schools ({results.Target?.length || 0})
            </CardTitle>
            <p className="text-sm text-blue-700">Strong fit for your profile</p>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {results.Target?.map((college, idx) => (
              <div key={idx} className="p-4 bg-white border border-blue-100 rounded-lg hover:border-blue-300 transition-colors">
                <h4 className="font-semibold text-gray-900">{college.University}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>📊 GPA: {college.GPA_Range}</p>
                  <p>📝 SAT: {college.SAT_Range}</p>
                  <p className="text-blue-600 font-medium">
                    Match: {(college.matchScore * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Safety Schools */}
        <Card className="border-2 border-green-200 hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="flex items-center gap-2 text-green-900">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Safety Schools ({results.Safety?.length || 0})
            </CardTitle>
            <p className="text-sm text-green-700">High probability of admission</p>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {results.Safety?.map((college, idx) => (
              <div key={idx} className="p-4 bg-white border border-green-100 rounded-lg hover:border-green-300 transition-colors">
                <h4 className="font-semibold text-gray-900">{college.University}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>📊 GPA: {college.GPA_Range}</p>
                  <p>📝 SAT: {college.SAT_Range}</p>
                  <p className="text-green-600 font-medium">
                    Match: {(college.matchScore * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Application Strategy */}
      <Card className="bg-blue-50 border-2 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Recommended Application Strategy
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-orange-600 mb-2">Reach (2-4 schools)</h4>
              <p className="text-sm">Apply to schools where you'd be below average. These are your dream schools.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">Target (3-5 schools)</h4>
              <p className="text-sm">Your stats match well. You have a solid chance of acceptance.</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">Safety (2-3 schools)</h4>
              <p className="text-sm">You exceed their averages. Very likely to be accepted.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      {/* SEO-Optimized Header */}
      <header className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI-Powered College Admissions Predictor
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get personalized college recommendations based on your GPA, SAT scores, and preferences. 
          Powered by Google AI for accurate predictions of Reach, Target, and Safety schools.
        </p>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={() => setActiveSection('input')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeSection === 'input' 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
            }`}
          >
            <School className="h-5 w-5" />
            <span>Profile Input</span>
          </Button>
          
          <Button
            onClick={() => setActiveSection('results')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeSection === 'results' 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
            }`}
            disabled={!results.Target?.length}
          >
            <Trophy className="h-5 w-5" />
            <span>Your Matches</span>
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {/* Content Sections */}
        <div className="transition-all duration-300">
          {activeSection === 'input' && renderInputSection()}
          {activeSection === 'results' && renderResultsSection()}
        </div>
      </div>

      {/* SEO Footer Content */}
      <footer className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">About Our Predictor</h3>
            <p className="text-sm text-gray-600">
              Our AI-powered college predictor analyzes your academic profile using advanced algorithms 
              to provide accurate college match predictions for reach, target, and safety schools.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">How It Works</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Enter your GPA and SAT scores</li>
              <li>✓ Specify your intended major</li>
              <li>✓ Get AI-powered college recommendations</li>
              <li>✓ Receive personalized application strategy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Why Choose Us?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>🤖 AI-powered analysis using Google Gemini</li>
              <li>📊 Data-driven match calculations</li>
              <li>🎯 Personalized school categories</li>
              <li>💡 Strategic application guidance</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p>Free college admissions predictor | Find your perfect college match | 
          GPA and SAT college calculator | College acceptance predictor 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default CollegePredictor;

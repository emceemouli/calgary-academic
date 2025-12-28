import React, { useState } from 'react';
import { School, Trophy, TrendingUp, Brain, AlertCircle, CheckCircle, Target, Zap, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';

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

  // Format AI response for beautiful display
  const formatAIResponse = (text) => {
    if (!text) return null;

    const lines = text.split('\n').filter(line => line.trim());
    
    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          line = line.trim();
          
          // Skip empty lines
          if (!line) return null;
          
          // Main section headers (with numbers like **1. Overall Assessment:** or bold headers)
          if (line.match(/^\*\*\d+\.\s+.+:\*\*/) || line.match(/^\*\*[A-Z][^*]+:\*\*/)) {
            const headerText = line.replace(/^\*\*\d+\.\s+/, '').replace(/\*\*/g, '').replace(':', '');
            return (
              <h3 key={idx} className="text-lg font-bold text-purple-900 mt-6 mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                {headerText}
              </h3>
            );
          }
          
          // Sub-headers (like **Strengths:** or **Target Schools:**)
          if (line.match(/^\*\*[^*]+\*\*$/)) {
            const subHeader = line.replace(/\*\*/g, '');
            return (
              <h4 key={idx} className="text-md font-semibold text-purple-800 mt-4 mb-2 ml-2">
                {subHeader}
              </h4>
            );
          }
          
          // Bullet points with asterisks
          if (line.startsWith('* ')) {
            const content = line.substring(2).replace(/\*\*/g, '');
            return (
              <div key={idx} className="flex gap-3 ml-6 mb-2">
                <span className="text-purple-600 mt-1 text-lg">•</span>
                <p className="text-gray-700 leading-relaxed flex-1">{content}</p>
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
          
          // Regular paragraphs (but skip if it's part of a heading)
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

  // PURE AI - Get everything from AI (colleges + insights)
  const getAIRecommendations = async (profile) => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_AI_KEY;
      const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-3-12b-it:generateContent';

      // COMPACT PROMPT - AI provides colleges WITH stats
      const prompt = `As a college admissions counselor, recommend 24 US universities for this student and analyze their profile:

**Student Profile:**
- GPA: ${profile.gpa}/4.0
- SAT: ${profile.sat}/1600
- Intended Major: ${profile.desiredMajor}
- Location Preference: ${profile.location || 'Any'}
- Budget: ${profile.budget || 'Not specified'}

**Task 1 - College Recommendations:**
Provide exactly 24 unique US universities (NO DUPLICATES) categorized as:

**REACH SCHOOLS (8 colleges):**
For each college, format as:
[College Name] | GPA: [range] | SAT: [range]

**TARGET SCHOOLS (8 colleges):**
For each college, format as:
[College Name] | GPA: [range] | SAT: [range]

**SAFETY SCHOOLS (8 colleges):**
For each college, format as:
[College Name] | GPA: [range] | SAT: [range]

**Task 2 - Analysis:**
Provide brief analysis with these sections:

**1. Overall Assessment:**
(2-3 sentences about profile strength)

**2. Strengths:**
* List 2-3 key strengths

**3. Strategic Recommendations:**
* List 2-3 actionable recommendations

**4. Application Timeline:**
* Brief timeline advice

IMPORTANT:
- Each college must appear ONLY ONCE
- Include realistic GPA/SAT ranges for each college
- Strongly prioritize the location preference
- Keep total response under 600 words
- Use the exact formatting shown above`;

      console.log('🤖 Requesting pure AI recommendations...');

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
        console.error('❌ AI Error:', errorData);
        throw new Error(`AI request failed: ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || '';
      
      console.log('✅ AI recommendations received');
      console.log('Response length:', aiResponse.length);
      
      return aiResponse;
    } catch (error) {
      console.error('🔥 AI Error:', error);
      throw error;
    }
  };

  // Parse AI response into structured data
  const parseAIResponse = (aiResponse) => {
    const results = { Reach: [], Target: [], Safety: [] };
    let insights = '';
    
    try {
      const lines = aiResponse.split('\n');
      let currentCategory = null;
      let insightsStarted = false;
      const seenColleges = new Set(); // Track unique colleges
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Detect category headers
        if (line.match(/REACH SCHOOLS?/i) || line.match(/^\*\*REACH/i)) {
          currentCategory = 'Reach';
          insightsStarted = false;
          continue;
        } else if (line.match(/TARGET SCHOOLS?/i) || line.match(/^\*\*TARGET/i)) {
          currentCategory = 'Target';
          insightsStarted = false;
          continue;
        } else if (line.match(/SAFETY SCHOOLS?/i) || line.match(/^\*\*SAFETY/i)) {
          currentCategory = 'Safety';
          insightsStarted = false;
          continue;
        }
        
        // Detect start of analysis section
        if (line.match(/^\*\*\d+\.\s+Overall Assessment/i) || 
            line.match(/^\*\*Analysis/i) ||
            line.match(/^\*\*Task 2/i)) {
          insightsStarted = true;
          currentCategory = null;
        }
        
        // If we're in insights section, collect all remaining text
        if (insightsStarted) {
          insights += line + '\n';
          continue;
        }
        
        // Parse college data (format: Name | GPA: range | SAT: range)
        if (currentCategory && line && !line.match(/^(REACH|TARGET|SAFETY)/i)) {
          // Try to parse line with | separator
          if (line.includes('|')) {
            const parts = line.split('|').map(p => p.trim());
            let collegeName = parts[0].replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim();
            
            // Remove markdown formatting
            collegeName = collegeName.replace(/^\*\*/, '').replace(/\*\*$/, '');
            
            // Check for duplicates
            const collegeLower = collegeName.toLowerCase();
            if (seenColleges.has(collegeLower)) {
              console.log('⚠️ Skipping duplicate:', collegeName);
              continue;
            }
            seenColleges.add(collegeLower);
            
            let gpaRange = 'N/A';
            let satRange = 'N/A';
            
            // Extract GPA range
            const gpaPart = parts.find(p => p.toLowerCase().includes('gpa'));
            if (gpaPart) {
              const gpaMatch = gpaPart.match(/(\d\.\d+\s*-\s*\d\.\d+)/);
              if (gpaMatch) gpaRange = gpaMatch[1].replace(/\s+/g, '');
            }
            
            // Extract SAT range
            const satPart = parts.find(p => p.toLowerCase().includes('sat'));
            if (satPart) {
              const satMatch = satPart.match(/(\d{3,4}\s*-\s*\d{3,4})/);
              if (satMatch) satRange = satMatch[1].replace(/\s+/g, '');
            }
            
            if (collegeName && results[currentCategory].length < 8) {
              results[currentCategory].push({
                University: collegeName,
                GPA_Range: gpaRange,
                SAT_Range: satRange
              });
            }
          }
          // Alternative format: just college name on a line
          else if (line.match(/^\d+\.\s+[A-Z]/) || line.match(/^-\s+[A-Z]/)) {
            let collegeName = line.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim();
            collegeName = collegeName.replace(/^\*\*/, '').replace(/\*\*$/, '');
            
            // Check for duplicates
            const collegeLower = collegeName.toLowerCase();
            if (seenColleges.has(collegeLower)) {
              console.log('⚠️ Skipping duplicate:', collegeName);
              continue;
            }
            seenColleges.add(collegeLower);
            
            // Look ahead for GPA/SAT in next lines
            let gpaRange = 'N/A';
            let satRange = 'N/A';
            
            for (let j = i + 1; j < Math.min(i + 3, lines.length); j++) {
              const nextLine = lines[j].trim();
              if (nextLine.toLowerCase().includes('gpa:')) {
                const gpaMatch = nextLine.match(/(\d\.\d+\s*-\s*\d\.\d+)/);
                if (gpaMatch) gpaRange = gpaMatch[1].replace(/\s+/g, '');
              }
              if (nextLine.toLowerCase().includes('sat:')) {
                const satMatch = nextLine.match(/(\d{3,4}\s*-\s*\d{3,4})/);
                if (satMatch) satRange = satMatch[1].replace(/\s+/g, '');
              }
            }
            
            if (collegeName && results[currentCategory].length < 8) {
              results[currentCategory].push({
                University: collegeName,
                GPA_Range: gpaRange,
                SAT_Range: satRange
              });
            }
          }
        }
      }
      
      console.log('📊 Parsed results:', {
        reach: results.Reach.length,
        target: results.Target.length,
        safety: results.Safety.length,
        uniqueColleges: seenColleges.size
      });
      
      return { results, insights: insights.trim() };
      
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return { results, insights: aiResponse };
    }
  };

  // Main prediction handler
  const handlePredict = async () => {
    if (!studentProfile.gpa || !studentProfile.sat) {
      setError("Please enter your GPA and SAT score.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Starting pure AI prediction...');

      // Get AI recommendations (colleges + insights)
      const aiResponse = await getAIRecommendations(studentProfile);
      
      // Parse response
      const { results: parsedResults, insights } = parseAIResponse(aiResponse);
      
      // Verify we got results
      if (parsedResults.Reach.length === 0 && parsedResults.Target.length === 0 && parsedResults.Safety.length === 0) {
        throw new Error('No colleges parsed from AI response');
      }

      setResults(parsedResults);
      setAiInsights(insights);
      setActiveSection('results');

    } catch (error) {
      console.error("Error:", error);
      setError("AI service temporarily unavailable. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  // Input Section
  const renderInputSection = () => (
    <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white p-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <School className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Enter Your Academic Profile</CardTitle>
            <p className="text-blue-100 mt-2 text-lg">AI will find your perfect college matches</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Academic Credentials */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-blue-100">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Trophy className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Academic Credentials</h3>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GPA (on 4.0 scale) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 3.85"
                value={studentProfile.gpa}
                onChange={(e) => setStudentProfile(prev => ({ ...prev, gpa: e.target.value }))}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                step="0.01"
                min="0"
                max="4.0"
              />
              <p className="text-xs text-gray-500 mt-1">Enter your cumulative GPA</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SAT Score (out of 1600) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 1450"
                value={studentProfile.sat}
                onChange={(e) => setStudentProfile(prev => ({ ...prev, sat: e.target.value }))}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                step="10"
                min="400"
                max="1600"
              />
              <p className="text-xs text-gray-500 mt-1">Combined Math + EBRW score</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-purple-100">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Your Preferences</h3>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Intended Major <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Computer Science, Biology, Business"
                value={studentProfile.desiredMajor}
                onChange={(e) => setStudentProfile(prev => ({ ...prev, desiredMajor: e.target.value }))}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Your field of interest</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Location
              </label>
              <input
                type="text"
                placeholder="e.g., Mid-Atlantic, California, Northeast"
                value={studentProfile.location}
                onChange={(e) => setStudentProfile(prev => ({ ...prev, location: e.target.value }))}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">Geographic preference (optional)</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={studentProfile.budget}
                onChange={(e) => setStudentProfile(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                <option value="">Select your budget (optional)</option>
                <option value="under30k">Under $30k/year</option>
                <option value="30k-50k">$30k - $50k/year</option>
                <option value="50k-70k">$50k - $70k/year</option>
                <option value="over70k">Over $70k/year</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Annual cost preference</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 flex justify-center">
          <Button
            onClick={handlePredict}
            disabled={loading}
            className="px-16 py-6 text-xl font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>AI is analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6" />
                <span>Get AI-Powered Predictions</span>
                <Sparkles className="h-6 w-6" />
              </div>
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Pure AI-powered recommendations - no spreadsheet needed!
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Results Section
  const renderResultsSection = () => (
    <div className="space-y-8">
      {/* AI Insights */}
      {aiInsights && (
        <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-200 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Brain className="h-7 w-7" />
              </div>
              <span>AI-Powered Insights</span>
              <Sparkles className="h-6 w-6 ml-auto animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {formatAIResponse(aiInsights)}
          </CardContent>
        </Card>
      )}

      {/* College Match Results */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reach Schools */}
        <Card className="border-2 border-orange-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="bg-gradient-to-br from-orange-50 to-orange-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-200 rounded-xl group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-orange-900">
                    Reach Schools
                  </CardTitle>
                  <p className="text-sm text-orange-700 font-medium mt-1">
                    {results.Reach?.length || 0} ambitious targets
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto bg-gradient-to-b from-white to-orange-50/30">
            {results.Reach?.length > 0 ? (
              results.Reach.map((college, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-orange-100 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all duration-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.University}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA:</span>
                      <span>{college.GPA_Range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT:</span>
                      <span>{college.SAT_Range}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Zap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No reach schools found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Target Schools */}
        <Card className="border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-200 rounded-xl group-hover:scale-110 transition-transform">
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
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto bg-gradient-to-b from-white to-blue-50/30">
            {results.Target?.length > 0 ? (
              results.Target.map((college, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.University}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA:</span>
                      <span>{college.GPA_Range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT:</span>
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
        <Card className="border-2 border-green-200 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
          <CardHeader className="bg-gradient-to-br from-green-50 to-green-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-200 rounded-xl group-hover:scale-110 transition-transform">
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
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-3 max-h-[600px] overflow-y-auto bg-gradient-to-b from-white to-green-50/30">
            {results.Safety?.length > 0 ? (
              results.Safety.map((college, idx) => (
                <div key={idx} className="p-5 bg-white border-2 border-green-100 rounded-xl hover:border-green-300 hover:shadow-lg transition-all duration-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">{college.University}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📊 GPA:</span>
                      <span>{college.GPA_Range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-semibold">📝 SAT:</span>
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

      {/* Application Strategy */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-xl">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-blue-600" />
            Recommended Application Strategy
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <h4 className="font-bold text-lg text-orange-600 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Reach (2-4 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Apply to schools where you'd be below average. These are your dream schools - 
                ambitious but achievable with a strong application.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <h4 className="font-bold text-lg text-blue-600 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target (3-5 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Your stats match well with these schools. You have a solid 50-70% chance of 
                acceptance. Focus your efforts here.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <h4 className="font-bold text-lg text-green-600 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Safety (2-3 schools)
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                You exceed their average admitted student's credentials. Very likely to be 
                accepted (80%+ probability).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Google AI</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
          AI College Admissions Predictor
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get personalized college recommendations powered entirely by AI
        </p>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button
            onClick={() => setActiveSection('input')}
            className={`flex items-center gap-3 px-8 py-4 text-lg rounded-2xl transition-all duration-300 ${
              activeSection === 'input' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
            }`}
          >
            <School className="h-6 w-6" />
            <span className="font-semibold">Profile Input</span>
          </Button>
          
          <Button
            onClick={() => setActiveSection('results')}
            className={`flex items-center gap-3 px-8 py-4 text-lg rounded-2xl transition-all duration-300 ${
              activeSection === 'results' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
            }`}
            disabled={!results.Target?.length && !results.Reach?.length && !results.Safety?.length}
          >
            <Trophy className="h-6 w-6" />
            <span className="font-semibold">Your Matches</span>
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl flex items-start gap-4 shadow-lg">
            <AlertCircle className="h-6 w-6 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="transition-all duration-500">
          {activeSection === 'input' && renderInputSection()}
          {activeSection === 'results' && renderResultsSection()}
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-gray-200">
        <div className="text-center text-sm text-gray-500">
          <p>100% AI-Powered College Predictor | No Spreadsheet Required | Free College Match Finder 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default CollegePredictor;

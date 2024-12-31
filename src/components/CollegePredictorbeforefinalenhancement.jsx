// Part 1: Imports and Initial Setup
import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from 'recharts';
import { School, Trophy, TrendingUp, GraduationCap } from 'lucide-react';
import * as XLSX from 'xlsx';

const CollegePredictor = () => {
  // State management
  const [activeSection, setActiveSection] = useState('input');
  const [studentProfile, setStudentProfile] = useState({
    gpa: '',
    sat: '',
    desiredMajor: '',
    location: '',
    costPreference: '',
    campusSize: ''
  });
  const [results, setResults] = useState({
    Reach: [],
    Target: [],
    Safety: [],
    insights: null,
    matchScore: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [collegeData, setCollegeData] = useState(null);
  // Available options
  const majors = [
    "Computer Science",
    "Engineering",
    "Business",
    "Mathematics",
    "Physics",
    "Biology",
    "Chemistry",
    "Economics",
    "Psychology",
    "English"
  ];

  const locations = [
    "Northeast",
    "Midwest",
    "South",
    "West",
    "No Preference"
  ];

  const costPreferences = [
    "Under $20,000",
    "$20,000 - $35,000",
    "$35,000 - $50,000",
    "Over $50,000",
    "No Preference"
  ];

  const campusSizes = [
    "Small (under 5,000)",
    "Medium (5,000-15,000)",
    "Large (over 15,000)",
    "No Preference"
  ];

  // Data loading effect
  useEffect(() => {
    const loadCollegeData = async () => {
      try {
        console.log('Attempting to load college data...');
        const response = await fetch('/excel/collegerankings.xlsx');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('File fetched successfully');
        const arrayBuffer = await response.arrayBuffer();
        console.log('File converted to array buffer');
        
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: 'array',
          cellDates: true,
          cellStyles: true,
          cellNF: true,
          cellFormula: true
        });
        console.log('Workbook loaded:', workbook.SheetNames);
        
        // Get the first sheet (cleaned_collegerankings)
        const worksheet = workbook.Sheets['cleaned_collegerankings'] || workbook.Sheets[workbook.SheetNames[0]];
        
        // Convert to JSON with options to preserve data types
        const data = XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
          defval: null,
          blankrows: false
        });

        console.log('Processed college data sample:', data.slice(0, 2));
        
        // Map the data to ensure all required fields are present
        const processedData = data.map(college => ({
          University: college.University || college.university || '',
          Rank: college.Rank || college.rank || 0,
          GPA_Range: college.GPA_Range || college.gpa_range || '0-4',
          SAT_Range: college.SAT_Range || college.sat_range || '400-1600',
          Program_Strengths: college.Program_Strengths || college.program_strengths || '',
          Graduation_Rate: college.Graduation_Rate || college.graduation_rate || 0,
          Employment_Rate: college.Employment_Rate || college.employment_rate || 0,
          Starting_Salary: college.Starting_Salary || college.starting_salary || 0
        }));

        setCollegeData(processedData);
        console.log('Data loaded successfully:', processedData.length, 'colleges');

      } catch (error) {
        console.error("Error loading college data:", error);
        setError(`Unable to load college rankings data: ${error.message}`);
      }
    };

    loadCollegeData();
  }, []);
  // Part 3: Matching Algorithm Functions
  const calculateMatch = (studentProfile, university) => {
    // Calculate individual component matches
    const gpaMatch = calculateGPAMatch(studentProfile.gpa, university.GPA_Range);
    const satMatch = calculateSATMatch(studentProfile.sat, university.SAT_Range);
    const programMatch = calculateProgramMatch(studentProfile.desiredMajor, university.Program_Strengths);
    const metricsMatch = calculateMetricsMatch(university);

    // Weighted combination of all factors
    return {
      overall: (gpaMatch * 0.3 + satMatch * 0.3 + programMatch * 0.2 + metricsMatch * 0.2),
      details: {
        academic: (gpaMatch + satMatch) / 2,
        program: programMatch,
        metrics: metricsMatch
      }
    };
  };

  const calculateGPAMatch = (studentGpa, rangeString) => {
    if (!rangeString) return 0.5;
    const [min, max] = rangeString.split('-').map(Number);
    const gpa = parseFloat(studentGpa);
    if (gpa >= max) return 1;
    if (gpa < min) return 0;
    return (gpa - min) / (max - min);
  };

  const calculateSATMatch = (studentSat, rangeString) => {
    if (!rangeString) return 0.5;
    const [min, max] = rangeString.split('-').map(Number);
    const sat = parseInt(studentSat);
    if (sat >= max) return 1;
    if (sat < min) return 0;
    return (sat - min) / (max - min);
  };

  const calculateProgramMatch = (desiredMajor, programStrengths) => {
    if (!desiredMajor || !programStrengths) return 0.5;
    const programs = programStrengths.split(',').map(p => p.trim().toLowerCase());
    const major = desiredMajor.toLowerCase();
    return programs.includes(major) ? 1 : 0.5;
  };

  const calculateMetricsMatch = (university) => {
    const graduationRate = parseFloat(university.Graduation_Rate || university.graduation_rate) || 0;
    const employmentRate = parseFloat(university.Employment_Rate || university.employment_rate) || 0;
    const startingSalary = parseFloat(university.Starting_Salary || university.starting_salary) || 0;

    return (
      (graduationRate / 100 * 0.4) +
      (employmentRate / 100 * 0.3) +
      (Math.min(startingSalary / 100000, 1) * 0.3)
    );
  };

  // Prediction Handler
  const handlePrediction = async () => {
    if (!studentProfile.gpa || !studentProfile.sat) {
      setError("Please enter both GPA and SAT scores");
      return;
    }

    if (!collegeData || collegeData.length === 0) {
      console.error("College data missing:", { collegeData });
      setError("College data is not yet loaded. Please wait or refresh the page.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Processing with data:', {
        studentProfile,
        collegeDataSample: collegeData.slice(0, 2)
      });

      const processedResults = { Reach: [], Target: [], Safety: [] };
      const matches = collegeData.map(university => {
        const matchScore = calculateMatch(studentProfile, university);
        return { university, matchScore };
      });

      // Sort by match score
      matches.sort((a, b) => b.matchScore.overall - a.matchScore.overall);

      // Categorize schools
      matches.forEach(({ university, matchScore }) => {
        if (matchScore.overall >= 0.8) {
          processedResults.Safety.push({ ...university, matchScore });
        } else if (matchScore.overall >= 0.6) {
          processedResults.Target.push({ ...university, matchScore });
        } else if (matchScore.overall >= 0.3) {
          processedResults.Reach.push({ ...university, matchScore });
        }
      });

      // Limit results per category
      Object.keys(processedResults).forEach(category => {
        processedResults[category] = processedResults[category].slice(0, 5);
      });

      setResults(processedResults);
      setActiveSection('results');

    } catch (error) {
      console.error("Error:", error);
      setError("Error processing college data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // Part 4A: Input Section Render Function
  const renderInputSection = () => (
    <Card className="p-6 bg-white shadow-lg">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Academic Profile Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Academic Profile</h3>
          <input
            type="number"
            placeholder="GPA (e.g., 3.8)"
            value={studentProfile.gpa}
            onChange={(e) => setStudentProfile(prev => ({
              ...prev,
              gpa: e.target.value
            }))}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0"
            max="4.0"
          />
          <input
            type="number"
            placeholder="SAT Score (e.g., 1400)"
            value={studentProfile.sat}
            onChange={(e) => setStudentProfile(prev => ({
              ...prev,
              sat: e.target.value
            }))}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            step="10"
            min="400"
            max="1600"
          />
        </div>

        {/* Program Interests Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Program Interests</h3>
          <select
            value={studentProfile.desiredMajor}
            onChange={(e) => setStudentProfile(prev => ({
              ...prev,
              desiredMajor: e.target.value
            }))}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Primary Major</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Options Section */}
      {showAdvanced && (
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <select
            value={studentProfile.location}
            onChange={(e) => setStudentProfile(prev => ({
              ...prev,
              location: e.target.value
            }))}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Preferred Location</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={studentProfile.costPreference}
            onChange={(e) => setStudentProfile(prev => ({
              ...prev,
              costPreference: e.target.value
            }))}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Cost Preference</option>
            {costPreferences.map(cost => (
              <option key={cost} value={cost}>{cost}</option>
            ))}
          </select>

          <select
            value={studentProfile.campusSize}
            onChange={(e) => setStudentProfile(prev => ({
              ...prev,
              campusSize: e.target.value
            }))}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Campus Size</option>
            {campusSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex justify-between items-center">
        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          variant="outline"
          className="text-blue-600 hover:bg-blue-50"
        >
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </Button>
        <Button
          onClick={handlePrediction}
          disabled={loading}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {loading ? 'Processing...' : 'Find Matches'}
        </Button>
      </div>
    </Card>
  );
  // Part 5: Results Section Render Function
  const renderResultsSection = () => {
    console.log('Rendering results section with:', results);
    
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {['Reach', 'Target', 'Safety'].map((category) => (
          <Card key={category} className="p-6 bg-white shadow-lg">
            {/* Category Header */}
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className={`h-5 w-5 
                ${category === 'Reach' ? 'text-red-600' : ''}
                ${category === 'Target' ? 'text-blue-600' : ''}
                ${category === 'Safety' ? 'text-green-600' : ''}`}
              />
              <h3 className={`text-lg font-semibold
                ${category === 'Reach' ? 'text-red-600' : ''}
                ${category === 'Target' ? 'text-blue-600' : ''}
                ${category === 'Safety' ? 'text-green-600' : ''}`}
              >
                {category} Schools
              </h3>
            </div>

            {/* Schools List */}
            <div className="space-y-4">
              {results[category]?.map((college, index) => (
                <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow bg-white">
                  {/* College Header */}
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{college.University || college.university}</h4>
                    <span className="text-sm text-gray-500">#{college.Rank || college.rank}</span>
                  </div>
                  {/* Match Details */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Match Score:</span>
                      <br />
                      <span className="font-semibold text-blue-600">
                        {Math.round(college.matchScore?.overall * 100)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Program Match:</span>
                      <br />
                      <span className="font-semibold text-green-600">
                        {college.matchScore?.details.program >= 0.8 ? 'High' : 
                         college.matchScore?.details.program >= 0.5 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {/* Empty State */}
              {(!results[category] || results[category].length === 0) && (
                <div className="text-center text-gray-500 py-4">
                  No {category.toLowerCase()} schools found
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };
  // Part 6: Analysis Section Render Function
  const renderAnalysisSection = () => {
    console.log('Rendering analysis section with:', results);
    
    // Calculate average metrics across all matched schools
    const calculateAverages = () => {
      const allColleges = [...(results.Reach || []), ...(results.Target || []), ...(results.Safety || [])];
      const totalColleges = allColleges.length || 1;

      return {
        graduationRate: Math.round(
          allColleges.reduce((acc, college) => 
            acc + (parseFloat(college?.Graduation_Rate || college?.graduation_rate || 0)), 0
          ) / totalColleges
        ),
        employmentRate: Math.round(
          allColleges.reduce((acc, college) => 
            acc + (parseFloat(college?.Employment_Rate || college?.employment_rate || 0)), 0
          ) / totalColleges
        ),
        startingSalary: Math.round(
          allColleges.reduce((acc, college) => 
            acc + (parseFloat(college?.Starting_Salary || college?.starting_salary || 0)), 0
          ) / totalColleges
        )
      };
    };

    const averages = calculateAverages();

    // Prepare data for radar chart visualization
    const getRadarData = () => {
      if (!results.Target?.[0]) return [];
      
      const targetCollege = results.Target[0];
      return [
        {
          subject: 'Graduation Rate',
          value: parseFloat(targetCollege?.Graduation_Rate || targetCollege?.graduation_rate || 0),
          fullMark: 100
        },
        {
          subject: 'Employment Rate',
          value: parseFloat(targetCollege?.Employment_Rate || targetCollege?.employment_rate || 0),
          fullMark: 100
        },
        {
          subject: 'Salary Potential',
          value: Math.min((parseFloat(targetCollege?.Starting_Salary || targetCollege?.starting_salary || 0)) / 1000, 100),
          fullMark: 100
        }
      ];
    };

    return (
      <div className="space-y-6">
        {/* Metrics Visualization Card */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Success Metrics Analysis</h3>
          <div className="h-80">
            {results.Target && results.Target.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={getRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <Radar
                    name="University Metrics"
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available for visualization
              </div>
            )}
          </div>
        </Card>

        {/* Metrics Summary Card */}
        <Card className="p-6 bg-white shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Success Metrics Summary</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-600 mb-1">Average Graduation Rate</h4>
              <p className="text-lg font-semibold">{averages.graduationRate}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-600 mb-1">Average Employment Rate</h4>
              <p className="text-lg font-semibold">{averages.employmentRate}%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm text-gray-600 mb-1">Average Starting Salary</h4>
              <p className="text-lg font-semibold">${averages.startingSalary.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  };
  // Part 7: Main Component Render Function
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-xl font-bold text-gray-800">Calgary Academic Excellence</span>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">About Us</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">SAT Resources</a>
              <a href="#" className="text-gray-600 hover:text-gray-800">Blog</a>
              <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">College Predictor</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container mx-auto py-20 px-4"> {/* Added top padding to account for fixed nav */}
        {/* Header Card */}
        <Card className="mb-8 bg-white shadow-lg">
          <div className="text-center p-6">
            <h1 className="text-3xl font-bold text-gray-800">Enhanced College Predictor</h1>
            <p className="text-gray-600 mt-2">
              Find your best-fit colleges based on academic profile and success metrics
            </p>
          </div>
        </Card>

        {/* Section Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setActiveSection('input')}
            className={`flex items-center gap-2 transition-all duration-200 ${
              activeSection === 'input' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={loading}
          >
            <School className="h-4 w-4" />
            Profile Input
          </Button>
          <Button
            onClick={() => setActiveSection('results')}
            className={`flex items-center gap-2 transition-all duration-200 ${
              activeSection === 'results' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={loading || !results.Target}
          >
            <Trophy className="h-4 w-4" />
            College Matches
          </Button>
          <Button
            onClick={() => setActiveSection('analysis')}
            className={`flex items-center gap-2 transition-all duration-200 ${
              activeSection === 'analysis' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={loading || !results.Target}
          >
            <TrendingUp className="h-4 w-4" />
            Analysis
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Processing your request...</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Dynamic Content Section */}
        {!loading && (
          <div className="transition-all duration-300">
            {activeSection === 'input' && renderInputSection()}
            {activeSection === 'results' && renderResultsSection()}
            {activeSection === 'analysis' && renderAnalysisSection()}
          </div>
        )}

        {/* Footer Information */}
        <div className="mt-8 text-sm text-gray-600 text-center">
          <p>
            This enhanced college predictor provides recommendations based on your academic profile,
            program preferences, and success metrics. Results are for guidance only.
          </p>
        </div>
      </div>
    </div>
  );
};

// Final export
export default CollegePredictor;
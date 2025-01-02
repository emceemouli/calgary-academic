// Part 1: Imports and Initial Setup
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { School, Trophy, TrendingUp, GraduationCap } from 'lucide-react';
import * as XLSX from 'xlsx';

const CollegePredictor = () => {
  const navigate = useNavigate();
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
  const [isMobile, setIsMobile] = useState(false);
  // Constants for scoring and matching calculations
  const MATCH_THRESHOLDS = {
    SAFETY: 0.8,    // 80% match or higher for safety schools
    TARGET: 0.6,    // 60-79% match for target schools
    REACH: 0.3      // 30-59% match for reach schools
  };

  const WEIGHTS = {
    GPA: 0.3,       // 30% weight for GPA
    SAT: 0.3,       // 30% weight for SAT scores
    PROGRAM: 0.2,   // 20% weight for program match
    METRICS: 0.2    // 20% weight for success metrics
  };

  // Data structure for organizing majors by category
  const majorCategories = {
    "Arts & Humanities": [
      "Art History",
      "English",
      "History",
      "Literature",
      "Music",
      "Philosophy",
      "Theater Arts"
    ],
    "STEM Fields": [
      "Computer Science",
      "Engineering",
      "Mathematics",
      "Physics",
      "Biology",
      "Chemistry"
    ],
    "Business & Economics": [
      "Business Administration",
      "Economics",
      "Finance",
      "Marketing",
      "Management",
      "Accounting"
    ],
    "Social Sciences": [
      "Psychology",
      "Sociology",
      "Political Science",
      "Communications",
      "Anthropology"
    ],
    "Health Sciences": [
      "Nursing",
      "Public Health",
      "Pre-Medicine",
      "Health Administration"
    ]
  };

  // Mobile detection effect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Data loading effect
  useEffect(() => {
    const loadCollegeData = async () => {
      try {
        const response = await fetch('/excel/collegerankings.xlsx');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
          type: 'array',
          cellDates: true,
          cellStyles: true,
          cellNF: true,
          cellFormula: true
        });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        const processedData = rawData.map(college => ({
          University: college.University || college.university || '',
          Rank: college.Rank || college.rank || 0,
          GPA_Range: college.GPA_Range || college.gpa_range || '0-4',
          SAT_Range: college.SAT_Range || college.sat_range || '400-1600',
          Program_Strengths: college.Program_Strengths || college.program_strengths || '',
          Graduation_Rate: parseFloat(college.Graduation_Rate || college.graduation_rate || 0),
          Employment_Rate: parseFloat(college.Employment_Rate || college.employment_rate || 0),
          Starting_Salary: parseFloat(college.Starting_Salary || college.starting_salary || 0)
        }));

        setCollegeData(processedData);
        setError(null);
      } catch (error) {
        console.error("Error loading college data:", error);
        setError("Unable to load college rankings data. Please try again.");
      }
    };

    loadCollegeData();
  }, []);
  // Matching algorithm functions
  const calculateMatch = (studentProfile, university) => {
    const gpaMatch = calculateGPAMatch(studentProfile.gpa, university.GPA_Range);
    const satMatch = calculateSATMatch(studentProfile.sat, university.SAT_Range);
    const programMatch = calculateProgramMatch(studentProfile.desiredMajor, university.Program_Strengths);
    const metricsMatch = calculateMetricsMatch(university);

    return {
      overall: (
        gpaMatch * WEIGHTS.GPA +
        satMatch * WEIGHTS.SAT +
        programMatch * WEIGHTS.PROGRAM +
        metricsMatch * WEIGHTS.METRICS
      ),
      details: {
        academic: (gpaMatch + satMatch) / 2,
        program: programMatch,
        metrics: metricsMatch
      }
    };
  };

  const calculateGPAMatch = (studentGpa, rangeString) => {
    if (!rangeString || !studentGpa) return 0.5;

    try {
      const [minGPA, maxGPA] = rangeString.split('-').map(Number);
      const gpa = parseFloat(studentGpa);

      if (isNaN(gpa) || isNaN(minGPA) || isNaN(maxGPA)) return 0.5;

      if (gpa >= maxGPA) return 1;
      if (gpa < minGPA) return 0;
      return (gpa - minGPA) / (maxGPA - minGPA);
    } catch (error) {
      console.error("Error calculating GPA match:", error);
      return 0.5;
    }
  };

  const calculateSATMatch = (studentSat, rangeString) => {
    if (!rangeString || !studentSat) return 0.5;

    try {
      const [minSAT, maxSAT] = rangeString.split('-').map(Number);
      const sat = parseInt(studentSat);

      if (isNaN(sat) || isNaN(minSAT) || isNaN(maxSAT)) return 0.5;

      if (sat >= maxSAT) return 1;
      if (sat < minSAT) return 0;
      return (sat - minSAT) / (maxSAT - minSAT);
    } catch (error) {
      console.error("Error calculating SAT match:", error);
      return 0.5;
    }
  };

  const calculateProgramMatch = (desiredMajor, programStrengths) => {
    if (!desiredMajor || !programStrengths) return 0.5;

    try {
      const programs = programStrengths.toLowerCase().split(',').map(p => p.trim());
      const major = desiredMajor.toLowerCase().trim();

      if (programs.includes(major)) return 1;

      const majorCategory = Object.entries(majorCategories)
        .find(([_, majors]) => 
          majors.map(m => m.toLowerCase()).includes(major)
        )?.[0];

      if (majorCategory) {
        const relatedMajors = majorCategories[majorCategory]
          .map(m => m.toLowerCase());

        const hasRelatedProgram = programs.some(program => 
          relatedMajors.includes(program)
        );

        if (hasRelatedProgram) return 0.75;
      }

      return 0.5;
    } catch (error) {
      console.error("Error calculating program match:", error);
      return 0.5;
    }
  };

  const calculateMetricsMatch = (university) => {
    try {
      const graduationRate = parseFloat(university.Graduation_Rate) / 100;
      const employmentRate = parseFloat(university.Employment_Rate) / 100;
      const startingSalary = Math.min(
        parseFloat(university.Starting_Salary) / 100000, 
        1
      );

      const validGrad = !isNaN(graduationRate) ? graduationRate : 0;
      const validEmp = !isNaN(employmentRate) ? employmentRate : 0;
      const validSal = !isNaN(startingSalary) ? startingSalary : 0;

      return (
        validGrad * 0.4 +
        validEmp * 0.3 +
        validSal * 0.3
      );
    } catch (error) {
      console.error("Error calculating metrics match:", error);
      return 0.5;
    }
  };
  // Prediction handler
  const handlePrediction = async () => {
    if (!studentProfile.gpa || !studentProfile.sat) {
      setError("Please enter both GPA and SAT scores to continue");
      return;
    }

    if (!collegeData || collegeData.length === 0) {
      setError("College data is not yet loaded. Please wait or refresh the page");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const processedResults = { 
        Reach: [], 
        Target: [], 
        Safety: [] 
      };

      const matches = collegeData.map(university => ({
        university,
        matchScore: calculateMatch(studentProfile, university)
      }));

      matches.sort((a, b) => b.matchScore.overall - a.matchScore.overall);

      matches.forEach(({ university, matchScore }) => {
        if (matchScore.overall >= MATCH_THRESHOLDS.SAFETY) {
          processedResults.Safety.push({ ...university, matchScore });
        } else if (matchScore.overall >= MATCH_THRESHOLDS.TARGET) {
          processedResults.Target.push({ ...university, matchScore });
        } else if (matchScore.overall >= MATCH_THRESHOLDS.REACH) {
          processedResults.Reach.push({ ...university, matchScore });
        }
      });

      Object.keys(processedResults).forEach(category => {
        processedResults[category] = processedResults[category].slice(0, 5);
      });

      setResults(processedResults);
      setActiveSection('results');

    } catch (error) {
      console.error("Error:", error);
      setError("Error processing college matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Input section renderer
const renderInputSection = () => (
  <Card className="p-6 bg-white shadow-lg">
    <div className="grid md:grid-cols-2 gap-8">
      {/* Academic Profile */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Academic Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GPA (0.0 - 4.0)
            </label>
            <input
              type="number"
              value={studentProfile.gpa}
              onChange={(e) => setStudentProfile(prev => ({
                ...prev,
                gpa: e.target.value
              }))}
              placeholder="Enter your GPA (e.g., 3.8)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              step="0.01"
              min="0"
              max="4.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SAT Score (400 - 1600)
            </label>
            <input
              type="number"
              value={studentProfile.sat}
              onChange={(e) => setStudentProfile(prev => ({
                ...prev,
                sat: e.target.value
              }))}
              placeholder="Enter your SAT score (e.g., 1400)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              step="10"
              min="400"
              max="1600"
            />
          </div>
        </div>
      </div>

      {/* Program Selection */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Program Interests</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desired Major
          </label>
          <select
            value={studentProfile.desiredMajor}
            onChange={(e) => setStudentProfile(prev => ({
              ...prev,
              desiredMajor: e.target.value
            }))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your intended major</option>
            {Object.entries(majorCategories).map(([category, majors]) => (
              <optgroup key={category} label={category}>
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
    </div>

    {/* Removed Advanced Options Section */}

    {/* Action Buttons */}
    <div className="mt-6 flex flex-col sm:flex-row justify-end items-center gap-4">
      <Button
        onClick={handlePrediction}
        disabled={loading}
        className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Find Matches'}
      </Button>
    </div>
  </Card>
);
  // Results section renderer
  const renderResultsSection = () => (
    <div className="space-y-6">
      {/* Results Introduction */}
      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your College Matches</h2>
        <p className="text-gray-600 mb-4">
          Based on your academic profile, we've categorized colleges into three groups:
          Reach, Target, and Safety schools. Here are your personalized matches:
        </p>
      </Card>

      {/* Results Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {['Reach', 'Target', 'Safety'].map((category) => (
          <Card key={category} className="p-6 bg-white shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{category} Schools</h3>
              <p className="text-sm text-gray-600 mt-1">
                {category === 'Reach' && 'Ambitious options that may be challenging to get into'}
                {category === 'Target' && 'Schools that match well with your profile'}
                {category === 'Safety' && 'Schools where you have a strong chance of acceptance'}
              </p>
            </div>

            <div className="space-y-4">
              {results[category]?.map((college, index) => (
                <div key={index} className={`p-4 rounded-lg border 
                  ${category === 'Reach' ? 'border-red-200 bg-red-50' :
                    category === 'Target' ? 'border-blue-200 bg-blue-50' :
                    'border-green-200 bg-green-50'}
                  hover:shadow-lg transition-all duration-300`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{college.University}</h4>
                    <span className="text-sm text-gray-500">#{college.Rank}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Match Score:</span>
                      <br />
                      <span className={`font-semibold 
                        ${category === 'Reach' ? 'text-red-600' :
                          category === 'Target' ? 'text-blue-600' :
                          'text-green-600'}`}>
                        {Math.round(college.matchScore.overall * 100)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Program Match:</span>
                      <br />
                      <span className="font-semibold text-green-600">
                        {college.matchScore.details.program >= 0.8 ? 'High' : 
                         college.matchScore.details.program >= 0.5 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 text-xs grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-gray-600">Graduation:</span>
                      <br />
                      <span className="font-medium">{college.Graduation_Rate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Employment:</span>
                      <br />
                      <span className="font-medium">{college.Employment_Rate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Starting Salary:</span>
                      <br />
                      <span className="font-medium">${college.Starting_Salary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              {(!results[category] || results[category].length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <School className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No {category.toLowerCase()} schools found</p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Analysis section renderer
    const renderAnalysisSection = () => {
    const calculateAverages = () => {
      if (!results.Target?.[0]) return {};
      const totals = results.Target.reduce(
        (acc, college) => ({
          acceptanceRate: acc.acceptanceRate + parseFloat(college.Acceptance_Rate),
          ranking: acc.ranking + parseInt(college.Ranking),
          graduationRate: acc.graduationRate + parseFloat(college.Graduation_Rate),
          startingSalary: acc.startingSalary + parseInt(college.Starting_Salary),
        }),
        { acceptanceRate: 0, ranking: 0, graduationRate: 0, startingSalary: 0 }
      );
      const averages = {
        acceptanceRate: (totals.acceptanceRate / results.Target.length).toFixed(2),
        ranking: Math.round(totals.ranking / results.Target.length),
        graduationRate: (totals.graduationRate / results.Target.length).toFixed(2), // Corrected calculation
        startingSalary: Math.round(totals.startingSalary / results.Target.length),
        gpa: (totals.gpa / results.Target.length).toFixed(2),
        sat: Math.round(totals.sat / results.Target.length),
      };
      return averages;
    };

    const getBarDataGPA = () => {
      if (!results.Target?.[0]) return [];
      const college = results.Target[0];
      const userGPA = parseFloat(studentProfile.gpa);
      const [minGPA, maxGPA] = college.GPA_Range.split('-').map(Number);
      const avgGPA = (minGPA + maxGPA) / 2;
      return [
        { name: 'Your GPA', value: userGPA, fill: userGPA >= avgGPA ? '#82ca9d' : '#f4a460' },
        { name: 'Average GPA', value: avgGPA, fill: '#8884d8' },
      ];
    };

    const getBarDataSAT = () => {
      if (!results.Target?.[0]) return [];
      const college = results.Target[0];
      const userSAT = parseInt(studentProfile.sat);
      const [minSAT, maxSAT] = college.SAT_Range.split('-').map(Number);
      const avgSAT = (minSAT + maxSAT) / 2;
      return [
        { name: 'Your SAT', value: userSAT, fill: userSAT >= avgSAT ? '#82ca9d' : '#f4a460' },
        { name: 'Average SAT', value: avgSAT, fill: '#8884d8' },
      ];
    };

    const averages = calculateAverages();

    return (
    <div className="space-y-8">
      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          Your College Match Profile
        </h3>
        <p className="text-gray-600">
          Based on your profile, we've analyzed your potential fit with various
          universities. Here's a breakdown of your predicted match with your
          target colleges:
        </p>
      </Card>

      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Your Scores Compared to Others
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getBarDataGPA()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getBarDataSAT()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
          What to Expect After Graduation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>
              Average Graduation Rate: {averages.graduationRate}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-red-500" />
            <span>
              Average Starting Salary: $
              {averages.startingSalary.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Key Takeaways</h3>
<ul className="list-disc pl-6 text-lg text-gray-800">
  {results.Target.length > 0 &&
  parseFloat(studentProfile.gpa) >=
    (parseFloat(results.Target[0].GPA_Range.split('-')[0]) + parseFloat(results.Target[0].GPA_Range.split('-')[1])) / 2 ? ( // Corrected average GPA calculation
    <li>Your GPA is a strong point!</li>
  ) : (
    <li>
      Your GPA is a bit lower than the average for your target schools. Consider
      ways to improve your GPA or explore schools with slightly lower GPA
      requirements.
    </li>
  )}
  {results.Target.length > 0 &&
  parseInt(studentProfile.sat) >=
    (parseInt(results.Target[0].SAT_Range.split('-')[0]) + parseInt(results.Target[0].SAT_Range.split('-')[1])) / 2 ? ( // Corrected average SAT calculation
    <li>Your SAT score is competitive for these colleges.</li>
  ) : (
    <li>
      Your SAT score is a bit low for some of your target schools. Consider
      retaking the SAT or exploring colleges with lower score requirements.
    </li>
  )}
          {studentProfile.major && results.Target.length > 0 ? (
            <li>
              {results.Target.some(
                (college) =>
                  college.Program_Strengths.includes(studentProfile.major) ||
                  Object.keys(majorCategories).some((category) =>
                    majorCategories[category].includes(studentProfile.major) &&
                    college.Program_Strengths.includes(category)
                  )
              ) ? (
                `Your chosen major in ${studentProfile.major} aligns well with the program strengths of your top-matched colleges.`
              ) : (
                `Consider exploring colleges with stronger programs in ${studentProfile.major}.`
              )}
            </li>
          ) : null}
          {/* Add more insights based on other factors like location, etc. */}
        </ul>
      </Card>
    </div>
  );
};

 
return (
  <div className="container mx-auto py-8 px-4">
    {/* Hero Section */}
    <header className="relative h-[250px] pt-16 mb-8">
      <img
        src="/images/Teen-Area-12-23-Hero.jpg"
        alt="College Predictor"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/75" />
      <div className="relative flex justify-center items-center h-full text-white">
        <h1 className="text-4xl font-bold">College Predictor</h1>
      </div>
    </header>

    {/* Main Content */}
    <div className="max-w-6xl mx-auto">
      {/* Description Card */}
      <Card className="mb-8 bg-white shadow-lg">
        <div className="text-center p-6">
          <p className="text-gray-600 text-lg">
            Find your best-fit colleges based on academic profile and success metrics
          </p>
        </div>
      </Card>

      {/* Section Navigation */}
      {/* Section Navigation */}
<div className="flex justify-center gap-4 mb-8">
  <Button
    onClick={() => setActiveSection('input')}
    className={`flex items-center gap-2 ${
      activeSection === 'input' 
        ? 'bg-blue-600 text-white' 
        : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
    }`}
  >
    <School className="h-4 w-4" />
    <span className="hidden sm:inline">Profile Input</span>
    <span className="sm:hidden">Input</span>
  </Button>
  
  <Button
    onClick={() => setActiveSection('results')}
    className={`flex items-center gap-2 ${
      activeSection === 'results' 
        ? 'bg-blue-600 text-white' 
        : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
    }`}
    disabled={!results.Target?.length}
  >
    <Trophy className="h-4 w-4" />
    <span className="hidden sm:inline">College Matches</span>
    <span className="sm:hidden">Matches</span>
  </Button>
  
  <Button
    onClick={() => setActiveSection('analysis')}
    className={`flex items-center gap-2 ${
      activeSection === 'analysis' 
        ? 'bg-blue-600 text-white' 
        : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
    }`}
    disabled={!results.Target?.length}
  >
    <TrendingUp className="h-4 w-4" />
    <span className="hidden sm:inline">Analysis</span>
    <span className="sm:hidden">Analysis</span>
  </Button>
</div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto">
          </div>
          <p className="mt-4 text-gray-600">Processing your request...</p>
        </div>
      )}

      {/* Main Content Section */}
      {!loading && (
        <div className="transition-all duration-300">
          {activeSection === 'input' && renderInputSection()}
          {activeSection === 'results' && renderResultsSection()}
          {activeSection === 'analysis' && renderAnalysisSection()}
        </div>
      )}

      {/* Footer Information */}
      <div className="mt-8 text-sm text-gray-600 text-center">
        <p className="max-w-2xl mx-auto">
          This college predictor provides recommendations based on your academic profile,
          program preferences, and success metrics. Results are for guidance only.
        </p>
      </div>
    </div>
  </div>
);
};

export default CollegePredictor;
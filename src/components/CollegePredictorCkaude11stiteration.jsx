import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const CollegePredictor = () => {
  const [gpa, setGpa] = useState("");
  const [sat, setSat] = useState("");
  const [results, setResults] = useState({ Reach: [], Target: [], Safety: [] });

  useEffect(() => {
    document.title = "College Predictor | Calgary Academic Excellence";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      'Predict your college admission chances with our advanced college predictor tool. ' +
      'Enter your GPA and SAT scores to get personalized recommendations for reach, target, and safety schools.'
    );

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'college predictor, university admissions, college chances calculator, ' +
      'GPA calculator, SAT score predictor, college planning tool, university prediction'
    );

    const ogTags = {
      'og:title': 'College Predictor | Find Your Best-Fit Schools',
      'og:description': 'Get personalized college recommendations based on your academic profile',
      'og:type': 'website',
      'og:url': window.location.href,
      'og:site_name': 'Calgary Academic Excellence'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
  }, []);

  const calculateScoreProfile = (inputGpa, inputSat) => {
    return {
      tier: calculateBaseTier(inputGpa, inputSat),
      gpaStrength: calculateGPAStrength(inputGpa),
      satStrength: calculateSATStrength(inputSat),
      overallStrength: (inputGpa / 4.0 + (inputSat / 1600)) / 2
    };
  };

  const calculateBaseTier = (inputGpa, inputSat) => {
    if (inputGpa >= 4.0 && inputSat >= 1550) return 6;      // Exceptional
    else if (inputGpa >= 3.9 && inputSat >= 1500) return 5; // Outstanding
    else if (inputGpa >= 3.7 && inputSat >= 1400) return 4; // Excellent
    else if (inputGpa >= 3.5 && inputSat >= 1300) return 3; // Very Good
    else if (inputGpa >= 3.2 && inputSat >= 1200) return 2; // Good
    return 1; // Base tier
  };

  const calculateGPAStrength = (gpa) => {
    if (gpa >= 4.0) return 5;
    if (gpa >= 3.8) return 4;
    if (gpa >= 3.5) return 3;
    if (gpa >= 3.2) return 2;
    return 1;
  };

  const calculateSATStrength = (sat) => {
    if (sat >= 1550) return 5;
    if (sat >= 1500) return 4;
    if (sat >= 1400) return 3;
    if (sat >= 1300) return 2;
    return 1;
  };

  const parseRange = (range) => {
    if (!range || !range.includes("-")) return { min: 0, max: 0 };
    const [min, max] = range.split("-").map((num) => parseFloat(num.trim()));
    return { min, max };
  };

  const parseAcceptanceRate = (rate) => {
    if (typeof rate === "string") {
      return parseFloat(rate.replace("%", "")) / 100;
    } else if (typeof rate === "number") {
      return rate < 1 ? rate : rate / 100;
    }
    return 0;
  };

  const classifySchool = (
    inputGpa,
    inputSat,
    gpaRange,
    satRange,
    acceptanceRate,
    rank,
    scoreProfile
  ) => {
    const gpaGap = gpaRange.min - inputGpa;
    const satGap = satRange.min - inputSat;

    const isOutOfRange = () => {
      return (
        gpaGap > 0.5 ||
        satGap > 200 ||
        (rank <= 30 && inputGpa < 3.5)
      );
    };

    const isWithinRange = () => {
      return (
        inputGpa >= (gpaRange.min - 0.2) &&
        inputGpa <= (gpaRange.max + 0.3) &&
        inputSat >= (satRange.min - 100) &&
        inputSat <= (satRange.max + 150)
      );
    };

    const isStrongMatch = () => {
      return (
        Math.abs(inputGpa - gpaRange.min) <= 0.3 &&
        Math.abs(inputSat - satRange.min) <= 100
      );
    };

    const isSafetySchool = () => {
        const meetsBasicSafety = (
            inputGpa >= gpaRange.min + 0.2 &&
            inputSat >= satRange.min + 50
        );

        const scoreBasedSafety = (
            inputGpa >= gpaRange.max ||
            inputSat >= satRange.max ||
            (inputGpa >= gpaRange.min + 0.3 && inputSat >= satRange.min + 100)
        );

        const acceptanceRateThreshold = scoreProfile.tier >= 4 ? 0.6 : 0.7;
        
        return (
            (meetsBasicSafety && acceptanceRate > 0.5) ||
            (scoreBasedSafety && acceptanceRate > 0.4) ||
            (acceptanceRate > acceptanceRateThreshold) ||
            (rank > 150 && meetsBasicSafety) ||
            (scoreProfile.tier >= 4 && rank > 100 && acceptanceRate > 0.4)
        );
    };

    if (isOutOfRange() && rank <= 50) {
      return null;
    }

    // Safety School Classification
    if (isSafetySchool()) {
      if (rank <= 30) return null;
      return 'Safety';
    }

    // Target School Classification
    if (
      (isWithinRange() || isStrongMatch()) &&
      (
        (acceptanceRate >= 0.2 && acceptanceRate <= 0.6) ||
        (rank > 30 && rank <= 100 && isStrongMatch()) ||
        (rank > 20 && acceptanceRate >= 0.15 && isWithinRange()) ||
        (scoreProfile.tier >= 4 && rank > 30 && rank <= 80) ||
        (acceptanceRate >= 0.25 && acceptanceRate <= 0.65 && isStrongMatch())
      )
    ) {
      return 'Target';
    }

    // Reach School Classification
    if (
      !isOutOfRange() &&
      (
        (rank <= 20) ||
        (rank <= 30 && !isStrongMatch()) ||
        (rank <= 50 && acceptanceRate < 0.15) ||
        (acceptanceRate < 0.2 && !isStrongMatch())
      )
    ) {
      return 'Reach';
    }

    return null;
  };

  const handlePrediction = async () => {
    if (!gpa || !sat) {
      alert("Please enter both GPA and SAT scores.");
      return;
    }

    try {
      const response = await fetch("/excel/collegerankings.xlsx");
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const processedResults = { Reach: [], Target: [], Safety: [] };
      const inputGpa = parseFloat(gpa);
      const inputSat = parseInt(sat);
      const scoreProfile = calculateScoreProfile(inputGpa, inputSat);

      const classifications = [];
      const sortedSchools = jsonData.sort((a, b) => (a.Rank || 999) - (b.Rank || 999));

      sortedSchools.forEach(row => {
        const gpaRange = parseRange(row.GPA_Range);
        const satRange = parseRange(row.SAT_Range);
        const acceptanceRate = parseAcceptanceRate(row.Acceptance_Rate);
        const rank = parseInt(row.Rank) || 999;

        console.log(`Analyzing ${row.University}:`, {
          gpaRange,
          satRange,
          acceptanceRate,
          rank
        });

        const classification = classifySchool(
          inputGpa,
          inputSat,
          gpaRange,
          satRange,
          acceptanceRate,
          rank,
          scoreProfile
        );

        if (classification) {
          classifications.push({
            university: row.University,
            classification,
            rank,
            acceptanceRate,
            gpaRange,
            satRange
          });
        }
      });

      ['Reach', 'Target', 'Safety'].forEach(category => {
        const schoolsInCategory = classifications
          .filter(c => c.classification === category)
          .sort((a, b) => {
            if (category === 'Safety') {
              const getSchoolScore = (school) => {
                const rankScore = Math.max(0, 200 - school.rank) / 200;
                const acceptanceScore = school.acceptanceRate;
                const matchScore = Math.min(
                  1,
                  (inputGpa - school.gpaRange.min) / 0.5 +
                  (inputSat - school.satRange.min) / 200
                );
                return rankScore * 0.4 + acceptanceScore * 0.3 + matchScore * 0.3;
              };
              return getSchoolScore(b) - getSchoolScore(a);
            } else if (category === 'Reach') {
              const aGapTotal = Math.abs(a.gpaRange.min - inputGpa) + Math.abs(a.satRange.min - inputSat)/800;
              const bGapTotal = Math.abs(b.gpaRange.min - inputGpa) + Math.abs(b.satRange.min - inputSat)/800;
              return aGapTotal - bGapTotal;
            } else {
              const aScore = (a.rank / 100) + (1 - a.acceptanceRate);
              const bScore = (b.rank / 100) + (1 - b.acceptanceRate);
              return aScore - bScore;
            }
          })
          .slice(0, 5);

        processedResults[category] = schoolsInCategory.map(s => s.university);
      });

      // Ensure diversity in safety schools
      if (processedResults.Safety.length > 0) {
        const existingSafeties = new Set(processedResults.Safety);
        const additionalSafeties = classifications
          .filter(c => 
            c.classification === 'Safety' &&
            !existingSafeties.has(c.university) &&
            c.rank > Math.max(...classifications
              .filter(s => existingSafeties.has(s.university))
              .map(s => s.rank)
            )
          )
          .slice(0, 2);

        if (additionalSafeties.length > 0) {
          processedResults.Safety = [
            ...processedResults.Safety.slice(0, 3),
            ...additionalSafeties.map(s => s.university)
          ].slice(0, 5);
        }
      }

      // Handle cases with few target schools
      if (processedResults.Target.length < 3 && processedResults.Safety.length > 3) {
        const potentialTargets = classifications
          .filter(c => 
            c.classification === 'Safety' && 
            c.rank <= 100 &&
            c.acceptanceRate <= 0.7
          )
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 2);

        processedResults.Target = [
          ...processedResults.Target,
          ...potentialTargets.map(s => s.university)
        ].slice(0, 5);

        processedResults.Safety = processedResults.Safety
          .filter(school => !potentialTargets.find(s => s.university === school));
      }

      setResults(processedResults);
      console.log("Final Results:", processedResults);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 bg-white shadow rounded-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">College Predictor</h1>
      <div className="space-y-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter GPA (e.g., 3.8)"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          aria-label="GPA Input"
        />
        <input
          type="text"
          placeholder="Enter SAT (e.g., 1400)"
          value={sat}
          onChange={(e) => setSat(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          aria-label="SAT Score Input"
        />
        <button
          onClick={handlePrediction}
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-md hover:bg-blue-700 transition"
          aria-label="Predict Colleges"
        >
          Predict Colleges
        </button>
      </div>
      {results && (
        <div className="mt-12 max-w-2xl mx-auto bg-gray-50 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-orange-600">Reach Colleges:</h3>
              <ul className="list-disc pl-5 text-gray-700">
               {results.Reach.length
                  ? results.Reach.map((college, index) => <li key={index}>{college}</li>)
                  : <li>No colleges found</li>}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Target Colleges:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {results.Target.length
                  ? results.Target.map((college, index) => <li key={index}>{college}</li>)
                  : <li>No colleges found</li>}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-green-600">Safety Colleges:</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {results.Safety.length
                  ? results.Safety.map((college, index) => <li key={index}>{college}</li>)
                  : <li>No colleges found</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 text-sm text-gray-600 text-center">
        <p>
          This tool provides predictions based on your SAT, GPA, and school data compared to
          historical admission data. Results are only a guideline and are not guaranteed.
        </p>
      </div>
    </div>
  );
};

export default CollegePredictor;

import React, { useState } from "react";
import * as XLSX from "xlsx";

const CollegePredictor = () => {
  const [gpa, setGpa] = useState("");
  const [sat, setSat] = useState("");
  const [results, setResults] = useState({ Reach: [], Target: [], Safety: [] });

  const calculateScorePercentile = (score, min, max) => {
    return (score - min) / (max - min);
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

      const sortedSchools = jsonData.sort((a, b) => (a.Rank || 999) - (b.Rank || 999));

      sortedSchools.forEach((row) => {
        const gpaRange = parseRange(row.GPA_Range);
        const satRange = parseRange(row.SAT_Range);
        const acceptanceRate = parseAcceptanceRate(row.Acceptance_Rate);
        const rank = parseInt(row.Rank) || 999;

        const gpaPercentile = calculateScorePercentile(inputGpa, gpaRange.min, gpaRange.max);
        const satPercentile = calculateScorePercentile(inputSat, satRange.min, satRange.max);
        
        const academicStrength = (gpaPercentile + satPercentile) / 2;
        
        const classification = classifySchool(
          academicStrength, 
          inputGpa,
          inputSat,
          gpaRange,
          satRange,
          acceptanceRate,
          rank
        );

        if (classification === 'reach' && processedResults.Reach.length < 5) {
          processedResults.Reach.push(row.University);
          console.log(`Reach: ${row.University} (Rank: ${rank}, Academic Strength: ${academicStrength.toFixed(2)})`);
        } else if (classification === 'target' && processedResults.Target.length < 5) {
          processedResults.Target.push(row.University);
          console.log(`Target: ${row.University} (Rank: ${rank}, Academic Strength: ${academicStrength.toFixed(2)})`);
        } else if (classification === 'safety' && processedResults.Safety.length < 5) {
          processedResults.Safety.push(row.University);
          console.log(`Safety: ${row.University} (Rank: ${rank}, Academic Strength: ${academicStrength.toFixed(2)})`);
        }
      });

      setResults(processedResults);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const classifySchool = (
    academicStrength,
    inputGpa,
    inputSat,
    gpaRange,
    satRange,
    acceptanceRate,
    rank
  ) => {
    // Top 20 schools have special handling
    if (rank <= 20) {
      if (acceptanceRate < 0.1) {
        return 'reach'; // Always reach for extremely selective schools
      }
      if (academicStrength < 0.8) {
        return null; // Don't recommend if stats are too low
      }
    }

    // GPA and SAT thresholds
    const gpaThreshold = 0.2;
    const satThreshold = 100;
    const gpaGap = gpaRange.min - inputGpa;
    const satGap = satRange.min - inputSat;

    // Reach classification
    if (
      (gpaGap > 0 && gpaGap <= gpaThreshold) ||
      (satGap > 0 && satGap <= satThreshold) ||
      (rank <= 50 && acceptanceRate < 0.15) ||
      (academicStrength < 0.4 && rank <= 100)
    ) {
      return 'reach';
    }

    // Safety classification
    if (
      inputGpa >= gpaRange.max &&
      inputSat >= satRange.max &&
      acceptanceRate > 0.6
    ) {
      return 'safety';
    }

    // Target classification
    if (
      inputGpa >= gpaRange.min &&
      inputSat >= satRange.min &&
      acceptanceRate >= 0.2
    ) {
      return 'target';
    }

    return null;
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

  // JSX remains the same
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
        />
        <input
          type="text"
          placeholder="Enter SAT (e.g., 1400)"
          value={sat}
          onChange={(e) => setSat(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePrediction}
          className="w-full bg-blue-600 text-white font-semibold py-4 rounded-md hover:bg-blue-700 transition"
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
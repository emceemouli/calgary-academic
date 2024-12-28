import React, { useState } from "react";
import Papa from "papaparse";

const CollegePredictor = () => {
  const [gpa, setGpa] = useState("");
  const [sat, setSat] = useState("");
  const [results, setResults] = useState({ Reach: [], Target: [], Safety: [] });

  const handlePrediction = async () => {
    console.log("Starting prediction...");

    if (!gpa || !sat) {
      alert("Please enter both GPA and SAT scores.");
      return;
    }

    try {
      const response = await fetch("/csv/collegerankings.csv");
      const data = await response.text();
      const jsonData = Papa.parse(data, { header: true }).data;

      console.log("Loaded Data:", jsonData);

      const processedResults = { Reach: [], Target: [], Safety: [] };

jsonData.forEach((row) => {
    if (!row.GPA_Range || !row.SAT_Range || row.Acceptance_Rate == null) {
        console.warn(`Skipping row due to missing data: ${row}`);
        return;
    }

    const gpaRange = parseRange(row.GPA_Range);
    const satRange = parseRange(row.SAT_Range);

    // Scale acceptance rate correctly to match thresholds
    let acceptanceRate = parseFloat(row.Acceptance_Rate) * 100; // Convert to percentage

    if (isNaN(acceptanceRate) || acceptanceRate < 0 || acceptanceRate > 100) {
        console.warn(`Invalid acceptance rate for ${row.University}`);
        return;
    }

    console.log(`University: ${row.University}`);
    console.log("GPA Range:", gpaRange, "SAT Range:", satRange, "Acceptance Rate (scaled):", acceptanceRate);

    const inputGpa = parseFloat(gpa);
    const inputSat = parseInt(sat);

    // Classify Reach
    if (
        inputSat < satRange.min ||
        inputGpa < gpaRange.min ||
        acceptanceRate < 20 // Acceptance rate < 20%
    ) {
        if (processedResults.Reach.length < 5) {
            processedResults.Reach.push(row.University);
            console.log(`Classified as Reach: ${row.University}`);
        }
    }
    // Classify Target
    else if (
        inputSat >= satRange.min &&
        inputSat <= satRange.max &&
        inputGpa >= gpaRange.min &&
        inputGpa <= gpaRange.max &&
        acceptanceRate >= 20 &&
        acceptanceRate <= 50 // 20% <= Acceptance rate <= 50%
    ) {
        if (processedResults.Target.length < 5) {
            processedResults.Target.push(row.University);
            console.log(`Classified as Target: ${row.University}`);
        }
    }
    // Classify Safety
    else if (
        inputSat > satRange.max &&
        inputGpa > gpaRange.max &&
        acceptanceRate > 50 // Acceptance rate > 50%
    ) {
        if (processedResults.Safety.length < 5) {
            processedResults.Safety.push(row.University);
            console.log(`Classified as Safety: ${row.University}`);
        }
    }
});




      console.log("Final Results:", processedResults);
      setResults(processedResults);
    } catch (error) {
      console.error("Error loading or processing CSV file:", error);
    }
  };

  const parseRange = (range) => {
    if (!range || !range.includes("-")) return { min: 0, max: 0 };
    const [min, max] = range.split("-").map((value) => parseFloat(value.trim()));
    if (isNaN(min) || isNaN(max)) return { min: 0, max: 0 };
    return { min, max };
  };

  return (
    <div className="container mx-auto py-16 px-4 bg-white shadow rounded-md">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">College Predictor</h1>
      <div className="space-y-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter SAT"
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

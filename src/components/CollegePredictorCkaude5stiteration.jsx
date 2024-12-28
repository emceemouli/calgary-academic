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

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "College Predictor Tool",
      "applicationCategory": "EducationalApplication",
      "browserRequirements": "Requires JavaScript",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/OnlineOnly",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Tool to predict college admission chances based on GPA and SAT scores"
    };

    let scriptTag = document.querySelector('#college-predictor-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'college-predictor-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, []);

  const calculateScoreTier = (inputGpa, inputSat) => {
    let tier = 1;
    if (inputGpa >= 4.0 && inputSat >= 1500) tier = 5;
    else if (inputGpa >= 3.8 && inputSat >= 1400) tier = 4;
    else if (inputGpa >= 3.5 && inputSat >= 1300) tier = 3;
    else if (inputGpa >= 3.0 && inputSat >= 1200) tier = 2;
    return tier;
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
      const scoreTier = calculateScoreTier(inputGpa, inputSat);

      sortedSchools.forEach((row) => {
        const gpaRange = parseRange(row.GPA_Range);
        const satRange = parseRange(row.SAT_Range);
        const acceptanceRate = parseAcceptanceRate(row.Acceptance_Rate);
        const rank = parseInt(row.Rank) || 999;

        const classification = classifySchool(
          inputGpa,
          inputSat,
          gpaRange,
          satRange,
          acceptanceRate,
          rank,
          scoreTier
        );

        if (classification && processedResults[classification].length < 5) {
          processedResults[classification].push(row.University);
          console.log(`${classification}: ${row.University} (Rank: ${rank}, Score Tier: ${scoreTier})`);
        }
      });

      setResults(processedResults);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const classifySchool = (
    inputGpa,
    inputSat,
    gpaRange,
    satRange,
    acceptanceRate,
    rank,
    scoreTier
  ) => {
    const gpaGap = gpaRange.min - inputGpa;
    const satGap = satRange.min - inputSat;

    // Safety School Criteria
    if (
      inputGpa >= gpaRange.min + 0.3 &&
      inputSat >= satRange.min + 100 &&
      rank > 50 &&
      (acceptanceRate > 0.5 || (gpaGap < -0.5 && satGap < -200))
    ) {
      return 'Safety';
    }

    // Reach School Criteria
    if (
      !(scoreTier === 1 && rank <= 30) && // Prevent unrealistic reaches
      (
        (scoreTier === 2 && rank <= 50 && gpaGap < 0.3 && satGap < 100) ||
        (scoreTier === 3 && rank <= 30 && gpaGap < 0.2 && satGap < 80) ||
        (scoreTier === 4 && rank <= 20) ||
        (scoreTier === 5 && rank <= 10) ||
        (gpaGap > 0 && gpaGap < 0.3 && satGap > 0 && satGap < 100 && rank > 30) ||
        (acceptanceRate < 0.15 && rank <= 50 && scoreTier >= 3)
      )
    ) {
      return 'Reach';
    }

    // Target School Criteria
    if (
      inputGpa >= gpaRange.min - 0.1 &&
      inputSat >= satRange.min - 50 &&
      (
        (rank > 20 && acceptanceRate >= 0.15) ||
        (scoreTier >= 3 && rank > 30) ||
        (scoreTier >= 4 && rank > 20)
      )
    ) {
      return 'Target';
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
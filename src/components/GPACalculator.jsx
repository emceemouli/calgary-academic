import React, { useState, useEffect } from 'react';

function GPACalculator() {
  const [courses, setCourses] = useState([{ grade: '', credits: '' }]);
  const [gpa, setGPA] = useState(0);

  const handleGradeChange = (index, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = value;
    setCourses(updatedCourses);
  };

  const handleCreditsChange = (index, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index].credits = value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { grade: '', credits: '' }]);
  };

  const removeCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const calculateGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    courses.forEach((course) => {
      const grade = convertGradeToPoints(course.grade);
      const credits = parseFloat(course.credits);

      if (!isNaN(grade) && !isNaN(credits)) {
        totalGradePoints += grade * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      const calculatedGPA = totalGradePoints / totalCredits;
      setGPA(calculatedGPA.toFixed(2));
    } else {
      setGPA(0);
    }
  };

  const convertGradeToPoints = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 4.0;
      case 'A-':
        return 3.7;
      case 'B+':
        return 3.3;
      case 'B':
        return 3.0;
      case 'B-':
        return 2.7;
      case 'C+':
        return 2.3;
      case 'C':
        return 2.0;
      case 'C-':
        return 1.7;
      case 'D+':
        return 1.3;
      case 'D':
        return 1.0;
      case 'F':
        return 0.0;
      default:
        return NaN;
    }
  };

  useEffect(() => {
    document.title = 'GPA Calculator - Calgary Academic Excellence';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate your GPA easily with our free online GPA calculator. Plan for academic success and college admissions with Calgary Academic Excellence.');
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">GPA Calculator</h1>

      <div className="mb-4">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center mb-2">
            <select
              className="border border-gray-400 px-3 py-2 rounded mr-2"
              value={course.grade}
              onChange={(e) => handleGradeChange(index, e.target.value)}
            >
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              {/* ... other grade options ... */}
            </select>

            <input
              type="number"
              className="border border-gray-400 px-3 py-2 rounded mr-2"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) => handleCreditsChange(index, e.target.value)}
            />

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => removeCourse(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addCourse}
        >
          Add Course
        </button>
      </div>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculateGPA}
      >
        Calculate GPA
      </button>

      {gpa > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Your GPA: {gpa}</h2>
        </div>
      )}
    </div>
  );
}

export default GPACalculator;
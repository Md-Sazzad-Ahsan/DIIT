"use client";
import { useState } from 'react';

export default function CoursesForm() {
  const [batchName, setBatchName] = useState('');
  const [semesterName, setSemesterName] = useState('');
  const [courses, setCourses] = useState([{ CourseName: '', CourseCode: '', facultyId: '', totalClasses: 0 }]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleCourseChange = (index, event) => {
    const newCourses = [...courses];
    newCourses[index][event.target.name] = event.target.value;
    setCourses(newCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { CourseName: '', CourseCode: '', facultyId: '', totalClasses: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    // Ensure batchName and semesterName are provided
    if (!batchName || !semesterName) {
      setError('Batch Name and Semester Name are required.');
      return;
    }
  
    try {
      // Construct the URL with batchName and semesterName
      const response = await fetch(`/api/courses/${batchName}/${semesterName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courses }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage(result.message);
        setBatchName('');
        setSemesterName('');
        setCourses([{ CourseName: '', CourseCode: '', facultyId: '', totalClasses: 0 }]);
      } else {
        setError(result.error || 'An error occurred while adding/updating the courses');
      }
    } catch (error) {
      console.error('Error adding/updating courses:', error);
      setError('An error occurred while adding/updating the courses');
    }
  };
  

  return (
    <div className="p-4 mt-20 bg-gray-100 dark:bg-darkBg rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Add Courses</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="batchName" className="text-gray-700 dark:text-gray-300">Batch Name</label>
          <input
            id="batchName"
            type="text"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="semesterName" className="text-gray-700 dark:text-gray-300">Semester Name</label>
          <input
            id="semesterName"
            type="text"
            value={semesterName}
            onChange={(e) => setSemesterName(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>
        {courses.map((course, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-gray-800 dark:text-gray-200">Course {index + 1}</h3>
            <div className="flex flex-col">
              <label htmlFor={`CourseName_${index}`} className="text-gray-700 dark:text-gray-300">Course Name</label>
              <input
                id={`CourseName_${index}`}
                name="CourseName"
                type="text"
                value={course.CourseName}
                onChange={(e) => handleCourseChange(index, e)}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`CourseCode_${index}`} className="text-gray-700 dark:text-gray-300">Course Code</label>
              <input
                id={`CourseCode_${index}`}
                name="CourseCode"
                type="text"
                value={course.CourseCode}
                onChange={(e) => handleCourseChange(index, e)}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`facultyId_${index}`} className="text-gray-700 dark:text-gray-300">Faculty ID</label>
              <input
                id={`facultyId_${index}`}
                name="facultyId"
                type="text"
                value={course.facultyId}
                onChange={(e) => handleCourseChange(index, e)}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`totalClasses_${index}`} className="text-gray-700 dark:text-gray-300">Total Classes</label>
              <input
                id={`totalClasses_${index}`}
                name="totalClasses"
                type="number"
                value={course.totalClasses}
                onChange={(e) => handleCourseChange(index, e)}
                className="p-2 border rounded"
                min="0"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCourse}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Another Course
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
        {message && <p className="text-green-600 dark:text-green-300">{message}</p>}
        {error && <p className="text-red-600 dark:text-red-300">{error}</p>}
      </form>
    </div>
  );
}

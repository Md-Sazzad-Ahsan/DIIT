'use client';
import { useState } from 'react';

export default function SemesterForm({ batchName }) {
  const [semesterName, setSemesterName] = useState('');
  const [courses, setCourses] = useState([{ CourseName: '', CourseCode: '', totalClasses: 0 }]);
  const [message, setMessage] = useState('');

  const handleCourseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCourses = [...courses];
    updatedCourses[index][name] = value;
    setCourses(updatedCourses);
  };

  const handleAddCourse = () => {
    setCourses([...courses, { CourseName: '', CourseCode: '', totalClasses: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/courses/${batchName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ semesterName, courses }),
      });

      if (!response.ok) {
        throw new Error('Failed to add semester');
      }

      setMessage('Semester added successfully');
      setSemesterName('');
      setCourses([{ CourseName: '', CourseCode: '', totalClasses: 0 }]);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add Semester to {batchName}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={semesterName}
          onChange={(e) => setSemesterName(e.target.value)}
          placeholder="Semester Name"
          required
        />
        {courses.map((course, index) => (
          <div key={index}>
            <input
              type="text"
              name="CourseName"
              value={course.CourseName}
              onChange={(e) => handleCourseChange(index, e)}
              placeholder="Course Name"
              required
            />
            <input
              type="text"
              name="CourseCode"
              value={course.CourseCode}
              onChange={(e) => handleCourseChange(index, e)}
              placeholder="Course Code"
              required
            />
            <input
              type="number"
              name="totalClasses"
              value={course.totalClasses}
              onChange={(e) => handleCourseChange(index, e)}
              placeholder="Total Classes"
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddCourse}>Add Another Course</button>
        <button type="submit">Add Semester</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

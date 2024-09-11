'use client';
import { useState, useEffect } from 'react';

export default function CourseForm({ batchName, semesterName, course }) {
  const [courseName, setCourseName] = useState(course?.CourseName || '');
  const [courseCode, setCourseCode] = useState(course?.CourseCode || '');
  const [totalClasses, setTotalClasses] = useState(course?.totalClasses || 0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/courses/${batchName}/${semesterName}`, {
        method: course ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CourseName: courseName, CourseCode: courseCode, totalClasses }),
      });

      if (!response.ok) {
        throw new Error('Failed to add/update course');
      }

      setMessage('Course updated successfully');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>{course ? 'Update Course' : 'Add Course'} in {semesterName}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Course Name"
          required
        />
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="Course Code"
          required
        />
        <input
          type="number"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          placeholder="Total Classes"
          required
        />
        <button type="submit">{course ? 'Update' : 'Add'} Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

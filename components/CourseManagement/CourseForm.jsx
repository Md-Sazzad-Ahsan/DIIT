'use client';
import { useState, useEffect } from 'react';

export default function CourseForm({ batchName, semesterName, course }) {
  const [courseName, setCourseName] = useState(course?.CourseName || '');
  const [courseCode, setCourseCode] = useState(course?.CourseCode || '');
  const [totalClasses, setTotalClasses] = useState(course?.totalClasses || 0);
  const [facultyId, setFacultyId] = useState(course?.facultyId || '');
  const [section, setSection] = useState(course?.section || '');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/courses/${batchName}/${semesterName}`, {
        method: course ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          CourseName: courseName,
          CourseCode: courseCode,
          totalClasses,
          facultyId,
          section
        }),
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
          onChange={(e) => setTotalClasses(parseInt(e.target.value, 10))}
          placeholder="Total Classes"
          required
        />
        <input
          type="text"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          placeholder="Faculty ID"
        />
        <input
          type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          placeholder="Section"
        />
        <button type="submit">{course ? 'Update' : 'Add'} Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

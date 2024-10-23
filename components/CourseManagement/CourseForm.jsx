'use client';
import { useState } from 'react';

export default function CourseForm() {
  const [semesterName, setSemesterName] = useState('');
  const [runningBatch, setRunningBatch] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [message, setMessage] = useState('');

  const handleAddCourse = () => {
    setCourses([...courses, { courseName, courseCode }]);
    setCourseName('');
    setCourseCode('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ semesterName, runningBatch, courses }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add/update courses');
      }

      setMessage('Courses added/updated successfully');
      setSemesterName('');
      setRunningBatch('');
      setCourses([]);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add/Update Courses</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={semesterName}
          onChange={(e) => setSemesterName(e.target.value)}
          required
        >
          <option value="" disabled>Select Semester</option>
          <option value="First_Semester">First Semester</option>
          <option value="Second_Semester">Second Semester</option>
          <option value="Third_Semester">Third Semester</option>
          <option value="Fourth_Semester">Fourth Semester</option>
          <option value="Fifth_Semester">Fifth Semester</option>
          <option value="Sixth_Semester">Sixth Semester</option>
          <option value="Seventh_Semester">Seventh Semester</option>
          <option value="Eighth_Semester">Eighth Semester</option>
        </select>
        <input
          type="text"
          value={runningBatch}
          onChange={(e) => setRunningBatch(e.target.value)}
          placeholder="Running Batch"
        />
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Course Name"
        />
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          placeholder="Course Code"
        />
        <button type="button" onClick={handleAddCourse}>Add Course</button>
        <button type="submit">Submit</button>
      </form>
      {courses.length > 0 && (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course.courseName} ({course.courseCode})</li>
          ))}
        </ul>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

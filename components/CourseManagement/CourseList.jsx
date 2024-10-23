'use client';
import { useEffect, useState } from 'react';

export default function CourseList({ batchName, semesterName }) {
  const [semester, setSemesterName] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/courses/${semesterName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch semester');
        }
        const data = await response.json();
        setSemesterName(data.semesterName || []);
      } catch (error) {
        console.error('Error fetching semester:', error);
      }
    };

    fetchCourses();
  }, [semesterName]);

  return (
    <div>
      <h2>Courses in {semesterName}</h2>
      <ul>
        {semesterName.map((semester) => (
          <li key={course.CourseCode}>
            {semester.semesterName}
          </li>
        ))}
      </ul>
    </div>
  );
}

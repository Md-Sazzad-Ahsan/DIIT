'use client';
import { useEffect, useState } from 'react';

export default function CourseList({ batchName, semesterName }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`/api/courses/${batchName}/${semesterName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [batchName, semesterName]);

  return (
    <div>
      <h2>Courses in {semesterName}</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.CourseCode}>
            {course.CourseName} ({course.CourseCode})
          </li>
        ))}
      </ul>
    </div>
  );
}

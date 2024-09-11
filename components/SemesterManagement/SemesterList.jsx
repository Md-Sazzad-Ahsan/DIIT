'use client';
import { useEffect, useState } from 'react';

export default function SemesterList({ batchName }) {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await fetch(`/api/courses/${batchName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch semesters');
        }
        const data = await response.json();
        setSemesters(data.semesters || []);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };

    fetchSemesters();
  }, [batchName]);

  return (
    <div>
      <h2>Semesters in {batchName}</h2>
      <ul>
        {semesters.map((semester) => (
          <li key={semester.semesterName}>{semester.semesterName}</li>
        ))}
      </ul>
    </div>
  );
}

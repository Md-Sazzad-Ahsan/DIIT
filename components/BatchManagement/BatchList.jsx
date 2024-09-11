'use client';
import { useEffect, useState } from 'react';

export default function BatchList() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch batches');
        }
        const data = await response.json();
        setBatches(data);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  return (
    <div>
      <h2>Batches</h2>
      <ul>
        {batches.map((batch) => (
          <li key={batch}>{batch}</li>
        ))}
      </ul>
    </div>
  );
}

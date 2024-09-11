'use client';

import { useState, useEffect } from 'react';
import SemesterList from '@/components/SemesterManagement/SemesterList';
import SemesterForm from '@/components/SemesterManagement/SemesterForm';
import { getBatchData } from '@/utils/api'; // Ensure this file exists

export default function Batch({ params }) {
  const { batchName } = params; // Access dynamic route parameter
  const [batchData, setBatchData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (batchName) {
      getBatchData(batchName)
        .then(data => setBatchData(data))
        .catch(err => setError(err.message));
    }
  }, [batchName]);

  return (
    <div>
      <h1>Semester Management for {batchName}</h1>
      {error && <p>Error: {error}</p>}
      {batchData ? (
        <>
          <SemesterList batchName={batchName} />
          <SemesterForm batchName={batchName} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

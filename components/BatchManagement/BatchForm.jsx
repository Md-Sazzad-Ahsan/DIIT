'use client';
import { useState } from 'react';

export default function BatchForm() {
  const [batchName, setBatchName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchName }),
      });

      if (!response.ok) {
        throw new Error('Failed to create batch');
      }

      setMessage('Batch created successfully');
      setBatchName('');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Create Batch</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          placeholder="Batch Name"
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

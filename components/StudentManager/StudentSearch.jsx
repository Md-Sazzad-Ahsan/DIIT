'use client';
import { useState } from 'react';

export default function StudentSearch({ onSearch }) {
  const [searchId, setSearchId] = useState('');

  const handleSearch = () => {
    if (searchId.trim()) {
      onSearch(searchId);
    } else {
      console.error('Invalid Student ID');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold mb-2">Search Student by ID</h2>
      <input
        type="text"
        placeholder="Enter student ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}

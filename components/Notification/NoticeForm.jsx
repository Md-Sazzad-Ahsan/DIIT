// components/NoticeForm.jsx
'use client';

import { useState } from 'react';

export default function NoticeForm() {
  const [date, setDate] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, headline, description }),
      });

      if (!res.ok) {
        throw new Error('Failed to create notice');
      }

      const data = await res.json();
      console.log('Notice created:', data);
      // Optionally reset form fields or handle success
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
          Headline
        </label>
        <input
          type="text"
          id="headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}

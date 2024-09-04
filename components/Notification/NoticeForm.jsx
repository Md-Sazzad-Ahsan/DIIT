'use client';

import { useState } from 'react';

export default function NoticeForm() {
  const [date, setDate] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

      // Show success message and reset form fields
      setSuccess('Notice published successfully!');
      setDate('');
      setHeadline('');
      setDescription('');
      setError(null); // Clear any existing errors

    } catch (error) {
      setError(error.message);
      setSuccess(null); // Clear any existing success messages
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-10">
      <p className='text-gray-700 dark:text-gray-50 text-lg md:text-xl font-bold'>Publish a Notice!</p>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-50">
          Date
        </label>
        <input
          type="text"
          id="date"
          value={date}
          placeholder='01 January 2024'
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-50 dark:bg-darkBg text-gray-600 dark:text-gray-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="headline" className="block text-sm font-medium text-gray-700 dark:text-gray-50">
          Headline
        </label>
        <input
          type="text"
          id="headline"
          value={headline}
          placeholder='Write a suitable Headline.'
          onChange={(e) => setHeadline(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-50">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          placeholder='Write a description with more information of this Notice!'
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border bg-gray-50 dark:bg-darkBg border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}

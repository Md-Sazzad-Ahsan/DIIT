'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function NoticeForm() {
  const [date, setDate] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false); // State to toggle Markdown preview

  useEffect(() => {
    // Function to format the date as "01 Month 2024"
    const formatDate = () => {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0'); 
      const month = today.toLocaleString('default', { month: 'long' }); 
      const year = today.getFullYear();
      return `${day} ${month} ${year}`;
    };

    setDate(formatDate());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null); // Clear any previous success message
    setError(null); // Clear any previous error
  
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, headline, description }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to create notice, Try again!');
      }
  
      const data = await res.json();
      console.log('Notice created:', data);
      setDate(''); // Clear date field
      setHeadline('');
      setDescription('');
      setSuccessMessage('Notice published.Refreshing Notices..');
      setShowMarkdownPreview(true); // Show Markdown preview on success
  
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Delay to allow user to see success message
  
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 mt-5">
        <p className='text-gray-700 dark:text-gray-50 text-lg md:text-xl font-bold mb-5'>Publish a new Notice?</p>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-50">
            Date
          </label>
          <input
            type="text"
            id="date"
            value={date}
            placeholder='01 January 2024' // Optional: keep the placeholder for clarity
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
            placeholder='Write a description with more information of this Notice! Use markdown for formatting.'
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full min-h-52 px-3 py-2 border bg-gray-50 dark:bg-darkBg border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-teal-500">{successMessage}</p>}
        <button
          type="submit"
          className="bg-teal-600 text-gray-50 px-4 py-2 rounded-md"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Markdown Preview Section */}
      {showMarkdownPreview && (
        <div className="markdown-preview mt-10">
          <h2 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-50 mb-4">Markdown Preview</h2>
          <div className="border p-4 rounded-md bg-gray-50 dark:bg-darkBg">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
      )}
    </>
  );
}

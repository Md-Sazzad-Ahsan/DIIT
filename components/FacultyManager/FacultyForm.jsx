'use client';
import { useState } from 'react';

export default function FacultyForm() {
  const [formData, setFormData] = useState({
    facultyId: '',
    name: '',
    email: '',
    isAdmin: false,
    assignedTo: '',
    hashedPIN: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
        return;
      }

      const result = await response.json();
      setMessage(result.message || 'Faculty added successfully');
      setFormData({
        facultyId: '',
        name: '',
        email: '',
        isAdmin: false,
        assignedTo: '',
        hashedPIN: ''
      });
    } catch (error) {
      console.error('Error adding faculty:', error);
      setError('An error occurred while adding the faculty');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-50 dark:bg-darkBg rounded shadow-md">
      <h1 className="text-xl font-bold mb-4 text-gray-600 dark:text-gray-50">Add Faculty</h1>

      {message && <p className="text-teal-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-50">Faculty ID</label>
          <input
            type="text"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleInputChange}
            className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-gray-700 shadow-inner border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-50">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-gray-700 shadow-inner border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-50">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-gray-700 shadow-inner border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-600 dark:text-gray-50">Admin</label>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-50">Assigned To (Batch Coordinator)</label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-gray-700 shadow-inner border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-50">Hashed PIN</label>
          <input
            type="password"
            name="hashedPIN"
            value={formData.hashedPIN}
            onChange={handleInputChange}
            className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-gray-700 shadow-inner border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-gray-50 px-4 py-2 rounded mt-4"
        >
          Add Faculty
        </button>
      </form>
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function StudentManager() {
  const [formData, setFormData] = useState({
    StudentID: '',
    name: '',
    batch: 'CSE 20', // Default to CSE 20
    section: 'A', // Default to A
    bloodGroup: 'A+', // Default to A+
    phoneNumber: '',
    email: '',
    photo: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Student
  const addStudent = async () => {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Student added successfully');
        setErrorMessage('');
        // Reset form data
        setFormData({
          StudentID: '',
          name: '',
          batch: 'CSE 20', // Reset to default
          section: 'A', // Reset to default
          bloodGroup: 'A+', // Reset to default
          phoneNumber: '',
          email: '',
          photo: '',
        });
        setShowForm(false); // Close the form after successful submission
        // Clear messages after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setErrorMessage(result.error);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  // Generate batch options
  const generateBatchOptions = () => {
    const options = [];
    for (let i = 1; i <= 50; i++) {
      const batch = `CSE ${i.toString().padStart(2, '0')}`;
      options.push(batch);
    }
    return options;
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-gray-600 dark:text-gray-50">Student Manager</h1>

      {/* Button to show/hide the form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-teal-600 text-white px-4 py-2 rounded mb-4"
      >
        + New Student
      </button>

      {showForm && (
        <div className="mb-4 space-y-2">
          <form>
            <input
              type="text"
              name="StudentID"
              placeholder="Student ID"
              value={formData.StudentID}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            />
            <select
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            >
              {generateBatchOptions().map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            >
              {['A', 'B', 'C', 'D', 'E'].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            >
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bloodGroup) => (
                <option key={bloodGroup} value={bloodGroup}>
                  {bloodGroup}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded text-gray-50 bg-gray-800"
            />
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={addStudent}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>

          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function AddNewStudent() {
  const [formData, setFormData] = useState({
    StudentID: '',
    name: '',
    batch: 'CSE 20',
    section: 'A',
    bloodGroup: 'A+ (ve)',
    phoneNumber: '',
    email: '',
    photo: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [studentInfo, setStudentInfo] = useState(null);
  const [message, setMessage] = useState(''); // State for validation messages

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Student
  const addStudent = async () => {
    setMessage(''); // Reset message before validation
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
        setStudentInfo(result.student);
        setShowModal(true); // Show modal with student info
        setFormData({
          StudentID: '',
          name: '',
          batch: 'CSE 20',
          section: 'A',
          bloodGroup: 'A+ (ve)',
          phoneNumber: '',
          email: '',
          photo: '',
        });
        setShowForm(false);
      } else {
        // Show appropriate error message
        setMessage(result.error); // Set validation message
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.'); // Show general error message
    }
  };

  return (
    <div className="text-gray-600 dark:text-gray-50">
      <h1 className="text-xl font-bold mb-4">Student Manager</h1>

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
              type="number"
              name="StudentID"
              placeholder="Student ID"
              value={formData.StudentID}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            />
            <select
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            >
              {Array.from({ length: 50 }, (_, i) => `CSE ${i + 1}`).map((batch) => (
                <option key={batch} value={batch}>
                  {`Batch ${batch}`}
                </option>
              ))}
            </select>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            >
              {['A', 'B', 'C', 'D', 'E'].map((section) => (
                <option key={section} value={section}>
                  {`Section ${section}`}
                </option>
              ))}
            </select>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            >
              {['A+ (ve)', 'A- (ve)', 'B+ (ve)', 'B- (ve)', 'AB+ (ve)', 'AB- (ve)', 'O+ (ve)', 'O- (ve)'].map((bloodGroup) => (
                <option key={bloodGroup} value={bloodGroup}>
                  {`Blood Group ${bloodGroup}`}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email@diit.edu.bd"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL (optional)"
              value={formData.photo}
              onChange={handleInputChange}
              className="block w-full p-2 text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg border border-gray-300 rounded"
            />

            {/* Display validation message */}
            {message && (
              <div className="text-red-500 mt-2">
                {message}
              </div>
            )}

            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={addStudent}
                className="bg-teal-600 text-gray-50 px-4 py-2 rounded"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-gray-50 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal for displaying student info */}
      {showModal && studentInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-50 dark:bg-darkBg text-gray-600 dark:text-gray-50 p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Student Added Successfully</h2>
            <p><strong>Student ID:</strong> {studentInfo.StudentID}</p>
            <p><strong>Name:</strong> {studentInfo.name}</p>
            <p><strong>Batch:</strong> {studentInfo.batch}</p>
            <p><strong>Section:</strong> {studentInfo.section}</p>
            <p><strong>Blood Group:</strong> {studentInfo.bloodGroup}</p>
            <p><strong>Phone Number:</strong> {studentInfo.phoneNumber}</p>
            <p><strong>Email:</strong> {studentInfo.email}</p>
            <p><strong>Photo URL:</strong> {studentInfo.photo}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-teal-600 text-gray-50 px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

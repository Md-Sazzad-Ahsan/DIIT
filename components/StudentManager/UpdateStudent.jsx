'use client';
import { useState, useEffect } from 'react';

export default function UpdateStudent() {
  const [searchId, setSearchId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    StudentID: '',
    name: '',
    batch: 'CSE 20', // Default value
    section: 'A', // Default section
    bloodGroup: 'A+ (ve)', // Default blood group
    phoneNumber: '',
    email: '',
    photo: ''
  });
  const [message, setMessage] = useState('');

  // Function to handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Search for a student
 // Search for a student
const searchStudent = async () => {
  if (!searchId.trim()) {
    // If the search box is empty or only contains whitespace
    setMessage('Please enter a valid Student ID');
    return; // Stop further execution if input is empty
  }

  try {
    const response = await fetch(`/api/students?studentID=${encodeURIComponent(searchId)}`);
    const result = await response.json();
    console.log('Search Result:', result);

    if (response.ok && result) {
      setStudentData(result);
      setFormData({
        StudentID: result.StudentID || '',
        name: result.name || '',
        batch: result.batch || 'CSE 20', // Use existing batch value or default
        section: result.section || 'A',
        bloodGroup: result.bloodGroup || 'A+ (ve)',
        phoneNumber: result.phoneNumber || '',
        email: result.email || '',
        photo: result.photo || ''
      });
      setMessage('');
    } else {
      setMessage(result.error || 'Student not found');
      setStudentData(null); // Clear studentData to display the search box
    }
  } catch (error) {
    console.error('Error searching for student:', error);
    setMessage('An error occurred while searching for the student');
  }
};

  // Update student information
const updateStudent = async () => {
    try {
      const response = await fetch('/api/students', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _id: studentData._id // Include student ID in the request
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setMessage('Student updated successfully');
        setStudentData(null); // Clear student data
        setSearchId(''); // Clear search ID
        setFormData({
          StudentID: '',
          name: '',
          batch: 'CSE 20', // Default value
          section: 'A',
          bloodGroup: 'A+ (ve)',
          phoneNumber: '',
          email: '',
          photo: ''
        });
        setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
      } else {
        setMessage(result.error || 'An error occurred while updating the student');
        setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
      }
    } catch (error) {
      console.error('Error updating student:', error);
      setMessage('An error occurred while updating the student');
      setTimeout(() => setMessage(''), 5000); // Clear message after 5 seconds
    }
  };
  

  // Generate options for batch dropdown
  const batchOptions = Array.from({ length: 50 }, (_, i) => `CSE ${i + 1}`);

  // Clear message when the component unmounts
  useEffect(() => {
    return () => {
      setMessage('');
    };
  }, []);

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Update Student</h1>

      {/* Message Display */}
      {message && <p className="text-teal-500">{message}</p>}

      {/* Search Student (only shows when no student is found) */}
      {!studentData && (
        <div className="mb-4 text-gray-600 dark:text-gray-50">
          <label className="block mb-2 text-sm font-medium">Student ID</label>
          <input
            type="text"
            placeholder="Enter student ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={searchStudent}
            className="bg-teal-600 text-gray-50 px-4 py-2 rounded mt-2"
          >
            Find Student
          </button>
        </div>
      )}

      {/* Update Student Form (only shows when student is found) */}
      {studentData && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Student ID</label>
            <input
              type="text"
              name="StudentID"
              placeholder="Student ID"
              value={formData.StudentID}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>

          {/* Batch dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">Batch</label>
            <select
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            >
              {batchOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Section dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
              <option value="E">Section E</option>
            </select>
          </div>

          {/* Blood group dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            >
              <option value="A+ (ve)">A+ (ve)</option>
              <option value="A- (ve)">A- (ve)</option>
              <option value="B+ (ve)">B+ (ve)</option>
              <option value="B- (ve)">B- (ve)</option>
              <option value="AB+ (ve)">AB+ (ve)</option>
              <option value="AB- (ve)">AB- (ve)</option>
              <option value="O+ (ve)">O+ (ve)</option>
              <option value="O- (ve)">O- (ve)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={handleInputChange}
              className="block w-full p-2 border  text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>

          {/* Update and Cancel Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={updateStudent}
              className="bg-yellow-500 text-gray-50 px-4 py-2 rounded"
            >
              Update Student
            </button>
            <button
              type="button"
              onClick={() => {
                setStudentData(null); // Clear the form and show search again
                setSearchId(''); // Clear search ID
                setFormData({
                  StudentID: '',
                  name: '',
                  batch: 'CSE 20', // Default value
                  section: 'A',
                  bloodGroup: 'A+',
                  phoneNumber: '',
                  email: '',
                  photo: ''
                });
                setMessage('');
              }}
              className="bg-gray-500 text-gray-50 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

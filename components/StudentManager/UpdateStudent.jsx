'use client';
import { useState, useEffect } from 'react';

export default function UpdateStudent() {
  const [searchId, setSearchId] = useState('');
  const [searchBatch, setSearchBatch] = useState('CSE 20');
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    StudentID: '',
    name: '',
    batch: 'CSE 20',
    section: 'A',
    bloodGroup: 'A+ (ve)',
    phoneNumber: '',
    email: '',
    photo: ''
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const searchStudent = async () => {
    if (!searchId.trim()) {
      setMessage('Please enter a valid Student ID');
      return;
    }

    try {
      const response = await fetch(`/api/students?studentID=${encodeURIComponent(searchId)}&batch=${encodeURIComponent(searchBatch)}`);

      if (!response.ok) {
        const errorText = await response.text();
        setMessage("Student not found");
        return;
      }

      const result = await response.json();

      if (result.error) {
        setMessage(result.error);
        setStudentData(null);
      } else {
        setStudentData(result.student);
        setFormData({
          StudentID: result.student.StudentID || '',
          name: result.student.name || '',
          batch: result.student.batch || '',
          section: result.student.section || 'A',
          bloodGroup: result.student.bloodGroup || 'A+ (ve)',
          phoneNumber: result.student.phoneNumber || '',
          email: result.student.email || '',
          photo: result.student.photo || ''
        });
        setMessage('');
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setMessage('An error occurred while searching for the student');
    }
  };

  const updateStudent = async () => {
    try {
      const response = await fetch('/api/students', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _id: studentData._id
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Information updated successfully');
        resetForm();
      } else {
        setMessage(result.error || 'An error occurred while updating the student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      setMessage('An error occurred while updating the student');
    }
  };

  const deleteStudent = async () => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      const response = await fetch('/api/students', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          StudentID: formData.StudentID,
          batch: formData.batch
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Student deleted successfully');
        resetForm();
      } else {
        setMessage(result.error || 'An error occurred while deleting the student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      setMessage('An error occurred while deleting the student');
    }
  };

  const resetForm = () => {
    setStudentData(null);
    setSearchId('');
    setFormData({
      StudentID: '',
      name: '',
      batch: '',
      section: 'A',
      bloodGroup: 'A+ (ve)',
      phoneNumber: '',
      email: '',
      photo: ''
    });
    setMessage('');
  };

  const batchOptions = Array.from({ length: 50 }, (_, i) => `CSE ${i + 1}`);

  useEffect(() => {
    return () => {
      setMessage('');
    };
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-2 sm:p-4">
        <div className="bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-50 p-5 sm:p-10 border border-gray-600 rounded shadow-lg max-w-[500px]">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-red-500">Confirm Deletion</h2>
          <p className="mb-4">
            Are you sure you want to delete this student? <br /> The student will be deleted permanently and the process cannot be undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-500 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };  

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);

    try {
      const response = await fetch('/api/students', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          StudentID: formData.StudentID,
          batch: formData.batch
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Student deleted successfully');
        resetForm();
      } else {
        setMessage(result.error || 'An error occurred while deleting the student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      setMessage('An error occurred while deleting the student');
    }
  };


  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Update existing student</h1>

      {message && <p className="text-teal-600">{message}</p>}

      {!studentData && (
        <div className="mb-4 text-gray-600 dark:text-gray-50">
          <label className="block mb-2 text-sm font-medium">Student ID</label>
          <input
            type="text"
            placeholder="Enter student ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-300 rounded"
          />

          <label className="block mt-4 mb-2 text-sm font-medium">Batch</label>
          <select
            value={searchBatch}
            onChange={(e) => setSearchBatch(e.target.value)}
            className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-300 rounded"
          >
            {batchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={searchStudent}
            className="bg-teal-600 text-gray-50 px-4 py-2 rounded mt-4"
          >
            Find Student
          </button>
        </div>
      )}

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
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
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
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Batch</label>
            <select
              name="batch"
              value={formData.batch}
              onChange={handleInputChange}
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            >
              {batchOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
              <option value="E">Section E</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
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
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Photo</label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              value={formData.photo}
              onChange={handleInputChange}
              className="block w-full p-2 border text-gray-600 dark:text-gray-50 bg-gray-50 dark:bg-darkBg shadow-inner border-gray-200 rounded"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={updateStudent}
              className="bg-teal-600 text-gray-50 px-4 py-2 rounded"
            >
              Update Student
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 text-gray-50 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
            <button
            type="button"
            onClick={handleDeleteClick}
            className="bg-red-600 text-gray-50 px-4 py-2 rounded"
          >
            Delete
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

const deleteStudent = async () => {
  try {
    const response = await fetch(`/api/students?StudentID=${encodeURIComponent(studentData.StudentID)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const result = await response.text();
      try {
        const json = JSON.parse(result);
        setMessage(json.error || 'Failed to delete student');
      } catch {
        setMessage('Failed to delete student: Response is not valid JSON');
      }
      return;
    }

    const result = await response.json();
    setMessage(result.message || 'Student deleted successfully');
    setStudentData(null);
    setSearchId('');
    setFormData({
      StudentID: '',
      name: '',
      batch: 'CSE 20',
      section: 'A',
      bloodGroup: 'A+ (ve)',
      phoneNumber: '',
      email: '',
      photo: ''
    });
    setShowDeleteModal(false); // Close modal
  } catch (error) {
    console.error('Error deleting student:', error);
    setMessage('An error occurred while deleting the student');
  }
};

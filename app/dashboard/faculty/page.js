import FacultyForm from '@/components/FacultyManager/FacultyForm';
import AddCourses from '@/components/FacultyManager/AddCourses';

const FacultyManagement = () => {
  return (
    <div>
      <h1>Faculty Management</h1>
      <FacultyForm />
      <AddCourses />
    </div>
  );
};

export default FacultyManagement;

"use client";
import { useSearchParams } from 'next/navigation';
import CourseList from '@/components/CourseManagement/CourseList';
import CourseForm from '@/components/CourseManagement/CourseForm';

export default function Semester() {
  const searchParams = useSearchParams();
  const batchName = searchParams.get('batchName');
  const semesterName = searchParams.get('semesterName');

  if (!batchName || !semesterName) {
    return <div>Loading...</div>; // or handle the missing values appropriately
  }

  return (
    <div>
      <h1>Course Management for {semesterName} in {batchName}</h1>
      <CourseList batchName={batchName} semesterName={semesterName} />
      <CourseForm batchName={batchName} semesterName={semesterName} />
    </div>
  );
}

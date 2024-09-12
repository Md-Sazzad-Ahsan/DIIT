import CourseForm from '@/components/CourseManagement/CourseForm'
import CourseList from '@/components/CourseManagement/CourseList'
import React from 'react'

export default function Course() {
  return (
    <div className='pt-20'>
        <CourseForm />
        <CourseList />
    </div>
  )
};

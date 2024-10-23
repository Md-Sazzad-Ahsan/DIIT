import CourseForm from '@/components/CourseManagement/CourseForm'
import CourseList from '@/components/CourseManagement/CourseList'
import React from 'react'

export default function Course() {
  return (
    <div className='pt-20 px-5 sm:px-10 md:px-16 lg:px-56'>
        <CourseForm />
        {/* <CourseList /> */}
    </div>
  )
};

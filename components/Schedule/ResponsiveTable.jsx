"use client";

import { useState, useEffect } from "react";

export default function ResponsibleTable() {
  const days = ["SUN", "MON", "TUE", "WED", "THU"];
  const times = ["10:10AM - 11:20AM", "11:40AM - 12:50PM", "12:50PM - 02:00PM"];

  const coursesByDay = {
    SUN: [
      { courseName: "", facultyName: "", room: "" },
      { courseName: "", facultyName: "", room: "" },
      { courseName: "", facultyName: "", room: "" },
      { courseName: "", facultyName: "", room: "" }
    ],
    MON: [
      { courseName: "Computer Graphics Lab", facultyName: "MD Musfiqur Rahman", room: "715" },
      { courseName: "Computer Graphics", facultyName: "Mizanur Rahman", room: "704" },
      { courseName: "Compiler Design", facultyName: "Moumita Akter", room: "704" },
      // { courseName: "", facultyName: "", room: " " },
    ],
    TUE: [
      { courseName: "", facultyName: "", room: "N/A" },
      { courseName: "E-commerce & Web Eng.", facultyName: "Nusrhat Jahan Sarkar", room: "704" },
      { courseName: "Computer Graphics", facultyName: "Mizanur Rahman", room: "704" },
      // { courseName: "", facultyName: "", room: " " },
    ],
    WED: [
      { courseName: "", facultyName: "", room: "N/A" },
      { courseName: "Artificial Intelligence", facultyName: "Tanjila Chowdhury Orpe", room: "704" },
      { courseName: "Compiler Design", facultyName: "Moumita Akter", room: "704" },
      // { courseName: "", facultyName: "", room: " " },
    ],
    THU: [
      { courseName: "Compiler Design Lab", facultyName: "Moumita Akter", room: "714" },
      { courseName: "E-commerce & Web Eng.", facultyName: "Nusrhat Jahan Sarkar", room: "704" },
      { courseName: "Artificial Intelligence", facultyName: "Tanjila Chowdhury Orpe", room: "704" },
      // { courseName: "", facultyName: "", room: " " },
    ]
  };

  const [popup, setPopup] = useState(null);
  const [popupTimeout, setPopupTimeout] = useState(null);

  const handleCellClick = (day, time, course, faculty, room) => {
    if (popupTimeout) clearTimeout(popupTimeout);

    setPopup({
      day,
      time,
      courseName: course,
      facultyName: faculty,
      room
    });

    const timeoutId = setTimeout(() => setPopup(null), 5000);
    setPopupTimeout(timeoutId);
  };

  const handleClosePopup = () => {
    if (popupTimeout) clearTimeout(popupTimeout);
    setPopup(null);
  };

  return (
    <div className="overflow-x-auto px-2 sm:px-10 md:px-28 lg:px-56 py-20">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="text-center">
            <th className="border border-gray-300 px-4 py-3 whitespace-nowrap" scope="col">DAY</th>
            {times.map((time, index) => (
              <th key={index} className="border border-gray-300 px-4 py-3 whitespace-nowrap" scope="col">
                {time}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => {
            const rowCourses = coursesByDay[day] || [];

            if (rowCourses.every((course) => !course.courseName.trim())) return null;

            return (
              <tr key={dayIndex} className="text-center">
                <td className="border border-gray-300 px-4 py-3 whitespace-nowrap" scope="row">{day}</td>
                {rowCourses.map((course, timeIndex) => (
                  <td
                    key={timeIndex}
                    className="border border-gray-300 px-4 py-3 whitespace-nowrap cursor-pointer"
                    onClick={() => handleCellClick(day, times[timeIndex], course.courseName, course.facultyName, course.room)}
                  >
                    {course.courseName || course.facultyName}
                  </td>
                ))}
                {times.length > rowCourses.length &&
                  Array(times.length - rowCourses.length).fill(null).map((_, index) => (
                    <td key={`empty-${index}`} className="border border-gray-300 px-4 py-3 whitespace-nowrap"></td>
                  ))
                }
              </tr>
            );
          })}
        </tbody>
      </table>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-50">
          <div className="bg-gray-100 dark:bg-gray-500 p-4 rounded-lg shadow-lg relative max-w-sm w-full">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h2 className="text-gray-700 dark:text-gray-50 text-xl font-semibold">Class Details</h2>
              <p className="text-gray-700 dark:text-gray-100">{popup.time}</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2 space-x-4">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700 dark:text-gray-50">Day: </p>
                  <p className=" text-gray-600 dark:text-gray-200">{popup.day}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-700 dark:text-gray-50">Room: </p>
                  <p className="text-gray-600 dark:text-gray-200">{popup.room}</p>
                </div>
              </div>
              <div className="mb-2 flex gap-2">
                <p className="font-semibold text-gray-700 dark:text-gray-50">Course: </p>
                <p className="text-gray-600 dark:text-gray-200">{popup.courseName}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700 dark:text-gray-50">Faculty: </p>
                <p className="text-gray-600 dark:text-gray-200">{popup.facultyName}</p>
              </div>
            </div>
            <button
              className="absolute bottom-4 right-4 px-4 py-1 bg-teal-600 text-white rounded-md shadow-sm hover:bg-teal-700 transition duration-150"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

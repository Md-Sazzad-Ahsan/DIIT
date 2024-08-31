"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StudentTable() {
  const [selectedBatch, setSelectedBatch] = useState("CSE20");
  const [selectedSection, setSelectedSection] = useState("sectionA");
  const [selectedSubject, setSelectedSubject] = useState(""); // State to hold the selected subject
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]); // State to hold subjects for the selected batch
  const [availableSections, setAvailableSections] = useState([]); // State to hold available sections
  const [selectedFields, setSelectedFields] = useState([]);
  const [popupField, setPopupField] = useState(null);

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    // Function to dynamically determine available sections based on file existence
    const loadAvailableSections = async () => {
      const sections = ["sectionA", "sectionB", "sectionC", "sectionD"]; // Extend this list as needed
      const availableSectionsList = [];

      for (const section of sections) {
        try {
          await import(`@/data/${selectedBatch}/${section}Students.js`);
          availableSectionsList.push(section);
        } catch {
          // Silently handle the error without logging
        }
      }

      setAvailableSections(availableSectionsList);
      if (!availableSectionsList.includes(selectedSection)) {
        setSelectedSection(availableSectionsList[0] || "");
      }
    };

    // Load available sections and subjects when batch changes
    loadAvailableSections();

    const loadSubjectsData = async () => {
      try {
        const subjectsData = await import(`@/data/${selectedBatch}/subjects.js`);
        console.log("Loaded subjects data:", subjectsData.default);
        if (Array.isArray(subjectsData.default)) {
          setSubjects(subjectsData.default);
          // Reset selected subject when batch changes
          setSelectedSubject(subjectsData.default[0]?.subject || "");
        } else {
          console.error("Subjects data is not an array.");
          setSubjects([]);
          setSelectedSubject("");
        }
      } catch (error) {
        console.error("Error loading subjects data:", error);
        setSubjects([]);
        setSelectedSubject("");
      }
    };

    loadSubjectsData();
  }, [selectedBatch, selectedSection]);

  useEffect(() => {
    // Function to dynamically import student data
    const loadStudentData = async () => {
      try {
        const studentData = await import(
          `@/data/${selectedBatch}/${selectedSection}Students.js`
        );
        console.log("Loaded student data:", studentData.default);

        if (Array.isArray(studentData.default)) {
          setStudents(studentData.default);
        } else {
          console.error("Student data is not an array.");
          setStudents([]);
        }
      } catch (error) {
        console.error("Error loading student data:", error);
        setStudents([]);
      }
    };

    if (selectedSection) {
      loadStudentData();
    }
  }, [selectedBatch, selectedSection]);

  const handleFieldClick = (student) => {
    const isSelected = selectedFields.some((field) => field.id === student.id);

    if (isSelected) {
      setPopupField(student);
    } else {
      setSelectedFields((prevSelectedFields) => [
        ...prevSelectedFields,
        student,
      ]);
    }
  };

  const handleAbsentClick = () => {
    if (popupField) {
      setSelectedFields((prevSelectedFields) =>
        prevSelectedFields.filter((field) => field.id !== popupField.id)
      );
      setPopupField(null);
    }
  };

  return (
    <div className="my-20 py-10 px-5 sm:px-10 md:px-28 lg:px-56">
      <div className="grid grid-cols-2 items-center mb-4 gap-1">
        <span className=" text-gray-600 dark:text-gray-50 bg-gray-200 dark:bg-gray-700 pl-2 py-2 col-span-2">
          Date: {currentDate}
        </span>
        <select
          className=" text-gray-600 dark:text-gray-50 bg-gray-200 dark:bg-gray-700 font-semibold pl-2 py-2"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="CSE20">Batch CSE20</option>
          <option value="CSE21">Batch CSE21</option>
          <option value="CSE22">Batch CSE22</option>
          <option value="CSE23">Batch CSE23</option>
          <option value="CSE24">Batch CSE24</option>
          <option value="CSE25">Batch CSE25</option>
        </select>
        <select
          className=" text-gray-600 dark:text-gray-50 bg-gray-200 dark:bg-gray-700 font-semibold pl-2 py-2"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {availableSections.length > 0 ? (
            availableSections.map((section) => (
              <option key={section} value={section}>
                {section.replace("section", "Section ")}
              </option>
            ))
          ) : (
            <option>No sections available</option>
          )}
        </select>
        <select
          className="text-gray-600 dark:text-gray-50 bg-gray-200 dark:bg-gray-700 font-semibold pl-2 py-2 col-span-2"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <option key={index} value={subject.subject}>
                {subject.subject}
              </option>
            ))
          ) : (
            <option>No subjects available</option>
          )}
        </select>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1">
        {students.length > 0 ? (
          students.map((student) => {
            const isSelected = selectedFields.some(
              (field) => field.id === student.id
            );

            return (
              <motion.div
                key={student.id}
                className={`border border-gray-300 text-center px-3 py-2 cursor-pointer ${
                  isSelected ? "bg-green-600" : ""
                }`}
                onClick={() => handleFieldClick(student)}
                whileTap={{ scale: 0.9 }}
              >
                {student.id}
              </motion.div>
            );
          })
        ) : (
          <p>No students available for the selected batch and section.</p>
        )}
      </div>
      {popupField && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-500 bg-opacity-50">
          <motion.div
            className="bg-gray-100 dark:bg-gray-500 text-gray-600 dark:text-gray-50 p-5 rounded-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <p>
              <strong>Name:</strong> {popupField.name}
            </p>
            <p>
              <strong>ID:</strong> {popupField.id}
            </p>
            <button
              className="mt-4 px-10 py-2 bg-red-600 text-white rounded"
              onClick={handleAbsentClick}
            >
              Absent
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

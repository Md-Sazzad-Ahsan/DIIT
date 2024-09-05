"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StudentTable() {
  const [selectedBatch, setSelectedBatch] = useState("CSE20");
  const [selectedSection, setSelectedSection] = useState("sectionA");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [popupField, setPopupField] = useState(null);

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  useEffect(() => {
    const loadAvailableSections = async () => {
      const sections = ["sectionA", "sectionB", "sectionC", "sectionD"];
      const availableSectionsList = [];

      for (const section of sections) {
        try {
          await import(`@/data/${selectedBatch}/${section}Students.js`);
          availableSectionsList.push(section);
        } catch {
          // Silently handle the error
        }
      }

      setAvailableSections(availableSectionsList);
      if (!availableSectionsList.includes(selectedSection)) {
        setSelectedSection(availableSectionsList[0] || "");
      }
    };

    loadAvailableSections();

    const loadSubjectsData = async () => {
      try {
        const subjectsData = await import(`@/data/${selectedBatch}/subjects.js`);
        if (Array.isArray(subjectsData.default)) {
          setSubjects(subjectsData.default);
          setSelectedSubject(subjectsData.default[0]?.subject || "");
        } else {
          setSubjects([]);
          setSelectedSubject("");
        }
      } catch (error) {
        setSubjects([]);
        setSelectedSubject("");
      }
    };

    loadSubjectsData();
  }, [selectedBatch, selectedSection]);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const studentData = await import(`@/data/${selectedBatch}/${selectedSection}Students.js`);
        if (Array.isArray(studentData.default)) {
          setStudents(studentData.default);
        } else {
          setStudents([]);
        }
      } catch (error) {
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
      setSelectedFields((prevSelectedFields) => [...prevSelectedFields, student]);
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

  const formatSelectedIdsTable = () => {
    const sortedIds = selectedFields
      .map(field => field.id)
      .sort((a, b) => a - b); // Sort numerically

    const rows = sortedIds.map(id => `<tr><td>${id}</td></tr>`).join('');
    return `
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr><th>ID</th></tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
  };

  const generateWhatsAppLink = () => {
    const sortedIds = selectedFields
      .map(field => field.id)
      .sort((a, b) => a - b); // Sort numerically

    const message = encodeURIComponent(
      `Batch: ${selectedBatch}\nSection: ${selectedSection}\nSubject: ${selectedSubject}\nDate: ${currentDate}\n\nSelected IDs:\n${sortedIds.join(", ")}`
    );

    return `https://api.whatsapp.com/send?text=${message}`;
  };

  const handleWhatsAppShare = () => {
    window.open(generateWhatsAppLink(), "_blank");
  };

  return (
    <div className="my-20 py-10 px-5 sm:px-10 md:px-28 lg:px-56">
      <div className="grid grid-cols-2 items-center mb-4 gap-1">
        <span className="text-gray-600 dark:text-gray-50 font-semibold bg-gray-200 dark:bg-gray-700 pl-2 py-2 col-span-2">
          Date: {currentDate}
        </span>
        <select
          className="text-gray-600 dark:text-gray-50 bg-gray-200 dark:bg-gray-700 font-semibold pl-2 py-2"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="CSE20">Batch CSE 20</option>
          <option value="CSE21">Batch CSE 21</option>
          <option value="CSE22">Batch CSE 22</option>
          <option value="CSE23">Batch CSE 23</option>
          <option value="CSE24">Batch CSE 24</option>
          <option value="CSE25">Batch CSE 25</option>
        </select>
        <select
          className="text-gray-600 dark:text-gray-50 bg-gray-200 dark:bg-gray-700 font-semibold pl-2 py-2"
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
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-1">
        {students.length > 0 ? (
          students.map((student) => {
            const isSelected = selectedFields.some(
              (field) => field.id === student.id
            );

            return (
              <motion.div
                key={student.id}
                className={`border border-gray-300 text-center px-1 py-2 cursor-pointer ${
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
          <p>No students available.</p>
        )}
      </div>
      {popupField && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50">
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
      <div className="mt-10 flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleWhatsAppShare}
        >
          Share on WhatsApp
        </button>
      </div>
    </div>
  );
}

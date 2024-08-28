
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type checking
import { scheduleData, descriptions, shareUrls } from "@/app/components/Schedule/ScheduleData"; // Import the data

const openShareWindow = (url) => {
  window.open(url, "_blank", "noopener,noreferrer,width=800,height=600");
};

const ShareableComponent = ({
  scheduleData = [],
  descriptions = [],
  shareUrls = {},
}) => {
  // Ensure scheduleData is not undefined
  if (!scheduleData || scheduleData.length === 0) {
    return <div>No schedule data available.</div>;
  }

  return (
    <div className="m-2">
      {/* Schedule Table */}
      <div className="grid grid-cols-6 gap-1 mb-4">
        {["Day", "Time", "09:00-10:10", "10:10-11:20", "11:40-12:50", "12:50-02:00"].map((header, index) => (
          <div
            key={index}
            className="p-2 col-span-1 bg-gray-300 font-bold text-center items-center sm:text-2xl text-xs"
          >
            {header}
          </div>
        ))}

        {scheduleData.map((row, rowIndex) => (
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`p-2 col-span-1 text-center ${
                rowIndex % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
              } font-bold text-xs md:text-2xl ${cell.color || ""}`}
            >
              {cell.text}
            </div>
          ))
        ))}
      </div>

      {/* Description Section */}
      <div className="grid grid-cols-6 gap-1">
        {descriptions.map((desc, index) => (
          <div
            key={index}
            className="col-span-3 row-span-1 bg-gray-300 grid grid-cols-6"
          >
            <div className="col-span-1 font-bold md:text-xl text-xs">
              {desc.shortName}
            </div>
            <div className="col-span-3 font-bold md:text-xl text-xs">
              {desc.fullName}
            </div>
            <div className="col-span-2 font-bold md:text-xl text-xs">
              {desc.instructor}
            </div>
          </div>
        ))}
      </div>

      {/* Share Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={() => openShareWindow(shareUrls.facebook)}
        >
          Share on Facebook
        </button>
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={() => openShareWindow(shareUrls.whatsapp)}
        >
          Share on WhatsApp
        </button>
        <button
          className="bg-gray-500 text-white p-2 rounded"
          onClick={() => openShareWindow(shareUrls.email)}
        >
          Share via Email
        </button>
      </div>
    </div>
  );
};

ShareableComponent.propTypes = {
  scheduleData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        color: PropTypes.string,
      })
    )
  ),
  descriptions: PropTypes.arrayOf(
    PropTypes.shape({
      shortName: PropTypes.string,
      fullName: PropTypes.string,
      instructor: PropTypes.string,
    })
  ),
  shareUrls: PropTypes.shape({
    facebook: PropTypes.string,
    whatsapp: PropTypes.string,
    email: PropTypes.string,
  }),
};

ShareableComponent.defaultProps = {
  scheduleData: [],
  descriptions: [],
  shareUrls: {},
};

export default ShareableComponent;

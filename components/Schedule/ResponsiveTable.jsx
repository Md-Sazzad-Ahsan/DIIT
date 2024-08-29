export default function ResponsibleTable() {
    const days = ["SUN", "MON", "TUE", "WED", "THU"];
    const times = ["11:40 - 12:50", "12:50 - 02:00", "02:30 - 03:40"];
    const coursesByDay = {
        SUN: [" ", " ", " "],
        MON: ["Computer Graphics (MR)", "Compiler Design (MA)", "Computer Graphics Lab (MMR)"],
        TUE: ["E-com. & Web Eng. (NJS)", "Computer Graphics (MR)", " "],
        WED: ["Artificial Intelligence (TCO)", "Compiler Design (MA)", " "],
        THU: ["E-com. & Web Eng. (NJS)", "Artificial Intelligence (TCO)", "Compiler Design Lab (MA)"]
    };
    const rooms = ["101", "102", "103", "104", "105"];

    // Check if a row is empty
    const isRowEmpty = (courseArray) => courseArray.every(course => !course.trim());

    return (
      <div className="overflow-x-auto px-2 sm:px-16 md:px-28 lg:px-56 pt-20">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="text-center">
              <th className="border border-gray-300 px-2 py-2 whitespace-nowrap" scope="col">DAY</th>
              <th className="border border-gray-300 px-2 py-2 whitespace-nowrap" scope="col">ROOM</th>
              {times.map((time, index) => (
                <th key={index} className="border border-gray-300 px-2 py-2 whitespace-nowrap" scope="col">
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => {
              // Get the courses for the current day
              const rowCourses = coursesByDay[day] || [];
              
              // Check if the row should be empty
              if (isRowEmpty(rowCourses)) return null; // Skip rendering if the row is empty

              return (
                <tr key={dayIndex} className="text-center">
                  <td className="border border-gray-300 px-2 py-2 whitespace-nowrap" scope="row">{day}</td>
                  <td className="border border-gray-300 px-2 py-2 whitespace-nowrap">{rooms[dayIndex]}</td>
                  {rowCourses.map((course, timeIndex) => (
                    <td key={timeIndex} className="border border-gray-300 px-2 py-2 whitespace-nowrap">
                      {course}
                    </td>
                  ))}
                  {/* Fill the rest of the columns with empty cells if necessary */}
                  {times.length > rowCourses.length && 
                    Array(times.length - rowCourses.length).fill(null).map((_, index) => (
                      <td key={`empty-${index}`} className="border border-gray-300 px-2 py-2 whitespace-nowrap"></td>
                    ))
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

"use client";
import { useEffect, useState } from 'react';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/notices');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        // Reverse the array to show the latest notice on top
        setNotices(data.reverse());
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setError('Failed to load notices');
      }
    };

    fetchNotices();
  }, []);

  return (
    <main className='sm:px-10 md:px-28 lg:px-56'>
    <div className="max-w-full mx-auto my-10 p-5 bg-gray-50 dark:bg-darkBg shadow-sm sm:shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-50">Notices</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-darkBg rounded-md shadow-inner border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-50">
                  {notice.headline}
                </h3>
                <p className="text-gray-700 dark:text-gray-50 mt-2">{notice.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-5">
                  Date: {notice.date}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">No notices to display.</p>
          )}
        </div>
      )}
    </div>
    </main>
  );
};

export default NoticeList;

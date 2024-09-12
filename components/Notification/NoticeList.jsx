'use client';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // GitHub-Flavored Markdown
import rehypeHighlight from 'rehype-highlight';
import { usePathname } from 'next/navigation'; // Get current path

const NoticeList = () => {
  const { data: session } = useSession();
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNotice, setEditedNotice] = useState({ headline: '', description: '', date: '' });
  const [message, setMessage] = useState('');
  const [openMenu, setOpenMenu] = useState(null);

  const headlineRef = useRef(null);
  const descriptionRef = useRef(null);
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch('/api/notices');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setNotices(data.reverse());
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setError('Failed to load notices, please check your internet connection.');
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    if (headlineRef.current) {
      headlineRef.current.style.height = 'auto';
      headlineRef.current.style.height = `${headlineRef.current.scrollHeight}px`;
    }

    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  }, [editingIndex, editedNotice.headline, editedNotice.description]);

  const handleDelete = async (index) => {
    try {
      const res = await fetch(`/api/notices/${notices[index]._id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete notice');
      }
      setNotices(notices.filter((_, i) => i !== index));
      setMessage('Notice deleted successfully');
      setOpenMenu(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to delete notice:', error);
      setMessage('Failed to delete notice');
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedNotice({
      ...notices[index],
      date: notices[index].date
    });
    setOpenMenu(null);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/notices/${notices[editingIndex]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedNotice),
      });
      if (!res.ok) {
        throw new Error('Failed to update notice');
      }
      const updatedNotices = [...notices];
      updatedNotices[editingIndex] = editedNotice;
      setNotices(updatedNotices);
      setEditingIndex(null);
      setMessage('Notice updated successfully');
      setOpenMenu(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update notice:', error);
      setMessage('Failed to update notice');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setOpenMenu(null);
  };

  const toggleMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const handleTextareaChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Display last 3 notices on homepage and all notices on '/notices'
  const displayedNotices = pathname === '/' ? notices.slice(0, 3) : notices;

  return (
    <main className='sm:px-5 md:px-28 lg:px-56'>
      <div className="max-w-full mx-auto my-10 p-5 bg-gray-50 dark:bg-darkBg shadow-sm sm:shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-5 sm:mb-6 text-gray-700 dark:text-gray-50">Notice</h2>
        {message && (
          <p className="text-teal-700 mb-4">{message}</p>
        )}
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {displayedNotices.length > 0 ? (
              displayedNotices.map((notice, index) => (
                <div
                  key={index}
                  className="relative p-4 bg-gray-50 dark:bg-darkBg rounded-md shadow-sm border border-gray-200"
                >
                  <div className="absolute top-2 right-2">
                    {session && (
                      <>
                        <button 
                          onClick={() => toggleMenu(index)} 
                          className="text-gray-600 dark:text-gray-50 px-2">
                          {openMenu === index ? '✖' : '⋮'}
                        </button>
                        {openMenu === index && (
                          <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-700 border border-gray-200 rounded-md shadow-md">
                            {editingIndex === index ? (
                              <>
                                <button
                                  onClick={handleCancelEdit}
                                  className="block px-4 py-2 text-left w-full text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleUpdate}
                                  className="block px-4 py-2 text-left w-full text-gray-700 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  Update
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(index)}
                                  className="block font-semibold px-4 py-3 text-center w-full text-gray-700 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  Edit
                                </button>
                                <hr className='mx-2' />
                                <button
                                  onClick={() => handleDelete(index)}
                                  className="block font-semibold px-4 py-3 text-center w-full text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {editingIndex === index ? (
                    <div>
                      <textarea
                        ref={headlineRef}
                        className="w-full text-xl font-bold text-gray-700 dark:text-gray-50 bg-transparent border-b mb-1 resize-none"
                        value={editedNotice.headline}
                        onChange={(e) => {
                          setEditedNotice({ ...editedNotice, headline: e.target.value });
                          handleTextareaChange(e);
                        }}
                      />
                      <textarea
                        ref={descriptionRef}
                        className="w-full min-h-52 text-gray-700 dark:text-gray-50 bg-transparent border-b mb-3 resize-none"
                        value={editedNotice.description}
                        onChange={(e) => {
                          setEditedNotice({ ...editedNotice, description: e.target.value });
                          handleTextareaChange(e);
                        }}
                      />
                      <p className="w-full text-sm text-gray-500 dark:text-gray-300 mb-2">
                        Date: {editedNotice.date}
                      </p>
                      <button
                        onClick={handleUpdate}
                        className="mt-4 px-4 md:px-6 py-1 md:py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 shadow-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="ml-2 mt-2 px-4 md:px-6 py-1 md:py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                        Date: {notice.date}
                      </p>
                      <h3 className="text-xl py-1 font-bold text-gray-600 dark:text-gray-50 mb-5">
                        {notice.headline}
                      </h3>
                      
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className={`markdown remarkPlugins=${[remarkGfm]}
  rehypePlugins=${[rehypeHighlight]} text-gray-700 dark:text-gray-50 mt-2`}
                      >
                        {notice.description}
                      </ReactMarkdown>
                    
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-50">Reloading notices, please wait...</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default NoticeList;

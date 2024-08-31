"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ToggleSwitch from '@/components/Header/ToggleSwitch';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // useRouter now uses next/navigation for client components
  const router = useRouter();

  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(userPrefersDark);
    document.documentElement.classList.toggle('dark', userPrefersDark);
  }, []);

  const handleToggle = (isDarkMode) => {
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const pathname = usePathname();

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Function to determine the active link class
  const getActiveClass = (path) => {
    return pathname === path ? 'text-teal-400 dark:text-teal-600 underline' : '';
  };

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="hidden lg:flex bg-[var(--bg-color)] text-[var(--text-color)] fixed w-full top-0 z-50 sm:px-16 md:px-28 lg:px-56 py-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-teal-600 dark:text-teal-600 ">DIIT</Link>
          <nav className="space-x-8 flex items-center">
            <Link href="/schedule" className={`hover:underline font-semibold ${getActiveClass('/schedule')}`}>Schedule</Link>
            <Link href="/attendance" className={`hover:underline font-semibold ${getActiveClass('/attendance')}`}>Attendance</Link>
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
            <Link href="/login" className={`hover:underline ring-1 shadown-md bg-teal-600 text-gray-50 px-5 rounded-sm  ${getActiveClass('/login')}`}>Log in</Link>
            
          </nav>
        </div>
      </motion.header>

      {/* Mobile Header */}
      <motion.header 
       variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      
      className="lg:hidden bg-[var(--bg-color)] text-[var(--text-color)] shadow-md fixed w-full top-0 z-50 flex justify-between items-center py-1 px-5">
        <Link href="/" className="text-xl font-bold">DIIT</Link>
        <section className='flex'>
          <div className="mt-4 px-4">
            <ToggleSwitch checked={darkMode} onChange={handleToggle} />
          </div>
          <button
            onClick={toggleSidebar}
            className="text-3xl py-2 text-gray-700 dark:text-gray-50"
            aria-label="Menu"
          >
            ☰
          </button>
        </section>
      </motion.header>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: sidebarOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`fixed top-0 right-0 w-64 h-full bg-[var(--bg-color)] text-[var(--text-color)] shadow-lg z-50 lg:hidden`}
      >
        <div className="flex justify-start items-center p-4">
          <button
            onClick={toggleSidebar}
            className="text-2xl"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <nav className="mt-4 px-4 flex flex-col text-center -z-50">
          <Link href="/" onClick={closeSidebar} className={`block py-2 hover:underline ${getActiveClass('/')}`}>DIIT</Link>
          <Link href="/schedule" onClick={closeSidebar} className={`block py-2 hover:underline ${getActiveClass('/schedule')}`}>Schedule</Link>
          <Link href="/attendance" onClick={closeSidebar} className={`block py-2 hover:underline ${getActiveClass('/attendance')}`}>Attendance</Link>
          <Link href="/login" onClick={closeSidebar} className={`block py-2 hover:underline bg-teal-600 ${getActiveClass('/login')}`}>login</Link>
          
        </nav>
      </motion.aside>
    </>
  );
};

export default Header;

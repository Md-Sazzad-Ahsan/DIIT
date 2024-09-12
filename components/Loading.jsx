"use client";
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-darkBg">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-teal-600 border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;

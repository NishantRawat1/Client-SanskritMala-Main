import React from 'react';
import { motion } from 'framer-motion';
import one from '../assets/1rs.png';

const uspData = {
  title: 'Courses and Notes starting at Just ₹1',
  description: 'Get high-quality Sanskrit courses and premium notes for just ₹1! This offer is designed to make learning accessible and affordable for everyone. Join us now and start your journey with valuable resources at an unbeatable price.',
  linkCourses: '/courses',
  linkNotes: '/notes',
};

const USPSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-100 font-ancient text-black py-12">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex-1 md:mr-8 mb-8 md:mb-0 text-center md:text-left"
        >
          <motion.div
            className="text-center font-hindi mb-4 text-3xl font-semibold text-blue1"
            variants={itemVariants}
          >
            एक रुपये में आखिर क्या मिलता है?
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{uspData.title}</h2>
          <p className="text-base md:text-xl text-gray-900 mb-4">{uspData.description}</p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href={uspData.linkCourses}
              className="bg-blue1 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
            >
              <span className="mr-2">🎓</span> Learn More
            </a>
          </div>
        </motion.div>
        <motion.div
          variants={imageVariants}
          className="flex-1 flex justify-center"
        >
          <img
            src={one}
            alt="USP"
            className="w-full max-w-sm h-auto rounded-sm"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default USPSection;

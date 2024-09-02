import React, { useState } from 'react';
import { motion } from 'framer-motion';
import courses from '../assets/courses.png';
import books from '../assets/books.png';
import ebook from '../assets/ebook.png';
import test from '../assets/test.png';
import youtube from '../assets/youtube.png';
import notes from '../assets/notes.png';

const services = [
  { title: 'Courses', description: 'High-quality courses on Sanskrit.', icon: '📚', link: '/courses', details: 'Detailed information about our courses. Enhance your knowledge with high-quality content.', image: courses },
  { title: 'E-Books', description: 'Download and read e-books.', icon: '📖', link: '/ebooks', details: 'Discover a vast collection of e-books to read and download at your convenience.', image: ebook },
  { title: 'Test Series', description: 'Prepare with our test series.', icon: '📝', link: '/test-series', details: 'Practice and assess your knowledge with our comprehensive test series.', image: test },
  { title: 'Notes', description: 'Access free and paid notes.', icon: '🗒️', link: '/notes', details: 'Get access to both free and premium notes for thorough learning.', image: notes },
  { title: 'YouTube', description: 'Connect with us on YouTube.', icon: '📺', link: '/youtube', details: 'Watch our educational videos and tutorials on our YouTube channel.', image: youtube },
  { title: 'Book Store', description: 'Explore our Book Store.', icon: '📚', link: '/book-store', details: 'Purchase a variety of Sanskrit books from our online store.', image: books },
];

const TabbedServices = () => {
  const [activeTab, setActiveTab] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue1">What are we Offering?</h2>
      <div className="flex flex-wrap justify-center mb-8 space-x-4">
        {services.map((service, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center px-4 py-2 mx-2 mb-2 rounded-lg transition-all duration-300 ${
              activeTab === index ? 'bg-blue1 text-white transform scale-105' : 'bg-gray-300 text-black hover:bg-blue1 hover:text-white'
            }`}
          >
            <span className="mr-2 text-xl">{service.icon}</span>
            {service.title}
          </button>
        ))}
      </div>
      <motion.div
        className="bg-gray-200 text-black p-6 rounded-lg shadow-2xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div key={activeTab} variants={itemVariants} className="flex-1 text-center md:text-left">
          <div className="text-4xl mb-4">{services[activeTab].icon}</div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{services[activeTab].title}</h3>
          <p className='text-gray-950 mb-4'>{services[activeTab].description}</p>
          <div>
            <p className="text-lg text-gray-950 mb-4">{services[activeTab].details}</p>
            <a href={services[activeTab].link} className="bg-blue1 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center w-full max-w-xs mx-auto">
              <span className="mr-2">🔗</span> Try Now
            </a>
          </div>
        </motion.div>
        <motion.div key={`${activeTab}-image`} variants={itemVariants} className="flex-1">
          <img
            src={services[activeTab].image}
            alt={services[activeTab].title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TabbedServices;

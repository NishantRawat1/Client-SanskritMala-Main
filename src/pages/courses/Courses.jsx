import React, { useState } from 'react';
import { CourseData } from '../../context/courseContext';
import CourseCard from '../../components/courseCard/coursecard'; // Ensure correct import path
import { FaRupeeSign, FaBook } from "react-icons/fa";

const Courses = () => {
  const { courses } = CourseData();
  const [activeTab, setActiveTab] = useState('rs1'); // State to manage active tab

  // Filter courses priced at 1
  const coursesAtOneRupee = courses.filter(course => course.price === 1);
  // Filter other paid courses, excluding those priced at 1
  const otherPaidCourses = courses.filter(course => course.price !== 1 && course.price > 0);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 text-blue1">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-300 p-4 py-24 shadow-md lg:shadow-none lg:sticky lg:top-0">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FaBook className="mr-2" /> Courses
        </h2>
        <nav>
          <button
            onClick={() => setActiveTab('rs1')}
            className={`w-full py-2 px-4 mb-2 flex items-center rounded-md transition-colors duration-300 ${
              activeTab === 'rs1' ? 'bg-blue1 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <FaRupeeSign className="mr-2" /> Courses at ₹1
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`w-full py-2 px-4 flex items-center rounded-md transition-colors duration-300 ${
              activeTab === 'paid' ? 'bg-blue1 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <FaBook className="mr-2" /> Other Paid Courses
          </button>
        </nav>
      </aside>

      <main className="flex-1 py-4 lg:py-24 px-4 lg:px-8">
        <div className="container mx-auto">
          {/* Conditionally render content based on active tab */}
          {activeTab === 'rs1' && (
            <>
              <div className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-blue1 relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange opacity-30 blur-md -z-10"></span>
                  <span className="relative">Courses at just ₹1</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-900 mt-4">Explore our exclusive offers for just ₹1!</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {coursesAtOneRupee.length > 0 ? (
                  coursesAtOneRupee.map((course) => (
                    <CourseCard key={course._id} course={course} heading="Courses at ₹1" />
                  ))
                ) : (
                  <p className="text-center text-gray-900">No courses available at ₹1</p>
                )}
              </div>
            </>
          )}

          {activeTab === 'paid' && (
            <>
              <div className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-blue1 relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 blur-md -z-10"></span>
                  <span className="relative">Other Paid Courses</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-900 mt-4">Find more great courses at affordable prices!</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {otherPaidCourses.length > 0 ? (
                  otherPaidCourses.map((course) => (
                    <CourseCard key={course._id} course={course} heading="Other Paid Courses" />
                  ))
                ) : (
                  <p className="text-center text-gray-900">No other paid courses available</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;

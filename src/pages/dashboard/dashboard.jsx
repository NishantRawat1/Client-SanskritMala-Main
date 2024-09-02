import React, { useState, useEffect } from "react";
import { CourseData } from "../../context/courseContext";
import CourseCard from "../../components/courseCard/coursecard";
import { EbookData } from "../../context/ebookContext";
import EbookCard from "../../components/ebookcard";
import { NotesData } from "../../context/notesContext";
import NotesCard from "../../components/notesCard";
import { FaBook, FaGraduationCap, FaStickyNote } from "react-icons/fa";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const { mycourse } = CourseData();
  const { myEbooks, fetchMyEbooks } = EbookData();
  const { myNotes, fetchMyNotes } = NotesData();

  useEffect(() => {
    fetchMyEbooks(); // Fetch purchased eBooks when the component mounts
    fetchMyNotes(); // Fetch purchased notes when the component mounts
  }, [fetchMyEbooks, fetchMyNotes]);

  return (
    <div className="flex flex-col  py-20 md:flex-row min-h-screen bg-gray-100 text-blue1">
      <aside className="w-full h-full md:w-64 bg-gray-400 p-4 shadow-md md:h-screen">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2"><FaGraduationCap /></span>
          Dashboard
        </h2>
        <nav>
          <button
            onClick={() => setActiveTab("courses")}
            className={`w-full py-2 px-4 mb-2 flex items-center rounded-md transition-colors duration-300 ${
              activeTab === "courses" ? "bg-blue1 text-white" : "bg-white text-gray-900"
            }`}
          >
            <FaGraduationCap className="mr-2" />
            Enrolled Courses
          </button>
          <button
            onClick={() => setActiveTab("ebooks")}
            className={`w-full py-2 px-4 mb-2 flex items-center rounded-md transition-colors duration-300 ${
              activeTab === "ebooks" ? "bg-blue1 text-white" : "bg-white text-gray-900"
            }`}
          >
            <FaBook className="mr-2" />
            Purchased eBooks
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`w-full py-2 px-4 flex items-center rounded-md transition-colors duration-300 ${
              activeTab === "notes" ? "bg-blue1 text-white" : "bg-white text-gray-900"
            }`}
          >
            <FaStickyNote className="mr-2" />
            Purchased Notes
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        {activeTab === "courses" ? (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 blur-sm -z-10"></span>
                <span className="relative block text-2xl md:text-3xl animate-pulse effect-3d">
                  Your Enrolled Courses
                </span>
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mycourse && mycourse.length > 0 ? (
                mycourse.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                  <p className="text-xl text-gray-800 font-semibold">No courses enrolled yet.</p>
                </div>
              )}
            </div>
          </>
        ) : activeTab === "ebooks" ? (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 blur-sm -z-10"></span>
                <span className="relative block text-2xl md:text-3xl animate-pulse effect-3d">
                  Your Purchased eBooks
                </span>
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myEbooks && myEbooks.length > 0 ? (
                myEbooks.map((ebook) => (
                  <EbookCard key={ebook._id} ebook={ebook} />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                  <p className="text-xl text-gray-800 font-semibold">No eBooks purchased yet.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 blur-sm -z-10"></span>
                <span className="relative block text-2xl md:text-3xl animate-pulse effect-3d">
                  Your Purchased Notes
                </span>
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myNotes && myNotes.length > 0 ? (
                myNotes.map((note) => (
                  <NotesCard key={note._id} note={note} />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
                  <p className="text-xl text-gray-800 font-semibold">No notes purchased yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
